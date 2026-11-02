import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { runInNewContext } from 'node:vm'
import { installDiscussionSessionPresentation } from '../lib/client/discussion-session-presentation.js'

// Minimal host observable contract; no browser-only store engine dependencies.
function createSnapshotStore(initial) {
  let value=initial;const listeners=new Set()
  const store={getSnapshot:()=>value,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn)},set:next=>{value=next;for(const fn of listeners)fn()},update:mutate=>{const next=structuredClone(value);mutate(next);store.set(next)}}
  return store
}

const id='session-at-discussion-0123456789abcdef-00000000-0000-0000-0000-000000000001'
const snapshot=()=>({ids:['captain',id,'execution-member','session-at-discussion-user-chat'],byId:{
  captain:{id:'captain',title:'Main',blank:false},
  [id]:{id,title:'Old discussion',blank:false},
  'execution-member':{id:'execution-member',origin:'subagent',blank:false},
  'session-at-discussion-user-chat':{id:'session-at-discussion-user-chat',blank:false},
},phase:'ready',projectionsBySession:{}})

test('legacy discussions use auxiliary presentation without changing catalog identity, history or ordinary chats',()=>{
  const original=snapshot(),store=createSnapshotStore(original),read=store.getSnapshot
  const stop=installDiscussionSessionPresentation(store),view=store.getSnapshot()
  assert.equal(store.getSnapshot(),view,'React snapshots must be stable')
  assert.equal(view.ids,original.ids)
  assert.equal(view.projectionsBySession,original.projectionsBySession)
  assert.equal(view.byId[id].origin,'subagent')
  assert.equal(original.byId[id].origin,undefined,'Do not mutate persistence or host state')
  for(const key of original.ids.filter(key=>key!==id))assert.equal(view.byId[key],original.byId[key])
  let updates=0;const unsubscribe=store.subscribe(()=>updates++)
  store.update(s=>{s.byId[id].title='Updated discussion'})
  assert.equal(updates,1);assert.equal(store.getSnapshot().byId[id].title,'Updated discussion')
  assert.notEqual(store.getSnapshot(),view)
  stop();assert.equal(store.getSnapshot,read);assert.equal(store.getSnapshot().byId[id].origin,undefined)
  unsubscribe()
})

test('presentation installation is reference counted and restores on reload/disposal',async()=>{
  const store=createSnapshotStore(snapshot()),original=store.getSnapshot
  const reloaded=await import('../lib/client/discussion-session-presentation.js?reload=1')
  const first=installDiscussionSessionPresentation(store),second=reloaded.installDiscussionSessionPresentation(store)
  first();first();assert.equal(store.getSnapshot().byId[id].origin,'subagent')
  second();assert.equal(store.getSnapshot,original)
  const third=installDiscussionSessionPresentation(store);assert.equal(store.getSnapshot().byId[id].origin,'subagent');third()
  const hidden=snapshot();hidden.byId[id].origin='subagent';store.set(hidden)
  const fourth=installDiscussionSessionPresentation(store);assert.equal(store.getSnapshot(),hidden);fourth()
})

test('pinned Harness workspace predicate excludes discussions even if selected, pinned or showing archived/search results',()=>{
  const require=createRequire(join(process.cwd(),'node_modules/.pnpm/node_modules/package.json'))
  const source=readFileSync(join(dirname(require.resolve('@deepseek-ai/dsh-client-ui-workspace/package.json')),'lib/client.js'),'utf8')
  const match=source.match(/function sessionVisible\(session, current, archived, archivedFilter\) \{[\s\S]*?\n\t\t\}/)
  assert.ok(match,'Verify the released host visibility contract after an upgrade')
  const visible=runInNewContext('('+match[0]+')')
  const store=createSnapshotStore(snapshot()),stop=installDiscussionSessionPresentation(store)
  for(const filter of ['default','show','only']){
    assert.equal(visible(store.getSnapshot().byId[id],id,new Set([id]),filter),false)
  }
  assert.equal(visible(store.getSnapshot().byId.captain,id,new Set(),'default'),true)
  assert.match(source,/function deriveSearchResults[\s\S]*?sessionVisible\(summary, current, archived, archivedFilter\)/)
  stop()
})
