import assert from 'node:assert/strict'
import test from 'node:test'
import {createWorkspaceState,createTeamDiscovery} from '../lib/client/workspace-state.js'
import {startActivityPolling,publishWorkflowActivity,getActivitySnapshotsSnapshot,updateActivitySnapshots,subscribeActivitySnapshots} from '../lib/client/activity-monitor.js'

test('unchanged network snapshots do not notify or rerender all mounted cards',()=>{
 const teams=[{teamId:'stable',captainSessionId:'owner',tasks:[{id:'work',status:'running'}]}]
 updateActivitySnapshots({teams,archivedTeams:[]});const before=getActivitySnapshotsSnapshot();let notifications=0
 const off=subscribeActivitySnapshots(()=>notifications++)
 for(let i=0;i<100;i++)updateActivitySnapshots({teams:structuredClone(teams)})
 assert.equal(notifications,0);assert.equal(getActivitySnapshotsSnapshot(),before)
 updateActivitySnapshots({teams:[{...teams[0],tasks:[{id:'work',status:'completed'}]}]})
 assert.equal(notifications,1);off()
})

test('live and archive polls request only the current owner scope',async()=>{
 const urls=[]
 const poll=startActivityPolling([],{discoverySessionId:'captain & one',fetchState:async url=>{urls.push(new URL(url,'http://local'));return{ok:true,json:async()=>({teams:[]})}},schedule:()=>1,cancel(){}})
 await poll.firstTick;poll.stop()
 assert.equal(urls.length,2);assert.ok(urls.every(url=>url.searchParams.get('sessionId')==='captain & one'));assert.equal(urls[1].searchParams.get('archived'),'1')
})

test('restored, closed, updated and newly created teams have distinct discovery semantics',()=>{
 const discover=createTeamDiscovery()
 const a={teamId:'a'},b={teamId:'b'}
 assert.equal(discover([a]),undefined)
 assert.equal(discover([{...a,phase:'running'}]),undefined)
 assert.equal(discover([a,b]),'b')
 assert.equal(discover([a,b]),undefined)
 assert.equal(discover([]),undefined)
})
test('historical cards and selected teams remain bound to their owner',()=>{
 const state=createWorkspaceState();let count=0;const off=state.subscribe(()=>count++)
 const old={teamId:'old',captainSessionId:'',teamName:'Old',members:[]}
 state.remember('a',old)
 state.select('b','new')
 state.remember('a',{...old,teamId:'foreign',captainSessionId:'b'})
 assert.equal(state.getSnapshot().history.size,1)
 assert.equal(state.getSnapshot().history.get('a:old').captainSessionId,'a')
 assert.equal(state.getSnapshot().selected.get('a'),'old')
 assert.equal(state.getSnapshot().selected.get('b'),'new')
 state.status('a','ready');state.status('a','ready')
 assert.equal(count,3)
 off();state.status('a','error');assert.equal(count,3)
})
test('offline, invalid data and recovery report health without erasing the last snapshot',async()=>{
 let tick;let response={ok:false};const statuses=[],snapshots=[]
 const poll=startActivityPolling([],{discoverySessionId:'a',fetchState:async()=>response,
 schedule:fn=>{tick=fn;return 1},cancel:()=>{},onStatus:s=>statuses.push(s),publishSnapshots:s=>snapshots.push(s)})
 await poll.firstTick;assert.deepEqual(statuses,['error']);assert.equal(snapshots.length,0)
 response={ok:true,json:async()=>({invalid:true})};tick();await new Promise(resolve=>setImmediate(resolve));assert.equal(statuses.at(-1),'error')
 response={ok:true,json:async()=>({teams:[]})};tick();await new Promise(resolve=>setImmediate(resolve));assert.equal(statuses.at(-1),'ready');assert.equal(snapshots.length,2)
 poll.stop()
})
test('disposal prevents a late failed request from updating a different session',async()=>{
 let reject;const statuses=[]
 const poll=startActivityPolling([],{discoverySessionId:'a',fetchState:()=>new Promise((_,no)=>reject=no),schedule:()=>1,cancel:()=>{},onStatus:s=>statuses.push(s)})
 poll.stop();reject(new Error('offline'));await poll.firstTick;assert.deepEqual(statuses,[])
})

test('workspace DAG keeps real dependency endpoints aligned with restored compact nodes',async()=>{
 const {compactDagLayout}=await import('../lib/client/activity-model.js')
 const tasks=[{id:'implement',depth:0,dependencies:[]},{id:'review',depth:1,dependencies:['implement']}]
 const layout=compactDagLayout(tasks,{nodeWidth:164,nodeHeight:76,columnGap:36,rowGap:16})
 assert.equal(layout.width,364)
 assert.equal(layout.nodes[1].x,200)
 assert.equal(layout.edges[0].path,'M164 38C178 38,186 38,200 38')
})

test('restoration and human approval publish live state without changing other team owners',()=>{
 const own={workspace:'original project',teamId:'same',captainSessionId:'owner',tasks:[]},other={...own,captainSessionId:'other'}
 updateActivitySnapshots({teams:[other],archivedTeams:[own]})
 publishWorkflowActivity({...own,workspace:'',phase:'staged'})
 assert.equal(getActivitySnapshotsSnapshot().teams.length,2)
 assert.equal(getActivitySnapshotsSnapshot().teams.find(t=>t.captainSessionId==='owner').workspace,'original project')
 assert.equal(getActivitySnapshotsSnapshot().archivedTeams[0],own,'archive remains available as evidence')
 publishWorkflowActivity({...own,phase:'running',tasks:[{id:'gate',status:'completed',checkpoint:{decision:'approve'}}]})
 assert.equal(getActivitySnapshotsSnapshot().teams.find(t=>t.captainSessionId==='owner').tasks[0].status,'completed')
 assert.equal(getActivitySnapshotsSnapshot().teams.find(t=>t.captainSessionId==='other'),other)
 updateActivitySnapshots({teams:[],archivedTeams:[]})
})

// Independent adaptation/review sessions must keep access to their owner's activity dot.
test('activity owner follows only authenticated TeamFlow discussion bindings',async()=>{
 const {resolveActivitySession}=await import('../lib/client/activity-session.js')
 let calls=0
 const fetchState=async(url,options)=>{calls++;assert.equal(url,'/plugins/dsh-agent-teams/workflow');assert.deepEqual(JSON.parse(options.body),{sessionId:'session-at-discussion-test',action:'state'});return {ok:true,json:async()=>({currentDiscussion:'adapt',team:{captainSessionId:'captain'},activity:{captainSessionId:'captain',teamId:'template-team',phase:'staged'}})}}
 assert.deepEqual(await resolveActivitySession('ordinary',undefined,fetchState),{sessionId:'ordinary',owner:'ordinary'});assert.equal(calls,0)
 const bound=await resolveActivitySession('session-at-discussion-test',undefined,fetchState);assert.equal(bound.owner,'captain');assert.equal(bound.activity.teamId,'template-team')
 for(const body of [{team:{captainSessionId:'other'}},{currentDiscussion:'adapt',team:null}])assert.equal((await resolveActivitySession('session-at-discussion-test',undefined,async()=>({ok:true,json:async()=>body}))).owner,'session-at-discussion-test')
 const denied=await resolveActivitySession('session-at-discussion-test',undefined,async()=>({ok:false}));assert.equal(denied.owner,denied.sessionId)
 const mismatched=await resolveActivitySession('session-at-discussion-test',undefined,async()=>({ok:true,json:async()=>({currentDiscussion:'adapt',team:{captainSessionId:'captain'},activity:{captainSessionId:'other'}})}));assert.equal(mismatched.activity,undefined)
})
