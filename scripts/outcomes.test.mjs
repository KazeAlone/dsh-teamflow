import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, mkdirSync, symlinkSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { registerHooks } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { readOutcomePreview } from '../lib/artifacts.js'
import { outcomeFiles, outcomeCsv } from '../lib/outcomes.js'
import { WorkflowLocale } from '../lib/client/workflow-i18n.js'
import { en } from '../lib/client/locales.js'
const hook = registerHooks({ resolve(specifier, context, next) {
  if (specifier.endsWith('.module.css')) return { url: 'data:text/javascript,export default new Proxy({}, {get: (_, key) => key})', shortCircuit: true }
  return next(specifier, context)
} })
const { OutcomeMarkdown, OutcomeShowcase } = await import('../lib/client/OutcomeShowcase.js')
hook.deregister()

test('file sources use exact task fields, not prose or inferred filenames', () => {
  assert.deepEqual(outcomeFiles({deliverables:['a.md','b.csv'],changedPaths:['b.csv','c.ts'],output:'see secret.txt'}),[
    {path:'a.md',declared:true,changed:false},{path:'b.csv',declared:true,changed:true},{path:'c.ts',declared:false,changed:true},
  ])
})
test('CSV supports quoted delimiters, newlines, escaped quotes, and display limits', () => {
  assert.deepEqual(outcomeCsv('name,note\r\n"a,b","line 1\nline ""2"""\r\n').rows,[['name','note'],['a,b','line 1\nline "2"']])
  assert.deepEqual(outcomeCsv('a,b,c\n1,2,3',1,2),{rows:[['a','b']],truncated:true})
  assert.deepEqual(outcomeCsv('""').rows,[['']])
  assert.deepEqual(outcomeCsv('a,b\n',1,2),{rows:[['a','b']],truncated:false})
})
test('bounded preview reads exact current bytes and rejects unsafe or unsupported paths', t => {
  const root=mkdtempSync(join(tmpdir(),'outcome-preview-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  writeFileSync(join(root,'report.md'),'# Report\n中文')
  const result=readOutcomePreview(root,'report.md')
  assert.equal(result.status,'ready');assert.equal(result.kind,'markdown');assert.equal(result.text,'# Report\n中文')
  assert.equal(result.sha256,createHash('sha256').update(result.text).digest('hex'))
  for(const path of ['../out.txt','C:/out.txt','/out.txt','.env','.ENV','.git/config','.GIT/config','.dsh/config.json','node_modules/a.md','secrets/a.md','report.md:stream','dir./a.md','*.md']) assert.equal(readOutcomePreview(root,path).status,'blocked',path)
  assert.equal(readOutcomePreview(root,'missing.md').status,'missing')
  writeFileSync(join(root,'large.txt'),'x'.repeat(256*1024+1));assert.equal(readOutcomePreview(root,'large.txt').status,'too_large')
  writeFileSync(join(root,'invalid.txt'),Buffer.from([0xff]));assert.equal(readOutcomePreview(root,'invalid.txt').status,'unsupported')
  writeFileSync(join(root,'binary.txt'),Buffer.from([0]));assert.equal(readOutcomePreview(root,'binary.txt').status,'unsupported')
  writeFileSync(join(root,'page.html'),'<script>alert(1)</script>');assert.equal(readOutcomePreview(root,'page.html').kind,'text')
  writeFileSync(join(root,'image.svg'),'<svg/>');assert.equal(readOutcomePreview(root,'image.svg').status,'unsupported')
  writeFileSync(join(root,'fake.png'),'not an image');assert.equal(readOutcomePreview(root,'fake.png').status,'unsupported')
  const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aWQAAAABJRU5ErkJggg==','base64')
  writeFileSync(join(root,'image.png'),png);assert.equal(readOutcomePreview(root,'image.png').dataUrl,`data:image/png;base64,${png.toString('base64')}`)
  mkdirSync(join(root,'dir'));writeFileSync(join(root,'dir','file.txt'),'private')
  symlinkSync(join(root,'dir'),join(root,'alias'),'junction');assert.equal(readOutcomePreview(root,'alias/file.txt').status,'blocked')
})
test('Markdown never executes markup, embeds, or external resource links', () => {
  const html=renderToStaticMarkup(React.createElement(OutcomeMarkdown,{text:'# Title\n<script>alert(1)</script>\n![image](https://example.test/a.png)\n```html\n<img src=x onerror=alert(1)>\n```'}))
  assert.match(html,/<h3>Title<\/h3>/);assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<img'));assert.match(html,/&lt;script&gt;/)
})
test('showcase labels distinguish reports from approval and fully localize', () => {
  const team={id:'demo',tasks:[{id:'work',subject:'Delivery',assignee:'worker',status:'completed',dependencies:[],output:'Done',deliverables:['report.md'],commandsRun:[{command:'test',status:'passed'}],attempt:1}],members:[]}
  const html=renderToStaticMarkup(React.createElement(WorkflowLocale,{t:key=>en[key]??key},React.createElement(OutcomeShowcase,{team,sessionId:'captain',archived:false,onTask(){}})))
  assert.match(html,/No model calls/);assert.match(html,/agent-reported records/);assert.match(html,/Declared deliverable/);assert.doesNotMatch(html,/[\u3400-\u9fff]/)
})
