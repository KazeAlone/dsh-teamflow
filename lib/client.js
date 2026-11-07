window.__ModuleLoader__.load({
	id: "@yogurtss/dsh-teamflow",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let react_dom = require("react-dom");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region lib/client/workflow-messages.js
		/** Source-message catalog for workflow UI. Never apply to user-authored content. */
		const workflowEnglish = {
			"已显示上次状态，正在同步最新进度…": "Showing the previous view while syncing the latest progress…",
			"返回修改需求": "Back to requirements",
			"流程正在创建，请稍候": "The workflow is being created. Please wait.",
			"新对话已有其他流程，请返回模板库后重试": "The new conversation already has another workflow. Return to the gallery and try again.",
			"有 {0} 项需要确认的问题": "{0} issues need your confirmation",
			"请先补充任务要求，再明确标记问题已解决。仅修改任务正文不会自动清除问题。": "Update the task requirements, then explicitly mark the issue as resolved. Editing the requirements alone does not clear the issue.",
			"定位问题 · {0}": "Go to issue · {0}",
			"应用后仍有问题的任务会保持待配置，不会执行。": "Tasks with unresolved issues will remain unconfigured and will not run after applying.",
			"已解决，清除问题": "Resolved, clear issue",
			"问题已标记解决，保存后生效。": "Issue marked as resolved. Save to apply.",
			"先处理需要确认的问题": "Resolve the outstanding issue first",
			"任务「{0}」仍有需要确认的问题：{1}。请补充任务要求，并在问题解决后清除问题说明。": "Task “{0}” still has an unresolved issue: {1}. Update the requirements and clear the issue after resolving it.",
			"在此窗口内讨论团队与流程，修改方案会显示在这里。": "Discuss the team and workflow in this window; proposals appear here.",
			"在此窗口内共同检查成果并确认验收决定。": "Review the results and confirm your decision in this window.",
			"通用草稿已保存，等待生成本次任务": "General draft saved; instance tasks are still needed",
			"讨论记录与资料": "Discussion and context",
			"查看模板": "View template",
			"清除筛选": "Clear filters",
			"查看失败任务 · {0}": "Inspect failed task · {0}",
			"待处理": "Needs attention",
			"其他待处理事项": "Other items",
			"已完成 {0}/{1}": "{0}/{1} completed",
			"确认方案 · {0}": "Review proposal · {0}",
			"配置 · {0}": "Configure · {0}",
			"查看重跑路径 · {0}": "Inspect rerun path · {0}",
			"团队活动与历史": "Team activity and history",
			"逐项检查本次生成的任务。所有修改会在确认后一起应用。": "Review each generated item. Your changes are applied together when you confirm.",
			"选择要检查的项目": "Select an item to review",
			"放弃通用草稿": "Discard general draft",
			"请先完成两阶段生成": "Complete both generation stages first",
			"草稿已变化，请刷新后检查": "The draft changed; refresh and review it",
			"第 ": "Round ",
			" 轮验收": " review",
			"此检查点没有上游执行结果，请根据验收要求确认是否继续。": "This checkpoint has no upstream results. Review its requirements before continuing.",
			"尚未提交结果说明": "No result summary submitted",
			"通过": "Passed",
			"未通过": "Not passed",
			"相关文件": "Related files",
			" · 无法读取": " · Unreadable",
			" · 文件不存在": " · File missing",
			"原始证据记录": "Raw evidence",
			"新团队": "New team",
			"当前浏览器无法保存草稿，刷新前请保存属性。": "This browser cannot back up drafts. Save properties before refreshing.",
			"草稿备份失败，刷新前请保存属性。": "Draft backup failed. Save properties before refreshing.",
			"节点已不存在，请刷新任务列表": "This node no longer exists. Refresh the task list.",
			"请先恢复归档，再修改或重新执行。": "Restore the archive before editing or rerunning.",
			"已恢复为待确认流程。已完成成果保留；确认成员配置并启动后，可修改和重跑。": "Restored for confirmation. Completed results are retained; confirm member settings and start the team before editing or rerunning.",
			"请在 DSH 中打开原生对话；开发预览不连接模型。": "Open the native chat in DSH; the development preview is not connected to a model.",
			"宿主未返回独立讨论会话，已取消跳转": "The host did not return a discussion session. Navigation cancelled.",
			"当前对象已变化。草稿已保留，请先核对最新资料，或点击「重新载入」后编辑。": "This object has changed. Your draft is retained. Review the latest information or reload before editing.",
			"已保存本次提交；后续修改仍为草稿。": "Submission saved; subsequent changes remain in your draft.",
			"已保存。": "Saved.",
			"一次最多保存 50 个对象，请先逐项保存部分草稿。": "Save at most 50 objects at a time. Save some drafts individually first.",
			"保存全部属性草稿": "Save all property drafts",
			"本次提交的属性已保存；待配置节点仍需单独完成配置，任务不会自动重跑。": "Properties saved. Unconfigured nodes still need confirmation; tasks will not rerun automatically.",
			"执行条件": "Execution requirements",
			"定位 · ": "Locate · ",
			"修改并重跑": "Edit and rerun",
			"宿主未返回独立讨论会话": "The host did not return a discussion session.",
			"当前任务有未保存修改，请先保存，再让 AI 拆分。": "Save this task's changes before asking AI to split its description.",
			"一键 AI 拆分": "Split with AI",
			"删除任务交接": "Delete task handoff",
			"删除节点及其连接": "Delete node and connections",
			"已按任务依赖整理布局。": "Layout arranged by task dependencies.",
			"人工检查": "Human review",
			"新任务": "New task",
			"创建{0}": "Create {0}",
			"节点已保存，可直接连线；填写要求并完成配置前不会执行或进入验收。": "Node saved and ready to connect. Complete its configuration before execution or review.",
			"修改已应用，可继续讨论。": "Changes applied. You can continue the discussion.",
			"修改已放弃，可以继续讨论。": "Changes dismissed. You can continue the discussion.",
			"有 ": "Pending: ",
			" 项修改等待确认": " changes awaiting confirmation",
			"查看并决定 · ": "Review and decide · ",
			"切换查看会保留当前草稿。": "Switching views keeps your current draft.",
			"等待你验收": "Awaiting your review",
			"验收 · ": "Review · ",
			"上游已完成 · 打开独立对话查看材料与 AI 总结": "Upstream complete · Open the separate chat for evidence and an AI summary",
			"独立验收对话": "Separate review chat",
			"独立配置对话": "Separate configuration chat",
			"返回团队对话 ↗": "Back to team chat ↗",
			"归档画布 · ": "Archived canvas · ",
			"查看成员、任务交接与人工检查": "View members, task handoffs, and human checkpoints",
			"讨论目标，创建初步团队": "Discuss the goal and create an initial team",
			" 项修改待确认": " changes to confirm",
			" 项等待人工验收": " awaiting human review",
			"请先保存属性草稿": "Save property drafts first",
			"请先完成待配置节点": "Finish configuring pending nodes first",
			"请先处理待确认的修改": "Resolve pending proposals first",
			"确认并启动团队": "Confirm and start team",
			"查看待确认修改 ↗": "Review pending changes ↗",
			"团队与讨论资料 ↗": "Team and discussion context ↗",
			"讨论资料": "Discussion context",
			"当前已保存的信息": "Currently saved information",
			"查看对象": "View object",
			"团队与流程": "Team and workflow",
			"验收": "Review",
			"任务": "Task",
			"本轮验收证据": "Evidence for this review",
			"待确认修改": "Pending changes",
			"在画布查看 ↗": "View on canvas ↗",
			"TeamFlow 编排工作台": "TeamFlow workbench",
			"已退出编辑，未保存的草稿已保留。": "Editing closed. Unsaved drafts are retained.",
			"归档画布 · 成果与详情完整保留": "Archived canvas · All results and details retained",
			"准备流程 · 确认后开始执行": "Prepare workflow · Execution starts after confirmation",
			"团队工作台": "Team workbench",
			"恢复并编辑流程": "Restore and edit workflow",
			"查看流程": "View workflow",
			"编辑流程": "Edit workflow",
			"确认并启动": "Confirm and start",
			"开始全部": "Start all",
			"暂停全部": "Pause all",
			"退出全屏": "Exit full screen",
			"全屏": "Full screen",
			"关闭编排工作台": "Close workbench",
			"关闭": "Close",
			"Teamflow 页面": "TeamFlow page",
			"当前流程": "Current workflow",
			"从零创建": "Create from scratch",
			"流程模板库 ": "Template Gallery ",
			"保存为模板": "Save as template",
			"来自 ": "From ",
			"未能创建流程，请查看页面错误或刷新重试": "Could not create workflow. Check the error or refresh and retry.",
			"创建与视图": "Create and view",
			"统一适配本次任务": "Adapt all tasks",
			"创建": "Create",
			"任务节点": "Task node",
			"人工节点": "Human checkpoint",
			"显示右侧面板": "Show right panel",
			"收起右侧面板": "Hide right panel",
			"保存状态": "Save status",
			"正在保存画布…": "Saving canvas…",
			"上次保存失败，请重试": "Last save failed. Please retry.",
			"节点与连线自动保存": "Nodes and connections save automatically",
			"{0} 个对象有未保存属性": "{0} objects have unsaved properties",
			"属性已保存": "Properties saved",
			"保存全部属性": "Save all properties",
			"查看未保存对象": "View unsaved objects",
			" · 未保存": " · Unsaved",
			" 个节点待配置": " nodes need configuration",
			" · 去配置": " · Configure",
			"工作台视图": "Workbench views",
			"对象列表": "Objects",
			"任务流程": "Task flow",
			"修改与验收": "Changes and reviews",
			"有待确认的修改": "Changes awaiting confirmation",
			"上游重新执行 · ": "Upstream rerun · ",
			" 个下游节点需使用新结果": " downstream nodes need new results",
			"上游完成前，下游先等待。新结果就绪后，由你逐个启动执行或重新验收；已有结果与旧验收不再用于本轮。": "Downstream tasks wait for new upstream results. Once ready, start or review each node. Previous results and approvals do not count for this run.",
			"归档画布 · 可查看全部节点、连接与成果。恢复并编辑将保留原归档和已完成成果，建立待确认流程，不会自动执行。": "Archived canvas · View all nodes, connections, and results. Restoring retains the archive and completed work and creates a workflow awaiting confirmation; it does not start execution.",
			"描述目标，一起规划团队": "Describe your goal and plan the team",
			"已有适合的流程？": "Already have a suitable workflow?",
			"从模板开始": "Start from a template",
			"团队名称": "Team name",
			"团队目标": "Team goal",
			"在 DSH 中讨论方案 ↗": "Discuss the plan in DSH ↗",
			"正在读取团队…": "Loading team…",
			"对象分类": "Object categories",
			"任务 ": "Tasks ",
			"任务决定做什么，Agent 决定由谁执行。": "Tasks define the work; agents define who performs it.",
			"从顶部创建任务节点或人工节点。": "Create task nodes or human checkpoints from the toolbar.",
			"Agent 成员 ": "Agents ",
			"添加成员": "Add member",
			"＋ 添加": "＋ Add",
			"尚未填写职责概述": "No responsibility summary yet",
			"继承队长模型": "Inherit captain's model",
			"讨论调整 ↗": "Discuss changes ↗",
			"执行对话 ↗": "Execution chat ↗",
			"历史执行 ": "Past executions ",
			"点击成员查看保存的配置与执行记录；恢复并编辑后可调整。": "Select a member to view saved configuration and execution records. Restore the workflow to edit.",
			"点击成员卡片直接编辑；讨论调整默认继续该成员的独立讨论，保留历史上下文。": "Select a member card to edit. Discussions reuse the member's separate chat and retain its history.",
			"画布工具": "Canvas tools",
			"选择": "Select",
			"平移": "Pan",
			"缩小画布": "Zoom out",
			"恢复 100%": "Reset to 100%",
			"缩放 {0}%，点击恢复 100%": "Zoom {0}%; click to reset to 100%",
			"放大画布": "Zoom in",
			"适应画布": "Fit to canvas",
			"自动整理": "Auto-arrange",
			"任务交接连线": "Task handoff connections",
			"交接：{0} → {1}": "Handoff: {0} → {1}",
			"人工验收 · 由你确认": "Human review · Your confirmation required",
			"执行 Agent · {0}": "Agent · {0}",
			"自动分配": "Auto-assign",
			"{0} 输入端": "{0} input",
			"{0} 输出端": "{0} output",
			"从圆点拖出连接线": "Drag from the dot to connect",
			"连接 {0} → {1}": "Connect {0} → {1}",
			"草稿 · 确认后加入流程": "Draft · Added after confirmation",
			"新人工检查": "New human checkpoint",
			"你与独立验收 Agent": "You and a separate review agent",
			"待指定 Agent": "Agent not assigned",
			"尚未应用": "Not applied",
			"添加任务或人工检查，或让 AI 根据目标提出流程方案。": "Add a task or human checkpoint, or ask AI to propose a workflow for your goal.",
			"已吸附 · 松开连接": "Snapped · Release to connect",
			"拖到下游节点 · Esc 取消": "Drag to a downstream node · Esc to cancel",
			"{0} 个任务节点 · {1} · 滚轮缩放（以鼠标位置为中心）{2}": "{0} task nodes · {1} · Scroll to zoom around the pointer{2}",
			"拖动空白处平移": "Drag empty space to pan",
			"拖动画布平移": "Drag canvas to pan",
			" · 靠近节点显示圆点，拖动连线 · Delete 删除": " · Hover for connection dots; drag to connect · Delete to remove",
			" · 单击节点查看详情": " · Select a node for details",
			"调整右侧面板宽度": "Resize right panel",
			"属性与讨论面板": "Properties and discussion",
			"编辑属性": "Edit properties",
			"节点与连接": "Nodes and connections",
			"讨论与验收": "Discussion and review",
			"还原面板": "Restore panel",
			"放大面板": "Expand panel",
			"交接详情": "Handoff details",
			"上游完成后，下游才开始。编辑时按 Delete 删除；已开始的下游需先停止。": "Downstream work starts only after upstream completes. Press Delete while editing to remove the connection; stop active downstream work first.",
			"删除连线": "Delete connection",
			"人工验收属性": "Human review properties",
			"任务属性": "Task properties",
			"暂无任务说明": "No task description",
			" 轮 · ": " · ",
			"暂无验收意见": "No review note",
			"与 AI 讨论任务": "Discuss task with AI",
			"修改负责人并重跑此任务": "Change assignee and rerun this task",
			"编辑节点": "Edit node",
			"开始验收": "Start review",
			"验收 · {0}": "Review · {0}",
			"任务讨论 · {0}": "Task discussion · {0}",
			"成员职责 · {0}": "Member responsibilities · {0}",
			"流程修改": "Workflow changes",
			"一起检查成果，由你决定是否通过": "Review results together; you decide whether to approve",
			"讨论不影响执行，修改确认后生效": "Discussion does not affect execution; changes apply after confirmation",
			"在原生验收对话中共同检查成果，回到这里确认验收决定。": "Review results in the native review chat, then return here to confirm your decision.",
			"基于已保存的任务要求、负责人、上下游和提交结果讨论；未保存草稿不会发送给 AI。": "Discuss saved requirements, ownership, dependencies, and results. Unsaved drafts are not sent to AI.",
			"在这里与独立配置顾问讨论；队长对话保持独立。": "Discuss with a separate configuration advisor here; the captain's chat stays separate.",
			"在 DSH 原生对话中讨论团队与流程，修改方案会显示在这里。": "Discuss the team and workflow in DSH. Proposed changes appear here.",
			"返回任务属性": "Back to task properties",
			"讨论整体流程与拆分": "Discuss workflow and task breakdown",
			"恢复并编辑流程后可继续讨论。": "Restore and edit the workflow to continue discussing.",
			"在此处": "here",
			"继续": "Continue",
			"开始": "Start",
			"讨论": "discussion",
			"打开完整 DSH 对话 ↗": "Open full DSH chat ↗",
			"已保存资料（不含待确认修改）": "Saved information (excluding pending changes)",
			"本轮验收材料与证据": "Review materials and evidence",
			"原生对话正在整理方案…": "The native chat is preparing a proposal…",
			"通过验收": "Approve review",
			"退回并讨论返工": "Reject and discuss rework",
			"已退回，下游保持等待。可将新返工节点连入此审核节点，自动进入下一轮审核；也可讨论返工对象并确认新方案。": "Rejected; downstream work waits. Connect new rework tasks to this checkpoint to begin another review round, or discuss and confirm a rework plan.",
			"验收意见（随决定保存）": "Review note (saved with your decision)",
			"验收意见": "Review note",
			"记录通过或退回的原因…": "Record why you approve or reject…",
			"刷新验收材料": "Refresh review materials",
			"重新开始讨论": "Restart discussion",
			"新建独立讨论会归档当前讨论，从当前资料重新开始。": "A new discussion archives the current one and starts from the latest information.",
			"新建独立讨论": "New separate discussion",
			"请选择该成员的已结束任务": "Select a finished task for this member",
			"保存成员配置并进入重跑编辑": "Save member settings and edit rerun requirements",
			"调整团队成员": "Update team members",
			"调整任务": "Update task",
			"编辑": "Edit",
			"添加": "Add",
			"成员": "Member",
			"未保存": "Unsaved",
			"已保存": "Saved",
			"尚未创建": "Not created",
			"重跑输入": "Rerun inputs",
			"上一轮结果（自动提供给 Agent）": "Previous result (provided to the agent)",
			"上一轮未提交结果": "No previous result submitted",
			"本次重跑要求（必填）": "New rerun requirements (required)",
			"Agent 将结合原任务要求、上一轮结果和本次新增要求重新执行，并重新验证结果。": "The agent will use the original requirements, previous result, and new instructions to rerun and verify the task.",
			"讨论使用已保存的资料；当前草稿会保留。": "Discussions use saved information; your current draft is retained.",
			"名称": "Name",
			"模型与 Thinking": "Model and thinking",
			"模型目录暂不可用，请在 DSH 团队活动页面打开编辑。": "Model directory unavailable. Open the editor from the DSH team activity page.",
			"Summary · 功能概述": "Summary · Responsibilities",
			"长期职责": "Ongoing responsibilities",
			"通用执行指令 / PE": "General execution instructions / PE",
			"本次补充指令（可选）": "Task-specific instructions (optional)",
			"任务名称": "Task name",
			"任务要求 / 验收要求": "Task / review requirements",
			"手动填写两层": "Enter both layers manually",
			"执行 Agent": "Execution agent",
			"由空闲成员领取": "Claimed by an available member",
			"节点已在画布中，靠近节点后可拖动右侧圆点连线。修改名称或要求后点击保存。": "The node is on the canvas. Hover to connect from its right-hand dot. Save after editing its name or requirements.",
			"保存将开启新一轮执行，原有状态与结果保存在历史执行记录中。以下下游先等待新结果：": "Saving starts a new attempt and preserves previous status and results in history. These downstream nodes will wait for new results: ",
			"无": "None",
			"。新结果就绪后，由你逐个启动执行或重新验收；其他分支保留。": ". Once results are ready, start or review each node. Other branches are retained.",
			"请先查看流程并确认启动团队，再重跑。": "Confirm and start the team before rerunning tasks.",
			"属性需点击保存；草稿保存在此标签页，刷新可恢复。Esc 退出编辑并保留草稿。": "Save properties explicitly. Drafts are stored in this tab and survive refresh. Esc closes editing and keeps your draft.",
			"当前对象已变化，草稿仍保留。": "This object has changed; your draft is retained.",
			"重新载入": "Reload",
			"保存并重跑此任务": "Save and rerun task",
			"保存并完成配置": "Save and finish configuration",
			"保存": "Save",
			"保存成员并编辑重跑要求": "Save member and edit rerun requirements",
			"使用新结果重新验收": "Review new results",
			"使用新结果执行": "Run with new results",
			"保存并开始验收": "Save and start review",
			"保存并开始执行": "Save and start execution",
			"删除节点": "Delete node",
			"开始验收 ↗": "Start review ↗",
			"放弃修改": "Discard changes",
			"移除 {0}": "Remove {0}",
			"移除成员": "Remove member",
			"流程预览，{0} 个节点": "Workflow preview, {0} nodes",
			"源流程已变化，请重新讨论后生成模板草稿。": "The source workflow changed. Discuss it again to generate a new template draft.",
			"通用任务要求": "General task requirements",
			"交付物与验收要求": "Deliverables and acceptance criteria",
			"通用交付物": "General deliverables",
			"通用验收要求": "General acceptance criteria",
			"流程模板库": "Template Gallery",
			"编辑流程模板": "Edit workflow template",
			"留下有效的方法，让下一次协作从这里开始。": "Keep effective methods and start your next collaboration here.",
			"返回当前流程": "Back to current workflow",
			"返回模板库": "Back to Gallery",
			"AI 提炼通用流程": "Extract reusable workflow with AI",
			"已载入 AI 草稿，请检查通用要求和成员指令。": "AI draft loaded. Review the general requirements and member instructions.",
			"载入 AI 草稿": "Load AI draft",
			"保存成员、通用任务、连线和人工检查点。具体任务、结果、审批、模型路由和旧会话不进入模板。": "Save members, general tasks, connections, and human checkpoints. Task-specific requirements, results, approvals, model routes, and old sessions are excluded.",
			"模板名称": "Template name",
			"适用说明": "When to use",
			"标签（逗号分隔）": "Tags (comma-separated)",
			"应用前需要提供的信息": "Information required before applying",
			"成员通用职责": "General member responsibilities",
			"职责概述": "Responsibility summary",
			"节点通用任务": "General node tasks",
			"通用节点名称": "General node name",
			"原任务（仅用于对照）": "Original task (for reference only)",
			"作为来源模板的新版本": "Save as a new version of the source template",
			"已保存「{0}」v{1}": "Saved “{0}” v{1}",
			"处理中…": "Working…",
			"保存为 v{0}": "Save as v{0}",
			"保存新模板": "Save new template",
			"提炼通用流程": "Extract reusable workflow",
			"AI 只提出草稿，源流程保持不变。": "AI only proposes a draft; the source workflow is unchanged.",
			"保存做事的方法": "Save your working methods",
			"通用要求保留方法、交付约定和质量标准。项目名称、路径、数值等具体要求留给下次适配。": "General requirements retain methods, deliverables, and quality standards. Project names, paths, and parameters are filled in when the template is adapted.",
			"可先让 AI 提炼，再检查和修改。原流程的执行记录不会被改动。": "Let AI extract a draft, then review and edit it. The original execution history is retained.",
			"← 所有模板": "← All templates",
			"个人流程模板": "Personal workflow template",
			"内置": "Built-in",
			"个人": "Personal",
			" 个角色 · ": " roles · ",
			" 个节点": " nodes",
			"流程与通用要求": "Workflow and general requirements",
			"负责人：": "Assignee: ",
			"人工／自动分配": "Human / auto-assigned",
			" · 上游：": " · Upstream: ",
			"角色分工": "Roles",
			"应用到本次任务": "Apply to this task",
			"描述本次目标、工作范围和特殊要求。": "Describe the goal, scope, and special requirements.",
			"当前对话已有流程。请在新的对话打开 Teamflow 后应用；不会覆盖当前流程。": "This chat already has a workflow. Apply the template in a new chat's TeamFlow page; the existing workflow will not be overwritten.",
			"流程名称": "Workflow name",
			"本次需求": "Current requirements",
			"例如：实现算子 B，遵循当前项目接口，并验证正确性…": "For example: implement operator B using the project interface and verify correctness…",
			"已有对话需求会带入适配。保留全部节点和连线，由 Captain 统一生成本次任务；确认后才执行。": "Existing chat requirements are included in adaptation. All nodes and connections are retained. The captain generates task-specific requirements together; execution waits for confirmation.",
			"使用模板并讨论本次任务": "Use template and discuss this task",
			"编辑并另存为个人模板": "Edit and save as personal template",
			"编辑模板": "Edit template",
			"{0} · 副本": "{0} · Copy",
			"复制模板": "Copy template",
			"内置模板只读，修改后保存为个人模板。": "Built-in templates are read-only. Save edits as a personal template.",
			"删除后已创建的流程不受影响。": "Deleting a template does not affect workflows already created from it.",
			"确认删除": "Confirm deletion",
			"取消": "Cancel",
			"删除模板": "Delete template",
			"搜索模板": "Search templates",
			"搜索模板名称、用途或标签": "Search by name, purpose, or tag",
			"标签筛选": "Filter by tag",
			"所有标签": "All tags",
			" 个模板": " templates",
			"正在读取模板库…": "Loading Gallery…",
			"没有匹配的模板": "No matching templates",
			"把有效的协作流程留在这里": "Keep effective workflows here",
			"试试其他关键词或标签。": "Try another keyword or tag.",
			"在流程画布点击「保存为模板」，提炼一次，以后直接套用。": "Choose “Save as template” on the canvas. Extract it once and reuse it later.",
			"返回流程": "Back to workflow",
			"查看 {0}": "View {0}",
			" 个节点 · ": " nodes · ",
			" 个人工检查点": " human checkpoints",
			"使用模板": "Use template",
			"通用任务 · ": "General task · ",
			"尚未填写": "Not filled in",
			"本次任务 · 完整执行要求": "Current task · Complete execution requirements",
			"等待统一适配": "Awaiting adaptation",
			"需要确认：": "Needs confirmation: ",
			"通用任务 · 可复用的方法与约束": "General task · Reusable methods and constraints",
			"修改当前流程的通用要求": "Edit general requirements for this workflow",
			"模板只保存此层。修改后需重新生成或确认本次任务，不会覆盖模板。": "Templates save only this layer. After editing, regenerate or confirm the task-specific requirements; the saved template is unchanged.",
			"通用交付物与验收要求": "General deliverables and acceptance criteria",
			"Agent 只读取本次要求。请包含具体化后的全部通用约束、交付物与验收条件，不要仅写补充说明。": "The agent reads only the current requirements. Include all concretized general constraints, deliverables, and acceptance criteria, not just additions.",
			"本次任务要求": "Current task requirements",
			"本次交付物与验收要求": "Current deliverables and acceptance criteria",
			"本次交付物": "Current deliverables",
			"本次验收要求": "Current acceptance criteria",
			"适配问题（处理后清空，并确认配置）": "Adaptation issue (clear after resolving, then confirm)",
			"保留节点并调整要求；存在未处理问题时不能启动。": "Keep the node and adjust its requirements. Unresolved issues prevent execution.",
			"草稿备份失败，离开页面前请保留文本。": "Draft backup failed. Keep a copy of your text before leaving.",
			"独立讨论记录": "Separate discussion history",
			"你": "You",
			"正在读取讨论记录…": "Loading discussion…",
			"AI 正在思考…": "AI is thinking…",
			"继续讨论": "Continue discussion",
			"例如：帮我细化这个任务的要求，或分析失败原因…": "For example: refine this task's requirements or investigate why it failed…",
			"例如：让这个 Agent 更专注于需求分析…": "For example: have this agent focus more on requirements analysis…",
			"输入你想讨论的问题…": "What would you like to discuss?",
			"草稿保存在此标签页，切换讨论或刷新可恢复。": "Your draft is saved in this tab and survives switching discussions or refreshing.",
			"发送中…": "Sending…",
			"发送": "Send",
			"执行记录 · ": "Execution record · ",
			"未单独填写任务说明": "No separate task description",
			"本轮重跑依据": "Basis for this rerun",
			"上一轮结果：": "Previous result: ",
			"本轮新增要求：": "New requirements: ",
			"输入来自：": "Inputs from: ",
			"无前置任务": "No dependencies",
			"目标：": "Goal: ",
			"工作范围：": "In scope: ",
			"范围之外：": "Out of scope: ",
			"验收标准：": "Acceptance criteria: ",
			"计划验证：": "Planned checks: ",
			"约定交付：": "Expected deliverables: ",
			"已提交结果：": "Submitted result: ",
			"尚未提交结果": "No result submitted",
			"历轮人工验收记录": "Human review history",
			"退回": "Rejected",
			"未填写意见": "No note",
			"已报告变更：": "Reported changes: ",
			"报告通过": "Reported pass",
			"报告失败": "Reported failure",
			"审查发现": "Review findings",
			"历史执行记录 · ": "Execution history · ",
			" 次": " attempts",
			"本次停止前未提交结果": "No result submitted before this attempt stopped",
			" · 当前配置": " · Current configuration",
			"未单独设置": "Not separately configured",
			"PE · 成员执行指令": "PE · Member execution instructions",
			"未单独设置；执行时可能沿用团队或插件指令": "Not separately configured; execution may inherit team or plugin instructions",
			"本次补充指令": "Task-specific instructions",
			"未设置": "Not configured",
			"模型": "Model",
			"未记录": "Not recorded",
			"（已切换备用模型）": " (fallback model active)",
			"本次执行的角色提示词快照": "Role prompt snapshot for this execution",
			"由插件按团队目标、角色、执行指令和协作规则组装；不等于完整模型请求。": "Assembled from the goal, role, instructions, and collaboration rules; this is not the full model request.",
			"当前记录没有保存该快照，可打开执行对话核对。": "No snapshot was saved in this record. Check the execution chat.",
			"尚无执行快照；成员启动后会保存角色提示词。": "No execution snapshot yet; the role prompt is saved when the member starts.",
			"查看执行对话与工具记录 ↗": "View execution chat and tool history ↗",
			" · 当前任务": " · Current task",
			"执行负责人：": "Execution owner: ",
			"下游交接：": "Downstream handoff: ",
			" · 第 ": " · Round ",
			" 轮": " ",
			"未填写验收要求": "No review requirements",
			"已通过": "Approved",
			"已退回": "Rejected",
			"等待人工决定": "Awaiting human decision",
			"未填写目标": "No goal specified",
			"成员与分工": "Members and roles",
			"尚未填写职责": "No responsibilities specified",
			"负责的任务与成果": "Assigned tasks and results",
			"直接上游的提交记录": "Direct upstream submissions",
			"直接上下游的提交记录": "Direct upstream and downstream submissions",
			"任务与成果": "Tasks and results",
			"没有直接上下游任务。": "No directly connected tasks.",
			"尚未分配任务。": "No tasks assigned yet.",
			"结果和验证记录来自 Agent 提交；没有记录的内容会标明缺失，不视为已经验证。": "Results and verification records are submitted by agents. Missing records are marked as missing, not treated as verified.",
			"审批修改对照": "Review proposed changes",
			"待确认修改 · ": "Pending changes · ",
			"绿色 + 新增 · 红色 − 删除 · = 相同。可直接编辑「之后」，确认后生效。": "Green + added · Red − removed · = unchanged. Edit “After” directly; changes take effect after confirmation.",
			"确认应用编辑后的内容": "Apply edited changes",
			"确认应用": "Confirm and apply",
			"恢复 AI 建议": "Restore AI suggestion",
			"请在「本次要求」中填写重跑的新要求后再确认。": "Enter new instructions under “Current requirements” before confirming the rerun.",
			"团队已变化，此提案已过期。请与 AI 重新确认，避免覆盖新结果。": "The team has changed and this proposal is stale. Discuss it again to avoid overwriting newer results.",
			"当前没有要应用的改动，可以继续编辑或放弃修改。": "No changes selected. Continue editing or discard the proposal.",
			"应用此项 · ": "Apply this change · ",
			"上一轮结果（自动提供给 Agent）：": "Previous result (provided to the agent):",
			"= 相同": "= Unchanged",
			"+ 新增": "+ Added",
			"− 删除": "− Removed",
			"± 修改": "± Changed",
			"之前": "Before",
			"（空）": "(empty)",
			"之后": "After",
			" · 可编辑": " · Editable",
			"{0} · {1} · 之后": "{0} · {1} · After",
			"逐行差异": "Line-by-line diff",
			"相同": "Unchanged",
			"新增": "Added",
			"删除": "Removed",
			"所选任务开启新一轮执行，原有状态和提交结果保存在历史执行记录中。旧验证证据不作为本轮证据，无关分支保持不变。": "The selected task starts a new attempt. Previous status and results remain in execution history. Old verification evidence does not count for this attempt; unrelated branches stay unchanged.",
			"以下下游节点会等待上游新结果；新结果就绪后，由你逐个启动执行或重新验收：": "These downstream nodes wait for new results. Once ready, start or review each one: ",
			"。此前结果与验收不再用于本轮。": ". Prior results and approvals do not count for this attempt.",
			"请先停止受影响的运行任务：": "Stop the affected running tasks first: ",
			"单独重跑": "Rerun separately",
			"重跑任务": "Task to rerun",
			"保存成员后进入任务编辑，查看上一轮结果并填写本轮要求，再确认重跑。": "Save the member, then edit the task's new requirements and confirm the rerun.",
			"恢复失败，请重新连接后重试": "Restore failed. Reconnect and retry.",
			"团队与流程 ": "Team and workflow ",
			" · 历史记录，只读": " · Read-only history",
			"{0} · 团队与流程（只读）": "{0} · Team and workflow (read-only)",
			"历史记录 · 只读": "History · Read-only",
			"可恢复为待确认流程：保留已完成成果与原归档，重新建立空闲成员；不会自动执行。请确认成员配置后启动，人工节点仍需正式验收。": "Restore for confirmation: retain completed results and the original archive, and recreate idle members. Execution does not start automatically. Confirm member settings before starting; human checkpoints still require review.",
			"正在恢复…": "Restoring…",
			"已恢复，请查看当前团队": "Restored. View the current team.",
			"恢复为待确认流程": "Restore for confirmation",
			"成员不存在": "Member not found",
			"请选择重跑任务": "Select a task to rerun",
			"调整 {0} 的配置{1}": "Update {0}'s configuration{1}",
			"并进入任务编辑": " and open task editor",
			"配置 {0}": "Configure {0}",
			"配置 · ": "Configure · ",
			"职责": "Responsibilities"
		};
		Object.assign(workflowEnglish, {
			"依赖已满足，等待调度器派发；实际成员会话状态由宿主确认。": "Dependencies satisfied; waiting for the scheduler. The host determines live member availability.",
			"等待调度": "Waiting for scheduler",
			"Agent 启动失败": "Agent failed to start",
			"可用成员均在执行其他任务或停止中。": "All available members are working or stopping.",
			"{0} 正在执行其他任务或停止中。": "{0} is working on another task or stopping.",
			"等待 Agent 空闲": "Waiting for an available agent",
			"请创建或恢复至少一个执行 Agent。": "Create or restore at least one execution agent.",
			"执行成员 {0} 不可用，请调整负责人。": "Member {0} is unavailable. Change the assignee.",
			"缺少执行 Agent": "No execution agent",
			"依赖已满足，等待队长领取。": "Dependencies satisfied; waiting for the captain to claim this task.",
			"等待队长": "Waiting for captain",
			"上游已完成，打开材料并作出验收决定。": "Upstream work is complete. Open the evidence and make a review decision.",
			"等待：{0}": "Waiting for: {0}",
			"团队方案尚未确认启动。": "The team plan has not been confirmed and started.",
			"点击开始后重新进入调度，已停止的执行将重新开始。{0}": "Start to schedule again; stopped execution will restart. {0}",
			"仍需等待：{0}": "Still waiting for: {0}",
			"节点已配置，点击开始后进入调度。{0}": "Node configured. Start it to enter scheduling. {0}",
			"待启动": "Awaiting start",
			"上游新结果已就绪。点击「使用新结果执行」；已有的下游结果不能作为本轮结果。": "New upstream results are ready. Choose “Run with new results”; existing downstream results do not count for this attempt.",
			"上游新结果已就绪，旧验收不能沿用。点击「使用新结果重新验收」，查看材料后重新作出决定。": "New upstream results are ready. The old review cannot be reused. Choose “Review new results” and make a new decision.",
			"上游正在更新，本节点暂不执行。还需等待：{0}。全部完成后，可使用新结果{1}。": "Upstream results are being updated. Waiting for: {0}. Once ready, use the new results to {1}.",
			"执行": "execute",
			"重新验收": "review again",
			"{0}（不存在）": "{0} (missing)",
			"未完成": "Not completed",
			"未通过验收": "Not approved",
			"待配置": "Needs configuration",
			"已取消": "Cancelled",
			"失败": "Failed",
			"执行 Agent 正在处理任务。": "The execution agent is working on this task.",
			"已禁止再次调度，正在等待执行会话停止；失败时可重试停止。": "Scheduling is blocked while the execution session stops. Retry stopping if it fails.",
			"团队停止期间不会派发此任务。": "Tasks are not dispatched while the team is stopped.",
			"团队已停止": "Team stopped",
			"节点已保存，可先连线；请填写要求并完成配置。": "Node saved and ready to connect. Fill in requirements and finish configuration.",
			"旧版本次层可能只有补充说明。请使用 AI 重新整理完整本次要求，或核对后保存确认。": "This older task may contain only supplemental instructions. Ask AI to produce complete requirements, or review and save them to confirm.",
			"待确认完整要求": "Confirm complete requirements",
			"查看执行记录中的失败原因，再决定是否修改并重跑。": "Check the execution record for the failure, then decide whether to edit and rerun.",
			"执行失败": "Execution failed",
			"已完成": "Completed",
			"验收通过": "Review approved",
			"等待调整方案并返工。": "Awaiting plan changes and rework.",
			"修改": "Update ",
			"返工": "Rework ",
			"仅重跑": "Rerun ",
			"需要确认的问题（处理后清空）": "Issues requiring confirmation (clear after resolving)",
			"验收要求": "acceptance criteria",
			"交付物": "deliverables",
			"任务要求": "task requirements",
			"本次": "Current ",
			"通用": "General ",
			"成员名称": "Member name",
			"任务 ID": "Task ID",
			"执行指令 / PE": "Execution instructions / PE",
			"模型提供方": "Model provider",
			"负责人": "Assignee",
			"上游任务 ID": "Upstream task IDs",
			"返工任务 ID": "Rework task IDs",
			"本次要求": "Current requirements",
			"这条连接会形成循环": "This connection would create a cycle",
			"请先停止目标任务，或创建返工轮次": "Stop the target task first or create a rework round",
			"这条交接已存在": "This handoff already exists",
			"不能连接自身": "A node cannot connect to itself",
			"节点不存在": "Node not found"
		});
		Object.assign(workflowEnglish, {
			"交付物：": "Deliverables:",
			"验收要求：": "Acceptance criteria:",
			"任务输出和命令结果由执行 Agent 提交；文件摘要由宿主读取。验收 Agent 未独立运行命令，也未读取全部文件内容。": "Task outputs and command results are submitted by execution agents; file metadata is read by the host. The review agent has not independently run commands or read every file in full.",
			"继续在此处讨论": "Continue discussion here",
			"在此处开始讨论": "Start discussion here",
			"有对象已变化，请逐项核对草稿后再保存全部。": "An object has changed. Review each draft before saving all.",
			"重跑设置需在对应任务中单独确认，保存全部不会执行或丢弃重跑设置。": "Confirm rerun settings on the task itself. Save all neither executes nor discards rerun settings.",
			"成员 {0} 已移除，草稿保留。": "Member {0} was removed; your draft is retained.",
			"已开始或已结束任务的草稿需单独处理；保存全部不会自动重跑。": "Handle drafts for started or finished tasks individually. Save all does not rerun tasks.",
			"同一节点不能同时作为上游和后续，也不能连接自身": "A node cannot be both upstream and downstream, or connect to itself",
			"当前会话已有团队，请在已有团队中编辑": "This chat already has a team. Edit the existing team.",
			"团队已变化，请重新读取上下文并讨论": "The team has changed. Refresh the context and discuss again.",
			"提案已替换": "This proposal has been replaced",
			"请先打开当前原生对话": "Open the current native chat first",
			"请先打开队长对话，使当前会话连接到宿主": "Open the captain chat first to connect this session to the host",
			"检查点尚不能验收": "This checkpoint is not ready for review",
			"适配不能覆盖通用任务": "Adaptation cannot overwrite general task requirements",
			"适配必须保留节点、名称、负责人和连线，只填写本次层": "Adaptation must retain nodes, names, assignees, and connections; fill only the task-specific layer",
			"请一次性提交所有节点的本次任务；不适用的节点填写 adaptationIssue": "Submit task-specific requirements for every node together; explain incompatible nodes in adaptationIssue",
			"模板成员数超过当前宿主配置上限": "This template exceeds the host member limit",
			"内置模板只读，请另存为个人模板": "Built-in templates are read-only. Save a personal copy.",
			"内置模板不能删除": "Built-in templates cannot be deleted",
			"通用任务和本次任务格式无效": "Invalid general or task-specific requirements",
			"连接产生循环，任务无法执行": "The connection creates a cycle, preventing execution",
			"成员名称重复或保留": "Member name is duplicate or reserved",
			"正在执行，不能直接删除任务": "Cannot delete a running task",
			"团队已停止，请先恢复团队": "The team is stopped. Restore it first."
		});
		Object.assign(workflowEnglish, { "新 Agent": "New agent" });
		Object.assign(workflowEnglish, {
			"编辑": "Edit ",
			"添加": "Add ",
			"此开发预览不包含 DSH 原生会话，请在真实宿主中使用此入口。": "This development preview has no native DSH sessions. Use this entry in the real host."
		});
		Object.assign(workflowEnglish, {
			"{0} 不能为空或过长": "{0} must not be empty or too long",
			"检查点不存在": "Checkpoint not found",
			"验收材料过大，请将检查点拆分为更小范围": "Acceptance materials are too large; split this checkpoint into smaller scopes",
			"讨论会话已失效": "This discussion session has expired",
			"讨论不属于此团队": "This discussion does not belong to this team",
			"请返回队长对话创建团队": "Return to the captain conversation to create a team",
			"无效团队 ID": "Invalid team ID",
			"当前会话不能读取此流程": "This session cannot read this workflow",
			"当前会话不能查看此归档": "This session cannot view this archive",
			"请返回原队长对话恢复流程": "Return to the original captain conversation to restore this workflow",
			"当前会话不能恢复此归档": "This session cannot restore this archive",
			"当前对话已有可编辑团队，请先查看当前团队": "This conversation already has an editable team; open the current team first",
			"当前会话不能管理此团队": "This session cannot manage this team",
			"节点开关需要目标状态和当前版本，请刷新后重试": "Toggling a node requires its target state and current version; refresh and try again",
			"节点或团队状态已变化，请刷新后重试": "The node or team state has changed; refresh and try again",
			"请在节点属性中完成配置、处理退回或确认重跑": "Complete configuration, handle the rejection, or confirm a rerun in node properties",
			"任务正在停止，请稍候": "The task is stopping; please wait",
			"该人工审核不能暂停": "This human review cannot be paused",
			"该任务不能暂停编辑": "This task cannot be paused for editing",
			"请先在宿主中停止队长当前执行，再暂停此任务以编辑": "Stop the captain's current execution in the host before pausing this task for editing",
			"停止期间任务已变化，请刷新状态": "The task changed while stopping; refresh its state",
			"流程正在更新执行状态，请稍候重试": "The workflow is updating execution state; try again shortly",
			"流程开关需要目标状态": "Toggling the workflow requires a target state",
			"流程已变化或尚未启动，请刷新后重试": "The workflow has changed or has not started; refresh and try again",
			"请等待当前执行停止完成，或重试暂停流程": "Wait for execution to stop, or try pausing the workflow again",
			"流程已禁止新调度，部分执行尚未停止，请重试暂停：{0}": "New scheduling is disabled, but some executions are still stopping; retry pausing: {0}",
			"宿主未加载原生讨论服务": "The host has not loaded the native discussion service",
			"无效节点布局": "Invalid node layout",
			"任务不存在": "Task not found",
			"节点位置超出范围": "Node position is out of bounds",
			"团队已变化，请刷新画布后重试": "The team has changed; refresh the canvas and try again",
			"提案不存在或已替换": "The proposal is missing or has been replaced",
			"布局节点不存在": "Layout node not found",
			"成员仍在运行，请先暂停任务": "This member is still running; pause its task first",
			"提案已替换，请检查新提案": "The proposal has been replaced; review the new proposal",
			"请返回队长会话后新建讨论；当前原生历史会保留": "Return to the captain session to start a new discussion; the native history will be preserved",
			"无效验收决定": "Invalid acceptance decision",
			"请先打开并阅读当前验收材料": "Open and read the current acceptance materials first",
			"请先填写任务／验收要求并完成节点配置": "Fill in the task or acceptance requirements and complete node configuration first",
			"任务尚未停止完成": "The task has not finished stopping",
			"团队已变化，请刷新节点后重新确认": "The team has changed; refresh the node and confirm again",
			"请先等待所有上游任务完成，再确认此节点重跑": "Wait for all upstream tasks to finish before confirming this rerun",
			"未知操作": "Unknown action",
			"团队不存在": "Team not found",
			"请打开原队长会话后继续": "Open the original captain session to continue",
			"操作必须是对象": "Each operation must be an object",
			"{0} 必须是有效文本": "{0} must be valid text",
			"{0} 必须是字符串列表": "{0} must be a list of strings",
			"每次提案需要 1–50 个修改": "Each proposal requires 1–50 changes",
			"每个修改对象必须包含 action 字段，例如 {\"action\":\"update_member\",\"name\":\"planner\",\"summary\":\"职责说明\"}；参数与 action 同层，不使用 type、op 或嵌套 payload": "Each change must include an action field, for example {\"action\":\"update_member\",\"name\":\"planner\",\"summary\":\"Role description\"}; put parameters alongside action, without type, op, or a nested payload",
			"{0} 必须是布尔值": "{0} must be a boolean",
			"checkpoint 必须是布尔值": "checkpoint must be a boolean",
			"未知修改操作：{0}": "Unknown change action: {0}",
			"任务不存在：{0}": "Task not found: {0}",
			"任务 {0} 已开始；请先停止该任务，已结束任务请使用修改并重跑": "Task {0} has started; stop it first, or use edit and rerun for a finished task",
			"任务 ID 重复": "Duplicate task ID",
			"任务名称不能为空": "Task name must not be empty",
			"执行成员不存在：{0}": "Assigned member not found: {0}",
			"人工检查不能分配给执行成员": "Human checkpoints cannot be assigned to execution members",
			"依赖任务不存在：{0}": "Dependency task not found: {0}",
			"已达到团队成员上限": "The team member limit has been reached",
			"成员正在执行任务，请先停止该任务": "This member is executing a task; stop the task first",
			"先重新分配该成员的待执行任务": "Reassign this member's pending tasks first",
			"任务 ID 仅支持字母、数字、下划线和连字符": "Task IDs may contain only letters, numbers, underscores, and hyphens",
			"任务 ID 序号超出范围": "Task ID sequence is out of range",
			"请先处理适配问题，并明确清除问题说明": "Resolve the adaptation issue and explicitly clear its description first",
			"请填写通用任务和本次任务要求": "Fill in both the general and current task requirements",
			"请填写 {0} 的名称与任务／验收要求，再完成配置": "Fill in the name and task or acceptance requirements for {0}, then complete configuration",
			"请先断开该任务的下游连接": "Disconnect this task's downstream links first",
			"团队尚未启动，请直接编辑待执行任务": "The team has not started; edit the pending task directly",
			"只能重跑已结束的执行任务": "Only finished execution tasks can be rerun",
			"请先处理适配问题": "Resolve the adaptation issue first",
			"执行成员不可用或仍在运行，请先停止该成员的任务": "The assigned member is unavailable or still running; stop its task first",
			"受影响的下游任务仍在运行，请先停止后重跑": "Affected downstream tasks are still running; stop them before rerunning",
			"请在编辑任务中填写本次重跑要求": "Enter the requirements for this rerun in the task editor",
			"只能为已拒绝的人工检查创建返工": "Rework can only be created for a rejected human checkpoint",
			"请选择该检查点上游的执行任务": "Select an execution task upstream of this checkpoint",
			"返工路径跨越其他人工检查，请分段处理": "The rework path crosses other human checkpoints; handle it in sections",
			"返工任务仍在运行": "The rework task is still running",
			"团队状态已变化，请重新生成修改预览": "The team state has changed; generate a new change preview",
			"该检查点当前不能验收": "This checkpoint cannot be reviewed right now",
			"验收材料已变化，请刷新材料后重新检查": "Acceptance materials have changed; refresh and review them again",
			"模板格式无效": "Invalid template format",
			"模板文本为空或过长": "Template text is empty or too long",
			"模板列表无效或过长": "The template list is invalid or too long",
			"模板成员名称重复或无效": "Template member names are duplicated or invalid",
			"模板节点 ID 或类型无效": "Invalid template node ID or type",
			"模板节点序号超出范围": "Template node sequence is out of range",
			"模板需要 1–32 个不同的节点": "A template requires 1–32 distinct nodes",
			"模板负责人不存在或人工节点分配了负责人": "A template assignee is missing, or a human node has an assignee",
			"模板依赖缺失或重复": "Template dependencies are missing or duplicated",
			"模板连接产生循环": "Template connections create a cycle",
			"模板布局无效": "Invalid template layout",
			"提炼模板必须保留成员、节点、负责人和连线": "Template extraction must preserve members, nodes, assignees, and connections",
			"统一适配仅用于尚未启动的模板流程": "Unified adaptation is only available for template workflows that have not started",
			"适配只能修改成员本次补充指令": "Adaptation may only change members' current-task instructions",
			"适配不能增删节点或成员": "Adaptation cannot add or remove nodes or members",
			"无效模板 ID": "Invalid template ID",
			"模板记录已损坏": "The template record is corrupted",
			"模板版本记录已损坏": "The template version record is corrupted",
			"模板库正被另一个进程写入；请稍后重试。如宿主异常退出，请确认无人写入后移除模板目录中的 .write-lock。": "Another process is writing to the template library; try again shortly. If the host exited unexpectedly, confirm that no process is writing before removing .write-lock from the template directory.",
			"模板已删除": "The template has been deleted",
			"模板版本不存在": "Template version not found",
			"请为每个节点填写通用任务要求": "Fill in the general task requirements for every node",
			"模板已更新或删除，请重新打开后保存": "The template has been updated or deleted; reopen it before saving",
			"模板已变化，请刷新后重试": "The template has changed; refresh and try again",
			"任务层需要任务要求、交付物和验收要求三个文本字段（每项最多 16000 字）": "Each task layer requires three text fields: requirements, deliverables, and acceptance (up to 16000 characters each)",
			"新建任务必须提供 layers.general 和 layers.specific，各含 requirements、deliverables、acceptance 三个字符串；两层 requirements 均不能为空。不要将分层标题写入 description。": "New tasks must provide layers.general and layers.specific, each containing requirements, deliverables, and acceptance strings. Both requirements fields must be nonempty. Do not put layer headings in description.",
			"AI 拆分只能更新当前任务的 layers，不得新增任务、重跑或修改其他字段": "AI splitting may only update the current task's layers; it cannot add tasks, rerun tasks, or change other fields",
			"请同时填写通用层和本次层的任务要求": "Fill in the requirements for both the general and current layers"
		});
		Object.assign(workflowEnglish, { "无法读取模板 {0}，原文件已保留。": "Cannot read template {0}; the original file has been preserved." });
		Object.assign(workflowEnglish, {
			"重跑路径": "Rerun path",
			"从上游运行到此节点": "Run prerequisites through this node",
			"运行到此节点": "Run through this node",
			"按依赖顺序执行，独立分支可并行；经过人工检查时等待你确认，确认后继续。不会启动目标之外的其他待重跑分支。": "Run in dependency order, with independent branches in parallel. Human checkpoints wait for your approval, then execution continues. Other rerun branches outside this target stay paused.",
			"选择任意待重跑节点，点击「运行到此节点」，会自动安排它及必要上游。人工检查仍需确认；已有结果与旧验收不再用于本轮。": "Select any node awaiting a rerun and choose “Run through this node” to schedule it and its prerequisites. Human checkpoints still require approval; previous results and approvals do not count for this attempt.",
			"。可在任意下游节点选择「运行到此节点」，按依赖执行；人工检查仍需确认，其他分支保留。": ". Choose “Run through this node” on a downstream node to execute its dependency path. Human checkpoints still require approval; other branches stay unchanged.",
			"点击「运行到此节点」，自动安排本节点及必要上游，按依赖顺序执行；人工检查仍需你确认。": "Choose “Run through this node” to schedule this node and its prerequisites in dependency order. Human checkpoints still require your approval.",
			"以下下游节点需使用新结果；可选任意节点点击「运行到此节点」，人工检查仍需确认：": "These downstream nodes need new results. Choose “Run through this node” on any target; human checkpoints still require approval: ",
			"重跑路径存在缺失节点": "A node is missing from the rerun path",
			"重跑路径存在循环": "The rerun path contains a cycle",
			"请先恢复或启动团队，再运行到此节点": "Restore or start the team before running through this node",
			"此节点已不需要确认重跑，请刷新状态": "This node no longer needs rerun confirmation; refresh its state",
			"请先完成路径节点的配置：{0}": "Complete configuration for this path node first: {0}",
			"路径节点正在停止，请稍后重试：{0}": "A path node is stopping; try again shortly: {0}",
			"请先处理路径中的失败或退回节点：{0}": "Resolve the failed or rejected path node first: {0}",
			"路径节点状态已变化，请刷新：{0}": "A path node changed state; refresh: {0}",
			"请先启动路径中手动暂停的节点：{0}": "Start the manually paused path node first: {0}",
			"路径节点缺少执行成员：{0}": "No execution member is available for this path node: {0}"
		});
		Object.assign(workflowEnglish, {
			"先选择模板、填写需求，再选择工作区。": "Choose a template and describe your goal, then select a workspace.",
			"当前工作区 · {0}": "Current workspace · {0}",
			"选择流程工作区": "Select workflow workspace",
			"选择工作区": "Select workspace",
			"模板和需求已保留。选择工作区后，将在其中的新对话中创建流程。": "Your template and requirements are saved. Select a workspace to create the workflow in a new conversation.",
			"已有工作区": "Existing workspaces",
			"正在读取工作区…": "Loading workspaces…",
			"工作区列表读取失败，仍可添加工作区。": "Could not load workspaces. You can still add one.",
			"正在准备工作区与流程…": "Preparing workspace and workflow…",
			"添加工作区": "Add workspace",
			"可选择已有文件夹；需要新目录时，可在文件夹选择器中新建。": "Choose an existing folder, or create a new folder in the directory picker.",
			"工作区文件夹": "Workspace folder",
			"输入工作区所在机器上的完整文件夹路径": "Enter the full folder path on the workspace host",
			"添加并继续": "Add and continue"
		});
		Object.assign(workflowEnglish, {
			"正在回复…": "Replying…",
			"查看最新回复": "View latest reply"
		});
		Object.assign(workflowEnglish, {
			"选择工作区目录": "Select workspace directory",
			"目录路径": "Directory path",
			"主目录": "Home",
			"编辑路径": "Edit path",
			"前往": "Go",
			"新建文件夹": "New folder",
			"显示隐藏文件": "Show hidden folders",
			"隐藏隐藏文件": "Hide hidden folders",
			"打开": "Open",
			"文件夹名称": "Folder name",
			"取消新建": "Cancel new folder",
			"创建": "Create",
			"文件夹列表": "Folders",
			"正在读取文件夹…": "Loading folders…",
			"此目录下没有可见的子文件夹，可直接打开当前目录。": "No visible subfolders. You can open this directory.",
			"文件夹较多，仅显示部分内容；可编辑路径直接前往。": "Only some folders are shown. Edit the path to go directly to another folder.",
			"搜索工作区": "Search workspaces",
			"搜索工作区名称或路径": "Search workspace names or paths",
			"没有匹配的工作区，可更换关键词或添加工作区。": "No matching workspaces. Try another search or add a workspace.",
			"还没有工作区，点击「添加工作区」选择文件夹。": "No workspaces yet. Choose Add workspace to select a folder.",
			"目录选择器暂不可用，请检查 DSH 的工作区组件后重试。": "The directory picker is unavailable. Check the DSH workspace components and try again."
		});
		Object.assign(workflowEnglish, { "Enter 发送 · Shift+Enter 换行": "Enter to send · Shift+Enter for a new line" });
		Object.assign(workflowEnglish, {
			"验收工作台": "Review workbench",
			"人工检查点": "Human checkpoint",
			"第 {0} 轮": "Round {0}",
			"返回节点": "Back to node",
			"验收轮次": "Review round",
			"当前轮次": "Current round",
			"提交记录不等于人工验收通过；没有证据的内容不视为已验证。": "Submitted records are not human approval. Missing evidence is not treated as verification.",
			"要求与提交条目": "Requirements and submitted checks",
			"验收要求与全部证据": "Requirements and all evidence",
			"上游报告 · {0}": "Upstream report · {0}",
			"已关联同名提交记录": "Matching submitted record",
			"未关联证据": "No linked evidence",
			"未提供结构化验收条目，请按完整要求核对全部证据。": "No structured criteria were supplied. Check all evidence against the full requirements.",
			"验收要求": "Review requirements",
			"此记录没有保存验收要求快照。": "This record has no saved requirements snapshot.",
			"关联证据": "Linked evidence",
			"与上一轮对比": "Compare with previous round",
			"证据视图": "Evidence view",
			"没有可比较的上一轮证据快照；旧记录只有审批信息时，不会重建历史证据。": "No previous evidence snapshot is available. Historical evidence is not reconstructed from decision-only records.",
			"比较第 {0} 轮与第 {1} 轮的全部提交记录和文件摘要。": "Comparing all submitted records and file digests from rounds {0} and {1}.",
			"验收要求已变化": "Requirements changed",
			"上一轮": "Previous round",
			"当前查看轮次": "Viewed round",
			"没有此项记录": "No record for this item",
			"文件摘要或可读状态已变化；这里不展示文件内容差异。": "The file digest or readability changed. File content diffs are not shown here.",
			"无可读摘要": "No readable digest",
			"文件读取范围缺口已变化，请核对原始证据记录。": "File coverage gaps changed. Check the raw evidence record.",
			"提交内容与文件摘要未变化。": "Submitted content and file digests are unchanged.",
			"这是上游 Agent 的提交条目，不代表已覆盖检查点的全部要求。": "This is an upstream agent report. It does not establish coverage of every checkpoint requirement.",
			"未找到同名提交记录。请查看全部证据，或与 AI 讨论缺口。": "No matching submitted record was found. Inspect all evidence or discuss the gap with AI.",
			"命令记录": "Command records",
			"退出码": "Exit code",
			"上游提交条目": "Upstream submitted checks",
			"未提交证据说明": "No evidence explanation submitted",
			"无法读取": "Unreadable",
			"文件不存在": "File not found",
			"宿主已读取文件摘要": "Host-read file digest",
			"文件读取范围缺口": "File coverage gaps",
			"此历史记录没有保存证据快照；仅展示原有审批信息。": "This historical record has no evidence snapshot. Only the original decision is shown.",
			"打开或刷新验收材料后，才能提交本轮决定。": "Open or refresh review materials before submitting this round’s decision.",
			"检查点尚未就绪，可先查看要求；上游完成且节点启用后再验收。": "This checkpoint is not ready. You can inspect requirements now and review after prerequisites complete and the node is enabled.",
			"已保存的验收决定": "Saved review decision",
			"与 AI 讨论验收": "Discuss review with AI",
			"讨论使用整个检查点的上下文；聊天不会写入审批决定。": "Discussion uses the whole checkpoint context. Chat does not record approval.",
			"你的验收决定": "Your review decision",
			"通过后，下游仍按依赖与暂停状态调度：": "After approval, downstream work still follows dependencies and pause controls: ",
			"当前材料有 {0} 项失败记录或文件读取缺口，请核实后决定。": "The materials contain {0} failed records or file coverage gaps. Verify them before deciding.",
			"请填写退回原因。": "Enter a reason for returning the work.",
			"退回修改": "Return for changes",
			"确认本轮验收": "Confirm this review",
			"确认通过第 {0} 轮验收？": "Approve review round {0}?",
			"请确认已核对要求与证据。Agent 报告通过不代表人工已验证。": "Confirm you have checked the requirements and evidence. An agent report is not human verification.",
			"继续检查": "Keep reviewing",
			"确认通过": "Confirm approval",
			"上游已完成 · 打开验收工作台核对证据": "Prerequisites complete · Open the review workbench to inspect evidence",
			"查看验收工作台": "View review workbench",
			"成果": "Outcomes",
			"成果展台": "Outcome showcase",
			"根据任务记录整理，不调用模型。": "Organized from task records. No model calls.",
			"{0} 个任务有提交说明 · {1} 个文件条目": "{0} tasks with submissions · {1} file entries",
			"暂无执行任务成果。任务提交后会在这里显示。": "No execution task outcomes yet. Submissions will appear here.",
			"成果来源任务": "Source tasks",
			"已提交说明": "Submission available",
			"暂无提交说明": "No submission yet",
			"{0} 个文件条目": "{0} file entries",
			"来源任务": "Source task",
			"第 {0} 次执行": "Attempt {0}",
			"查看原任务": "View source task",
			"任务正在更新或等待重跑；当前文件不代表本轮已完成交付。": "This task is running or awaiting a rerun. Current files do not establish a completed delivery for this attempt.",
			"提交说明与验证": "Submission and verification",
			"文件来自约定交付或报告变更，是否存在需打开核对。": "Files come from declared deliverables or reported changes. Open a file to check availability.",
			"成果文件": "Outcome files",
			"约定交付物": "Declared deliverable",
			"报告变更": "Reported change",
			"仅展示前 200 个文件条目，其余请查看原任务。": "Showing the first 200 file entries. See the source task for the rest.",
			"刷新文件": "Refresh file",
			"当前工作区文件，不是历史快照；审批记录不代表此文件版本已验收。": "Current workspace file, not a historical snapshot. Approval records do not verify this file version.",
			"正在读取文件…": "Reading file…",
			"图片无法解码，请在工作区查看原文件。": "Image could not be decoded. Open the original in your workspace.",
			"查看原文": "View source",
			"预览": "Preview",
			"仅预览前 100 行、50 列。": "Preview limited to 100 rows and 50 columns.",
			"文件为空": "Empty file",
			"当前文件指纹": "Current file fingerprint",
			"任务提交说明": "Task submission",
			"尚未提交结果。约定交付物和任务完成状态不能代替实际成果。": "No result submitted yet. Declared deliverables and task status do not establish actual outcomes.",
			"验证记录": "Verification records",
			"以下为 Agent 提交记录，不代表独立测试或人工验收。": "These are agent-reported records, not independent testing or human approval.",
			"暂无验证记录": "No verification records",
			"报告通过": "Reported pass",
			"报告失败": "Reported failure",
			"下游人工检查点": "Downstream human checkpoints",
			"等待人工决定": "Awaiting human decision",
			"历史提交说明": "Historical submissions",
			"这里只保留历史文字记录，没有保存历史文件副本。": "Only historical text records are retained here. Historical file copies are not stored.",
			"本次停止前未提交结果": "No result submitted before this attempt stopped",
			"文件可预览": "File ready for preview",
			"文件不存在或已被移除": "File missing or removed",
			"此路径不支持预览：仅允许工作区内明确声明的普通文件。": "Preview requires an explicitly declared regular file inside the workspace.",
			"此文件类型或编码暂不支持预览。": "This file type or encoding is not supported for preview.",
			"文件超过预览上限：文本 256 KiB，图片 4 MiB。": "File exceeds the preview limit: 256 KiB for text, 4 MiB for images.",
			"文件无法读取或读取期间已变化，请刷新重试。": "File could not be read or changed while reading. Refresh to try again.",
			"当前会话不能查看此团队成果": "This session cannot view outcomes for this team",
			"文件未在此任务的交付或变更记录中声明": "This file is not declared in the task deliverables or changes",
			"恢复并编辑流程后可安排返工。": "Restore and edit the workflow to arrange rework.",
			"请先恢复或启动团队，再安排返工。": "Restore or start the team before arranging rework.",
			"受影响的任务仍在运行，请先暂停后再返工。": "Affected tasks are still running. Pause them before arranging rework.",
			"安排返工": "Arrange rework",
			"验收已退回 · 下一步": "Review returned · Next step",
			"选择需要修改的上游任务，确认返工要求后重跑。原结果和验收意见会保留在历史记录中。": "Choose an upstream task and confirm the changes to rerun it. Previous results and review notes remain in history.",
			"需要返工的任务": "Task to rework",
			"请选择任务": "Select a task",
			"返工要求": "Rework instructions",
			"受影响的后续节点：": "Affected downstream nodes: ",
			"保存后先重跑所选任务，再点击「运行到此节点」确认后续路径。新结果仍需人工验收，其他受影响分支保持暂停。": "Saving reruns the selected task. Then choose “Run through this node” to confirm the continuation path. New results still require human approval; other affected branches remain paused.",
			"保存要求并重跑任务": "Save instructions and rerun task",
			"没有可直接重跑的上游任务。请返回节点调整任务与依赖，或讨论返工方案。": "No upstream task can be rerun directly. Return to the node to adjust tasks and dependencies, or discuss a rework plan.",
			"返回节点调整流程": "Return to node and adjust workflow",
			"讨论返工方案": "Discuss rework plan",
			"安排验收返工": "Arrange review rework",
			"安排返工 · {0}": "Arrange rework · {0}",
			"只能重新验收已退回的检查点": "Only a returned checkpoint can be reopened for review",
			"请先完成上游任务并启用检查点，再重新验收": "Complete upstream work and enable the checkpoint before reopening review",
			"如果退回有误，或当前结果已经可以接受，可重新验收当前结果。退回记录会保留，不会自动通过或启动任务。": "If the return was mistaken or the current result is now acceptable, reopen its review. The returned decision stays in history; reopening does not approve or start tasks.",
			"重新验收当前结果": "Review current results again",
			"正在更新验收材料或状态，请稍候。": "Updating review evidence or state. Please wait.",
			"本轮验收材料尚未就绪；正在首次加载，读取失败时请点击「刷新验收材料」重试。": "Evidence for this round is not ready. It loads automatically once; if reading fails, choose “Refresh review evidence” to retry.",
			"交付内容": "Deliverables",
			"执行已中断": "Execution interrupted",
			"任务尚未提交完成，但宿主已无运行中的执行会话。继续会封存旧尝试并重新派发，已完成的其他任务保留。": "The task has not completed, but its execution session is no longer running. Continue archives the old attempt and dispatches a new one, preserving other completed tasks.",
			"阻塞原因与下一步": "Blocker and next step",
			"阻塞与恢复": "Blockers and recovery",
			"打开验收": "Open review",
			"完善节点配置": "Complete node configuration",
			"继续此任务": "Continue this task",
			"重试停止": "Retry stop",
			"调整负责人": "Change assignee",
			"连接需要恢复": "Connection needs recovery",
			"重新连接并读取状态": "Reconnect and read state",
			"请先重新连接并核对最新状态，再操作流程。": "Reconnect and check the latest state before changing the workflow.",
			"连接中断或请求超时。操作可能已经保存，请先重新连接并核对状态，再决定是否继续。": "Connection lost or request timed out. The operation may already be saved. Reconnect and check state before continuing.",
			"请先处理节点配置、返工或团队启动状态": "Resolve node configuration, rerun confirmation, or team startup first",
			"执行会话仍在运行，无需重复继续；如需重跑请先暂停": "The execution session is still running. Pause it before restarting; no continuation is needed.",
			"任务状态已变化，请刷新后继续": "Task state changed. Refresh before continuing.",
			"填写恢复原因后可继续待执行工作；已取消或失败的任务需单独重跑。": "Enter a reason to restore pending work. Cancelled or failed tasks require an explicit rerun.",
			"恢复原因": "Reason for recovery",
			"恢复团队": "Restore team",
			"恢复后可继续待执行工作；已取消或失败的任务需单独重跑。": "Restore to continue pending work. Cancelled or failed tasks require an explicit rerun.",
			"目标之后仍有任务运行，请先暂停这些任务再限定执行范围": "Tasks beyond the target are still running. Pause them before limiting the execution scope.",
			"团队并未停止，请刷新状态": "The team is not halted. Refresh its state."
		});
		//#endregion
		//#region lib/client/locales.js
		/** `agentTeams` namespace dictionaries for every plugin-owned Web surface. */
		/** Dictionary namespace owned by the AgentTeams client plugin. */
		const AGENT_TEAMS_LOCALE_NAMESPACE = "agentTeams";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"language.code": "zh",
			"activity.state.running": "执行中",
			"activity.state.review": "待验收",
			"activity.state.attention": "待处理",
			"activity.state.configuration": "待配置",
			"activity.state.paused": "已暂停",
			"activity.state.completed": "已完成",
			"activity.state.archived": "已归档",
			"activity.state.history": "历史记录",
			"activity.state.staged": "待启动",
			"activity.state.waiting": "等待中",
			"activity.summary": "已完成 {done}/{total} · 运行中 {running} · 待验收 {review} · 待处理 {attention}",
			"workflow.executionChat": "执行对话 ↗",
			"task.control.rerun": "修改并重跑",
			"task.control.rerunTask": "编辑重跑要求 · {task}",
			"task.control.start": "开始",
			"task.control.pause": "暂停",
			"task.control.dequeue": "取消排队",
			"flow.summary.held": "流程待启动或已暂缓，请查看节点状态",
			"progress.held": "■ 未启用 {count}",
			"task.control.claimedHint": "执行 Agent 已领取，正在准备执行；尚未进入正式执行。",
			"flow.control.start": "开始全部",
			"flow.control.pause": "暂停全部",
			"flow.control.hint": "开始全部会确认待重跑并启用所有已配置节点，按依赖执行；人工验收通过后自动继续。不会代替人工审批。暂停全部会停止当前执行并取消后续排队。",
			"task.control.startTask": "开始 · {task}",
			"task.control.pauseTask": "暂停 · {task}",
			"task.control.rerunHint": "进入任务编辑，查看上一轮结果并填写本轮要求后重跑；下游先等待新结果，再由你启动执行或重新验收。",
			"task.control.enabled": "已启用",
			"task.control.paused": "已暂停",
			"task.control.awaitingStart": "待启动",
			"task.control.waiting": "等待上游",
			"task.control.blocked": "上游受阻",
			"task.control.queued": "等待调度",
			"task.control.staged": "等待团队启动",
			"task.control.stopped": "团队已停止",
			"task.control.rerunRequired": "需要重新执行",
			"task.control.rerunWaiting": "等待上游新结果",
			"task.control.reviewRequired": "需要重新验收",
			"task.control.switch": "启用／暂停 · {task}",
			"task.control.hint": "开始后等待前置完成；暂停执行中的任务会停止当前执行，再次开始将重新执行。",
			"task.control.saving": "正在更新节点状态…",
			"task.control.stopping": "等待执行停止",
			"task.control.retryStop": "重试停止",
			"task.control.failed": "节点状态更新失败，请刷新或重试。",
			"task.control.review": "开始审核",
			"task.control.properties": "节点属性",
			"task.control.human": "人工审核",
			"task.control.round": "第 {round} 轮",
			"workspace.dependencies": "从左到右：完成前置后解锁 · 点击查看详情",
			"workspace.title": "TeamFlow 团队协作",
			"workspace.guide": "查看成员分工、任务依赖与执行进度",
			"workspace.eyebrow": "TEAMFLOW",
			"workspace.description": "队长统筹分工，成员按任务依赖并行协作。",
			"workspace.relationships": "队长协调成员分工；任务连线表示前置依赖。点击任务可定位负责成员。",
			"workspace.emptyTitle": "当前会话还没有团队",
			"workspace.emptyBody": "在聊天中使用 /teamflow 描述目标，确认计划后即可在这里查看协作进度。",
			"workspace.loading": "正在读取团队状态",
			"workspace.error": "暂时无法连接团队服务，正在自动重试。已加载的状态可能不是最新。",
			"workspace.retry": "重新连接",
			"workspace.current": "当前团队",
			"workspace.history": "历史记录",
			"workspace.back": "返回对话",
			"workspace.tasks": "项任务",
			"workspace.members": "名成员",
			"workspace.completed": "已完成",
			"workspace.focus": "查看团队",
			"workspace.noTasks": "等待队长拆解任务",
			"workspace.inbox": "队长收件箱",
			"workspace.inboxHint": "最近 5 条未读消息",
			"workspace.inboxEmpty": "暂无未读消息。成员回报会在这里显示，队长读取后移出。",
			"workspace.taskSummary": "任务完成情况",
			"workspace.verdictStale": "结论已过期",
			"card.memberCount": "{count} 名成员",
			"action.openActivityPanel": "打开活动面板",
			"activity.panelButton": "活动面板",
			"activity.badgeAria": "打开 TeamFlow 画布与历史，{count} 条团队记录",
			"activity.panelAria": "TeamFlow 活动面板",
			"activity.title": "TeamFlow 活动",
			"activity.float": "切换为浮动面板",
			"activity.dockRight": "停靠到右侧",
			"activity.collapse": "收起活动面板",
			"activity.empty": "暂无团队活动",
			"team.stop": "停止团队",
			"team.stopped": "已停止",
			"team.stopTitle": "确认停止“{team}”？",
			"team.stopDescription": "将取消 {tasks} 项未完成任务，并停止 {members} 名正在工作的成员。已完成的结果会保留。",
			"team.stopCancel": "继续运行",
			"team.stopConfirm": "确认停止",
			"team.stopping": "正在停止…",
			"team.stopFailed": "停止失败：{message}",
			"team.stopRequestFailed": "服务器未能停止团队，请重试",
			"team.discarded": "已放弃",
			"format.listSeparator": "、",
			"task.status.pending": "待领取",
			"task.status.reviewPassed": "人工验收通过",
			"task.status.reviewPaused": "人工验收已挂起",
			"task.status.configurationPending": "待配置",
			"task.status.reviewRejected": "验收已退回",
			"task.status.reviewWaiting": "验收等待上游",
			"task.status.reviewReady": "等待人工验收",
			"task.assignee.human": "你与验收 Agent",
			"task.summary.review": "{tasks} 等待你人工验收",
			"task.status.claimed": "准备执行",
			"task.status.inProgress": "进行中",
			"task.status.completed": "已完成",
			"task.status.failed": "失败",
			"task.status.cancelled": "已取消",
			"task.status.notRun": "未执行",
			"member.state.working": "工作中",
			"member.state.failed": "有失败",
			"member.state.waiting": "等待",
			"member.state.delivered": "已交付",
			"member.state.left": "已离队",
			"member.state.removed": "已移除",
			"member.state.pending": "待执行",
			"member.state.unassigned": "待派工",
			"member.state.staged": "待创建",
			"member.state.notCreated": "未创建",
			"member.state.stopped": "已停止",
			"member.status.executing": "正在执行 {taskId}",
			"member.status.executingModel": "正在执行 {taskId} · {model}",
			"member.status.working": "正在处理已派任务",
			"member.status.waitingOn": "等待 {taskId} · {assignee}",
			"member.status.waitingPrerequisite": "等待前置任务",
			"member.status.waitingAssignment": "等待队长派工",
			"member.status.delivered": "任务已交付",
			"member.status.idle": "待继续执行",
			"member.status.unknown": "状态未知",
			"member.status.staged": "确认后创建并启动",
			"member.status.settled": "任务均已终结",
			"member.status.discarded": "计划已放弃，未创建",
			"member.status.stopped": "团队已停止，需显式恢复",
			"task.assignee.unclaimed": "待认领",
			"task.summary.waitingBreakdown": "等待队长拆解任务",
			"task.summary.staged": "{count} 项计划等待确认",
			"task.summary.discarded": "{count} 项计划已放弃，均未执行",
			"task.summary.allDelivered": "全部 {count} 项任务已交付",
			"task.summary.ended": "终态：{completed} 已交付 · {cancelled} 已取消 · {failed} 失败",
			"task.summary.blockedAndRunning": "{tasks}{more} 等待前置，其余已开工",
			"task.summary.more": " 等 {count} 项",
			"task.summary.running": "{tasks} 正在执行",
			"task.summary.claimed": "准备执行：{tasks}",
			"task.summary.ready": "{tasks} 已就绪待开工",
			"task.summary.blocked": "{tasks} 等待前置",
			"task.summary.failedSettled": "{count} 项已失败，自动循环已停止",
			"task.summary.waitingSchedule": "等待下一轮调度",
			"progress.aria": "团队总进度",
			"progress.title": "总进度",
			"progress.running": "■ 进行中 {count}",
			"progress.claimed": "■ 准备执行 {count}",
			"progress.blocked": "■ 等待依赖 {count}",
			"progress.delivered": "■ 已交付 {count}",
			"dependency.aria": "任务依赖链",
			"dependency.parallel": "并行任务",
			"dependency.title": "任务依赖",
			"dependency.hint.parallel": "无前后依赖 · 点击查看详情",
			"dependency.hint.chain": "悬停高亮依赖链 · 点击固定",
			"dependency.hint.pinned": "{taskId} 已固定 · Esc 取消",
			"task.runningAria": "运行中",
			"task.model": "{model}",
			"task.detail.cancelled": "任务已取消，不会继续执行",
			"task.detail.failed": "任务失败，等待明确重试",
			"task.detail.completed": "已完成并交付",
			"task.detail.noPrerequisite": "无前置，可立即开工",
			"task.detail.ready": "前置已就绪，可开工",
			"task.detail.waitingOn": "等待 {tasks}",
			"task.detail.notRun": "计划已放弃，任务未执行",
			"task.detail.noDownstream": "无下游任务",
			"task.detail.more": "依赖与操作说明",
			"task.detail.unlocks": "完成后解锁 {tasks}",
			"team.ended": "已结束",
			"plan.badge": "待确认",
			"plan.title": "执行前计划审查",
			"plan.description": "成员尚未创建、任务尚未调度。可直接调整计划，也可返回对话告诉队长哪里需要修改。",
			"plan.member.role": "角色",
			"plan.member.provider": "Provider",
			"plan.member.model": "模型",
			"plan.member.reasoning": "推理等级",
			"plan.member.reasoningHint": "留空使用默认值；可用 low、medium、high、xhigh 等",
			"plan.model.choose": "选择模型",
			"plan.model.currentUnavailable": "{provider}/{model}（当前目录不可用）",
			"plan.model.route": "路由：{provider}/{model}",
			"plan.model.defaultReasoning": "默认推理等级",
			"plan.model.providerDefault": "Provider 默认值",
			"plan.model.modelDefault": "模型默认值（{effort}）",
			"plan.model.triggerAria": "选择成员模型，当前 {model}，推理等级 {effort}",
			"plan.model.back": "返回",
			"plan.model.loading": "正在加载模型…",
			"plan.model.empty": "暂无可用模型",
			"plan.model.partialFailure": "{count} 个 Provider 的模型目录加载失败",
			"plan.model.retry": "重试",
			"plan.member.prompt": "角色提示词",
			"plan.member.roleFallback": "未设置角色",
			"plan.task.subject": "任务名称",
			"plan.task.description": "任务说明",
			"plan.task.assignee": "负责人",
			"plan.task.dependencies": "依赖任务 ID（逗号分隔）",
			"plan.task.dependenciesHint": "例如 task-1, task-2；不得形成循环依赖",
			"plan.task.unassigned": "共享任务池",
			"plan.unsaved": "未保存",
			"plan.save": "保存",
			"plan.saving": "保存中…",
			"plan.remove": "删除",
			"plan.removed": "任务已删除",
			"plan.removeConfirm": "确认删除",
			"plan.removeWarning": "删除 {task} 后将重新计算依赖关系。",
			"plan.cancel": "取消",
			"plan.addTask": "添加任务",
			"plan.adding": "添加中…",
			"plan.taskAdded": "任务已添加",
			"plan.newTask": "新任务名称",
			"plan.newTaskLabel": "新增计划任务",
			"plan.readySummary": "{members} 名成员 · {tasks} 项任务 · {links} 条依赖",
			"plan.flow.aria": "团队启动流程",
			"plan.flow.review": "审查计划",
			"plan.flow.spawn": "创建成员",
			"plan.flow.run": "开始执行",
			"plan.members.title": "成员与模型路由",
			"plan.members.count": "{count} 名成员",
			"plan.members.empty": "尚未规划成员",
			"plan.tasks.title": "任务与依赖",
			"plan.tasks.count": "{count} 项任务 · {links} 条依赖",
			"plan.tasks.empty": "尚未规划任务",
			"plan.dependencies.none": "无依赖",
			"plan.dependencies.count": "{count} 条依赖",
			"plan.approve": "确认并启动团队",
			"plan.approving": "正在创建成员…",
			"plan.approveTitle": "计划检查完毕？",
			"plan.approveHint": "确认后将创建 {members} 名成员并调度 {tasks} 项任务。",
			"plan.approveConfirmTitle": "确认启动此团队",
			"plan.approveWarning": "启动后不能再在此处编辑成员和依赖。",
			"plan.approveConfirm": "确认启动",
			"plan.continue": "返回对话修改",
			"plan.returnToChat": "回到对话",
			"plan.feedbackTitle": "正在等你说明修改方向",
			"plan.feedbackHint": "队长会在对话中追问；收到你的回复后，只修改这份草案并再次等待确认。",
			"plan.discard": "放弃本次计划",
			"plan.discardConfirmTitle": "放弃本次计划？",
			"plan.discardWarning": "该计划会结束并归档；尚未创建任何成员，也不会执行任务。",
			"plan.discardConfirm": "确认放弃",
			"plan.discarding": "正在放弃…",
			"plan.pendingEdits": "请先保存当前修改，再启动团队。",
			"plan.saved": "计划已保存",
			"plan.failed": "操作失败：{message}",
			"team.stats.members": "{count} 名成员",
			"team.stats.completed": "{completed}/{total} 完成",
			"team.stats.messages": "{count} 条消息",
			"delegation.aria": "队长派工关系",
			"captain.name": "队长",
			"captain.role": "拆解 · 派发 · 汇总",
			"captain.summary": "已派发 {tasks} 项任务给 {members} 名成员",
			"captain.summary.staged": "已规划 {tasks} 项任务与 {members} 名成员，等待确认",
			"captain.summary.awaitingFeedback": "草案已保留，等待你在对话中说明修改方向",
			"captain.summary.discarded": "计划已放弃：{members} 名成员未创建，{tasks} 项任务未执行",
			"captain.summary.withTakeover": "已派发 {tasks} 项给成员 · 队长接管 {captainTasks}",
			"captain.state.working": "{count} 人执行中",
			"captain.state.takeover": "正在执行 {tasks}",
			"captain.state.collected": "已收齐",
			"captain.state.waiting": "等待回报",
			"captain.state.staged": "待确认",
			"captain.state.awaitingFeedback": "待反馈",
			"captain.state.discarded": "已放弃",
			"captain.state.settled": "已终结",
			"members.toggle": "{count} 名成员",
			"members.collapse": "收起",
			"members.expand": "展开",
			"members.expandFinished": "展开已结束（{count}）",
			"members.empty": "暂无成员，等待队长组建团队",
			"assignment.label": "队长派发",
			"assignment.staged": "计划任务",
			"assignment.discarded": "未执行的计划",
			"assignment.empty": "暂无任务",
			"archive.label": "已结束 · 历史归档",
			"archive.discardedLabel": "计划已放弃 · 历史归档"
		};
		/** English dictionary, checked complete against the Chinese source key set. */
		const en = {
			"language.code": "en",
			"activity.state.running": "Running",
			"activity.state.review": "Review",
			"activity.state.attention": "Attention",
			"activity.state.configuration": "Setup needed",
			"activity.state.paused": "Paused",
			"activity.state.completed": "Complete",
			"activity.state.archived": "Archived",
			"activity.state.history": "History",
			"activity.state.staged": "Ready to start",
			"activity.state.waiting": "Waiting",
			"activity.summary": "Completed {done}/{total} · Running {running} · Reviews {review} · Attention {attention}",
			"workflow.executionChat": "Execution chat ↗",
			"task.control.rerun": "Edit and rerun",
			"task.control.rerunTask": "Edit rerun requirements · {task}",
			"task.control.start": "Start",
			"task.control.pause": "Pause",
			"task.control.dequeue": "Remove from queue",
			"flow.summary.held": "Workflow awaiting start or held; check node states",
			"progress.held": "■ Not enabled {count}",
			"task.control.claimedHint": "An agent has claimed this task and is preparing to execute it; execution has not started yet.",
			"flow.control.start": "Start all",
			"flow.control.pause": "Pause all",
			"flow.control.hint": "Start all confirms pending reruns and enables configured nodes in dependency order. Work continues after human approval; reviews are never approved automatically. Pause all stops current executions and removes queued work.",
			"task.control.startTask": "Start · {task}",
			"task.control.pauseTask": "Pause · {task}",
			"task.control.rerunHint": "Open the task editor, review the previous result and add new requirements before rerunning. Downstream tasks wait for new inputs, then you can start each task or review again.",
			"task.control.enabled": "Enabled",
			"task.control.paused": "Paused",
			"task.control.awaitingStart": "Awaiting start",
			"task.control.waiting": "Waiting for upstream",
			"task.control.blocked": "Upstream blocked",
			"task.control.queued": "Awaiting dispatch",
			"task.control.staged": "Awaiting team start",
			"task.control.stopped": "Team stopped",
			"task.control.rerunRequired": "Needs rerun",
			"task.control.rerunWaiting": "Waiting for new inputs",
			"task.control.reviewRequired": "Needs new review",
			"task.control.switch": "Enable/pause · {task}",
			"task.control.hint": "Started tasks wait for prerequisites. Pausing running work stops its current execution; starting it again restarts execution.",
			"task.control.saving": "Updating task state…",
			"task.control.stopping": "Waiting for execution to stop",
			"task.control.retryStop": "Retry stop",
			"task.control.failed": "Could not update task state. Refresh or retry.",
			"task.control.review": "Start review",
			"task.control.properties": "Task properties",
			"task.control.human": "Human review",
			"task.control.round": "Round {round}",
			"workspace.dependencies": "Left to right: prerequisites unlock tasks · Select for details",
			"workspace.title": "Team workspace",
			"workspace.guide": "Members, task dependencies, and execution progress",
			"workspace.eyebrow": "TEAMFLOW",
			"workspace.description": "The captain coordinates. Members work in parallel as dependencies clear.",
			"workspace.relationships": "The captain coordinates members. Connections show task prerequisites. Select a task to locate its owner.",
			"workspace.emptyTitle": "No team in this conversation yet",
			"workspace.emptyBody": "Use /teamflow in chat to describe your goal. Review the plan, then follow the team here.",
			"workspace.loading": "Loading team activity",
			"workspace.error": "The team service is unavailable. Retrying automatically; loaded activity may be out of date.",
			"workspace.retry": "Reconnect",
			"workspace.current": "Current team",
			"workspace.history": "History",
			"workspace.back": "Back to conversation",
			"workspace.tasks": "tasks",
			"workspace.members": "members",
			"workspace.completed": "completed",
			"workspace.focus": "View team",
			"workspace.noTasks": "Waiting for the captain to define tasks",
			"workspace.inbox": "Captain inbox",
			"workspace.inboxHint": "Up to 5 recent unread messages",
			"workspace.inboxEmpty": "No unread messages. Member reports appear here until the captain reads them.",
			"workspace.taskSummary": "Task completion summary",
			"workspace.verdictStale": "Verdict outdated",
			"card.memberCount": "{count} members",
			"action.openActivityPanel": "Open activity panel",
			"activity.panelButton": "Activity panel",
			"activity.badgeAria": "Open TeamFlow canvas and history, {count} team records",
			"activity.panelAria": "TeamFlow activity panel",
			"activity.title": "TeamFlow activity",
			"activity.float": "Switch to floating panel",
			"activity.dockRight": "Dock to the right",
			"activity.collapse": "Collapse activity panel",
			"activity.empty": "No team activity",
			"team.stop": "Stop team",
			"team.stopped": "Stopped",
			"team.stopTitle": "Stop “{team}”?",
			"team.stopDescription": "This cancels {tasks} unfinished tasks and stops {members} working members. Completed results are kept.",
			"team.stopCancel": "Keep running",
			"team.stopConfirm": "Stop team",
			"team.stopping": "Stopping…",
			"team.stopFailed": "Could not stop team: {message}",
			"team.stopRequestFailed": "The server could not stop this team. Try again.",
			"team.discarded": "Discarded",
			"format.listSeparator": ", ",
			"task.status.pending": "Unclaimed",
			"task.status.reviewPassed": "Human review approved",
			"task.status.reviewPaused": "Human review paused",
			"task.status.configurationPending": "Configuration required",
			"task.status.reviewRejected": "Review rejected",
			"task.status.reviewWaiting": "Review waiting for upstream",
			"task.status.reviewReady": "Awaiting human review",
			"task.assignee.human": "You and the review agent",
			"task.summary.review": "{tasks} awaiting your review",
			"task.status.claimed": "Preparing to run",
			"task.status.inProgress": "In progress",
			"task.status.completed": "Completed",
			"task.status.failed": "Failed",
			"task.status.cancelled": "Cancelled",
			"task.status.notRun": "Not run",
			"member.state.working": "Working",
			"member.state.failed": "Has failures",
			"member.state.waiting": "Waiting",
			"member.state.delivered": "Delivered",
			"member.state.left": "Left team",
			"member.state.removed": "Removed",
			"member.state.pending": "Pending",
			"member.state.unassigned": "Awaiting assignment",
			"member.state.staged": "Not spawned",
			"member.state.notCreated": "Not created",
			"member.state.stopped": "Stopped",
			"member.status.executing": "Working on {taskId}",
			"member.status.executingModel": "Working on {taskId} · {model}",
			"member.status.working": "Working on assigned tasks",
			"member.status.waitingOn": "Waiting for {taskId} · {assignee}",
			"member.status.waitingPrerequisite": "Waiting for prerequisites",
			"member.status.waitingAssignment": "Waiting for the captain to assign work",
			"member.status.delivered": "Tasks delivered",
			"member.status.idle": "Ready to continue",
			"member.status.unknown": "Status unknown",
			"member.status.staged": "Will be spawned after approval",
			"member.status.settled": "All assigned work is settled",
			"member.status.discarded": "Plan discarded; member was not created",
			"member.status.stopped": "Team stopped; explicit resume required",
			"task.assignee.unclaimed": "Unclaimed",
			"task.summary.waitingBreakdown": "Waiting for the captain to break down the work",
			"task.summary.staged": "{count} planned tasks awaiting approval",
			"task.summary.discarded": "{count} planned tasks discarded; none ran",
			"task.summary.allDelivered": "All {count} tasks delivered",
			"task.summary.ended": "Final: {completed} delivered · {cancelled} cancelled · {failed} failed",
			"task.summary.blockedAndRunning": "{tasks}{more} waiting on prerequisites; other work has started",
			"task.summary.more": " and {count} more",
			"task.summary.running": "{tasks} in progress",
			"task.summary.claimed": "Preparing to run: {tasks}",
			"task.summary.ready": "{tasks} ready to start",
			"task.summary.blocked": "{tasks} waiting on prerequisites",
			"task.summary.failedSettled": "{count} failed; the automatic loop has stopped",
			"task.summary.waitingSchedule": "Waiting for the next scheduling round",
			"progress.aria": "Overall team progress",
			"progress.title": "Overall progress",
			"progress.running": "■ In progress {count}",
			"progress.claimed": "■ Preparing {count}",
			"progress.blocked": "■ Waiting {count}",
			"progress.delivered": "■ Delivered {count}",
			"dependency.aria": "Task dependency chain",
			"dependency.parallel": "Parallel tasks",
			"dependency.title": "Task dependencies",
			"dependency.hint.parallel": "No dependencies · Click for details",
			"dependency.hint.chain": "Hover to highlight dependencies · Click to pin",
			"dependency.hint.pinned": "{taskId} pinned · Esc to clear",
			"task.runningAria": "Running",
			"task.model": "{model}",
			"task.detail.cancelled": "Cancelled; execution will not continue",
			"task.detail.failed": "Failed; awaiting an explicit retry",
			"task.detail.completed": "Completed and delivered",
			"task.detail.noPrerequisite": "No prerequisites; ready to start",
			"task.detail.ready": "Prerequisites ready; can start",
			"task.detail.waitingOn": "Waiting for {tasks}",
			"task.detail.notRun": "Plan discarded; task was not run",
			"task.detail.noDownstream": "No downstream tasks",
			"task.detail.more": "Dependencies and controls",
			"task.detail.unlocks": "Unlocks {tasks} when complete",
			"team.ended": "Ended",
			"plan.badge": "Awaiting approval",
			"plan.title": "Pre-run plan review",
			"plan.description": "Members have not been spawned and tasks have not been scheduled. Edit the draft here, or return to chat and tell the Captain what should change.",
			"plan.member.role": "Role",
			"plan.member.provider": "Provider",
			"plan.member.model": "Model",
			"plan.member.reasoning": "Reasoning effort",
			"plan.member.reasoningHint": "Leave blank for default; accepts low, medium, high, xhigh, and more",
			"plan.model.choose": "Choose a model",
			"plan.model.currentUnavailable": "{provider}/{model} (not in the current catalog)",
			"plan.model.route": "Route: {provider}/{model}",
			"plan.model.defaultReasoning": "Default reasoning effort",
			"plan.model.providerDefault": "Provider default",
			"plan.model.modelDefault": "Model default ({effort})",
			"plan.model.triggerAria": "Choose member model, currently {model}, reasoning effort {effort}",
			"plan.model.back": "Back",
			"plan.model.loading": "Loading models…",
			"plan.model.empty": "No models available",
			"plan.model.partialFailure": "{count} provider catalogs could not be loaded",
			"plan.model.retry": "Retry",
			"plan.member.prompt": "Role prompt",
			"plan.member.roleFallback": "Role not set",
			"plan.task.subject": "Task subject",
			"plan.task.description": "Task description",
			"plan.task.assignee": "Assignee",
			"plan.task.dependencies": "Dependency task IDs (comma-separated)",
			"plan.task.dependenciesHint": "For example task-1, task-2; cycles are rejected",
			"plan.task.unassigned": "Shared task pool",
			"plan.unsaved": "Unsaved",
			"plan.save": "Save",
			"plan.saving": "Saving…",
			"plan.remove": "Remove",
			"plan.removed": "Task removed",
			"plan.removeConfirm": "Confirm remove",
			"plan.removeWarning": "Removing {task} will recalculate downstream dependencies.",
			"plan.cancel": "Cancel",
			"plan.addTask": "Add task",
			"plan.adding": "Adding…",
			"plan.taskAdded": "Task added",
			"plan.newTask": "New task subject",
			"plan.newTaskLabel": "Add a planned task",
			"plan.readySummary": "{members} members · {tasks} tasks · {links} dependencies",
			"plan.flow.aria": "Team launch flow",
			"plan.flow.review": "Review plan",
			"plan.flow.spawn": "Create members",
			"plan.flow.run": "Start work",
			"plan.members.title": "Members & model routes",
			"plan.members.count": "{count} members",
			"plan.members.empty": "No members planned yet",
			"plan.tasks.title": "Tasks & dependencies",
			"plan.tasks.count": "{count} tasks · {links} dependencies",
			"plan.tasks.empty": "No tasks planned yet",
			"plan.dependencies.none": "No dependencies",
			"plan.dependencies.count": "{count} dependencies",
			"plan.approve": "Approve & Run",
			"plan.approving": "Creating members…",
			"plan.approveTitle": "Plan ready?",
			"plan.approveHint": "Approval creates {members} members and schedules {tasks} tasks.",
			"plan.approveConfirmTitle": "Confirm team launch",
			"plan.approveWarning": "Member routes and dependencies cannot be edited here after launch.",
			"plan.approveConfirm": "Confirm launch",
			"plan.continue": "Return to chat & revise",
			"plan.returnToChat": "Return to chat",
			"plan.feedbackTitle": "Waiting for your revision direction",
			"plan.feedbackHint": "The Captain will ask in chat. After your reply, it will revise this draft and wait for approval again.",
			"plan.discard": "Discard this plan",
			"plan.discardConfirmTitle": "Discard this plan?",
			"plan.discardWarning": "The plan will end and be archived. No members have been spawned and no tasks will run.",
			"plan.discardConfirm": "Discard plan",
			"plan.discarding": "Discarding…",
			"plan.pendingEdits": "Save the current edits before launching the team.",
			"plan.saved": "Plan saved",
			"plan.failed": "Operation failed: {message}",
			"team.stats.members": "{count} members",
			"team.stats.completed": "{completed}/{total} completed",
			"team.stats.messages": "{count} messages",
			"delegation.aria": "Captain delegation map",
			"captain.name": "Captain",
			"captain.role": "Break down · Delegate · Synthesize",
			"captain.summary": "Assigned {tasks} tasks to {members} members",
			"captain.summary.staged": "Planned {tasks} tasks and {members} members; awaiting approval",
			"captain.summary.awaitingFeedback": "Draft preserved; waiting for your revision direction in chat",
			"captain.summary.discarded": "Plan discarded: {members} members were not created and {tasks} tasks did not run",
			"captain.summary.withTakeover": "Assigned {tasks} to members · Captain owns {captainTasks}",
			"captain.state.working": "{count} active",
			"captain.state.takeover": "Working on {tasks}",
			"captain.state.collected": "All reports received",
			"captain.state.waiting": "Waiting for reports",
			"captain.state.staged": "Awaiting approval",
			"captain.state.awaitingFeedback": "Awaiting feedback",
			"captain.state.discarded": "Discarded",
			"captain.state.settled": "Settled",
			"members.toggle": "Members {count}",
			"members.collapse": "Collapse",
			"members.expand": "Expand",
			"members.expandFinished": "Show finished ({count})",
			"members.empty": "No members yet; waiting for the captain to assemble the team",
			"assignment.label": "Captain assigned",
			"assignment.staged": "Planned task",
			"assignment.discarded": "Plan not run",
			"assignment.empty": "No tasks",
			"archive.label": "Ended · Archived history",
			"archive.discardedLabel": "Plan discarded · Archived history"
		};
		//#endregion
		//#region lib/client/workflow-text.js
		const legacyMessages = Object.fromEntries(Object.entries(zh).map(([key, value]) => [value, en[key]]));
		const format = (text, values) => text.replace(/\{(\d+)\}/g, (token, index) => Number(index) < values.length ? String(values[Number(index)]) : token);
		const sourceText = Object.assign((source, ...values) => format(source, values), { language: "zh" });
		function workflowText(t) {
			return t?.("language.code") === "en" ? Object.assign((source, ...values) => format(workflowEnglish[source] ?? legacyMessages[source] ?? source, values), { language: "en" }) : sourceText;
		}
		/** Localize plugin-owned feedback at render time, including feedback saved before a locale switch. */
		function workflowMessage(text, l) {
			for (const [source, english] of Object.entries(workflowEnglish)) {
				if (text === source || text === english) return l(source);
				if (!source.includes("{0}")) continue;
				for (const pattern of [source, english]) {
					const parts = pattern.split(/(\{\d+\})/g), order = [];
					const expression = parts.map((part) => {
						if (/^\{\d+\}$/.test(part)) {
							order.push(Number(part.slice(1, -1)));
							return "(.*?)";
						}
						return part.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
					}).join("");
					const match = new RegExp("^" + expression + "$", "s").exec(text);
					if (match) {
						const values = [];
						order.forEach((index, i) => {
							values[index] = match[i + 1];
						});
						return l(source, ...values);
					}
				}
			}
			return text;
		}
		function briefDisplay(value, l) {
			return [
				value.requirements,
				value.deliverables && l("交付物：") + "\n" + value.deliverables,
				value.acceptance && l("验收要求：") + "\n" + value.acceptance
			].filter(Boolean).join("\n\n");
		}
		//#endregion
		//#region lib/client/workflow-i18n.js
		/** Workflow UI locale follows the host; user content is never translated implicitly. */
		const WorkflowLocaleContext = (0, react.createContext)(sourceText);
		function WorkflowLocale({ t, children }) {
			const inherited = (0, react.useContext)(WorkflowLocaleContext);
			return (0, react_jsx_runtime.jsx)(WorkflowLocaleContext.Provider, {
				value: t ? workflowText(t) : inherited,
				children
			});
		}
		function useWorkflowText(t) {
			const inherited = (0, react.useContext)(WorkflowLocaleContext);
			return t ? workflowText(t) : inherited;
		}
		//#endregion
		//#region lib/gallery-access.js
		const galleryAccessKeys = ["gallerySkill", "galleryMcp"];
		//#endregion
		//#region lib/task-description.js
		/** Single execution descriptions and explicit configuration holds. */
		function taskNeedsConfiguration(task) {
			return !!task.workflowConfigPending || !!task.adaptationIssue?.trim();
		}
		//#endregion
		//#region lib/task-rerun.js
		function rerunImpact(tasks, id) {
			const affected = /* @__PURE__ */ new Set([id]);
			let changed = true;
			while (changed) {
				changed = false;
				for (const task of tasks) if (!affected.has(task.id) && task.dependencies.some((dep) => affected.has(dep))) {
					affected.add(task.id);
					changed = true;
				}
			}
			const descendants = tasks.filter((task) => task.id !== id && affected.has(task.id));
			return {
				descendants,
				active: descendants.filter((task) => ["claimed", "in_progress"].includes(task.status) || task.reassigning)
			};
		}
		function canRestartTask(task) {
			return !task.checkpoint && ([
				"completed",
				"failed",
				"cancelled"
			].includes(task.status) || task.status === "pending" && !!task.workflowPaused && !task.reassigning && !task.workflowConfigPending && ((task.attempt ?? 0) > 0 || !!task.stoppedAttempts?.length));
		}
		function rerunnableTasks(tasks, memberName) {
			return tasks.filter((task) => task.assignee === memberName && canRestartTask(task));
		}
		/** Ancestors before consumers; completed ancestors are preserved. */
		function rerunPath(tasks, targetId) {
			const byId = new Map(tasks.map((task) => [task.id, task])), visited = /* @__PURE__ */ new Set(), visiting = /* @__PURE__ */ new Set(), ordered = [];
			function visit(id) {
				if (visited.has(id)) return;
				const task = byId.get(id);
				if (!task) throw new Error("重跑路径存在缺失节点");
				if (visiting.has(id)) throw new Error("重跑路径存在循环");
				visiting.add(id);
				task.dependencies.forEach(visit);
				visiting.delete(id);
				visited.add(id);
				ordered.push(task);
			}
			visit(targetId);
			return ordered;
		}
		/** Validate the entire plan before mutating it; normal scheduling and human gates remain authoritative. */
		function startWorkflowPath(team, targetId, now = Date.now()) {
			if (team.halted || team.phase === "staged") throw new Error("请先恢复或启动团队，再运行到此节点");
			const path = rerunPath(team.tasks, targetId);
			if (path.at(-1).status !== "pending") throw new Error("此节点已不需要确认重跑，请刷新状态");
			for (const task of path) {
				if (task.status === "completed") continue;
				if (taskNeedsConfiguration(task)) throw new Error(`请先完成路径节点的配置：${task.subject}`);
				if (task.reassigning || team.members.some((m) => m.name === task.assignee && m.stopping)) throw new Error(`路径节点正在停止，请稍后重试：${task.subject}`);
				if (["failed", "cancelled"].includes(task.status) || task.checkpoint?.decision === "reject") throw new Error(`请先处理路径中的失败或退回节点：${task.subject}`);
				if (task.workflowRerunRequired && task.status !== "pending") throw new Error(`路径节点状态已变化，请刷新：${task.subject}`);
				if (task.workflowPaused && ["claimed", "in_progress"].includes(task.status)) throw new Error(`路径节点正在停止，请稍后重试：${task.subject}`);
				if (!task.checkpoint && task.assignee !== "captain" && !team.members.some((m) => m.status !== "removed" && (!task.assignee || m.name === task.assignee))) throw new Error(`路径节点缺少执行成员：${task.subject}`);
			}
			const beyond = rerunImpact(team.tasks, targetId);
			if (beyond.active.length) throw new Error("目标之后仍有任务运行，请先暂停这些任务再限定执行范围");
			const resumed = path.filter((task) => task.status === "pending");
			for (const task of resumed) {
				task.workflowRerunRequired = false;
				task.workflowPaused = false;
				task.workflowAwaitingStart = false;
				task.updatedAt = now;
			}
			for (const task of beyond.descendants) if (task.status === "pending" && !task.workflowPaused) {
				task.workflowPaused = true;
				task.workflowAwaitingStart = false;
				task.updatedAt = now;
			}
			return resumed.map((task) => task.id);
		}
		function resumeRerunPath(team, targetId, now = Date.now()) {
			if (!team.tasks.find((t) => t.id === targetId)?.workflowRerunRequired) throw new Error("此节点已不需要确认重跑，请刷新状态");
			return startWorkflowPath(team, targetId, now);
		}
		//#endregion
		//#region lib/client/workbench-selection.js
		const initialWorkbenchView = () => ({
			target: {
				type: "discussion",
				key: "graph"
			},
			revision: 0,
			drafts: {}
		});
		const editorKey = (teamId, target) => JSON.stringify([
			teamId,
			target.type,
			target.id ?? null
		]);
		function editorTarget(team, target, allowRerun = false) {
			if (target.type === "edge" || target.type === "discussion") return;
			if (target.type === "member" || !target.id) return target;
			const task = team?.tasks.find((item) => item.id === target.id);
			if (allowRerun && task && !task.checkpoint && [
				"completed",
				"failed",
				"cancelled"
			].includes(task.status)) return target;
			if (task?.status === "pending" && ((task.attempt ?? 0) === 0 || task.workflowPaused) && !task.checkpoint?.decision && !task.reassigning) return target;
		}
		function targetDiscussion(target) {
			return target.type === "discussion" ? target.key : target.type === "member" && target.id ? `member:${target.id}` : target.type === "check" && target.id ? `check:${target.id}` : "graph";
		}
		function draftSource(team, target) {
			if (!target.id) return "";
			const member = team?.members.find((item) => item.name === target.id);
			const task = team?.tasks.find((item) => item.id === target.id);
			return JSON.stringify(target.type === "member" ? member && [
				member.name,
				member.summary,
				member.role,
				member.executionPrompt,
				member.specificPrompt,
				member.gallerySkill,
				member.galleryMcp,
				member.provider,
				member.model,
				member.reasoningEffort,
				member.status === "removed"
			] : task && [
				task.id,
				task.subject,
				task.description,
				task.adaptationIssue,
				task.workflowConfigPending,
				task.assignee,
				task.kind,
				task.status,
				task.attemptId,
				task.output
			]) ?? "";
		}
		function initialEditorDraft(team, target) {
			const m = team?.members.find((item) => item.name === target.id), t = team?.tasks.find((item) => item.id === target.id);
			const values = target.type === "member" ? {
				name: m?.name ?? "",
				summary: m?.summary ?? m?.role ?? "",
				role: m?.role ?? "",
				executionPrompt: m?.executionPrompt ?? "",
				specificPrompt: m?.specificPrompt ?? "",
				gallerySkill: m?.gallerySkill === void 0 ? target.id ? "" : "false" : String(m.gallerySkill),
				galleryMcp: m?.galleryMcp === void 0 ? target.id ? "" : "false" : String(m.galleryMcp),
				provider: m?.provider ?? "",
				model: m?.model ?? "",
				reasoningEffort: m?.reasoningEffort ?? "",
				routeChanged: "",
				rerunTaskId: m ? rerunnableTasks(team?.tasks ?? [], m.name).at(-1)?.id ?? "" : "",
				rerunInstructions: ""
			} : {
				subject: t?.subject ?? "",
				description: t?.description ?? "",
				adaptationIssue: t?.adaptationIssue ?? "",
				assignee: t?.assignee ?? "",
				rerunInstructions: ""
			};
			return {
				source: draftSource(team, target),
				values,
				baseline: values
			};
		}
		function selectWorkbench(view, target, team, overrides) {
			const editor = editorTarget(team, target), drafts = { ...view.drafts };
			if (editor) {
				const key = editorKey(team?.id ?? "", editor), draft = drafts[key] ?? initialEditorDraft(team, editor);
				drafts[key] = overrides ? {
					...draft,
					values: {
						...draft.values,
						...overrides
					}
				} : draft;
			}
			return {
				target,
				revision: view.revision + 1,
				drafts
			};
		}
		/** A late save may clear only the exact draft it submitted, never newer typing. */
		function finishWorkbenchSave(view, key, submitted, revision, team, nextTarget, submittedTarget) {
			const drafts = { ...view.drafts };
			const addedMember = submittedTarget?.type === "member" && !submittedTarget.id && submitted ? team.members.find((m) => m.name === submitted.values["name"]?.trim()) : void 0;
			const savedTarget = addedMember ? {
				type: "member",
				id: addedMember.name
			} : submittedTarget;
			const savedKey = savedTarget && addedMember ? editorKey(team.id, savedTarget) : key;
			if (key && submitted && drafts[key] === submitted) delete drafts[key];
			else if (key && submitted && submittedTarget && drafts[key]?.source === submitted.source) {
				const latest = drafts[key], fresh = initialEditorDraft(team, savedTarget);
				delete drafts[key];
				drafts[savedKey] = {
					source: fresh.source,
					baseline: fresh.values,
					values: {
						...fresh.values,
						...Object.fromEntries(Object.entries(latest.values).filter(([field, value]) => value !== submitted.values[field]))
					}
				};
				if (submittedTarget.type === "member" && [
					"provider",
					"model",
					"reasoningEffort"
				].some((field) => latest.values[field] !== submitted.values[field])) drafts[savedKey].values["routeChanged"] = "yes";
			}
			const updated = {
				...view,
				drafts
			};
			return view.revision === revision && nextTarget ? selectWorkbench(updated, nextTarget, team) : updated;
		}
		//#endregion
		//#region lib/client/workbench-drafts.js
		function draftTarget(key, teamId) {
			try {
				const value = JSON.parse(key);
				if (!Array.isArray(value) || value.length !== 3 || value[0] !== teamId || ![
					"member",
					"task",
					"check"
				].includes(value[1]) || value[2] !== null && typeof value[2] !== "string") return;
				return {
					type: value[1],
					...value[2] === null ? {} : { id: value[2] }
				};
			} catch {
				return;
			}
		}
		function draftChanged(entry, baseline) {
			const original = entry.baseline ?? baseline;
			return Object.keys({
				...original,
				...entry.values
			}).some((key) => (entry.values[key] ?? "") !== (original[key] ?? ""));
		}
		function pendingDrafts(team, drafts, l = sourceText) {
			if (!team) return [];
			return Object.entries(drafts).flatMap(([key, entry]) => {
				const target = draftTarget(key, team.id);
				if (!target || !draftChanged(entry, initialEditorDraft(team, target).values)) return [];
				return [{
					key,
					entry,
					target,
					label: target.type === "member" ? entry.values["name"] || target.id || l("新 Agent") : entry.values["subject"] || target.id || l("新任务")
				}];
			});
		}
		const stringRecord = (value) => !!value && typeof value === "object" && !Array.isArray(value) && Object.values(value).every((item) => typeof item === "string");
		function decodeDrafts(raw, teamId) {
			try {
				const value = JSON.parse(raw ?? "{}");
				if (value.version !== 1 || !value.drafts || typeof value.drafts !== "object" || Array.isArray(value.drafts)) return {};
				return Object.fromEntries(Object.entries(value.drafts).filter(([key, item]) => {
					const entry = item;
					return draftTarget(key, teamId) && entry && typeof entry.source === "string" && stringRecord(entry.values) && stringRecord(entry.baseline);
				}));
			} catch {
				return {};
			}
		}
		const draftStorageKey = (sessionId, teamId) => `teamflow:property-drafts:v1:${JSON.stringify([sessionId, teamId])}`;
		function draftGalleryAccess(draft) {
			const result = {};
			for (const key of galleryAccessKeys) if (draft[key] === "true" || draft[key] === "false") result[key] = draft[key] === "true";
			return result;
		}
		/** Bulk save changes configuration only; execution decisions require their own button. */
		function propertyOperation(team, target, entry) {
			if (entry.source !== draftSource(team, target)) throw new Error("有对象已变化，请逐项核对草稿后再保存全部。");
			const value = entry.values;
			if (["rerunTaskId", "rerunInstructions"].some((key) => (value[key] ?? "") !== (entry.baseline?.[key] ?? initialEditorDraft(team, target).values[key] ?? ""))) throw new Error("重跑设置需在对应任务中单独确认，保存全部不会执行或丢弃重跑设置。");
			if (target.type === "member") {
				if (target.id && !team.members.some((m) => m.name === target.id && m.status !== "removed")) throw new Error(`成员 ${target.id} 已移除，草稿保留。`);
				const route = value["routeChanged"] ? {
					provider: value["provider"],
					model: value["model"],
					reasoningEffort: value["reasoningEffort"] || "default"
				} : {};
				return target.id ? {
					action: "update_member",
					name: target.id,
					summary: value["summary"],
					role: value["role"],
					executionPrompt: value["executionPrompt"],
					specificPrompt: value["specificPrompt"],
					...draftGalleryAccess(value),
					...route
				} : {
					action: "add_member",
					name: value["name"] ?? "",
					summary: value["summary"] ?? "",
					role: value["role"],
					executionPrompt: value["executionPrompt"],
					specificPrompt: value["specificPrompt"],
					...draftGalleryAccess(value),
					...route
				};
			}
			const task = team.tasks.find((item) => item.id === target.id);
			if (!task || task.status !== "pending") throw new Error("已开始或已结束任务的草稿需单独处理；保存全部不会自动重跑。");
			return {
				action: "update_task",
				id: task.id,
				subject: value["subject"],
				description: value["description"],
				adaptationIssue: value["adaptationIssue"] ?? "",
				assignee: target.type === "check" ? void 0 : value["assignee"]
			};
		}
		/** Editing a composer while its old message sends must never lose the new text. */
		const remainingMessage = (current, submitted) => current === submitted ? "" : current;
		//#endregion
		//#region lib/client/workflow-request.js
		/** Bounded requests. Never replay a mutation when its server-side outcome is unknown. */
		async function transport(payload, fetcher, timeoutMs, signal) {
			const controller = new AbortController(), timer = setTimeout(() => controller.abort(), timeoutMs);
			const cancel = () => controller.abort(signal?.reason);
			signal?.addEventListener("abort", cancel, { once: true });
			if (signal?.aborted) cancel();
			try {
				let response;
				try {
					response = await fetcher("/plugins/dsh-agent-teams/workflow", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(payload),
						signal: controller.signal
					});
				} catch {
					throw new Error("连接中断或请求超时。操作可能已经保存，请先重新连接并核对状态，再决定是否继续。");
				}
				let result;
				try {
					result = await response.json();
				} catch {
					throw new Error("连接中断或请求超时。操作可能已经保存，请先重新连接并核对状态，再决定是否继续。");
				}
				if (!response.ok) throw new Error(result.error ?? `HTTP ${response.status}`);
				return result;
			} finally {
				clearTimeout(timer);
				signal?.removeEventListener("abort", cancel);
			}
		}
		const reads = /* @__PURE__ */ new Set([
			"state",
			"archive_state",
			"conversation_state",
			"template_list",
			"template_seed",
			"launcher_context",
			"outcome_preview"
		]);
		const requests = /* @__PURE__ */ new WeakMap();
		let generation = 0;
		function workflowRequest(payload, fetcher = fetch, timeoutMs = reads.has(String(payload["action"])) ? 12e3 : 45e3, signal) {
			if (signal?.aborted) return Promise.reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
			if (!reads.has(String(payload["action"]))) {
				generation++;
				return transport(payload, fetcher, timeoutMs, signal).finally(() => {
					generation++;
				});
			}
			let pool = requests.get(fetcher);
			if (!pool) {
				pool = /* @__PURE__ */ new Map();
				requests.set(fetcher, pool);
			}
			const key = JSON.stringify([
				generation,
				timeoutMs,
				payload
			]);
			let entry = pool.get(key);
			if (!entry) {
				const controller = new AbortController();
				entry = {
					controller,
					consumers: 0,
					promise: transport(payload, fetcher, timeoutMs, controller.signal)
				};
				pool.set(key, entry);
				const created = entry;
				entry.promise.finally(() => {
					if (pool.get(key) === created) pool.delete(key);
				}).catch(() => {});
			}
			const shared = entry;
			shared.consumers++;
			return new Promise((resolve, reject) => {
				let done = false;
				const finish = (callback) => {
					if (done) return;
					done = true;
					signal?.removeEventListener("abort", cancel);
					if (--shared.consumers === 0) {
						if (pool.get(key) === shared) pool.delete(key);
						shared.controller.abort();
					}
					callback();
				};
				const cancel = () => finish(() => reject(signal?.reason ?? new DOMException("Aborted", "AbortError")));
				signal?.addEventListener("abort", cancel, { once: true });
				shared.promise.then((value) => finish(() => resolve(value)), (error) => finish(() => reject(error)));
				if (signal?.aborted) cancel();
			});
		}
		//#endregion
		//#region lib/client/workflow-cache.js
		/** Bounded tab-local view memory. Cached data never authorizes a mutation. */
		function createWorkflowCache(limit = 4, maxBytes = 8 * 1024 * 1024, ttlMs = 3e5) {
			const entries = /* @__PURE__ */ new Map();
			let bytes = 0;
			const remove = (key) => {
				const old = entries.get(key);
				if (old) bytes -= old.bytes;
				entries.delete(key);
			};
			return {
				get(key) {
					const entry = entries.get(key);
					if (!entry) return;
					if (Date.now() - entry.at > ttlMs) {
						remove(key);
						return;
					}
					entries.delete(key);
					entries.set(key, entry);
					return entry.value;
				},
				set(key, value) {
					const size = JSON.stringify(value).length * 2;
					remove(key);
					if (size > maxBytes) return;
					entries.set(key, {
						value,
						bytes: size,
						at: Date.now()
					});
					bytes += size;
					while (entries.size > limit || bytes > maxBytes) remove(entries.keys().next().value);
				},
				remove
			};
		}
		const workflowCacheKey = (session, team, archived) => JSON.stringify([
			session,
			team,
			archived
		]);
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/WorkflowWorkbench.module.css.mjs
		const css$12 = ".M4XxWG_entry,.M4XxWG_workbench,.M4XxWG_contextPanel,.M4XxWG_reviewNotice{--wb-bg:var(--dsw-alias-bg-layer-1,light-dark(#fff,#202226));--wb-base:var(--dsw-alias-bg-module-platform,light-dark(#f6f7f9,#181a1e));--wb-border:var(--dsw-alias-border-l2,light-dark(#e1e5eb,#363940));--wb-text:var(--dsw-alias-label-primary,light-dark(#26303d,#e3e6ec));--wb-muted:var(--dsw-alias-label-secondary,light-dark(#737d8b,#a0a8b5));--wb-accent:var(--dsw-alias-state-business-primary,light-dark(#2866d7,#82b4ff));--wb-error:var(--dsw-alias-state-error-primary,light-dark(#b94444,#ef9797));color:var(--wb-text);font-variant-numeric:tabular-nums;font-family:inherit}.M4XxWG_entry{border:1px solid var(--wb-border);background:var(--wb-bg);cursor:pointer;border-radius:9px;margin:8px 0 16px;padding:9px 13px;font-size:12px}.M4XxWG_entry:hover{border-color:var(--wb-accent)}.M4XxWG_startEntry{width:100%;color:var(--wb-accent);border-color:var(--wb-accent);margin-top:0;font-weight:650}.M4XxWG_startEntry:disabled{opacity:.5;cursor:not-allowed}.M4XxWG_pendingNotice{background:color-mix(in srgb, var(--wb-accent) 9%, var(--wb-bg));color:var(--wb-text);border:1px solid color-mix(in srgb, var(--wb-accent) 35%, var(--wb-border));flex-wrap:wrap;align-items:center;gap:8px;padding:9px 12px;font-size:12px;display:flex}.M4XxWG_pendingNotice button{font:inherit;color:var(--wb-accent);background:var(--wb-bg);border:1px solid var(--wb-border);cursor:pointer;border-radius:6px;padding:4px 8px}.M4XxWG_pendingNotice button:disabled{opacity:.5;cursor:not-allowed}.M4XxWG_pendingNotice small{color:var(--wb-muted)}.M4XxWG_launcher{z-index:3;box-sizing:border-box;text-align:left;width:100%;color:var(--wb-accent);border-color:color-mix(in srgb, var(--wb-accent) 45%, var(--wb-border));background:color-mix(in srgb, var(--wb-accent) 9%, var(--wb-bg));box-shadow:0 2px 6px color-mix(in srgb, var(--wb-text) 5%, transparent);flex-direction:column;align-items:flex-start;gap:4px;padding:13px 16px;display:flex;position:sticky;top:0}.M4XxWG_launcher strong{justify-content:space-between;gap:12px;width:100%;font-size:15px;display:flex}.M4XxWG_launcher>span{overflow-wrap:anywhere;font-size:12px}.M4XxWG_launcher:hover{background:color-mix(in srgb, var(--wb-accent) 15%, var(--wb-bg))}.M4XxWG_historyDialog{box-sizing:border-box;cursor:auto;width:min(1100px,100vw - 32px);max-height:calc(100vh - 48px);margin:auto;padding:20px;position:fixed;overflow:auto}.M4XxWG_historyDialog::backdrop{background:#0006}.M4XxWG_historyDialog>header{justify-content:space-between;align-items:center;gap:16px;margin-bottom:16px;display:flex}.M4XxWG_historyDialog>header p{color:var(--wb-muted);margin:4px 0 0}.M4XxWG_historyDialog>header button{color:var(--wb-text);background:var(--wb-bg);border:1px solid var(--wb-border);cursor:pointer;border-radius:8px;padding:7px 14px}.M4XxWG_workbench{z-index:1000;background:var(--wb-base);border:1px solid var(--wb-border);box-shadow:0 16px 64px color-mix(in srgb, var(--dsw-alias-bg-mask-3,#000) 20%, transparent);border-radius:16px;flex-direction:column;font-size:13px;line-height:1.65;display:flex;position:fixed;inset:24px;overflow:hidden}.M4XxWG_workbench *{box-sizing:border-box}.M4XxWG_workbenchBody{flex-direction:column;flex:1;min-height:0;display:flex;overflow:hidden}.M4XxWG_workbenchBody[hidden]{display:none}.M4XxWG_pageTabs{border-bottom:1px solid var(--wb-border);background:var(--wb-bg);flex-wrap:wrap;align-items:center;gap:10px;padding:12px 20px;display:flex}.M4XxWG_pageTabs small{color:var(--wb-muted)}.M4XxWG_workbench button{font:inherit;color:inherit;background:var(--wb-bg);border:1px solid var(--wb-border);cursor:pointer;border-radius:8px;padding:6px 10px;font-size:12px;line-height:20px;transition:background-color .14s,border-color .14s}.M4XxWG_workbench button:hover:not(:disabled){background:color-mix(in srgb, var(--wb-accent) 5%, var(--wb-bg));border-color:color-mix(in srgb, var(--wb-accent) 40%, var(--wb-border))}.M4XxWG_workbench button:disabled{opacity:.42;cursor:default}.M4XxWG_iconLabel,.M4XxWG_workbench button:has(>svg){align-items:center;gap:6px;display:inline-flex}.M4XxWG_iconLabel>svg,.M4XxWG_workbench button>svg{vertical-align:middle;flex:none;width:15px;height:15px}.M4XxWG_drag.M4XxWG_iconLabel>svg,.M4XxWG_taskList small.M4XxWG_iconLabel>svg{width:13px;height:13px}.M4XxWG_workbench button:has(>svg){justify-content:center}.M4XxWG_workbench button:focus-visible,.M4XxWG_workbench input:focus-visible,.M4XxWG_workbench textarea:focus-visible,.M4XxWG_workbench select:focus-visible,.M4XxWG_entry:focus-visible{outline:2px solid var(--wb-accent);outline-offset:2px}.M4XxWG_workbench .M4XxWG_primary{border-color:color-mix(in srgb, var(--wb-accent) 35%, var(--wb-border));color:var(--wb-accent);background:color-mix(in srgb, var(--wb-accent) 9%, var(--wb-bg));font-weight:600}.M4XxWG_workbench .M4XxWG_primary:hover:not(:disabled){background:color-mix(in srgb, var(--wb-accent) 15%, var(--wb-bg))}.M4XxWG_workbench .M4XxWG_danger{color:var(--wb-error)}.M4XxWG_header{background:var(--wb-bg);border-bottom:1px solid var(--wb-border);flex:none;justify-content:space-between;align-items:center;gap:12px;padding:16px 20px;display:flex}.M4XxWG_title{align-items:center;gap:10px;min-width:0;display:flex}.M4XxWG_title img{flex:none;width:36px;height:36px}.M4XxWG_title>div{min-width:0}.M4XxWG_title strong{text-overflow:ellipsis;white-space:nowrap;font-size:15px;font-weight:650;display:block;overflow:hidden}.M4XxWG_title span{color:var(--wb-muted);font-size:11px;display:block}.M4XxWG_header>div:last-child{flex:none;gap:8px;display:flex}.M4XxWG_paneTabs{display:none}.M4XxWG_columns{grid-template-columns:224px minmax(0,1fr) 6px min(var(--inspector-width,360px), 45%);flex:1;min-height:0;display:grid}.M4XxWG_workbench[data-maximized=true]{border-radius:0;inset:0}.M4XxWG_commandBar{border-bottom:1px solid var(--wb-border);background:var(--wb-bg);flex-wrap:wrap;align-items:center;gap:8px;padding:8px 16px;display:flex}.M4XxWG_commandBar>strong{color:var(--wb-muted);margin-right:4px;font-size:11px}.M4XxWG_commandSpacer{flex:1}.M4XxWG_saveBar{background:var(--wb-bg);border-bottom:1px solid var(--wb-border);color:var(--wb-muted);flex-wrap:wrap;flex:none;align-items:center;gap:6px 12px;max-height:140px;padding:7px 16px;font-size:11px;display:flex;overflow:auto}.M4XxWG_saveBar details[open]{flex-basis:100%}.M4XxWG_saveBar summary{cursor:pointer}.M4XxWG_saveBar details button{margin:4px}.M4XxWG_dirtyDot{color:light-dark(#946519,#f1c076);font-size:10px;font-style:normal;font-weight:500}.M4XxWG_readiness{border:1px solid var(--wb-border);background:var(--wb-base);border-radius:8px;margin:10px 0;padding:10px;font-size:12px}.M4XxWG_readiness p{margin:4px 0}.M4XxWG_readiness button{margin:4px 4px 0 0}.M4XxWG_node[data-config-pending=true]{border-style:dashed}.M4XxWG_node[data-config-pending=true] small{color:light-dark(#946519,#f1c076)}.M4XxWG_columns[data-inspector-expanded=true]{grid-template-columns:224px minmax(0,1fr) 6px min(720px,60%)}.M4XxWG_columns[data-inspector-hidden=true]{grid-template-columns:224px minmax(0,1fr)}.M4XxWG_columns[data-inspector-hidden=true]>.M4XxWG_inspector,.M4XxWG_columns[data-inspector-hidden=true]>.M4XxWG_resizeHandle{display:none}.M4XxWG_inspector{background:var(--wb-bg);flex-direction:column;min-width:0;min-height:0;display:flex;overflow:hidden}.M4XxWG_inspectorHeader{border-bottom:1px solid var(--wb-border);flex:none;justify-content:space-between;align-items:center;gap:8px;padding:8px 12px;display:flex}.M4XxWG_inspector>.M4XxWG_editor,.M4XxWG_inspector>.M4XxWG_discussion{border:0;flex:1;width:100%;min-height:0}.M4XxWG_resizeHandle{cursor:col-resize;touch-action:none;background:var(--wb-border)}.M4XxWG_resizeHandle:hover,.M4XxWG_resizeHandle:focus-visible{background:var(--wb-accent);outline:0}.M4XxWG_libraryTabs{z-index:2;background:var(--wb-bg);border-bottom:1px solid var(--wb-border);gap:4px;margin:-16px -12px 16px;padding:16px 12px 12px;display:flex;position:sticky;top:-16px}.M4XxWG_libraryTabs button{white-space:nowrap;flex:1}.M4XxWG_libraryTabs button[aria-pressed=true],.M4XxWG_toolbar button[aria-pressed=true]{color:var(--wb-accent);border-color:var(--wb-accent);background:color-mix(in srgb, var(--wb-accent) 8%, var(--wb-bg))}.M4XxWG_taskList>button{text-align:left;border-left:3px solid var(--wb-accent);flex-direction:column;gap:5px;width:100%;margin-bottom:10px;display:flex}.M4XxWG_taskList>button[data-kind=check]{border-left-color:light-dark(#a86811,#e8b35d)}.M4XxWG_taskList>button[aria-pressed=true]{outline:2px solid var(--wb-accent);outline-offset:-1px}.M4XxWG_taskList>button strong{overflow-wrap:anywhere;font-size:12px}.M4XxWG_taskList>button small{margin:0}.M4XxWG_taskList>button span{color:var(--wb-muted);font-size:11px}.M4XxWG_canvasStatus{color:var(--wb-muted);background:var(--wb-bg);border-top:1px solid var(--wb-border);flex:none;padding:6px 12px;font-size:10px}.M4XxWG_roster{background:var(--wb-bg);border-right:1px solid var(--wb-border);padding:16px 12px;overflow:auto}.M4XxWG_roster h3{justify-content:space-between;align-items:center;margin:0 0 16px;font-size:12px;font-weight:600;display:flex}.M4XxWG_roster h3 button{color:var(--wb-muted);border:0;padding:2px 6px}.M4XxWG_roster article{border:1px solid var(--wb-border);background:var(--wb-bg);border-left:3px solid light-dark(#7861b1,#c0a5ed);border-radius:10px;margin-bottom:10px;padding:12px}.M4XxWG_roster .M4XxWG_member{text-align:left;background:0 0;border:0;gap:9px;width:100%;padding:0;display:flex}.M4XxWG_member img{flex:none;width:32px;height:32px}.M4XxWG_member>span{min-width:0}.M4XxWG_member strong{overflow-wrap:anywhere;font-size:12px;display:block}.M4XxWG_member span>span{color:var(--wb-muted);white-space:pre-wrap;overflow-wrap:anywhere;margin-top:3px;font-size:11px;line-height:1.7;display:block}.M4XxWG_roster small{color:var(--wb-muted);overflow-wrap:anywhere;margin:9px 0 4px;font-size:10px;display:block}.M4XxWG_roster article>div{flex-wrap:wrap;gap:4px;display:flex}.M4XxWG_roster article>div button{background:0 0;border-color:#0000;padding:2px 6px;font-size:11px}.M4XxWG_hint{color:var(--wb-muted);font-size:12px;line-height:1.8}.M4XxWG_selected{outline:2px solid color-mix(in srgb, var(--wb-accent) 65%, transparent);outline-offset:-1px}.M4XxWG_node[data-member-match]{border-color:var(--wb-accent);box-shadow:0 0 0 3px color-mix(in srgb, var(--wb-accent) 22%, transparent)}.M4XxWG_memberModelSettings{background:var(--wb-base);border:1px solid var(--wb-border);border-radius:8px;padding:10px}.M4XxWG_graphArea{flex-direction:column;min-width:0;min-height:0;display:flex}.M4XxWG_toolbar{border-bottom:1px solid var(--wb-border);background:var(--wb-bg);flex-wrap:wrap;align-items:center;gap:6px;padding:12px;display:flex}.M4XxWG_toolbar span{color:var(--wb-muted);flex-basis:100%;margin-top:2px;font-size:11px}.M4XxWG_canvas{background-color:var(--wb-base);background-image:radial-gradient(color-mix(in srgb, var(--wb-muted) 16%, transparent) 1px, transparent 1px);overscroll-behavior:contain;touch-action:none;background-size:20px 20px;flex:1;min-height:180px;position:relative;overflow:auto}.M4XxWG_canvas[data-pan=true],.M4XxWG_canvas[data-pan=true] .M4XxWG_node,.M4XxWG_canvas[data-pan=true] button,.M4XxWG_canvas[data-pan=true] .M4XxWG_drag{cursor:grab}.M4XxWG_canvas[data-dragging=true],.M4XxWG_canvas[data-dragging=true] *{user-select:none;cursor:grabbing!important}.M4XxWG_plane{position:relative}.M4XxWG_edges{pointer-events:none;width:100%;height:100%;color:color-mix(in srgb, var(--wb-muted) 65%, var(--wb-border));position:absolute;overflow:visible}.M4XxWG_edges>path{fill:none;stroke:currentColor;stroke-width:1.5px}.M4XxWG_node{--node-side-border:1px;--node-top-border:3px;touch-action:none;width:var(--wb-node-width);background:var(--wb-bg);border:1px solid var(--wb-border);box-shadow:0 2px 5px color-mix(in srgb, var(--wb-text) 4%, transparent);border-top:3px solid var(--wb-border);border-radius:10px;height:150px;position:absolute}.M4XxWG_drag{cursor:grab;color:var(--wb-muted);border-bottom:1px solid var(--wb-border);touch-action:none;user-select:none;padding:6px 11px;font-size:10px}.M4XxWG_drag [data-node-playback],.M4XxWG_drag [data-node-rerun]{cursor:pointer;min-height:20px;margin-left:auto;padding:1px 5px;font-size:10px;line-height:16px}.M4XxWG_rerunContext{border:1px solid var(--wb-border);background:var(--wb-base);border-radius:8px;margin-block:12px;padding:12px}.M4XxWG_rerunContext label{flex-direction:column;gap:6px;display:flex}.M4XxWG_rerunContext textarea{box-sizing:border-box;resize:vertical;width:100%;min-height:110px}.M4XxWG_rerunContext pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:220px;font:inherit;background:var(--wb-bg);padding:8px;overflow:auto}.M4XxWG_workbench .M4XxWG_nodeBody{text-align:left;background:0 0;border:0;border-radius:0 0 10px 10px;flex-direction:column;gap:7px;width:100%;padding:11px;display:flex}.M4XxWG_nodeBody strong{overflow-wrap:anywhere;-webkit-line-clamp:2;-webkit-box-orient:vertical;height:36px;font-size:12px;line-height:18px;display:-webkit-box;overflow:hidden}.M4XxWG_nodeBody .M4XxWG_taskOwner{text-overflow:ellipsis;white-space:nowrap;width:100%;color:var(--wb-muted);align-items:center;gap:5px;font-size:11px;display:flex;overflow:hidden}.M4XxWG_taskOwner img{width:20px;height:20px}.M4XxWG_nodeBody small{background:var(--wb-base);color:var(--wb-muted);border-radius:5px;align-self:flex-start;padding:1px 6px;font-size:10px}.M4XxWG_nodeBody small[data-ready=true]{color:var(--wb-accent);background:color-mix(in srgb, var(--wb-accent) 8%, var(--wb-bg))}.M4XxWG_workbench .M4XxWG_port{top:calc(var(--wb-port-y) - var(--node-top-border) - 14px);touch-action:none;opacity:0;pointer-events:none;background:0 0;border:0;border-radius:50%;width:28px;height:28px;padding:0;transition:opacity .15s;position:absolute}.M4XxWG_workbench .M4XxWG_port:hover:not(:disabled){background:0 0;border:0}.M4XxWG_workbench .M4XxWG_port:disabled{opacity:0}.M4XxWG_input{left:calc(-14px - var(--node-side-border))}.M4XxWG_output{right:calc(-14px - var(--node-side-border))}.M4XxWG_port:before{content:\"\";box-sizing:border-box;border:2px solid var(--wb-accent);background:var(--wb-bg);border-radius:50%;width:8px;height:8px;transition:transform .15s,background .15s;position:absolute;top:10px;left:10px}.M4XxWG_node:hover .M4XxWG_port,.M4XxWG_node:has(:focus-visible) .M4XxWG_port,.M4XxWG_canvas[data-linking=true] .M4XxWG_port,.M4XxWG_port:focus-visible{opacity:1;pointer-events:auto}.M4XxWG_port:hover:before,.M4XxWG_port:focus-visible:before{background:var(--wb-accent);transform:scale(1.3)}@media (hover:none){.M4XxWG_node .M4XxWG_port{opacity:1;pointer-events:auto}}@media (prefers-reduced-motion:reduce){.M4XxWG_workbench .M4XxWG_port,.M4XxWG_port:before{transition:none}}.M4XxWG_empty{max-width:380px;color:var(--wb-muted);padding:32px}.M4XxWG_notice{background:color-mix(in srgb, var(--wb-accent) 6%, var(--wb-bg));border-bottom:1px solid var(--wb-border);color:var(--wb-muted);padding:10px 12px;font-size:12px}.M4XxWG_notice button{color:var(--wb-accent);background:0 0;border-color:#0000;margin-left:8px}.M4XxWG_details{border-top:1px solid var(--wb-border);background:var(--wb-bg);max-height:180px;padding:12px 16px;overflow:auto}.M4XxWG_details strong{font-size:12px}.M4XxWG_details p{white-space:pre-wrap;color:var(--wb-muted);margin:5px 0 9px;font-size:12px}.M4XxWG_details>div{flex-wrap:wrap;gap:6px;display:flex}.M4XxWG_discussion{border-left:1px solid var(--wb-border);background:var(--wb-bg);flex-direction:column;min-width:0;min-height:0;display:flex}.M4XxWG_discussion>header{border-bottom:1px solid var(--wb-border);align-items:center;gap:9px;padding:14px 16px;display:flex}.M4XxWG_discussion>header img{flex:none;width:32px;height:32px}.M4XxWG_discussion h3{margin:0;font-size:12px;font-weight:600}.M4XxWG_discussion small{color:var(--wb-muted);font-size:11px}.M4XxWG_messages{overscroll-behavior:contain;flex:1;min-height:80px;padding:16px;overflow:auto}.M4XxWG_messages p{white-space:pre-wrap;overflow-wrap:anywhere;margin:5px 0;font-size:12px;line-height:1.85}.M4XxWG_materials{border:1px solid var(--wb-border);background:var(--wb-base);border-radius:8px;margin:10px 0 16px;padding:12px}.M4XxWG_materials section{border-bottom:1px solid var(--wb-border);margin:12px 0;padding-bottom:10px}.M4XxWG_materials strong{font-size:12px}.M4XxWG_materials .M4XxWG_hint{font-size:11px}.M4XxWG_userMessage,.M4XxWG_assistantMessage{border-radius:10px;margin-bottom:14px;padding:10px 12px}.M4XxWG_userMessage{background:color-mix(in srgb, var(--wb-accent) 7%, var(--wb-bg));margin-left:20px}.M4XxWG_assistantMessage{background:var(--wb-base);margin-right:8px}.M4XxWG_embeddedTranscript{max-height:45vh;padding:8px 0;overflow:auto}.M4XxWG_embeddedTranscript p{white-space:pre-wrap;overflow-wrap:anywhere}.M4XxWG_embeddedComposer{gap:6px;margin:8px 0 16px;display:grid}.M4XxWG_embeddedComposer label{gap:4px;display:grid}.M4XxWG_embeddedComposer textarea{resize:vertical;width:100%;min-height:68px}.M4XxWG_embeddedComposer button{justify-self:end}.M4XxWG_discussion summary{cursor:pointer;color:var(--wb-muted);font-size:12px}.M4XxWG_discussion pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;max-height:230px;font-size:12px;line-height:1.75;overflow:auto}.M4XxWG_proposal{background:color-mix(in srgb, var(--wb-accent) 4%, var(--wb-bg));border-top:1px solid var(--wb-border);flex-shrink:0;max-height:68%;padding:12px 16px;overflow:auto}.M4XxWG_proposal strong{font-size:12px}.M4XxWG_proposal button{margin:8px 6px 0 0}.M4XxWG_decisions{border-top:1px solid var(--wb-border);flex-wrap:wrap;gap:8px;padding:12px 16px;display:flex}.M4XxWG_composer{border-top:1px solid var(--wb-border);padding:12px 16px}.M4XxWG_composer textarea{resize:vertical;width:100%;height:76px;max-height:180px}.M4XxWG_composer>div{flex-wrap:wrap;gap:6px;margin-top:8px;display:flex}.M4XxWG_composer>div button:not(.M4XxWG_primary){color:var(--wb-muted);border-color:#0000;padding-left:6px;padding-right:6px}.M4XxWG_workbench input,.M4XxWG_workbench textarea,.M4XxWG_workbench select{font:inherit;color:inherit;background:var(--wb-bg);border:1px solid var(--wb-border);accent-color:var(--wb-accent);border-radius:8px;padding:8px 10px;font-size:12px}.M4XxWG_workbench textarea::placeholder{color:var(--wb-muted)}.M4XxWG_error{background:color-mix(in srgb, var(--wb-error) 7%, var(--wb-bg));border-bottom:1px solid var(--wb-border);white-space:pre-wrap;color:var(--wb-error);padding:10px 20px;font-size:12px}.M4XxWG_create{background:var(--wb-bg);border:1px solid var(--wb-border);border-radius:12px;width:100%;max-width:540px;margin:32px auto;padding:24px}.M4XxWG_create h2{font-size:16px;font-weight:600}.M4XxWG_create label,.M4XxWG_formBody>label{flex-direction:column;gap:5px;margin:14px 0;font-size:12px;display:flex}.M4XxWG_create textarea{min-height:100px}.M4XxWG_editor{background:var(--wb-bg);border-left:1px solid var(--wb-border);min-width:0;min-height:0;padding:18px;overflow:auto}.M4XxWG_editor h3{margin:0 0 16px;font-size:15px;font-weight:600}.M4XxWG_editor textarea{resize:vertical;min-height:68px}.M4XxWG_editor fieldset{border:1px solid var(--wb-border);border-radius:8px;padding:12px;font-size:12px}.M4XxWG_editor fieldset label{align-items:center;gap:8px;margin:5px 0;display:flex}.M4XxWG_editor footer{flex-wrap:wrap;gap:8px;margin-top:20px;display:flex}@media (prefers-reduced-motion:reduce){.M4XxWG_workbench button{transition:none}}.M4XxWG_nativeBanner{flex-wrap:wrap;align-items:center;gap:8px;font-size:12px;display:flex}.M4XxWG_node[data-connection=valid]{outline:2px solid var(--wb-accent);box-shadow:0 0 0 7px color-mix(in srgb, var(--wb-accent) 12%, transparent)}.M4XxWG_node[data-connection=valid] .M4XxWG_input:before{background:var(--wb-accent);transform:scale(1.3)}.M4XxWG_node[data-connection=invalid]{outline:2px solid var(--wb-error)}.M4XxWG_discussion{overflow-y:auto}.M4XxWG_entry.M4XxWG_compact,.M4XxWG_nativeBanner .M4XxWG_entry{margin:0;padding:4px 8px;font-size:11px}.M4XxWG_nativeBanner>span{text-overflow:ellipsis;white-space:nowrap;max-width:180px;overflow:hidden}.M4XxWG_draftNode{border:2px dashed var(--wb-accent);pointer-events:none}.M4XxWG_editor footer{background:var(--wb-bg);border-top:1px solid var(--wb-border);padding:10px 16px}.M4XxWG_node[data-suspended=true]{border-style:dashed;border-color:#b77c12}.M4XxWG_contextPanel{border:1px solid var(--wb-border);background:var(--wb-bg);overflow-wrap:anywhere;border-radius:10px;margin-bottom:16px;padding:14px;font-size:12px;line-height:1.75}.M4XxWG_contextPanel>header{flex-wrap:wrap;align-items:baseline;gap:8px;margin-bottom:12px;display:flex}.M4XxWG_contextPanel>header span{color:var(--wb-muted);font-size:11px}.M4XxWG_contextPanel>label{flex-direction:column;gap:4px;display:flex}.M4XxWG_contextPanel select,.M4XxWG_contextPanel button{font:inherit;color:inherit;border:1px solid var(--wb-border);background:var(--wb-bg);border-radius:6px;max-width:100%;padding:6px 8px}.M4XxWG_contextPanel button,.M4XxWG_contextPanel summary{cursor:pointer}.M4XxWG_contextPanel :is(button,select,summary):focus-visible{outline:2px solid var(--wb-accent);outline-offset:2px}.M4XxWG_contextPanel button:hover{border-color:var(--wb-accent)}.M4XxWG_contextInfo h4{margin:16px 0 8px;font-size:12px}.M4XxWG_contextInfo p,.M4XxWG_contextInfo dd{white-space:pre-wrap;overflow-wrap:anywhere;margin:6px 0 12px;font-size:12px}.M4XxWG_contextInfo dt{color:var(--wb-muted);font-size:11px}.M4XxWG_contextInfo summary{cursor:pointer;font-size:12px}.M4XxWG_contextInfo pre,.M4XxWG_contextPanel pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;max-height:300px;overflow:auto}.M4XxWG_contextTask{border-top:1px solid var(--wb-border);padding:10px 0}.M4XxWG_contextInfo .M4XxWG_contextMember{text-align:left;flex-direction:column;gap:3px;width:100%;margin:6px 0;display:flex}.M4XxWG_contextMember span{color:var(--wb-muted);font-size:11px}.M4XxWG_contextProposal{border-top:1px solid var(--wb-border);margin-top:12px;padding-top:12px}.M4XxWG_contextProposal pre{border:1px solid var(--wb-border);background:var(--wb-base);border-radius:6px;padding:9px}.M4XxWG_contextActions{gap:8px;margin:8px 0;display:flex}.M4XxWG_contextPanel .M4XxWG_confirmProposal{color:var(--wb-accent);border-color:var(--wb-accent);font-weight:600}.M4XxWG_contextPanel button:disabled{opacity:.5;cursor:wait}.M4XxWG_edge path{fill:none;stroke:var(--wb-muted);stroke-width:2px}.M4XxWG_edge>path:first-child{transition:opacity .18s,stroke .18s,stroke-width .18s}.M4XxWG_edge .M4XxWG_edgeHit{stroke:#0000;stroke-width:16px;pointer-events:stroke;cursor:pointer}.M4XxWG_edge[data-dimmed=true]>path:first-child{opacity:.25}.M4XxWG_edge[data-selected=true]>path:first-child,.M4XxWG_edge:focus-within>path:first-child,.M4XxWG_edge:hover>path:first-child{stroke:var(--wb-accent);stroke-width:3px;opacity:1}@media (prefers-reduced-motion:reduce){.M4XxWG_edge>path:first-child{transition:none}}.M4XxWG_edgeHit:focus{outline:none}.M4XxWG_checkpoint{--node-side-border:2px;--node-top-border:2px;border:2px dashed var(--wb-accent);border-radius:18px}.M4XxWG_checkpoint .M4XxWG_drag{color:var(--wb-accent);font-weight:600}.M4XxWG_node[data-review-ready=true]{border-style:solid;border-color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 5%, var(--wb-bg))}.M4XxWG_reviewNotice{border:1px solid var(--wb-accent);background:color-mix(in srgb, var(--wb-accent) 8%, var(--wb-bg));border-radius:10px;flex-wrap:wrap;align-items:center;gap:8px;margin:6px 0;padding:8px 10px;font-size:12px;display:flex}.M4XxWG_reviewNotice strong{align-items:center;gap:6px;display:inline-flex}.M4XxWG_reviewNotice small{color:var(--wb-muted);flex-basis:100%}.M4XxWG_reviewNotice button{font:inherit;color:var(--wb-accent);background:var(--wb-bg);border:1px solid var(--wb-border);cursor:pointer;border-radius:6px;padding:5px 8px}.M4XxWG_reviewNotice button:focus-visible{outline:2px solid var(--wb-accent);outline-offset:2px}.M4XxWG_reviewNotice button:disabled{cursor:wait;opacity:.6}.M4XxWG_reviewDot{background:var(--wb-accent);border-radius:50%;width:8px;height:8px;animation:2s ease-in-out infinite M4XxWG_reviewPulse}@keyframes M4XxWG_reviewPulse{50%{box-shadow:0 0 0 5px color-mix(in srgb, var(--wb-accent) 18%, transparent)}}@media (prefers-reduced-motion:reduce){.M4XxWG_reviewDot{animation:none}}@media (width<=1100px){.M4XxWG_workbench{inset:8px}.M4XxWG_columns,.M4XxWG_columns[data-inspector-expanded=true]{grid-template-columns:190px minmax(0,1fr) 6px min(var(--inspector-width,360px),40%)}.M4XxWG_columns[data-inspector-hidden=true]{grid-template-columns:190px minmax(0,1fr)}.M4XxWG_header{padding:10px 12px}}@media (width<=900px){.M4XxWG_paneTabs{background:var(--wb-bg);border-bottom:1px solid var(--wb-border);gap:6px;padding:6px 12px;display:flex}.M4XxWG_paneTabs button{flex:1}.M4XxWG_paneTabs button[aria-pressed=true]{color:var(--wb-accent);border-color:var(--wb-accent)}.M4XxWG_columns,.M4XxWG_columns[data-inspector-expanded=true],.M4XxWG_columns[data-inspector-hidden=true]{flex-direction:column;display:flex;overflow:hidden}.M4XxWG_columns>.M4XxWG_roster,.M4XxWG_columns>.M4XxWG_graphArea,.M4XxWG_columns>.M4XxWG_inspector,.M4XxWG_columns>.M4XxWG_resizeHandle{display:none}.M4XxWG_columns[data-pane=members]>.M4XxWG_roster{flex:1;display:block}.M4XxWG_columns[data-pane=flow]>.M4XxWG_graphArea,.M4XxWG_columns[data-pane=discussion]>.M4XxWG_inspector,.M4XxWG_columns[data-inspector-expanded=true]:not([data-inspector-hidden=true])>.M4XxWG_inspector{flex:1;display:flex}.M4XxWG_columns[data-inspector-expanded=true]:not([data-inspector-hidden=true])>.M4XxWG_graphArea,.M4XxWG_columns[data-inspector-expanded=true]:not([data-inspector-hidden=true])>.M4XxWG_roster,.M4XxWG_columns[data-inspector-hidden=true]>.M4XxWG_inspector{display:none}.M4XxWG_canvas{min-height:70px}.M4XxWG_canvasStatus{display:none}.M4XxWG_inspector{border-top:1px solid var(--wb-border)}.M4XxWG_roster article{max-width:620px}}@media (width<=520px){.M4XxWG_workbench{border-radius:0;inset:0}.M4XxWG_header{flex-wrap:wrap;gap:6px}.M4XxWG_header>div:last-child{flex-wrap:wrap}.M4XxWG_title img{width:26px;height:26px}.M4XxWG_title span{display:none}.M4XxWG_commandBar{gap:4px;padding:6px 8px}.M4XxWG_commandBar>strong{display:none}.M4XxWG_workbench button{padding:4px 7px}.M4XxWG_toolbar{gap:4px;padding:6px}}.M4XxWG_checkpoint{border-color:var(--wb-border)}.M4XxWG_checkpoint .M4XxWG_drag{color:var(--wb-muted)}.M4XxWG_node[data-lifecycle]{border-top-color:var(--task-state-color);border-left-color:var(--task-state-color)}.M4XxWG_node[data-lifecycle=inProgress]{background:color-mix(in srgb, var(--wb-accent) 8%, var(--wb-bg));border-color:color-mix(in srgb, var(--wb-accent) 55%, var(--wb-border));border-top-color:var(--wb-accent);border-left-color:var(--wb-accent)}.M4XxWG_node[data-lifecycle=inProgress] .M4XxWG_drag{color:var(--wb-accent);border-bottom-color:color-mix(in srgb, var(--wb-accent) 20%, var(--wb-border))}.M4XxWG_workbench[data-live=true] .M4XxWG_node[data-lifecycle=inProgress]:before{content:\"\";border-radius:inherit;pointer-events:none;box-shadow:0 0 0 3px color-mix(in srgb, var(--wb-accent) 10%, transparent), 0 4px 18px color-mix(in srgb, var(--wb-accent) 15%, transparent);position:absolute;inset:-1px}.M4XxWG_workbench .M4XxWG_node:is([data-lifecycle=completed],[data-lifecycle=reviewPassed]),.M4XxWG_workbench .M4XxWG_node:is([data-lifecycle=completed],[data-lifecycle=reviewPassed]) [data-lifecycle]{--task-state-color:var(--wb-muted)}.M4XxWG_node:is([data-lifecycle=completed],[data-lifecycle=reviewPassed]){background:color-mix(in srgb, var(--wb-muted) 6%, var(--wb-bg));border-color:color-mix(in srgb, var(--wb-muted) 22%, var(--wb-border));box-shadow:none}.M4XxWG_node:is([data-lifecycle=completed],[data-lifecycle=reviewPassed]) .M4XxWG_drag{color:var(--wb-muted)}.M4XxWG_node:is([data-lifecycle=completed],[data-lifecycle=reviewPassed]) .M4XxWG_nodeBody strong{color:color-mix(in srgb, var(--wb-text) 72%, var(--wb-muted))}.M4XxWG_node[data-lifecycle=failed]{background:color-mix(in srgb, var(--wb-error) 7%, var(--wb-bg));border-color:color-mix(in srgb, var(--wb-error) 48%, var(--wb-border));border-top-color:var(--wb-error);border-left-color:var(--wb-error)}.M4XxWG_node[data-lifecycle=failed] .M4XxWG_drag{color:var(--wb-error);border-bottom-color:color-mix(in srgb, var(--wb-error) 16%, var(--wb-border))}.M4XxWG_node[data-review-ready=true] .M4XxWG_drag{color:var(--dsw-alias-state-warn-primary)}.M4XxWG_node[data-member-match=true]{border-color:var(--wb-accent);box-shadow:0 0 0 3px color-mix(in srgb, var(--wb-accent) 22%, transparent)}.M4XxWG_node[data-connection=valid]{box-shadow:0 0 0 7px color-mix(in srgb, var(--wb-accent) 12%, transparent)}form.M4XxWG_editor{flex-direction:column;padding:0;display:flex}.M4XxWG_formBody{flex:1;min-height:0;padding:16px;overflow:auto}.M4XxWG_formBody,.M4XxWG_editor{overflow-wrap:anywhere}.M4XxWG_formBody+footer{flex:none;max-height:35%;margin:0;overflow:auto}.M4XxWG_formBody [data-field=description] textarea{field-sizing:content;min-height:9em;max-height:50vh;line-height:1.65}.M4XxWG_taskHeading{grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:4px 10px;display:grid}.M4XxWG_taskHeading small{color:var(--wb-muted);grid-column:1/-1}.M4XxWG_taskHeading h3{margin:0}.M4XxWG_taskBrief{margin-block:16px}.M4XxWG_taskBrief p{white-space:pre-wrap;margin:6px 0;line-height:1.75}.M4XxWG_workbench[data-live=true] .M4XxWG_node:is([data-lifecycle=reviewReady],[data-lifecycle=configurationPending]):after{content:\"!\";pointer-events:none;text-align:center;width:18px;height:18px;color:var(--wb-bg);background:var(--task-state-color);border-radius:50%;font-weight:700;line-height:18px;position:absolute;top:-9px;right:-6px}@media (prefers-reduced-motion:no-preference){.M4XxWG_workbench[data-live=true] .M4XxWG_node[data-lifecycle=inProgress]:before{animation:3s ease-in-out infinite M4XxWG_runningNode}.M4XxWG_workbench[data-live=true] .M4XxWG_node:is([data-lifecycle=reviewReady],[data-lifecycle=configurationPending]):after{animation:2.4s ease-out 3 M4XxWG_attentionRing}}@keyframes M4XxWG_runningNode{0%,to{opacity:.4}50%{opacity:1}}@keyframes M4XxWG_attentionRing{50%{box-shadow:0 0 0 5px color-mix(in srgb, var(--task-state-color) 20%, transparent)}}@media (width<=900px){.M4XxWG_workbenchBody{overflow-y:auto}.M4XxWG_columns{flex:1 0 240px}}.M4XxWG_discussion[data-template-review=true]>.M4XxWG_messages{flex:none;min-height:0;max-height:35%;padding:6px 16px}.M4XxWG_discussion[data-template-review=true]>.M4XxWG_proposal{flex:1;min-height:0;max-height:none}.M4XxWG_attention{background:var(--wb-bg);border-bottom:1px solid var(--wb-border);flex:none;align-items:center;gap:8px;min-width:0;padding:6px 16px;display:flex}.M4XxWG_attention strong{flex:none;font-size:12px}.M4XxWG_attention button,.M4XxWG_attention select{white-space:nowrap;text-overflow:ellipsis;min-width:0;overflow:hidden}.M4XxWG_attention button{color:var(--wb-accent)}.M4XxWG_attention select{flex-shrink:0;width:10em;max-width:35%}.M4XxWG_adaptationIssue{border:1px solid var(--wb-border);border-left:3px solid var(--wb-error);background:var(--wb-base);border-radius:6px;margin-block:12px;padding:10px}.M4XxWG_adaptationIssue label{flex-direction:column;gap:5px;display:flex}.M4XxWG_adaptationIssue p{font-size:12px;line-height:1.65}.M4XxWG_discussionGenerating{background:color-mix(in srgb,var(--wb-accent) 7%,transparent);min-height:36px;color:var(--wb-accent);border-radius:10px;align-items:center;gap:10px;padding:5px 10px;font-size:12px;font-weight:500;display:flex}.M4XxWG_discussionLogo{background:color-mix(in srgb,var(--wb-accent) 10%,transparent);border-radius:50%;flex:none;justify-content:center;align-items:center;width:32px;height:32px;animation:1.6s ease-in-out infinite M4XxWG_discussion-logo-breathe;display:inline-flex}.M4XxWG_streamCaret{background:var(--teamflow-brand,#a333f5);vertical-align:-.12em;width:2px;height:1em;margin-left:3px;animation:1.2s ease-in-out infinite M4XxWG_discussion-breathe;display:inline-block}.M4XxWG_latestReply{color:var(--wb-accent);margin:4px auto 8px;font-size:12px;display:block}@keyframes M4XxWG_discussion-breathe{0%,to{opacity:.4}50%{opacity:1}}@keyframes M4XxWG_discussion-logo-breathe{0%,to{opacity:.55;box-shadow:0 0 0 0 color-mix(in srgb,var(--wb-accent) 0%,transparent);transform:scale(.94)}50%{opacity:1;box-shadow:0 0 0 5px color-mix(in srgb,var(--wb-accent) 12%,transparent);transform:scale(1.06)}}@media (prefers-reduced-motion:reduce){.M4XxWG_discussionLogo,.M4XxWG_streamCaret{animation:none}}.M4XxWG_messages:has(>.M4XxWG_embeddedChat){flex-direction:column;gap:6px;min-height:0;display:flex}.M4XxWG_embeddedChat{flex-direction:column;flex:1 0 240px;min-height:240px;display:flex}.M4XxWG_embeddedChat>.M4XxWG_embeddedTranscript{overscroll-behavior:contain;overflow-anchor:none;flex:1;min-height:60px;max-height:45vh}.M4XxWG_embeddedChat>.M4XxWG_embeddedComposer{flex:none;grid-template-columns:minmax(0,1fr) auto;align-items:center;margin:4px 0}.M4XxWG_embeddedComposer>label{grid-column:1/-1}.M4XxWG_embeddedComposer>small{min-width:0}.M4XxWG_embeddedComposer>button{grid-column:2}.M4XxWG_embeddedChat>.M4XxWG_discussionGenerating,.M4XxWG_messages:has(>.M4XxWG_embeddedChat)>:not(.M4XxWG_embeddedChat){flex:none}.M4XxWG_messages>.M4XxWG_embeddedChat>.M4XxWG_embeddedTranscript{max-height:none}.M4XxWG_discussionStatus{flex-wrap:wrap;flex:none;justify-content:space-between;align-items:center;gap:6px;min-height:36px;margin-top:6px;display:flex}.M4XxWG_discussionStatus>.M4XxWG_latestReply{flex:none;margin:0 0 0 auto}.M4XxWG_messages:has(>.M4XxWG_embeddedChat)>.M4XxWG_hint{display:none}.M4XxWG_columns[data-reviewing=true]:not([data-inspector-hidden=true]){grid-template-columns:minmax(0, 1fr) 6px minmax(420px, min(var(--inspector-width,640px), 68%))}.M4XxWG_columns[data-reviewing=true]>.M4XxWG_roster{display:none}.M4XxWG_columns[data-reviewing=true][data-inspector-expanded=true]:not([data-inspector-hidden=true]){grid-template-columns:minmax(0,1fr)}.M4XxWG_columns[data-reviewing=true][data-inspector-expanded=true]:not([data-inspector-hidden=true])>.M4XxWG_graphArea,.M4XxWG_columns[data-reviewing=true][data-inspector-expanded=true]:not([data-inspector-hidden=true])>.M4XxWG_resizeHandle{display:none}@media (width<=900px){.M4XxWG_columns[data-reviewing=true]:not([data-inspector-hidden=true]){grid-template-columns:minmax(0,1fr)}.M4XxWG_columns[data-reviewing=true]>.M4XxWG_resizeHandle{display:none}}label.M4XxWG_galleryPermission{flex-direction:row;align-items:center;gap:8px}label.M4XxWG_galleryPermission input[type=checkbox]{width:auto}.M4XxWG_pageTabs{gap:6px;padding:10px 20px}.M4XxWG_pageTabs button{min-height:32px;color:var(--wb-muted);box-shadow:none;background:0 0;border:1px solid #0000;border-radius:8px;gap:7px;padding:6px 11px;font-size:12px;font-weight:500;position:relative}.M4XxWG_pageTabs button svg{width:16px;height:16px}.M4XxWG_pageTabs button{--teamflow-brand:currentColor}.M4XxWG_pageTabs button:hover:not(:disabled){background:var(--wb-base);color:var(--wb-text)}.M4XxWG_pageTabs button[aria-pressed=true]{color:var(--wb-accent);background:color-mix(in srgb,var(--wb-accent) 7%,var(--wb-bg));border-color:color-mix(in srgb,var(--wb-accent) 13%,var(--wb-border))}.M4XxWG_pageTabs button[aria-pressed=true]:after{content:\"\";background:var(--wb-accent);border-radius:2px;height:2px;position:absolute;bottom:-5px;left:12px;right:12px}.M4XxWG_pageTabs button:not([aria-pressed]){border-color:var(--wb-border);margin-left:6px}.M4XxWG_node{box-shadow:0 3px 12px color-mix(in srgb,var(--wb-text) 5%,transparent);border-radius:14px}.M4XxWG_node[data-lifecycle]{border-left-color:color-mix(in srgb,var(--task-state-color) 24%,var(--wb-border));border-top-color:color-mix(in srgb,var(--task-state-color) 64%,var(--wb-border))}.M4XxWG_drag{border-bottom-color:color-mix(in srgb,var(--wb-border) 65%,transparent);padding:7px 12px}.M4XxWG_workbench .M4XxWG_nodeBody{border-radius:0 0 13px 13px;gap:7px;padding:10px 12px}.M4XxWG_nodeBody strong{letter-spacing:.01em;font-weight:600}.M4XxWG_nodeBody small{border-radius:6px;padding:2px 7px}.M4XxWG_node[data-member-match=true]{border-color:var(--wb-accent)}@media (prefers-reduced-motion:no-preference){.M4XxWG_workbench[data-live=true] .M4XxWG_node[data-lifecycle=inProgress]{animation:3.2s ease-in-out infinite M4XxWG_runningSurface}.M4XxWG_workbench[data-live=true] .M4XxWG_node[data-lifecycle=inProgress]:before{animation:3.2s ease-in-out infinite M4XxWG_runningNode}}@keyframes M4XxWG_runningSurface{0%,to{background:color-mix(in srgb,var(--wb-accent) 3%,var(--wb-bg))}50%{background:color-mix(in srgb,var(--wb-accent) 12%,var(--wb-bg))}}.M4XxWG_blockers{border-bottom:1px solid var(--wb-border);background:var(--wb-bg);flex:none;padding:10px 20px;font-size:12px}.M4XxWG_blockers>summary{cursor:pointer;color:var(--wb-muted)}.M4XxWG_blockers>div{max-height:180px;overflow:auto}.M4XxWG_blockers section{border-top:1px solid var(--wb-border);margin-top:8px;padding:10px 0}.M4XxWG_blockers strong{margin-left:10px}.M4XxWG_blockers p{color:var(--wb-muted);margin:6px 0}";
		const tagId$12 = "@yogurtss/dsh-teamflow/WorkflowWorkbench.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$12) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$12;
			tag.textContent = css$12;
			document.head.appendChild(tag);
		}
		var WorkflowWorkbench_module_css_default = {
			"adaptationIssue": "M4XxWG_adaptationIssue",
			"assistantMessage": "M4XxWG_assistantMessage",
			"attention": "M4XxWG_attention",
			"attentionRing": "M4XxWG_attentionRing",
			"blockers": "M4XxWG_blockers",
			"canvas": "M4XxWG_canvas",
			"canvasStatus": "M4XxWG_canvasStatus",
			"checkpoint": "M4XxWG_checkpoint",
			"columns": "M4XxWG_columns",
			"commandBar": "M4XxWG_commandBar",
			"commandSpacer": "M4XxWG_commandSpacer",
			"compact": "M4XxWG_compact",
			"composer": "M4XxWG_composer",
			"confirmProposal": "M4XxWG_confirmProposal",
			"contextActions": "M4XxWG_contextActions",
			"contextInfo": "M4XxWG_contextInfo",
			"contextMember": "M4XxWG_contextMember",
			"contextPanel": "M4XxWG_contextPanel",
			"contextProposal": "M4XxWG_contextProposal",
			"contextTask": "M4XxWG_contextTask",
			"create": "M4XxWG_create",
			"danger": "M4XxWG_danger",
			"decisions": "M4XxWG_decisions",
			"details": "M4XxWG_details",
			"dirtyDot": "M4XxWG_dirtyDot",
			"discussion": "M4XxWG_discussion",
			"discussion-breathe": "M4XxWG_discussion-breathe",
			"discussion-logo-breathe": "M4XxWG_discussion-logo-breathe",
			"discussionGenerating": "M4XxWG_discussionGenerating",
			"discussionLogo": "M4XxWG_discussionLogo",
			"discussionStatus": "M4XxWG_discussionStatus",
			"draftNode": "M4XxWG_draftNode",
			"drag": "M4XxWG_drag",
			"edge": "M4XxWG_edge",
			"edgeHit": "M4XxWG_edgeHit",
			"edges": "M4XxWG_edges",
			"editor": "M4XxWG_editor",
			"embeddedChat": "M4XxWG_embeddedChat",
			"embeddedComposer": "M4XxWG_embeddedComposer",
			"embeddedTranscript": "M4XxWG_embeddedTranscript",
			"empty": "M4XxWG_empty",
			"entry": "M4XxWG_entry",
			"error": "M4XxWG_error",
			"formBody": "M4XxWG_formBody",
			"galleryPermission": "M4XxWG_galleryPermission",
			"graphArea": "M4XxWG_graphArea",
			"header": "M4XxWG_header",
			"hint": "M4XxWG_hint",
			"historyDialog": "M4XxWG_historyDialog",
			"iconLabel": "M4XxWG_iconLabel",
			"input": "M4XxWG_input",
			"inspector": "M4XxWG_inspector",
			"inspectorHeader": "M4XxWG_inspectorHeader",
			"latestReply": "M4XxWG_latestReply",
			"launcher": "M4XxWG_launcher",
			"libraryTabs": "M4XxWG_libraryTabs",
			"materials": "M4XxWG_materials",
			"member": "M4XxWG_member",
			"memberModelSettings": "M4XxWG_memberModelSettings",
			"messages": "M4XxWG_messages",
			"nativeBanner": "M4XxWG_nativeBanner",
			"node": "M4XxWG_node",
			"nodeBody": "M4XxWG_nodeBody",
			"notice": "M4XxWG_notice",
			"output": "M4XxWG_output",
			"pageTabs": "M4XxWG_pageTabs",
			"paneTabs": "M4XxWG_paneTabs",
			"pendingNotice": "M4XxWG_pendingNotice",
			"plane": "M4XxWG_plane",
			"port": "M4XxWG_port",
			"primary": "M4XxWG_primary",
			"proposal": "M4XxWG_proposal",
			"readiness": "M4XxWG_readiness",
			"rerunContext": "M4XxWG_rerunContext",
			"resizeHandle": "M4XxWG_resizeHandle",
			"reviewDot": "M4XxWG_reviewDot",
			"reviewNotice": "M4XxWG_reviewNotice",
			"reviewPulse": "M4XxWG_reviewPulse",
			"roster": "M4XxWG_roster",
			"runningNode": "M4XxWG_runningNode",
			"runningSurface": "M4XxWG_runningSurface",
			"saveBar": "M4XxWG_saveBar",
			"selected": "M4XxWG_selected",
			"startEntry": "M4XxWG_startEntry",
			"streamCaret": "M4XxWG_streamCaret",
			"taskBrief": "M4XxWG_taskBrief",
			"taskHeading": "M4XxWG_taskHeading",
			"taskList": "M4XxWG_taskList",
			"taskOwner": "M4XxWG_taskOwner",
			"title": "M4XxWG_title",
			"toolbar": "M4XxWG_toolbar",
			"userMessage": "M4XxWG_userMessage",
			"workbench": "M4XxWG_workbench",
			"workbenchBody": "M4XxWG_workbenchBody"
		};
		//#endregion
		//#region lib/task-start-state.js
		/** Legacy drafts have no intent flag; execution/stop evidence rules out a first start. */
		function awaitsFirstStart(task) {
			if (!task.workflowPaused || task.status !== "pending" || task.workflowRerunRequired) return false;
			return task.workflowAwaitingStart ?? (!(task.attempt ?? 0) && !task.attemptId && !task.handoffId && !task.stoppedAttempts?.length && !task.checkpoint);
		}
		//#endregion
		//#region lib/client/task-control.js
		function taskControlState(team, task, historic = false) {
			const terminal = [
				"completed",
				"failed",
				"cancelled"
			].includes(task.status);
			const stopping = !!task.workflowPaused && ["claimed", "in_progress"].includes(task.status);
			const waiting = task.dependencies.filter((id) => !team.tasks.some((upstream) => upstream.id === id && upstream.status === "completed"));
			const reviewReady = !!task.checkpoint && !task.checkpoint.decision && task.status === "pending" && !task.workflowPaused && !task.workflowConfigPending && !task.workflowRerunRequired && !waiting.length && team.phase !== "staged" && !team.halted && !historic;
			const disabled = historic || !!team.halted || terminal || !!task.workflowConfigPending || !!task.workflowRerunRequired || !!task.checkpoint?.decision;
			const checked = !terminal && !task.workflowPaused && !task.workflowConfigPending && !task.workflowRerunRequired && !task.checkpoint?.decision;
			const label = terminal ? task.checkpoint?.decision === "approve" ? "task.status.reviewPassed" : task.status === "completed" ? "task.status.completed" : task.status === "failed" ? "task.status.failed" : "task.status.cancelled" : task.checkpoint?.decision === "reject" ? "task.status.reviewRejected" : task.workflowConfigPending ? "task.status.configurationPending" : task.workflowRerunRequired ? waiting.length ? "task.control.rerunWaiting" : task.checkpoint ? "task.control.reviewRequired" : "task.control.rerunRequired" : historic || team.halted ? "task.control.stopped" : stopping ? "task.control.stopping" : task.workflowPaused ? task.workflowAwaitingStart ? "task.control.awaitingStart" : "task.control.paused" : team.phase === "staged" ? "task.control.staged" : task.status === "in_progress" ? "task.status.inProgress" : task.status === "claimed" ? "task.status.claimed" : waiting.some((id) => team.tasks.some((upstream) => upstream.id === id && (["failed", "cancelled"].includes(upstream.status) || upstream.checkpoint?.decision === "reject"))) ? "task.control.blocked" : waiting.length ? "task.control.waiting" : task.checkpoint ? "task.status.reviewReady" : "task.control.queued";
			const canRerun = terminal && !task.checkpoint && !historic && !team.halted && team.phase !== "staged";
			const active = ["claimed", "in_progress"].includes(task.status);
			return {
				disabled,
				checked,
				label,
				waiting,
				reviewReady,
				stopping,
				terminal,
				canRerun,
				active,
				queued: checked && !active,
				actionLabel: stopping ? "task.control.retryStop" : !checked ? "task.control.start" : active ? "task.control.pause" : "task.control.dequeue",
				visual: label.slice(label.lastIndexOf(".") + 1)
			};
		}
		/** Optimistic concurrency token shared by the canvas, activity view and route. */
		function flowControlVersion(team) {
			return JSON.stringify([
				team.phase ?? "running",
				!!team.halted,
				team.tasks.map((task) => [
					task.id,
					task.updatedAt,
					task.status,
					!!task.workflowPaused,
					!!task.workflowConfigPending,
					!!task.workflowRerunRequired,
					task.checkpoint?.decision,
					task.dependencies
				])
			]);
		}
		function flowControlState(team) {
			const controls = team.tasks.map((task) => taskControlState(team, {
				...task,
				workflowPaused: task.workflowPaused || task.workflowRerunRequired,
				workflowRerunRequired: false
			}));
			return {
				canStart: !team.halted && team.phase !== "staged" && !controls.some((c) => c.stopping) && controls.some((c) => !c.disabled),
				canPause: !team.halted && team.phase !== "staged" && controls.some((c) => !c.disabled && (c.checked || c.stopping))
			};
		}
		//#endregion
		//#region lib/client/task-readiness.js
		/** Explain saved execution state without claiming to know live host availability. */
		function taskReadiness(team, task, l = sourceText, execution) {
			const result = (label, detail = label, dependencies = [], action) => ({
				label,
				detail,
				dependencies,
				action
			});
			const control = taskControlState(team, {
				...task,
				workflowAwaitingStart: awaitsFirstStart(task)
			});
			if (task.checkpoint?.decision === "reject") return result(l("已退回"), task.checkpoint.note || l("等待调整方案并返工。"), [], "review");
			if (task.status === "completed") return result(task.checkpoint ? l("验收通过") : l("已完成"));
			if (task.status === "failed") return result(l("执行失败"), l("查看执行记录中的失败原因，再决定是否修改并重跑。"), [], "rerun");
			if (task.status === "cancelled") return result(l("已取消"));
			if (task.workflowConfigPending) return result(l("待配置"), l("节点已保存，可先连线；请填写要求并完成配置。"), [], "edit");
			if (team.halted) return result(l("团队已停止"), l("团队停止期间不会派发此任务。"));
			if (control.stopping || execution === "stopping") return result(l(zh[control.label]), l("已禁止再次调度，正在等待执行会话停止；失败时可重试停止。"), [], "stop");
			if (execution === "interrupted" && ["in_progress", "claimed"].includes(task.status)) return result(l("执行已中断"), l("任务尚未提交完成，但宿主已无运行中的执行会话。继续会封存旧尝试并重新派发，已完成的其他任务保留。"), [], "continue");
			if (task.status === "in_progress" || task.status === "claimed") return result(l(zh[control.label]), task.status === "claimed" ? l(zh["task.control.claimedHint"]) : l("执行 Agent 正在处理任务。"));
			const blocked = task.dependencies.filter((id) => !team.tasks.some((t) => t.id === id && t.status === "completed"));
			const upstream = blocked.map((id) => {
				const item = team.tasks.find((t) => t.id === id);
				return item ? `${item.subject}（${item.status === "failed" ? l("失败") : item.status === "cancelled" ? l("已取消") : item.workflowConfigPending ? l("待配置") : item.checkpoint ? l("未通过验收") : l("未完成")}）` : l("{0}（不存在）", id);
			}).join("、");
			if (task.workflowRerunRequired) return result(l(zh[control.label]), l("点击「运行到此节点」，自动安排本节点及必要上游，按依赖顺序执行；人工检查仍需你确认。") + (blocked.length ? " " + l("仍需等待：{0}", upstream) : ""), blocked, "path");
			if (awaitsFirstStart(task)) return result(l("待启动"), l("节点已配置，点击开始后进入调度。{0}", blocked.length ? l("仍需等待：{0}", upstream) : ""), blocked, "path");
			if (task.workflowPaused) return result(l(zh[control.label]), l("点击开始后重新进入调度，已停止的执行将重新开始。{0}", blocked.length ? l("仍需等待：{0}", upstream) : ""), blocked, "path");
			if (team.phase === "staged") return result(l(zh[control.label]), l("团队方案尚未确认启动。"));
			if (blocked.length) return result(l(zh[control.label]), l("等待：{0}", upstream), blocked, "path");
			if (task.checkpoint) return result(l(zh[control.label]), l("上游已完成，打开材料并作出验收决定。"), [], "review");
			if (task.assignee === "captain") return result(l("等待队长"), l("依赖已满足，等待队长领取。"));
			const candidates = team.members.filter((m) => m.status !== "removed" && (!task.assignee || m.name === task.assignee));
			if (!candidates.length) return result(l("缺少执行 Agent"), task.assignee ? l("执行成员 {0} 不可用，请调整负责人。", task.assignee) : l("请创建或恢复至少一个执行 Agent。"), [], "member");
			const available = candidates.filter((m) => !m.stopping && !team.tasks.some((t) => t.assignee === m.name && ["claimed", "in_progress"].includes(t.status)));
			if (!available.length) return result(l("等待 Agent 空闲"), task.assignee ? l("{0} 正在执行其他任务或停止中。", task.assignee) : l("可用成员均在执行其他任务或停止中。"));
			if (available.every((m) => !!m.spawnError)) return result(l("Agent 启动失败"), available.map((m) => `${m.name}：${m.spawnError}`).join("；"), [], "continue");
			return result(l("等待调度"), l("依赖已满足，等待调度器派发；实际成员会话状态由宿主确认。"), [], "continue");
		}
		//#endregion
		//#region lib/client/WorkflowContext.js
		function TaskRecord({ task, team, expanded = false, showContract = true }) {
			const l = useWorkflowText();
			return (0, react_jsx_runtime.jsxs)("details", {
				"data-task-record": true,
				tabIndex: -1,
				className: WorkflowWorkbench_module_css_default.contextTask,
				open: expanded || task.status === "in_progress",
				children: [
					(0, react_jsx_runtime.jsxs)("summary", { children: [
						!showContract && l("执行记录 · "),
						task.subject,
						" · ",
						taskReadiness(team, task, l).label
					] }),
					showContract && (0, react_jsx_runtime.jsx)("p", { children: task.description || l("未单独填写任务说明") }),
					task.workflowRerunContext && (0, react_jsx_runtime.jsxs)("details", { children: [
						(0, react_jsx_runtime.jsx)("summary", { children: l("本轮重跑依据") }),
						(0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("上一轮结果：") }), task.workflowRerunContext.previousOutput || l("上一轮未提交结果")] }),
						(0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("本轮新增要求：") }), task.workflowRerunContext.instructions] })
					] }),
					task.workflowRerunRequired && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsxs)("strong", { children: [taskReadiness(team, task, l).label, "："] }), taskReadiness(team, task, l).detail] }),
					(0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("输入来自：") }), task.dependencies.map((id) => team.tasks.find((t) => t.id === id)?.subject ?? id).join("、") || l("无前置任务")] }),
					task.objective && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("目标：") }), task.objective] }),
					!!task.inScope?.length && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("工作范围：") }), task.inScope.join("、")] }),
					!!task.outOfScope?.length && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("范围之外：") }), task.outOfScope.join("、")] }),
					!!task.acceptance?.length && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("验收标准：") }), task.acceptance.join("；")] }),
					!!task.verify?.length && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("计划验证：") }), task.verify.join("；")] }),
					!!task.deliverables?.length && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("约定交付：") }), task.deliverables.join("、")] }),
					(0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("已提交结果：") }), task.output || l("尚未提交结果")] }),
					!!task.checkpoint?.history.length && (0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsx)("summary", { children: l("历轮人工验收记录") }), task.checkpoint.history.map((decision, i) => (0, react_jsx_runtime.jsxs)("p", { children: [
						l("第 "),
						decision.round,
						" ",
						l(" 轮 · "),
						decision.decision === "approve" ? l("通过") : l("退回"),
						" · ",
						decision.note || l("未填写意见")
					] }, i))] }),
					!!task.changedPaths?.length && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("已报告变更：") }), task.changedPaths.join("、")] }),
					task.commandsRun?.map((item, i) => (0, react_jsx_runtime.jsxs)("p", { children: [
						(0, react_jsx_runtime.jsxs)("strong", { children: [item.status === "passed" ? l("报告通过") : l("报告失败"), "："] }),
						item.command,
						item.evidence ? `\n${item.evidence}` : ""
					] }, `cmd:${i}`)),
					task.acceptanceResults?.map((item, i) => (0, react_jsx_runtime.jsxs)("p", { children: [
						item.criterion,
						" · ",
						item.status === "passed" ? l("报告通过") : l("报告失败"),
						item.evidence ? `\n${item.evidence}` : ""
					] }, `result:${i}`)),
					!!task.findings?.length && (0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsx)("summary", { children: l("审查发现") }), (0, react_jsx_runtime.jsx)("pre", { children: JSON.stringify(task.findings, null, 2) })] }),
					!!task.stoppedAttempts?.length && (0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsxs)("summary", { children: [
						l("历史执行记录 · "),
						task.stoppedAttempts.length,
						" ",
						l(" 次")
					] }), task.stoppedAttempts.map((attempt, i) => (0, react_jsx_runtime.jsx)("p", { children: attempt.output || l("本次停止前未提交结果") }, i))] })
				]
			});
		}
		function WorkflowContext({ team, discussion, onSelect, openExecution }) {
			const l = useWorkflowText();
			const member = discussion.startsWith("member:") ? team.members.find((m) => m.name === discussion.slice(7)) : void 0;
			const gate = discussion.startsWith("check:") ? team.tasks.find((t) => t.id === discussion.slice(6)) : void 0;
			const focusedTask = discussion.startsWith("task:") ? team.tasks.find((t) => t.id === discussion.slice(5) && !t.checkpoint) : void 0;
			const tasks = member ? team.tasks.filter((t) => t.assignee === member.name) : gate ? team.tasks.filter((t) => gate.dependencies.includes(t.id)) : focusedTask ? team.tasks.filter((t) => focusedTask.dependencies.includes(t.id) || t.dependencies.includes(focusedTask.id)) : team.tasks;
			return (0, react_jsx_runtime.jsxs)("div", {
				className: WorkflowWorkbench_module_css_default.contextInfo,
				children: [
					member ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						(0, react_jsx_runtime.jsxs)("section", { children: [
							(0, react_jsx_runtime.jsxs)("h4", { children: [
								member.name,
								" ",
								l(" · 当前配置")
							] }),
							(0, react_jsx_runtime.jsx)("p", { children: member.summary || member.role || l("尚未填写职责概述") }),
							(0, react_jsx_runtime.jsxs)("dl", { children: [
								(0, react_jsx_runtime.jsx)("dt", { children: l("长期职责") }),
								(0, react_jsx_runtime.jsx)("dd", { children: member.role || l("未单独设置") }),
								(0, react_jsx_runtime.jsx)("dt", { children: l("PE · 成员执行指令") }),
								(0, react_jsx_runtime.jsx)("dd", { children: member.executionPrompt || l("未单独设置；执行时可能沿用团队或插件指令") }),
								(0, react_jsx_runtime.jsx)("dt", { children: l("本次补充指令") }),
								(0, react_jsx_runtime.jsx)("dd", { children: member.specificPrompt || l("未设置") }),
								(0, react_jsx_runtime.jsx)("dt", { children: l("模型") }),
								(0, react_jsx_runtime.jsxs)("dd", { children: [member.activeModel ?? member.model ?? l("未记录"), member.fallbackActive ? l("（已切换备用模型）") : ""] })
							] })
						] }),
						(0, react_jsx_runtime.jsxs)("details", { children: [
							(0, react_jsx_runtime.jsx)("summary", { children: l("本次执行的角色提示词快照") }),
							(0, react_jsx_runtime.jsx)("p", {
								className: WorkflowWorkbench_module_css_default.hint,
								children: l("由插件按团队目标、角色、执行指令和协作规则组装；不等于完整模型请求。")
							}),
							member.runtimeSetup?.persona ? (0, react_jsx_runtime.jsx)("pre", { children: member.runtimeSetup.persona }) : (0, react_jsx_runtime.jsx)("p", { children: member.id ? l("当前记录没有保存该快照，可打开执行对话核对。") : l("尚无执行快照；成员启动后会保存角色提示词。") })
						] }),
						member.id && openExecution && (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void openExecution(member.id, team.captainSessionId),
							children: l("查看执行对话与工具记录 ↗")
						})
					] }) : focusedTask ? (0, react_jsx_runtime.jsxs)("section", { children: [
						(0, react_jsx_runtime.jsxs)("h4", { children: [
							focusedTask.subject,
							" ",
							l(" · 当前任务")
						] }),
						(0, react_jsx_runtime.jsxs)("p", { children: [l("执行负责人："), focusedTask.assignee || l("自动分配")] }),
						(0, react_jsx_runtime.jsxs)("p", { children: [l("下游交接："), team.tasks.filter((t) => t.dependencies.includes(focusedTask.id)).map((t) => t.subject).join("、") || l("无")] }),
						(0, react_jsx_runtime.jsx)(TaskRecord, {
							task: focusedTask,
							team,
							expanded: true
						})
					] }) : gate ? (0, react_jsx_runtime.jsxs)("section", { children: [
						(0, react_jsx_runtime.jsxs)("h4", { children: [
							gate.subject,
							" ",
							l(" · 第 "),
							gate.checkpoint?.round ?? 1,
							" ",
							l(" 轮")
						] }),
						(0, react_jsx_runtime.jsx)("p", { children: gate.description || l("未填写验收要求") }),
						(0, react_jsx_runtime.jsx)("p", { children: gate.checkpoint?.decision === "approve" ? l("已通过") : gate.checkpoint?.decision === "reject" ? l("已退回") : l("等待人工决定") }),
						gate.checkpoint?.note && (0, react_jsx_runtime.jsx)("p", { children: gate.checkpoint.note })
					] }) : (0, react_jsx_runtime.jsxs)("section", { children: [
						(0, react_jsx_runtime.jsx)("h4", { children: l("团队目标") }),
						(0, react_jsx_runtime.jsx)("p", { children: team.description || l("未填写目标") }),
						(0, react_jsx_runtime.jsx)("h4", { children: l("成员与分工") }),
						team.members.filter((m) => m.status !== "removed").map((m) => (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: WorkflowWorkbench_module_css_default.contextMember,
							onClick: () => onSelect?.(`member:${m.name}`),
							children: [(0, react_jsx_runtime.jsx)("strong", { children: m.name }), (0, react_jsx_runtime.jsx)("span", { children: m.summary || m.role || l("尚未填写职责") })]
						}, m.name))
					] }),
					(0, react_jsx_runtime.jsx)("h4", { children: member ? l("负责的任务与成果") : gate ? l("直接上游的提交记录") : focusedTask ? l("直接上下游的提交记录") : l("任务与成果") }),
					!tasks.length && (0, react_jsx_runtime.jsx)("p", {
						className: WorkflowWorkbench_module_css_default.hint,
						children: focusedTask ? l("没有直接上下游任务。") : l("尚未分配任务。")
					}),
					tasks.map((task) => (0, react_jsx_runtime.jsx)(TaskRecord, {
						task,
						team
					}, task.id)),
					(0, react_jsx_runtime.jsx)("p", {
						className: WorkflowWorkbench_module_css_default.hint,
						children: l("结果和验证记录来自 Agent 提交；没有记录的内容会标明缺失，不视为已经验证。")
					})
				]
			});
		}
		/** Anchors use the node's outer border box, shared by paths, snapping and CSS. */
		function connectionPort(point, side) {
			return {
				x: point.x + (side === "output" ? 225 : 0),
				y: point.y + 55
			};
		}
		function connectionPath(start, end) {
			return `M${start.x},${start.y} C${start.x + 35},${start.y} ${end.x - 35},${end.y} ${end.x},${end.y}`;
		}
		/** Mirrors graph invariants for immediate drag feedback; the server revalidates. */
		function connectionIssue(tasks, from, to, l = sourceText) {
			const target = tasks.find((t) => t.id === to);
			if (!target || !tasks.some((t) => t.id === from)) return l("节点不存在");
			if (from === to) return l("不能连接自身");
			if (target.dependencies.includes(from)) return l("这条交接已存在");
			if (target.status !== "pending" || (target.attempt ?? 0) > 0 && !target.workflowPaused || target.reassigning || target.checkpoint?.decision && target.checkpoint.decision !== "reject") return l("请先停止目标任务，或创建返工轮次");
			const seen = /* @__PURE__ */ new Set();
			function reaches(id) {
				if (id === to) return true;
				if (seen.has(id)) return false;
				seen.add(id);
				return tasks.find((t) => t.id === id)?.dependencies.some(reaches) ?? false;
			}
			if (reaches(from)) return l("这条连接会形成循环");
		}
		function connectionTarget(tasks, position, point, from) {
			return tasks.filter((t) => t.id !== from).map((task) => {
				const p = position(task.id), anchor = connectionPort(p, "input"), dx = point.x - anchor.x, dy = point.y - anchor.y;
				return {
					task,
					p,
					distance: Math.hypot(dx, dy),
					inside: point.x >= p.x - 18 && point.x <= p.x + 243 && point.y >= p.y - 12 && point.y <= p.y + 138
				};
			}).filter((candidate) => candidate.distance <= 40 || candidate.inside).sort((a, b) => a.distance - b.distance)[0]?.task;
		}
		//#endregion
		//#region lib/client/artwork.js
		function portrait(path, color = "#4c6b91", background = "#edf2f8") {
			return "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="1" y="1" width="46" height="46" rx="14" fill="${background}"/><g transform="translate(12 12)" fill="none" stroke="${color}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${path}</g></svg>`);
		}
		const portraits = {
			member: portrait("<circle cx=\"12\" cy=\"8\" r=\"3.5\"/><path d=\"M5 21v-2a7 7 0 0 1 14 0v2\"/>"),
			research: portrait("<circle cx=\"10\" cy=\"10\" r=\"6\"/><path d=\"m14.5 14.5 6 6M7 10h6M10 7v6\"/>"),
			engineer: portrait("<path d=\"m7 6-5 6 5 6m10-12 5 6-5 6M14 3l-4 18\"/>"),
			qa: portrait("<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m7.5 12 3 3 6-6\"/>", "#42796b", "#edf5f1"),
			design: portrait("<path d=\"m5 15-1 5 5-1L20 8l-4-4L5 15Zm8-8 4 4M5 15l4 4\"/>", "#7b6595", "#f3eff7"),
			review: portrait("<path d=\"m12 2 8 3v6c0 5-4 8-8 11-4-3-8-6-8-11V5l8-3Z\"/><path d=\"m8 11 3 3 5-5\"/>", "#42796b", "#edf5f1"),
			docs: portrait("<path d=\"M6 2h8l5 5v15H6V2Zm8 0v6h5M9 12h7M9 16h7\"/>"),
			data: portrait("<path d=\"M4 21V11h4v10M10 21V4h4v17M16 21v-7h4v7\"/>", "#7b6595", "#f3eff7"),
			operator: portrait("<path d=\"M5 3v18M12 3v18M19 3v18\"/><rect x=\"2\" y=\"7\" width=\"6\" height=\"4\" rx=\"1\" fill=\"#edf2f8\"/><rect x=\"9\" y=\"14\" width=\"6\" height=\"4\" rx=\"1\" fill=\"#edf2f8\"/><rect x=\"16\" y=\"5\" width=\"6\" height=\"4\" rx=\"1\" fill=\"#edf2f8\"/>")
		};
		const LEAD_ART = portrait("<rect x=\"8\" y=\"2\" width=\"8\" height=\"6\" rx=\"2\"/><path d=\"M12 8v5M5 16v-3h14v3\"/><rect x=\"1\" y=\"16\" width=\"8\" height=\"6\" rx=\"2\"/><rect x=\"15\" y=\"16\" width=\"8\" height=\"6\" rx=\"2\"/>", "#376ac4", "#edf3ff");
		const REVIEW_ART = portraits.review;
		const ACTION_ART = {
			working: portrait("<path d=\"m13 2-8 12h6l-1 8 9-13h-7l1-7Z\"/>"),
			idle: portrait("<path d=\"M8 5v14M16 5v14\"/>"),
			unknown: portrait("<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 6v6l4 2\"/>")
		};
		const ROLE_ART = [
			[/secur|audit|review|验收|安全|审计|审查|评审/, "review"],
			[/\bqa\b|test|verif|quality|测试|质量|验证/, "qa"],
			[/design|\bui\b|\bux\b|front|设计|前端|无障碍/, "design"],
			[/data|analys|metric|performance|数据|分析|指标|性能/, "data"],
			[/resear|investig|explor|study|研究|调查|探索|调研/, "research"],
			[/engineer|develop|\bdev\b|server|backend|\bapi\b|工程|后端|服务|接口|开发|代码|编程/, "engineer"],
			[/docs|writer|product|spec|撰写|文案|写作|文档|规范|产品/, "docs"],
			[/release|\bbuild\b|deploy|\bops\b|\bci\b|coordin|发布|构建|部署|运维|协调/, "operator"]
		];
		/** Role takes precedence over display names; equal roles always share a portrait. */
		function memberArtUrl(name, role) {
			const identity = (role.trim() || name.trim()).toLowerCase();
			for (const [pattern, key] of ROLE_ART) if (pattern.test(identity)) return portraits[key];
			return portraits.member;
		}
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/ActivityPanel.module.css.mjs
		const css$11 = "html{--agent-teams-panel-shift:420px}.YWQs4q_workflowLaunchers{z-index:3;background:var(--dsw-alias-bg-layer-1,light-dark(#fff,#202226));position:sticky;top:0}html[data-agent-teams-panel-open] [data-phase=active]{box-sizing:border-box;padding-right:var(--agent-teams-panel-shift)}.YWQs4q_badge{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 92%, transparent);backdrop-filter:blur(16px);height:34px;box-shadow:0 8px 28px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 29%, transparent);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;align-items:center;gap:7px;padding:0 12px;font-size:12px;font-weight:600;line-height:20px;transition:border-color .15s,transform .12s;display:inline-flex;position:absolute;top:64px;right:18px}.YWQs4q_badge:hover{border-color:var(--dsw-alias-border-l3);transform:translateY(-1px)}.YWQs4q_badge:active{transform:translateY(0)scale(.98)}.YWQs4q_badge:focus-visible,.YWQs4q_iconButton:focus-visible,.YWQs4q_memberRow:focus-visible,.YWQs4q_membersToggle:focus-visible,.YWQs4q_sectionToggleTitle:focus-visible,.YWQs4q_dagNode:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.YWQs4q_badgeDot,.YWQs4q_panelDot{background:var(--dsw-alias-label-tertiary);border-radius:50%;width:7px;height:7px}.YWQs4q_badgeDot[data-busy=true],.YWQs4q_panelDot[data-busy=true]{background:var(--dsw-alias-state-business-primary);animation:1.25s ease-in-out infinite YWQs4q_agentTeamsPulse}.YWQs4q_badgeCount,.YWQs4q_memberCount,.YWQs4q_teamStats,.YWQs4q_stageLabel,.YWQs4q_taskId{font-variant-numeric:tabular-nums}.YWQs4q_panel{box-sizing:border-box;border:1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 58%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 95%, transparent);backdrop-filter:blur(20px)saturate(1.08);box-shadow:0 12px 32px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 25%, transparent), 0 32px 72px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 33%, transparent);will-change:transform;border-radius:16px;flex-direction:column;animation:.16s ease-out YWQs4q_agentTeamsPanelIn;display:flex;position:absolute;top:0;left:0;overflow:hidden}.YWQs4q_panel[data-dragging],.YWQs4q_panel[data-resizing]{user-select:none;box-shadow:0 16px 38px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 29%, transparent), 0 36px 78px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 38%, transparent)}@keyframes YWQs4q_agentTeamsPanelIn{0%{opacity:0}to{opacity:1}}@keyframes YWQs4q_agentTeamsPulse{0%,to{opacity:.42}50%{opacity:1}}.YWQs4q_panelHead{border-bottom:1px solid var(--dsw-alias-border-l2);cursor:grab;touch-action:none;flex:none;justify-content:space-between;align-items:center;min-height:44px;padding:0 14px 0 16px;display:flex}.YWQs4q_panelHead:active,.YWQs4q_panel[data-dragging] .YWQs4q_panelHead{cursor:grabbing}.YWQs4q_panel[data-compact] .YWQs4q_panelHead{cursor:default;touch-action:auto}.YWQs4q_panelTitle{color:var(--dsw-alias-label-primary);align-items:center;gap:8px;font-size:14px;font-weight:600;line-height:20px;display:inline-flex}.YWQs4q_panelControls{flex:none;align-items:center;gap:2px;display:inline-flex}.YWQs4q_iconButton{width:28px;height:28px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:7px;justify-content:center;align-items:center;padding:0;transition:background-color .12s,color .12s,transform .12s;display:inline-flex}.YWQs4q_iconButton:hover{background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-primary)}.YWQs4q_iconButton:active{transform:scale(.94)}.YWQs4q_iconButton[data-control=dock][data-mode=docked] svg{transform:scaleX(-1)}.YWQs4q_resizeHandle{z-index:5;touch-action:none;pointer-events:auto;position:absolute}.YWQs4q_resizeHandle[data-resize-edge=left]{cursor:ew-resize;width:14px;top:44px;bottom:14px;left:0}.YWQs4q_resizeHandle[data-resize-edge=left]:after{background:color-mix(in srgb, var(--dsw-alias-label-tertiary) 42%, transparent);content:\"\";opacity:.45;border-radius:999px;width:3px;height:48px;transition:background-color .12s,opacity .12s;position:absolute;top:50%;left:4px;transform:translateY(-50%)}.YWQs4q_resizeHandle[data-resize-edge=bottom]{cursor:ns-resize;height:14px;bottom:0;left:20px;right:20px}.YWQs4q_resizeHandle[data-resize-edge=bottom]:after{background:color-mix(in srgb, var(--dsw-alias-label-tertiary) 42%, transparent);content:\"\";opacity:.45;border-radius:999px;width:48px;height:3px;transition:background-color .12s,opacity .12s;position:absolute;bottom:4px;left:50%;transform:translate(-50%)}.YWQs4q_resizeHandle[data-resize-edge=corner]{cursor:nwse-resize;width:28px;height:28px;bottom:0;right:0}.YWQs4q_resizeHandle[data-resize-edge=corner]:after{border-right:2px solid var(--dsw-alias-label-tertiary);border-bottom:2px solid var(--dsw-alias-label-tertiary);content:\"\";opacity:.58;width:10px;height:10px;transition:border-color .12s,opacity .12s;position:absolute;bottom:6px;right:6px}.YWQs4q_resizeHandle:hover:after,.YWQs4q_panel[data-resizing] .YWQs4q_resizeHandle:after{background-color:var(--dsw-alias-state-business-primary);border-color:var(--dsw-alias-state-business-primary);opacity:.95}.YWQs4q_teams{overscroll-behavior:contain;scrollbar-color:color-mix(in srgb, var(--dsw-alias-label-tertiary) 28%, transparent) transparent;scrollbar-width:thin;flex-direction:column;min-height:0;display:flex;overflow-y:auto}.YWQs4q_teams::-webkit-scrollbar{width:6px}.YWQs4q_teams::-webkit-scrollbar-track{background:0 0}.YWQs4q_teams::-webkit-scrollbar-thumb{background:color-mix(in srgb, var(--dsw-alias-label-tertiary) 28%, transparent);background-clip:padding-box;border:2px solid #0000;border-radius:999px}.YWQs4q_teams:hover::-webkit-scrollbar-thumb{background:color-mix(in srgb, var(--dsw-alias-label-tertiary) 44%, transparent);background-clip:padding-box}.YWQs4q_team{border-bottom:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:12px;padding:12px 14px 16px;display:flex;container:YWQs4q_agent-team/inline-size}.YWQs4q_team:last-child{border-bottom:0}.YWQs4q_teamHead{align-items:center;gap:10px;min-width:0;display:flex}.YWQs4q_teamName{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px;font-weight:600;line-height:18px;overflow:hidden}.YWQs4q_teamStats{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;gap:8px;font-size:10.5px;line-height:16px;display:inline-flex}.YWQs4q_teamStopButton{border:1px solid var(--dsw-alias-border-l2);width:26px;height:26px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border-radius:7px;flex:none;place-items:center;padding:0;transition:border-color .15s,background .15s,color .15s;display:grid}.YWQs4q_teamStopButton:hover{border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 42%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, transparent);color:var(--dsw-alias-state-error-primary)}.YWQs4q_teamStopButton:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.YWQs4q_stopModalActions{justify-content:flex-end;gap:8px;display:flex}.YWQs4q_stopModalActions button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-ghost-active-fill);min-height:34px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;border-radius:8px;justify-content:center;align-items:center;gap:6px;padding:6px 13px;font-size:12px;font-weight:600;display:inline-flex}.YWQs4q_stopModalActions button[data-danger]{border-color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary-inverted)}.YWQs4q_stopModalActions button:disabled{cursor:wait;opacity:.58}.YWQs4q_stopModalError{background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);color:var(--dsw-alias-state-error-primary);border-radius:8px;align-items:flex-start;gap:7px;margin:0;padding:9px 10px;font-size:12px;line-height:18px;display:flex}.YWQs4q_stopModalError svg{flex:none;margin-top:1px}.YWQs4q_sectionHead{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}.YWQs4q_sectionTitle{color:var(--dsw-alias-label-secondary);align-items:center;gap:6px;font-size:11px;font-weight:600;line-height:16px;display:inline-flex}.YWQs4q_sectionHint{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}.YWQs4q_delegationSection{min-width:0}.YWQs4q_captainNode{box-sizing:border-box;border:1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 32%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 7%, var(--dsw-alias-bg-layer-1));border-radius:10px;grid-template-columns:48px minmax(0,1fr) auto;align-items:center;gap:9px;min-height:56px;padding:6px 10px;display:grid}.YWQs4q_captainAvatar,.YWQs4q_memberAvatar{flex:none;justify-content:center;align-items:center;display:inline-flex;position:relative}.YWQs4q_captainAvatar{width:46px;height:46px}.YWQs4q_leadAvatar,.YWQs4q_memberArt{object-fit:contain;filter:none;background:0 0;border:0;border-radius:0}.YWQs4q_leadAvatar{width:44px;height:44px}.YWQs4q_memberArt{width:40px;height:40px}.YWQs4q_captainInfo,.YWQs4q_memberInfo{flex-direction:column;min-width:0;display:flex}.YWQs4q_captainInfo{gap:2px}.YWQs4q_captainLine,.YWQs4q_memberLine{align-items:center;gap:6px;min-width:0;display:flex}.YWQs4q_captainName,.YWQs4q_memberName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;font-weight:600;line-height:18px;overflow:hidden}.YWQs4q_captainRole,.YWQs4q_memberRole{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}.YWQs4q_captainSummary,.YWQs4q_memberStatusLine{color:var(--dsw-alias-label-secondary);text-overflow:ellipsis;white-space:nowrap;font-size:10.5px;line-height:15px;overflow:hidden}.YWQs4q_taskDetailModel{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9.5px;line-height:14px;overflow:hidden}.YWQs4q_memberModel{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-ghost-active-fill);min-width:0;max-width:132px;color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;border-radius:999px;flex:0 auto;align-items:center;padding:0 6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px;font-weight:600;line-height:15px;display:inline-flex;overflow:hidden}.YWQs4q_captainState,.YWQs4q_memberState{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;align-items:center;gap:5px;font-size:10px;font-weight:500;line-height:15px;display:inline-flex}.YWQs4q_captainState[data-busy=true],.YWQs4q_memberState[data-activity=working]{color:var(--dsw-alias-state-business-primary)}.YWQs4q_workGlyph rect{opacity:.5}.YWQs4q_workGlyph[data-active=true] rect{animation:1.1s ease-in-out infinite YWQs4q_agentTeamsDot}@keyframes YWQs4q_agentTeamsDot{0%,to{opacity:.25}50%{opacity:1}}.YWQs4q_progressOverview{flex-direction:column;gap:7px;display:flex}.YWQs4q_progressTitle{color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:600;line-height:16px}.YWQs4q_progressSegments{gap:3px;display:flex}.YWQs4q_progressSegments>span,.YWQs4q_progressEmpty{background:var(--dsw-alias-border-l3);border-radius:2px;flex:1;height:5px}.YWQs4q_progressEmpty{width:100%;display:block}.YWQs4q_progressSegments>span[data-state=running]{background:var(--dsw-alias-state-business-primary)}.YWQs4q_progressSegments>span[data-state=blocked]{background:var(--dsw-alias-border-l3)}.YWQs4q_progressSegments>span[data-state=completed]{background:var(--dsw-alias-state-success-primary)}.YWQs4q_progressSegments>span[data-state=failed]{background:var(--dsw-alias-state-error-primary)}.YWQs4q_progressSegments>span[data-state=cancelled]{opacity:.55}.YWQs4q_progressLegend{color:var(--dsw-alias-label-tertiary);flex-wrap:wrap;gap:10px;font-size:9.5px;line-height:14px;display:flex}.YWQs4q_progressLegend>span[data-state=running]{color:var(--dsw-alias-state-business-primary)}.YWQs4q_progressLegend>span[data-state=blocked]{color:var(--dsw-alias-label-secondary)}.YWQs4q_progressLegend>span[data-state=completed]{color:var(--dsw-alias-state-success-primary)}.YWQs4q_progressSummary{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 7%, var(--dsw-alias-bg-layer-1));min-width:0;color:var(--dsw-alias-label-secondary);border-radius:8px;align-items:center;gap:6px;padding:5px 8px;font-size:10px;font-weight:600;line-height:15px;display:flex}.YWQs4q_progressSummary[data-state=warning]{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, var(--dsw-alias-bg-layer-1))}.YWQs4q_progressSummary[data-state=completed]{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, var(--dsw-alias-bg-layer-1))}.YWQs4q_progressSummary[data-state=discarded]{background:var(--dsw-alias-button-ghost-active-fill)}.YWQs4q_progressSummary>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.YWQs4q_progressSummaryDot{background:var(--dsw-alias-state-business-primary);border-radius:50%;flex:none;width:5px;height:5px}.YWQs4q_progressSummary[data-state=warning] .YWQs4q_progressSummaryDot{background:var(--dsw-alias-state-warn-primary)}.YWQs4q_progressSummary[data-state=completed] .YWQs4q_progressSummaryDot{background:var(--dsw-alias-state-success-primary)}.YWQs4q_progressSummary[data-state=discarded] .YWQs4q_progressSummaryDot{background:var(--dsw-alias-label-tertiary)}.YWQs4q_membersToggle{background:var(--dsw-alias-bg-module-platform);width:100%;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border:0;border-radius:8px;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;font-size:10.5px;font-weight:600;line-height:15px;display:flex}.YWQs4q_membersToggle:hover{background:var(--dsw-alias-button-ghost-active-fill)}.YWQs4q_membersToggle>span{align-items:center;gap:5px;display:inline-flex}.YWQs4q_membersToggle>span:last-child{color:var(--dsw-alias-state-business-primary)}.YWQs4q_chevron{flex:none;transition:transform .14s}.YWQs4q_chevron[data-open=true]{transform:rotate(90deg)}.YWQs4q_delegationTree{flex-direction:column;gap:2px;margin-left:18px;padding:9px 0 0 20px;display:flex;position:relative}.YWQs4q_delegationTree:before{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 48%, var(--dsw-alias-border-l2));content:\"\";width:1px;position:absolute;top:0;bottom:22px;left:0}.YWQs4q_memberBlock{flex-direction:column;min-width:0;padding:3px 0 7px;display:flex;position:relative}.YWQs4q_memberBranch{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 48%, var(--dsw-alias-border-l2));width:20px;height:1px;display:block;position:absolute;top:27px;right:100%}.YWQs4q_memberBranch:before{background:var(--dsw-alias-state-business-primary);content:\"\";border-radius:50%;width:5px;height:5px;position:absolute;top:-2px;right:-1px}.YWQs4q_memberRow{box-sizing:border-box;width:100%;min-width:0;min-height:48px;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:8px;grid-template-columns:46px minmax(0,1fr) auto;align-items:center;gap:8px;padding:4px 6px;transition:background-color .12s,transform .12s;display:grid}.YWQs4q_memberRow:hover,.YWQs4q_memberRow[data-activity=working]{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 6%, var(--dsw-alias-bg-layer-1))}.YWQs4q_memberRow:active{transform:scale(.995)}.YWQs4q_memberAvatar{width:42px;height:42px}.YWQs4q_memberAvatar[data-unread=true]:after{box-sizing:border-box;border:1px solid var(--dsw-alias-bg-layer-1);background:var(--dsw-alias-state-business-primary);content:\"\";border-radius:50%;width:6px;height:6px;animation:1.8s ease-in-out infinite YWQs4q_agentTeamsUnreadPulse;position:absolute;top:0;right:-1px}@keyframes YWQs4q_agentTeamsUnreadPulse{0%,to{opacity:.78;transform:scale(.92)}50%{opacity:1;transform:scale(1.16)}}.YWQs4q_memberInitial{background:var(--dsw-alias-state-business-primary);width:34px;height:34px;color:var(--dsw-alias-label-primary-inverted);border-radius:50%;justify-content:center;align-items:center;font-size:14px;font-weight:600;line-height:20px;display:inline-flex}.YWQs4q_stateArt{box-sizing:border-box;object-fit:contain;width:22px;height:22px;filter:drop-shadow(0 0 1px var(--dsw-alias-bg-layer-1)) drop-shadow(0 1px 1px #122d483d);background:0 0;border:0;border-radius:0;position:absolute;bottom:-3px;right:-5px}.YWQs4q_stateArt[data-activity=working]{animation:2.4s ease-in-out infinite YWQs4q_agentTeamsFloat}.YWQs4q_stateArt[data-activity=idle]{animation:4.2s ease-in-out infinite YWQs4q_agentTeamsBreathe}.YWQs4q_stateArt[data-activity=unknown]{animation:2.8s ease-in-out infinite YWQs4q_agentTeamsThink}@keyframes YWQs4q_agentTeamsFloat{0%,to{transform:translateY(0)rotate(-4deg)}50%{transform:translateY(-2px)rotate(4deg)}}@keyframes YWQs4q_agentTeamsBreathe{0%,to{opacity:.82;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}@keyframes YWQs4q_agentTeamsThink{0%,to{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}.YWQs4q_memberState{margin-left:auto}.YWQs4q_memberCount{color:var(--dsw-alias-label-tertiary);font-size:10.5px;line-height:16px}.YWQs4q_assignmentLine{align-items:center;gap:7px;min-width:0;padding:0 6px 0 60px;display:flex}.YWQs4q_assignmentLabel{color:var(--dsw-alias-label-tertiary);flex:none;font-size:9.5px;line-height:14px}.YWQs4q_assignmentTasks{flex-wrap:wrap;flex:1;gap:4px;min-width:0;display:flex}.YWQs4q_assignmentChip{background:var(--dsw-alias-button-ghost-active-fill);max-width:100%;min-height:16px;color:var(--dsw-alias-label-secondary);text-overflow:ellipsis;white-space:nowrap;border-radius:4px;align-items:center;padding:0 5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px;font-weight:600;line-height:14px;display:inline-flex;overflow:hidden}.YWQs4q_assignmentChip[data-state=running]{background:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted)}.YWQs4q_assignmentChip[data-state=completed]{background:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-label-primary-inverted)}.YWQs4q_assignmentChip[data-state=blocked]{background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary-inverted)}.YWQs4q_assignmentChip[data-state=failed]{background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary-inverted)}.YWQs4q_assignmentChip[data-state=cancelled]{color:var(--dsw-alias-label-tertiary);text-decoration:line-through}.YWQs4q_unreadPill{color:var(--dsw-alias-state-business-primary);white-space:nowrap;flex:none;font-size:9.5px;font-weight:600;line-height:14px}.YWQs4q_taskEmpty{color:var(--dsw-alias-label-tertiary);font-size:9.5px;line-height:14px}.YWQs4q_dependencySection{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:7px;min-width:0;padding-top:10px;display:flex}.YWQs4q_sectionToggleTitle{color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border:0;align-items:center;gap:6px;padding:0;font-size:11px;font-weight:600;line-height:16px;display:inline-flex}.YWQs4q_dagViewport{scrollbar-width:thin;min-width:0;padding:2px 0 4px;overflow-x:auto}.YWQs4q_dagCanvas{min-width:100%;position:relative}.YWQs4q_dagCanvas[data-layout=parallel]{flex-wrap:wrap;gap:8px;display:flex}.YWQs4q_dagCanvas[data-layout=parallel] .YWQs4q_dagNode{flex:92px;min-width:92px;position:relative}.YWQs4q_dagEdges{pointer-events:none;position:absolute;inset:0;overflow:visible}.YWQs4q_dagEdges path{fill:none;stroke:var(--dsw-alias-border-l3);stroke-width:1px;transition:opacity .14s,stroke .14s,stroke-width .14s}.YWQs4q_dagEdges path[data-active=true]{stroke:var(--dsw-alias-state-business-primary);stroke-width:1.6px}.YWQs4q_dagEdges path[data-dimmed=true]{opacity:.65}.YWQs4q_dagNode{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;border-radius:6px;flex-direction:column;justify-content:center;gap:1px;padding:0 6px;transition:border-color .14s,background-color .14s,opacity .14s;display:flex;position:absolute}.YWQs4q_dagState{margin-top:3px;padding:1px 3px;font-size:9px;line-height:12px}.YWQs4q_team[data-workspace-team] .YWQs4q_dagState{margin-top:4px;font-size:10px;line-height:14px}.YWQs4q_dagNode:hover,.YWQs4q_dagNode[data-focused=true]{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 6%, var(--dsw-alias-bg-layer-1))}.YWQs4q_dagNode[data-dimmed=true]{opacity:.78}.YWQs4q_dagNode[data-state=running][data-dimmed=true]{opacity:.9}.YWQs4q_dagNode[data-state=completed],.YWQs4q_dagNode[data-state=blocked]{border-color:var(--dsw-alias-border-l2)}.YWQs4q_dagNode[data-state=failed]{border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 56%, var(--dsw-alias-border-l2))}.YWQs4q_dagNode[data-verdict-stale=true]{border-style:dashed;border-color:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 62%, var(--dsw-alias-border-l2))}.YWQs4q_dagNode[data-verdict-stale=true] .YWQs4q_dagNodeHead{color:var(--dsw-alias-state-warn-primary)}.YWQs4q_dagNodeHead{color:var(--dsw-alias-label-primary);align-items:center;gap:4px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9.5px;font-weight:700;display:flex}.YWQs4q_dagNodeDot{background:var(--dsw-alias-border-l3);border-radius:1.5px;flex:none;width:5px;height:5px}.YWQs4q_dagNode[data-state=running] .YWQs4q_dagNodeDot{background:var(--dsw-alias-state-business-primary)}.YWQs4q_dagNode[data-state=running] .YWQs4q_dagNodeHead{padding-right:12px}.YWQs4q_dagRunningState{width:9px;height:9px;color:var(--dsw-alias-state-business-primary);pointer-events:none;justify-content:center;align-items:center;display:inline-flex;position:absolute;top:4px;right:5px}.YWQs4q_dagRunningState .YWQs4q_workGlyph{width:9px;height:9px}.YWQs4q_dagNode[data-state=blocked] .YWQs4q_dagNodeDot{background:var(--dsw-alias-label-tertiary)}.YWQs4q_dagNode[data-state=completed] .YWQs4q_dagNodeDot{background:var(--dsw-alias-state-success-primary)}.YWQs4q_dagNode[data-state=failed] .YWQs4q_dagNodeDot{background:var(--dsw-alias-state-error-primary)}.YWQs4q_dagNodeLabel{color:var(--dsw-alias-label-secondary);text-overflow:ellipsis;white-space:nowrap;font-size:8.5px;line-height:11px;overflow:hidden}.YWQs4q_taskDetail{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:9px;flex-direction:column;gap:3px;min-width:0;padding:7px 9px;display:flex}.YWQs4q_taskDetailHead{flex-wrap:wrap;align-items:center;gap:6px;min-width:0;display:flex}.YWQs4q_taskDetailId{color:var(--dsw-alias-state-business-primary);flex:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;font-weight:700}.YWQs4q_taskDetailSubject{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:11px;font-weight:600;line-height:16px;overflow:hidden}.YWQs4q_taskDetailBadge{background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-secondary);border-radius:4px;flex:none;padding:0 5px;font-size:8.5px;font-weight:600;line-height:14px}.YWQs4q_taskDetailBadge[data-state=running]{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-state-business-primary)}.YWQs4q_taskDetailBadge[data-state=blocked]{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary)}.YWQs4q_taskDetailBadge[data-state=completed]{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-state-success-primary)}.YWQs4q_taskDetailBadge[data-state=failed]{background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-state-error-primary)}.YWQs4q_taskDetailLine,.YWQs4q_taskDetailMeta{color:var(--dsw-alias-label-secondary);font-size:9.5px;line-height:14px}.YWQs4q_taskDetailMeta{color:var(--dsw-alias-label-tertiary)}.YWQs4q_emptyHint{color:var(--dsw-alias-label-tertiary);padding:10px 12px;font-size:11px;line-height:16px}.YWQs4q_planEditor{border:1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 30%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 94%, var(--dsw-alias-state-business-primary));box-shadow:inset 0 1px 0 color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent);border-radius:10px;flex-direction:column;gap:12px;margin:0 10px 12px;padding:12px;display:flex}.YWQs4q_planHeader>span{justify-content:space-between;align-items:center;gap:8px;display:flex}.YWQs4q_planHeader>span>span{flex-direction:column;gap:2px;min-width:0;display:flex}.YWQs4q_planHeader strong{color:var(--dsw-alias-label-primary);font-size:12px}.YWQs4q_planHeader small{color:var(--dsw-alias-label-secondary);font-size:9px;font-weight:500;line-height:13px}.YWQs4q_planHeader em{background:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);border-radius:999px;flex:none;padding:1px 7px;font-size:9px;font-style:normal;line-height:16px}.YWQs4q_planHeader p{color:var(--dsw-alias-label-secondary);margin:5px 0 0;font-size:10px;line-height:15px}.YWQs4q_planFlow{grid-template-columns:repeat(3,minmax(0,1fr));margin:0;padding:0;list-style:none;display:grid}.YWQs4q_planFlow li{min-width:0;color:var(--dsw-alias-label-tertiary);align-items:center;gap:5px;font-size:9px;font-weight:600;line-height:14px;display:flex;position:relative}.YWQs4q_planFlow li:not(:last-child):after{background:var(--dsw-alias-border-l2);content:\"\";flex:1;min-width:8px;height:1px;margin-right:5px}.YWQs4q_planFlow li>span{border:1px solid var(--dsw-alias-border-l2);border-radius:50%;flex:none;place-items:center;width:18px;height:18px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px;display:grid}.YWQs4q_planFlow li[data-active]{color:var(--dsw-alias-state-business-primary)}.YWQs4q_planFlow li[data-active]>span{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent)}.YWQs4q_planSection{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:8px;overflow:hidden}.YWQs4q_planSectionToggle,.YWQs4q_planCardHeader{box-sizing:border-box;width:100%;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:0}.YWQs4q_planSectionToggle{justify-content:space-between;align-items:center;gap:8px;min-height:42px;padding:7px 9px;display:flex}.YWQs4q_planSectionToggle:hover,.YWQs4q_planCardHeader:hover{background:color-mix(in srgb, var(--dsw-alias-button-ghost-active-fill) 46%, transparent)}.YWQs4q_planSectionToggle>span{align-items:baseline;gap:7px;min-width:0;display:flex}.YWQs4q_planSectionToggle strong{font-size:10.5px}.YWQs4q_planSectionToggle small{color:var(--dsw-alias-label-tertiary);font-size:9px}.YWQs4q_planList{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:0;display:flex}.YWQs4q_planEmpty{color:var(--dsw-alias-label-tertiary);text-align:center;margin:0;padding:12px;font-size:10px}.YWQs4q_planCard{background:0 0;border:0;border-radius:0;min-width:0;margin:0;padding:0;display:block;position:relative}.YWQs4q_planCard+.YWQs4q_planCard{border-top:1px solid var(--dsw-alias-border-l2)}.YWQs4q_planCard[data-open=true]{background:color-mix(in srgb, var(--dsw-alias-bg-base) 62%, transparent)}.YWQs4q_planCardHeader{grid-template-columns:minmax(80px,.9fr) minmax(72px,1.15fr) auto 12px;align-items:center;gap:7px;min-height:40px;padding:6px 9px;display:grid}.YWQs4q_planCardIdentity{flex-direction:column;gap:1px;min-width:0;display:flex}.YWQs4q_planCardIdentity strong,.YWQs4q_planTaskSummary{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;font-weight:650;line-height:14px;overflow:hidden}.YWQs4q_planCardIdentity>span,.YWQs4q_planCardMeta{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:8.5px;line-height:12px;overflow:hidden}.YWQs4q_planTaskId{background:var(--dsw-alias-button-ghost-active-fill);width:max-content;color:var(--dsw-alias-label-secondary);border-radius:4px;padding:1px 5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:8.5px;font-weight:700;line-height:14px}.YWQs4q_planDirty{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 13%, transparent);color:var(--dsw-alias-state-warn-primary);border-radius:999px;justify-self:end;padding:1px 5px;font-size:8px;font-style:normal;font-weight:650;line-height:14px}.YWQs4q_planChevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .18s cubic-bezier(.2,.7,.2,1)}.YWQs4q_planChevron[data-open=true]{transform:rotate(90deg)}.YWQs4q_planCardBody{flex-direction:column;gap:8px;padding:0 9px 9px;display:flex}.YWQs4q_planCardBody fieldset{border:0;flex-direction:column;gap:7px;min-width:0;margin:0;padding:0;display:flex}.YWQs4q_planCardBody label,.YWQs4q_planNewTask label{min-width:0;color:var(--dsw-alias-label-tertiary);flex-direction:column;flex:1;gap:4px;font-size:9px;display:flex}.YWQs4q_planCardBody label small{color:var(--dsw-alias-label-tertiary);font-size:8px;line-height:11px}.YWQs4q_planCard input,.YWQs4q_planCard textarea,.YWQs4q_planCard select,.YWQs4q_planNewTask input{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);width:100%;min-width:0;color:var(--dsw-alias-label-primary);font:inherit;border-radius:6px;outline:none;font-size:10.5px;line-height:16px;transition:border-color .16s,box-shadow .16s}.YWQs4q_planCard input,.YWQs4q_planCard select,.YWQs4q_planNewTask input{min-height:32px;padding:6px 8px}.YWQs4q_planCard textarea{resize:vertical;min-height:58px;padding:7px 8px}.YWQs4q_planCard input:focus-visible,.YWQs4q_planCard textarea:focus-visible,.YWQs4q_planCard select:focus-visible,.YWQs4q_planNewTask input:focus-visible{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary) 16%, transparent)}.YWQs4q_planGrid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:6px;display:grid}.YWQs4q_planModelPicker{grid-template-columns:minmax(0,1fr);gap:5px;display:grid}.YWQs4q_planModelMenu{width:100%;display:flex}.YWQs4q_planModelTrigger{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);width:100%;min-height:38px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;border-radius:7px;justify-content:space-between;align-items:center;gap:8px;padding:7px 9px;transition:border-color .16s,background-color .16s,transform .12s;display:flex}.YWQs4q_planModelTrigger:hover:not(:disabled){border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover)}.YWQs4q_planModelTrigger:active:not(:disabled){transform:translateY(1px)}.YWQs4q_planModelTrigger:focus-visible{border-color:var(--dsw-alias-state-business-primary);outline:2px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 16%, transparent);outline-offset:1px}.YWQs4q_planModelTrigger:disabled{cursor:wait;opacity:.64}.YWQs4q_planModelTriggerCopy{align-items:baseline;gap:6px;min-width:0;display:flex}.YWQs4q_planModelTriggerCopy strong,.YWQs4q_planModelTriggerCopy span{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.YWQs4q_planModelTriggerCopy strong{color:var(--dsw-alias-label-primary);font-size:10px;font-weight:650;line-height:15px}.YWQs4q_planModelTriggerCopy span{color:var(--dsw-alias-label-tertiary);font-size:9px;line-height:14px}.YWQs4q_planModelMenuRow{grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:8px;width:100%;min-width:0;display:grid}.YWQs4q_planModelMenuRow>span:first-child{color:var(--dsw-alias-label-primary)}.YWQs4q_planModelMenuRow strong{color:var(--dsw-alias-label-tertiary);text-align:right;text-overflow:ellipsis;white-space:nowrap;font-weight:450;overflow:hidden}.YWQs4q_planModelMenuBack{align-items:center;gap:7px;display:inline-flex}.YWQs4q_planModelMenuBack svg{transform:rotate(180deg)}.YWQs4q_planModelEffortRow{flex-direction:column;align-items:flex-start;min-width:0;display:flex}.YWQs4q_planModelEffortRow small{width:100%;color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}.YWQs4q_planModelHint{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:8.5px;line-height:12px;overflow:hidden}.YWQs4q_planModelNotice{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 9%, transparent);color:var(--dsw-alias-label-secondary);border-radius:6px;grid-column:1/-1;justify-content:space-between;align-items:center;gap:8px;padding:6px 7px;font-size:8.5px;line-height:12px;display:flex}.YWQs4q_planModelNotice button{color:var(--dsw-alias-state-business-primary);cursor:pointer;font:inherit;background:0 0;border:0;flex:none;padding:2px 6px;font-weight:650}.YWQs4q_planActions,.YWQs4q_planApproveRow,.YWQs4q_planNewTask,.YWQs4q_planConfirm,.YWQs4q_planApproveActions,.YWQs4q_planSecondaryActions{align-items:center;gap:7px;display:flex}.YWQs4q_planReviewActions{grid-template-columns:minmax(0,1fr);gap:6px;width:100%;display:grid}.YWQs4q_planSecondaryActions{grid-template-columns:minmax(0,1fr) auto;display:grid}.YWQs4q_planActions{justify-content:flex-end}.YWQs4q_planActions button,.YWQs4q_planNewTask button,.YWQs4q_planApproveRow button,.YWQs4q_planConfirm button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-ghost-active-fill);min-height:30px;color:var(--dsw-alias-label-primary);cursor:pointer;border-radius:6px;flex:none;padding:5px 10px;font-size:9.5px;font-weight:600;transition:background .16s,border-color .16s,transform .16s}.YWQs4q_planActions button:hover:not(:disabled),.YWQs4q_planNewTask button:hover:not(:disabled),.YWQs4q_planApproveRow button:hover:not(:disabled),.YWQs4q_planConfirm button:hover:not(:disabled){border-color:var(--dsw-alias-label-tertiary)}.YWQs4q_planActions button:active:not(:disabled),.YWQs4q_planNewTask button:active:not(:disabled),.YWQs4q_planApproveRow button:active:not(:disabled),.YWQs4q_planConfirm button:active:not(:disabled){transform:scale(.98)}.YWQs4q_planActions button[data-danger],.YWQs4q_planConfirm button[data-danger]{color:var(--dsw-alias-state-error-primary)}.YWQs4q_planFeedback{min-width:0;color:var(--dsw-alias-label-secondary);flex:1;align-items:center;gap:5px;font-size:9px;line-height:13px;animation:.18s ease-out YWQs4q_plan-feedback-in;display:inline-flex}.YWQs4q_planFeedback[data-tone=success]{color:var(--dsw-alias-state-success-primary)}.YWQs4q_planFeedback[data-tone=error]{color:var(--dsw-alias-state-error-primary)}.YWQs4q_planFeedback>span{border:1px solid;border-radius:50%;flex:none;place-items:center;width:15px;height:15px;display:grid}.YWQs4q_planFeedback svg{width:11px;height:11px}@keyframes YWQs4q_plan-feedback-in{0%{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:translateY(0)}}.YWQs4q_planConfirm{border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, transparent);border-radius:7px;flex-wrap:wrap;justify-content:flex-end;padding:7px}.YWQs4q_planConfirm>span{min-width:140px;color:var(--dsw-alias-label-secondary);flex:1;font-size:9px;line-height:13px}.YWQs4q_planNewTask{align-items:flex-end}.YWQs4q_planNewTask label{gap:4px}.YWQs4q_planNewTask label>span{line-height:13px}.YWQs4q_planApproveRow{z-index:1;border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 94%, transparent);min-height:50px;box-shadow:0 -5px 16px color-mix(in srgb, var(--dsw-alias-bg-base) 35%, transparent);backdrop-filter:blur(8px);border-radius:8px;flex-direction:column;justify-content:flex-end;align-items:stretch;margin:0 -4px -4px;padding:8px;position:sticky;bottom:0}.YWQs4q_planApproveRow[data-armed=true]{border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, var(--dsw-alias-border-l2))}.YWQs4q_planApproveRow[data-discard=true]{border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, var(--dsw-alias-border-l2))}.YWQs4q_planApproveCopy{flex-direction:column;flex:1;gap:2px;min-width:0;display:flex}.YWQs4q_planApproveCopy strong{color:var(--dsw-alias-label-primary);font-size:9.5px;line-height:13px}.YWQs4q_planApproveCopy small{color:var(--dsw-alias-label-tertiary);font-size:8.5px;line-height:12px}.YWQs4q_planApproveRow button{background:var(--dsw-alias-state-business-primary);min-height:32px;color:var(--dsw-alias-label-primary-inverted);padding-inline:13px}.YWQs4q_planReviewActions>button[data-plan-approve]{width:100%}.YWQs4q_planApproveActions>button:first-child{background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-primary)}.YWQs4q_planSecondaryActions>button,.YWQs4q_planApproveActions>button[data-danger]{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-primary)}.YWQs4q_planSecondaryActions>button[data-danger],.YWQs4q_planApproveActions>button[data-danger]{color:var(--dsw-alias-state-error-primary)}.YWQs4q_planSectionToggle:focus-visible,.YWQs4q_planCardHeader:focus-visible,.YWQs4q_planActions button:focus-visible,.YWQs4q_planNewTask button:focus-visible,.YWQs4q_planApproveRow button:focus-visible,.YWQs4q_planConfirm button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}.YWQs4q_planActions button:disabled,.YWQs4q_planNewTask button:disabled,.YWQs4q_planApproveRow button:disabled{cursor:default;opacity:.55}.YWQs4q_historicPill{background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-tertiary);border-radius:4px;flex:none;margin-left:auto;padding:1px 7px;font-size:9.5px;font-weight:600;line-height:15px}.YWQs4q_members{flex-direction:column;gap:3px;display:flex}.YWQs4q_archiveLabel{color:var(--dsw-alias-label-tertiary);padding:5px 14px 0;font-size:9.5px;font-weight:600;line-height:14px;display:block}@media (prefers-reduced-motion:reduce){.YWQs4q_panel,.YWQs4q_badge,.YWQs4q_badgeDot,.YWQs4q_panelDot,.YWQs4q_workGlyph rect,.YWQs4q_stateArt,.YWQs4q_memberAvatar[data-unread=true]:after,.YWQs4q_planChevron,.YWQs4q_planFeedback,.YWQs4q_planActions button,.YWQs4q_planNewTask button,.YWQs4q_planApproveRow button,.YWQs4q_planConfirm button,.YWQs4q_planCard input,.YWQs4q_planCard textarea,.YWQs4q_planCard select,.YWQs4q_planNewTask input{transition:none;animation:none}}@media (width<=960px){html[data-agent-teams-panel-open] [data-phase=active]{padding-right:0}}@media (width<=640px){.YWQs4q_badge{top:56px;right:10px}.YWQs4q_teamStats span[data-stat=messages]{display:none}.YWQs4q_captainNode{grid-template-columns:48px minmax(0,1fr)}.YWQs4q_captainState{display:none}.YWQs4q_delegationTree{margin-left:12px;padding-left:15px}.YWQs4q_memberBranch{width:15px}.YWQs4q_assignmentLine{padding-left:53px}.YWQs4q_planFlow li{gap:4px;font-size:8px}.YWQs4q_planFlow li:not(:last-child):after{margin-right:3px}.YWQs4q_planCardHeader{grid-template-columns:auto minmax(0,1fr) auto}.YWQs4q_planCardHeader .YWQs4q_planCardMeta{display:none}.YWQs4q_planGrid,.YWQs4q_planModelPicker{grid-template-columns:minmax(0,1fr)}.YWQs4q_planNewTask,.YWQs4q_planApproveRow{flex-direction:column;align-items:stretch}.YWQs4q_planNewTask button,.YWQs4q_planApproveRow>button,.YWQs4q_planApproveActions,.YWQs4q_planReviewActions{width:100%}.YWQs4q_planApproveActions button,.YWQs4q_planReviewActions button,.YWQs4q_planSecondaryActions button{flex:1}}@container YWQs4q_agent-team (width<=360px){.YWQs4q_planEditor{margin-inline:0;padding-inline:10px}.YWQs4q_planHeader>span{align-items:flex-start}.YWQs4q_planFlow li{gap:3px;font-size:7.5px}.YWQs4q_planFlow li:not(:last-child):after{min-width:4px;margin-right:2px}.YWQs4q_planSecondaryActions,.YWQs4q_planApproveActions{grid-template-columns:minmax(0,1fr);width:100%;display:grid}.YWQs4q_planSecondaryActions button,.YWQs4q_planApproveActions button{width:100%}}.YWQs4q_dagOwner{text-overflow:ellipsis;max-width:64px;margin-left:auto;font-size:9px;font-weight:400;overflow:hidden}.YWQs4q_team[data-workspace-team]{--workspace-surface:var(--dsw-alias-bg-layer-1);--workspace-line:color-mix(in srgb, var(--dsw-alias-border-l2) 75%, transparent);--workspace-shadow:0 3px 14px color-mix(in srgb, var(--dsw-alias-label-primary) 3%, transparent);background:0 0;border:0;gap:14px;padding:0;container:none}.YWQs4q_team[data-workspace-team] .YWQs4q_teamHead{flex-wrap:wrap;gap:8px;padding:0 2px 2px}.YWQs4q_team[data-workspace-team] .YWQs4q_teamName{flex-basis:160px;font-size:14px;line-height:1.5}.YWQs4q_team[data-workspace-team] .YWQs4q_teamStats{flex-wrap:wrap;font-size:11px}.YWQs4q_team[data-workspace-team] .YWQs4q_teamStopButton{border-radius:9px;width:32px;height:32px}.YWQs4q_team[data-workspace-team] .YWQs4q_delegationSection,.YWQs4q_team[data-workspace-team] .YWQs4q_dependencySection,.YWQs4q_completionCard,.YWQs4q_inboxCard{border:1px solid var(--workspace-line);background:var(--workspace-surface);min-width:0;box-shadow:var(--workspace-shadow);box-sizing:border-box;border-radius:18px;margin:0;padding:18px}.YWQs4q_team[data-workspace-team] .YWQs4q_captainNode{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 4%, var(--dsw-alias-bg-module-platform));border-color:var(--workspace-line);border-radius:12px;grid-template-columns:44px minmax(0,1fr);gap:8px;padding:10px}.YWQs4q_team[data-workspace-team] .YWQs4q_captainState{grid-column:2;justify-self:start;font-size:11px}.YWQs4q_team[data-workspace-team] .YWQs4q_captainName{font-size:14px}.YWQs4q_team[data-workspace-team] .YWQs4q_captainRole{font-size:11px}.YWQs4q_team[data-workspace-team] .YWQs4q_captainSummary{white-space:normal;font-size:12px;line-height:1.6}.YWQs4q_team[data-workspace-team] .YWQs4q_progressOverview{gap:9px;margin:16px 0}.YWQs4q_team[data-workspace-team] .YWQs4q_progressSegments{gap:4px}.YWQs4q_team[data-workspace-team] .YWQs4q_progressSegments>span{border-radius:4px;height:6px}.YWQs4q_team[data-workspace-team] .YWQs4q_progressLegend{gap:8px 12px;font-size:11px}.YWQs4q_team[data-workspace-team] .YWQs4q_progressSummary{font-size:11px;line-height:1.6}.YWQs4q_team[data-workspace-team] .YWQs4q_progressSummary>span:last-child{white-space:normal}.YWQs4q_team[data-workspace-team] .YWQs4q_membersToggle{background:var(--dsw-alias-bg-module-platform);border-radius:9px;padding:10px;font-size:11px}.YWQs4q_team[data-workspace-team] .YWQs4q_memberBlock{padding-top:14px;padding-bottom:8px}.YWQs4q_team[data-workspace-team] .YWQs4q_memberRow{border-radius:9px}.YWQs4q_team[data-workspace-team] .YWQs4q_memberLine{flex-wrap:wrap;gap:4px 6px}.YWQs4q_team[data-workspace-team] .YWQs4q_memberName{font-size:13px}.YWQs4q_team[data-workspace-team] .YWQs4q_memberRole,.YWQs4q_team[data-workspace-team] .YWQs4q_memberState,.YWQs4q_team[data-workspace-team] .YWQs4q_memberCount{font-size:11px}.YWQs4q_team[data-workspace-team] .YWQs4q_memberRole{background:var(--dsw-alias-bg-module-platform);border-radius:5px;padding:1px 5px}.YWQs4q_team[data-workspace-team] .YWQs4q_memberStatusLine{white-space:normal;font-size:12px;line-height:1.6}.YWQs4q_team[data-workspace-team] .YWQs4q_assignmentLine{flex-wrap:wrap;row-gap:5px}.YWQs4q_team[data-workspace-team] .YWQs4q_assignmentLabel{font-size:10px}.YWQs4q_team[data-workspace-team] .YWQs4q_assignmentChip{border-radius:5px;font-size:10px;line-height:18px}.YWQs4q_team[data-workspace-team] .YWQs4q_memberBlock[data-selected-member] .YWQs4q_memberRow{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px}.YWQs4q_team[data-workspace-team] .YWQs4q_sectionHead{flex-wrap:wrap;gap:8px;margin-bottom:18px}.YWQs4q_team[data-workspace-team] .YWQs4q_sectionToggleTitle{font-size:12px}.YWQs4q_team[data-workspace-team] .YWQs4q_sectionHint{white-space:normal;font-size:11px;line-height:1.6}.YWQs4q_team[data-workspace-team] .YWQs4q_dagViewport{padding:4px 2px 14px}.YWQs4q_team[data-workspace-team] .YWQs4q_dagNode{background:var(--workspace-surface);border-radius:11px;padding:10px 11px}.YWQs4q_team[data-workspace-team] .YWQs4q_dagNodeHead{margin-bottom:6px;font-size:11px}.YWQs4q_team[data-workspace-team] .YWQs4q_dagNodeLabel{white-space:normal;-webkit-line-clamp:2;letter-spacing:0;-webkit-box-orient:vertical;font-size:12px;line-height:1.4;display:-webkit-box;overflow:hidden}.YWQs4q_team[data-workspace-team] .YWQs4q_dagOwner{white-space:nowrap;max-width:105px;font-size:10px}.YWQs4q_team[data-workspace-team] .YWQs4q_taskDetail{border-radius:11px;margin-top:14px;padding:14px}.YWQs4q_team[data-workspace-team] .YWQs4q_taskDetailSubject{white-space:normal;font-size:13px;line-height:1.6}.YWQs4q_team[data-workspace-team] .YWQs4q_taskDetailLine,.YWQs4q_team[data-workspace-team] .YWQs4q_taskDetailMeta{font-size:12px;line-height:1.6}.YWQs4q_team[data-workspace-team] .YWQs4q_planEditor{background:var(--workspace-surface);border-color:var(--workspace-line);border-radius:18px;margin:0;padding:18px}.YWQs4q_team[data-workspace-team] .YWQs4q_planApproveRow{position:static}.YWQs4q_workspaceSummary{grid-template-columns:minmax(0,1fr);gap:14px;min-width:0;display:grid}.YWQs4q_completionCard h3,.YWQs4q_inboxCard h3{color:var(--dsw-alias-label-secondary);margin:0;font-size:12px;font-weight:600;line-height:1.6}.YWQs4q_completionBody{flex-wrap:wrap;align-items:center;gap:20px;margin-top:16px;display:flex}.YWQs4q_completionRing{flex:none;width:132px;height:132px;position:relative}.YWQs4q_completionRing svg{width:100%;height:100%;transform:rotate(-90deg)}.YWQs4q_completionRing circle{fill:none;stroke-width:7px}.YWQs4q_ringTrack{stroke:var(--dsw-alias-border-l2)}.YWQs4q_ringValue{stroke:var(--dsw-alias-state-business-primary)}.YWQs4q_completionRing>span{color:var(--dsw-alias-label-secondary);flex-direction:column;justify-content:center;align-items:center;gap:5px;font-size:11px;display:flex;position:absolute;inset:0}.YWQs4q_completionRing strong{color:var(--dsw-alias-label-primary);letter-spacing:-.7px;font-variant-numeric:tabular-nums;font-size:26px;font-weight:600;line-height:1.2}.YWQs4q_completionRing small{font-size:18px;font-weight:450}.YWQs4q_completionTasks{flex:200px;min-width:0;max-height:216px;margin:0;padding:2px;list-style:none;overflow:auto}.YWQs4q_completionTasks li{border-bottom:1px solid var(--workspace-line);grid-template-columns:18px auto minmax(0,1fr) auto;align-items:center;gap:8px;padding:7px 0;font-size:11px;display:grid}.YWQs4q_completionTasks li:last-child{border:0}.YWQs4q_completionDot{background:var(--dsw-alias-bg-module-platform);width:16px;height:16px;color:var(--dsw-alias-label-secondary);border-radius:50%;place-items:center;display:grid}.YWQs4q_completionTasks li[data-state=completed] .YWQs4q_completionDot{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 12%, var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-state-success-primary)}.YWQs4q_completionTasks li[data-state=failed] .YWQs4q_completionDot{background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary-inverted)}.YWQs4q_completionTaskId{text-overflow:ellipsis;white-space:nowrap;max-width:6em;color:var(--dsw-alias-label-secondary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;overflow:hidden}.YWQs4q_completionTaskSubject{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.YWQs4q_completionTaskStatus{color:var(--dsw-alias-label-secondary);font-size:10px}.YWQs4q_completionTasks li[data-verdict-stale] .YWQs4q_completionDot{background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary)}.YWQs4q_completionTasks li[data-verdict-stale] .YWQs4q_completionTaskStatus{font-weight:600}.YWQs4q_completionTasks:focus-visible,.YWQs4q_inboxMessages:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px;border-radius:4px}.YWQs4q_inboxCard>header{flex-wrap:wrap;align-items:baseline;gap:6px 12px;display:flex}.YWQs4q_inboxCard>header>span{color:var(--dsw-alias-label-secondary);font-size:10px}.YWQs4q_inboxMessages{max-height:260px;margin:14px 0 0;padding:0;list-style:none;overflow:auto}.YWQs4q_inboxMessages li{align-items:start;gap:9px;margin:0 0 12px;display:flex}.YWQs4q_inboxMessages img,.YWQs4q_inboxInitial{object-fit:contain;flex:none;width:30px;height:30px}.YWQs4q_inboxInitial{background:var(--dsw-alias-bg-module-platform);border-radius:9px;place-items:center;font-size:12px;display:grid}.YWQs4q_inboxMessages li>div{flex:1;min-width:0}.YWQs4q_inboxMessages strong{overflow-wrap:anywhere;font-size:11px;font-weight:550}.YWQs4q_inboxMessages p{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 6%, var(--dsw-alias-bg-module-platform));white-space:pre-wrap;overflow-wrap:anywhere;border-radius:0 10px 10px;margin:5px 0 0;padding:9px 11px;font-size:12px;line-height:1.6}.YWQs4q_summaryEmpty{color:var(--dsw-alias-label-secondary);margin:14px 0 0;font-size:12px;line-height:1.8}@container (width>=800px){.YWQs4q_team[data-workspace-team]{grid-template-columns:minmax(280px,.8fr) minmax(0,1.4fr);align-items:start;gap:16px;display:grid}.YWQs4q_team[data-workspace-team]>.YWQs4q_teamHead,.YWQs4q_team[data-workspace-team]>[data-staging-editor],.YWQs4q_workspaceSummary{grid-column:1/-1}.YWQs4q_workspaceSummary{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}.YWQs4q_team[data-workspace-team] .YWQs4q_dependencySection{align-self:stretch}.YWQs4q_team[data-workspace-team] .YWQs4q_dagCanvas[data-layout=parallel]{grid-template-columns:repeat(2,minmax(0,1fr))}}@container (width<=400px){.YWQs4q_team[data-workspace-team] .YWQs4q_delegationSection,.YWQs4q_team[data-workspace-team] .YWQs4q_dependencySection,.YWQs4q_completionCard,.YWQs4q_inboxCard{border-radius:14px;padding:12px}.YWQs4q_team[data-workspace-team] .YWQs4q_teamStats{gap:6px;font-size:10px}.YWQs4q_completionBody{justify-content:center}}.YWQs4q_progressSegments>span[data-state=claimed],.YWQs4q_dagNode[data-state=claimed] .YWQs4q_dagNodeDot{background:var(--dsw-alias-state-warn-primary)}.YWQs4q_progressLegend>span[data-state=claimed]{color:var(--dsw-alias-state-business-primary)}.YWQs4q_dagNode[data-state=claimed]{border-color:var(--dsw-alias-border-l2)}.YWQs4q_dagNode[data-state=claimed] .YWQs4q_dagNodeHead{padding-right:38px}.YWQs4q_assignmentChip[data-state=claimed],.YWQs4q_taskDetailBadge[data-state=claimed]{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-state-business-primary)}.YWQs4q_quickMember{border:1px solid var(--dsw-alias-border-l2,#dce1e8);border-radius:8px;gap:8px;margin:8px 0 8px 38px;padding:10px;font-size:12px;display:grid}.YWQs4q_quickMember label{gap:4px;display:grid}.YWQs4q_quickMember textarea{box-sizing:border-box;resize:vertical;width:100%;min-height:55px;font:inherit;color:inherit;border:1px solid var(--dsw-alias-border-l2,#dce1e8);background:0 0;border-radius:6px;padding:6px}.YWQs4q_quickMember>div:last-child{gap:6px;display:flex}.YWQs4q_quickMember>div:last-child button,.YWQs4q_quickTranscript{font:inherit;border:1px solid var(--dsw-alias-border-l2,#dce1e8);color:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:4px 8px}.YWQs4q_quickMember p[role=alert]{color:var(--dsw-alias-state-error-primary,#b94444);overflow-wrap:anywhere}.YWQs4q_quickTranscript{margin:4px 0 4px 38px;font-size:11px;display:block}.YWQs4q_memberBlock[data-selected-member] .YWQs4q_memberRow{outline:2px solid var(--dsw-alias-state-business-primary,#2866d7);outline-offset:2px}.YWQs4q_dagNode:focus-visible,.YWQs4q_taskDetailControls button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.YWQs4q_dagNode[data-checkpoint=true],.YWQs4q_team[data-workspace-team] .YWQs4q_dagNode[data-checkpoint=true]{border:2px dashed var(--dsw-alias-border-l3)}.YWQs4q_dagNode[data-review-ready=true],.YWQs4q_team[data-workspace-team] .YWQs4q_dagNode[data-review-ready=true]{border-style:solid;border-color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 6%, var(--dsw-alias-bg-layer-1))}.YWQs4q_dagNode[aria-pressed=true]{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.YWQs4q_taskDetailBadge[data-review-ready=true],.YWQs4q_taskDetailBadge[data-verdict-stale=true]{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 10%, var(--dsw-alias-bg-layer-1))}.YWQs4q_reviewKind{color:var(--dsw-alias-label-primary);align-items:center;gap:3px;font-size:11px;font-weight:650;display:inline-flex}.YWQs4q_reviewKind svg{flex:none;width:12px;height:12px}.YWQs4q_dagNodeHead .YWQs4q_reviewKind{text-overflow:ellipsis;white-space:nowrap;min-width:0;margin-left:auto;font-size:8px;overflow:hidden}.YWQs4q_team[data-workspace-team] .YWQs4q_dagNodeHead .YWQs4q_reviewKind{font-size:10px}.YWQs4q_dagNodeHead .YWQs4q_reviewKind svg{width:10px;height:10px}.YWQs4q_team[data-workspace-team] .YWQs4q_dagNodeHead .YWQs4q_reviewKind svg{width:12px;height:12px}.YWQs4q_team[data-workspace-team] .YWQs4q_dagRunningState{width:14px;height:14px;top:8px;right:7px}.YWQs4q_team[data-workspace-team] .YWQs4q_dagRunningState .YWQs4q_workGlyph{width:14px;height:14px}.YWQs4q_team[data-workspace-team] .YWQs4q_dagNode[data-state=running] .YWQs4q_dagNodeHead{padding-right:14px}.YWQs4q_dagNode[data-lifecycle],.YWQs4q_team[data-workspace-team] .YWQs4q_dagNode[data-lifecycle]{border-left-color:var(--task-state-color);border-left-width:3px}.YWQs4q_taskDetailControls{flex-wrap:wrap;align-items:center;gap:8px;margin-top:8px;display:flex}.YWQs4q_taskDetailControls button{font:inherit;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:inherit;cursor:pointer;white-space:nowrap;border-radius:5px;align-items:center;gap:6px;padding:5px 8px;font-size:12px;display:inline-flex}.YWQs4q_taskDetailControls button svg{flex:none;width:14px;height:14px}.YWQs4q_taskDetailControls button:disabled{cursor:default;opacity:.6}.YWQs4q_taskDetailControls [data-review-action=true]{color:var(--dsw-alias-state-warn-primary);border-color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 6%, var(--dsw-alias-bg-layer-1));order:-1;font-weight:650}.YWQs4q_taskDetailControls .YWQs4q_taskPlayback{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, var(--dsw-alias-border-l2));align-items:center;gap:6px;transition:background .15s,transform .15s;display:inline-flex}.YWQs4q_taskPlayback:not(:disabled):hover{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 9%, var(--dsw-alias-bg-layer-1))}.YWQs4q_taskPlayback:not(:disabled):active{transform:scale(.97)}.YWQs4q_taskPlaybackIcon{fill:currentColor;flex:none;width:14px;height:14px}.YWQs4q_taskPlayback[data-running=true] .YWQs4q_taskPlaybackIcon{animation:1.6s ease-in-out infinite YWQs4q_taskPlaybackPulse}@keyframes YWQs4q_taskPlaybackPulse{0%,to{opacity:1}50%{opacity:.4}}@media (prefers-reduced-motion:reduce){.YWQs4q_taskPlayback[data-running=true] .YWQs4q_taskPlaybackIcon{animation:none}.YWQs4q_taskDetailControls .YWQs4q_taskPlayback{transition:none}}.YWQs4q_taskControlHint{color:var(--dsw-alias-label-secondary);margin:6px 0;font-size:11px;line-height:1.5}.YWQs4q_reviewNote{white-space:pre-wrap;color:var(--dsw-alias-label-primary);font-size:12px}.YWQs4q_taskDetailLine{overflow-wrap:anywhere}.YWQs4q_taskDetailDescription{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;white-space:pre-wrap;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin:8px 0 0;font-size:12px;line-height:1.6;display:-webkit-box;overflow:hidden}.YWQs4q_taskDetailMore{border-top:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);margin-top:8px;padding-top:6px;font-size:11px}.YWQs4q_taskDetailMore summary{cursor:pointer;width:fit-content;padding:3px 0}.YWQs4q_taskDetailMore summary:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.YWQs4q_taskDetailMore[open] .YWQs4q_taskDetailMeta{margin-top:5px;display:block}.YWQs4q_badge{--capsule-accent:var(--dsw-alias-state-business-primary,light-dark(#4775c5,#9bbcff));background:var(--dsw-alias-bg-layer-1,light-dark(#fafbfd,#24272d));max-width:min(180px,100vw - 36px);height:28px;color:var(--dsw-alias-label-primary,light-dark(#344054,#e2e7ee));border:1px solid var(--dsw-alias-border-l2,light-dark(#e2e6ed,#3b414b));backdrop-filter:none;gap:7px;padding:0 9px 0 5px;font-size:11px;font-weight:500;line-height:1;box-shadow:0 2px 8px #00000008}.YWQs4q_badge:hover{background:var(--dsw-alias-bg-module-platform,light-dark(#f2f5fa,#2d323b));border-color:color-mix(in srgb,var(--capsule-accent) 35%,transparent);transform:none}.YWQs4q_badge[data-status=configuration],.YWQs4q_badge[data-status=attention],.YWQs4q_badge[data-status=review]{--capsule-accent:light-dark(#ad7620,#d9b374)}.YWQs4q_badge[data-status=completed]{--capsule-accent:light-dark(#5c8b76,#91bba8)}.YWQs4q_badge:is([data-status=paused],[data-status=archived],[data-status=history],[data-status=staged],[data-status=waiting]){--capsule-accent:light-dark(#8a95a4,#a0a9b6)}.YWQs4q_statusRing{width:20px;height:20px;color:var(--capsule-accent);flex:none;place-items:center;display:grid;position:relative}.YWQs4q_statusRing svg{overflow:visible;transform:rotate(-90deg)}.YWQs4q_ringTrack,.YWQs4q_ringValue{fill:none;stroke-width:1.6px}.YWQs4q_ringTrack{stroke:currentColor;opacity:.16}.YWQs4q_ringValue{stroke:currentColor;stroke-linecap:round;transition:stroke-dasharray .55s}.YWQs4q_statusRing i{font-size:10px;font-style:normal;line-height:1;position:absolute}.YWQs4q_statusLabel{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.YWQs4q_statusPercent{font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary,light-dark(#7c8797,#a4afbd));text-align:right;min-width:29px}.YWQs4q_statusPercent small{margin-left:1px;font-size:9px}.YWQs4q_statusCount{box-sizing:border-box;min-width:15px;height:15px;color:var(--capsule-accent);background:color-mix(in srgb,var(--capsule-accent) 11%,transparent);font-variant-numeric:tabular-nums;border-radius:5px;place-items:center;padding:0 3px;font-size:9px;display:grid}@media (prefers-reduced-motion:reduce){.YWQs4q_ringValue{transition:none}}";
		const tagId$11 = "@yogurtss/dsh-teamflow/ActivityPanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$11) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$11;
			tag.textContent = css$11;
			document.head.appendChild(tag);
		}
		var ActivityPanel_module_css_default = {
			"agent-team": "YWQs4q_agent-team",
			"agentTeamsBreathe": "YWQs4q_agentTeamsBreathe",
			"agentTeamsDot": "YWQs4q_agentTeamsDot",
			"agentTeamsFloat": "YWQs4q_agentTeamsFloat",
			"agentTeamsPanelIn": "YWQs4q_agentTeamsPanelIn",
			"agentTeamsPulse": "YWQs4q_agentTeamsPulse",
			"agentTeamsThink": "YWQs4q_agentTeamsThink",
			"agentTeamsUnreadPulse": "YWQs4q_agentTeamsUnreadPulse",
			"archiveLabel": "YWQs4q_archiveLabel",
			"assignmentChip": "YWQs4q_assignmentChip",
			"assignmentLabel": "YWQs4q_assignmentLabel",
			"assignmentLine": "YWQs4q_assignmentLine",
			"assignmentTasks": "YWQs4q_assignmentTasks",
			"badge": "YWQs4q_badge",
			"badgeCount": "YWQs4q_badgeCount",
			"badgeDot": "YWQs4q_badgeDot",
			"captainAvatar": "YWQs4q_captainAvatar",
			"captainInfo": "YWQs4q_captainInfo",
			"captainLine": "YWQs4q_captainLine",
			"captainName": "YWQs4q_captainName",
			"captainNode": "YWQs4q_captainNode",
			"captainRole": "YWQs4q_captainRole",
			"captainState": "YWQs4q_captainState",
			"captainSummary": "YWQs4q_captainSummary",
			"chevron": "YWQs4q_chevron",
			"completionBody": "YWQs4q_completionBody",
			"completionCard": "YWQs4q_completionCard",
			"completionDot": "YWQs4q_completionDot",
			"completionRing": "YWQs4q_completionRing",
			"completionTaskId": "YWQs4q_completionTaskId",
			"completionTaskStatus": "YWQs4q_completionTaskStatus",
			"completionTaskSubject": "YWQs4q_completionTaskSubject",
			"completionTasks": "YWQs4q_completionTasks",
			"dagCanvas": "YWQs4q_dagCanvas",
			"dagEdges": "YWQs4q_dagEdges",
			"dagNode": "YWQs4q_dagNode",
			"dagNodeDot": "YWQs4q_dagNodeDot",
			"dagNodeHead": "YWQs4q_dagNodeHead",
			"dagNodeLabel": "YWQs4q_dagNodeLabel",
			"dagOwner": "YWQs4q_dagOwner",
			"dagRunningState": "YWQs4q_dagRunningState",
			"dagState": "YWQs4q_dagState",
			"dagViewport": "YWQs4q_dagViewport",
			"delegationSection": "YWQs4q_delegationSection",
			"delegationTree": "YWQs4q_delegationTree",
			"dependencySection": "YWQs4q_dependencySection",
			"emptyHint": "YWQs4q_emptyHint",
			"historicPill": "YWQs4q_historicPill",
			"iconButton": "YWQs4q_iconButton",
			"inboxCard": "YWQs4q_inboxCard",
			"inboxInitial": "YWQs4q_inboxInitial",
			"inboxMessages": "YWQs4q_inboxMessages",
			"leadAvatar": "YWQs4q_leadAvatar",
			"memberArt": "YWQs4q_memberArt",
			"memberAvatar": "YWQs4q_memberAvatar",
			"memberBlock": "YWQs4q_memberBlock",
			"memberBranch": "YWQs4q_memberBranch",
			"memberCount": "YWQs4q_memberCount",
			"memberInfo": "YWQs4q_memberInfo",
			"memberInitial": "YWQs4q_memberInitial",
			"memberLine": "YWQs4q_memberLine",
			"memberModel": "YWQs4q_memberModel",
			"memberName": "YWQs4q_memberName",
			"memberRole": "YWQs4q_memberRole",
			"memberRow": "YWQs4q_memberRow",
			"memberState": "YWQs4q_memberState",
			"memberStatusLine": "YWQs4q_memberStatusLine",
			"members": "YWQs4q_members",
			"membersToggle": "YWQs4q_membersToggle",
			"panel": "YWQs4q_panel",
			"panelControls": "YWQs4q_panelControls",
			"panelDot": "YWQs4q_panelDot",
			"panelHead": "YWQs4q_panelHead",
			"panelTitle": "YWQs4q_panelTitle",
			"plan-feedback-in": "YWQs4q_plan-feedback-in",
			"planActions": "YWQs4q_planActions",
			"planApproveActions": "YWQs4q_planApproveActions",
			"planApproveCopy": "YWQs4q_planApproveCopy",
			"planApproveRow": "YWQs4q_planApproveRow",
			"planCard": "YWQs4q_planCard",
			"planCardBody": "YWQs4q_planCardBody",
			"planCardHeader": "YWQs4q_planCardHeader",
			"planCardIdentity": "YWQs4q_planCardIdentity",
			"planCardMeta": "YWQs4q_planCardMeta",
			"planChevron": "YWQs4q_planChevron",
			"planConfirm": "YWQs4q_planConfirm",
			"planDirty": "YWQs4q_planDirty",
			"planEditor": "YWQs4q_planEditor",
			"planEmpty": "YWQs4q_planEmpty",
			"planFeedback": "YWQs4q_planFeedback",
			"planFlow": "YWQs4q_planFlow",
			"planGrid": "YWQs4q_planGrid",
			"planHeader": "YWQs4q_planHeader",
			"planList": "YWQs4q_planList",
			"planModelEffortRow": "YWQs4q_planModelEffortRow",
			"planModelHint": "YWQs4q_planModelHint",
			"planModelMenu": "YWQs4q_planModelMenu",
			"planModelMenuBack": "YWQs4q_planModelMenuBack",
			"planModelMenuRow": "YWQs4q_planModelMenuRow",
			"planModelNotice": "YWQs4q_planModelNotice",
			"planModelPicker": "YWQs4q_planModelPicker",
			"planModelTrigger": "YWQs4q_planModelTrigger",
			"planModelTriggerCopy": "YWQs4q_planModelTriggerCopy",
			"planNewTask": "YWQs4q_planNewTask",
			"planReviewActions": "YWQs4q_planReviewActions",
			"planSecondaryActions": "YWQs4q_planSecondaryActions",
			"planSection": "YWQs4q_planSection",
			"planSectionToggle": "YWQs4q_planSectionToggle",
			"planTaskId": "YWQs4q_planTaskId",
			"planTaskSummary": "YWQs4q_planTaskSummary",
			"progressEmpty": "YWQs4q_progressEmpty",
			"progressLegend": "YWQs4q_progressLegend",
			"progressOverview": "YWQs4q_progressOverview",
			"progressSegments": "YWQs4q_progressSegments",
			"progressSummary": "YWQs4q_progressSummary",
			"progressSummaryDot": "YWQs4q_progressSummaryDot",
			"progressTitle": "YWQs4q_progressTitle",
			"quickMember": "YWQs4q_quickMember",
			"quickTranscript": "YWQs4q_quickTranscript",
			"resizeHandle": "YWQs4q_resizeHandle",
			"reviewKind": "YWQs4q_reviewKind",
			"reviewNote": "YWQs4q_reviewNote",
			"ringTrack": "YWQs4q_ringTrack",
			"ringValue": "YWQs4q_ringValue",
			"sectionHead": "YWQs4q_sectionHead",
			"sectionHint": "YWQs4q_sectionHint",
			"sectionTitle": "YWQs4q_sectionTitle",
			"sectionToggleTitle": "YWQs4q_sectionToggleTitle",
			"stageLabel": "YWQs4q_stageLabel",
			"stateArt": "YWQs4q_stateArt",
			"statusCount": "YWQs4q_statusCount",
			"statusLabel": "YWQs4q_statusLabel",
			"statusPercent": "YWQs4q_statusPercent",
			"statusRing": "YWQs4q_statusRing",
			"stopModalActions": "YWQs4q_stopModalActions",
			"stopModalError": "YWQs4q_stopModalError",
			"summaryEmpty": "YWQs4q_summaryEmpty",
			"taskControlHint": "YWQs4q_taskControlHint",
			"taskDetail": "YWQs4q_taskDetail",
			"taskDetailBadge": "YWQs4q_taskDetailBadge",
			"taskDetailControls": "YWQs4q_taskDetailControls",
			"taskDetailDescription": "YWQs4q_taskDetailDescription",
			"taskDetailHead": "YWQs4q_taskDetailHead",
			"taskDetailId": "YWQs4q_taskDetailId",
			"taskDetailLine": "YWQs4q_taskDetailLine",
			"taskDetailMeta": "YWQs4q_taskDetailMeta",
			"taskDetailModel": "YWQs4q_taskDetailModel",
			"taskDetailMore": "YWQs4q_taskDetailMore",
			"taskDetailSubject": "YWQs4q_taskDetailSubject",
			"taskEmpty": "YWQs4q_taskEmpty",
			"taskId": "YWQs4q_taskId",
			"taskPlayback": "YWQs4q_taskPlayback",
			"taskPlaybackIcon": "YWQs4q_taskPlaybackIcon",
			"taskPlaybackPulse": "YWQs4q_taskPlaybackPulse",
			"team": "YWQs4q_team",
			"teamHead": "YWQs4q_teamHead",
			"teamName": "YWQs4q_teamName",
			"teamStats": "YWQs4q_teamStats",
			"teamStopButton": "YWQs4q_teamStopButton",
			"teams": "YWQs4q_teams",
			"unreadPill": "YWQs4q_unreadPill",
			"workGlyph": "YWQs4q_workGlyph",
			"workflowLaunchers": "YWQs4q_workflowLaunchers",
			"workspaceSummary": "YWQs4q_workspaceSummary"
		};
		//#endregion
		//#region lib/client/StagingPlanEditor.js
		/**
		* Editable pre-run roster and DAG review for staged AgentTeams plans.
		*
		* This leaf owns only transient form/disclosure state. Durable truth remains
		* on the host and returns through the ordinary activity polling snapshot.
		* @module dsh-agent-teams/client/staging-plan
		*/
		const PLAN_URL = "/plugins/dsh-agent-teams/plan";
		function useDismissSuccess(feedback, setFeedback) {
			(0, react.useEffect)(() => {
				if (feedback?.tone !== "success") return;
				const timeout = window.setTimeout(() => {
					setFeedback(void 0);
				}, 3500);
				return () => {
					window.clearTimeout(timeout);
				};
			}, [feedback, setFeedback]);
		}
		async function mutatePlan(payload) {
			const response = await fetch(PLAN_URL, {
				method: "POST",
				cache: "no-store",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(payload)
			});
			if (response.ok) return;
			let message = `HTTP ${response.status}`;
			try {
				const body = await response.json();
				if (typeof body.error === "string" && body.error.trim() !== "") message = body.error;
			} catch {}
			throw new Error(message);
		}
		function errorMessage(error) {
			return error instanceof Error ? error.message : String(error);
		}
		function DisclosureChevron({ open }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: ActivityPanel_module_css_default.planChevron,
				"data-open": open,
				width: "12",
				height: "12",
				viewBox: "0 0 12 12",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				"aria-hidden": true,
				children: (0, react_jsx_runtime.jsx)("path", { d: "M4 2.5 7.5 6 4 9.5" })
			});
		}
		function Feedback({ value }) {
			if (value === void 0) return null;
			return (0, react_jsx_runtime.jsxs)("span", {
				className: ActivityPanel_module_css_default.planFeedback,
				"data-tone": value.tone,
				role: value.tone === "error" ? "alert" : "status",
				"aria-live": value.tone === "error" ? "assertive" : "polite",
				children: [(0, react_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: value.tone === "success" ? (0, react_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 12 12",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.8",
						children: (0, react_jsx_runtime.jsx)("path", { d: "m2.5 6.2 2.2 2.2 4.8-5" })
					}) : (0, react_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 12 12",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.8",
						children: (0, react_jsx_runtime.jsx)("path", { d: "M6 2.3v4.1M6 8.8v.1" })
					})
				}), value.message]
			});
		}
		function routeKey(provider, model) {
			return JSON.stringify([provider, model]);
		}
		const MODEL_MENU_OPEN_MODELS = "open:models";
		const MODEL_MENU_OPEN_EFFORT = "open:effort";
		const MODEL_MENU_BACK = "navigate:back";
		const MODEL_MENU_RETRY = "action:retry";
		const MODEL_MENU_DEFAULT_EFFORT = "effort:default";
		function modelMenuId(provider, model) {
			return `model:${routeKey(provider, model)}`;
		}
		function effortMenuId(effort) {
			return `effort:${effort}`;
		}
		/**
		* Thin staged-plan adapter over the official model directory. It deliberately
		* reads only catalog metadata: choosing a member route must not change the
		* captain session's composer model.
		*/
		function StagedModelPicker({ directory, provider, model, reasoningEffort, busy, onChange, t }) {
			const state = (0, react.useSyncExternalStore)(directory.store.subscribe, directory.store.getSnapshot);
			const [open, setOpen] = (0, react.useState)(false);
			const [pane, setPane] = (0, react.useState)("root");
			const catalogRoutes = state.groups.flatMap((group) => group.models.map((candidate) => ({
				key: routeKey(group.id, candidate.id),
				provider: group.id,
				providerName: group.name,
				model: candidate
			})));
			const selectedKey = routeKey(provider, model);
			const selected = catalogRoutes.find((candidate) => candidate.key === selectedKey);
			const efforts = selected?.model.reasoning?.efforts ?? [];
			const currentMissing = provider !== "" && model !== "" && selected === void 0;
			const defaultEffort = selected?.model.reasoning?.defaultEffort;
			const effectiveEffort = reasoningEffort === "" || reasoningEffort === "default" ? defaultEffort : reasoningEffort;
			const selectedEffort = efforts.find((effort) => effort.id === effectiveEffort);
			const modelLabel = selected?.model.name ?? (model === "" ? t("plan.model.choose") : model);
			const effortLabel = selectedEffort?.name ?? (effectiveEffort === void 0 ? t("plan.model.providerDefault") : effectiveEffort);
			const unavailable = state.status === "error" || state.failures.length > 0;
			const close = () => {
				setOpen(false);
				setPane("root");
			};
			const rootItems = [{
				id: MODEL_MENU_OPEN_MODELS,
				label: (0, react_jsx_runtime.jsxs)("span", {
					className: ActivityPanel_module_css_default.planModelMenuRow,
					children: [
						(0, react_jsx_runtime.jsx)("span", { children: t("plan.member.model") }),
						(0, react_jsx_runtime.jsx)("strong", { children: modelLabel }),
						(0, react_jsx_runtime.jsx)(DisclosureChevron, { open: false })
					]
				}),
				disabled: state.status === "loading" && catalogRoutes.length === 0
			}, {
				id: MODEL_MENU_OPEN_EFFORT,
				label: (0, react_jsx_runtime.jsxs)("span", {
					className: ActivityPanel_module_css_default.planModelMenuRow,
					children: [
						(0, react_jsx_runtime.jsx)("span", { children: t("plan.member.reasoning") }),
						(0, react_jsx_runtime.jsx)("strong", { children: effortLabel }),
						(0, react_jsx_runtime.jsx)(DisclosureChevron, { open: false })
					]
				}),
				disabled: selected?.model.reasoning === void 0
			}];
			const modelItems = [{
				id: MODEL_MENU_BACK,
				label: (0, react_jsx_runtime.jsxs)("span", {
					className: ActivityPanel_module_css_default.planModelMenuBack,
					children: [(0, react_jsx_runtime.jsx)(DisclosureChevron, { open: false }), t("plan.model.back")]
				})
			}, {
				type: "separator",
				id: "models:separator"
			}];
			if (catalogRoutes.length === 0) modelItems.push({
				id: "models:empty",
				label: state.status === "loading" ? t("plan.model.loading") : t("plan.model.empty"),
				disabled: true
			});
			else for (const group of state.groups) {
				modelItems.push({
					type: "label",
					id: `provider:${group.id}`,
					text: group.name
				});
				for (const candidate of group.models) modelItems.push({
					id: modelMenuId(group.id, candidate.id),
					label: candidate.name
				});
			}
			const effortItems = [
				{
					id: MODEL_MENU_BACK,
					label: (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.planModelMenuBack,
						children: [(0, react_jsx_runtime.jsx)(DisclosureChevron, { open: false }), t("plan.model.back")]
					})
				},
				{
					type: "separator",
					id: "effort:separator"
				},
				{
					id: MODEL_MENU_DEFAULT_EFFORT,
					label: defaultEffort === void 0 ? t("plan.model.providerDefault") : t("plan.model.modelDefault", { effort: efforts.find((effort) => effort.id === defaultEffort)?.name ?? defaultEffort })
				},
				...efforts.map((effort) => ({
					id: effortMenuId(effort.id),
					label: (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.planModelEffortRow,
						children: [(0, react_jsx_runtime.jsx)("span", { children: effort.name }), effort.description !== void 0 && (0, react_jsx_runtime.jsx)("small", { children: effort.description })]
					})
				}))
			];
			const items = pane === "models" ? modelItems : pane === "effort" ? effortItems : rootItems;
			const selectedId = pane === "models" ? modelMenuId(provider, model) : pane === "effort" ? reasoningEffort === "" || reasoningEffort === "default" ? MODEL_MENU_DEFAULT_EFFORT : effortMenuId(reasoningEffort) : void 0;
			const choose = (id) => {
				if (id === MODEL_MENU_OPEN_MODELS) {
					setPane("models");
					return;
				}
				if (id === MODEL_MENU_OPEN_EFFORT) {
					setPane("effort");
					return;
				}
				if (id === MODEL_MENU_BACK) {
					setPane("root");
					return;
				}
				if (id === MODEL_MENU_RETRY) {
					directory.load().catch(() => void 0);
					return;
				}
				const nextModel = catalogRoutes.find((candidate) => modelMenuId(candidate.provider, candidate.model.id) === id);
				if (nextModel !== void 0) {
					close();
					if (nextModel.provider === provider && nextModel.model.id === model) return;
					onChange({
						provider: nextModel.provider,
						model: nextModel.model.id,
						reasoningEffort: "default"
					});
					return;
				}
				if (id === MODEL_MENU_DEFAULT_EFFORT) {
					close();
					if (effectiveEffort === defaultEffort) return;
					onChange({
						provider,
						model,
						reasoningEffort: "default"
					});
					return;
				}
				const nextEffort = efforts.find((effort) => effortMenuId(effort.id) === id);
				if (nextEffort === void 0) return;
				close();
				if (nextEffort.id === reasoningEffort) return;
				onChange({
					provider,
					model,
					reasoningEffort: nextEffort.id
				});
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: ActivityPanel_module_css_default.planModelPicker,
				"data-model-directory-status": state.status,
				children: [
					(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
						open,
						portal: true,
						align: "end",
						compact: true,
						className: ActivityPanel_module_css_default.planModelMenu,
						items,
						footer: unavailable ? [{
							id: MODEL_MENU_RETRY,
							label: t("plan.model.retry")
						}] : void 0,
						selectedId,
						onSelect: choose,
						onClose: close,
						anchor: (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ActivityPanel_module_css_default.planModelTrigger,
							"data-plan-model-trigger": true,
							"aria-label": t("plan.model.triggerAria", {
								model: modelLabel,
								effort: effortLabel
							}),
							"aria-haspopup": "menu",
							"aria-expanded": open,
							disabled: busy,
							onClick: () => {
								if (open) close();
								else {
									setPane("root");
									setOpen(true);
									directory.load().catch(() => void 0);
								}
							},
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.planModelTriggerCopy,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: state.status === "loading" && catalogRoutes.length === 0 ? t("plan.model.loading") : modelLabel }), (0, react_jsx_runtime.jsx)("span", { children: effortLabel })]
							}), (0, react_jsx_runtime.jsx)(DisclosureChevron, { open })]
						})
					}),
					(0, react_jsx_runtime.jsx)("small", {
						className: ActivityPanel_module_css_default.planModelHint,
						children: currentMissing ? t("plan.model.currentUnavailable", {
							provider,
							model
						}) : selected?.model.description ?? t("plan.model.route", {
							provider,
							model
						})
					}),
					unavailable && (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.planModelNotice,
						role: state.status === "error" ? "alert" : "status",
						children: [(0, react_jsx_runtime.jsx)("span", { children: state.error ?? t("plan.model.partialFailure", { count: state.failures.length }) }), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy || state.status === "loading",
							onClick: () => {
								directory.load().catch(() => void 0);
							},
							children: t("plan.model.retry")
						})]
					})
				]
			});
		}
		function StagedMemberEditor({ team, member, modelDirectory, onPendingChange, t }) {
			const bodyId = (0, react.useId)();
			const [open, setOpen] = (0, react.useState)(false);
			const [role, setRole] = (0, react.useState)(member.role);
			const [provider, setProvider] = (0, react.useState)(member.provider ?? "");
			const [model, setModel] = (0, react.useState)(member.model ?? "");
			const [reasoningEffort, setReasoningEffort] = (0, react.useState)(member.reasoningEffort ?? "");
			const [executionPrompt, setExecutionPrompt] = (0, react.useState)(member.executionPrompt ?? "");
			const remoteSignature = JSON.stringify([
				member.role,
				member.provider ?? "",
				member.model ?? "",
				member.reasoningEffort ?? "",
				member.executionPrompt ?? ""
			]);
			const [savedSignature, setSavedSignature] = (0, react.useState)(remoteSignature);
			const [busy, setBusy] = (0, react.useState)(false);
			const [feedback, setFeedback] = (0, react.useState)();
			useDismissSuccess(feedback, setFeedback);
			const dirty = JSON.stringify([
				role,
				provider,
				model,
				reasoningEffort,
				executionPrompt
			]) !== savedSignature;
			(0, react.useEffect)(() => {
				onPendingChange(`member:${member.name}`, dirty || busy);
				return () => {
					onPendingChange(`member:${member.name}`, false);
				};
			}, [
				busy,
				dirty,
				member.name,
				onPendingChange
			]);
			(0, react.useEffect)(() => {
				setRole(member.role);
				setProvider(member.provider ?? "");
				setModel(member.model ?? "");
				setReasoningEffort(member.reasoningEffort ?? "");
				setExecutionPrompt(member.executionPrompt ?? "");
				setSavedSignature(remoteSignature);
			}, [
				member.role,
				member.provider,
				member.model,
				member.reasoningEffort,
				member.executionPrompt,
				remoteSignature
			]);
			const markEdited = () => {
				setFeedback(void 0);
			};
			const persist = async (selection = {
				provider,
				model,
				reasoningEffort
			}) => {
				const nextSignature = JSON.stringify([
					role,
					selection.provider,
					selection.model,
					selection.reasoningEffort,
					executionPrompt
				]);
				setProvider(selection.provider);
				setModel(selection.model);
				setReasoningEffort(selection.reasoningEffort);
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "update_member",
						memberName: member.name,
						role,
						provider: selection.provider,
						model: selection.model,
						reasoningEffort: selection.reasoningEffort,
						executionPrompt
					});
					setSavedSignature(nextSignature);
					setFeedback({
						tone: "success",
						message: t("plan.saved")
					});
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
				} finally {
					setBusy(false);
				}
			};
			const save = async (event) => {
				event.preventDefault();
				await persist();
			};
			const route = `${provider}/${model}`.replace(/^\//u, "");
			return (0, react_jsx_runtime.jsxs)("article", {
				className: ActivityPanel_module_css_default.planCard,
				"data-plan-member": member.name,
				"data-open": open,
				children: [(0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: ActivityPanel_module_css_default.planCardHeader,
					"aria-expanded": open,
					"aria-controls": bodyId,
					onClick: () => {
						setOpen((current) => !current);
					},
					children: [
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.planCardIdentity,
							children: [(0, react_jsx_runtime.jsx)("strong", { children: member.name }), (0, react_jsx_runtime.jsx)("span", { children: role || t("plan.member.roleFallback") })]
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.planCardMeta,
							title: route,
							children: route
						}),
						dirty && (0, react_jsx_runtime.jsx)("em", {
							className: ActivityPanel_module_css_default.planDirty,
							children: t("plan.unsaved")
						}),
						(0, react_jsx_runtime.jsx)(DisclosureChevron, { open })
					]
				}), open && (0, react_jsx_runtime.jsxs)("form", {
					id: bodyId,
					className: ActivityPanel_module_css_default.planCardBody,
					onSubmit: (event) => {
						save(event);
					},
					children: [(0, react_jsx_runtime.jsxs)("fieldset", {
						disabled: busy,
						children: [
							(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.member.role"), (0, react_jsx_runtime.jsx)("input", {
								name: "role",
								value: role,
								onChange: (event) => {
									setRole(event.currentTarget.value);
									markEdited();
								}
							})] }),
							(0, react_jsx_runtime.jsx)(StagedModelPicker, {
								directory: modelDirectory,
								provider,
								model,
								reasoningEffort,
								busy,
								onChange: (selection) => {
									persist(selection);
								},
								t
							}),
							(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.member.prompt"), (0, react_jsx_runtime.jsx)("textarea", {
								name: "executionPrompt",
								value: executionPrompt,
								onChange: (event) => {
									setExecutionPrompt(event.currentTarget.value);
									markEdited();
								},
								rows: 3
							})] })
						]
					}), (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.planActions,
						children: [(0, react_jsx_runtime.jsx)(Feedback, { value: feedback }), (0, react_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy || !dirty || provider.trim() === "" || model.trim() === "",
							children: busy ? t("plan.saving") : t("plan.save")
						})]
					})]
				})]
			});
		}
		function StagedTaskEditor({ team, task, onPendingChange, t }) {
			const bodyId = (0, react.useId)();
			const taskDependencies = task.dependencies.join(", ");
			const [open, setOpen] = (0, react.useState)(false);
			const [subject, setSubject] = (0, react.useState)(task.subject);
			const [description, setDescription] = (0, react.useState)(task.description ?? "");
			const [assignee, setAssignee] = (0, react.useState)(task.assignee);
			const [dependencies, setDependencies] = (0, react.useState)(taskDependencies);
			const remoteSignature = JSON.stringify([
				task.subject,
				task.description ?? "",
				task.assignee,
				taskDependencies
			]);
			const [savedSignature, setSavedSignature] = (0, react.useState)(remoteSignature);
			const [busy, setBusy] = (0, react.useState)(false);
			const [confirmingRemove, setConfirmingRemove] = (0, react.useState)(false);
			const [feedback, setFeedback] = (0, react.useState)();
			useDismissSuccess(feedback, setFeedback);
			const signature = JSON.stringify([
				subject,
				description,
				assignee,
				dependencies
			]);
			const dirty = signature !== savedSignature;
			(0, react.useEffect)(() => {
				onPendingChange(`task:${task.id}`, dirty || busy);
				return () => {
					onPendingChange(`task:${task.id}`, false);
				};
			}, [
				busy,
				dirty,
				onPendingChange,
				task.id
			]);
			(0, react.useEffect)(() => {
				setSubject(task.subject);
				setDescription(task.description ?? "");
				setAssignee(task.assignee);
				setDependencies(taskDependencies);
				setSavedSignature(remoteSignature);
			}, [
				task.subject,
				task.description,
				task.assignee,
				taskDependencies,
				remoteSignature
			]);
			const markEdited = () => {
				setFeedback(void 0);
				setConfirmingRemove(false);
			};
			const save = async (event) => {
				event.preventDefault();
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "update_task",
						taskId: task.id,
						subject,
						description,
						assignee,
						dependencies: dependencies.split(",").map((item) => item.trim()).filter(Boolean)
					});
					setSavedSignature(signature);
					setFeedback({
						tone: "success",
						message: t("plan.saved")
					});
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
				} finally {
					setBusy(false);
				}
			};
			const remove = async () => {
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "remove_task",
						taskId: task.id
					});
					setFeedback({
						tone: "success",
						message: t("plan.removed")
					});
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
					setBusy(false);
				}
			};
			const dependencySummary = task.dependencies.length === 0 ? t("plan.dependencies.none") : t("plan.dependencies.count", { count: task.dependencies.length });
			return (0, react_jsx_runtime.jsxs)("article", {
				className: ActivityPanel_module_css_default.planCard,
				"data-plan-task": task.id,
				"data-open": open,
				children: [(0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: ActivityPanel_module_css_default.planCardHeader,
					"aria-expanded": open,
					"aria-controls": bodyId,
					onClick: () => {
						setOpen((current) => !current);
					},
					children: [
						(0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.planTaskId,
							children: task.id
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.planTaskSummary,
							title: subject,
							children: subject
						}),
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.planCardMeta,
							children: [
								assignee || t("plan.task.unassigned"),
								" · ",
								dependencySummary
							]
						}),
						dirty && (0, react_jsx_runtime.jsx)("em", {
							className: ActivityPanel_module_css_default.planDirty,
							children: t("plan.unsaved")
						}),
						(0, react_jsx_runtime.jsx)(DisclosureChevron, { open })
					]
				}), open && (0, react_jsx_runtime.jsxs)("form", {
					id: bodyId,
					className: ActivityPanel_module_css_default.planCardBody,
					onSubmit: (event) => {
						save(event);
					},
					children: [
						(0, react_jsx_runtime.jsxs)("fieldset", {
							disabled: busy,
							children: [
								(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.task.subject"), (0, react_jsx_runtime.jsx)("input", {
									name: "subject",
									required: true,
									value: subject,
									onChange: (event) => {
										setSubject(event.currentTarget.value);
										markEdited();
									}
								})] }),
								(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.task.description"), (0, react_jsx_runtime.jsx)("textarea", {
									name: "description",
									value: description,
									onChange: (event) => {
										setDescription(event.currentTarget.value);
										markEdited();
									},
									rows: 3
								})] }),
								(0, react_jsx_runtime.jsxs)("span", {
									className: ActivityPanel_module_css_default.planGrid,
									children: [(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.task.assignee"), (0, react_jsx_runtime.jsxs)("select", {
										name: "assignee",
										value: assignee,
										onChange: (event) => {
											setAssignee(event.currentTarget.value);
											markEdited();
										},
										children: [(0, react_jsx_runtime.jsx)("option", {
											value: "",
											children: t("plan.task.unassigned")
										}), team.members.map((member) => (0, react_jsx_runtime.jsx)("option", {
											value: member.name,
											children: member.name
										}, member.name))]
									})] }), (0, react_jsx_runtime.jsxs)("label", { children: [
										t("plan.task.dependencies"),
										(0, react_jsx_runtime.jsx)("input", {
											name: "dependencies",
											value: dependencies,
											onChange: (event) => {
												setDependencies(event.currentTarget.value);
												markEdited();
											}
										}),
										(0, react_jsx_runtime.jsx)("small", { children: t("plan.task.dependenciesHint") })
									] })]
								})
							]
						}),
						confirmingRemove && (0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.planConfirm,
							role: "alert",
							children: [
								(0, react_jsx_runtime.jsx)("span", { children: t("plan.removeWarning", { task: task.id }) }),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setConfirmingRemove(false);
									},
									children: t("plan.cancel")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-danger": true,
									"data-confirming": true,
									onClick: () => {
										remove();
									},
									children: t("plan.removeConfirm")
								})
							]
						}),
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.planActions,
							children: [
								(0, react_jsx_runtime.jsx)(Feedback, { value: feedback }),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-danger": true,
									onClick: () => {
										setConfirmingRemove(true);
										setFeedback(void 0);
									},
									disabled: busy || confirmingRemove,
									children: t("plan.remove")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: busy || !dirty || subject.trim() === "",
									children: busy ? t("plan.saving") : t("plan.save")
								})
							]
						})
					]
				})]
			});
		}
		function StagingPlanEditor({ team, modelDirectory, onContinuePlanning, onDiscarded, t }) {
			const membersId = (0, react.useId)();
			const tasksId = (0, react.useId)();
			const [membersOpen, setMembersOpen] = (0, react.useState)(true);
			const [tasksOpen, setTasksOpen] = (0, react.useState)(true);
			const [newTask, setNewTask] = (0, react.useState)("");
			const [busy, setBusy] = (0, react.useState)(false);
			const [discardArmed, setDiscardArmed] = (0, react.useState)(false);
			const [pendingEditors, setPendingEditors] = (0, react.useState)(/* @__PURE__ */ new Set());
			const [feedback, setFeedback] = (0, react.useState)();
			useDismissSuccess(feedback, setFeedback);
			const dependencyLinks = team.tasks.reduce((total, task) => total + task.dependencies.length, 0);
			const runnable = team.members.length > 0 && team.tasks.length > 0 && !team.tasks.some((task) => task.workflowConfigPending);
			const hasPendingEdits = pendingEditors.size > 0 || newTask.trim() !== "";
			const waitingForFeedback = team.planReviewState === "awaiting_feedback";
			(0, react.useEffect)(() => {
				modelDirectory.load().catch(() => void 0);
			}, [modelDirectory]);
			const onPendingChange = (0, react.useCallback)((key, pending) => {
				setPendingEditors((current) => {
					if (pending === current.has(key)) return current;
					const next = new Set(current);
					if (pending) next.add(key);
					else next.delete(key);
					return next;
				});
			}, []);
			const addTask = async (event) => {
				event.preventDefault();
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "add_task",
						subject: newTask,
						dependencies: []
					});
					setNewTask("");
					setFeedback({
						tone: "success",
						message: t("plan.taskAdded")
					});
					setTasksOpen(true);
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
				} finally {
					setBusy(false);
				}
			};
			const approve = async () => {
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "approve"
					});
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
					setBusy(false);
				}
			};
			const continueInChat = async () => {
				if (waitingForFeedback) {
					onContinuePlanning();
					return;
				}
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "continue"
					});
					onContinuePlanning();
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
					setBusy(false);
				}
			};
			const discard = async () => {
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "discard"
					});
					onDiscarded();
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
					setBusy(false);
					setDiscardArmed(false);
				}
			};
			return (0, react_jsx_runtime.jsxs)("section", {
				className: ActivityPanel_module_css_default.planEditor,
				"data-staging-editor": true,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: ActivityPanel_module_css_default.planHeader,
						children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("plan.title") }), (0, react_jsx_runtime.jsx)("small", { children: t("plan.readySummary", {
							members: team.members.length,
							tasks: team.tasks.length,
							links: dependencyLinks
						}) })] }), (0, react_jsx_runtime.jsx)("em", { children: t("plan.badge") })] }), (0, react_jsx_runtime.jsx)("p", { children: t("plan.description") })]
					}),
					(0, react_jsx_runtime.jsxs)("ol", {
						className: ActivityPanel_module_css_default.planFlow,
						"aria-label": t("plan.flow.aria"),
						children: [
							(0, react_jsx_runtime.jsxs)("li", {
								"data-active": true,
								children: [(0, react_jsx_runtime.jsx)("span", { children: "1" }), t("plan.flow.review")]
							}),
							(0, react_jsx_runtime.jsxs)("li", { children: [(0, react_jsx_runtime.jsx)("span", { children: "2" }), t("plan.flow.spawn")] }),
							(0, react_jsx_runtime.jsxs)("li", { children: [(0, react_jsx_runtime.jsx)("span", { children: "3" }), t("plan.flow.run")] })
						]
					}),
					(0, react_jsx_runtime.jsxs)("section", {
						className: ActivityPanel_module_css_default.planSection,
						children: [(0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ActivityPanel_module_css_default.planSectionToggle,
							"aria-expanded": membersOpen,
							"aria-controls": membersId,
							onClick: () => {
								setMembersOpen((current) => !current);
							},
							children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("plan.members.title") }), (0, react_jsx_runtime.jsx)("small", { children: t("plan.members.count", { count: team.members.length }) })] }), (0, react_jsx_runtime.jsx)(DisclosureChevron, { open: membersOpen })]
						}), membersOpen && (0, react_jsx_runtime.jsx)("div", {
							id: membersId,
							className: ActivityPanel_module_css_default.planList,
							children: team.members.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
								className: ActivityPanel_module_css_default.planEmpty,
								children: t("plan.members.empty")
							}) : team.members.map((member) => (0, react_jsx_runtime.jsx)(StagedMemberEditor, {
								team,
								member,
								modelDirectory,
								onPendingChange,
								t
							}, member.name))
						})]
					}),
					(0, react_jsx_runtime.jsxs)("section", {
						className: ActivityPanel_module_css_default.planSection,
						children: [(0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ActivityPanel_module_css_default.planSectionToggle,
							"aria-expanded": tasksOpen,
							"aria-controls": tasksId,
							onClick: () => {
								setTasksOpen((current) => !current);
							},
							children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("plan.tasks.title") }), (0, react_jsx_runtime.jsx)("small", { children: t("plan.tasks.count", {
								count: team.tasks.length,
								links: dependencyLinks
							}) })] }), (0, react_jsx_runtime.jsx)(DisclosureChevron, { open: tasksOpen })]
						}), tasksOpen && (0, react_jsx_runtime.jsx)("div", {
							id: tasksId,
							className: ActivityPanel_module_css_default.planList,
							children: team.tasks.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
								className: ActivityPanel_module_css_default.planEmpty,
								children: t("plan.tasks.empty")
							}) : team.tasks.map((task) => (0, react_jsx_runtime.jsx)(StagedTaskEditor, {
								team,
								task,
								onPendingChange,
								t
							}, task.id))
						})]
					}),
					(0, react_jsx_runtime.jsxs)("form", {
						className: ActivityPanel_module_css_default.planNewTask,
						onSubmit: (event) => {
							addTask(event);
						},
						children: [(0, react_jsx_runtime.jsxs)("label", { children: [(0, react_jsx_runtime.jsx)("span", { children: t("plan.newTaskLabel") }), (0, react_jsx_runtime.jsx)("input", {
							name: "newTask",
							value: newTask,
							onChange: (event) => {
								setNewTask(event.currentTarget.value);
								setFeedback(void 0);
							},
							placeholder: t("plan.newTask"),
							disabled: busy
						})] }), (0, react_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy || newTask.trim() === "",
							children: busy ? t("plan.adding") : t("plan.addTask")
						})]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: ActivityPanel_module_css_default.planApproveRow,
						"data-armed": discardArmed || void 0,
						"data-discard": discardArmed || void 0,
						"data-review-state": waitingForFeedback ? "awaiting-feedback" : "awaiting-review",
						children: [
							(0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.planApproveCopy,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: discardArmed ? t("plan.discardConfirmTitle") : waitingForFeedback ? t("plan.feedbackTitle") : t("plan.approveTitle") }), (0, react_jsx_runtime.jsx)("small", { children: discardArmed ? t("plan.discardWarning") : waitingForFeedback ? t("plan.feedbackHint") : hasPendingEdits ? t("plan.pendingEdits") : t("plan.approveHint", {
									members: team.members.length,
									tasks: team.tasks.length
								}) })]
							}),
							(0, react_jsx_runtime.jsx)(Feedback, { value: feedback }),
							discardArmed ? (0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.planApproveActions,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: busy,
									onClick: () => {
										setDiscardArmed(false);
									},
									children: t("plan.cancel")
								}), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-plan-discard": true,
									"data-danger": true,
									"data-confirming": true,
									disabled: busy,
									onClick: () => {
										discard();
									},
									children: busy ? t("plan.discarding") : t("plan.discardConfirm")
								})]
							}) : (0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.planReviewActions,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-plan-approve": true,
									disabled: busy || !runnable || hasPendingEdits,
									onClick: () => {
										approve();
									},
									children: t("plan.approve")
								}), (0, react_jsx_runtime.jsxs)("span", {
									className: ActivityPanel_module_css_default.planSecondaryActions,
									children: [(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"data-plan-continue": true,
										disabled: busy,
										onClick: () => {
											continueInChat();
										},
										children: t(waitingForFeedback ? "plan.returnToChat" : "plan.continue")
									}), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"data-plan-discard": true,
										"data-danger": true,
										disabled: busy,
										onClick: () => {
											setDiscardArmed(true);
											setFeedback(void 0);
										},
										children: t("plan.discard")
									})]
								})]
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region lib/client/BrandIcon.js
		/** Small-size vector realization of the approved purple monoline image concepts. */
		function BrandIcon({ name = "teamflow", size = 24 }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				width: size,
				height: size,
				viewBox: "0 0 32 32",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				style: {
					color: "var(--teamflow-brand, #a333f5)",
					flexShrink: 0
				},
				children: name === "teamflow" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					(0, react_jsx_runtime.jsx)("path", { d: "M5.2 19.2A11.3 11.3 0 0 1 19.3 5.2M26.8 12.8A11.3 11.3 0 0 1 12.7 26.8" }),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "16",
						cy: "16",
						r: "3.4"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "24.6",
						cy: "7.4",
						r: "2.7"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "7.4",
						cy: "24.6",
						r: "2.7"
					})
				] }) : name === "gallery" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					(0, react_jsx_runtime.jsx)("rect", {
						x: "5",
						y: "5",
						width: "9",
						height: "9",
						rx: "2.5"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "22.5",
						cy: "9.5",
						r: "4.5"
					}),
					(0, react_jsx_runtime.jsx)("rect", {
						x: "5",
						y: "18",
						width: "9",
						height: "9",
						rx: "2.5"
					}),
					(0, react_jsx_runtime.jsx)("rect", {
						x: "18",
						y: "18",
						width: "9",
						height: "9",
						rx: "2.5"
					})
				] }) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "M20 5H10a3 3 0 0 0-3 3v19l9-5 9 5V13" }), (0, react_jsx_runtime.jsx)("circle", {
					cx: "25",
					cy: "6",
					r: "3"
				})] })
			});
		}
		//#endregion
		//#region lib/client/EmbeddedDiscussion.js
		/** A compact view over the same isolated native discussion session. */
		const discussionCache = createWorkflowCache(4, 2 * 1024 * 1024);
		function EmbeddedDiscussion({ sessionId, teamId, discussion }) {
			useWorkflowText();
			return (0, react_jsx_runtime.jsx)(Discussion, {
				sessionId,
				teamId,
				discussion
			}, JSON.stringify([
				sessionId,
				teamId,
				discussion
			]));
		}
		function Discussion({ sessionId, teamId, discussion }) {
			const l = useWorkflowText();
			const storageKey = `teamflow:discussion-draft:v1:${JSON.stringify([
				sessionId,
				teamId,
				discussion
			])}`;
			const [storageError, setStorageError] = (0, react.useState)("");
			const [chat, setChat] = (0, react.useState)(() => discussionCache.get(storageKey) ?? {
				messages: [],
				busy: false
			});
			const chatRef = (0, react.useRef)(chat);
			const [loading, setLoading] = (0, react.useState)(true);
			const [text, setText] = (0, react.useState)(() => {
				try {
					return sessionStorage.getItem(storageKey) ?? "";
				} catch {
					return "";
				}
			});
			const textRef = (0, react.useRef)(text), liveRef = (0, react.useRef)(true);
			(0, react.useEffect)(() => {
				liveRef.current = true;
				return () => {
					liveRef.current = false;
				};
			}, []);
			function changeText(value) {
				textRef.current = value;
				setText(value);
				try {
					if (value) sessionStorage.setItem(storageKey, value);
					else sessionStorage.removeItem(storageKey);
					setStorageError("");
				} catch {
					setStorageError(l("草稿备份失败，离开页面前请保留文本。"));
				}
			}
			(0, react.useEffect)(() => {
				if (!text || !storageError) return;
				const warn = (event) => {
					event.preventDefault();
					event.returnValue = "";
				};
				window.addEventListener("beforeunload", warn);
				return () => window.removeEventListener("beforeunload", warn);
			}, [text, storageError]);
			const [sending, setSending] = (0, react.useState)(false);
			const sendingRef = (0, react.useRef)(false), composingRef = (0, react.useRef)(false);
			const [error, setError] = (0, react.useState)("");
			const transcript = (0, react.useRef)(null);
			const followBottom = (0, react.useRef)(true), pollEpoch = (0, react.useRef)(0);
			const [unread, setUnread] = (0, react.useState)(false);
			function latest() {
				followBottom.current = true;
				setUnread(false);
				if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
			}
			const tail = chat.messages.at(-1);
			(0, react.useLayoutEffect)(() => {
				if (followBottom.current) latest();
				else if (tail) setUnread(true);
			}, [
				tail?.id,
				tail?.text,
				chat.busy,
				sending,
				loading
			]);
			async function request(action, message, signal) {
				const previous = chatRef.current;
				const value = await workflowRequest({
					sessionId,
					teamId,
					discussion,
					action,
					message,
					...action === "conversation_state" ? {
						conditionalState: true,
						knownRevision: previous.revision
					} : {}
				}, fetch, action === "conversation_state" ? 12e3 : 45e3, signal);
				return value.notModified ? previous : value;
			}
			(0, react.useEffect)(() => {
				const abort = new AbortController();
				let timer;
				async function refresh() {
					if (document.hidden) {
						timer = setTimeout(() => void refresh(), 1500);
						return;
					}
					const epoch = pollEpoch.current;
					let delay = 1500;
					try {
						const value = await request("conversation_state", void 0, abort.signal);
						if (!abort.signal.aborted && epoch === pollEpoch.current) {
							if (chatRef.current !== value) discussionCache.set(storageKey, value);
							chatRef.current = value;
							setChat((previous) => previous.revision && previous.revision === value.revision ? previous : value);
							setError("");
							setLoading(false);
						}
						if (value.busy) delay = 250;
					} catch (err) {
						if (!abort.signal.aborted && epoch === pollEpoch.current) {
							setError(err instanceof Error ? err.message : String(err));
							setLoading(false);
						}
					} finally {
						if (!abort.signal.aborted) timer = setTimeout(() => void refresh(), delay);
					}
				}
				refresh();
				return () => {
					abort.abort();
					clearTimeout(timer);
				};
			}, [
				sessionId,
				teamId,
				discussion
			]);
			async function send() {
				const submitted = textRef.current, message = submitted.trim();
				if (!message || loading || sendingRef.current || chat.busy) return;
				sendingRef.current = true;
				pollEpoch.current++;
				latest();
				setSending(true);
				setError("");
				try {
					const result = await request("conversation_send", message);
					if (liveRef.current) {
						pollEpoch.current++;
						chatRef.current = result;
						discussionCache.set(storageKey, result);
						setChat(result);
						changeText(remainingMessage(textRef.current, submitted));
					} else try {
						if (sessionStorage.getItem(storageKey) === submitted) sessionStorage.removeItem(storageKey);
					} catch {}
				} catch (err) {
					if (liveRef.current) setError(err instanceof Error ? err.message : String(err));
				} finally {
					sendingRef.current = false;
					if (liveRef.current) setSending(false);
				}
			}
			const generating = !error && (sending || chat.busy);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: WorkflowWorkbench_module_css_default.embeddedChat,
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						ref: transcript,
						tabIndex: 0,
						className: WorkflowWorkbench_module_css_default.embeddedTranscript,
						"aria-busy": generating,
						onScroll: () => {
							const el = transcript.current;
							if (el) {
								followBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
								if (followBottom.current) setUnread(false);
							}
						},
						"aria-label": l("独立讨论记录"),
						children: [
							chat.messages.map((message) => (0, react_jsx_runtime.jsxs)("div", {
								"data-streaming": !!message.streaming && generating,
								className: message.role === "user" ? WorkflowWorkbench_module_css_default.userMessage : WorkflowWorkbench_module_css_default.assistantMessage,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: message.role === "user" ? l("你") : "AI" }), (0, react_jsx_runtime.jsxs)("p", { children: [message.text, message.streaming && generating && (0, react_jsx_runtime.jsx)("span", {
									className: WorkflowWorkbench_module_css_default.streamCaret,
									"aria-hidden": "true"
								})] })]
							}, message.id)),
							loading && (0, react_jsx_runtime.jsx)("p", {
								role: "status",
								children: l("正在读取讨论记录…")
							}),
							error && (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: WorkflowWorkbench_module_css_default.error,
								children: workflowMessage(error, l)
							})
						]
					}),
					(generating || unread) && (0, react_jsx_runtime.jsxs)("div", {
						className: WorkflowWorkbench_module_css_default.discussionStatus,
						children: [generating && (0, react_jsx_runtime.jsxs)("div", {
							className: WorkflowWorkbench_module_css_default.discussionGenerating,
							role: "status",
							children: [(0, react_jsx_runtime.jsx)("span", {
								className: WorkflowWorkbench_module_css_default.discussionLogo,
								"aria-hidden": "true",
								children: (0, react_jsx_runtime.jsx)(BrandIcon, { size: 26 })
							}), (0, react_jsx_runtime.jsx)("span", { children: tail?.streaming ? l("正在回复…") : l("AI 正在思考…") })]
						}), unread && (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: WorkflowWorkbench_module_css_default.latestReply,
							onClick: latest,
							children: [l("查看最新回复"), " ↓"]
						})]
					}),
					(0, react_jsx_runtime.jsxs)("form", {
						className: WorkflowWorkbench_module_css_default.embeddedComposer,
						onSubmit: (event) => {
							event.preventDefault();
							send();
						},
						children: [
							(0, react_jsx_runtime.jsxs)("label", { children: [l("继续讨论"), (0, react_jsx_runtime.jsx)("textarea", {
								value: text,
								onChange: (event) => changeText(event.target.value),
								onCompositionStart: () => {
									composingRef.current = true;
								},
								onCompositionEnd: () => {
									composingRef.current = false;
								},
								onKeyDown: (event) => {
									if (event.key !== "Enter" || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey || composingRef.current || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
									event.preventDefault();
									if (!event.repeat) send();
								},
								placeholder: discussion.startsWith("task:") ? l("例如：帮我细化这个任务的要求，或分析失败原因…") : discussion.startsWith("member:") ? l("例如：让这个 Agent 更专注于需求分析…") : l("输入你想讨论的问题…")
							})] }),
							(0, react_jsx_runtime.jsx)("small", {
								role: storageError ? "alert" : void 0,
								children: workflowMessage(storageError, l) || [l("Enter 发送 · Shift+Enter 换行"), text ? l("草稿保存在此标签页，切换讨论或刷新可恢复。") : ""].filter(Boolean).join(" · ")
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: !text.trim() || loading || chat.busy || sending,
								children: sending ? l("发送中…") : l("发送")
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region lib/client/proposal-review.js
		const memberFields = [
			"summary",
			"role",
			"executionPrompt",
			"specificPrompt",
			"provider",
			"model",
			"reasoningEffort",
			"gallerySkill",
			"galleryMcp"
		];
		const taskFields = [
			"subject",
			"description",
			"assignee",
			"dependencies"
		];
		const labels = {
			name: "成员名称",
			id: "任务 ID",
			summary: "Summary · 功能概述",
			role: "长期职责",
			executionPrompt: "执行指令 / PE",
			provider: "模型提供方",
			model: "模型",
			reasoningEffort: "Thinking",
			gallerySkill: "允许使用 Gallery Skill",
			galleryMcp: "允许使用 Gallery MCP",
			subject: "任务名称",
			description: "任务要求 / 验收要求",
			assignee: "负责人",
			dependencies: "上游任务 ID",
			taskIds: "返工任务 ID",
			instructions: "本次要求"
		};
		const show = (value) => Array.isArray(value) ? value.join("\n") : typeof value === "string" || typeof value === "boolean" ? String(value) : "";
		function reviewFields(team, operation, l = sourceText) {
			const op = operation;
			const isMember = operation.action.endsWith("member");
			const removed = operation.action.startsWith("remove_");
			const added = operation.action.startsWith("add_");
			const original = isMember ? team.members.find((item) => item.name === op["name"]) : team.tasks.find((item) => item.id === op["id"]);
			const before = added ? {} : original ?? {};
			const fields = (operation.action === "rerun_task" ? [...taskFields.filter((key) => key !== "dependencies" && op[key] !== void 0), "instructions"] : operation.action === "rework" ? ["taskIds", "instructions"] : isMember ? [...added ? ["name"] : [], ...memberFields] : [...added && op["id"] ? ["id"] : [], ...taskFields]).filter((key) => !(key === "assignee" && operation.action === "add_task" && operation.checkpoint) && (key !== "gallerySkill" && key !== "galleryMcp" || op[key] !== void 0 || before[key] !== void 0)).map((key) => ({
				key,
				label: l(labels[key] ?? key),
				before: show(before[key]),
				after: removed ? "" : show(op[key] === void 0 && !added ? before[key] : op[key]),
				array: ["dependencies", "taskIds"].includes(key),
				editable: !removed && key !== "id" && key !== "gallerySkill" && key !== "galleryMcp"
			}));
			const name = String(isMember ? op["name"] : op["subject"] ?? before["subject"] ?? op["id"]);
			if ([
				"add_task",
				"update_task",
				"rerun_task"
			].includes(operation.action) && (op["adaptationIssue"] !== void 0 || show(before["adaptationIssue"]))) fields.push({
				key: "adaptationIssue",
				label: l("需要确认的问题（处理后清空）"),
				before: show(before["adaptationIssue"]),
				after: show(op["adaptationIssue"] ?? before["adaptationIssue"]),
				array: false,
				editable: true
			});
			return {
				title: `${added ? l("新增") : removed ? l("删除") : operation.action === "rerun_task" ? l("仅重跑") : operation.action === "rework" ? l("返工") : l("修改")}${isMember ? l("成员") : operation.action === "add_task" && op["checkpoint"] ? l("人工检查") : l("任务")} · ${name}`,
				fields: fields.map((f) => f.key === "specificPrompt" ? {
					...f,
					label: l("本次补充指令")
				} : f)
			};
		}
		function setReviewField(operation, field, value) {
			return {
				...operation,
				[field.key]: field.array ? [...new Set(value.split(/[\n,，]+/u).map((item) => item.trim()).filter(Boolean))] : value
			};
		}
		function reviewedOperations(team, operations, included) {
			return operations.flatMap((operation, index) => {
				if (!included[index]) return [];
				if (!operation.action.startsWith("update_")) return [operation];
				if (operation.action === "update_task" && operation.confirmConfiguration !== void 0) return [operation];
				const result = operation.action === "update_member" ? {
					action: operation.action,
					name: operation.name
				} : {
					action: operation.action,
					id: operation.id
				};
				for (const field of reviewFields(team, operation).fields) if (field.before !== field.after) result[field.key] = operation[field.key];
				return Object.keys(result).length > 2 ? [result] : [];
			});
		}
		function lineDiff(before, after) {
			if (before === after) return before.split("\n").map((text) => ({
				kind: "same",
				text
			}));
			const a = before ? before.split("\n") : [], b = after ? after.split("\n") : [];
			if (a.length * b.length > 16e4) return [...a.map((text) => ({
				kind: "removed",
				text
			})), ...b.map((text) => ({
				kind: "added",
				text
			}))];
			const table = Array.from({ length: a.length + 1 }, () => new Uint32Array(b.length + 1));
			for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) table[i][j] = a[i] === b[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
			const result = [];
			let i = 0, j = 0;
			while (i < a.length || j < b.length) if (i < a.length && j < b.length && a[i] === b[j]) {
				result.push({
					kind: "same",
					text: a[i++]
				});
				j++;
			} else if (i < a.length && (j === b.length || table[i + 1][j] >= table[i][j + 1])) result.push({
				kind: "removed",
				text: a[i++]
			});
			else result.push({
				kind: "added",
				text: b[j++]
			});
			return result;
		}
		/** Find unresolved issues in submission order without clearing or confirming them implicitly. */
		function proposalIssues(team, operations, included) {
			const issues = new Map(team.tasks.map((task) => [task.id, task.adaptationIssue ?? ""]));
			return operations.flatMap((op, index) => {
				if (!included[index] || ![
					"add_task",
					"update_task",
					"rerun_task"
				].includes(op.action)) return [];
				if (op.action !== "add_task" && op.action !== "update_task" && op.action !== "rerun_task") return [];
				const issue = op.adaptationIssue ?? (op.id ? issues.get(op.id) : "") ?? "";
				if (op.id) issues.set(op.id, issue);
				return issue.trim() ? [{
					index,
					issue,
					blocksApply: op.action === "rerun_task" || op.action === "update_task" && !!op.confirmConfiguration
				}] : [];
			});
		}
		/** Template approval must carry inherited issues because its server normalization defaults missing values to empty. */
		function adaptationReviewOperations(team, operations) {
			return operations.map((op) => op.action === "update_task" ? {
				...op,
				adaptationIssue: op.adaptationIssue ?? team.tasks.find((task) => task.id === op.id)?.adaptationIssue ?? ""
			} : op);
		}
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/ProposalReview.module.css.mjs
		const css$10 = ".MbssHa_review{overflow-wrap:anywhere;font-size:12px;line-height:1.65;container-type:inline-size}.MbssHa_review header p{color:var(--wb-muted);margin:6px 0 10px}.MbssHa_actions{background:var(--wb-bg);flex-wrap:wrap;gap:6px;padding:6px 0;display:flex}.MbssHa_actions button{font:inherit;color:inherit;background:var(--wb-bg);border:1px solid var(--wb-border);cursor:pointer;border-radius:6px;padding:5px 9px}.MbssHa_actions .MbssHa_apply{color:var(--wb-accent);border-color:var(--wb-accent);font-weight:600}.MbssHa_actions button:disabled{opacity:.5;cursor:not-allowed}.MbssHa_operation{border:1px solid var(--wb-border);border-radius:8px;margin:10px 0 16px;overflow:hidden}.MbssHa_include{background:var(--wb-base);align-items:flex-start;gap:6px;padding:9px;font-weight:600;display:flex}.MbssHa_include input{flex:none;margin-top:4px}.MbssHa_field{border-top:1px solid var(--wb-border);padding:9px}.MbssHa_fieldHeading{flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:5px;display:flex}.MbssHa_fieldHeading>span{color:var(--wb-muted);font-size:11px}.MbssHa_pair{gap:8px;display:grid}.MbssHa_pair>*{min-width:0}.MbssHa_caption{color:var(--wb-muted);margin:2px 0 4px;font-size:11px;display:block}.MbssHa_review pre,.MbssHa_review textarea{box-sizing:border-box;font:inherit;white-space:pre-wrap;overflow-wrap:anywhere;border:1px solid var(--wb-border);background:var(--wb-bg);width:100%;color:inherit;border-radius:6px;max-height:260px;margin:0;padding:8px;overflow:auto}.MbssHa_review textarea{resize:vertical;min-height:64px}.MbssHa_field[data-change=added] .MbssHa_pair>label textarea,.MbssHa_field[data-change=changed] .MbssHa_pair>label textarea{border-color:var(--wb-accent)}.MbssHa_review details{margin-top:6px}.MbssHa_review summary{color:var(--wb-muted);cursor:pointer;font-size:11px}.MbssHa_diff{border:1px solid var(--wb-border);border-radius:5px;max-height:260px;margin-top:4px;overflow:auto}.MbssHa_diff>div{white-space:pre-wrap;overflow-wrap:anywhere;gap:7px;padding:3px 6px;display:flex}.MbssHa_diff>div>span{flex:none;width:12px;font-family:monospace}.MbssHa_diff code{font:inherit;min-width:0}.MbssHa_diff [data-kind=same]{color:var(--wb-muted)}.MbssHa_diff [data-kind=added]{color:light-dark(#17613c,#a1e1ba);background:light-dark(#e5f5eb,#173d2a)}.MbssHa_diff [data-kind=removed]{color:light-dark(#a02e28,#f5b2ad);background:light-dark(#fff0ee,#482322)}.MbssHa_operation[data-included=false]>.MbssHa_field{opacity:.55}.MbssHa_review [role=alert]{color:var(--wb-error)}@container (width>=400px){.MbssHa_pair{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}.MbssHa_itemPicker{gap:4px;margin-block:10px;display:grid}.MbssHa_itemPicker select{width:100%;min-width:0;font:inherit}.MbssHa_operation h4{background:var(--wb-base);margin:0;padding:9px}.MbssHa_review[data-generated=true] .MbssHa_pair{grid-template-columns:minmax(0,1fr)}.MbssHa_review[data-generated=true] textarea{field-sizing:content}.MbssHa_issues{border:1px solid var(--wb-border);border-left:3px solid var(--wb-error);background:var(--wb-base);border-radius:6px;padding:10px}.MbssHa_issues p{margin:6px 0}.MbssHa_issues button{text-align:left;white-space:normal;max-width:100%;margin-top:6px;display:block}";
		const tagId$10 = "@yogurtss/dsh-teamflow/ProposalReview.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$10) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$10;
			tag.textContent = css$10;
			document.head.appendChild(tag);
		}
		var ProposalReview_module_css_default = {
			"actions": "MbssHa_actions",
			"apply": "MbssHa_apply",
			"caption": "MbssHa_caption",
			"diff": "MbssHa_diff",
			"field": "MbssHa_field",
			"fieldHeading": "MbssHa_fieldHeading",
			"include": "MbssHa_include",
			"issues": "MbssHa_issues",
			"itemPicker": "MbssHa_itemPicker",
			"operation": "MbssHa_operation",
			"pair": "MbssHa_pair",
			"review": "MbssHa_review"
		};
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/TaskRerunPicker.module.css.mjs
		const css$9 = ".T1EmXW_picker{border:1px solid var(--wb-border,#9ba3b344);border-radius:8px;min-width:0;margin-top:16px;padding:12px}.T1EmXW_picker .T1EmXW_field{flex-direction:column;align-items:stretch;gap:6px;margin:10px 0;font-size:12px;display:flex}.T1EmXW_field select,.T1EmXW_field textarea{box-sizing:border-box;width:100%;min-width:0;font:inherit;color:inherit;background:var(--wb-bg,transparent);border:1px solid var(--wb-border,#9ba3b344);border-radius:5px;padding:7px}.T1EmXW_impact{overflow-wrap:anywhere;opacity:.85;font-size:12px;line-height:1.6}.T1EmXW_impact p{margin:6px 0}";
		const tagId$9 = "@yogurtss/dsh-teamflow/TaskRerunPicker.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$9) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$9;
			tag.textContent = css$9;
			document.head.appendChild(tag);
		}
		var TaskRerunPicker_module_css_default = {
			"field": "T1EmXW_field",
			"impact": "T1EmXW_impact",
			"picker": "T1EmXW_picker"
		};
		//#endregion
		//#region lib/client/TaskRerunPicker.js
		function TaskRerunImpact({ tasks, taskId }) {
			const l = useWorkflowText();
			const impact = rerunImpact(tasks, taskId);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: TaskRerunPicker_module_css_default.impact,
				children: [
					(0, react_jsx_runtime.jsx)("p", { children: l("所选任务开启新一轮执行，原有状态和提交结果保存在历史执行记录中。旧验证证据不作为本轮证据，无关分支保持不变。") }),
					!!impact.descendants.length && (0, react_jsx_runtime.jsxs)("p", { children: [
						l("以下下游节点需使用新结果；可选任意节点点击「运行到此节点」，人工检查仍需确认："),
						impact.descendants.map((task) => task.subject).join("、"),
						l("。此前结果与验收不再用于本轮。")
					] }),
					!!impact.active.length && (0, react_jsx_runtime.jsxs)("p", {
						role: "alert",
						children: [l("请先停止受影响的运行任务："), impact.active.map((task) => task.subject).join("、")]
					})
				]
			});
		}
		function TaskRerunPicker({ tasks, member, taskId, onTask, disabled }) {
			const l = useWorkflowText();
			const candidates = rerunnableTasks(tasks, member);
			if (!candidates.length) return null;
			return (0, react_jsx_runtime.jsxs)("fieldset", {
				className: TaskRerunPicker_module_css_default.picker,
				children: [
					(0, react_jsx_runtime.jsx)("legend", { children: l("单独重跑") }),
					(0, react_jsx_runtime.jsxs)("label", {
						className: TaskRerunPicker_module_css_default.field,
						children: [l("重跑任务"), (0, react_jsx_runtime.jsx)("select", {
							value: taskId,
							disabled,
							onChange: (event) => onTask(event.target.value),
							children: candidates.map((task) => (0, react_jsx_runtime.jsxs)("option", {
								value: task.id,
								children: [
									task.subject,
									"（",
									task.id,
									"）"
								]
							}, task.id))
						})]
					}),
					(0, react_jsx_runtime.jsx)("p", { children: l("保存成员后进入任务编辑，查看上一轮结果并填写本轮要求，再确认重跑。") })
				]
			});
		}
		//#endregion
		//#region lib/client/ProposalReview.js
		/** Editable human approval, shared by the workbench and discussion sidebar. */
		function ProposalReview({ team, proposal, base, busy, onApply, onDismiss, draft, onChange, fixedStructure = false, focusRequest = 0 }) {
			const l = useWorkflowText();
			const [original] = (0, react.useState)(() => structuredClone(team));
			const root = (0, react.useRef)(null);
			const [selectedIndex, setSelectedIndex] = (0, react.useState)(() => proposalIssues(team, draft?.operations ?? proposal.operations, draft?.included ?? proposal.operations.map(() => true))[0]?.index ?? 0);
			const operations = draft?.operations ?? proposal.operations;
			const included = draft?.included ?? proposal.operations.map(() => true);
			const issues = proposalIssues(original, operations, included);
			const blockedByIssue = !fixedStructure && issues.some((issue) => issue.blocksApply);
			function jumpToItem(index, issue = false) {
				setSelectedIndex(index);
				requestAnimationFrame(() => {
					const article = root.current?.querySelector("[data-review-index=\"" + index + "\"]");
					const target = article?.querySelector(issue ? "[data-field=\"adaptationIssue\"] textarea" : "textarea, input") ?? article;
					target?.focus({ preventScroll: true });
					target?.scrollIntoView({ block: "nearest" });
				});
			}
			(0, react.useEffect)(() => {
				if (focusRequest) jumpToItem(issues[0]?.index ?? 0, !!issues.length);
			}, [focusRequest]);
			const effective = reviewedOperations(original, fixedStructure ? adaptationReviewOperations(original, operations) : operations, included);
			const stale = base !== proposal.base;
			const missingRerunInstructions = effective.some((operation) => operation.action === "rerun_task" && !operation.instructions?.trim());
			const edited = JSON.stringify(operations) !== JSON.stringify(proposal.operations) || included.some((value) => !value);
			return (0, react_jsx_runtime.jsxs)("section", {
				ref: root,
				"data-generated": fixedStructure,
				className: ProposalReview_module_css_default.review,
				"aria-label": l("审批修改对照"),
				children: [
					(0, react_jsx_runtime.jsxs)("header", { children: [(0, react_jsx_runtime.jsxs)("strong", { children: [l("待确认修改 · "), proposal.title] }), (0, react_jsx_runtime.jsx)("p", { children: fixedStructure ? l("逐项检查本次生成的任务。所有修改会在确认后一起应用。") : l("绿色 + 新增 · 红色 − 删除 · = 相同。可直接编辑「之后」，确认后生效。") })] }),
					!!issues.length && (0, react_jsx_runtime.jsxs)("div", {
						className: ProposalReview_module_css_default.issues,
						role: "status",
						children: [
							(0, react_jsx_runtime.jsx)("strong", { children: l("有 {0} 项需要确认的问题", issues.length) }),
							(0, react_jsx_runtime.jsx)("p", { children: l("请先补充任务要求，再明确标记问题已解决。仅修改任务正文不会自动清除问题。") }),
							issues.map((issue) => (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => jumpToItem(issue.index, true),
								children: l("定位问题 · {0}", reviewFields(original, operations[issue.index], l).title)
							}, issue.index)),
							!blockedByIssue && (0, react_jsx_runtime.jsx)("p", { children: l("应用后仍有问题的任务会保持待配置，不会执行。") })
						]
					}),
					missingRerunInstructions && (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						children: l("请在「本次要求」中填写重跑的新要求后再确认。")
					}),
					stale && (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						children: l("团队已变化，此提案已过期。请与 AI 重新确认，避免覆盖新结果。")
					}),
					!effective.length && (0, react_jsx_runtime.jsx)("p", {
						role: "status",
						children: l("当前没有要应用的改动，可以继续编辑或放弃修改。")
					}),
					fixedStructure && operations.length > 0 && (0, react_jsx_runtime.jsxs)("label", {
						className: ProposalReview_module_css_default.itemPicker,
						children: [(0, react_jsx_runtime.jsxs)("span", { children: [
							l("选择要检查的项目"),
							" · ",
							selectedIndex + 1,
							" / ",
							operations.length
						] }), (0, react_jsx_runtime.jsx)("select", {
							value: selectedIndex,
							onChange: (event) => jumpToItem(Number(event.target.value)),
							children: operations.map((operation, index) => (0, react_jsx_runtime.jsxs)("option", {
								value: index,
								children: [
									index + 1,
									". ",
									reviewFields(original, operation, l).title
								]
							}, index))
						})]
					}),
					operations.map((operation, index) => {
						if (fixedStructure && selectedIndex !== index) return null;
						const comparison = reviewFields(original, operation, l);
						return (0, react_jsx_runtime.jsxs)("article", {
							tabIndex: -1,
							"data-review-index": index,
							className: ProposalReview_module_css_default.operation,
							"data-included": included[index],
							children: [
								fixedStructure ? (0, react_jsx_runtime.jsx)("h4", { children: comparison.title }) : (0, react_jsx_runtime.jsxs)("label", {
									className: ProposalReview_module_css_default.include,
									children: [
										(0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: included[index],
											disabled: busy || fixedStructure,
											onChange: (event) => onChange({
												operations,
												included: included.map((value, i) => i === index ? event.target.checked : value)
											})
										}),
										l("应用此项 · "),
										comparison.title
									]
								}),
								operation.action === "rerun_task" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
									(0, react_jsx_runtime.jsx)("p", { children: l("上一轮结果（自动提供给 Agent）：") }),
									(0, react_jsx_runtime.jsx)("pre", { children: original.tasks.find((task) => task.id === operation.id)?.output || l("上一轮未提交结果") }),
									(0, react_jsx_runtime.jsx)(TaskRerunImpact, {
										tasks: original.tasks,
										taskId: operation.id
									})
								] }),
								comparison.fields.filter((field) => !fixedStructure || field.key === "description" || field.key === "adaptationIssue" || field.key === "specificPrompt").map((field) => {
									const same = field.before === field.after;
									return (0, react_jsx_runtime.jsxs)("section", {
										"data-field": field.key,
										className: ProposalReview_module_css_default.field,
										"data-change": same ? "same" : !field.before ? "added" : !field.after ? "removed" : "changed",
										children: [
											(0, react_jsx_runtime.jsxs)("div", {
												className: ProposalReview_module_css_default.fieldHeading,
												children: [(0, react_jsx_runtime.jsx)("strong", { children: field.label }), (0, react_jsx_runtime.jsx)("span", { children: same ? l("= 相同") : !field.before ? l("+ 新增") : !field.after ? l("− 删除") : l("± 修改") })]
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: ProposalReview_module_css_default.pair,
												children: [!fixedStructure && (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("span", {
													className: ProposalReview_module_css_default.caption,
													children: l("之前")
												}), (0, react_jsx_runtime.jsx)("pre", { children: field.before || l("（空）") })] }), (0, react_jsx_runtime.jsxs)("label", { children: [(0, react_jsx_runtime.jsxs)("span", {
													className: ProposalReview_module_css_default.caption,
													children: [l("之后"), field.editable ? l(" · 可编辑") : ""]
												}), field.editable ? (0, react_jsx_runtime.jsx)("textarea", {
													"aria-label": l("{0} · {1} · 之后", comparison.title, field.label),
													rows: Math.min(12, Math.max(field.key === "description" ? 7 : 2, field.after.split("\n").length)),
													value: field.after,
													disabled: busy || !included[index],
													onChange: (event) => onChange({
														included,
														operations: operations.map((op, i) => i === index ? setReviewField(op, field, event.target.value) : op)
													})
												}) : (0, react_jsx_runtime.jsx)("pre", { children: field.after || l("（空）") })] })]
											}),
											field.key === "adaptationIssue" && !!field.after.trim() && (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												disabled: busy || !included[index],
												onClick: () => onChange({
													included,
													operations: operations.map((op, i) => i === index ? setReviewField(op, field, "") : op)
												}),
												children: l("已解决，清除问题")
											}),
											!same && (0, react_jsx_runtime.jsxs)("details", {
												open: !fixedStructure,
												children: [(0, react_jsx_runtime.jsx)("summary", { children: l("逐行差异") }), (0, react_jsx_runtime.jsx)("div", {
													className: ProposalReview_module_css_default.diff,
													children: lineDiff(field.before, field.after).map((line, i) => (0, react_jsx_runtime.jsxs)("div", {
														"data-kind": line.kind,
														children: [(0, react_jsx_runtime.jsx)("span", {
															"aria-label": line.kind === "same" ? l("相同") : line.kind === "added" ? l("新增") : l("删除"),
															children: line.kind === "same" ? "=" : line.kind === "added" ? "+" : "−"
														}), (0, react_jsx_runtime.jsx)("code", { children: line.text || " " })]
													}, i))
												})]
											})
										]
									}, field.key);
								})
							]
						}, index);
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: ProposalReview_module_css_default.actions,
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ProposalReview_module_css_default.apply,
								disabled: busy || stale || missingRerunInstructions || blockedByIssue || effective.length === 0,
								onClick: () => onApply(effective),
								children: edited ? l("确认应用编辑后的内容") : l("确认应用")
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: onDismiss,
								children: l("放弃修改")
							}),
							edited && (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: () => onChange({
									operations: structuredClone(proposal.operations),
									included: proposal.operations.map(() => true)
								}),
								children: l("恢复 AI 建议")
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/TaskStateBadge.module.css.mjs
		const css$8 = ".LwwE3G_state{--task-state-color:light-dark(#52647b,#afc0d5)}.LwwE3G_state[data-lifecycle=inProgress]{--task-state-color:light-dark(#1763cb,#7db5ff)}.LwwE3G_state[data-lifecycle=claimed],.LwwE3G_state[data-lifecycle=queued]{--task-state-color:light-dark(#36549e,#a1baff)}.LwwE3G_state[data-lifecycle=waiting],.LwwE3G_state[data-lifecycle=rerunWaiting],.LwwE3G_state[data-lifecycle=reviewReady],.LwwE3G_state[data-lifecycle=stopping]{--task-state-color:light-dark(#88600a,#edc26e)}.LwwE3G_state[data-lifecycle=configurationPending],.LwwE3G_state[data-lifecycle=rerunRequired],.LwwE3G_state[data-lifecycle=reviewRequired],.LwwE3G_state[data-lifecycle=paused]{--task-state-color:light-dark(#8051aa,#d6a5fb)}.LwwE3G_state[data-lifecycle=failed],.LwwE3G_state[data-lifecycle=reviewRejected],.LwwE3G_state[data-lifecycle=blocked],.LwwE3G_state[data-lifecycle=stale]{--task-state-color:light-dark(#b23b39,#ff9f99)}.LwwE3G_state[data-lifecycle=completed],.LwwE3G_state[data-lifecycle=reviewPassed]{--task-state-color:light-dark(#197557,#7cd5ad)}.LwwE3G_node[data-lifecycle]{border-left:3px solid var(--task-state-color)}.LwwE3G_node[data-lifecycle=configurationPending],.LwwE3G_node[data-lifecycle=awaitingStart],.LwwE3G_node[data-lifecycle=staged],.LwwE3G_node[data-lifecycle=rerunRequired],.LwwE3G_node[data-lifecycle=rerunWaiting],.LwwE3G_node[data-lifecycle=reviewRequired]{border-left-style:dashed}.LwwE3G_badge{box-sizing:border-box;max-width:100%;color:var(--task-state-color);background:color-mix(in srgb, var(--task-state-color) 10%, transparent);white-space:nowrap;border-radius:4px;align-self:flex-start;align-items:center;gap:4px;padding:2px 5px;font-size:10px;line-height:14px;display:inline-flex}.LwwE3G_badge>span:last-child{text-overflow:ellipsis;overflow:hidden}.LwwE3G_symbol{text-align:center;flex:none;min-width:10px;font-weight:700}";
		const tagId$8 = "@yogurtss/dsh-teamflow/TaskStateBadge.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$8) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$8;
			tag.textContent = css$8;
			document.head.appendChild(tag);
		}
		var TaskStateBadge_module_css_default = {
			"badge": "LwwE3G_badge",
			"node": "LwwE3G_node",
			"state": "LwwE3G_state",
			"symbol": "LwwE3G_symbol"
		};
		//#endregion
		//#region lib/client/TaskStateBadge.js
		const taskStateNodeClass = `${TaskStateBadge_module_css_default.state} ${TaskStateBadge_module_css_default.node}`;
		const symbols = {
			configurationPending: "✎",
			awaitingStart: "▷",
			staged: "▷",
			waiting: "⌛",
			blocked: "!",
			queued: "⋯",
			claimed: "◷",
			inProgress: "▶",
			stopping: "◷",
			paused: "Ⅱ",
			reviewReady: "◇",
			reviewRejected: "↩",
			reviewPassed: "✓",
			rerunRequired: "↻",
			rerunWaiting: "⌛",
			reviewRequired: "◇",
			completed: "✓",
			failed: "!",
			cancelled: "×",
			stopped: "■",
			notRun: "—",
			stale: "!"
		};
		function TaskStateBadge({ control, t, className = "", detail, discarded = false, stale = false }) {
			const l = useWorkflowText(t);
			const visual = discarded ? "notRun" : stale ? "stale" : control.visual;
			const key = discarded ? "task.status.notRun" : stale ? "workspace.verdictStale" : control.label;
			const label = t ? t(key) : l(zh[key]);
			return (0, react_jsx_runtime.jsxs)("span", {
				className: `${TaskStateBadge_module_css_default.state} ${TaskStateBadge_module_css_default.badge} ${className}`,
				"data-lifecycle": visual,
				title: detail || label,
				children: [(0, react_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: TaskStateBadge_module_css_default.symbol,
					children: symbols[visual] ?? "•"
				}), (0, react_jsx_runtime.jsx)("span", { children: label })]
			});
		}
		//#endregion
		//#region lib/client/activity-monitor.js
		/** Shared, demand-driven state for the AgentTeams browser monitor. */
		const targets = /* @__PURE__ */ new Map();
		const targetListeners = /* @__PURE__ */ new Set();
		const snapshotListeners = /* @__PURE__ */ new Set();
		let targetSnapshot = [];
		let activitySnapshots = {
			teams: [],
			archivedTeams: []
		};
		function targetKey(sessionId, teamId) {
			return `${sessionId}\u0000${teamId}`;
		}
		function publishTargets() {
			targetSnapshot = [...targets.values()].filter((target) => target.active).map(({ key, sessionId, teamId }) => ({
				key,
				sessionId,
				teamId
			}));
			for (const listener of targetListeners) listener();
		}
		/** Subscribe to the active monitor-target list (React external-store shape). */
		function subscribeActivityMonitorTargets(listener) {
			targetListeners.add(listener);
			return () => {
				targetListeners.delete(listener);
			};
		}
		/** Read the stable active-target snapshot. */
		function getActivityMonitorTargetsSnapshot() {
			return targetSnapshot;
		}
		/**
		* Register one successful AgentTeams card as a monitoring demand.
		*
		* The returned cleanup is reference-counted so multiple cards and React
		* StrictMode remounts cannot stop another card's monitor.
		*/
		function monitorAgentTeam(sessionId, teamId) {
			const owner = sessionId.trim();
			const id = teamId.trim();
			if (owner === "" || id === "") return () => {};
			const key = targetKey(owner, id);
			const existing = targets.get(key);
			if (existing === void 0) {
				targets.set(key, {
					key,
					sessionId: owner,
					teamId: id,
					refs: 1,
					active: true
				});
				publishTargets();
			} else {
				existing.refs += 1;
				if (!existing.active) {
					existing.active = true;
					publishTargets();
				}
			}
			let released = false;
			return () => {
				if (released) return;
				released = true;
				const current = targets.get(key);
				if (current === void 0) return;
				current.refs -= 1;
				if (current.refs <= 0) {
					targets.delete(key);
					if (current.active) publishTargets();
				}
			};
		}
		/** Stop polling targets whose final archived snapshot has been captured. */
		function settleActivityMonitorTargets(keys) {
			let changed = false;
			for (const key of keys) {
				const target = targets.get(key);
				if (target?.active !== true) continue;
				target.active = false;
				changed = true;
			}
			if (changed) publishTargets();
		}
		/** Subscribe to the shared live/archive snapshot. */
		function subscribeActivitySnapshots(listener) {
			snapshotListeners.add(listener);
			return () => {
				snapshotListeners.delete(listener);
			};
		}
		/** Read the stable shared live/archive snapshot. */
		function getActivitySnapshotsSnapshot() {
			return activitySnapshots;
		}
		/** Publish one or both successful state-route responses. */
		function updateActivitySnapshots(update) {
			const reconcile = (incoming, previous) => {
				if (!incoming || incoming === previous) return previous;
				const byId = new Map(previous.map((team) => [targetKey(team.captainSessionId, team.teamId), team]));
				const next = incoming.map((team) => {
					const old = byId.get(targetKey(team.captainSessionId, team.teamId));
					return old && JSON.stringify(old) === JSON.stringify(team) ? old : team;
				});
				return next.length === previous.length && next.every((team, i) => team === previous[i]) ? previous : next;
			};
			const next = {
				teams: reconcile(update.teams, activitySnapshots.teams),
				archivedTeams: reconcile(update.archivedTeams, activitySnapshots.archivedTeams)
			};
			if (next.teams === activitySnapshots.teams && next.archivedTeams === activitySnapshots.archivedTeams) return;
			activitySnapshots = next;
			for (const listener of snapshotListeners) listener();
		}
		/** A confirmed workflow mutation updates the main activity view immediately. */
		function publishWorkflowActivity(team) {
			const same = (item) => item.teamId === team.teamId && item.captainSessionId === team.captainSessionId;
			const previous = activitySnapshots.teams.find(same) ?? activitySnapshots.archivedTeams.find(same);
			updateActivitySnapshots({ teams: [...activitySnapshots.teams.filter((item) => !same(item)), {
				...team,
				workspace: previous?.workspace ?? team.workspace
			}] });
		}
		/** Poll cadence for the live host snapshot route. */
		const ACTIVITY_POLL_MS = 1e3;
		/**
		* Low-frequency probe cadence while a cardless discovery session still owns
		* no team. The probe keeps the panel able to pick up a team created later in
		* that session (e.g. a run_code-wrapped agent_teams_create) without turning
		* every ordinary session into a one-second filesystem scan.
		*/
		const ACTIVITY_PROBE_MS = 5e3;
		/** Host route serving live and archived team snapshots. */
		const ACTIVITY_STATE_URL = "/plugins/dsh-agent-teams/state";
		const ACTIVITY_HALT_URL = "/plugins/dsh-agent-teams/halt";
		/**
		* Start the single polling loop for the current session's requested targets.
		*
		* With neither targets nor a discovery session this is deliberately inert.
		* Explicit card targets poll at the live cadence from the start. A discovery
		* session performs an immediate live+archive restore pass, then — while it
		* still owns no team — probes on a low-frequency cadence, so a team created
		* later in that session (e.g. a run_code-wrapped agent_teams_create) is
		* discovered without a manual reload, without turning every ordinary session
		* into a one-second filesystem scan. The moment a team for the discovery
		* session appears, the controller upgrades to the live one-second cadence for
		* the rest of its lifetime. The caller — the session view, which stops the
		* controller when the session is no longer current — bounds the lifetime, and
		* archive state is refreshed when a target or a previously discovered live
		* team disappears.
		*/
		function startActivityPolling(monitorTargets, runtime = {}) {
			const discoverySessionId = runtime.discoverySessionId?.trim();
			if (monitorTargets.length === 0 && (discoverySessionId === void 0 || discoverySessionId === "")) return {
				firstTick: Promise.resolve(),
				stop: () => {}
			};
			const fetchState = runtime.fetchState ?? ((url, init) => fetch(url, init));
			const sessions = new Set(monitorTargets.map((target) => target.sessionId));
			if (discoverySessionId) sessions.add(discoverySessionId);
			const query = new URLSearchParams();
			for (const session of sessions) query.append("sessionId", session);
			const stateUrl = `${ACTIVITY_STATE_URL}?${query}`;
			const schedule = runtime.schedule ?? ((callback, intervalMs) => setInterval(callback, intervalMs));
			const cancel = runtime.cancel ?? ((timer) => {
				clearInterval(timer);
			});
			const publishSnapshots = runtime.publishSnapshots ?? updateActivitySnapshots;
			const settleTargets = runtime.settleTargets ?? settleActivityMonitorTargets;
			let cancelled = false;
			let inFlight = false;
			let hot = monitorTargets.length > 0;
			let discoveryComplete = false;
			let discoveredLiveKeys = /* @__PURE__ */ new Set();
			let controller;
			let timer;
			const intervalMs = () => hot ? ACTIVITY_POLL_MS : ACTIVITY_PROBE_MS;
			const reschedule = () => {
				cancel(timer);
				timer = schedule(() => {
					tick();
				}, intervalMs());
			};
			const tick = async () => {
				if (inFlight || cancelled) return;
				inFlight = true;
				controller = new AbortController();
				const timeout = setTimeout(() => controller?.abort(), 12e3);
				try {
					const liveResponse = await fetchState(stateUrl, {
						cache: "no-store",
						signal: controller.signal
					});
					if (!liveResponse.ok) throw new Error("Activity unavailable");
					const body = await liveResponse.json();
					if (cancelled) return;
					if (!Array.isArray(body.teams)) throw new Error("Invalid activity response");
					runtime.onStatus?.("ready");
					const liveTeams = body.teams;
					publishSnapshots({ teams: liveTeams });
					const previousDiscoveredKeys = discoveredLiveKeys;
					discoveredLiveKeys = new Set(discoverySessionId === void 0 || discoverySessionId === "" ? [] : liveTeams.filter((team) => team.captainSessionId === discoverySessionId).map((team) => team.teamId));
					if (!hot && discoveredLiveKeys.size > 0) {
						hot = true;
						reschedule();
					}
					const discoveredTeamArchived = [...previousDiscoveredKeys].some((teamId) => !discoveredLiveKeys.has(teamId));
					const missing = monitorTargets.filter((target) => !liveTeams.some((team) => team.captainSessionId === target.sessionId && team.teamId === target.teamId));
					const needsDiscoveryArchive = discoverySessionId !== void 0 && discoverySessionId !== "" && !discoveryComplete;
					if (missing.length === 0 && !needsDiscoveryArchive && !discoveredTeamArchived) return;
					const archivedResponse = await fetchState(`${stateUrl}&archived=1`, {
						cache: "no-store",
						signal: controller.signal
					});
					if (!archivedResponse.ok) throw new Error("Archive unavailable");
					const archivedBody = await archivedResponse.json();
					if (cancelled) return;
					if (!Array.isArray(archivedBody.teams)) throw new Error("Invalid archive response");
					publishSnapshots({ archivedTeams: archivedBody.teams });
					discoveryComplete = true;
					settleTargets(new Set(missing.map((target) => target.key)));
				} catch (error) {
					if (cancelled && error?.name === "AbortError") return;
					if (!cancelled) runtime.onStatus?.("error");
				} finally {
					clearTimeout(timeout);
					inFlight = false;
				}
			};
			const firstTick = tick();
			if (timer === void 0) timer = schedule(() => {
				tick();
			}, intervalMs());
			return {
				firstTick,
				stop: () => {
					if (cancelled) return;
					cancelled = true;
					controller?.abort();
					cancel(timer);
				}
			};
		}
		//#endregion
		//#region lib/client/workflow-layout.js
		/** Fixed-height cards and generous gutters keep branches and long titles apart. */
		function arrangeTasks(tasks) {
			const depths = /* @__PURE__ */ new Map(), rows = /* @__PURE__ */ new Map();
			const byId = new Map(tasks.map((task) => [task.id, task]));
			function depth(id, seen = /* @__PURE__ */ new Set()) {
				if (depths.has(id)) return depths.get(id);
				if (seen.has(id)) return 0;
				const next = new Set(seen).add(id);
				const dependencies = byId.get(id)?.dependencies.filter((dep) => byId.has(dep)) ?? [];
				const value = dependencies.length ? 1 + Math.max(...dependencies.map((dep) => depth(dep, next))) : 0;
				depths.set(id, value);
				return value;
			}
			return Object.fromEntries(tasks.map((task) => {
				const column = depth(task.id), row = rows.get(column) ?? 0;
				rows.set(column, row + 1);
				return [task.id, {
					x: 32 + column * 300,
					y: 32 + row * 190
				}];
			}));
		}
		const clampZoom = (value) => Math.max(.1, Math.min(2, value));
		function fitGraph(width, height, graphWidth, graphHeight) {
			return clampZoom(Math.min(1, Math.max(1, width - 32) / graphWidth, Math.max(1, height - 32) / graphHeight));
		}
		//#endregion
		//#region lib/client/icons.js
		/** Plugin-owned icons avoid depending on the host's generated design-export names. */
		const stroke = {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: 1.5,
			strokeLinecap: "round",
			strokeLinejoin: "round"
		};
		function IconBranchOutline16() {
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				...stroke,
				children: [
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "4",
						cy: "3",
						r: "1.5"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "12",
						cy: "4",
						r: "1.5"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "4",
						cy: "13",
						r: "1.5"
					}),
					(0, react_jsx_runtime.jsx)("path", { d: "M4 4.5v7M4 9h3a5 5 0 0 0 5-3.5" })
				]
			});
		}
		function IconChevronDownOutline14() {
			return (0, react_jsx_runtime.jsx)("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 14 14",
				"aria-hidden": "true",
				...stroke,
				children: (0, react_jsx_runtime.jsx)("path", { d: "m3 5 4 4 4-4" })
			});
		}
		function IconPanelLeftOutline16() {
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				...stroke,
				children: [(0, react_jsx_runtime.jsx)("rect", {
					x: "2",
					y: "2.5",
					width: "12",
					height: "11",
					rx: "2"
				}), (0, react_jsx_runtime.jsx)("path", { d: "M6 2.5v11" })]
			});
		}
		function IconStopFill16() {
			return (0, react_jsx_runtime.jsx)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("rect", {
					x: "4",
					y: "4",
					width: "8",
					height: "8",
					rx: "1",
					fill: "currentColor"
				})
			});
		}
		function IconWarningOutline16() {
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				...stroke,
				children: [(0, react_jsx_runtime.jsx)("path", { d: "m7 2-5.5 10a1 1 0 0 0 1 1.5h11a1 1 0 0 0 1-1.5L9 2a1.1 1.1 0 0 0-2 0Z" }), (0, react_jsx_runtime.jsx)("path", { d: "M8 6v3m0 2v.1" })]
			});
		}
		/** Shared visual language for canvas tools, object kinds and contextual actions. */
		function WorkflowIcon({ name }) {
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				focusable: "false",
				...stroke,
				children: [
					name === "task" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("rect", {
						x: "3",
						y: "2.5",
						width: "10",
						height: "11",
						rx: "2"
					}), (0, react_jsx_runtime.jsx)("path", { d: "M6 2.5V2h4v.5M6 6h4M6 9h4M6 11h2" })] }),
					name === "agent" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						(0, react_jsx_runtime.jsx)("rect", {
							x: "2.5",
							y: "5",
							width: "11",
							height: "8",
							rx: "2.5"
						}),
						(0, react_jsx_runtime.jsx)("path", { d: "M8 2v3M1 8v2m14-2v2M6 11h4" }),
						(0, react_jsx_runtime.jsx)("circle", {
							cx: "5.5",
							cy: "8",
							r: ".5"
						}),
						(0, react_jsx_runtime.jsx)("circle", {
							cx: "10.5",
							cy: "8",
							r: ".5"
						})
					] }),
					name === "review" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "m8 1.5 5.5 2v4c0 3-3 5.2-5.5 7-2.5-1.8-5.5-4-5.5-7v-4z" }), (0, react_jsx_runtime.jsx)("path", { d: "m5.5 7.5 1.7 1.7 3.3-3.4" })] }),
					name === "properties" && (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: (0, react_jsx_runtime.jsx)("path", { d: "M2 4h4m3 0h5M2 8h8m3 0h1M2 12h1m3 0h8M6 2.5v3M10 6.5v3M3 10.5v3" }) }),
					name === "chat" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "M13.5 8.5a3 3 0 0 1-3 3H7l-4 2v-2.5a3 3 0 0 1-1.5-2.5V5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3z" }), (0, react_jsx_runtime.jsx)("path", { d: "M5 6h5M5 8.5h3" })] }),
					name === "edit" && (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: (0, react_jsx_runtime.jsx)("path", { d: "m3 10 7.5-7.5a1.4 1.4 0 0 1 2 2L5 12l-3 1zM9 4l2 2M8 13h6" }) }),
					name === "expand" && (0, react_jsx_runtime.jsx)("path", { d: "M6 2H2v4m8-4h4v4M2 10v4h4m8-4v4h-4" }),
					name === "fit" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "M5 2H2v3m9-3h3v3M2 11v3h3m9-3v3h-3" }), (0, react_jsx_runtime.jsx)("rect", {
						x: "5",
						y: "5",
						width: "6",
						height: "6",
						rx: "1"
					})] }),
					name === "arrange" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						(0, react_jsx_runtime.jsx)("rect", {
							x: "1.5",
							y: "2.5",
							width: "4",
							height: "4",
							rx: "1"
						}),
						(0, react_jsx_runtime.jsx)("rect", {
							x: "10.5",
							y: "2.5",
							width: "4",
							height: "4",
							rx: "1"
						}),
						(0, react_jsx_runtime.jsx)("rect", {
							x: "6",
							y: "10",
							width: "4",
							height: "4",
							rx: "1"
						}),
						(0, react_jsx_runtime.jsx)("path", { d: "M3.5 6.5v1.5h9V6.5M8 8v2" })
					] }),
					name === "select" && (0, react_jsx_runtime.jsx)("path", { d: "m3 1.5 10 7-5 1-2 4z" }),
					name === "pan" && (0, react_jsx_runtime.jsx)("path", { d: "M5 8V4a1 1 0 0 1 2 0v3-4a1 1 0 0 1 2 0v4-3a1 1 0 0 1 2 0v3-1a1 1 0 0 1 2 0v4c0 3-2 4-4 4H8c-2 0-3-1-4-2L2 9a1 1 0 0 1 1.5-1L5 9" })
				]
			});
		}
		//#endregion
		//#region lib/builtin-template-locales.js
		/** Only versioned built-in content is translated; personal templates and saved tasks are content. */
		const english = {
			"功能开发": "Feature development",
			"从需求确认到独立验证，适合新功能、接口和工具开发。": "From requirements review to independent verification, for features, APIs, and tools.",
			"提供目标与使用场景、代码仓库和允许修改范围、接口与兼容性约束、运行及测试方式、完成标准。": "Provide the goal and use cases, repository and allowed scope, interface and compatibility constraints, run/test commands, and completion criteria.",
			"开发": "Development",
			"需求确认": "Requirements review",
			"澄清需求、范围、约束与可检验的完成标准": "Clarify requirements, scope, constraints, and verifiable completion criteria",
			"按本次完整任务要求工作，先检查输入与范围；不臆造缺失信息。交付可追溯的文件、结果和证据，区分实际验证与推断。发现阻塞及时报告，不擅自扩大范围或替用户批准。": "Work from the complete task-specific requirements. Check inputs and scope first; do not invent missing information. Deliver traceable files, results, and evidence, distinguishing actual verification from inference. Report blockers promptly. Do not expand scope or approve on the user's behalf.",
			"依据确认的规格完成最小必要实现并提供自测证据": "Implement the smallest necessary change against the approved specification and provide self-test evidence",
			"独立验证实现与规格的一致性，复核边界与回归风险": "Independently verify implementation against the specification, including boundaries and regression risks",
			"需求分析": "Requirements analysis",
			"读取现有实现和用户目标，明确输入输出、使用场景、范围与非目标。识别兼容性约束、依赖和未决问题，将需求转化为可验证的验收条目；不自行决定关键产品行为。": "Read the existing implementation and user goal. Define inputs, outputs, use cases, scope, and non-goals. Identify compatibility constraints, dependencies, and open questions. Turn requirements into verifiable acceptance criteria; do not decide key product behavior without confirmation.",
			"需求说明、影响范围、验收清单、最小实现方案和待确认问题。": "Requirements, impact scope, acceptance checklist, minimal implementation plan, and questions requiring confirmation.",
			"每条核心需求有验收方式；范围边界清晰；关键未知项显式列出。": "Each core requirement has a verification method; scope is clear and important unknowns are explicit.",
			"确认需求与方案": "Confirm requirements and plan",
			"核对目标、范围、接口行为、兼容性风险及验收清单；明确解决关键问题后再允许实现。": "Review the goal, scope, interface behavior, compatibility risks, and acceptance checklist. Resolve key questions before allowing implementation.",
			"供用户决策的检查清单、证据链接、未决项和风险说明。": "A checklist, evidence links, open questions, and risks to support the user's decision.",
			"逐项对应检查标准；由用户明确通过或退回。证据不足时不得代替用户批准。": "Address each review criterion. The user explicitly approves or rejects; never approve on their behalf when evidence is insufficient.",
			"实现与自测": "Implement and self-test",
			"按已确认规格完成最小必要变更，遵循仓库约定；补充行为测试与必要文档。记录实际运行的检查，不把未执行的检查写成通过。": "Make the smallest necessary changes against the approved specification and repository conventions. Add behavioral tests and necessary documentation. Record checks actually run; do not describe unexecuted checks as passed.",
			"实现变更、测试与文档、需求到变更的对应说明、自测证据及限制。": "Implementation, tests and documentation, requirement-to-change mapping, self-test evidence, and limitations.",
			"实现覆盖确认范围，不引入无关变更；必要检查有结果与可复现步骤。": "Cover the approved scope without unrelated changes. Required checks have results and reproducible steps.",
			"独立验证": "Independent verification",
			"独立对照确认的规格检查实现，验证核心路径、边界、异常输入及兼容性；复跑关键检查，不直接采信实现者报告。发现问题时提供复现步骤、影响与证据。": "Independently compare implementation with the approved specification. Verify core paths, boundaries, invalid inputs, and compatibility. Rerun key checks instead of trusting the implementer's report. Report issues with reproduction steps, impact, and evidence.",
			"逐项验收结果、回归记录、问题清单、未覆盖项与残余风险。": "Acceptance results, regression records, issues, coverage gaps, and residual risks.",
			"每条验收标准有可追溯结果；失败与未验证项明确，不能冒充通过。": "Every acceptance criterion has a traceable result. Clearly identify failures and unverified items; never present them as passed.",
			"最终验收": "Final acceptance",
			"结合需求、自测与独立验证结果检查交付是否完整；有阻塞问题则退回，不自动部署、合并或发布。": "Combine requirements, self-test, and independent verification evidence to assess completeness. Reject blocking issues; do not automatically deploy, merge, or publish.",
			"问题排查与修复": "Bug investigation and repair",
			"先复现和定位根因，再最小修复并验证不再复发。": "Reproduce and identify the root cause, then make a minimal repair and check for recurrence.",
			"提供异常表现、期望行为、复现步骤、环境和版本、日志或样例、近期变更，以及允许修改范围。": "Provide observed and expected behavior, reproduction steps, environment and versions, logs or examples, recent changes, and the allowed change scope.",
			"排障": "Investigation",
			"修复": "Repair",
			"回归": "Regression",
			"复现与取证": "Reproduce and collect evidence",
			"建立最小复现，区分预期与实际行为。记录环境、输入、日志与触发条件；优先非破坏性取证。无法复现时列出缺少的证据，不把猜测写成事实。": "Build a minimal reproduction and distinguish expected from actual behavior. Record environment, inputs, logs, and triggering conditions. Prefer non-destructive evidence collection. If reproduction fails, identify missing evidence instead of presenting guesses as facts.",
			"最小复现、环境记录、异常证据、已排除条件和信息缺口。": "Minimal reproduction, environment record, failure evidence, ruled-out conditions, and information gaps.",
			"复现步骤可重做且有观察结果；未复现或环境限制明确标注。": "Reproduction steps can be repeated and have observed results. State reproduction failures and environment limitations explicitly.",
			"根因分析": "Root cause analysis",
			"沿调用链和数据流定位故障，逐项验证假设，区分根因与表面症状。评估影响范围，提出最小修复方案及防复发测试；证据不足时请求补充。": "Trace calls and data flow to locate the fault. Test hypotheses and distinguish root causes from symptoms. Assess impact and propose a minimal repair with regression tests. Request more evidence when necessary.",
			"证据支持的因果说明、影响范围、修复方案、回归测试设计。": "Evidence-backed causal explanation, impact scope, repair plan, and regression test design.",
			"根因能解释观察结果；关键假设有证据；方案不靠绕过校验或隐藏异常消除症状。": "The cause explains observations and key hypotheses have evidence. Do not hide symptoms by bypassing validation or suppressing errors.",
			"确认根因与修复范围": "Confirm cause and repair scope",
			"确认根因证据、修复范围、兼容性影响及回归方案；未定位根因时决定是否继续调查。": "Confirm root-cause evidence, repair scope, compatibility impact, and regression plan. If the cause is unknown, decide whether to continue investigating.",
			"最小修复": "Minimal repair",
			"依据确认方案修复根因，加入能覆盖原故障的回归测试，保持范围收敛。记录修改前后的行为和实际测试结果。": "Repair the root cause according to the approved plan. Add a regression test covering the original failure and keep scope narrow. Record behavior before and after the change and actual test results.",
			"修复变更、回归测试、前后行为对比、自测记录。": "Repair, regression tests, before/after behavior, and self-test records.",
			"原故障的检测方式明确；补丁能通过相应检查且不掩盖失败，变更符合确认范围。": "The original failure has a clear detection method. The patch passes relevant checks without hiding failures and stays within approved scope.",
			"独立回归验证": "Independent regression verification",
			"复跑最小复现与新增回归测试，检查相邻路径、边界和兼容性。验证缺陷不再出现，并调查新增异常；无法验证的环境单独列出。": "Rerun the minimal reproduction and new regression tests. Check adjacent paths, boundaries, and compatibility. Verify that the defect is gone and investigate new anomalies. List environments that could not be verified.",
			"独立复现与回归结果、新问题清单、覆盖范围与残余风险。": "Independent reproduction and regression results, new issues, coverage, and residual risks.",
			"原故障有修复证据；关键相邻行为未退化；未覆盖项不计作通过。": "Evidence demonstrates the original defect is fixed and important adjacent behavior has not regressed. Uncovered cases do not count as passed.",
			"修复验收": "Repair acceptance",
			"核对根因、补丁、回归证据与遗留风险；决定接受或退回，不把测试通过等同于上线授权。": "Review the cause, patch, regression evidence, and remaining risks. Decide to accept or reject; passing tests does not authorize deployment.",
			"算子开发与优化": "Operator development and optimization",
			"以规格和基线为起点，先验证正确性，再做可复现的性能评测。": "Start with specifications and a baseline. Verify correctness before reproducible performance evaluation.",
			"提供目标算子语义、参考实现、输入形状与数据类型、布局与边界约束、目标设备和环境、误差标准、基线及性能目标。": "Provide operator semantics, a reference implementation, input shapes and types, layout and boundary constraints, target hardware and environment, tolerances, baseline, and performance goals.",
			"算子": "Operators",
			"正确性": "Correctness",
			"性能": "Performance",
			"在正确性通过后进行可复现的性能评测与瓶颈分析": "Run reproducible performance measurements and bottleneck analysis after correctness passes",
			"规格与基线": "Specification and baseline",
			"明确算子语义、输入输出、形状、数据类型、布局、边界及数值要求。检查参考实现与运行环境，制定正确性用例矩阵和可比性能基线；未知阈值向用户澄清，不自行编造。": "Define semantics, inputs and outputs, shapes, types, layouts, boundaries, and numerical requirements. Inspect the reference implementation and runtime environment. Design a correctness matrix and comparable performance baseline. Ask the user about unknown thresholds instead of inventing them.",
			"算子规格、用例矩阵、误差判定方法、基线方案和环境清单。": "Operator specification, test matrix, numerical error method, baseline plan, and environment checklist.",
			"语义与边界可检验；精度及性能指标定义清楚；缺少设备或参考结果时明确阻塞。": "Semantics and boundaries are testable, and accuracy/performance metrics are clear. Identify missing hardware or reference results as blockers.",
			"确认规格与指标": "Confirm specification and metrics",
			"确认算子语义、测试覆盖、误差标准、目标平台和性能比较方法，再进入实现。": "Confirm semantics, test coverage, numerical tolerances, target platform, and performance comparison method before implementation.",
			"实现与优化": "Implement and optimize",
			"按确认规格实现算子，先保证正确性再进行有依据的优化。遵守接口、内存与并发约束，记录实现假设和优化取舍；不得牺牲规格中的精度或边界支持换取性能。": "Implement the approved specification, establishing correctness before evidence-based optimization. Respect interface, memory, and concurrency constraints. Record assumptions and tradeoffs. Do not sacrifice required accuracy or boundary support for speed.",
			"算子实现、接口说明、自测用例与记录、优化说明和已知限制。": "Operator implementation, interface documentation, self-tests and results, optimization notes, and known limitations.",
			"满足确认的接口与约束；核心路径自测有证据；优化可解释且不扩大未授权变更。": "Meet approved interfaces and constraints, with evidence for core-path self-tests. Explain optimizations and avoid unauthorized scope expansion.",
			"独立正确性验证": "Independent correctness verification",
			"对照参考实现与规格独立验证，覆盖已确认的形状、数据类型、布局、边界与异常条件。按约定误差方法评估数值结果，记录失败样例；没有完整运行证据时不得宣称正确性通过。": "Independently compare against the reference implementation and specification. Cover approved shapes, types, layouts, boundaries, and invalid inputs. Evaluate numerical error using the agreed method and retain failing examples. Do not claim correctness without complete execution evidence.",
			"用例矩阵结果、数值误差记录、失败样例与复现步骤、覆盖缺口。": "Test matrix results, numerical error records, failures with reproduction steps, and coverage gaps.",
			"确认范围内的正确性标准逐项达成；未解决失败应报告任务失败，阻止后续性能结论被当作有效交付。": "Meet correctness criteria across the approved scope. Report unresolved failures as task failures so downstream performance conclusions cannot be treated as valid delivery.",
			"性能评测": "Performance evaluation",
			"仅在正确性验证通过后，在一致环境和输入条件下比较实现与基线。明确预热、重复次数、计时与同步方法，报告波动和资源开销；识别瓶颈，不以单次最好成绩代表整体性能。": "Only after correctness passes, compare implementation and baseline with identical environment and inputs. Define warm-up, repetitions, timing, and synchronization. Report variability and resource costs. Identify bottlenecks; do not present one best run as overall performance.",
			"可复现评测命令与环境、基线对比表、重复测量统计、瓶颈分析及限制。": "Reproducible benchmark commands and environment, baseline comparison, repeated-measurement statistics, bottleneck analysis, and limitations.",
			"比较条件公平且可重做；结果覆盖确认场景；未达性能目标明确报告，不擅改阈值或隐去退化。": "Comparisons are fair and reproducible, covering approved cases. Report missed goals explicitly; do not change thresholds or hide regressions.",
			"算子交付验收": "Operator delivery acceptance",
			"联合检查规格、实现、独立正确性与性能证据；确认精度和性能目标及适用范围，决定通过或退回。": "Review specification, implementation, independent correctness, and performance evidence together. Confirm accuracy and performance goals and applicability, then approve or reject."
		};
		Object.assign(english, {
			"只读调查代码影响，独立审查实现与兼容性风险": "Investigate code impact read-only and independently review implementation and compatibility risks",
			"代码与影响调查": "Code and impact investigation",
			"只读检查现有实现、接口、依赖与仓库约定，识别兼容性风险和可复用实现。与需求分析并行，基于用户目标形成独立证据；不修改业务代码或自行扩大范围。": "Read existing code, interfaces, dependencies, and repository conventions without editing. Identify compatibility risks and reusable implementations. Investigate independently alongside requirements analysis using the user goal; do not modify production code or expand scope.",
			"代码定位、影响范围、风险与建议修改文件清单。": "Code locations, impact scope, risks, and proposed file ownership.",
			"结论有代码或文档依据；待确认项明确，未修改业务文件。": "Conclusions cite code or documentation; open questions are explicit and production files are unchanged.",
			"独立测试准备": "Independent test preparation",
			"根据已确认规格独立编写行为、边界和异常用例，与实现并行。仅修改方案分配的独立测试目录，不修改业务代码、共享配置或锁文件；接口未明确时报告阻塞。执行条件未满足时只交付测试工具与预期，不宣称验证通过。": "Prepare behavior, boundary, and invalid-input tests independently from the approved specification, alongside implementation. Edit only the dedicated test directory assigned by the plan, not production code, shared configuration, or lockfiles. Report ambiguous interfaces as blockers. If execution prerequisites are missing, deliver test tools and expectations without claiming verification passed.",
			"独立测试用例、测试数据、执行命令和预期结果。": "Independent tests, fixtures, commands, and expected results.",
			"用例对应验收条目，覆盖核心与异常路径；文件范围与实现者不重叠。": "Tests map to acceptance criteria and cover core and failure paths; file ownership does not overlap with the implementer.",
			"代码与兼容性审查": "Code and compatibility review",
			"只读审查实现变更，核对已确认规格、接口兼容性、错误处理及仓库约定。与行为验证并行，不修改被审查代码或测试文件；发现问题提供定位、影响和证据，不能把尚未完成的验证当作通过。": "Review implementation changes read-only against the approved specification, interface compatibility, error handling, and repository conventions. Work alongside behavioral verification without modifying reviewed code or tests. Report locations, impact, and evidence; do not count unfinished verification as passed.",
			"代码审查结论、兼容性风险、问题定位和证据。": "Review findings, compatibility risks, issue locations, and evidence.",
			"审查范围和未覆盖项明确；阻塞问题显式报告，不擅自修改或批准。": "State review scope and coverage gaps; explicitly report blockers without modifying code or approving on behalf of the user.",
			"汇总交付与验收材料": "Assemble delivery and acceptance evidence",
			"等待行为验证和代码审查全部结束，逐项汇总需求、实现、测试与审查证据。明确失败、未验证项及残余风险，不替代修复或用户批准；只写方案指定的交付文档，不改实现和测试。": "Wait for both behavioral verification and code review to finish. Assemble traceable evidence for requirements, implementation, tests, and review. State failures, unverified items, and residual risks without substituting for repairs or user approval. Write only the assigned delivery document, leaving implementation and tests unchanged.",
			"需求到证据的对应清单、交付说明、未决问题和验收建议。": "Requirements-to-evidence checklist, delivery notes, open issues, and acceptance recommendation.",
			"两个并行分支的结论均已纳入；失败与未验证项未被隐藏，交付可追溯。": "Include conclusions from both parallel branches; do not hide failed or unverified items, and keep delivery traceable.",
			"综合需求分析与代码影响调查，确认范围、接口和验收标准。明确实现目录、独立测试目录及交付文档归属，禁止并行节点修改相同文件；关键问题解决后再允许实现和测试准备。": "Combine requirements analysis and code impact investigation to approve scope, interfaces, and acceptance criteria. Assign separate implementation paths, test paths, and delivery documentation; parallel nodes must not edit the same files. Resolve critical questions before implementation and test preparation.",
			"按已确认规格完成最小必要实现与自测，仅修改分配的实现文件及自测文件，不改独立验证目录或其他并行节点的文件。遵循仓库约定，记录真实检查结果；接口变化或需要共享配置修改时先报告并协调。": "Implement the smallest necessary change and self-test against the approved specification. Modify only assigned implementation and self-test files, not independent verification paths or files owned by parallel nodes. Follow repository conventions and record actual checks. Report and coordinate interface changes or shared configuration edits first.",
			"并行分析需求与代码影响，实现与测试准备并行，最后独立验证和代码审查汇合验收。": "Analyze requirements and code impact in parallel, prepare tests alongside implementation, then join independent verification and code review for acceptance."
		});
		const chinese = Object.fromEntries(Object.entries(english).map(([zh, en]) => [en, zh]));
		function builtinText(text, language) {
			return (language === "en" ? english : chinese)[text] ?? text;
		}
		function localizeBuiltinTemplate(template, language) {
			if (![
				"builtin-feature",
				"builtin-bugfix",
				"builtin-operator"
			].includes(template.id) || !(template.version === 1 || template.id === "builtin-feature" && template.version === 2)) return template;
			const visit = (value) => typeof value === "string" ? builtinText(value, language) : Array.isArray(value) ? value.map(visit) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, visit(item)])) : value;
			return visit(template);
		}
		const isBuiltinTemplate = (id) => id.startsWith("builtin-");
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/TemplateGallery.module.css.mjs
		const css$7 = ".KIqJka_gallery{min-height:0;color:var(--wb-text);background:var(--wb-base);--teamflow-brand:light-dark(#9635e8,#c48bff);flex:1;padding:28px 36px 48px;overflow:auto}.KIqJka_gallery button{border:1px solid var(--wb-border);background:var(--wb-bg);color:inherit;cursor:pointer;font:inherit;border-radius:10px;justify-content:center;align-items:center;gap:8px;padding:9px 14px;display:inline-flex}.KIqJka_gallery button:disabled{opacity:.5;cursor:not-allowed}.KIqJka_gallery button:hover:not(:disabled){border-color:var(--teamflow-brand)}.KIqJka_gallery button:focus-visible,.KIqJka_gallery input:focus-visible,.KIqJka_gallery textarea:focus-visible,.KIqJka_gallery select:focus-visible{outline:2px solid var(--teamflow-brand);outline-offset:3px}.KIqJka_hero{align-items:center;gap:18px;margin:0 0 30px;display:flex}.KIqJka_hero>button{margin-left:auto}.KIqJka_hero h2{margin:3px 0 6px;font-size:28px;font-weight:650}.KIqJka_hero p{color:var(--wb-muted);margin:0}.KIqJka_hero small{letter-spacing:2px;color:var(--teamflow-brand);font-size:10px}.KIqJka_heroIcon{border:1px solid color-mix(in srgb,var(--teamflow-brand) 20%,transparent);background:color-mix(in srgb,var(--teamflow-brand) 7%,var(--wb-bg));border-radius:20px;place-items:center;width:68px;height:68px;display:grid}.KIqJka_filters{align-items:center;gap:12px;margin:18px 0 24px;display:flex}.KIqJka_filters input{flex:1;max-width:520px}.KIqJka_filters span{color:var(--wb-muted);margin-left:auto}.KIqJka_gallery input,.KIqJka_gallery textarea,.KIqJka_gallery select,.KIqJka_layers textarea{font:inherit;background:var(--wb-bg);color:inherit;border:1px solid var(--wb-border);box-sizing:border-box;border-radius:8px;min-width:0;padding:10px}.KIqJka_gallery input,.KIqJka_gallery textarea,.KIqJka_layers textarea{width:100%}.KIqJka_gallery textarea,.KIqJka_layers textarea{resize:vertical;min-height:90px;line-height:1.6}.KIqJka_gallery label,.KIqJka_layers label{flex-direction:column;gap:6px;margin:12px 0;font-size:13px;display:flex}.KIqJka_gallery label input{width:100%}.KIqJka_cards{grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:22px;display:grid}.KIqJka_card{background:var(--wb-bg);border:1px solid var(--wb-border);border-radius:18px;flex-direction:column;gap:12px;padding:18px;transition:border-color .15s,transform .15s;display:flex}.KIqJka_card:hover{border-color:color-mix(in srgb,var(--teamflow-brand) 50%,var(--wb-border));transform:translateY(-2px)}.KIqJka_gallery .KIqJka_cardPreview{text-align:left;background:0 0;border:0;width:100%;padding:0;display:block}.KIqJka_cardPreview h3{margin:16px 0 8px;font-size:17px;line-height:1.4}.KIqJka_cardPreview p{color:var(--wb-muted);-webkit-line-clamp:2;-webkit-box-orient:vertical;min-height:44px;margin:0;line-height:1.7;display:-webkit-box;overflow:hidden}.KIqJka_gallery .KIqJka_cardPreview>svg.KIqJka_flow{background:color-mix(in srgb,var(--teamflow-brand) 4%,var(--wb-base));width:100%;height:132px;color:var(--teamflow-brand);box-sizing:border-box;border-radius:12px;padding:14px}.KIqJka_flowLarge{background:var(--wb-bg);border:1px solid var(--wb-border);width:100%;height:250px;color:var(--teamflow-brand);box-sizing:border-box;border-radius:14px;margin:14px 0;padding:20px}.KIqJka_card small,.KIqJka_detail small,.KIqJka_muted{color:var(--wb-muted)}.KIqJka_card footer{justify-content:space-between;align-items:center;gap:8px;margin-top:auto;padding-top:10px;display:flex}.KIqJka_tags{flex-wrap:wrap;gap:6px;min-height:20px;display:flex}.KIqJka_tags span{background:color-mix(in srgb,var(--teamflow-brand) 7%,var(--wb-bg));color:var(--teamflow-brand);border-radius:6px;padding:2px 8px;font-size:11px}.KIqJka_gallery .KIqJka_primary{background:var(--teamflow-brand);border-color:var(--teamflow-brand);color:#fff}.KIqJka_gallery .KIqJka_primary svg{color:inherit!important}.KIqJka_empty{text-align:center;border:1px dashed var(--wb-border);border-radius:18px;flex-direction:column;align-items:center;padding:70px 20px;display:flex}.KIqJka_empty p{color:var(--wb-muted)}.KIqJka_detail{max-width:1100px;margin:auto}.KIqJka_detailHeading{justify-content:space-between;align-items:center;margin:20px 0;display:flex}.KIqJka_detailHeading h2{margin:0;font-size:24px}.KIqJka_editorGrid{grid-template-columns:minmax(0,1.3fr) minmax(280px,1fr);align-items:start;gap:28px;display:grid}.KIqJka_definition{min-width:0}.KIqJka_gallery details,.KIqJka_layers details{border-bottom:1px solid var(--wb-border);padding:10px 0}.KIqJka_gallery summary,.KIqJka_layers summary{cursor:pointer;font-weight:550}.KIqJka_gallery details p,.KIqJka_layers p{white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.7}.KIqJka_gallery details details{padding-left:14px}.KIqJka_apply,.KIqJka_guide,.KIqJka_chat{background:var(--wb-bg);border:1px solid var(--wb-border);border-radius:16px;padding:24px}.KIqJka_apply textarea{min-height:180px}.KIqJka_apply button{width:100%;margin-top:20px}.KIqJka_guide{color:var(--wb-muted);line-height:1.8;position:sticky;top:0}.KIqJka_guide h3{color:var(--wb-text)}.KIqJka_chat{max-height:75vh;position:sticky;top:0;overflow:auto}.KIqJka_actions{flex-wrap:wrap;align-items:center;gap:10px;margin:20px 0;display:flex}.KIqJka_warning{background:color-mix(in srgb,#d99824 12%,var(--wb-bg));color:var(--wb-text);white-space:pre-wrap;border-radius:8px;padding:12px}.KIqJka_layers{gap:10px;display:grid}.KIqJka_layers .KIqJka_toggle{flex-direction:row;align-items:center}.KIqJka_toggle input{width:auto}.KIqJka_layers textarea:disabled{opacity:.65}.KIqJka_layers strong{margin-top:8px}@media (width<=900px){.KIqJka_gallery{padding:20px}.KIqJka_editorGrid{grid-template-columns:1fr}.KIqJka_guide,.KIqJka_chat{position:static}.KIqJka_hero{flex-wrap:wrap}.KIqJka_hero>button{margin-left:0}.KIqJka_hero h2{font-size:23px}.KIqJka_filters{flex-wrap:wrap}.KIqJka_filters span{margin:0}.KIqJka_cards{grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}}@media (prefers-reduced-motion:reduce){.KIqJka_card{transition:none}.KIqJka_card:hover{transform:none}}.KIqJka_applyGrid{grid-template-columns:minmax(280px,.85fr) minmax(0,1.15fr);align-items:start;gap:24px;display:grid}.KIqJka_applyGrid h3,.KIqJka_applyGrid .KIqJka_flowLarge{margin-top:0}.KIqJka_applyGrid>.KIqJka_warning{margin:0}@media (width<=900px){.KIqJka_applyGrid{grid-template-columns:minmax(0,1fr)}}label.KIqJka_galleryPermission{flex-direction:row;align-items:center;gap:8px}label.KIqJka_galleryPermission input[type=checkbox]{width:auto}";
		const tagId$7 = "@yogurtss/dsh-teamflow/TemplateGallery.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$7) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$7;
			tag.textContent = css$7;
			document.head.appendChild(tag);
		}
		var TemplateGallery_module_css_default = {
			"actions": "KIqJka_actions",
			"apply": "KIqJka_apply",
			"applyGrid": "KIqJka_applyGrid",
			"card": "KIqJka_card",
			"cardPreview": "KIqJka_cardPreview",
			"cards": "KIqJka_cards",
			"chat": "KIqJka_chat",
			"definition": "KIqJka_definition",
			"detail": "KIqJka_detail",
			"detailHeading": "KIqJka_detailHeading",
			"editorGrid": "KIqJka_editorGrid",
			"empty": "KIqJka_empty",
			"filters": "KIqJka_filters",
			"flow": "KIqJka_flow",
			"flowLarge": "KIqJka_flowLarge",
			"gallery": "KIqJka_gallery",
			"galleryPermission": "KIqJka_galleryPermission",
			"guide": "KIqJka_guide",
			"hero": "KIqJka_hero",
			"heroIcon": "KIqJka_heroIcon",
			"layers": "KIqJka_layers",
			"muted": "KIqJka_muted",
			"primary": "KIqJka_primary",
			"tags": "KIqJka_tags",
			"toggle": "KIqJka_toggle",
			"warning": "KIqJka_warning"
		};
		//#endregion
		//#region lib/client/TemplateGallery.js
		const catalogCache = createWorkflowCache(4, 2 * 1024 * 1024);
		async function api(sessionId, action, fields = {}, signal) {
			return workflowRequest({
				sessionId,
				action,
				...fields
			}, fetch, void 0, signal);
		}
		function MiniFlow({ template, large = false }) {
			const l = useWorkflowText();
			const layout = arrangeTasks(template.tasks), points = template.tasks.map((t) => ({
				task: t,
				p: {
					x: (layout[t.id]?.x ?? 0) * .55,
					y: (layout[t.id]?.y ?? 0) * .55
				}
			}));
			const width = Math.max(320, ...points.map(({ p }) => p.x + 110)), height = Math.max(100, ...points.map(({ p }) => p.y + 80));
			return (0, react_jsx_runtime.jsxs)("svg", {
				className: large ? TemplateGallery_module_css_default.flowLarge : TemplateGallery_module_css_default.flow,
				viewBox: `-15 -15 ${width + 30} ${height + 30}`,
				role: "img",
				"aria-label": l("流程预览，{0} 个节点", template.tasks.length),
				children: [points.flatMap(({ task, p }) => task.dependencies.map((id) => {
					const start = points.find((item) => item.task.id === id)?.p;
					return start ? (0, react_jsx_runtime.jsx)("path", {
						d: `M${start.x + 100},${start.y + 30} C${start.x + 160},${start.y + 30} ${p.x - 50},${p.y + 30} ${p.x},${p.y + 30}`,
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "3",
						opacity: ".3"
					}, `${id}:${task.id}`) : null;
				})), points.map(({ task, p }) => (0, react_jsx_runtime.jsxs)("g", { children: [
					(0, react_jsx_runtime.jsx)("title", { children: task.subject }),
					(0, react_jsx_runtime.jsx)("rect", {
						x: p.x,
						y: p.y,
						width: "100",
						height: "60",
						rx: "14",
						fill: task.checkpoint ? "#f6c66c" : "currentColor",
						opacity: task.checkpoint ? .6 : .15
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: p.x + 17,
						cy: p.y + 30,
						r: "5",
						fill: "currentColor"
					}),
					(0, react_jsx_runtime.jsxs)("text", {
						x: p.x + 30,
						y: p.y + 34,
						fontSize: l.language === "en" ? 10 : 12,
						fill: "currentColor",
						children: [task.subject.slice(0, l.language === "en" ? 12 : 5), task.subject.length > (l.language === "en" ? 12 : 5) ? "…" : ""]
					})
				] }, task.id))]
			});
		}
		function TemplateGallery({ sessionId, team, archived = false, mode = "browse", onApply, onBack }) {
			const l = useWorkflowText();
			const [templates, setTemplates] = (0, react.useState)(() => catalogCache.get(sessionId ?? "")?.templates ?? []), [warnings, setWarnings] = (0, react.useState)([]);
			const [search, setSearch] = (0, react.useState)(""), [tag, setTag] = (0, react.useState)(""), [selection, setSelected] = (0, react.useState)();
			const [draft, setDraft] = (0, react.useState)(), [previous, setPrevious] = (0, react.useState)();
			const [busy, setBusy] = (0, react.useState)(true), [error, setError] = (0, react.useState)(""), [notice, setNotice] = (0, react.useState)(""), [goal, setGoal] = (0, react.useState)(""), [name, setName] = (0, react.useState)();
			const [extracting, setExtracting] = (0, react.useState)(false), [aiDraft, setAiDraft] = (0, react.useState)(), [deleteId, setDeleteId] = (0, react.useState)("");
			const selected = selection ? localizeBuiltinTemplate(selection, l.language) : void 0;
			const catalog = templates.map((item) => localizeBuiltinTemplate(item, l.language));
			const goalInput = (0, react.useRef)(null);
			const detailHeading = (0, react.useRef)(null);
			const focusGoal = (0, react.useRef)(false);
			const gallery = (0, react.useRef)(null);
			const cardTrigger = (0, react.useRef)("");
			(0, react.useLayoutEffect)(() => {
				if (selection) (focusGoal.current ? goalInput.current : detailHeading.current)?.focus();
				else if (!draft && cardTrigger.current) gallery.current?.querySelector(`[data-template-choice="${CSS.escape(cardTrigger.current)}"]`)?.focus();
			}, [selection, draft]);
			const alive = (0, react.useRef)(true);
			(0, react.useEffect)(() => {
				alive.current = true;
				return () => {
					alive.current = false;
				};
			}, []);
			async function refresh(signal) {
				const result = await api(sessionId, "template_list", {}, signal);
				if (alive.current && !signal?.aborted) {
					catalogCache.set(sessionId ?? "", result);
					setTemplates(result.templates);
					setWarnings(result.warnings);
					setGoal((current) => current || result.context || "");
				}
			}
			async function run(action) {
				setBusy(true);
				setError("");
				setNotice("");
				try {
					await action();
				} catch (e) {
					if (alive.current) setError(e instanceof Error ? e.message : String(e));
				} finally {
					if (alive.current) setBusy(false);
				}
			}
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				setBusy(true);
				setError("");
				(async () => {
					try {
						await refresh(controller.signal);
						if (mode === "save" && team && !controller.signal.aborted) {
							const result = await api(sessionId, "template_seed", { teamId: team.id }, controller.signal);
							if (!controller.signal.aborted) setDraft(result.definition);
						}
					} catch (e) {
						if (!controller.signal.aborted) setError(e instanceof Error ? e.message : String(e));
					} finally {
						if (!controller.signal.aborted) setBusy(false);
					}
				})();
				return () => controller.abort();
			}, [
				sessionId,
				mode,
				team?.id
			]);
			(0, react.useEffect)(() => {
				if (!extracting || !team) return;
				let live = true, inFlight = false;
				const controller = new AbortController();
				const poll = () => {
					if (inFlight || document.hidden) return;
					inFlight = true;
					api(sessionId, "state", { teamId: team.id }, controller.signal).then((result) => {
						const candidate = result.team?.workflow?.discussions?.["discussion:template"]?.templateDraft;
						if (live && candidate) if (candidate.base === result.base) setAiDraft(candidate.definition);
						else setError(l("源流程已变化，请重新讨论后生成模板草稿。"));
					}).catch((e) => {
						if (live) setError(e instanceof Error ? e.message : String(e));
					}).finally(() => {
						inFlight = false;
					});
				};
				poll();
				const timer = setInterval(poll, 2500);
				return () => {
					live = false;
					controller.abort();
					clearInterval(timer);
				};
			}, [
				extracting,
				team?.id,
				sessionId
			]);
			function choose(item, apply = false) {
				cardTrigger.current = (apply ? "use:" : "view:") + item.id;
				focusGoal.current = apply && !team;
				setSelected(item);
				setName(void 0);
				setDeleteId("");
				setError("");
			}
			const tags = [...new Set(catalog.flatMap((t) => t.tags))];
			const activeTag = tags.includes(tag) ? tag : builtinText(tag, l.language);
			const filtered = catalog.filter((t) => (!activeTag || t.tags.includes(activeTag)) && `${t.name} ${t.description} ${t.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase()));
			function briefEditor(value, change) {
				return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("label", { children: [l("通用任务要求"), (0, react_jsx_runtime.jsx)("textarea", {
					value: value.requirements,
					maxLength: 16e3,
					onChange: (e) => change({
						...value,
						requirements: e.target.value
					})
				})] }), (0, react_jsx_runtime.jsxs)("details", { children: [
					(0, react_jsx_runtime.jsx)("summary", { children: l("交付物与验收要求") }),
					(0, react_jsx_runtime.jsxs)("label", { children: [l("通用交付物"), (0, react_jsx_runtime.jsx)("textarea", {
						value: value.deliverables,
						maxLength: 16e3,
						onChange: (e) => change({
							...value,
							deliverables: e.target.value
						})
					})] }),
					(0, react_jsx_runtime.jsxs)("label", { children: [l("通用验收要求"), (0, react_jsx_runtime.jsx)("textarea", {
						value: value.acceptance,
						maxLength: 16e3,
						onChange: (e) => change({
							...value,
							acceptance: e.target.value
						})
					})] })
				] })] });
			}
			return (0, react_jsx_runtime.jsxs)("section", {
				ref: gallery,
				className: TemplateGallery_module_css_default.gallery,
				"aria-label": l("流程模板库"),
				children: [
					(!selected || draft) && (0, react_jsx_runtime.jsxs)("header", {
						className: TemplateGallery_module_css_default.hero,
						children: [
							(0, react_jsx_runtime.jsx)("div", {
								className: TemplateGallery_module_css_default.heroIcon,
								children: (0, react_jsx_runtime.jsx)(BrandIcon, {
									name: "gallery",
									size: 38
								})
							}),
							(0, react_jsx_runtime.jsxs)("div", { children: [
								(0, react_jsx_runtime.jsx)("small", { children: "MY TEAMFLOW GALLERY" }),
								(0, react_jsx_runtime.jsx)("h2", { children: draft ? l("编辑流程模板") : l("流程模板库") }),
								(0, react_jsx_runtime.jsx)("p", { children: l("留下有效的方法，让下一次协作从这里开始。") })
							] }),
							onBack && (0, react_jsx_runtime.jsx)("button", {
								onClick: onBack,
								disabled: busy,
								children: l("返回当前流程")
							})
						]
					}),
					error && (0, react_jsx_runtime.jsx)("p", {
						className: TemplateGallery_module_css_default.warning,
						role: "alert",
						children: workflowMessage(error, l)
					}),
					notice && (0, react_jsx_runtime.jsx)("p", {
						role: "status",
						children: workflowMessage(notice, l)
					}),
					warnings.map((w) => (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						children: workflowMessage(w, l)
					}, w)),
					draft ? (0, react_jsx_runtime.jsxs)("div", {
						className: TemplateGallery_module_css_default.editorGrid,
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: TemplateGallery_module_css_default.definition,
							children: [
								(0, react_jsx_runtime.jsxs)("div", {
									className: TemplateGallery_module_css_default.actions,
									children: [
										(0, react_jsx_runtime.jsx)("button", {
											onClick: () => {
												setDraft(void 0);
												setExtracting(false);
												setPrevious(void 0);
											},
											disabled: busy,
											children: l("返回模板库")
										}),
										mode === "save" && team && !archived && (0, react_jsx_runtime.jsx)("button", {
											disabled: busy,
											onClick: () => void run(async () => {
												await api(sessionId, "open_discussion", {
													teamId: team.id,
													discussion: "template"
												});
												setExtracting(true);
											}),
											children: l("AI 提炼通用流程")
										}),
										aiDraft && (0, react_jsx_runtime.jsx)("button", {
											onClick: () => {
												setDraft(structuredClone(aiDraft));
												setNotice(l("已载入 AI 草稿，请检查通用要求和成员指令。"));
											},
											children: l("载入 AI 草稿")
										})
									]
								}),
								(0, react_jsx_runtime.jsx)("p", {
									className: TemplateGallery_module_css_default.muted,
									children: l("保存成员、通用任务、连线和人工检查点。具体任务、结果、审批、模型路由和旧会话不进入模板。")
								}),
								(0, react_jsx_runtime.jsxs)("label", { children: [l("模板名称"), (0, react_jsx_runtime.jsx)("input", {
									value: draft.name,
									maxLength: 120,
									onChange: (e) => setDraft({
										...draft,
										name: e.target.value
									})
								})] }),
								(0, react_jsx_runtime.jsxs)("label", { children: [l("适用说明"), (0, react_jsx_runtime.jsx)("textarea", {
									value: draft.description,
									maxLength: 2e3,
									onChange: (e) => setDraft({
										...draft,
										description: e.target.value
									})
								})] }),
								(0, react_jsx_runtime.jsxs)("label", { children: [l("标签（逗号分隔）"), (0, react_jsx_runtime.jsx)("input", {
									defaultValue: draft.tags.join("，"),
									onBlur: (e) => setDraft({
										...draft,
										tags: e.target.value.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
									})
								}, draft.tags.join("，"))] }),
								(0, react_jsx_runtime.jsxs)("label", { children: [l("应用前需要提供的信息"), (0, react_jsx_runtime.jsx)("textarea", {
									value: draft.inputs,
									maxLength: 4e3,
									onChange: (e) => setDraft({
										...draft,
										inputs: e.target.value
									})
								})] }),
								(0, react_jsx_runtime.jsx)(MiniFlow, {
									template: draft,
									large: true
								}),
								(0, react_jsx_runtime.jsx)("h3", { children: l("成员通用职责") }),
								draft.members.map((m, i) => (0, react_jsx_runtime.jsxs)("details", { children: [
									(0, react_jsx_runtime.jsxs)("summary", { children: [
										m.name,
										" · ",
										m.summary
									] }),
									[
										"summary",
										"role",
										"executionPrompt"
									].map((key) => (0, react_jsx_runtime.jsxs)("label", { children: [key === "summary" ? l("职责概述") : key === "role" ? l("长期职责") : l("通用执行指令 / PE"), (0, react_jsx_runtime.jsx)("textarea", {
										value: m[key],
										maxLength: 16e3,
										onChange: (e) => setDraft({
											...draft,
											members: draft.members.map((member, index) => index === i ? {
												...member,
												[key]: e.target.value
											} : member)
										})
									})] }, key)),
									galleryAccessKeys.map((key) => (0, react_jsx_runtime.jsxs)("label", {
										className: TemplateGallery_module_css_default.galleryPermission,
										children: [(0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: m[key] !== false,
											disabled: busy,
											onChange: (e) => setDraft({
												...draft,
												members: draft.members.map((member, index) => index === i ? {
													...member,
													[key]: e.target.checked
												} : member)
											})
										}), key === "gallerySkill" ? l("允许使用 Gallery Skill") : l("允许使用 Gallery MCP")]
									}, key))
								] }, m.name)),
								(0, react_jsx_runtime.jsx)("h3", { children: l("节点通用任务") }),
								draft.tasks.map((t, i) => (0, react_jsx_runtime.jsxs)("details", {
									open: !t.general.requirements,
									children: [
										(0, react_jsx_runtime.jsxs)("summary", { children: [
											t.checkpoint ? l("人工检查") : l("任务"),
											" · ",
											t.subject
										] }),
										(0, react_jsx_runtime.jsxs)("label", { children: [l("通用节点名称"), (0, react_jsx_runtime.jsx)("input", {
											value: t.subject,
											maxLength: 200,
											onChange: (e) => setDraft({
												...draft,
												tasks: draft.tasks.map((task, index) => index === i ? {
													...task,
													subject: e.target.value
												} : task)
											})
										})] }),
										briefEditor(t.general, (general) => setDraft({
											...draft,
											tasks: draft.tasks.map((task, index) => index === i ? {
												...task,
												general
											} : task)
										})),
										mode === "save" && team?.tasks.find((task) => task.id === t.id)?.description && (0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsx)("summary", { children: l("原任务（仅用于对照）") }), (0, react_jsx_runtime.jsx)("p", { children: team.tasks.find((task) => task.id === t.id)?.description })] })
									]
								}, t.id)),
								(0, react_jsx_runtime.jsxs)("div", {
									className: TemplateGallery_module_css_default.actions,
									children: [mode === "save" && team?.workflow?.templateSource && !isBuiltinTemplate(team.workflow.templateSource.id) && !previous && (0, react_jsx_runtime.jsx)("button", {
										disabled: busy,
										onClick: () => setPrevious({
											id: team.workflow.templateSource.id,
											version: team.workflow.templateSource.version
										}),
										children: l("作为来源模板的新版本")
									}), (0, react_jsx_runtime.jsxs)("button", {
										className: TemplateGallery_module_css_default.primary,
										disabled: busy || !draft.name.trim() || draft.tasks.some((t) => !t.general.requirements.trim()),
										onClick: () => void run(async () => {
											const saved = await api(sessionId, "template_save", {
												definition: draft,
												...previous ? {
													templateId: previous.id,
													version: previous.version
												} : {}
											});
											setDraft(void 0);
											setExtracting(false);
											setPrevious(void 0);
											await refresh();
											setNotice(l("已保存「{0}」v{1}", saved.template.name, saved.template.version));
										}),
										children: [(0, react_jsx_runtime.jsx)(BrandIcon, { name: "save" }), busy ? l("处理中…") : previous ? l("保存为 v{0}", previous.version + 1) : l("保存新模板")]
									})]
								})
							]
						}), extracting && team && sessionId ? (0, react_jsx_runtime.jsxs)("div", {
							className: TemplateGallery_module_css_default.chat,
							children: [
								(0, react_jsx_runtime.jsx)("h3", { children: l("提炼通用流程") }),
								(0, react_jsx_runtime.jsx)("p", { children: l("AI 只提出草稿，源流程保持不变。") }),
								(0, react_jsx_runtime.jsx)(EmbeddedDiscussion, {
									sessionId,
									teamId: team.id,
									discussion: "template"
								})
							]
						}) : (0, react_jsx_runtime.jsxs)("aside", {
							className: TemplateGallery_module_css_default.guide,
							children: [
								(0, react_jsx_runtime.jsx)(BrandIcon, {
									name: "save",
									size: 44
								}),
								(0, react_jsx_runtime.jsx)("h3", { children: l("保存做事的方法") }),
								(0, react_jsx_runtime.jsx)("p", { children: l("通用要求保留方法、交付约定和质量标准。项目名称、路径、数值等具体要求留给下次适配。") }),
								(0, react_jsx_runtime.jsx)("p", { children: l("可先让 AI 提炼，再检查和修改。原流程的执行记录不会被改动。") })
							]
						})]
					}) : selected ? (0, react_jsx_runtime.jsxs)("div", {
						className: TemplateGallery_module_css_default.detail,
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								onClick: () => setSelected(void 0),
								children: l("← 所有模板")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: TemplateGallery_module_css_default.detailHeading,
								children: [(0, react_jsx_runtime.jsxs)("div", { children: [
									(0, react_jsx_runtime.jsx)("h2", {
										tabIndex: -1,
										ref: detailHeading,
										children: selected.name
									}),
									(0, react_jsx_runtime.jsx)("p", { children: selected.description || l("个人流程模板") }),
									(0, react_jsx_runtime.jsxs)("small", { children: [
										isBuiltinTemplate(selected.id) ? l("内置") : l("个人"),
										" · v",
										selected.version,
										" · ",
										selected.members.length,
										" ",
										l(" 个角色 · "),
										selected.tasks.length,
										" ",
										l(" 个节点")
									] })
								] }), (0, react_jsx_runtime.jsx)(BrandIcon, {
									name: "gallery",
									size: 42
								})]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: TemplateGallery_module_css_default.applyGrid,
								children: [team ? (0, react_jsx_runtime.jsx)("p", {
									className: TemplateGallery_module_css_default.warning,
									children: l("当前对话已有流程。请在新的对话打开 Teamflow 后应用；不会覆盖当前流程。")
								}) : (0, react_jsx_runtime.jsxs)("form", {
									className: TemplateGallery_module_css_default.apply,
									onSubmit: (e) => {
										e.preventDefault();
										run(() => onApply(selected, name ?? selected.name, goal));
									},
									children: [
										(0, react_jsx_runtime.jsx)("h3", { children: l("应用到本次任务") }),
										(0, react_jsx_runtime.jsx)("p", { children: selected.inputs || l("描述本次目标、工作范围和特殊要求。") }),
										(0, react_jsx_runtime.jsxs)("label", { children: [l("流程名称"), (0, react_jsx_runtime.jsx)("input", {
											required: true,
											maxLength: 120,
											value: name ?? selected.name,
											onChange: (e) => setName(e.target.value)
										})] }),
										(0, react_jsx_runtime.jsxs)("label", { children: [l("本次需求"), (0, react_jsx_runtime.jsx)("textarea", {
											ref: goalInput,
											required: true,
											maxLength: 12e3,
											value: goal,
											onChange: (e) => setGoal(e.target.value),
											placeholder: l("例如：实现算子 B，遵循当前项目接口，并验证正确性…")
										})] }),
										(0, react_jsx_runtime.jsx)("small", { children: l("已有对话需求会带入适配。保留全部节点和连线，由 Captain 统一生成本次任务；确认后才执行。") }),
										(0, react_jsx_runtime.jsx)("button", {
											className: TemplateGallery_module_css_default.primary,
											disabled: busy || !!team || !goal.trim(),
											children: l("使用模板并讨论本次任务")
										})
									]
								}), (0, react_jsx_runtime.jsxs)("div", { children: [
									(0, react_jsx_runtime.jsx)(MiniFlow, {
										template: selected,
										large: true
									}),
									(0, react_jsx_runtime.jsx)("h3", { children: l("流程与通用要求") }),
									selected.tasks.map((t) => (0, react_jsx_runtime.jsxs)("details", { children: [
										(0, react_jsx_runtime.jsxs)("summary", { children: [
											t.checkpoint ? l("人工检查") : l("任务"),
											" · ",
											t.subject
										] }),
										(0, react_jsx_runtime.jsx)("p", { children: briefDisplay(t.general, l) }),
										(0, react_jsx_runtime.jsxs)("small", { children: [
											l("负责人："),
											t.assignee || l("人工／自动分配"),
											" ",
											l(" · 上游："),
											t.dependencies.map((id) => selected.tasks.find((n) => n.id === id)?.subject).join("、") || l("无")
										] })
									] }, t.id)),
									(0, react_jsx_runtime.jsx)("h3", { children: l("角色分工") }),
									selected.members.map((m) => (0, react_jsx_runtime.jsxs)("details", { children: [
										(0, react_jsx_runtime.jsxs)("summary", { children: [
											m.name,
											" · ",
											m.summary
										] }),
										(0, react_jsx_runtime.jsx)("p", { children: m.role }),
										(0, react_jsx_runtime.jsx)("p", { children: m.executionPrompt })
									] }, m.name))
								] })]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: TemplateGallery_module_css_default.actions,
								children: [
									(0, react_jsx_runtime.jsx)("button", {
										onClick: () => {
											setDraft(structuredClone(selected));
											setPrevious(isBuiltinTemplate(selected.id) ? void 0 : {
												id: selected.id,
												version: selected.version
											});
											setSelected(void 0);
										},
										children: isBuiltinTemplate(selected.id) ? l("编辑并另存为个人模板") : l("编辑模板")
									}),
									(0, react_jsx_runtime.jsx)("button", {
										onClick: () => {
											setDraft({
												...structuredClone(selected),
												name: l("{0} · 副本", selected.name)
											});
											setPrevious(void 0);
											setSelected(void 0);
										},
										children: l("复制模板")
									}),
									isBuiltinTemplate(selected.id) ? (0, react_jsx_runtime.jsx)("small", { children: l("内置模板只读，修改后保存为个人模板。") }) : deleteId === selected.id ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
										(0, react_jsx_runtime.jsx)("span", { children: l("删除后已创建的流程不受影响。") }),
										(0, react_jsx_runtime.jsx)("button", {
											disabled: busy,
											onClick: () => void run(async () => {
												await api(sessionId, "template_delete", {
													templateId: selected.id,
													version: selected.version
												});
												setSelected(void 0);
												await refresh();
											}),
											children: l("确认删除")
										}),
										(0, react_jsx_runtime.jsx)("button", {
											onClick: () => setDeleteId(""),
											children: l("取消")
										})
									] }) : (0, react_jsx_runtime.jsx)("button", {
										onClick: () => setDeleteId(selected.id),
										children: l("删除模板")
									})
								]
							})
						]
					}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("div", {
						className: TemplateGallery_module_css_default.filters,
						children: [
							(0, react_jsx_runtime.jsx)("input", {
								"aria-label": l("搜索模板"),
								placeholder: l("搜索模板名称、用途或标签"),
								value: search,
								onChange: (e) => setSearch(e.target.value)
							}),
							(0, react_jsx_runtime.jsxs)("select", {
								"aria-label": l("标签筛选"),
								value: activeTag,
								onChange: (e) => setTag(e.target.value),
								children: [(0, react_jsx_runtime.jsx)("option", {
									value: "",
									children: l("所有标签")
								}), tags.map((t) => (0, react_jsx_runtime.jsx)("option", { children: t }, t))]
							}),
							(0, react_jsx_runtime.jsxs)("span", { children: [
								filtered.length,
								" ",
								l(" 个模板")
							] })
						]
					}), busy && !templates.length ? (0, react_jsx_runtime.jsx)("p", {
						role: "status",
						children: l("正在读取模板库…")
					}) : !filtered.length ? (0, react_jsx_runtime.jsxs)("div", {
						className: TemplateGallery_module_css_default.empty,
						children: [
							(0, react_jsx_runtime.jsx)(BrandIcon, {
								name: "gallery",
								size: 56
							}),
							(0, react_jsx_runtime.jsx)("h3", { children: templates.length ? l("没有匹配的模板") : l("把有效的协作流程留在这里") }),
							(0, react_jsx_runtime.jsx)("p", { children: templates.length ? l("试试其他关键词或标签。") : l("在流程画布点击「保存为模板」，提炼一次，以后直接套用。") }),
							templates.length ? (0, react_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSearch("");
									setTag("");
								},
								children: l("清除筛选")
							}) : onBack ? (0, react_jsx_runtime.jsx)("button", {
								onClick: onBack,
								children: l("返回流程")
							}) : null
						]
					}) : (0, react_jsx_runtime.jsx)("div", {
						className: TemplateGallery_module_css_default.cards,
						children: filtered.map((item) => (0, react_jsx_runtime.jsxs)("article", {
							className: TemplateGallery_module_css_default.card,
							children: [
								(0, react_jsx_runtime.jsxs)("button", {
									className: TemplateGallery_module_css_default.cardPreview,
									"data-template-choice": "view:" + item.id,
									onClick: () => choose(item),
									"aria-label": l("查看 {0}", item.name),
									children: [
										(0, react_jsx_runtime.jsx)(MiniFlow, { template: item }),
										(0, react_jsx_runtime.jsx)("h3", { children: item.name }),
										(0, react_jsx_runtime.jsx)("p", { children: item.description || l("个人流程模板") })
									]
								}),
								(0, react_jsx_runtime.jsx)("div", {
									className: TemplateGallery_module_css_default.tags,
									children: item.tags.map((t) => (0, react_jsx_runtime.jsx)("span", { children: t }, t))
								}),
								(0, react_jsx_runtime.jsxs)("small", { children: [
									item.members.length,
									" ",
									l(" 个角色 · "),
									item.tasks.length,
									" ",
									l(" 个节点 · "),
									item.tasks.filter((t) => t.checkpoint).length,
									" ",
									l(" 个人工检查点")
								] }),
								(0, react_jsx_runtime.jsxs)("footer", { children: [(0, react_jsx_runtime.jsxs)("small", { children: [
									isBuiltinTemplate(item.id) ? l("内置") : l("个人"),
									" · v",
									item.version,
									" · ",
									new Date(item.updatedAt).toLocaleDateString(l.language === "en" ? "en-US" : "zh-CN")
								] }), (0, react_jsx_runtime.jsx)("button", {
									className: TemplateGallery_module_css_default.primary,
									"data-template-choice": "use:" + item.id,
									onClick: () => choose(item, true),
									children: team ? l("查看模板") : l("使用模板")
								})] })
							]
						}, item.id))
					})] })
				]
			});
		}
		//#endregion
		//#region lib/outcomes.js
		function outcomeFiles(task) {
			return [.../* @__PURE__ */ new Set([...task.deliverables ?? [], ...task.changedPaths ?? []])].map((path) => ({
				path,
				declared: task.deliverables?.includes(path) ?? false,
				changed: task.changedPaths?.includes(path) ?? false
			}));
		}
		/** RFC-style quoted fields, including embedded delimiters/newlines; bounded display only. */
		function outcomeCsv(text, maxRows = 100, maxColumns = 50) {
			const rows = [];
			let row = [], field = "", quoted = false, truncated = false;
			const cell = () => {
				if (row.length < maxColumns) row.push(field);
				else truncated = true;
				field = "";
			};
			const finish = () => {
				cell();
				rows.push(row);
				row = [];
			};
			for (let i = 0; i < text.length; i++) {
				const c = text[i];
				if (c === "\"") if (quoted && text[i + 1] === "\"") {
					field += "\"";
					i++;
				} else if (quoted || !field) quoted = !quoted;
				else field += c;
				else if (!quoted && c === ",") cell();
				else if (!quoted && (c === "\n" || c === "\r")) {
					if (c === "\r" && text[i + 1] === "\n") i++;
					finish();
					if (rows.length >= maxRows) return {
						rows,
						truncated: truncated || i < text.length - 1
					};
				} else field += c;
			}
			if (field || row.length || text.length > 0 && !/[\r\n]$/.test(text)) finish();
			return {
				rows,
				truncated
			};
		}
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/OutcomeShowcase.module.css.mjs
		const css$6 = ".oNkxuW_showcase{min-height:0;color:var(--wb-text);background:var(--wb-bg);flex:1;overflow:auto}.oNkxuW_header,.oNkxuW_taskHeader{border-bottom:1px solid var(--wb-border);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:20px;display:flex}.oNkxuW_header h2,.oNkxuW_taskHeader h3{margin:0;font-size:18px}.oNkxuW_header p,.oNkxuW_taskHeader p,.oNkxuW_meta{color:var(--wb-muted);margin:6px 0;font-size:12px}.oNkxuW_header>span{color:var(--wb-muted);font-size:12px}.oNkxuW_layout{grid-template-columns:240px minmax(0,1fr);display:grid}.oNkxuW_tasks{border-right:1px solid var(--wb-border);padding:14px}.oNkxuW_tasks button{text-align:left;overflow-wrap:anywhere;flex-direction:column;align-items:flex-start;gap:5px;width:100%;margin-bottom:10px;display:flex}.oNkxuW_tasks small,.oNkxuW_tasks span,.oNkxuW_files small{color:var(--wb-muted);font-size:11px}.oNkxuW_showcase button[aria-pressed=true]{color:var(--wb-accent);background:color-mix(in srgb,var(--wb-accent) 9%,var(--wb-bg));border-color:var(--wb-accent)}.oNkxuW_detail{min-width:0;padding:0 20px 24px}.oNkxuW_taskHeader{padding:18px 0}.oNkxuW_tabs{flex-wrap:wrap;align-items:center;gap:10px;margin:18px 0;display:flex}.oNkxuW_tabs span{color:var(--wb-muted);font-size:12px}.oNkxuW_files{grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:10px;margin:14px 0;display:grid}.oNkxuW_files button{text-align:left;flex-direction:column;align-items:flex-start;gap:6px;min-width:0;display:flex}.oNkxuW_files strong{overflow-wrap:anywhere;font-weight:500}.oNkxuW_preview,.oNkxuW_report{border:1px solid var(--wb-border);overflow-wrap:anywhere;border-radius:10px;min-width:0;margin:14px 0;padding:18px}.oNkxuW_preview>header{justify-content:space-between;align-items:center;gap:10px;display:flex}.oNkxuW_preview>header strong{overflow-wrap:anywhere;min-width:0}.oNkxuW_preview img{object-fit:contain;max-width:100%;max-height:600px;margin:14px auto;display:block}.oNkxuW_preview pre,.oNkxuW_report pre{white-space:pre-wrap;overflow-wrap:anywhere;background:var(--wb-base);border-radius:6px;padding:12px;font-size:12px}.oNkxuW_preview code{overflow-wrap:anywhere}.oNkxuW_preview details{margin-top:14px;font-size:12px}.oNkxuW_notice{background:var(--wb-base);color:var(--wb-muted);border-radius:8px;padding:10px 12px;font-size:12px}.oNkxuW_report h4{margin:0 0 12px}.oNkxuW_report>div{border-top:1px solid var(--wb-border);padding:10px 0}.oNkxuW_report p{white-space:pre-wrap}.oNkxuW_report button{margin:4px}.oNkxuW_markdown{overflow-wrap:anywhere}.oNkxuW_markdown h3{margin:20px 0 10px;font-size:16px}.oNkxuW_markdown p{white-space:pre-wrap;margin:10px 0}.oNkxuW_markdown .oNkxuW_bullet{margin:5px 0 5px 12px}.oNkxuW_tableScroll{max-height:480px;margin-top:12px;overflow:auto}.oNkxuW_tableScroll table{border-collapse:collapse;width:100%;font-size:12px}.oNkxuW_tableScroll th,.oNkxuW_tableScroll td{border-bottom:1px solid var(--wb-border);text-align:left;white-space:pre-wrap;overflow-wrap:anywhere;min-width:80px;max-width:300px;padding:8px 10px}.oNkxuW_tableScroll th{background:var(--wb-base)}.oNkxuW_empty{color:var(--wb-muted);padding:24px}@media (width<=760px){.oNkxuW_layout{grid-template-columns:1fr}.oNkxuW_tasks{border-right:0;border-bottom:1px solid var(--wb-border);gap:8px;display:flex;overflow:auto}.oNkxuW_tasks button{flex:0 0 190px}.oNkxuW_detail{padding:0 12px 16px}.oNkxuW_header{padding:14px}.oNkxuW_preview,.oNkxuW_report{padding:12px}}";
		const tagId$6 = "@yogurtss/dsh-teamflow/OutcomeShowcase.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$6) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$6;
			tag.textContent = css$6;
			document.head.appendChild(tag);
		}
		var OutcomeShowcase_module_css_default = {
			"bullet": "oNkxuW_bullet",
			"detail": "oNkxuW_detail",
			"empty": "oNkxuW_empty",
			"files": "oNkxuW_files",
			"header": "oNkxuW_header",
			"layout": "oNkxuW_layout",
			"markdown": "oNkxuW_markdown",
			"meta": "oNkxuW_meta",
			"notice": "oNkxuW_notice",
			"preview": "oNkxuW_preview",
			"report": "oNkxuW_report",
			"showcase": "oNkxuW_showcase",
			"tableScroll": "oNkxuW_tableScroll",
			"tabs": "oNkxuW_tabs",
			"taskHeader": "oNkxuW_taskHeader",
			"tasks": "oNkxuW_tasks"
		};
		//#endregion
		//#region lib/client/OutcomeShowcase.js
		/** Small safe Markdown subset. React escapes all text; no HTML, embeds, or external resources. */
		function OutcomeMarkdown({ text }) {
			const blocks = [];
			let code, paragraph = [];
			const flush = () => {
				if (paragraph.length) {
					blocks.push((0, react_jsx_runtime.jsx)("p", { children: paragraph.join("\n") }, blocks.length));
					paragraph = [];
				}
			};
			for (const line of text.split(/\r?\n/)) {
				if (/^\s*```/.test(line)) {
					flush();
					if (code) {
						blocks.push((0, react_jsx_runtime.jsx)("pre", { children: (0, react_jsx_runtime.jsx)("code", { children: code.join("\n") }) }, blocks.length));
						code = void 0;
					} else code = [];
					continue;
				}
				if (code) {
					code.push(line);
					continue;
				}
				const heading = /^(#{1,6})\s+(.+)$/.exec(line);
				if (heading) {
					flush();
					blocks.push((0, react_jsx_runtime.jsx)("h3", { children: heading[2] }, blocks.length));
				} else if (/^\s*[-*]\s+/.test(line)) {
					flush();
					blocks.push((0, react_jsx_runtime.jsxs)("p", {
						className: OutcomeShowcase_module_css_default.bullet,
						children: ["• ", line.replace(/^\s*[-*]\s+/, "")]
					}, blocks.length));
				} else if (!line.trim()) flush();
				else paragraph.push(line);
			}
			flush();
			if (code) blocks.push((0, react_jsx_runtime.jsx)("pre", { children: (0, react_jsx_runtime.jsx)("code", { children: code.join("\n") }) }, blocks.length));
			return (0, react_jsx_runtime.jsx)("div", {
				className: OutcomeShowcase_module_css_default.markdown,
				children: blocks
			});
		}
		function OutcomeShowcase({ team, sessionId, archived, onTask }) {
			const l = useWorkflowText();
			const tasks = team.tasks.filter((t) => !t.checkpoint);
			const [taskId, setTaskId] = (0, react.useState)(tasks.find((t) => t.output || outcomeFiles(t).length)?.id ?? tasks[0]?.id ?? "");
			const task = tasks.find((t) => t.id === taskId) ?? tasks[0];
			const [file, setFile] = (0, react.useState)();
			const [refresh, setRefresh] = (0, react.useState)(0);
			const [result, setResult] = (0, react.useState)();
			const [raw, setRaw] = (0, react.useState)(false);
			const files = task ? outcomeFiles(task) : [];
			const validFile = file !== void 0 && files.some((f) => f.path === file) ? file : void 0;
			const key = JSON.stringify([
				sessionId,
				team.id,
				task?.id,
				validFile,
				archived,
				refresh
			]);
			(0, react.useEffect)(() => {
				if (!task || validFile === void 0) return;
				const controller = new AbortController();
				(async () => {
					try {
						const body = await workflowRequest({
							action: "outcome_preview",
							sessionId,
							teamId: team.id,
							taskId: task.id,
							path: validFile,
							archived
						}, fetch, 12e3, controller.signal);
						if (!body.preview) throw new Error(body.error ?? "Preview unavailable");
						if (!controller.signal.aborted) setResult({
							key,
							preview: body.preview
						});
					} catch (err) {
						if (!controller.signal.aborted) setResult({
							key,
							error: err instanceof Error ? err.message : String(err)
						});
					}
				})();
				return () => controller.abort();
			}, [key, sessionId]);
			const preview = result?.key === key ? result.preview : void 0;
			const error = result?.key === key ? result.error : void 0;
			const csv = (0, react.useMemo)(() => preview?.kind === "csv" ? outcomeCsv(preview.text ?? "") : void 0, [preview]);
			const gates = team.tasks.filter((g) => g.checkpoint && g.dependencies.includes(task?.id ?? ""));
			const statusText = (status) => l({
				ready: "文件可预览",
				missing: "文件不存在或已被移除",
				blocked: "此路径不支持预览：仅允许工作区内明确声明的普通文件。",
				unsupported: "此文件类型或编码暂不支持预览。",
				too_large: "文件超过预览上限：文本 256 KiB，图片 4 MiB。",
				unreadable: "文件无法读取或读取期间已变化，请刷新重试。"
			}[status]);
			function selectTask(id) {
				setTaskId(id);
				setFile(void 0);
				setRaw(false);
			}
			return (0, react_jsx_runtime.jsxs)("section", {
				className: OutcomeShowcase_module_css_default.showcase,
				"aria-label": l("交付内容"),
				children: [(0, react_jsx_runtime.jsxs)("header", {
					className: OutcomeShowcase_module_css_default.header,
					children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("h2", { children: l("交付内容") }), (0, react_jsx_runtime.jsx)("p", { children: l("根据任务记录整理，不调用模型。") })] }), (0, react_jsx_runtime.jsx)("span", { children: l("{0} 个任务有提交说明 · {1} 个文件条目", tasks.filter((t) => !!t.output).length, tasks.reduce((n, t) => n + outcomeFiles(t).length, 0)) })]
				}), !tasks.length ? (0, react_jsx_runtime.jsx)("p", {
					className: OutcomeShowcase_module_css_default.empty,
					children: l("暂无执行任务成果。任务提交后会在这里显示。")
				}) : (0, react_jsx_runtime.jsxs)("div", {
					className: OutcomeShowcase_module_css_default.layout,
					children: [(0, react_jsx_runtime.jsx)("nav", {
						className: OutcomeShowcase_module_css_default.tasks,
						"aria-label": l("成果来源任务"),
						children: tasks.map((t) => (0, react_jsx_runtime.jsxs)("button", {
							"aria-pressed": task?.id === t.id,
							onClick: () => selectTask(t.id),
							children: [
								(0, react_jsx_runtime.jsx)("strong", { children: t.subject }),
								(0, react_jsx_runtime.jsxs)("small", { children: [
									taskReadiness(team, t, l).label,
									" · ",
									t.assignee || l("未分配")
								] }),
								(0, react_jsx_runtime.jsxs)("span", { children: [
									t.output ? l("已提交说明") : l("暂无提交说明"),
									" · ",
									l("{0} 个文件条目", outcomeFiles(t).length)
								] })
							]
						}, t.id))
					}), task && (0, react_jsx_runtime.jsxs)("article", {
						className: OutcomeShowcase_module_css_default.detail,
						children: [
							(0, react_jsx_runtime.jsxs)("header", {
								className: OutcomeShowcase_module_css_default.taskHeader,
								children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("h3", { children: task.subject }), (0, react_jsx_runtime.jsxs)("p", { children: [
									l("来源任务"),
									" · ",
									task.id,
									" · ",
									task.assignee || l("未分配"),
									" · ",
									l("第 {0} 次执行", task.attempt ?? 0)
								] })] }), (0, react_jsx_runtime.jsx)("button", {
									onClick: () => onTask(task.id),
									children: l("查看原任务")
								})]
							}),
							(task.workflowRerunRequired || task.workflowRerunContext && task.status !== "completed" || task.status === "in_progress" || task.status === "claimed") && (0, react_jsx_runtime.jsx)("p", {
								className: OutcomeShowcase_module_css_default.notice,
								children: l("任务正在更新或等待重跑；当前文件不代表本轮已完成交付。")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: OutcomeShowcase_module_css_default.tabs,
								children: [(0, react_jsx_runtime.jsx)("button", {
									"aria-pressed": validFile === void 0,
									onClick: () => setFile(void 0),
									children: l("提交说明与验证")
								}), (0, react_jsx_runtime.jsx)("span", { children: l("文件来自约定交付或报告变更，是否存在需打开核对。") })]
							}),
							!!files.length && (0, react_jsx_runtime.jsx)("div", {
								className: OutcomeShowcase_module_css_default.files,
								"aria-label": l("成果文件"),
								children: files.slice(0, 200).map((f) => (0, react_jsx_runtime.jsxs)("button", {
									"aria-pressed": validFile === f.path,
									onClick: () => {
										setFile(f.path);
										setRaw(false);
									},
									children: [(0, react_jsx_runtime.jsx)("strong", { children: f.path }), (0, react_jsx_runtime.jsxs)("small", { children: [f.declared ? l("约定交付物") : l("报告变更"), f.declared && f.changed ? ` · ${l("报告变更")}` : ""] })]
								}, f.path))
							}),
							files.length > 200 && (0, react_jsx_runtime.jsx)("p", { children: l("仅展示前 200 个文件条目，其余请查看原任务。") }),
							validFile !== void 0 ? (0, react_jsx_runtime.jsxs)("section", {
								className: OutcomeShowcase_module_css_default.preview,
								"aria-live": "polite",
								children: [
									(0, react_jsx_runtime.jsxs)("header", { children: [(0, react_jsx_runtime.jsx)("strong", { children: validFile }), (0, react_jsx_runtime.jsx)("button", {
										onClick: () => setRefresh((v) => v + 1),
										children: l("刷新文件")
									})] }),
									(0, react_jsx_runtime.jsx)("p", {
										className: OutcomeShowcase_module_css_default.notice,
										children: l("当前工作区文件，不是历史快照；审批记录不代表此文件版本已验收。")
									}),
									error ? (0, react_jsx_runtime.jsx)("p", {
										role: "alert",
										children: workflowMessage(error, l)
									}) : !preview ? (0, react_jsx_runtime.jsx)("p", { children: l("正在读取文件…") }) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("p", {
										className: OutcomeShowcase_module_css_default.meta,
										children: [preview.size !== void 0 && `${preview.size.toLocaleString()} bytes · `, preview.modifiedAt !== void 0 && new Date(preview.modifiedAt).toLocaleString()]
									}), preview.status !== "ready" ? (0, react_jsx_runtime.jsx)("p", { children: statusText(preview.status) }) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [preview.kind === "image" ? (0, react_jsx_runtime.jsx)("img", {
										src: preview.dataUrl,
										alt: validFile,
										onError: (e) => {
											e.currentTarget.alt = l("图片无法解码，请在工作区查看原文件。");
										}
									}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(preview.kind === "markdown" || preview.kind === "csv") && (0, react_jsx_runtime.jsx)("button", {
										"aria-pressed": raw,
										onClick: () => setRaw(!raw),
										children: raw ? l("预览") : l("查看原文")
									}), !raw && preview.kind === "markdown" ? (0, react_jsx_runtime.jsx)(OutcomeMarkdown, { text: preview.text ?? "" }) : !raw && csv ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("div", {
										className: OutcomeShowcase_module_css_default.tableScroll,
										children: (0, react_jsx_runtime.jsx)("table", { children: (0, react_jsx_runtime.jsx)("tbody", { children: csv.rows.map((row, i) => (0, react_jsx_runtime.jsx)("tr", { children: row.map((cell, j) => i === 0 ? (0, react_jsx_runtime.jsx)("th", { children: cell }, j) : (0, react_jsx_runtime.jsx)("td", { children: cell }, j)) }, i)) }) })
									}), csv.truncated && (0, react_jsx_runtime.jsx)("p", { children: l("仅预览前 100 行、50 列。") })] }) : (0, react_jsx_runtime.jsx)("pre", { children: preview.text || l("文件为空") })] }), (0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsx)("summary", { children: l("当前文件指纹") }), (0, react_jsx_runtime.jsx)("code", { children: preview.sha256 })] })] })] })
								]
							}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								(0, react_jsx_runtime.jsxs)("section", {
									className: OutcomeShowcase_module_css_default.report,
									children: [(0, react_jsx_runtime.jsx)("h4", { children: l("任务提交说明") }), task.output ? (0, react_jsx_runtime.jsx)(OutcomeMarkdown, { text: task.output }) : (0, react_jsx_runtime.jsx)("p", { children: l("尚未提交结果。约定交付物和任务完成状态不能代替实际成果。") })]
								}),
								(0, react_jsx_runtime.jsxs)("section", {
									className: OutcomeShowcase_module_css_default.report,
									children: [
										(0, react_jsx_runtime.jsx)("h4", { children: l("验证记录") }),
										(0, react_jsx_runtime.jsx)("p", {
											className: OutcomeShowcase_module_css_default.meta,
											children: l("以下为 Agent 提交记录，不代表独立测试或人工验收。")
										}),
										!task.commandsRun?.length && !task.acceptanceResults?.length && (0, react_jsx_runtime.jsx)("p", { children: l("暂无验证记录") }),
										task.commandsRun?.map((r, i) => (0, react_jsx_runtime.jsxs)("div", { children: [
											(0, react_jsx_runtime.jsx)("strong", { children: r.status === "passed" ? l("报告通过") : l("报告失败") }),
											" · ",
											(0, react_jsx_runtime.jsx)("code", { children: r.command }),
											(0, react_jsx_runtime.jsx)("p", { children: r.evidence || l("未提交证据说明") })
										] }, `c${i}`)),
										task.acceptanceResults?.map((r, i) => (0, react_jsx_runtime.jsxs)("div", { children: [
											(0, react_jsx_runtime.jsx)("strong", { children: r.criterion }),
											" · ",
											r.status === "passed" ? l("报告通过") : l("报告失败"),
											(0, react_jsx_runtime.jsx)("p", { children: r.evidence || l("未提交证据说明") })
										] }, `a${i}`))
									]
								}),
								!!gates.length && (0, react_jsx_runtime.jsxs)("section", {
									className: OutcomeShowcase_module_css_default.report,
									children: [(0, react_jsx_runtime.jsx)("h4", { children: l("下游人工检查点") }), gates.map((g) => (0, react_jsx_runtime.jsxs)("button", {
										onClick: () => onTask(g.id, true),
										children: [
											g.subject,
											" · ",
											g.checkpoint?.decision === "approve" ? l("已通过") : g.checkpoint?.decision === "reject" ? l("已退回") : l("等待人工决定")
										]
									}, g.id))]
								}),
								!!task.stoppedAttempts?.length && (0, react_jsx_runtime.jsxs)("details", {
									className: OutcomeShowcase_module_css_default.report,
									children: [
										(0, react_jsx_runtime.jsxs)("summary", { children: [
											l("历史提交说明"),
											" · ",
											task.stoppedAttempts.length
										] }),
										(0, react_jsx_runtime.jsx)("p", {
											className: OutcomeShowcase_module_css_default.meta,
											children: l("这里只保留历史文字记录，没有保存历史文件副本。")
										}),
										[...task.stoppedAttempts].reverse().map((a, i) => (0, react_jsx_runtime.jsxs)("section", { children: [(0, react_jsx_runtime.jsx)("small", { children: new Date(a.at).toLocaleString() }), (0, react_jsx_runtime.jsx)("pre", { children: a.output || l("本次停止前未提交结果") })] }, i))
									]
								})
							] })
						]
					})]
				})]
			});
		}
		//#endregion
		//#region lib/client/review-evidence.js
		const record = (value) => !!value && typeof value === "object" && !Array.isArray(value);
		const text = (value) => typeof value === "string" ? value : "";
		const records = (value) => Array.isArray(value) ? value.filter(record) : [];
		function parseReviewMaterial(raw) {
			if (!raw) return;
			try {
				const value = JSON.parse(raw);
				if (!record(value) || !record(value.check) || !Array.isArray(value.results) || typeof value.check.id !== "string" || !Number.isInteger(value.check.round)) return;
				const files = record(value.files) ? value.files : {};
				return {
					check: {
						id: value.check.id,
						subject: text(value.check.subject),
						description: text(value.check.description),
						round: value.check.round,
						...Array.isArray(value.check.acceptance) ? { acceptance: value.check.acceptance.filter((v) => typeof v === "string") } : {}
					},
					results: records(value.results).map((result) => ({
						id: text(result.id),
						subject: text(result.subject),
						output: text(result.output),
						status: text(result.status),
						attemptId: text(result.attemptId),
						acceptanceResults: records(result.acceptanceResults).filter((r) => typeof r.criterion === "string" && (r.status === "passed" || r.status === "failed")).map((r) => ({
							criterion: r.criterion,
							status: r.status,
							evidence: text(r.evidence)
						})),
						commandsRun: records(result.commandsRun).filter((r) => typeof r.command === "string" && (r.status === "passed" || r.status === "failed")).map((r) => ({
							command: r.command,
							status: r.status,
							evidence: text(r.evidence),
							exitCode: typeof r.exitCode === "number" ? r.exitCode : void 0
						}))
					})),
					files: records(files.artifacts).filter((f) => typeof f.path === "string").map((f) => ({
						path: f.path,
						present: f.present === true,
						unreadable: f.unreadable === true,
						sha256: text(f.sha256),
						reason: text(f.reason)
					})),
					gaps: records(files.gaps).map((g) => ({
						pattern: text(g.pattern),
						reason: text(g.reason)
					})),
					limitation: text(value.limitation)
				};
			} catch {
				return;
			}
		}
		/** Only explicit structured criteria are matched, by exact trimmed text. Prose stays intact. */
		function reviewItems(task, material) {
			const criteria = [...new Set((material?.check.acceptance ?? task.acceptance ?? []).map((s) => s.trim()).filter(Boolean))];
			const items = criteria.map((criterion, i) => ({
				id: `criterion:${i}`,
				title: criterion,
				kind: "requirement",
				reports: material?.results.flatMap((r) => r.acceptanceResults.filter((a) => a.criterion.trim() === criterion).map((a) => ({
					...a,
					source: r.subject
				}))) ?? []
			}));
			for (const result of material?.results ?? []) result.acceptanceResults.forEach((report, i) => {
				if (!criteria.includes(report.criterion.trim())) items.push({
					id: `${result.id}:${i}`,
					title: report.criterion,
					source: result.subject,
					kind: "report",
					reports: [report]
				});
			});
			return items;
		}
		/** Compare snapshot content, not volatile timestamps; an unavailable snapshot is never reconstructed. */
		function reviewChanges(previous, current) {
			return {
				results: [.../* @__PURE__ */ new Set([...previous.results.map((r) => r.id), ...current.results.map((r) => r.id)])].map((id) => ({
					id,
					before: previous.results.find((r) => r.id === id),
					after: current.results.find((r) => r.id === id)
				})).filter((r) => JSON.stringify(r.before) !== JSON.stringify(r.after)),
				files: [.../* @__PURE__ */ new Set([...previous.files.map((f) => f.path), ...current.files.map((f) => f.path)])].map((path) => ({
					path,
					before: previous.files.find((f) => f.path === path),
					after: current.files.find((f) => f.path === path)
				})).filter((f) => JSON.stringify(f.before) !== JSON.stringify(f.after)),
				requirementsChanged: previous.check.description !== current.check.description || JSON.stringify(previous.check.acceptance) !== JSON.stringify(current.check.acceptance),
				gapsChanged: JSON.stringify(previous.gaps) !== JSON.stringify(current.gaps)
			};
		}
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/ReviewWorkbench.module.css.mjs
		const css$5 = ".LybtKW_workbench{min-height:0;color:var(--wb-text);background:var(--wb-bg);flex:1;overflow:auto;container-type:inline-size}.LybtKW_header{border-bottom:1px solid var(--wb-border);justify-content:space-between;align-items:flex-start;gap:12px;padding:18px;display:flex}.LybtKW_header h3{overflow-wrap:anywhere;margin:4px 0 0;font-size:17px}.LybtKW_header small,.LybtKW_hint{color:var(--wb-muted);font-size:12px}.LybtKW_status{background:var(--wb-base);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;padding:10px 18px;font-size:12px;display:flex}.LybtKW_status>span{color:var(--wb-accent)}.LybtKW_status label{align-items:center;gap:8px;display:flex}.LybtKW_status select{min-width:0;max-width:100%;font:inherit;color:var(--wb-text);background:var(--wb-bg);border:1px solid var(--wb-border);border-radius:6px;padding:6px}.LybtKW_workbench>.LybtKW_hint{padding:0 18px}.LybtKW_hint{margin:10px 0}.LybtKW_body{grid-template-columns:180px minmax(0,1fr);display:grid}.LybtKW_criteria{border-right:1px solid var(--wb-border);padding:14px 10px}.LybtKW_criteria>strong{margin:0 6px 10px;font-size:12px;display:block}.LybtKW_workbench .LybtKW_criteria button{text-align:left;white-space:normal;overflow-wrap:anywhere;border:0;justify-content:flex-start;align-items:flex-start;gap:8px;width:100%;margin-bottom:4px;padding:10px 8px;display:flex}.LybtKW_criteria button>span:last-child{min-width:0}.LybtKW_criteria small{color:var(--wb-muted);margin-top:3px;font-size:11px;display:block}.LybtKW_workbench button[aria-pressed=true]{background:color-mix(in srgb,var(--wb-accent) 10%,var(--wb-bg));color:var(--wb-accent)}.LybtKW_evidence{min-width:0;padding:18px}.LybtKW_evidence h4{margin:0 0 10px;font-size:14px}.LybtKW_requirements,.LybtKW_result p{white-space:pre-wrap;overflow-wrap:anywhere}.LybtKW_tabs{border-bottom:1px solid var(--wb-border);flex-wrap:wrap;gap:8px;margin:14px 0;padding-bottom:10px;display:flex}.LybtKW_result{border:1px solid var(--wb-border);overflow-wrap:anywhere;border-radius:8px;min-width:0;margin:12px 0;padding:12px}.LybtKW_result p{margin:8px 0}.LybtKW_result small{color:var(--wb-muted);display:block}.LybtKW_result code{white-space:pre-wrap;overflow-wrap:anywhere;font-size:11px;display:block}.LybtKW_report{border-top:1px solid var(--wb-border);margin:10px 0;padding-top:8px}.LybtKW_report>span{color:var(--wb-muted);font-size:11px}.LybtKW_compare{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;margin-top:10px;display:grid}.LybtKW_compare>section{min-width:0}.LybtKW_compare .LybtKW_result{padding:8px}.LybtKW_raw pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:11px}.LybtKW_raw summary,.LybtKW_discussion summary,.LybtKW_result summary{cursor:pointer}.LybtKW_discussion{border-top:1px solid var(--wb-border);padding:14px 18px}.LybtKW_discussion>summary{color:var(--wb-accent)}.LybtKW_discussion[open]>summary{margin-bottom:12px}.LybtKW_discussion>div{min-height:220px}.LybtKW_decision{border-top:1px solid var(--wb-border);background:var(--wb-bg);padding:18px}.LybtKW_footerTitle{justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px;display:flex}.LybtKW_decision label{font-size:12px;display:block}.LybtKW_decision textarea{resize:vertical;width:100%;min-height:76px;font:inherit;color:var(--wb-text);background:var(--wb-base);border:1px solid var(--wb-border);border-radius:8px;margin-top:6px;padding:10px;display:block}.LybtKW_actions{flex-wrap:wrap;justify-content:flex-end;gap:8px;display:flex}.LybtKW_workbench .LybtKW_primary{color:var(--wb-accent);border-color:var(--wb-accent);background:color-mix(in srgb,var(--wb-accent) 10%,var(--wb-bg))}.LybtKW_notice,.LybtKW_confirmation{background:color-mix(in srgb,var(--wb-accent) 8%,var(--wb-base));border-radius:8px;margin:12px 18px;padding:12px;font-size:12px}.LybtKW_decision .LybtKW_notice,.LybtKW_confirmation{margin:12px 0}.LybtKW_confirmation p{margin:8px 0 12px}@container (width<=560px){.LybtKW_body{grid-template-columns:1fr}.LybtKW_criteria{border-right:0;border-bottom:1px solid var(--wb-border)}.LybtKW_compare{grid-template-columns:1fr}.LybtKW_evidence{padding:14px}}@media (width<=600px){.LybtKW_body,.LybtKW_compare{grid-template-columns:1fr}.LybtKW_criteria{border-right:0;border-bottom:1px solid var(--wb-border)}.LybtKW_status label{flex-wrap:wrap}.LybtKW_decision textarea{font-size:16px}}.LybtKW_decision select{max-width:100%;font:inherit;color:var(--wb-text);background:var(--wb-base);border:1px solid var(--wb-border);border-radius:6px;margin:6px 0 12px;padding:8px;display:block}.LybtKW_decision .LybtKW_actions{margin-top:12px}";
		const tagId$5 = "@yogurtss/dsh-teamflow/ReviewWorkbench.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$5) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$5;
			tag.textContent = css$5;
			document.head.appendChild(tag);
		}
		var ReviewWorkbench_module_css_default = {
			"actions": "LybtKW_actions",
			"body": "LybtKW_body",
			"compare": "LybtKW_compare",
			"confirmation": "LybtKW_confirmation",
			"criteria": "LybtKW_criteria",
			"decision": "LybtKW_decision",
			"discussion": "LybtKW_discussion",
			"evidence": "LybtKW_evidence",
			"footerTitle": "LybtKW_footerTitle",
			"header": "LybtKW_header",
			"hint": "LybtKW_hint",
			"notice": "LybtKW_notice",
			"primary": "LybtKW_primary",
			"raw": "LybtKW_raw",
			"report": "LybtKW_report",
			"requirements": "LybtKW_requirements",
			"result": "LybtKW_result",
			"status": "LybtKW_status",
			"tabs": "LybtKW_tabs",
			"workbench": "LybtKW_workbench"
		};
		//#endregion
		//#region lib/client/ReviewWorkbench.js
		function ReviewWorkbench({ team, task, conversation, ready, archived, busy, note, onNote, onRefresh, onDecision, onDiscuss, onRestart, discussionBusy = false, discussion, proposal, onBack, onRerun, onReopen, continuation, reworkBlocked }) {
			const l = useWorkflowText(), checkpoint = task.checkpoint;
			const [round, setRound] = (0, react.useState)("current");
			const [selected, setSelected] = (0, react.useState)("overview");
			const [tab, setTab] = (0, react.useState)("evidence");
			const [confirm, setConfirm] = (0, react.useState)();
			const [error, setError] = (0, react.useState)("");
			const submitting = (0, react.useRef)(false);
			const panel = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				if (checkpoint.decision === "reject" || task.workflowRerunRequired) panel.current?.scrollTo({ top: 0 });
			}, [checkpoint.decision, task.workflowRerunRequired]);
			const history = checkpoint.history ?? [];
			const historical = round !== "current";
			const entry = historical ? history[Number(round)] : [...history].reverse().find((h) => h.round === checkpoint.round && h.decision === checkpoint.decision);
			const currentText = checkpoint.decision ? entry?.materials : conversation?.materialsRound === checkpoint.round ? conversation.materials : void 0;
			const raw = historical ? entry?.materials : currentText;
			const material = (0, react.useMemo)(() => parseReviewMaterial(raw), [raw]);
			const validMaterial = material?.check.id === task.id && material.check.round === (entry?.round ?? checkpoint.round) ? material : void 0;
			const items = (0, react.useMemo)(() => reviewItems(historical || checkpoint.decision ? {
				...task,
				acceptance: void 0
			} : task, validMaterial), [
				task,
				validMaterial,
				historical,
				checkpoint.decision
			]);
			const item = items.find((value) => value.id === selected);
			const prior = parseReviewMaterial([...history].reverse().find((h) => h.round < (historical ? entry?.round ?? checkpoint.round : checkpoint.round))?.materials);
			const changes = validMaterial && prior?.check.id === task.id ? reviewChanges(prior, validMaterial) : void 0;
			const canDecide = !historical && !archived && ready && !checkpoint.decision && !!validMaterial && !!conversation?.evidence && conversation.materialsRound === checkpoint.round;
			const autoMaterials = (0, react.useRef)("");
			(0, react.useEffect)(() => {
				if (historical || archived || checkpoint.decision || !ready) {
					autoMaterials.current = "";
					return;
				}
				if (busy || validMaterial && conversation?.evidence && conversation.materialsRound === checkpoint.round) return;
				const key = team.id + ":" + task.id + ":" + checkpoint.round;
				if (autoMaterials.current === key) return;
				autoMaterials.current = key;
				onRefresh();
			}, [
				team.id,
				task.id,
				checkpoint.round,
				checkpoint.decision,
				ready,
				historical,
				archived,
				busy,
				validMaterial,
				conversation?.evidence,
				conversation?.materialsRound,
				onRefresh
			]);
			const decisionBlock = busy ? l("正在更新验收材料或状态，请稍候。") : !ready ? taskReadiness(team, task, l).detail : !canDecide ? l("本轮验收材料尚未就绪；正在首次加载，读取失败时请点击「刷新验收材料」重试。") : void 0;
			const issues = validMaterial ? validMaterial.results.flatMap((r) => [...r.acceptanceResults, ...r.commandsRun]).filter((r) => r.status === "failed").length + validMaterial.files.filter((f) => !f.present || f.unreadable).length + validMaterial.gaps.length : 0;
			const downstream = team.tasks.filter((t) => t.dependencies.includes(task.id));
			(0, react.useEffect)(() => {
				setConfirm(void 0);
				setError("");
			}, [
				conversation?.evidence,
				checkpoint.round,
				checkpoint.decision,
				ready,
				round
			]);
			(0, react.useEffect)(() => {
				if (selected !== "overview" && !items.some((i) => i.id === selected)) setSelected("overview");
			}, [items, selected]);
			function changeRound(value) {
				setRound(value);
				setSelected("overview");
				setTab("evidence");
				setConfirm(void 0);
			}
			async function decide(decision) {
				if (submitting.current || busy || !canDecide || !conversation?.evidence) return;
				if (decision === "reject" && !note.trim()) {
					setError(l("请填写退回原因。"));
					return;
				}
				if (decision === "approve" && (!confirm || confirm.evidence !== conversation.evidence || confirm.round !== checkpoint.round)) return;
				submitting.current = true;
				try {
					if (await onDecision(decision, conversation.evidence, note)) {
						setConfirm(void 0);
						setError("");
					}
				} finally {
					submitting.current = false;
				}
			}
			const renderResult = (result) => (0, react_jsx_runtime.jsxs)("section", {
				className: ReviewWorkbench_module_css_default.result,
				children: [
					(0, react_jsx_runtime.jsx)("strong", { children: result.subject }),
					(0, react_jsx_runtime.jsx)("p", { children: result.output || l("尚未提交结果说明") }),
					result.commandsRun.length > 0 && (0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsxs)("summary", { children: [
						l("命令记录"),
						" · ",
						result.commandsRun.length
					] }), result.commandsRun.map((r, i) => (0, react_jsx_runtime.jsxs)("div", {
						className: ReviewWorkbench_module_css_default.report,
						children: [
							(0, react_jsx_runtime.jsx)("span", { children: r.status === "passed" ? l("报告通过") : l("报告失败") }),
							(0, react_jsx_runtime.jsx)("code", { children: r.command }),
							r.exitCode !== void 0 && (0, react_jsx_runtime.jsxs)("small", { children: [
								l("退出码"),
								" · ",
								r.exitCode
							] }),
							(0, react_jsx_runtime.jsx)("p", { children: r.evidence || l("未提交证据说明") })
						]
					}, i))] }),
					result.acceptanceResults.length > 0 && (0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsxs)("summary", { children: [
						l("上游提交条目"),
						" · ",
						result.acceptanceResults.length
					] }), result.acceptanceResults.map((r, i) => (0, react_jsx_runtime.jsxs)("p", { children: [
						r.criterion,
						" · ",
						r.status === "passed" ? l("报告通过") : l("报告失败"),
						"\n",
						r.evidence || l("未提交证据说明")
					] }, i))] })
				]
			}, result.id);
			return (0, react_jsx_runtime.jsxs)("aside", {
				ref: panel,
				className: ReviewWorkbench_module_css_default.workbench,
				"aria-label": l("验收工作台"),
				"data-review-workbench": true,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: ReviewWorkbench_module_css_default.header,
						children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsxs)("small", { children: [
							l("人工检查点"),
							" · ",
							l("第 {0} 轮", checkpoint.round)
						] }), (0, react_jsx_runtime.jsx)("h3", {
							"data-review-heading": true,
							tabIndex: -1,
							children: task.subject
						})] }), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onBack,
							children: l("返回节点")
						})]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: ReviewWorkbench_module_css_default.status,
						children: [(0, react_jsx_runtime.jsx)("span", { children: checkpoint.decision === "approve" ? l("已通过") : checkpoint.decision === "reject" ? l("已退回") : ready ? l("等待人工决定") : taskReadiness(team, task, l).label }), (0, react_jsx_runtime.jsxs)("label", { children: [l("验收轮次"), (0, react_jsx_runtime.jsxs)("select", {
							"aria-label": l("验收轮次"),
							value: round,
							onChange: (e) => changeRound(e.target.value),
							children: [(0, react_jsx_runtime.jsxs)("option", {
								value: "current",
								children: [
									l("当前轮次"),
									" · ",
									checkpoint.round
								]
							}), history.map((h, i) => (0, react_jsx_runtime.jsxs)("option", {
								value: String(i),
								children: [
									l("第 {0} 轮", h.round),
									" · ",
									h.decision === "approve" ? l("通过") : l("退回")
								]
							}, i))]
						})] })]
					}),
					(0, react_jsx_runtime.jsx)("p", {
						className: ReviewWorkbench_module_css_default.hint,
						children: l("提交记录不等于人工验收通过；没有证据的内容不视为已验证。")
					}),
					!historical && !archived && continuation,
					!historical && checkpoint.decision === "reject" && (archived ? (0, react_jsx_runtime.jsx)("p", {
						className: ReviewWorkbench_module_css_default.notice,
						children: l("恢复并编辑流程后可安排返工。")
					}) : (0, react_jsx_runtime.jsx)(RejectedReview, {
						team,
						task,
						busy,
						blocked: reworkBlocked,
						onRerun,
						onReopen,
						onBack,
						onDiscuss
					})),
					(0, react_jsx_runtime.jsxs)("div", {
						className: ReviewWorkbench_module_css_default.body,
						children: [(0, react_jsx_runtime.jsxs)("nav", {
							className: ReviewWorkbench_module_css_default.criteria,
							"aria-label": l("要求与提交条目"),
							children: [
								(0, react_jsx_runtime.jsx)("strong", { children: l("要求与提交条目") }),
								(0, react_jsx_runtime.jsxs)("button", {
									"aria-pressed": selected === "overview",
									onClick: () => setSelected("overview"),
									children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "review" }), l("验收要求与全部证据")]
								}),
								items.map((i) => (0, react_jsx_runtime.jsxs)("button", {
									"aria-pressed": selected === i.id,
									onClick: () => setSelected(i.id),
									children: [(0, react_jsx_runtime.jsx)("span", { children: i.reports.some((r) => r.status === "failed") ? "!" : i.reports.some((r) => r.evidence?.trim()) ? "↳" : "?" }), (0, react_jsx_runtime.jsxs)("span", { children: [i.title, (0, react_jsx_runtime.jsx)("small", { children: i.kind === "report" ? l("上游报告 · {0}", i.source ?? "") : i.reports.some((r) => r.evidence?.trim()) ? l("已关联同名提交记录") : l("未关联证据") })] })]
								}, i.id)),
								!items.length && (0, react_jsx_runtime.jsx)("p", {
									className: ReviewWorkbench_module_css_default.hint,
									children: l("未提供结构化验收条目，请按完整要求核对全部证据。")
								})
							]
						}), (0, react_jsx_runtime.jsxs)("section", {
							className: ReviewWorkbench_module_css_default.evidence,
							"aria-live": "polite",
							children: [
								(0, react_jsx_runtime.jsx)("h4", { children: item?.title ?? l("验收要求") }),
								!item && (0, react_jsx_runtime.jsx)("p", {
									className: ReviewWorkbench_module_css_default.requirements,
									children: validMaterial?.check.description || (!historical && !checkpoint.decision ? task.description : void 0) || l("此记录没有保存验收要求快照。")
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: ReviewWorkbench_module_css_default.tabs,
									role: "group",
									"aria-label": l("证据视图"),
									children: [(0, react_jsx_runtime.jsx)("button", {
										"aria-pressed": tab === "evidence",
										onClick: () => setTab("evidence"),
										children: l("关联证据")
									}), (0, react_jsx_runtime.jsx)("button", {
										"aria-pressed": tab === "diff",
										onClick: () => setTab("diff"),
										children: l("与上一轮对比")
									})]
								}),
								tab === "diff" ? (0, react_jsx_runtime.jsx)("div", { children: !changes ? (0, react_jsx_runtime.jsx)("p", {
									className: ReviewWorkbench_module_css_default.hint,
									children: l("没有可比较的上一轮证据快照；旧记录只有审批信息时，不会重建历史证据。")
								}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
									(0, react_jsx_runtime.jsx)("p", {
										className: ReviewWorkbench_module_css_default.hint,
										children: l("比较第 {0} 轮与第 {1} 轮的全部提交记录和文件摘要。", prior.check.round, validMaterial.check.round)
									}),
									changes.requirementsChanged && (0, react_jsx_runtime.jsxs)("section", {
										className: ReviewWorkbench_module_css_default.result,
										children: [(0, react_jsx_runtime.jsx)("strong", { children: l("验收要求已变化") }), (0, react_jsx_runtime.jsxs)("div", {
											className: ReviewWorkbench_module_css_default.compare,
											children: [(0, react_jsx_runtime.jsxs)("section", { children: [
												(0, react_jsx_runtime.jsx)("small", { children: l("上一轮") }),
												(0, react_jsx_runtime.jsx)("p", { children: prior.check.description }),
												prior.check.acceptance?.map((text, i) => (0, react_jsx_runtime.jsx)("p", { children: text }, i))
											] }), (0, react_jsx_runtime.jsxs)("section", { children: [
												(0, react_jsx_runtime.jsx)("small", { children: l("当前查看轮次") }),
												(0, react_jsx_runtime.jsx)("p", { children: validMaterial.check.description }),
												validMaterial.check.acceptance?.map((text, i) => (0, react_jsx_runtime.jsx)("p", { children: text }, i))
											] })]
										})]
									}),
									changes.results.map((r) => (0, react_jsx_runtime.jsxs)("details", {
										className: ReviewWorkbench_module_css_default.result,
										open: true,
										children: [(0, react_jsx_runtime.jsx)("summary", { children: r.after?.subject ?? r.before?.subject }), (0, react_jsx_runtime.jsxs)("div", {
											className: ReviewWorkbench_module_css_default.compare,
											children: [(0, react_jsx_runtime.jsxs)("section", { children: [(0, react_jsx_runtime.jsx)("small", { children: l("上一轮") }), r.before ? renderResult(r.before) : (0, react_jsx_runtime.jsx)("p", { children: l("没有此项记录") })] }), (0, react_jsx_runtime.jsxs)("section", { children: [(0, react_jsx_runtime.jsx)("small", { children: l("当前查看轮次") }), r.after ? renderResult(r.after) : (0, react_jsx_runtime.jsx)("p", { children: l("没有此项记录") })] })]
										})]
									}, r.id)),
									changes.files.map((f) => (0, react_jsx_runtime.jsxs)("div", {
										className: ReviewWorkbench_module_css_default.result,
										children: [
											(0, react_jsx_runtime.jsx)("strong", { children: f.path }),
											(0, react_jsx_runtime.jsx)("p", { children: l("文件摘要或可读状态已变化；这里不展示文件内容差异。") }),
											(0, react_jsx_runtime.jsxs)("div", {
												className: ReviewWorkbench_module_css_default.compare,
												children: [(0, react_jsx_runtime.jsxs)("section", { children: [(0, react_jsx_runtime.jsx)("small", { children: l("上一轮") }), (0, react_jsx_runtime.jsx)("code", { children: f.before?.sha256 || l("无可读摘要") })] }), (0, react_jsx_runtime.jsxs)("section", { children: [(0, react_jsx_runtime.jsx)("small", { children: l("当前查看轮次") }), (0, react_jsx_runtime.jsx)("code", { children: f.after?.sha256 || l("无可读摘要") })] })]
											})
										]
									}, f.path)),
									changes.gapsChanged && (0, react_jsx_runtime.jsx)("p", { children: l("文件读取范围缺口已变化，请核对原始证据记录。") }),
									!changes.results.length && !changes.files.length && !changes.requirementsChanged && !changes.gapsChanged && (0, react_jsx_runtime.jsx)("p", { children: l("提交内容与文件摘要未变化。") })
								] }) }) : item ? (0, react_jsx_runtime.jsxs)("div", { children: [item.kind === "report" && (0, react_jsx_runtime.jsx)("p", {
									className: ReviewWorkbench_module_css_default.hint,
									children: l("这是上游 Agent 的提交条目，不代表已覆盖检查点的全部要求。")
								}), item.reports.length ? item.reports.map((r, i) => (0, react_jsx_runtime.jsxs)("section", {
									className: ReviewWorkbench_module_css_default.result,
									children: [
										(0, react_jsx_runtime.jsx)("strong", { children: r.status === "passed" ? l("报告通过") : l("报告失败") }),
										r.source && (0, react_jsx_runtime.jsx)("small", { children: r.source }),
										(0, react_jsx_runtime.jsx)("p", { children: r.evidence || l("未提交证据说明") })
									]
								}, i)) : (0, react_jsx_runtime.jsx)("p", { children: l("未找到同名提交记录。请查看全部证据，或与 AI 讨论缺口。") })] }) : validMaterial ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
									validMaterial.results.length ? validMaterial.results.map(renderResult) : (0, react_jsx_runtime.jsx)("p", { children: l("此检查点没有上游执行结果，请根据验收要求确认是否继续。") }),
									!!validMaterial.files.length && (0, react_jsx_runtime.jsxs)("details", {
										className: ReviewWorkbench_module_css_default.result,
										children: [(0, react_jsx_runtime.jsxs)("summary", { children: [
											l("相关文件"),
											" · ",
											validMaterial.files.length
										] }), validMaterial.files.map((f) => (0, react_jsx_runtime.jsxs)("div", {
											className: ReviewWorkbench_module_css_default.report,
											children: [
												(0, react_jsx_runtime.jsx)("strong", { children: f.path }),
												(0, react_jsx_runtime.jsx)("small", { children: f.unreadable ? l("无法读取") : !f.present ? l("文件不存在") : l("宿主已读取文件摘要") }),
												f.sha256 && (0, react_jsx_runtime.jsx)("code", { children: f.sha256 }),
												f.reason && (0, react_jsx_runtime.jsx)("p", { children: f.reason })
											]
										}, f.path))]
									}),
									!!validMaterial.gaps.length && (0, react_jsx_runtime.jsxs)("section", {
										className: ReviewWorkbench_module_css_default.result,
										children: [(0, react_jsx_runtime.jsx)("strong", { children: l("文件读取范围缺口") }), validMaterial.gaps.map((g, i) => (0, react_jsx_runtime.jsxs)("p", { children: [
											g.pattern,
											" · ",
											g.reason
										] }, i))]
									})
								] }) : (0, react_jsx_runtime.jsx)("p", {
									className: ReviewWorkbench_module_css_default.hint,
									children: historical || checkpoint.decision ? l("此历史记录没有保存证据快照；仅展示原有审批信息。") : ready ? l("打开或刷新验收材料后，才能提交本轮决定。") : l("检查点尚未就绪，可先查看要求；上游完成且节点启用后再验收。")
								}),
								raw && (0, react_jsx_runtime.jsxs)("details", {
									className: ReviewWorkbench_module_css_default.raw,
									children: [(0, react_jsx_runtime.jsx)("summary", { children: l("原始证据记录") }), (0, react_jsx_runtime.jsx)("pre", { children: raw })]
								}),
								validMaterial?.limitation && (0, react_jsx_runtime.jsx)("p", {
									className: ReviewWorkbench_module_css_default.hint,
									children: workflowMessage(validMaterial.limitation, l)
								}),
								entry && (0, react_jsx_runtime.jsxs)("section", {
									className: ReviewWorkbench_module_css_default.result,
									children: [
										(0, react_jsx_runtime.jsxs)("strong", { children: [
											l("已保存的验收决定"),
											" · ",
											entry.decision === "approve" ? l("通过") : l("退回")
										] }),
										(0, react_jsx_runtime.jsx)("p", { children: entry.note || l("未填写意见") }),
										(0, react_jsx_runtime.jsx)("small", { children: new Date(entry.at).toLocaleString() })
									]
								})
							]
						})]
					}),
					!historical && (0, react_jsx_runtime.jsxs)("details", {
						className: ReviewWorkbench_module_css_default.discussion,
						children: [(0, react_jsx_runtime.jsx)("summary", { children: l("与 AI 讨论验收") }), archived ? (0, react_jsx_runtime.jsx)("p", { children: l("恢复并编辑流程后可继续讨论。") }) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							discussion ?? (0, react_jsx_runtime.jsxs)("button", {
								disabled: busy,
								onClick: onDiscuss,
								children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "chat" }), l(conversation?.native ? "继续在此处讨论" : "在此处开始讨论")]
							}),
							(0, react_jsx_runtime.jsx)("p", {
								className: ReviewWorkbench_module_css_default.hint,
								children: l("讨论使用整个检查点的上下文；聊天不会写入审批决定。")
							}),
							onRestart && (0, react_jsx_runtime.jsxs)("details", { children: [
								(0, react_jsx_runtime.jsx)("summary", { children: l("重新开始讨论") }),
								(0, react_jsx_runtime.jsx)("p", { children: l("新建独立讨论会归档当前讨论，从当前资料重新开始。") }),
								(0, react_jsx_runtime.jsx)("button", {
									disabled: busy || discussionBusy,
									onClick: onRestart,
									children: l("新建独立讨论")
								})
							] })
						] })]
					}),
					!historical && !archived && proposal,
					!historical && !archived && !checkpoint.decision && (0, react_jsx_runtime.jsxs)("footer", {
						className: ReviewWorkbench_module_css_default.decision,
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: ReviewWorkbench_module_css_default.footerTitle,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: l("你的验收决定") }), (0, react_jsx_runtime.jsx)("button", {
									disabled: busy || !ready,
									onClick: onRefresh,
									children: l("刷新验收材料")
								})]
							}),
							(0, react_jsx_runtime.jsxs)("label", { children: [l("验收意见（随决定保存）"), (0, react_jsx_runtime.jsx)("textarea", {
								"aria-label": l("验收意见"),
								value: note,
								maxLength: 16e3,
								onChange: (e) => {
									onNote(e.target.value);
									setConfirm(void 0);
								},
								placeholder: l("记录通过或退回的原因…")
							})] }),
							(0, react_jsx_runtime.jsxs)("p", {
								className: ReviewWorkbench_module_css_default.hint,
								children: [l("通过后，下游仍按依赖与暂停状态调度："), downstream.map((t) => t.subject).join("、") || l("无")]
							}),
							decisionBlock && (0, react_jsx_runtime.jsx)("p", {
								className: ReviewWorkbench_module_css_default.notice,
								role: "status",
								children: decisionBlock
							}),
							issues > 0 && (0, react_jsx_runtime.jsx)("p", {
								className: ReviewWorkbench_module_css_default.notice,
								children: l("当前材料有 {0} 项失败记录或文件读取缺口，请核实后决定。", issues)
							}),
							error && (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: ReviewWorkbench_module_css_default.notice,
								children: error
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: ReviewWorkbench_module_css_default.actions,
								children: [(0, react_jsx_runtime.jsx)("button", {
									disabled: busy || !canDecide,
									onClick: () => void decide("reject"),
									children: l("退回修改")
								}), (0, react_jsx_runtime.jsx)("button", {
									className: ReviewWorkbench_module_css_default.primary,
									disabled: busy || !canDecide,
									onClick: () => setConfirm({
										evidence: conversation.evidence,
										round: checkpoint.round
									}),
									children: l("通过验收")
								})]
							}),
							confirm && canDecide && confirm.evidence === conversation?.evidence && (0, react_jsx_runtime.jsxs)("div", {
								className: ReviewWorkbench_module_css_default.confirmation,
								role: "group",
								"aria-label": l("确认本轮验收"),
								children: [
									(0, react_jsx_runtime.jsx)("strong", { children: l("确认通过第 {0} 轮验收？", checkpoint.round) }),
									(0, react_jsx_runtime.jsx)("p", { children: l("请确认已核对要求与证据。Agent 报告通过不代表人工已验证。") }),
									(0, react_jsx_runtime.jsxs)("div", {
										className: ReviewWorkbench_module_css_default.actions,
										children: [(0, react_jsx_runtime.jsx)("button", {
											disabled: busy,
											onClick: () => setConfirm(void 0),
											children: l("继续检查")
										}), (0, react_jsx_runtime.jsx)("button", {
											className: ReviewWorkbench_module_css_default.primary,
											disabled: busy,
											onClick: () => void decide("approve"),
											children: l("确认通过")
										})]
									})
								]
							})
						]
					})
				]
			});
		}
		/** Reuse the existing rerun action; no implicit approval or model-generated plan. */
		function RejectedReview({ team, task, busy, blocked, onRerun, onReopen, onBack, onDiscuss }) {
			const l = useWorkflowText();
			const candidates = rerunPath(team.tasks, task.id).filter((t) => !t.checkpoint && [
				"completed",
				"failed",
				"cancelled"
			].includes(t.status));
			const [selected, setSelected] = (0, react.useState)(candidates.at(-1)?.id ?? "");
			const [instructions, setInstructions] = (0, react.useState)(task.checkpoint?.note ?? "");
			const submitting = (0, react.useRef)(false);
			const source = candidates.find((t) => t.id === selected);
			const impact = source ? rerunImpact(team.tasks, source.id) : void 0;
			const issue = blocked || (team.halted || team.phase === "staged" ? l("请先恢复或启动团队，再安排返工。") : impact?.active.length ? l("受影响的任务仍在运行，请先暂停后再返工。") : void 0);
			return (0, react_jsx_runtime.jsxs)("section", {
				className: ReviewWorkbench_module_css_default.decision,
				"aria-label": l("安排返工"),
				children: [
					(0, react_jsx_runtime.jsx)("h4", { children: l("验收已退回 · 下一步") }),
					(0, react_jsx_runtime.jsx)("p", { children: l("选择需要修改的上游任务，确认返工要求后重跑。原结果和验收意见会保留在历史记录中。") }),
					onReopen && (0, react_jsx_runtime.jsxs)("div", {
						className: ReviewWorkbench_module_css_default.notice,
						children: [(0, react_jsx_runtime.jsx)("p", { children: l("如果退回有误，或当前结果已经可以接受，可重新验收当前结果。退回记录会保留，不会自动通过或启动任务。") }), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy || !!blocked || team.halted || team.phase === "staged",
							onClick: onReopen,
							children: l("重新验收当前结果")
						})]
					}),
					!!candidates.length && onRerun ? (0, react_jsx_runtime.jsxs)("form", {
						onSubmit: (event) => {
							event.preventDefault();
							if (busy || submitting.current || issue || !source || !instructions.trim()) return;
							submitting.current = true;
							onRerun(source.id, instructions.trim()).finally(() => {
								submitting.current = false;
							});
						},
						children: [
							(0, react_jsx_runtime.jsxs)("label", { children: [l("需要返工的任务"), (0, react_jsx_runtime.jsxs)("select", {
								"aria-label": l("需要返工的任务"),
								value: source?.id ?? "",
								onChange: (e) => setSelected(e.target.value),
								children: [!source && (0, react_jsx_runtime.jsx)("option", {
									value: "",
									children: l("请选择任务")
								}), candidates.map((t) => (0, react_jsx_runtime.jsx)("option", {
									value: t.id,
									children: t.subject
								}, t.id))]
							})] }),
							(0, react_jsx_runtime.jsxs)("label", { children: [l("返工要求"), (0, react_jsx_runtime.jsx)("textarea", {
								"aria-label": l("返工要求"),
								required: true,
								maxLength: 16e3,
								value: instructions,
								onChange: (e) => setInstructions(e.target.value)
							})] }),
							(0, react_jsx_runtime.jsxs)("p", {
								className: ReviewWorkbench_module_css_default.hint,
								children: [l("受影响的后续节点："), impact?.descendants.map((t) => t.subject).join("、") || l("无")]
							}),
							(0, react_jsx_runtime.jsx)("p", {
								className: ReviewWorkbench_module_css_default.hint,
								children: l("保存后先重跑所选任务，再点击「运行到此节点」确认后续路径。新结果仍需人工验收，其他受影响分支保持暂停。")
							}),
							issue && (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								children: issue
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "submit",
								className: ReviewWorkbench_module_css_default.primary,
								disabled: busy || !!issue || !source || !instructions.trim(),
								children: l("保存要求并重跑任务")
							})
						]
					}) : (0, react_jsx_runtime.jsx)("p", { children: l("没有可直接重跑的上游任务。请返回节点调整任务与依赖，或讨论返工方案。") }),
					(0, react_jsx_runtime.jsxs)("div", {
						className: ReviewWorkbench_module_css_default.actions,
						children: [(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: onBack,
							children: l("返回节点调整流程")
						}), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: onDiscuss,
							children: l("讨论返工方案")
						})]
					})
				]
			});
		}
		//#endregion
		//#region lib/client/WorkflowWorkbench.js
		/** Editable task canvas and isolated configuration / human-review discussions. */
		const viewCache = createWorkflowCache();
		async function request$1(payload, signal) {
			const reading = payload["action"] === "state" || payload["action"] === "archive_state";
			const key = workflowCacheKey(String(payload["sessionId"]), String(payload["teamId"] ?? ""), payload["action"] === "archive_state");
			const previous = reading ? viewCache.get(key) : void 0;
			const result = await workflowRequest({
				...payload,
				...reading ? {
					conditionalState: true,
					knownRevision: previous?.revision
				} : {}
			}, fetch, void 0, signal);
			if (result.notModified && previous) return previous;
			if (reading && !result.team) viewCache.remove(key);
			if (!result.team) return;
			return result;
		}
		function ReviewMaterials({ text }) {
			const l = useWorkflowText();
			try {
				const material = JSON.parse(text);
				if (!Array.isArray(material.results) || !material.check) return (0, react_jsx_runtime.jsx)("pre", { children: text });
				return (0, react_jsx_runtime.jsxs)("div", {
					className: WorkflowWorkbench_module_css_default.materials,
					children: [
						(0, react_jsx_runtime.jsxs)("small", { children: [
							l("第 "),
							material.check.round,
							" ",
							l(" 轮验收")
						] }),
						material.results.length === 0 && (0, react_jsx_runtime.jsx)("p", { children: l("此检查点没有上游执行结果，请根据验收要求确认是否继续。") }),
						material.results.map((result) => (0, react_jsx_runtime.jsxs)("section", { children: [
							(0, react_jsx_runtime.jsx)("strong", { children: result.subject }),
							(0, react_jsx_runtime.jsx)("p", { children: result.output || l("尚未提交结果说明") }),
							result.commandsRun?.map((command, i) => (0, react_jsx_runtime.jsxs)("p", { children: [
								command.status === "passed" ? l("通过") : l("未通过"),
								" · ",
								command.command,
								command.evidence ? `\n${command.evidence}` : ""
							] }, i)),
							result.acceptanceResults?.map((item, i) => (0, react_jsx_runtime.jsxs)("p", { children: [
								item.status === "passed" ? l("通过") : l("未通过"),
								" · ",
								item.criterion,
								item.evidence ? `\n${item.evidence}` : ""
							] }, i))
						] }, result.id)),
						!!material.files?.artifacts.length && (0, react_jsx_runtime.jsxs)("section", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("相关文件") }), material.files.artifacts.map((file) => (0, react_jsx_runtime.jsxs)("p", { children: [file.path, file.unreadable ? l(" · 无法读取") : !file.present ? l(" · 文件不存在") : ""] }, file.path))] }),
						(0, react_jsx_runtime.jsx)("p", {
							className: WorkflowWorkbench_module_css_default.hint,
							children: workflowMessage(material.limitation ?? "", l)
						}),
						(0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsx)("summary", { children: l("原始证据记录") }), (0, react_jsx_runtime.jsx)("pre", { children: text })] })
					]
				});
			} catch {
				return (0, react_jsx_runtime.jsx)("pre", { children: text });
			}
		}
		function Workbench({ sessionId, teamId, archived = false, waitingCount = 0, openExecution, nativeOnly = false, reviewEntryOnly = false, embeddedContext = false, onNativeContext, openContext, modelDirectory, t, entryTarget, entryDiscussion, initiallyOpen = false, onShowActivity, onClose }) {
			const l = useWorkflowText(t);
			const [opened, setOpened] = (0, react.useState)(initiallyOpen || !!entryTarget);
			const [connectionError, setConnectionError] = (0, react.useState)("");
			const refreshInFlight = (0, react.useRef)(false), mutationInFlight = (0, react.useRef)(false);
			const [showOutcomes, setShowOutcomes] = (0, react.useState)(false);
			const [galleryMode, setGalleryMode] = (0, react.useState)(teamId ? void 0 : "browse");
			const entryOpened = (0, react.useRef)(false);
			const [editing, setEditing] = (0, react.useState)(false);
			const [archiveView, setArchiveView] = (0, react.useState)(archived);
			const [cached] = (0, react.useState)(() => teamId ? viewCache.get(workflowCacheKey(sessionId, teamId, archived)) : void 0);
			const [data, setData] = (0, react.useState)(cached);
			const [revalidating, setRevalidating] = (0, react.useState)(!!cached);
			const [activeId, setActiveId] = (0, react.useState)(teamId);
			const [view, setView] = (0, react.useState)(initialWorkbenchView);
			const viewRef = (0, react.useRef)(view);
			const [error, setError] = (0, react.useState)("");
			const [feedback, setFeedback] = (0, react.useState)("");
			const [reviewDrafts, setReviewDrafts] = (0, react.useState)({});
			const [proposalFocus, setProposalFocus] = (0, react.useState)(0);
			const [attentionFocus, setAttentionFocus] = (0, react.useState)();
			const [mutating, setWorking] = (0, react.useState)(false);
			const working = mutating || revalidating;
			const [saveState, setSaveState] = (0, react.useState)("saved");
			const [storageError, setStorageError] = (0, react.useState)("");
			const loadedDraftScope = (0, react.useRef)();
			const [reviewNotes, setReviewNotes] = (0, react.useState)({});
			const [embeddedDiscussion, setEmbeddedDiscussion] = (0, react.useState)();
			const [pane, setPane] = (0, react.useState)("flow");
			const [name, setName] = (0, react.useState)();
			const [goal, setGoal] = (0, react.useState)("");
			const [zoom, setZoom] = (0, react.useState)(1);
			const [library, setLibrary] = (0, react.useState)("tasks");
			const [panMode, setPanMode] = (0, react.useState)(false);
			const [maximized, setMaximized] = (0, react.useState)(false);
			const [inspectorWidth, setInspectorWidth] = (0, react.useState)(420);
			const [inspectorExpanded, setInspectorExpanded] = (0, react.useState)(false);
			const [inspectorHidden, setInspectorHidden] = (0, react.useState)(true);
			const [positions, setPositions] = (0, react.useState)({});
			const [link, setLink] = (0, react.useState)();
			const suppressNodeClick = (0, react.useRef)(false);
			const suppressPanClick = (0, react.useRef)(false);
			const cancelLink = (0, react.useRef)(void 0);
			const canvas = (0, react.useRef)(null);
			const dialog = (0, react.useRef)(null);
			const mounted = (0, react.useRef)(true);
			const generation = (0, react.useRef)(0);
			const initializedDiscussion = (0, react.useRef)(false);
			const team = data?.team;
			const flow = team ? flowControlState(team) : void 0;
			const selection = view.target;
			const discussion = targetDiscussion(selection);
			const selectedTask = selection.type === "task" || selection.type === "check" ? selection.id : void 0;
			const selectedEdge = selection.type === "edge" ? selection : void 0;
			const editor = !archiveView && editing ? editorTarget(team, selection, true) : void 0;
			const draftId = editor ? editorKey(team?.id ?? "", editor) : void 0;
			const draftEntry = draftId ? view.drafts[draftId] : void 0;
			const draft = draftEntry?.values ?? (editor ? initialEditorDraft(team, editor).values : {});
			const draftStale = !!editor && !!draftEntry && draftEntry.source !== draftSource(team, editor);
			const highlightedTask = selectedTask ?? (discussion.startsWith("check:") ? discussion.slice(6) : discussion.startsWith("task:") ? discussion.slice(5) : void 0);
			const relatedMember = selection.type === "member" ? selection.id : selectedTask ? team?.tasks.find((task) => task.id === selectedTask)?.assignee : discussion.startsWith("member:") ? discussion.slice(7) : void 0;
			const conversation = team?.workflow?.discussions[`discussion:${discussion}`];
			const proposal = conversation?.proposal?.status === "pending" ? conversation.proposal : void 0;
			const reviewingTemplate = discussion === "adapt" && !!proposal;
			const MessageArea = reviewingTemplate ? "details" : "div";
			const reviewTask = discussion.startsWith("check:") ? team?.tasks.find((t) => t.id === discussion.slice(6)) : void 0;
			const reviewScope = `${team?.id}:${reviewTask?.id}:${reviewTask?.checkpoint?.round}`;
			const note = reviewNotes[reviewScope] ?? "";
			const setNote = (value) => setReviewNotes((notes) => ({
				...notes,
				[reviewScope]: value
			}));
			const reviewingCheckpoint = !!reviewTask && !editor && !selectedTask && !selectedEdge;
			const discussionTask = discussion.startsWith("task:") ? team?.tasks.find((t) => t.id === discussion.slice(5) && !t.checkpoint) : void 0;
			const activeTask = team?.tasks.find((t) => t.id === selectedTask);
			const terminalEdit = !!editor && editor.type !== "member" && !!activeTask && canRestartTask(activeTask);
			const member = discussion.startsWith("member:") ? team?.members.find((m) => m.name === discussion.slice(7)) : void 0;
			const defaultPositions = (0, react.useMemo)(() => arrangeTasks(team?.tasks ?? []), [team?.tasks]);
			const taskEditing = !!editor && editor.type !== "member";
			const unsaved = pendingDrafts(team, view.drafts, l);
			const currentDirty = unsaved.some((item) => item.key === draftId);
			const unconfigured = team?.tasks.filter((task) => task.workflowConfigPending) ?? [];
			const taskStatus = (task, _ready) => taskReadiness(team, task, l).label;
			(0, react.useEffect)(() => {
				if (!activeId || !team || team.id !== activeId) return;
				const scope = draftStorageKey(sessionId, activeId);
				if (loadedDraftScope.current !== scope) {
					loadedDraftScope.current = scope;
					try {
						const restored = decodeDrafts(sessionStorage.getItem(scope), activeId);
						updateView((current) => ({
							...current,
							drafts: {
								...restored,
								...current.drafts
							}
						}));
						setStorageError("");
					} catch {
						setStorageError(l("当前浏览器无法保存草稿，刷新前请保存属性。"));
					}
					return;
				}
				try {
					const drafts = Object.fromEntries(pendingDrafts(team, view.drafts, l).map((item) => [item.key, item.entry]));
					if (Object.keys(drafts).length) sessionStorage.setItem(scope, JSON.stringify({
						version: 1,
						drafts
					}));
					else sessionStorage.removeItem(scope);
					setStorageError("");
				} catch {
					setStorageError(l("草稿备份失败，刷新前请保存属性。"));
				}
			}, [
				sessionId,
				activeId,
				team,
				view.drafts
			]);
			(0, react.useEffect)(() => {
				if (!storageError || !unsaved.length) return;
				const warn = (event) => {
					event.preventDefault();
					event.returnValue = "";
				};
				window.addEventListener("beforeunload", warn);
				return () => window.removeEventListener("beforeunload", warn);
			}, [storageError, unsaved.length]);
			(0, react.useEffect)(() => {
				onNativeContext?.(!!data?.currentDiscussion);
			}, [data?.currentDiscussion, onNativeContext]);
			(0, react.useEffect)(() => {
				if (!entryTarget || entryOpened.current || !team) return;
				entryOpened.current = true;
				const task = team.tasks.find((task) => task.id === entryTarget.taskId);
				if (!task) {
					setError(l("节点已不存在，请刷新任务列表"));
					return;
				}
				choose({
					type: task.checkpoint ? "check" : "task",
					id: task.id
				});
				if (entryTarget.rerun && !archiveView && !team.halted && team.phase !== "staged" && !task.checkpoint && [
					"completed",
					"failed",
					"cancelled"
				].includes(task.status)) setEditing(true);
				if (entryTarget.review && task.checkpoint) openReview(task.id);
			}, [team, entryTarget]);
			(0, react.useEffect)(() => {
				if (!entryDiscussion || entryOpened.current || !team) return;
				entryOpened.current = true;
				startEmbedded(entryDiscussion);
			}, [entryDiscussion, team]);
			function updateView(update) {
				const next = update(viewRef.current);
				viewRef.current = next;
				setView(next);
			}
			function choose(target, overrides) {
				updateView((current) => selectWorkbench(current, target, team, overrides));
				setError("");
				setFeedback("");
				setInspectorHidden(false);
				if (target.type === "member") setLibrary("agents");
				if (target.type === "task" || target.type === "check") setLibrary("tasks");
				const graphTarget = target.type === "task" || target.type === "check" || target.type === "edge";
				setPane(graphTarget && !window.matchMedia("(max-width: 900px)").matches ? "flow" : "discussion");
			}
			const selectDiscussion = (key) => choose({
				type: "discussion",
				key
			});
			function focusAttention(selector) {
				setAttentionFocus({
					selector,
					revision: viewRef.current.revision
				});
			}
			(0, react.useLayoutEffect)(() => {
				if (!attentionFocus || attentionFocus.revision !== viewRef.current.revision) return;
				const target = dialog.current?.querySelector(attentionFocus.selector);
				if (!target) return;
				if (target instanceof HTMLDetailsElement) target.open = true;
				target.focus({ preventScroll: true });
				target.scrollIntoView({ block: "nearest" });
				setAttentionFocus(void 0);
			}, [
				attentionFocus,
				view,
				editing,
				data
			]);
			function openProposal(key) {
				setGalleryMode(void 0);
				setOpened(true);
				setEditing(false);
				selectDiscussion(key);
				setProposalFocus((value) => value + 1);
			}
			function closeWorkbench() {
				updateView((current) => ({
					...current,
					revision: current.revision + 1
				}));
				setOpened(false);
				onClose?.();
			}
			function setDraft(update) {
				if (!editor || !draftId) return;
				updateView((current) => {
					const entry = current.drafts[draftId] ?? initialEditorDraft(team, editor);
					return {
						...current,
						drafts: {
							...current.drafts,
							[draftId]: {
								...entry,
								values: typeof update === "function" ? update(entry.values) : update
							}
						}
					};
				});
			}
			function cancelEdit() {
				if (draftId) updateView((current) => {
					const drafts = { ...current.drafts };
					delete drafts[draftId];
					return {
						...current,
						drafts
					};
				});
				selectDiscussion(editor?.type === "member" && editor.id ? `member:${editor.id}` : "graph");
			}
			(0, react.useEffect)(() => {
				mounted.current = true;
				return () => {
					mounted.current = false;
				};
			}, []);
			(0, react.useEffect)(() => {
				setArchiveView(archived);
			}, [archived]);
			(0, react.useEffect)(() => {
				if (!opened) return;
				const previous = document.activeElement;
				const overflow = document.body.style.overflow;
				document.body.style.overflow = "hidden";
				dialog.current?.querySelector("button, input")?.focus();
				return () => {
					document.body.style.overflow = overflow;
					previous?.focus();
				};
			}, [opened]);
			(0, react.useEffect)(() => {
				if (editor && !editor.id) dialog.current?.querySelector("[data-workflow-editor] input:not(:disabled), [data-workflow-editor] textarea")?.focus();
			}, [editor]);
			(0, react.useEffect)(() => {
				if (teamId && teamId !== activeId) {
					setActiveId(teamId);
					setData(void 0);
					updateView((current) => ({
						...initialWorkbenchView(),
						revision: current.revision + 1
					}));
					setPositions({});
					initializedDiscussion.current = false;
					generation.current++;
				}
			}, [sessionId, teamId]);
			const refresh = async (signal) => {
				if (refreshInFlight.current || mutationInFlight.current) return;
				refreshInFlight.current = true;
				const token = generation.current;
				try {
					const result = await request$1({
						sessionId,
						teamId: activeId,
						action: archiveView ? "archive_state" : "state"
					}, signal);
					if (!result) {
						if (mounted.current && !signal?.aborted && token === generation.current) {
							setData(void 0);
							setRevalidating(false);
						}
						return;
					}
					if (mounted.current && !signal?.aborted && token === generation.current) {
						setConnectionError("");
						setError((previous) => previous.startsWith("连接中断") || previous === l("请先重新连接并核对最新状态，再操作流程。") ? "" : previous);
						if (!activeId) setGalleryMode(void 0);
						viewCache.set(workflowCacheKey(sessionId, result.team.id, archiveView), result);
						setData(result);
						setActiveId(result.team.id);
						setRevalidating(false);
						if (!initializedDiscussion.current && result.currentDiscussion) {
							initializedDiscussion.current = true;
							if (!initiallyOpen && viewRef.current.revision === 0) selectDiscussion(result.currentDiscussion);
						}
					}
				} catch (err) {
					if (mounted.current && token === generation.current && activeId) setConnectionError(err instanceof Error ? err.message : String(err));
				} finally {
					refreshInFlight.current = false;
				}
			};
			(0, react.useEffect)(() => {
				if (mutating || !activeId && data) return;
				const controller = new AbortController();
				refresh(controller.signal);
				const reconnect = () => {
					if (!document.hidden) refresh(controller.signal);
				};
				window.addEventListener("online", reconnect);
				document.addEventListener("visibilitychange", reconnect);
				const timer = setInterval(reconnect, 2500);
				return () => {
					controller.abort();
					clearInterval(timer);
					window.removeEventListener("online", reconnect);
					document.removeEventListener("visibilitychange", reconnect);
				};
			}, [
				activeId,
				mutating,
				archiveView
			]);
			async function perform(action, fields = {}) {
				if (revalidating) return;
				if (archiveView && action !== "restore_archive") {
					setError(l("请先恢复归档，再修改或重新执行。"));
					return;
				}
				if (mutationInFlight.current) return;
				if (connectionError) {
					setError(l("请先重新连接并核对最新状态，再操作流程。"));
					return;
				}
				mutationInFlight.current = true;
				setWorking(true);
				const saving = action === "edit" || action === "layout";
				if (saving) setSaveState("saving");
				setError("");
				setFeedback("");
				const token = ++generation.current;
				try {
					const result = await request$1({
						sessionId,
						teamId: activeId,
						discussion,
						action,
						...fields
					});
					if (!result) {
						if (saving) setSaveState("error");
						return;
					}
					if (saving) setSaveState("saved");
					if (action === "restore_archive") {
						setArchiveView(false);
						setEditing(false);
						setFeedback(l("已恢复为待确认流程。已完成成果保留；确认成员配置并启动后，可修改和重跑。"));
					}
					if (result.activity) publishWorkflowActivity(result.activity);
					if (mounted.current && token === generation.current) {
						viewCache.set(workflowCacheKey(sessionId, result.team.id, action === "restore_archive" ? false : archiveView), result);
						setData(result);
						setActiveId(result.team.id);
					}
					return result;
				} catch (err) {
					if (mounted.current) {
						setError(err instanceof Error ? err.message : String(err));
						if (err instanceof Error && err.message.startsWith("连接中断")) setConnectionError(err.message);
						if (saving) setSaveState("error");
					}
					return;
				} finally {
					mutationInFlight.current = false;
					if (mounted.current) setWorking(false);
				}
			}
			async function createFlow() {
				const created = await perform("create", {
					name: name ?? l("新团队"),
					description: goal
				});
				if (created) await startEmbedded("graph", created.team.id);
			}
			async function saveEdit(operations, title, finishEditing = false) {
				if (finishEditing && draftStale) {
					setError(l("当前对象已变化。草稿已保留，请先核对最新资料，或点击「重新载入」后编辑。"));
					return;
				}
				const revision = viewRef.current.revision, submitted = draftId && editor ? viewRef.current.drafts[draftId] ?? initialEditorDraft(team, editor) : void 0;
				const result = await perform("edit", {
					operations,
					title,
					base: data?.base,
					positions: Object.fromEntries(team?.tasks.map((task) => [task.id, pos(task.id)]) ?? [])
				});
				if (result && finishEditing) {
					let nextTarget;
					if (editor?.id && (editor.type === "member" ? !result.team.members.some((m) => m.name === editor.id && m.status !== "removed") : !result.team.tasks.some((task) => task.id === editor.id))) nextTarget = {
						type: "discussion",
						key: "graph"
					};
					if (editor && !editor.id) if (editor.type === "member") {
						const added = operations.find((op) => op.action === "add_member");
						if (added?.action === "add_member") nextTarget = {
							type: "member",
							id: added.name.trim()
						};
					} else {
						const added = result.team.tasks.find((task) => !team?.tasks.some((old) => old.id === task.id));
						if (added) nextTarget = {
							type: added.checkpoint ? "check" : "task",
							id: added.id
						};
					}
					updateView((current) => finishWorkbenchSave(current, draftId, submitted, revision, result.team, nextTarget, editor));
					if (viewRef.current.revision === revision) setFeedback(draftId && viewRef.current.drafts[draftId] ? l("已保存本次提交；后续修改仍为草稿。") : l("已保存。"));
				}
				return result;
			}
			async function saveAllProperties() {
				if (!team || working || archiveView) return;
				const submitted = pendingDrafts(team, viewRef.current.drafts, l), revision = viewRef.current.revision;
				if (!submitted.length) return;
				try {
					if (submitted.length > 50) throw new Error(l("一次最多保存 50 个对象，请先逐项保存部分草稿。"));
					const result = await saveEdit(submitted.map((item) => propertyOperation(team, item.target, item.entry)), l("保存全部属性草稿"));
					if (!result) return;
					updateView((current) => {
						let next = current;
						for (const item of submitted) next = finishWorkbenchSave(next, item.key, item.entry, revision, result.team, void 0, item.target);
						if (current.revision === revision && selection.type === "member" && !selection.id) {
							const added = submitted.find((item) => item.target.type === "member" && !item.target.id);
							if (added) next = selectWorkbench(next, {
								type: "member",
								id: added.entry.values["name"].trim()
							}, result.team);
						}
						return next;
					});
					setFeedback(l("本次提交的属性已保存；待配置节点仍需单独完成配置，任务不会自动重跑。"));
				} catch (err) {
					setError(err instanceof Error ? err.message : String(err));
				}
			}
			function scrollToTask(id) {
				requestAnimationFrame(() => {
					const p = pos(id);
					canvas.current?.scrollTo({
						left: Math.max(0, p.x * zoom - 48),
						top: Math.max(0, p.y * zoom - 48),
						behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
					});
				});
			}
			function locateTask(id, focusField, focusSection = "[data-task-heading]") {
				setShowOutcomes(false);
				const task = team?.tasks.find((item) => item.id === id);
				if (!task) return;
				setGalleryMode(void 0);
				setOpened(true);
				choose({
					type: task.checkpoint ? "check" : "task",
					id
				});
				scrollToTask(id);
				focusAttention(focusField ? "[data-workflow-editor] [data-field=\"" + focusField + "\"] :is(input,textarea)" : focusSection);
			}
			function renderReadiness(task) {
				if (!team) return null;
				const state = taskReadiness(team, task, l, data?.execution?.[task.id]);
				const labels = {
					path: "运行到此节点",
					review: "打开验收",
					edit: "完善节点配置",
					rerun: "修改并重跑",
					continue: "继续此任务",
					stop: "重试停止",
					member: "调整负责人"
				};
				const action = state.action;
				const run = () => {
					if (action === "review") openReview(task.id);
					else if (action === "edit" || action === "rerun" || action === "member") edit(task.checkpoint ? "check" : "task", task.id);
					else if (action === "continue") perform(task.checkpoint ? "resume_task" : "continue_task", {
						taskId: task.id,
						base: data?.base
					});
					else if (action === "path") perform("start_path", {
						taskId: task.id,
						base: data?.base
					});
					else if (action === "stop") perform("stop_task", { taskId: task.id });
				};
				return (0, react_jsx_runtime.jsxs)("section", {
					className: WorkflowWorkbench_module_css_default.readiness,
					"aria-label": l("阻塞原因与下一步"),
					children: [
						(0, react_jsx_runtime.jsx)("strong", { children: state.label }),
						(0, react_jsx_runtime.jsx)("p", { children: state.detail }),
						action && !(action === "path" && task.workflowRerunRequired) && !(action === "review" && reviewingCheckpoint) && !archiveView && (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: working || !!unsaved.length || !!connectionError,
							onClick: run,
							children: l(labels[action])
						}),
						task.status === "pending" && canRestartTask(task) && !archiveView && !team.halted && (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: working || !!unsaved.length,
							onClick: () => edit("task", task.id),
							children: l("修改并重跑")
						}),
						state.dependencies.map((id) => (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => locateTask(id),
							children: [l("定位 · "), team.tasks.find((item) => item.id === id)?.subject ?? id]
						}, id))
					]
				});
			}
			function renderRerunPath(task) {
				if (!team || archiveView || !task.workflowRerunRequired) return null;
				let path = [], issue = "";
				try {
					path = rerunPath(team.tasks, task.id).filter((item) => item.workflowRerunRequired);
					resumeRerunPath(structuredClone(team), task.id);
				} catch (error) {
					issue = error instanceof Error ? error.message : String(error);
				}
				return (0, react_jsx_runtime.jsxs)("section", {
					className: WorkflowWorkbench_module_css_default.readiness,
					"data-rerun-path": true,
					tabIndex: -1,
					"aria-label": l("重跑路径"),
					children: [
						(0, react_jsx_runtime.jsx)("strong", { children: l("从上游运行到此节点") }),
						(0, react_jsx_runtime.jsx)("p", { children: path.map((item) => item.subject).join(" → ") }),
						(0, react_jsx_runtime.jsx)("p", { children: l("按依赖顺序执行，独立分支可并行；经过人工检查时等待你确认，确认后继续。不会启动目标之外的其他待重跑分支。") }),
						issue && (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							children: workflowMessage(issue, l)
						}),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: working || !!unsaved.length || !!issue,
							title: unsaved.length ? l("请先保存属性草稿") : void 0,
							onClick: () => void perform("resume_rerun_path", {
								taskId: task.id,
								base: data?.base
							}),
							children: l("运行到此节点")
						})
					]
				});
			}
			function renderTaskControl(task) {
				if (!team || archiveView) return null;
				const control = taskControlState(team, {
					...task,
					workflowAwaitingStart: awaitsFirstStart(task)
				});
				if (control.canRerun) return (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					"data-node-rerun": true,
					disabled: working,
					onPointerDown: (event) => event.stopPropagation(),
					onClick: (event) => {
						event.stopPropagation();
						edit("task", task.id);
					},
					children: l("修改并重跑")
				});
				if (control.terminal || control.disabled) return null;
				const label = t ? t(control.actionLabel) : l(zh[control.actionLabel]);
				return (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					"data-node-playback": true,
					disabled: working || unsaved.some((item) => item.target.id === task.id),
					"aria-label": `${label} · ${task.subject}`,
					title: l(zh["task.control.hint"]),
					onPointerDown: (event) => event.stopPropagation(),
					onClick: (event) => {
						event.stopPropagation();
						perform("set_task_enabled", {
							taskId: task.id,
							enabled: control.stopping ? false : !control.checked,
							updatedAt: task.updatedAt
						});
					},
					children: label
				});
			}
			async function startEmbedded(key, targetId = activeId, fresh = false) {
				selectDiscussion(key);
				const revision = viewRef.current.revision;
				const result = await perform("open_discussion", {
					discussion: key,
					teamId: targetId,
					fresh
				});
				if (revision !== viewRef.current.revision) return;
				if (result?.openedSessionId && result.openedSessionId.startsWith("session-at-discussion-") && result.openedSessionId !== team?.captainSessionId) setEmbeddedDiscussion(key);
				else if (result) setError(l("宿主未返回独立讨论会话"));
			}
			function prepareDiscussion(name) {
				startEmbedded(`member:${name}`, activeId);
			}
			async function deleteEdge() {
				const target = team?.tasks.find((task) => task.id === selectedEdge?.to);
				if (!target || !selectedEdge || working || archiveView || !editing) return;
				const revision = viewRef.current.revision;
				if (await saveEdit([{
					action: "update_task",
					id: target.id,
					dependencies: target.dependencies.filter((id) => id !== selectedEdge.from)
				}], l("删除任务交接")) && revision === viewRef.current.revision) selectDiscussion("graph");
			}
			async function deleteNode(id) {
				if (!team || working || archiveView || !editing) return;
				const updates = team.tasks.filter((task) => task.dependencies.includes(id)).map((task) => ({
					action: "update_task",
					id: task.id,
					dependencies: task.dependencies.filter((dep) => dep !== id)
				}));
				updates.push({
					action: "remove_task",
					id
				});
				const revision = viewRef.current.revision;
				if (await perform("edit", {
					operations: updates,
					title: l("删除节点及其连接"),
					base: data?.base,
					positions: Object.fromEntries(team.tasks.map((task) => [task.id, pos(task.id)]))
				})) {
					updateView((current) => {
						const drafts = { ...current.drafts };
						delete drafts[editorKey(team.id, {
							type: "task",
							id
						})];
						delete drafts[editorKey(team.id, {
							type: "check",
							id
						})];
						return {
							...current,
							drafts
						};
					});
					if (revision === viewRef.current.revision) selectDiscussion("graph");
				}
			}
			function beginNodeDrag(event, task) {
				suppressNodeClick.current = false;
				if (panMode || event.button !== 0 || working || archiveView || !editing || event.target.closest("[data-connection-handle]")) return;
				const target = event.currentTarget, start = point(event), original = pos(task.id);
				let last = original, moved = false;
				target.setPointerCapture(event.pointerId);
				const cleanup = () => {
					target.onpointermove = null;
					target.onpointerup = null;
					target.onpointercancel = null;
					if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
				};
				target.onpointermove = (move) => {
					const at = point(move);
					if (!moved && Math.hypot(at.x - start.x, at.y - start.y) < 4 / zoom) return;
					if (!moved) edit(task.checkpoint ? "check" : "task", task.id);
					moved = true;
					suppressNodeClick.current = true;
					last = {
						x: Math.min(1e4, Math.max(0, original.x + at.x - start.x)),
						y: Math.min(1e4, Math.max(0, original.y + at.y - start.y))
					};
					setPositions((prev) => ({
						...prev,
						[task.id]: last
					}));
				};
				target.onpointerup = () => {
					cleanup();
					if (moved) perform("layout", {
						taskId: task.id,
						...last
					}).then(() => setPositions((prev) => {
						const next = { ...prev };
						delete next[task.id];
						return next;
					}));
				};
				target.onpointercancel = () => {
					cleanup();
					suppressNodeClick.current = false;
					setPositions((prev) => {
						const next = { ...prev };
						delete next[task.id];
						return next;
					});
				};
			}
			function edit(type, id, overrides) {
				if (!archiveView) setEditing(true);
				choose({
					type,
					id
				}, overrides);
			}
			const field = (key, label, multiline = false) => (0, react_jsx_runtime.jsxs)("label", {
				"data-field": key,
				children: [label, multiline ? (0, react_jsx_runtime.jsx)("textarea", {
					required: key === "summary" && !editor?.id || key === "description" && !!activeTask?.workflowConfigPending || key === "rerunInstructions",
					value: draft[key] ?? "",
					onChange: (e) => setDraft({
						...draft,
						[key]: e.target.value
					})
				}) : (0, react_jsx_runtime.jsx)("input", {
					required: key === "name" || key === "subject" || key === "summary" && !editor?.id,
					value: draft[key] ?? "",
					disabled: key === "name" && (!!editor?.id || working),
					onChange: (e) => setDraft({
						...draft,
						[key]: e.target.value
					})
				})]
			});
			function pos(id) {
				return positions[id] ?? team?.workflow?.positions[`task:${id}`] ?? defaultPositions[id] ?? {
					x: 32,
					y: 32
				};
			}
			function point(event) {
				const bounds = canvas.current.getBoundingClientRect();
				return {
					x: (event.clientX - bounds.left + canvas.current.scrollLeft) / zoom,
					y: (event.clientY - bounds.top + canvas.current.scrollTop) / zoom
				};
			}
			const draftPosition = editor?.id ? pos(editor.id) : {
				x: 32,
				y: Math.max(-128, ...team?.tasks.map((t) => pos(t.id).y) ?? []) + 160
			};
			const graphWidth = Math.max(580, ...team?.tasks.map((t) => pos(t.id).x + 265) ?? [], taskEditing ? draftPosition.x + 265 : 0);
			const graphHeight = Math.max(260, ...team?.tasks.map((t) => pos(t.id).y + 170) ?? [], taskEditing ? draftPosition.y + 170 : 0);
			function fitCanvas() {
				if (!canvas.current) return;
				setZoom(fitGraph(canvas.current.clientWidth, canvas.current.clientHeight, graphWidth, graphHeight));
				canvas.current.scrollTo(0, 0);
			}
			function changeZoom(value, clientX, clientY) {
				const viewport = canvas.current;
				if (!viewport) return;
				const bounds = viewport.getBoundingClientRect(), next = clampZoom(value);
				const x = clientX === void 0 ? viewport.clientWidth / 2 : clientX - bounds.left;
				const y = clientY === void 0 ? viewport.clientHeight / 2 : clientY - bounds.top;
				const left = (viewport.scrollLeft + x) * next / zoom - x;
				const top = (viewport.scrollTop + y) * next / zoom - y;
				setZoom(next);
				requestAnimationFrame(() => viewport.scrollTo(Math.max(0, left), Math.max(0, top)));
			}
			(0, react.useEffect)(() => {
				const viewport = canvas.current;
				if (!opened || !viewport) return;
				const wheel = (event) => {
					if (event.deltaY === 0) return;
					event.preventDefault();
					const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1);
					changeZoom(zoom * Math.exp(-Math.max(-120, Math.min(120, pixels)) * .002), event.clientX, event.clientY);
				};
				viewport.addEventListener("wheel", wheel, { passive: false });
				return () => viewport.removeEventListener("wheel", wheel);
			}, [
				opened,
				zoom,
				!!team
			]);
			(0, react.useLayoutEffect)(() => {
				const measured = Array.from(canvas.current?.querySelectorAll("[data-canvas-node]") ?? []).map((node) => {
					const style = getComputedStyle(node);
					return {
						node,
						side: style.borderLeftWidth,
						top: style.borderTopWidth
					};
				});
				for (const { node, side, top } of measured) {
					node.style.setProperty("--node-side-border", side);
					node.style.setProperty("--node-top-border", top);
				}
			}, [
				opened,
				zoom,
				team?.tasks
			]);
			function beginPan(event) {
				if (event.button !== 0 && event.button !== 1) return;
				const blank = event.target === event.currentTarget || event.target.classList.contains(WorkflowWorkbench_module_css_default.plane);
				if (event.button !== 1 && !panMode && !blank && editing && !archiveView) return;
				if (event.target.closest("[data-connection-handle], [data-node-playback], [data-node-rerun]")) return;
				const immediate = blank || panMode || event.button === 1;
				if (immediate) {
					event.preventDefault();
					event.stopPropagation();
				}
				const target = event.currentTarget, x = event.clientX, y = event.clientY;
				const left = target.scrollLeft, top = target.scrollTop;
				let moved = false;
				suppressPanClick.current = false;
				if (immediate) target.setPointerCapture(event.pointerId);
				target.onpointermove = (move) => {
					if (!moved && Math.hypot(move.clientX - x, move.clientY - y) <= 4) return;
					if (!moved) {
						moved = true;
						target.setPointerCapture(event.pointerId);
						target.dataset.dragging = "true";
					}
					move.preventDefault();
					suppressPanClick.current = true;
					target.scrollTo(left - move.clientX + x, top - move.clientY + y);
				};
				const cleanup = () => {
					target.onpointermove = null;
					target.onpointerup = null;
					target.onpointercancel = null;
					delete target.dataset.dragging;
					if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
				};
				target.onpointerup = () => {
					cleanup();
					if (moved || !blank || panMode) return;
					updateView((current) => selectWorkbench(current, {
						type: "discussion",
						key: "graph"
					}, team));
					setPane("flow");
					setInspectorHidden(true);
					setError("");
					setFeedback("");
				};
				target.onpointercancel = () => {
					cleanup();
					suppressPanClick.current = false;
				};
			}
			function resizeInspector(event) {
				if (event.button !== 0) return;
				event.preventDefault();
				const target = event.currentTarget, right = target.parentElement.getBoundingClientRect().right;
				setInspectorExpanded(false);
				target.setPointerCapture(event.pointerId);
				target.onpointermove = (move) => setInspectorWidth(Math.max(300, Math.min(720, right - move.clientX)));
				const cleanup = () => {
					target.onpointermove = null;
					target.onpointerup = null;
					target.onpointercancel = null;
					if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
				};
				target.onpointerup = cleanup;
				target.onpointercancel = cleanup;
			}
			async function arrangeCanvas() {
				if (!team || working || archiveView) return;
				if (await perform("layout", { positions: defaultPositions })) {
					setPositions({});
					setFeedback(l("已按任务依赖整理布局。"));
				}
			}
			async function createNode(type) {
				if (!team || working || archiveView) return;
				const revision = viewRef.current.revision;
				const label = type === "check" ? l("人工检查") : l("新任务");
				let number = team.tasks.length + 1;
				while (team.tasks.some((task) => task.subject === `${label} ${number}`)) number++;
				const result = await saveEdit([{
					action: "add_task",
					subject: `${label} ${number}`,
					checkpoint: type === "check",
					configurationPending: true,
					dependencies: []
				}], l("创建{0}", label));
				if (!result || revision !== viewRef.current.revision) return;
				const added = result.team.tasks.find((task) => !team.tasks.some((old) => old.id === task.id));
				if (!added) return;
				setEditing(true);
				setPanMode(false);
				updateView((current) => selectWorkbench(current, {
					type,
					id: added.id
				}, result.team));
				setLibrary("tasks");
				setPane(window.matchMedia("(max-width: 900px)").matches ? "discussion" : "flow");
				setInspectorHidden(false);
				setFeedback(l("节点已保存，可直接连线；填写要求并完成配置前不会执行或进入验收。"));
				requestAnimationFrame(() => {
					const p = result.team.workflow?.positions[`task:${added.id}`];
					if (p) canvas.current?.scrollTo({
						left: Math.max(0, p.x * zoom - 48),
						top: Math.max(0, p.y * zoom - 48),
						behavior: "smooth"
					});
				});
			}
			async function openReview(id) {
				setShowOutcomes(false);
				setGalleryMode(void 0);
				setEditing(false);
				setOpened(true);
				setInspectorWidth((width) => Math.max(width, 640));
				selectDiscussion(`check:${id}`);
				scrollToTask(id);
				focusAttention("[data-review-heading]");
				if (!archiveView && data?.ready.includes(id)) await perform("materials", { discussion: `check:${id}` });
			}
			function renderProposalReview() {
				if (!proposal || !team || !data) return null;
				return (0, react_jsx_runtime.jsx)(ProposalReview, {
					team,
					proposal,
					base: data.base,
					busy: working,
					fixedStructure: discussion === "adapt",
					focusRequest: proposalFocus,
					draft: reviewDrafts[proposal.id],
					onChange: (draft) => setReviewDrafts((prev) => ({
						...prev,
						[proposal.id]: draft
					})),
					onApply: (operations) => {
						perform("apply", {
							proposalId: proposal.id,
							operations
						}).then((result) => {
							if (result) setFeedback(l("修改已应用，可继续讨论。"));
						});
					},
					onDismiss: () => void perform("dismiss", { proposalId: proposal.id }).then((result) => {
						if (result) setFeedback(l("修改已放弃，可以继续讨论。"));
					})
				}, proposal.id);
			}
			const pendingProposals = Object.entries(team?.workflow?.discussions ?? {}).filter(([key, item]) => !archiveView && key.startsWith("discussion:") && item.proposal?.status === "pending").map(([, item]) => item);
			const pendingCount = pendingProposals.length;
			const pendingNotice = pendingCount > 0 && (0, react_jsx_runtime.jsxs)("div", {
				className: WorkflowWorkbench_module_css_default.pendingNotice,
				role: "status",
				children: [
					(0, react_jsx_runtime.jsxs)("strong", { children: [
						l("有 "),
						pendingCount,
						" ",
						l(" 项修改等待确认")
					] }),
					pendingProposals.map((item) => (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => openProposal(item.key),
						children: [l("查看并决定 · "), item.proposal.title]
					}, item.key)),
					!!editor && (0, react_jsx_runtime.jsx)("small", { children: l("切换查看会保留当前草稿。") })
				]
			});
			const reviewCount = archiveView ? 0 : data?.ready.length ?? waitingCount;
			const reviewNotice = !archiveView && !!data?.ready.length && (0, react_jsx_runtime.jsxs)("div", {
				className: WorkflowWorkbench_module_css_default.reviewNotice,
				role: "status",
				"aria-label": l("等待你验收"),
				children: [
					(0, react_jsx_runtime.jsxs)("strong", { children: [(0, react_jsx_runtime.jsx)("span", {
						className: WorkflowWorkbench_module_css_default.reviewDot,
						"aria-hidden": true
					}), l("等待你验收")] }),
					data.ready.map((id) => (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: working,
						onClick: () => void openReview(id),
						children: [
							l("验收 · "),
							team?.tasks.find((t) => t.id === id)?.subject,
							" ↗"
						]
					}, id)),
					!reviewEntryOnly && (0, react_jsx_runtime.jsx)("small", { children: l("上游已完成 · 打开验收工作台核对证据") })
				]
			});
			const adaptation = pendingProposals.find((item) => item.key === "adapt" && item.proposal?.base === data?.base)?.proposal;
			const proposedTasks = new Set(adaptation?.operations.flatMap((op) => op.action === "update_task" ? [op.id] : []));
			const attention = [
				...(archiveView ? [] : team?.tasks.filter((task) => task.checkpoint?.decision === "reject") ?? []).map((task) => ({
					key: "rejected:" + task.id,
					label: l("安排返工 · {0}", task.subject),
					open: () => void openReview(task.id)
				})),
				...pendingProposals.map((item) => ({
					key: "proposal:" + item.key,
					label: l("确认方案 · {0}", item.proposal.title),
					open: () => openProposal(item.key)
				})),
				...(archiveView ? [] : data?.ready ?? []).map((id) => ({
					key: "review:" + id,
					label: l("验收 · {0}", team?.tasks.find((task) => task.id === id)?.subject ?? id),
					open: () => void openReview(id)
				})),
				...(archiveView ? [] : unconfigured.filter((task) => !proposedTasks.has(task.id))).map((task) => ({
					key: "configure:" + task.id,
					label: l("配置 · {0}", task.subject),
					open: () => {
						setEditing(true);
						locateTask(task.id, task.adaptationIssue?.trim() ? "adaptationIssue" : "subject");
					}
				})),
				...(archiveView ? [] : team?.tasks.filter((task) => task.workflowRerunRequired && !task.workflowConfigPending) ?? []).map((task) => ({
					key: "rerun:" + task.id,
					label: l("查看重跑路径 · {0}", task.subject),
					open: () => {
						setEditing(false);
						locateTask(task.id, void 0, "[data-rerun-path]");
					}
				})),
				...(archiveView || team?.halted ? [] : team?.tasks.filter((task) => task.status === "failed" && !task.workflowRerunRequired && !task.workflowConfigPending) ?? []).map((task) => ({
					key: "failure:" + task.id,
					label: l("查看失败任务 · {0}", task.subject),
					open: () => {
						setEditing(false);
						locateTask(task.id, void 0, "[data-task-record]");
					}
				}))
			];
			const blockers = archiveView ? [] : (team?.tasks ?? []).filter((task) => task.status !== "completed").map((task) => ({
				task,
				state: taskReadiness(team, task, l, data?.execution?.[task.id])
			})).filter(({ task, state }) => state.action || state.dependencies.length || task.workflowPaused || task.workflowRerunRequired);
			const firstAction = attention[0];
			const completed = team?.tasks.filter((task) => task.status === "completed").length ?? 0;
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [!initiallyOpen && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				data?.currentDiscussion && team && (0, react_jsx_runtime.jsxs)("div", {
					className: WorkflowWorkbench_module_css_default.nativeBanner,
					children: [(0, react_jsx_runtime.jsxs)("span", { children: [
						data.currentDiscussion.startsWith("check:") ? l("独立验收对话") : l("独立配置对话"),
						" · ",
						team.name
					] }), (0, react_jsx_runtime.jsx)("button", {
						className: WorkflowWorkbench_module_css_default.entry,
						onClick: () => void openExecution?.(team.captainSessionId, team.captainSessionId),
						children: l("返回团队对话 ↗")
					})]
				}),
				(0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: `${WorkflowWorkbench_module_css_default.entry} ${nativeOnly ? WorkflowWorkbench_module_css_default.compact : WorkflowWorkbench_module_css_default.launcher}`,
					"aria-haspopup": "dialog",
					onClick: () => setOpened(true),
					children: [
						(0, react_jsx_runtime.jsxs)("strong", { children: [(0, react_jsx_runtime.jsxs)("span", {
							className: WorkflowWorkbench_module_css_default.iconLabel,
							children: [(0, react_jsx_runtime.jsx)(BrandIcon, { size: 20 }), "Teamflow"]
						}), (0, react_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "↗"
						})] }),
						!nativeOnly && (0, react_jsx_runtime.jsxs)("span", { children: [archiveView ? l("归档画布 · ") : "", team?.name ?? (activeId ? l("查看成员、任务交接与人工检查") : l("讨论目标，创建初步团队"))] }),
						pendingCount > 0 && (0, react_jsx_runtime.jsxs)("span", { children: [
							pendingCount,
							" ",
							l(" 项修改待确认")
						] }),
						reviewCount > 0 && (0, react_jsx_runtime.jsxs)("span", { children: [
							reviewCount,
							" ",
							l(" 项等待人工验收")
						] })
					]
				}),
				!nativeOnly && !reviewEntryOnly && !archiveView && team?.phase === "staged" && (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${WorkflowWorkbench_module_css_default.entry} ${WorkflowWorkbench_module_css_default.startEntry}`,
					disabled: working || unsaved.length > 0 || unconfigured.length > 0 || pendingCount > 0,
					title: unsaved.length ? l("请先保存属性草稿") : unconfigured.length ? l("请先完成待配置节点") : pendingCount ? l("请先处理待确认的修改") : void 0,
					onClick: () => void perform("start"),
					children: l("确认并启动团队")
				}),
				!opened && !nativeOnly && !reviewEntryOnly && pendingNotice,
				error && !opened && (0, react_jsx_runtime.jsx)("div", {
					className: WorkflowWorkbench_module_css_default.error,
					role: "alert",
					children: workflowMessage(error, l)
				}),
				!nativeOnly && reviewNotice,
				nativeOnly && data?.currentDiscussion && openContext && (0, react_jsx_runtime.jsx)("button", {
					className: `${WorkflowWorkbench_module_css_default.entry} ${WorkflowWorkbench_module_css_default.compact}`,
					onClick: openContext,
					children: proposal ? l("查看待确认修改 ↗") : l("团队与讨论资料 ↗")
				}),
				embeddedContext && team && (0, react_jsx_runtime.jsxs)("section", {
					className: WorkflowWorkbench_module_css_default.contextPanel,
					"aria-label": l("讨论资料"),
					children: [
						(0, react_jsx_runtime.jsxs)("header", { children: [(0, react_jsx_runtime.jsx)("strong", { children: l("讨论资料") }), (0, react_jsx_runtime.jsx)("span", { children: l("当前已保存的信息") })] }),
						(0, react_jsx_runtime.jsxs)("label", { children: [l("查看对象"), (0, react_jsx_runtime.jsxs)("select", {
							value: discussion,
							onChange: (event) => selectDiscussion(event.target.value),
							children: [
								(0, react_jsx_runtime.jsx)("option", {
									value: "graph",
									children: l("团队与流程")
								}),
								team.members.filter((m) => m.status !== "removed").map((m) => (0, react_jsx_runtime.jsx)("option", {
									value: `member:${m.name}`,
									children: m.name
								}, m.name)),
								team.tasks.map((t) => (0, react_jsx_runtime.jsxs)("option", {
									value: `${t.checkpoint ? "check" : "task"}:${t.id}`,
									children: [
										t.checkpoint ? l("验收") : l("任务"),
										" · ",
										t.subject
									]
								}, t.id))
							]
						})] }),
						feedback && (0, react_jsx_runtime.jsx)("p", {
							role: "status",
							children: workflowMessage(feedback, l)
						}),
						conversation?.materials && (0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsx)("summary", { children: l("本轮验收证据") }), (0, react_jsx_runtime.jsx)(ReviewMaterials, { text: conversation.materials })] }),
						proposal && !opened && (0, react_jsx_runtime.jsxs)("section", {
							className: WorkflowWorkbench_module_css_default.contextProposal,
							"aria-label": l("待确认修改"),
							children: [renderProposalReview(), (0, react_jsx_runtime.jsx)("button", {
								onClick: () => {
									setPane("discussion");
									setOpened(true);
								},
								children: l("在画布查看 ↗")
							})]
						}),
						(0, react_jsx_runtime.jsx)(WorkflowContext, {
							team,
							discussion,
							onSelect: selectDiscussion,
							openExecution
						})
					]
				})
			] }), opened && (0, react_dom.createPortal)((0, react_jsx_runtime.jsxs)("section", {
				ref: dialog,
				className: WorkflowWorkbench_module_css_default.workbench,
				style: {
					"--wb-node-width": `225px`,
					"--wb-port-y": `55px`
				},
				"data-live": !archiveView,
				"data-maximized": maximized,
				"data-editing": !!editor || !!selectedEdge || !!activeTask,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": l("TeamFlow 编排工作台"),
				onKeyDown: (event) => {
					if (!galleryMode && !showOutcomes && !archiveView && editing && (event.key === "Delete" || event.key === "Backspace") && (selectedEdge || selectedTask) && !event.target.closest("input,textarea,select,[contenteditable=\"true\"]")) {
						event.preventDefault();
						if (selectedEdge) deleteEdge();
						else if (selectedTask) deleteNode(selectedTask);
						return;
					}
					if (event.key === "Escape") {
						if (cancelLink.current) {
							cancelLink.current();
							return;
						}
						if (editor) {
							setEditing(false);
							setFeedback(l("已退出编辑，未保存的草稿已保留。"));
						} else closeWorkbench();
					}
					if (event.key === "Tab") {
						const scope = dialog.current;
						const items = [...scope?.querySelectorAll("button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), summary, [tabindex=\"0\"]") ?? []].filter((el) => el.getClientRects().length);
						const first = items[0], last = items.at(-1);
						if (event.shiftKey && (document.activeElement === first || !scope?.contains(document.activeElement))) {
							event.preventDefault();
							last?.focus();
						} else if (!event.shiftKey && document.activeElement === last) {
							event.preventDefault();
							first?.focus();
						}
					}
				},
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: WorkflowWorkbench_module_css_default.header,
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: WorkflowWorkbench_module_css_default.title,
							children: [(0, react_jsx_runtime.jsx)(BrandIcon, { size: 32 }), (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: team?.name ?? "Teamflow" }), (0, react_jsx_runtime.jsxs)("span", { children: [archiveView ? l("归档画布 · 成果与详情完整保留") : team?.phase === "staged" ? l("准备流程 · 确认后开始执行") : l("团队工作台"), !!team?.tasks.length && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [" · ", l("已完成 {0}/{1}", completed, team.tasks.length)] })] })] })]
						}), (0, react_jsx_runtime.jsxs)("div", { children: [
							team && !galleryMode && !showOutcomes && (archiveView ? (0, react_jsx_runtime.jsxs)("button", {
								className: WorkflowWorkbench_module_css_default.primary,
								disabled: working,
								onClick: () => void perform("restore_archive"),
								children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "edit" }), l("恢复并编辑流程")]
							}) : (0, react_jsx_runtime.jsxs)("button", {
								"aria-pressed": editing,
								onClick: () => {
									setEditing(!editing);
									updateView((current) => ({
										...current,
										revision: current.revision + 1
									}));
								},
								children: [editing ? (0, react_jsx_runtime.jsx)(IconBranchOutline16, {}) : (0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "edit" }), editing ? l("查看流程") : l("编辑流程")]
							})),
							!galleryMode && !showOutcomes && !archiveView && team?.phase === "staged" && (0, react_jsx_runtime.jsx)("button", {
								className: WorkflowWorkbench_module_css_default.primary,
								disabled: working || unsaved.length > 0 || unconfigured.length > 0 || pendingCount > 0,
								title: unsaved.length ? l("请先保存属性草稿") : unconfigured.length ? l("请先完成待配置节点") : pendingCount ? l("请先处理待确认的修改") : void 0,
								onClick: () => void perform("start"),
								children: l("确认并启动")
							}),
							!galleryMode && !showOutcomes && !archiveView && team?.phase !== "staged" && team && !team.halted && (0, react_jsx_runtime.jsxs)("span", {
								"data-flow-controls": true,
								title: l(zh["flow.control.hint"]),
								children: [(0, react_jsx_runtime.jsx)("button", {
									disabled: working || unsaved.length > 0 || !flow?.canStart,
									onClick: () => void perform("set_flow_enabled", {
										enabled: true,
										version: flowControlVersion(team)
									}),
									children: l("开始全部")
								}), (0, react_jsx_runtime.jsx)("button", {
									disabled: working || !flow?.canPause,
									onClick: () => void perform("set_flow_enabled", {
										enabled: false,
										version: flowControlVersion(team)
									}),
									children: l("暂停全部")
								})]
							}),
							onShowActivity && (0, react_jsx_runtime.jsx)("button", {
								onClick: onShowActivity,
								children: l("团队活动与历史")
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								"aria-pressed": maximized,
								onClick: () => setMaximized(!maximized),
								children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "expand" }), maximized ? l("退出全屏") : l("全屏")]
							}),
							(0, react_jsx_runtime.jsx)("button", {
								onClick: closeWorkbench,
								"aria-label": l("关闭编排工作台"),
								children: l("关闭")
							})
						] })]
					}),
					(0, react_jsx_runtime.jsxs)("nav", {
						className: WorkflowWorkbench_module_css_default.pageTabs,
						"aria-label": l("Teamflow 页面"),
						children: [
							(0, react_jsx_runtime.jsxs)("button", {
								"aria-pressed": !galleryMode && !showOutcomes,
								onClick: () => {
									setGalleryMode(void 0);
									setShowOutcomes(false);
								},
								children: [(0, react_jsx_runtime.jsx)(BrandIcon, {}), team ? l("当前流程") : l("从零创建")]
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								hidden: !team,
								"aria-pressed": showOutcomes,
								onClick: () => {
									setGalleryMode(void 0);
									setShowOutcomes(true);
								},
								children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "task" }), l("交付内容")]
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								"aria-pressed": galleryMode === "browse",
								className: WorkflowWorkbench_module_css_default.galleryEntry,
								onClick: () => {
									setShowOutcomes(false);
									setGalleryMode("browse");
								},
								children: [(0, react_jsx_runtime.jsx)(BrandIcon, { name: "gallery" }), l("流程模板库 ")]
							}),
							team && (0, react_jsx_runtime.jsxs)("button", {
								disabled: working || !!unsaved.length || !team.tasks.length,
								title: unsaved.length ? l("请先保存属性草稿") : void 0,
								onClick: () => {
									setShowOutcomes(false);
									setGalleryMode("save");
								},
								children: [(0, react_jsx_runtime.jsx)(BrandIcon, { name: "save" }), l("保存为模板")]
							}),
							team?.workflow?.templateSource && (0, react_jsx_runtime.jsxs)("small", { children: [
								l("来自 "),
								team.workflow.templateSource.name,
								" · v",
								team.workflow.templateSource.version
							] })
						]
					}),
					galleryMode && (0, react_jsx_runtime.jsx)(TemplateGallery, {
						sessionId,
						team,
						archived: archiveView,
						mode: galleryMode,
						onBack: () => setGalleryMode(void 0),
						onApply: async (template, name, goal) => {
							const result = await perform("template_apply", {
								templateId: template.id,
								version: template.version,
								name,
								description: goal,
								language: l.language
							});
							if (!result) throw new Error(l("未能创建流程，请查看页面错误或刷新重试"));
							setGalleryMode(void 0);
							setEditing(false);
							await startEmbedded("adapt", result.team.id);
						}
					}, galleryMode),
					showOutcomes && !galleryMode && team && (0, react_jsx_runtime.jsx)(OutcomeShowcase, {
						team,
						sessionId,
						archived: archiveView,
						onTask: (id, review) => {
							if (review) openReview(id);
							else locateTask(id);
						}
					}, team.id + ":" + sessionId),
					(0, react_jsx_runtime.jsxs)("div", {
						className: WorkflowWorkbench_module_css_default.workbenchBody,
						hidden: !!galleryMode || showOutcomes,
						children: [
							team && (0, react_jsx_runtime.jsxs)("nav", {
								className: WorkflowWorkbench_module_css_default.commandBar,
								"aria-label": l("创建与视图"),
								children: [
									team.workflow?.templateSource && team.phase === "staged" && (0, react_jsx_runtime.jsxs)("button", {
										disabled: working,
										onClick: () => void startEmbedded("adapt"),
										children: [(0, react_jsx_runtime.jsx)(BrandIcon, {}), l("统一适配本次任务")]
									}),
									(0, react_jsx_runtime.jsx)("strong", { children: l("创建") }),
									(0, react_jsx_runtime.jsxs)("button", {
										disabled: working || archiveView,
										onClick: () => void createNode("task"),
										children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "task" }), l("任务节点")]
									}),
									(0, react_jsx_runtime.jsxs)("button", {
										disabled: working || archiveView,
										onClick: () => void createNode("check"),
										children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "review" }), l("人工节点")]
									}),
									(0, react_jsx_runtime.jsxs)("button", {
										disabled: working || archiveView,
										onClick: () => edit("member"),
										children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "agent" }), "Agent"]
									}),
									(0, react_jsx_runtime.jsx)("span", { className: WorkflowWorkbench_module_css_default.commandSpacer }),
									(0, react_jsx_runtime.jsx)("button", {
										"aria-pressed": !inspectorHidden,
										onClick: () => {
											setPane(inspectorHidden ? "discussion" : "flow");
											setInspectorHidden(!inspectorHidden);
										},
										children: inspectorHidden ? l("显示右侧面板") : l("收起右侧面板")
									})
								]
							}),
							revalidating && (0, react_jsx_runtime.jsx)("p", {
								role: "status",
								className: WorkflowWorkbench_module_css_default.hint,
								children: l("已显示上次状态，正在同步最新进度…")
							}),
							team && (unsaved.length > 0 || saveState !== "saved" || storageError) && (0, react_jsx_runtime.jsxs)("section", {
								className: WorkflowWorkbench_module_css_default.saveBar,
								"aria-label": l("保存状态"),
								children: [
									(0, react_jsx_runtime.jsxs)("span", {
										role: "status",
										children: [
											saveState === "saving" ? l("正在保存画布…") : saveState === "error" ? l("上次保存失败，请重试") : l("节点与连线自动保存"),
											" · ",
											unsaved.length ? l("{0} 个对象有未保存属性", unsaved.length) : l("属性已保存")
										]
									}),
									!!unsaved.length && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("button", {
										disabled: working || archiveView,
										onClick: () => void saveAllProperties(),
										children: l("保存全部属性")
									}), (0, react_jsx_runtime.jsxs)("details", { children: [(0, react_jsx_runtime.jsx)("summary", { children: l("查看未保存对象") }), unsaved.map((item) => (0, react_jsx_runtime.jsxs)("button", {
										onClick: () => edit(item.target.type, item.target.id),
										children: [
											item.label,
											" ",
											l(" · 未保存")
										]
									}, item.key))] })] }),
									storageError && (0, react_jsx_runtime.jsx)("span", {
										role: "alert",
										children: workflowMessage(storageError, l)
									})
								]
							}),
							team && (0, react_jsx_runtime.jsx)("nav", {
								className: WorkflowWorkbench_module_css_default.paneTabs,
								"aria-label": l("工作台视图"),
								children: [
									"members",
									"flow",
									"discussion"
								].map((value) => (0, react_jsx_runtime.jsxs)("button", {
									"aria-pressed": pane === value,
									onClick: () => {
										setPane(value);
										setInspectorExpanded(false);
										if (value === "discussion") setInspectorHidden(false);
									},
									children: [value === "members" ? l("对象列表") : value === "flow" ? l("任务流程") : l("修改与验收"), value === "discussion" && proposal && (0, react_jsx_runtime.jsx)("i", { "aria-label": l("有待确认的修改") })]
								}, value))
							}),
							firstAction && (0, react_jsx_runtime.jsxs)("nav", {
								className: WorkflowWorkbench_module_css_default.attention,
								"aria-label": l("待处理"),
								children: [
									(0, react_jsx_runtime.jsxs)("strong", { children: [
										l("待处理"),
										" · ",
										attention.length
									] }),
									(0, react_jsx_runtime.jsx)("button", {
										disabled: working,
										title: firstAction.label,
										onClick: firstAction.open,
										children: firstAction.label
									}),
									attention.length > 1 && (0, react_jsx_runtime.jsxs)("select", {
										"aria-label": l("其他待处理事项"),
										value: "",
										disabled: working,
										onChange: (event) => attention.find((item) => item.key === event.target.value)?.open(),
										children: [(0, react_jsx_runtime.jsx)("option", {
											value: "",
											disabled: true,
											children: l("其他待处理事项")
										}), attention.slice(1).map((item) => (0, react_jsx_runtime.jsx)("option", {
											value: item.key,
											children: item.label
										}, item.key))]
									})
								]
							}),
							!galleryMode && !showOutcomes && team?.halted && !archiveView && (0, react_jsx_runtime.jsxs)("section", {
								className: WorkflowWorkbench_module_css_default.readiness,
								children: [
									(0, react_jsx_runtime.jsx)("strong", { children: l("团队已停止") }),
									(0, react_jsx_runtime.jsx)("p", { children: l("恢复后可继续待执行工作；已取消或失败的任务需单独重跑。") }),
									(0, react_jsx_runtime.jsx)("button", {
										disabled: working,
										onClick: () => void perform("resume_team", {
											base: data?.base,
											reason: "用户恢复流程"
										}),
										children: l("恢复团队")
									})
								]
							}),
							!galleryMode && !showOutcomes && !!blockers.length && (0, react_jsx_runtime.jsxs)("details", {
								className: WorkflowWorkbench_module_css_default.blockers,
								children: [(0, react_jsx_runtime.jsxs)("summary", { children: [
									l("阻塞与恢复"),
									" · ",
									blockers.length
								] }), (0, react_jsx_runtime.jsx)("div", { children: blockers.map(({ task, state }) => (0, react_jsx_runtime.jsxs)("section", { children: [
									(0, react_jsx_runtime.jsx)("button", {
										onClick: () => {
											setEditing(false);
											locateTask(task.id);
										},
										children: task.subject
									}),
									(0, react_jsx_runtime.jsx)("strong", { children: state.label }),
									(0, react_jsx_runtime.jsx)("p", { children: state.detail })
								] }, task.id)) })]
							}),
							connectionError && (0, react_jsx_runtime.jsxs)("div", {
								className: WorkflowWorkbench_module_css_default.error,
								role: "alert",
								children: [
									(0, react_jsx_runtime.jsx)("strong", { children: l("连接需要恢复") }),
									(0, react_jsx_runtime.jsx)("p", { children: workflowMessage(connectionError, l) }),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: working,
										onClick: () => void refresh(),
										children: l("重新连接并读取状态")
									})
								]
							}),
							error && (0, react_jsx_runtime.jsx)("div", {
								className: WorkflowWorkbench_module_css_default.error,
								role: "alert",
								children: workflowMessage(error, l)
							}),
							archiveView && (0, react_jsx_runtime.jsx)("p", {
								className: WorkflowWorkbench_module_css_default.notice,
								children: l("归档画布 · 可查看全部节点、连接与成果。恢复并编辑将保留原归档和已完成成果，建立待确认流程，不会自动执行。")
							}),
							feedback && !editor && (0, react_jsx_runtime.jsx)("p", {
								className: WorkflowWorkbench_module_css_default.notice,
								role: "status",
								children: workflowMessage(feedback, l)
							}),
							!activeId ? (0, react_jsx_runtime.jsxs)("form", {
								className: WorkflowWorkbench_module_css_default.create,
								onSubmit: (e) => {
									e.preventDefault();
									createFlow();
								},
								children: [
									(0, react_jsx_runtime.jsx)("h2", { children: l("描述目标，一起规划团队") }),
									(0, react_jsx_runtime.jsxs)("p", { children: [l("已有适合的流程？"), (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setGalleryMode("browse"),
										children: [(0, react_jsx_runtime.jsx)(BrandIcon, { name: "gallery" }), l("从模板开始")]
									})] }),
									(0, react_jsx_runtime.jsxs)("label", { children: [l("团队名称"), (0, react_jsx_runtime.jsx)("input", {
										required: true,
										value: name ?? l("新团队"),
										placeholder: l("新团队"),
										onChange: (e) => setName(e.target.value)
									})] }),
									(0, react_jsx_runtime.jsxs)("label", { children: [l("团队目标"), (0, react_jsx_runtime.jsx)("textarea", {
										required: true,
										value: goal,
										onChange: (e) => setGoal(e.target.value)
									})] }),
									(0, react_jsx_runtime.jsx)("button", {
										className: WorkflowWorkbench_module_css_default.primary,
										disabled: working,
										children: l("在 DSH 中讨论方案 ↗")
									})
								]
							}) : !team ? (0, react_jsx_runtime.jsx)("p", {
								role: "status",
								children: l("正在读取团队…")
							}) : (0, react_jsx_runtime.jsxs)("div", {
								className: WorkflowWorkbench_module_css_default.columns,
								style: { "--inspector-width": `${inspectorWidth}px` },
								"data-reviewing": reviewingCheckpoint,
								"data-inspector-hidden": inspectorHidden,
								"data-inspector-expanded": inspectorExpanded,
								"data-pane": pane,
								"data-editing": !!editor || !!selectedEdge || !!activeTask,
								children: [
									(0, react_jsx_runtime.jsxs)("aside", {
										className: WorkflowWorkbench_module_css_default.roster,
										"aria-label": l("对象列表"),
										children: [(0, react_jsx_runtime.jsxs)("nav", {
											className: WorkflowWorkbench_module_css_default.libraryTabs,
											"aria-label": l("对象分类"),
											children: [(0, react_jsx_runtime.jsxs)("button", {
												"aria-pressed": library === "tasks",
												onClick: () => setLibrary("tasks"),
												children: [
													(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "task" }),
													l("任务 "),
													team.tasks.length
												]
											}), (0, react_jsx_runtime.jsxs)("button", {
												"aria-pressed": library === "agents",
												onClick: () => setLibrary("agents"),
												children: [
													(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "agent" }),
													"Agent ",
													team.members.filter((m) => archiveView || m.status !== "removed").length
												]
											})]
										}), library === "tasks" ? (0, react_jsx_runtime.jsxs)("section", {
											className: WorkflowWorkbench_module_css_default.taskList,
											children: [
												(0, react_jsx_runtime.jsx)("h3", { children: l("任务流程") }),
												(0, react_jsx_runtime.jsx)("p", {
													className: WorkflowWorkbench_module_css_default.hint,
													children: l("任务决定做什么，Agent 决定由谁执行。")
												}),
												team.tasks.map((task) => (0, react_jsx_runtime.jsxs)("button", {
													"data-kind": task.checkpoint ? "check" : "task",
													"aria-pressed": selectedTask === task.id,
													onClick: () => {
														choose({
															type: task.checkpoint ? "check" : "task",
															id: task.id
														});
														requestAnimationFrame(() => {
															const p = pos(task.id);
															canvas.current?.scrollTo({
																left: Math.max(0, p.x * zoom - 48),
																top: Math.max(0, p.y * zoom - 48),
																behavior: "smooth"
															});
														});
													},
													children: [
														(0, react_jsx_runtime.jsxs)("small", {
															className: WorkflowWorkbench_module_css_default.iconLabel,
															children: [
																(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: task.checkpoint ? "review" : "task" }),
																task.checkpoint ? l("人工节点") : l("任务节点"),
																" · ",
																task.id
															]
														}),
														(0, react_jsx_runtime.jsxs)("strong", { children: [task.subject, unsaved.some((item) => item.target.id === task.id && item.target.type !== "member") && (0, react_jsx_runtime.jsxs)("em", {
															className: WorkflowWorkbench_module_css_default.dirtyDot,
															children: [" ", l(" · 未保存")]
														})] }),
														(0, react_jsx_runtime.jsx)("span", {
															title: taskReadiness(team, task, l).detail,
															children: taskStatus(task, data.ready)
														})
													]
												}, task.id)),
												!team.tasks.length && (0, react_jsx_runtime.jsx)("p", {
													className: WorkflowWorkbench_module_css_default.hint,
													children: l("从顶部创建任务节点或人工节点。")
												})
											]
										}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
											(0, react_jsx_runtime.jsxs)("h3", { children: [l("Agent 成员 "), (0, react_jsx_runtime.jsx)("button", {
												disabled: working || archiveView,
												"aria-label": l("添加成员"),
												onClick: () => edit("member"),
												children: l("＋ 添加")
											})] }),
											team.members.filter((m) => archiveView || m.status !== "removed").map((m) => (0, react_jsx_runtime.jsxs)("article", {
												className: relatedMember === m.name ? WorkflowWorkbench_module_css_default.selected : "",
												onClick: (event) => {
													if (!event.target.closest("button")) edit("member", m.name);
												},
												children: [
													(0, react_jsx_runtime.jsxs)("button", {
														className: WorkflowWorkbench_module_css_default.member,
														"aria-pressed": selection.type === "member" && selection.id === m.name,
														onClick: () => {
															edit("member", m.name);
														},
														children: [(0, react_jsx_runtime.jsx)("img", {
															src: memberArtUrl(m.name, m.role ?? ""),
															alt: ""
														}), (0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsxs)("strong", { children: [m.name, unsaved.some((item) => item.target.type === "member" && item.target.id === m.name) && (0, react_jsx_runtime.jsxs)("em", {
															className: WorkflowWorkbench_module_css_default.dirtyDot,
															children: [" ", l(" · 未保存")]
														})] }), (0, react_jsx_runtime.jsx)("span", { children: m.summary || m.role || l("尚未填写职责概述") })] })]
													}),
													(0, react_jsx_runtime.jsxs)("small", {
														className: WorkflowWorkbench_module_css_default.iconLabel,
														children: [
															(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "agent" }),
															"Agent · ",
															m.model || l("继承队长模型")
														]
													}),
													(0, react_jsx_runtime.jsxs)("div", { children: [
														(0, react_jsx_runtime.jsxs)("button", {
															disabled: working || archiveView,
															onClick: () => prepareDiscussion(m.name),
															children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "chat" }), l("讨论调整 ↗")]
														}),
														m.id && openExecution && (0, react_jsx_runtime.jsx)("button", {
															onClick: () => {
																openExecution(m.id, team.captainSessionId);
																closeWorkbench();
															},
															children: l("执行对话 ↗")
														}),
														openExecution && m.previousSessionIds?.map((id, i) => (0, react_jsx_runtime.jsxs)("button", {
															onClick: () => {
																openExecution(id, team.captainSessionId);
																closeWorkbench();
															},
															children: [
																l("历史执行 "),
																i + 1,
																" ↗"
															]
														}, id))
													] })
												]
											}, m.name)),
											(0, react_jsx_runtime.jsx)("p", {
												className: WorkflowWorkbench_module_css_default.hint,
												children: archiveView ? l("点击成员查看保存的配置与执行记录；恢复并编辑后可调整。") : l("点击成员卡片直接编辑；讨论调整默认继续该成员的独立讨论，保留历史上下文。")
											})
										] })]
									}),
									(0, react_jsx_runtime.jsxs)("main", {
										className: WorkflowWorkbench_module_css_default.graphArea,
										children: [
											(0, react_jsx_runtime.jsxs)("nav", {
												className: WorkflowWorkbench_module_css_default.toolbar,
												"aria-label": l("画布工具"),
												children: [
													(0, react_jsx_runtime.jsxs)("button", {
														"aria-pressed": !panMode,
														onClick: () => setPanMode(false),
														children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "select" }), l("选择")]
													}),
													(0, react_jsx_runtime.jsxs)("button", {
														"aria-pressed": panMode,
														onClick: () => setPanMode(true),
														children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "pan" }), l("平移")]
													}),
													(0, react_jsx_runtime.jsx)("button", {
														"aria-label": l("缩小画布"),
														disabled: zoom <= .1,
														onClick: () => changeZoom(zoom - .1),
														children: "−"
													}),
													(0, react_jsx_runtime.jsxs)("button", {
														title: l("恢复 100%"),
														"aria-label": l("缩放 {0}%，点击恢复 100%", Math.round(zoom * 100)),
														onClick: () => changeZoom(1),
														children: [Math.round(zoom * 100), "%"]
													}),
													(0, react_jsx_runtime.jsx)("button", {
														"aria-label": l("放大画布"),
														disabled: zoom >= 2,
														onClick: () => changeZoom(zoom + .1),
														children: "＋"
													}),
													(0, react_jsx_runtime.jsxs)("button", {
														onClick: fitCanvas,
														children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "fit" }), l("适应画布")]
													}),
													(0, react_jsx_runtime.jsxs)("button", {
														disabled: working || archiveView || !team.tasks.length,
														onClick: () => void arrangeCanvas(),
														children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "arrange" }), l("自动整理")]
													})
												]
											}),
											(0, react_jsx_runtime.jsx)("div", {
												className: WorkflowWorkbench_module_css_default.canvas,
												"data-pan": panMode || !editing || archiveView,
												"data-linking": !!link,
												ref: canvas,
												onPointerDownCapture: beginPan,
												onClickCapture: (event) => {
													if (suppressPanClick.current) {
														suppressPanClick.current = false;
														event.preventDefault();
														event.stopPropagation();
													}
												},
												children: (0, react_jsx_runtime.jsxs)("div", {
													className: WorkflowWorkbench_module_css_default.plane,
													style: {
														width: graphWidth,
														height: graphHeight,
														zoom
													},
													children: [
														(0, react_jsx_runtime.jsxs)("svg", {
															className: WorkflowWorkbench_module_css_default.edges,
															"aria-label": l("任务交接连线"),
															children: [
																(0, react_jsx_runtime.jsxs)("defs", { children: [(0, react_jsx_runtime.jsx)("marker", {
																	id: "workflow-arrow",
																	markerUnits: "userSpaceOnUse",
																	markerWidth: "8",
																	markerHeight: "8",
																	refX: "8",
																	refY: "4",
																	orient: "auto",
																	children: (0, react_jsx_runtime.jsx)("path", {
																		d: "M0,0 L8,4 L0,8",
																		fill: "var(--wb-muted)"
																	})
																}), (0, react_jsx_runtime.jsx)("marker", {
																	id: "workflow-arrow-active",
																	markerUnits: "userSpaceOnUse",
																	markerWidth: "8",
																	markerHeight: "8",
																	refX: "8",
																	refY: "4",
																	orient: "auto",
																	children: (0, react_jsx_runtime.jsx)("path", {
																		d: "M0,0 L8,4 L0,8",
																		fill: "var(--wb-accent)"
																	})
																})] }),
																team.tasks.flatMap((t) => t.dependencies.map((dep) => {
																	const path = connectionPath(connectionPort(pos(dep), "output"), connectionPort(pos(t.id), "input"));
																	const selected = selectedEdge?.from === dep && selectedEdge.to === t.id;
																	const related = highlightedTask === dep || highlightedTask === t.id;
																	return (0, react_jsx_runtime.jsxs)("g", {
																		"data-selected": selected,
																		"data-related": related,
																		"data-dimmed": (!!highlightedTask || !!selectedEdge) && !related && !selected,
																		className: WorkflowWorkbench_module_css_default.edge,
																		children: [(0, react_jsx_runtime.jsx)("path", {
																			d: path,
																			markerEnd: selected ? "url(#workflow-arrow-active)" : "url(#workflow-arrow)"
																		}), (0, react_jsx_runtime.jsx)("path", {
																			className: WorkflowWorkbench_module_css_default.edgeHit,
																			d: path,
																			role: "button",
																			tabIndex: 0,
																			"aria-label": l("交接：{0} → {1}", team.tasks.find((task) => task.id === dep)?.subject ?? dep, t.subject),
																			"aria-pressed": selectedEdge?.from === dep && selectedEdge.to === t.id,
																			onClick: () => {
																				choose({
																					type: "edge",
																					from: dep,
																					to: t.id
																				});
																			},
																			onKeyDown: (event) => {
																				if (event.key === "Enter" || event.key === " ") {
																					event.preventDefault();
																					choose({
																						type: "edge",
																						from: dep,
																						to: t.id
																					});
																				}
																			}
																		})]
																	}, `${dep}-${t.id}`);
																})),
																link && (0, react_jsx_runtime.jsx)("path", { d: connectionPath(connectionPort(pos(link.from), "output"), link) })
															]
														}),
														team.tasks.map((task) => {
															const p = pos(task.id), control = taskControlState(team, {
																...task,
																workflowAwaitingStart: awaitsFirstStart(task)
															}, archiveView);
															return (0, react_jsx_runtime.jsxs)("article", {
																"data-canvas-node": task.id,
																"data-lifecycle": control.visual,
																"data-status": task.status,
																"data-member-match": selection.type === "member" && !!selection.id && task.assignee === selection.id || void 0,
																"data-connection": link?.to === task.id ? link.issue ? "invalid" : "valid" : void 0,
																"data-review-ready": !!task.checkpoint && !task.checkpoint.decision && data.ready.includes(task.id),
																"data-config-pending": task.workflowConfigPending || void 0,
																"data-suspended": task.workflowRerunRequired || void 0,
																className: `${WorkflowWorkbench_module_css_default.node} ${taskStateNodeClass} ${task.checkpoint ? WorkflowWorkbench_module_css_default.checkpoint : ""} ${highlightedTask === task.id ? WorkflowWorkbench_module_css_default.selected : ""}`,
																style: {
																	left: p.x,
																	top: p.y
																},
																onPointerDown: (event) => beginNodeDrag(event, task),
																onClick: (event) => {
																	if (event.target.closest("[data-connection-handle]")) return;
																	if (suppressNodeClick.current) {
																		suppressNodeClick.current = false;
																		return;
																	}
																	if (editing && !archiveView) edit(task.checkpoint ? "check" : "task", task.id);
																	else choose({
																		type: task.checkpoint ? "check" : "task",
																		id: task.id
																	});
																},
																children: [
																	(0, react_jsx_runtime.jsxs)("div", {
																		className: `${WorkflowWorkbench_module_css_default.drag} ${WorkflowWorkbench_module_css_default.iconLabel}`,
																		children: [
																			(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: task.checkpoint ? "review" : "task" }),
																			task.checkpoint ? l("人工节点") : l("任务节点"),
																			" · ",
																			task.id,
																			renderTaskControl(task)
																		]
																	}),
																	(0, react_jsx_runtime.jsxs)("button", {
																		className: WorkflowWorkbench_module_css_default.nodeBody,
																		children: [
																			(0, react_jsx_runtime.jsx)("strong", {
																				title: task.subject,
																				children: task.subject
																			}),
																			(0, react_jsx_runtime.jsx)("span", {
																				className: WorkflowWorkbench_module_css_default.taskOwner,
																				title: task.assignee,
																				children: task.checkpoint ? l("人工验收 · 由你确认") : l("执行 Agent · {0}", task.assignee || l("自动分配"))
																			}),
																			(0, react_jsx_runtime.jsx)(TaskStateBadge, {
																				control,
																				t,
																				detail: taskReadiness(team, task, l).detail
																			})
																		]
																	}),
																	(0, react_jsx_runtime.jsx)("button", {
																		className: `${WorkflowWorkbench_module_css_default.port} ${WorkflowWorkbench_module_css_default.input}`,
																		"data-connection-handle": true,
																		"data-input-id": task.id,
																		"aria-label": l("{0} 输入端", task.subject)
																	}),
																	(0, react_jsx_runtime.jsx)("button", {
																		className: `${WorkflowWorkbench_module_css_default.port} ${WorkflowWorkbench_module_css_default.output}`,
																		"data-connection-handle": true,
																		"aria-label": l("{0} 输出端", task.subject),
																		disabled: working || archiveView || !editing || taskEditing && !editor?.id,
																		title: l("从圆点拖出连接线"),
																		onPointerDown: (event) => {
																			if (event.button !== 0) return;
																			event.preventDefault();
																			const target = event.currentTarget;
																			target.setPointerCapture(event.pointerId);
																			const update = (move) => {
																				const at = point(move), to = connectionTarget(team.tasks, pos, at, task.id);
																				const issue = to ? connectionIssue(team.tasks, task.id, to.id, l) : void 0;
																				const end = to && !issue ? connectionPort(pos(to.id), "input") : at;
																				setLink({
																					from: task.id,
																					...end,
																					to: to?.id,
																					issue
																				});
																				return {
																					to,
																					issue
																				};
																			};
																			const cleanup = () => {
																				target.onpointermove = null;
																				target.onpointerup = null;
																				target.onpointercancel = null;
																				if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
																				cancelLink.current = void 0;
																				setLink(void 0);
																			};
																			cancelLink.current = cleanup;
																			update(event);
																			target.onpointermove = (move) => {
																				update(move);
																			};
																			target.onpointerup = (up) => {
																				const { to, issue } = update(up);
																				cleanup();
																				if (issue) setError(issue);
																				if (to && !issue) saveEdit([{
																					action: "update_task",
																					id: to.id,
																					dependencies: [...to.dependencies, task.id]
																				}], l("连接 {0} → {1}", task.subject, to.subject));
																			};
																			target.onpointercancel = cleanup;
																		}
																	})
																]
															}, task.id);
														}),
														taskEditing && !editor?.id && (0, react_jsx_runtime.jsxs)("article", {
															className: `${WorkflowWorkbench_module_css_default.node} ${WorkflowWorkbench_module_css_default.draftNode}`,
															style: {
																left: draftPosition.x,
																top: draftPosition.y
															},
															children: [(0, react_jsx_runtime.jsx)("div", {
																className: WorkflowWorkbench_module_css_default.drag,
																children: l("草稿 · 确认后加入流程")
															}), (0, react_jsx_runtime.jsxs)("div", {
																className: WorkflowWorkbench_module_css_default.nodeBody,
																children: [
																	(0, react_jsx_runtime.jsx)("strong", { children: draft["subject"] || (editor?.type === "check" ? l("新人工检查") : l("新任务")) }),
																	(0, react_jsx_runtime.jsx)("span", { children: editor?.type === "check" ? l("你与独立验收 Agent") : draft["assignee"] || l("待指定 Agent") }),
																	(0, react_jsx_runtime.jsx)("small", { children: l("尚未应用") })
																]
															})]
														}),
														!team.tasks.length && !editor && (0, react_jsx_runtime.jsx)("p", {
															className: WorkflowWorkbench_module_css_default.empty,
															children: l("添加任务或人工检查，或让 AI 根据目标提出流程方案。")
														})
													]
												})
											}),
											(0, react_jsx_runtime.jsx)("footer", {
												className: WorkflowWorkbench_module_css_default.canvasStatus,
												role: "status",
												children: link ? link.issue ?? (link.to ? l("已吸附 · 松开连接") : l("拖到下游节点 · Esc 取消")) : l("{0} 个任务节点 · {1} · 滚轮缩放（以鼠标位置为中心）{2}", team.tasks.length, editing ? l("拖动空白处平移") : l("拖动画布平移"), editing ? l(" · 靠近节点显示圆点，拖动连线 · Delete 删除") : l(" · 单击节点查看详情"))
											})
										]
									}),
									(0, react_jsx_runtime.jsx)("div", {
										className: WorkflowWorkbench_module_css_default.resizeHandle,
										role: "separator",
										"aria-label": l("调整右侧面板宽度"),
										"aria-orientation": "vertical",
										"aria-valuemin": 300,
										"aria-valuemax": 720,
										"aria-valuenow": inspectorWidth,
										tabIndex: inspectorHidden ? -1 : 0,
										onPointerDown: resizeInspector,
										onKeyDown: (event) => {
											if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
												event.preventDefault();
												setInspectorExpanded(false);
												setInspectorWidth((value) => Math.max(300, Math.min(720, value + (event.key === "ArrowLeft" ? 40 : -40))));
											}
										}
									}),
									(0, react_jsx_runtime.jsxs)("section", {
										className: WorkflowWorkbench_module_css_default.inspector,
										"aria-label": l("属性与讨论面板"),
										children: [
											(0, react_jsx_runtime.jsxs)("header", {
												className: WorkflowWorkbench_module_css_default.inspectorHeader,
												children: [(0, react_jsx_runtime.jsx)("strong", { children: reviewingCheckpoint ? l("验收工作台") : editor ? l("编辑属性") : activeTask || selectedEdge ? l("节点与连接") : l("讨论与验收") }), (0, react_jsx_runtime.jsx)("button", {
													"aria-pressed": inspectorExpanded,
													onClick: () => setInspectorExpanded(!inspectorExpanded),
													children: inspectorExpanded ? l("还原面板") : l("放大面板")
												})]
											}),
											selectedEdge && (0, react_jsx_runtime.jsxs)("aside", {
												className: WorkflowWorkbench_module_css_default.editor,
												"aria-label": l("交接详情"),
												children: [
													(0, react_jsx_runtime.jsxs)("strong", { children: [
														team.tasks.find((task) => task.id === selectedEdge.from)?.subject,
														" → ",
														team.tasks.find((task) => task.id === selectedEdge.to)?.subject
													] }),
													(0, react_jsx_runtime.jsx)("p", { children: l("上游完成后，下游才开始。编辑时按 Delete 删除；已开始的下游需先停止。") }),
													(0, react_jsx_runtime.jsx)("button", {
														disabled: working || archiveView || !editing,
														onClick: () => void deleteEdge(),
														children: l("删除连线")
													})
												]
											}),
											activeTask && !editor && !selectedEdge && (0, react_jsx_runtime.jsxs)("aside", {
												className: WorkflowWorkbench_module_css_default.editor,
												"aria-label": activeTask.checkpoint ? l("人工验收属性") : l("任务属性"),
												children: [
													(0, react_jsx_runtime.jsxs)("header", {
														className: WorkflowWorkbench_module_css_default.taskHeading,
														children: [
															(0, react_jsx_runtime.jsxs)("small", { children: [
																activeTask.checkpoint ? l("人工验收属性") : l("任务属性"),
																" · ",
																activeTask.id
															] }),
															(0, react_jsx_runtime.jsx)("h3", {
																"data-task-heading": true,
																tabIndex: -1,
																children: activeTask.subject
															}),
															!archiveView && editorTarget(team, selection, true) && (0, react_jsx_runtime.jsx)("button", {
																onClick: () => setEditing(true),
																children: !activeTask.checkpoint && [
																	"completed",
																	"failed",
																	"cancelled"
																].includes(activeTask.status) ? l("修改并重跑") : l("编辑节点")
															})
														]
													}),
													(0, react_jsx_runtime.jsxs)("section", {
														className: WorkflowWorkbench_module_css_default.taskBrief,
														children: [(0, react_jsx_runtime.jsx)("strong", { children: l("任务要求 / 验收要求") }), (0, react_jsx_runtime.jsx)("p", { children: activeTask.description || l("暂无任务说明") })]
													}),
													renderReadiness(activeTask),
													![
														"completed",
														"failed",
														"cancelled"
													].includes(activeTask.status) && renderTaskControl(activeTask),
													renderRerunPath(activeTask),
													activeTask.checkpoint && (0, react_jsx_runtime.jsxs)("p", { children: [
														l("第 "),
														activeTask.checkpoint.round,
														" ",
														l(" 轮 · "),
														activeTask.checkpoint.note || l("暂无验收意见")
													] }),
													(0, react_jsx_runtime.jsxs)("div", { children: [!archiveView && !activeTask.checkpoint && (0, react_jsx_runtime.jsxs)("button", {
														className: WorkflowWorkbench_module_css_default.primary,
														disabled: working,
														onClick: () => void startEmbedded(`task:${activeTask.id}`),
														children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "chat" }), l("与 AI 讨论任务")]
													}), !archiveView && !activeTask.checkpoint && activeTask.assignee && rerunnableTasks(team.tasks, activeTask.assignee).some((task) => task.id === activeTask.id) && (0, react_jsx_runtime.jsx)("button", {
														disabled: working,
														onClick: () => {
															edit("member", activeTask.assignee, { rerunTaskId: activeTask.id });
														},
														children: l("修改负责人并重跑此任务")
													})] }),
													(0, react_jsx_runtime.jsx)(TaskRecord, {
														task: activeTask,
														team,
														showContract: false
													}),
													activeTask.checkpoint && (0, react_jsx_runtime.jsx)("button", {
														className: WorkflowWorkbench_module_css_default.primary,
														disabled: working,
														onClick: () => void openReview(activeTask.id),
														children: data.ready.includes(activeTask.id) && !archiveView ? l("开始验收") : l("查看验收工作台")
													})
												]
											}),
											reviewingCheckpoint && reviewTask && (0, react_jsx_runtime.jsx)(ReviewWorkbench, {
												team,
												task: reviewTask,
												conversation,
												ready: data.ready.includes(reviewTask.id),
												archived: archiveView,
												busy: working,
												note,
												onNote: setNote,
												onReopen: () => void perform("reopen_review", {
													taskId: reviewTask.id,
													base: data.base
												}),
												onRerun: async (taskId, instructions) => !!await saveEdit([{
													action: "rerun_task",
													id: taskId,
													instructions
												}], l("安排验收返工")),
												reworkBlocked: unsaved.length ? l("请先保存属性草稿") : void 0,
												continuation: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [!reviewTask.checkpoint?.decision && renderReadiness(reviewTask), renderRerunPath(reviewTask)] }),
												onBack: () => locateTask(reviewTask.id),
												onRefresh: () => void perform("materials", { discussion }),
												onDecision: async (decision, evidence, submittedNote) => {
													const scope = reviewScope;
													const result = await perform("review", {
														taskId: reviewTask.id,
														discussion,
														evidence,
														decision,
														note: submittedNote
													});
													if (result) setReviewNotes((notes) => notes[scope] === submittedNote ? {
														...notes,
														[scope]: ""
													} : notes);
													return !!result;
												},
												onDiscuss: () => void startEmbedded(discussion),
												onRestart: !data.currentDiscussion ? () => void startEmbedded(discussion, activeId, true) : void 0,
												discussionBusy: data.busy.includes(discussion),
												discussion: embeddedDiscussion === discussion && activeId ? (0, react_jsx_runtime.jsx)(EmbeddedDiscussion, {
													sessionId,
													teamId: activeId,
													discussion
												}, `${activeId}:${discussion}:${conversation?.native?.sessionId}`) : void 0,
												proposal: proposal ? (0, react_jsx_runtime.jsx)("section", {
													className: WorkflowWorkbench_module_css_default.proposal,
													children: renderProposalReview()
												}) : void 0
											}, `${team.id}:${reviewTask.id}:${reviewTask.checkpoint?.round}`),
											!editor && !selectedEdge && !activeTask && !reviewingCheckpoint && (0, react_jsx_runtime.jsxs)("aside", {
												className: WorkflowWorkbench_module_css_default.discussion,
												"data-template-review": reviewingTemplate,
												children: [
													(0, react_jsx_runtime.jsxs)("header", { children: [(0, react_jsx_runtime.jsx)("img", {
														src: reviewTask ? REVIEW_ART : member ? memberArtUrl(member.name, member.role ?? "") : LEAD_ART,
														alt: ""
													}), (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("h3", {
														"data-review-heading": true,
														tabIndex: -1,
														children: reviewTask ? l("验收 · {0}", reviewTask.subject) : discussionTask ? l("任务讨论 · {0}", discussionTask.subject) : member ? l("成员职责 · {0}", member.name) : reviewingTemplate ? l("统一适配本次任务") : l("流程修改")
													}), (0, react_jsx_runtime.jsx)("small", { children: reviewTask ? l("一起检查成果，由你决定是否通过") : l("讨论不影响执行，修改确认后生效") })] })] }),
													(0, react_jsx_runtime.jsxs)(MessageArea, {
														className: WorkflowWorkbench_module_css_default.messages,
														children: [
															reviewingTemplate && (0, react_jsx_runtime.jsx)("summary", { children: l("讨论记录与资料") }),
															(0, react_jsx_runtime.jsx)("p", {
																className: WorkflowWorkbench_module_css_default.hint,
																children: reviewTask ? l("在此窗口内共同检查成果并确认验收决定。") : discussionTask ? l("基于已保存的任务要求、负责人、上下游和提交结果讨论；未保存草稿不会发送给 AI。") : member ? l("在这里与独立配置顾问讨论；队长对话保持独立。") : l("在此窗口内讨论团队与流程，修改方案会显示在这里。")
															}),
															discussionTask && (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("button", {
																onClick: () => locateTask(discussionTask.id),
																children: l("返回任务属性")
															}), (0, react_jsx_runtime.jsx)("button", {
																disabled: working || archiveView,
																onClick: () => void startEmbedded("graph"),
																children: l("讨论整体流程与拆分")
															})] }),
															archiveView ? (0, react_jsx_runtime.jsx)("p", {
																className: WorkflowWorkbench_module_css_default.hint,
																children: l("恢复并编辑流程后可继续讨论。")
															}) : embeddedDiscussion === discussion && activeId ? (0, react_jsx_runtime.jsx)(EmbeddedDiscussion, {
																sessionId,
																teamId: activeId,
																discussion
															}, `${activeId}:${discussion}:${conversation?.native?.sessionId}`) : (0, react_jsx_runtime.jsx)("button", {
																className: WorkflowWorkbench_module_css_default.primary,
																disabled: working,
																onClick: () => member ? prepareDiscussion(member.name) : void startEmbedded(discussion),
																children: l(conversation?.native ? "继续在此处讨论" : "在此处开始讨论")
															}),
															(0, react_jsx_runtime.jsxs)("details", {
																open: archiveView || !proposal && selection.type === "member",
																children: [(0, react_jsx_runtime.jsx)("summary", { children: l("已保存资料（不含待确认修改）") }), (0, react_jsx_runtime.jsx)(WorkflowContext, {
																	team,
																	discussion,
																	onSelect: (key) => key.startsWith("member:") ? edit("member", key.slice(7)) : selectDiscussion(key),
																	openExecution
																})]
															}),
															conversation?.materials && (0, react_jsx_runtime.jsxs)("details", {
																open: true,
																children: [(0, react_jsx_runtime.jsx)("summary", { children: l("本轮验收材料与证据") }), (0, react_jsx_runtime.jsx)(ReviewMaterials, { text: conversation.materials })]
															}),
															embeddedDiscussion !== discussion && data.busy.includes(discussion) && (0, react_jsx_runtime.jsx)("p", {
																role: "status",
																children: l("原生对话正在整理方案…")
															})
														]
													}),
													!archiveView && proposal && (0, react_jsx_runtime.jsx)("section", {
														className: WorkflowWorkbench_module_css_default.proposal,
														children: renderProposalReview()
													}),
													!archiveView && !data.currentDiscussion && (0, react_jsx_runtime.jsxs)("details", { children: [
														(0, react_jsx_runtime.jsx)("summary", { children: l("重新开始讨论") }),
														(0, react_jsx_runtime.jsx)("p", {
															className: WorkflowWorkbench_module_css_default.hint,
															children: l("新建独立讨论会归档当前讨论，从当前资料重新开始。")
														}),
														(0, react_jsx_runtime.jsx)("button", {
															disabled: working || data.busy.includes(discussion),
															onClick: () => void startEmbedded(discussion, activeId, true),
															children: l("新建独立讨论")
														})
													] })
												]
											}),
											editor && (0, react_jsx_runtime.jsxs)("form", {
												"data-workflow-editor": true,
												className: WorkflowWorkbench_module_css_default.editor,
												onSubmit: (event) => {
													event.preventDefault();
													try {
														const route = draft["routeChanged"] ? {
															provider: draft["provider"],
															model: draft["model"],
															reasoningEffort: draft["reasoningEffort"] || "default"
														} : {};
														const operations = editor.type === "member" ? [editor.id ? {
															action: "update_member",
															name: editor.id,
															summary: draft["summary"],
															role: draft["role"],
															executionPrompt: draft["executionPrompt"],
															specificPrompt: draft["specificPrompt"],
															...draftGalleryAccess(draft),
															...route
														} : {
															action: "add_member",
															name: draft["name"] ?? "",
															summary: draft["summary"] ?? "",
															role: draft["role"],
															executionPrompt: draft["executionPrompt"],
															specificPrompt: draft["specificPrompt"],
															...draftGalleryAccess(draft),
															...route
														}] : [editor.id ? {
															action: terminalEdit ? "rerun_task" : "update_task",
															id: editor.id,
															...!terminalEdit && activeTask?.workflowConfigPending ? { confirmConfiguration: true } : {},
															...terminalEdit ? { instructions: draft["rerunInstructions"] } : {},
															subject: draft["subject"] ?? "",
															description: draft["description"],
															adaptationIssue: draft["adaptationIssue"] ?? "",
															assignee: editor.type === "check" ? void 0 : draft["assignee"]
														} : {
															action: "add_task",
															checkpoint: editor.type === "check",
															subject: draft["subject"] ?? "",
															description: draft["description"],
															adaptationIssue: draft["adaptationIssue"] ?? "",
															assignee: editor.type === "check" ? void 0 : draft["assignee"],
															dependencies: []
														}];
														const rerun = event.nativeEvent.submitter?.getAttribute("data-rerun") === "true";
														if (rerun) {
															if (!editor.id || !draft["rerunTaskId"] || !team.tasks.some((task) => task.id === draft["rerunTaskId"] && task.assignee === editor.id)) throw new Error(l("请选择该成员的已结束任务"));
														}
														const resumeId = event.nativeEvent.submitter?.getAttribute("data-resume") === "true" ? editor.id : void 0;
														const resumeCheck = editor.type === "check", revision = viewRef.current.revision, rerunTaskId = rerun ? draft["rerunTaskId"] : void 0;
														saveEdit(operations, rerun ? l("保存成员配置并进入重跑编辑") : editor.type === "member" ? l("调整团队成员") : l("调整任务"), true).then(async (saved) => {
															if (saved && rerunTaskId && revision === viewRef.current.revision) edit("task", rerunTaskId);
															if (saved && resumeId && await perform("resume_task", {
																taskId: resumeId,
																base: saved.base
															}) && resumeCheck && revision === viewRef.current.revision) await openReview(resumeId);
														});
													} catch (error) {
														setError(error instanceof Error ? error.message : String(error));
													}
												},
												children: [(0, react_jsx_runtime.jsxs)("div", {
													className: WorkflowWorkbench_module_css_default.formBody,
													children: [
														(0, react_jsx_runtime.jsxs)("h3", { children: [
															editor.id ? l("编辑") : l("添加"),
															editor.type === "member" ? l("成员") : editor.type === "check" ? l("人工检查") : l("任务"),
															" ",
															(0, react_jsx_runtime.jsx)("small", {
																className: currentDirty ? WorkflowWorkbench_module_css_default.dirtyDot : WorkflowWorkbench_module_css_default.hint,
																children: currentDirty ? l("未保存") : editor.id ? l("已保存") : l("尚未创建")
															})
														] }),
														terminalEdit && activeTask && (0, react_jsx_runtime.jsxs)("section", {
															className: WorkflowWorkbench_module_css_default.rerunContext,
															"aria-label": l("重跑输入"),
															children: [
																(0, react_jsx_runtime.jsx)("strong", { children: l("上一轮结果（自动提供给 Agent）") }),
																(0, react_jsx_runtime.jsx)("pre", { children: activeTask.output || l("上一轮未提交结果") }),
																field("rerunInstructions", l("本次重跑要求（必填）"), true),
																(0, react_jsx_runtime.jsx)("p", { children: l("Agent 将结合原任务要求、上一轮结果和本次新增要求重新执行，并重新验证结果。") })
															]
														}),
														editor.type === "member" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
															field("name", l("名称")),
															(0, react_jsx_runtime.jsxs)("div", {
																className: WorkflowWorkbench_module_css_default.memberModelSettings,
																children: [(0, react_jsx_runtime.jsx)("strong", { children: l("模型与 Thinking") }), modelDirectory && t ? (0, react_jsx_runtime.jsx)(StagedModelPicker, {
																	directory: modelDirectory,
																	t,
																	provider: draft["provider"] ?? "",
																	model: draft["model"] ?? "",
																	reasoningEffort: draft["reasoningEffort"] ?? "",
																	busy: working,
																	onChange: (selection) => setDraft((prev) => ({
																		...prev,
																		...selection,
																		routeChanged: "yes"
																	}))
																}) : (0, react_jsx_runtime.jsx)("p", {
																	className: WorkflowWorkbench_module_css_default.hint,
																	children: l("模型目录暂不可用，请在 DSH 团队活动页面打开编辑。")
																})]
															}),
															field("summary", l("Summary · 功能概述"), true),
															field("role", l("长期职责"), true),
															field("executionPrompt", l("通用执行指令 / PE"), true),
															field("specificPrompt", l("本次补充指令（可选）"), true),
															galleryAccessKeys.map((key) => (0, react_jsx_runtime.jsxs)("label", {
																className: WorkflowWorkbench_module_css_default.galleryPermission,
																children: [(0, react_jsx_runtime.jsx)("input", {
																	type: "checkbox",
																	checked: draft[key] !== "false",
																	disabled: working,
																	onChange: (event) => setDraft((prev) => ({
																		...prev,
																		[key]: String(event.target.checked)
																	}))
																}), key === "gallerySkill" ? l("允许使用 Gallery Skill") : l("允许使用 Gallery MCP")]
															}, key))
														] }) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
															field("subject", l("任务名称")),
															field("description", l("任务要求 / 验收要求"), true),
															activeTask?.adaptationIssue && (0, react_jsx_runtime.jsxs)("section", {
																className: WorkflowWorkbench_module_css_default.adaptationIssue,
																children: [field("adaptationIssue", l("需要确认的问题（处理后清空）"), true), draft["adaptationIssue"]?.trim() ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("p", { children: l("请先补充任务要求，再明确标记问题已解决。仅修改任务正文不会自动清除问题。") }), (0, react_jsx_runtime.jsx)("button", {
																	type: "button",
																	disabled: working,
																	onClick: () => setDraft({
																		...draft,
																		adaptationIssue: ""
																	}),
																	children: l("已解决，清除问题")
																})] }) : (0, react_jsx_runtime.jsx)("p", {
																	role: "status",
																	children: l("问题已标记解决，保存后生效。")
																})]
															}),
															editor.type !== "check" && (0, react_jsx_runtime.jsxs)("label", { children: [l("执行 Agent"), (0, react_jsx_runtime.jsxs)("select", {
																value: draft["assignee"] ?? "",
																onChange: (e) => setDraft({
																	...draft,
																	assignee: e.target.value
																}),
																children: [(0, react_jsx_runtime.jsx)("option", {
																	value: "",
																	children: l("由空闲成员领取")
																}), team.members.filter((m) => m.status !== "removed").map((m) => (0, react_jsx_runtime.jsx)("option", { children: m.name }, m.name))]
															})] }),
															(0, react_jsx_runtime.jsx)("p", {
																className: WorkflowWorkbench_module_css_default.hint,
																children: l("节点已在画布中，靠近节点后可拖动右侧圆点连线。修改名称或要求后点击保存。")
															})
														] }),
														editor.type !== "member" && activeTask && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [renderReadiness(activeTask), !terminalEdit && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [renderTaskControl(activeTask), renderRerunPath(activeTask)] })] }),
														editor.type === "task" && activeTask && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("button", {
															type: "button",
															disabled: working,
															onClick: () => void startEmbedded(`task:${activeTask.id}`),
															children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "chat" }), l("与 AI 讨论任务")]
														}), (0, react_jsx_runtime.jsx)("small", {
															className: WorkflowWorkbench_module_css_default.hint,
															children: l("讨论使用已保存的资料；当前草稿会保留。")
														})] }),
														editor.type !== "member" && activeTask && (0, react_jsx_runtime.jsx)(TaskRecord, {
															task: activeTask,
															team,
															expanded: false,
															showContract: false
														}),
														terminalEdit && activeTask && (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: (0, react_jsx_runtime.jsxs)("p", {
															className: WorkflowWorkbench_module_css_default.notice,
															children: [
																l("保存将开启新一轮执行，原有状态与结果保存在历史执行记录中。以下下游先等待新结果："),
																rerunImpact(team.tasks, activeTask.id).descendants.map((task) => task.subject).join("、") || l("无"),
																l("。可在任意下游节点选择「运行到此节点」，按依赖执行；人工检查仍需确认，其他分支保留。"),
																team.phase === "staged" ? l("请先查看流程并确认启动团队，再重跑。") : ""
															]
														}) }),
														editor.type === "member" && editor.id && (0, react_jsx_runtime.jsx)(TaskRerunPicker, {
															tasks: team.tasks,
															member: editor.id,
															taskId: draft["rerunTaskId"] ?? "",
															disabled: working,
															onTask: (id) => setDraft((prev) => ({
																...prev,
																rerunTaskId: id
															}))
														}),
														editor.type !== "member" && activeTask?.workflowRerunRequired && (0, react_jsx_runtime.jsx)("p", {
															className: WorkflowWorkbench_module_css_default.hint,
															children: taskReadiness(team, activeTask, l).detail
														}),
														feedback && (0, react_jsx_runtime.jsx)("p", {
															role: "status",
															children: workflowMessage(feedback, l)
														}),
														(0, react_jsx_runtime.jsx)("p", {
															className: WorkflowWorkbench_module_css_default.hint,
															children: l("属性需点击保存；草稿保存在此标签页，刷新可恢复。Esc 退出编辑并保留草稿。")
														}),
														draftStale && (0, react_jsx_runtime.jsxs)("p", {
															role: "alert",
															children: [l("当前对象已变化，草稿仍保留。"), (0, react_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => {
																	if (draftId) updateView((current) => {
																		const drafts = { ...current.drafts };
																		delete drafts[draftId];
																		return {
																			...current,
																			drafts
																		};
																	});
																},
																children: l("重新载入")
															})]
														})
													]
												}), (0, react_jsx_runtime.jsxs)("footer", { children: [
													editor.type !== "member" && !!draft["adaptationIssue"]?.trim() && (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => focusAttention("[data-workflow-editor] [data-field=\"adaptationIssue\"] textarea"),
														children: l("先处理需要确认的问题")
													}),
													(0, react_jsx_runtime.jsx)("button", {
														className: WorkflowWorkbench_module_css_default.primary,
														disabled: working || editor.type !== "member" && !!draft["adaptationIssue"]?.trim() || terminalEdit && (team.phase === "staged" || !draft["rerunInstructions"]?.trim()),
														children: terminalEdit ? l("保存并重跑此任务") : activeTask?.workflowConfigPending && editor.type !== "member" ? l("保存并完成配置") : l("保存")
													}),
													editor.type === "member" && editor.id && rerunnableTasks(team.tasks, editor.id).some((task) => task.id === draft["rerunTaskId"]) && (0, react_jsx_runtime.jsx)("button", {
														type: "submit",
														"data-rerun": "true",
														disabled: working,
														children: l("保存成员并编辑重跑要求")
													}),
													editor.id && editor.type !== "member" && !terminalEdit && !activeTask?.workflowConfigPending && !activeTask?.workflowRerunRequired && team.tasks.find((task) => task.id === editor.id)?.workflowPaused && (0, react_jsx_runtime.jsx)("button", {
														type: "submit",
														"data-resume": "true",
														disabled: working || activeTask?.workflowRerunRequired && activeTask.dependencies.some((id) => team.tasks.find((task) => task.id === id)?.status !== "completed"),
														children: activeTask?.workflowRerunRequired ? editor.type === "check" ? l("使用新结果重新验收") : l("使用新结果执行") : editor.type === "check" ? l("保存并开始验收") : l("保存并开始执行")
													}),
													editor.id && editor.type !== "member" && !terminalEdit && (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: working,
														onClick: () => void deleteNode(editor.id),
														children: l("删除节点")
													}),
													editor.type === "check" && editor.id && data.ready.includes(editor.id) && (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: working,
														onClick: () => void openReview(editor.id),
														children: l("开始验收 ↗")
													}),
													(0, react_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: cancelEdit,
														children: l("放弃修改")
													}),
													editor.type === "member" && editor.id && (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: working,
														onClick: () => void saveEdit([{
															action: "remove_member",
															name: editor.id
														}], l("移除 {0}", editor.id), true),
														children: l("移除成员")
													})
												] })]
											}, `${editor.type}:${editor.id ?? "new"}`)
										]
									})
								]
							})
						]
					})
				]
			}), document.body)] });
		}
		function WorkflowWorkbench(props) {
			return (0, react_jsx_runtime.jsx)(WorkflowLocale, {
				t: props.t,
				children: (0, react_jsx_runtime.jsx)(Workbench, { ...props })
			});
		}
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/WorkspaceDirectoryPicker.module.css.mjs
		const css$4 = ".H_bw5a_modal{width:min(680px,100vw - 32px);max-width:680px}.H_bw5a_content{flex-direction:column;gap:12px;min-height:0;display:flex}.H_bw5a_navigation{flex:none;align-items:center;gap:8px;display:flex}.H_bw5a_navigation nav{white-space:nowrap;flex:1;gap:2px;min-width:0;display:flex;overflow:auto}.H_bw5a_navigation nav button{flex:none}.H_bw5a_directories{overscroll-behavior:contain;height:300px;min-height:100px;max-height:42vh;overflow:auto}.H_bw5a_directories>button{width:100%;color:inherit;text-align:left;font:inherit;cursor:pointer;background:0 0;border:0;border-radius:6px;align-items:center;gap:10px;padding:9px 10px;display:flex}.H_bw5a_directories>button:hover{background:var(--dsw-alias-interactive-bg-hover,#f1f2f4)}.H_bw5a_directories>button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#7255ba);outline-offset:-2px}.H_bw5a_directories>button:disabled{opacity:.5;cursor:default}.H_bw5a_directories>button>span:first-of-type{overflow-wrap:anywhere;flex:1}.H_bw5a_directories>button>span:last-child{opacity:.5}.H_bw5a_directories>p{color:var(--dsw-alias-label-secondary);padding:8px;font-size:13px}.H_bw5a_footer{flex-wrap:wrap;align-items:center;gap:8px;width:100%;display:flex}.H_bw5a_footer>span{flex:1}.H_bw5a_path,.H_bw5a_create{align-items:end;gap:8px;display:flex}.H_bw5a_path>input,.H_bw5a_create>label{flex:1;min-width:0}.H_bw5a_create>label{flex-direction:column;gap:6px;font-size:13px;display:flex}.H_bw5a_path input,.H_bw5a_create input{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#ddd);width:100%;color:inherit;background:var(--dsw-alias-bg-layer-1,white);font:inherit;border-radius:8px;padding:9px 12px}.H_bw5a_error{color:var(--dsw-alias-state-error-primary,#b94444);overflow-wrap:anywhere;font-size:13px}@media (width<=600px){.H_bw5a_navigation{flex-wrap:wrap}.H_bw5a_navigation nav{flex-basis:100%}.H_bw5a_footer{gap:6px}.H_bw5a_footer>span{display:none}.H_bw5a_create{flex-wrap:wrap}.H_bw5a_create>label{flex-basis:100%}}";
		const tagId$4 = "@yogurtss/dsh-teamflow/WorkspaceDirectoryPicker.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4;
			document.head.appendChild(tag);
		}
		var WorkspaceDirectoryPicker_module_css_default = {
			"content": "H_bw5a_content",
			"create": "H_bw5a_create",
			"directories": "H_bw5a_directories",
			"error": "H_bw5a_error",
			"footer": "H_bw5a_footer",
			"modal": "H_bw5a_modal",
			"navigation": "H_bw5a_navigation",
			"path": "H_bw5a_path"
		};
		//#endregion
		//#region lib/client/WorkspaceDirectoryPicker.js
		/** Uses the same host directory API and modal primitives as DSH's workspace browser. */
		function WorkspaceDirectoryPicker({ workspace, onPick, onClose }) {
			const l = useWorkflowText();
			const [listing, setListing] = (0, react.useState)();
			const [target, setTarget] = (0, react.useState)({});
			const [loading, setLoading] = (0, react.useState)(true), [busy, setBusy] = (0, react.useState)(false), [error, setError] = (0, react.useState)("");
			const [hidden, setHidden] = (0, react.useState)(false), [editing, setEditing] = (0, react.useState)(false), [path, setPath] = (0, react.useState)("");
			const [creating, setCreating] = (0, react.useState)(false), [name, setName] = (0, react.useState)("");
			const alive = (0, react.useRef)(true), working = (0, react.useRef)(false);
			(0, react.useEffect)(() => {
				alive.current = true;
				return () => {
					alive.current = false;
				};
			}, []);
			(0, react.useEffect)(() => {
				const abort = new AbortController();
				setLoading(true);
				setError("");
				workspace.listDirectory(target.path, abort.signal).then((value) => {
					if (!abort.signal.aborted) {
						setListing(value);
						setPath(value.path);
						setLoading(false);
					}
				}).catch((err) => {
					if (!abort.signal.aborted) {
						setError(String(err instanceof Error ? err.message : err));
						setLoading(false);
					}
				});
				return () => abort.abort();
			}, [workspace, target]);
			function navigate(path) {
				setEditing(false);
				setTarget({ path });
			}
			async function perform(action) {
				if (working.current) return;
				working.current = true;
				setBusy(true);
				setError("");
				try {
					await action();
				} catch (err) {
					if (alive.current) setError(err instanceof Error ? err.message : String(err));
				} finally {
					working.current = false;
					if (alive.current) setBusy(false);
				}
			}
			const blocked = loading || busy || creating;
			return (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: true,
				title: l("选择工作区目录"),
				closeLabel: l("取消"),
				onClose: () => {
					if (!busy) onClose();
				},
				className: WorkspaceDirectoryPicker_module_css_default.modal,
				contentClassName: WorkspaceDirectoryPicker_module_css_default.content,
				footer: (0, react_jsx_runtime.jsxs)("div", {
					className: WorkspaceDirectoryPicker_module_css_default.footer,
					children: [
						(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: blocked || !listing || !!error,
							onClick: () => {
								setCreating(true);
								setName("");
							},
							children: l("新建文件夹")
						}),
						(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							"aria-pressed": hidden,
							disabled: busy || creating,
							onClick: () => setHidden(!hidden),
							children: hidden ? l("隐藏隐藏文件") : l("显示隐藏文件")
						}),
						(0, react_jsx_runtime.jsx)("span", {}),
						(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: busy,
							onClick: onClose,
							children: l("取消")
						}),
						(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: blocked || !listing || !!error || editing,
							onClick: () => void perform(() => onPick(listing.path)),
							children: busy ? l("正在准备工作区与流程…") : l("打开")
						})
					]
				}),
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: WorkspaceDirectoryPicker_module_css_default.navigation,
						children: [(0, react_jsx_runtime.jsxs)("nav", {
							"aria-label": l("目录路径"),
							children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								disabled: busy || creating,
								onClick: () => navigate(),
								children: l("主目录")
							}), listing?.crumbs.map((crumb) => (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								disabled: busy || creating,
								title: crumb.path,
								onClick: () => navigate(crumb.path),
								children: crumb.name
							}, crumb.path))]
						}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							size: "sm",
							disabled: busy || creating,
							onClick: () => {
								setPath(target.path ?? listing?.path ?? "");
								setEditing(!editing);
							},
							children: l("编辑路径")
						})]
					}),
					editing && (0, react_jsx_runtime.jsxs)("form", {
						className: WorkspaceDirectoryPicker_module_css_default.path,
						onSubmit: (event) => {
							event.preventDefault();
							if (path.trim()) navigate(path.trim());
						},
						children: [(0, react_jsx_runtime.jsx)("input", {
							autoFocus: true,
							"aria-label": l("目录路径"),
							value: path,
							onChange: (event) => setPath(event.target.value)
						}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							type: "submit",
							disabled: !path.trim() || busy,
							children: l("前往")
						})]
					}),
					error && (0, react_jsx_runtime.jsxs)("div", {
						role: "alert",
						className: WorkspaceDirectoryPicker_module_css_default.error,
						children: [error, (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							size: "sm",
							disabled: busy,
							onClick: () => setTarget({ ...target }),
							children: l("重试")
						})]
					}),
					creating && (0, react_jsx_runtime.jsxs)("form", {
						className: WorkspaceDirectoryPicker_module_css_default.create,
						onSubmit: (event) => {
							event.preventDefault();
							if (!name.trim() || !listing) return;
							perform(async () => {
								const created = await workspace.createDirectory(listing.path, name.trim());
								if (alive.current) {
									setCreating(false);
									navigate(created);
								}
							});
						},
						children: [
							(0, react_jsx_runtime.jsxs)("label", { children: [l("文件夹名称"), (0, react_jsx_runtime.jsx)("input", {
								autoFocus: true,
								required: true,
								pattern: "[^\\\\/]+",
								value: name,
								disabled: busy,
								onChange: (event) => setName(event.target.value)
							})] }),
							(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								type: "button",
								disabled: busy,
								onClick: () => setCreating(false),
								children: l("取消新建")
							}),
							(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								type: "submit",
								variant: "primary",
								disabled: !name.trim() || busy,
								children: l("创建")
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: WorkspaceDirectoryPicker_module_css_default.directories,
						"aria-label": l("文件夹列表"),
						"aria-busy": loading,
						children: loading ? (0, react_jsx_runtime.jsx)("p", {
							role: "status",
							children: l("正在读取文件夹…")
						}) : !error && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							listing?.entries.filter((entry) => hidden || !entry.hidden).map((entry) => (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busy || creating,
								onClick: () => navigate(entry.path),
								children: [
									(0, react_jsx_runtime.jsxs)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "1.5",
										"aria-hidden": "true",
										children: [(0, react_jsx_runtime.jsx)("path", { d: "M3 7V5h6l2 2h10v13H3V7Z" }), (0, react_jsx_runtime.jsx)("path", { d: "M3 10h18" })]
									}),
									(0, react_jsx_runtime.jsx)("span", { children: entry.name }),
									(0, react_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "›"
									})
								]
							}, entry.path)),
							!listing?.entries.some((entry) => hidden || !entry.hidden) && (0, react_jsx_runtime.jsx)("p", { children: l("此目录下没有可见的子文件夹，可直接打开当前目录。") }),
							listing?.truncated && (0, react_jsx_runtime.jsx)("p", { children: l("文件夹较多，仅显示部分内容；可编辑路径直接前往。") })
						] })
					})
				]
			});
		}
		//#endregion
		//#region lib/client/session-navigation.js
		/** Version-tolerant navigation into durable AgentTeams member transcripts. */
		/** Newer sessions retain view ownership instead of publishing list.current. */
		function currentSessionId(state) {
			if ("current" in state) return state.current;
			return Object.values(state.byId).find((row) => (row.retainedBy?.mainView ?? 0) > 0)?.id;
		}
		/** Independent workflow discussions are ordinary sessions, never captain subagents. */
		function openWorkflowConversation(openMember, sessionId) {
			return openMember(sessionId, sessionId);
		}
		/**
		* Open one member's persisted transcript.
		*
		* Harness rc.8 intentionally removed cold subagents from the ordinary session
		* list. They must first be rediscovered in their parent's catalog, then opened
		* with the exact parent/child/mode address. Older runtimes have only `open()`;
		* the fallback preserves ordinary-session navigation. New layouts also select
		* the Conversation panel and cancel catalog refreshes superseded by navigation.
		*/
		const navigationEpochs = /* @__PURE__ */ new WeakMap();
		const catalogReads = /* @__PURE__ */ new WeakMap();
		async function openAgentTeamMember(sessions, parentSessionId, childSessionId, layout, workspace) {
			const epoch = (navigationEpochs.get(sessions) ?? 0) + 1;
			navigationEpochs.set(sessions, epoch);
			if (parentSessionId === childSessionId) {
				if (workspace) workspace.openSession(childSessionId);
				else if (sessions.open) sessions.open(childSessionId);
				else throw new Error("Harness does not expose session navigation");
				layout?.selectPanel?.(null);
				return "session";
			}
			if (sessions.open === void 0 && workspace !== void 0) {
				workspace.openSession({
					parentSessionId,
					childSessionId,
					mode: "continuable"
				});
				return "subagent";
			}
			const navigation = layout?.beginNavigation?.();
			if (sessions.openSubagent === void 0 || sessions.refreshSubagents === void 0) {
				if (sessions.open === void 0) throw new Error("Harness does not expose session navigation");
				sessions.open(childSessionId);
				layout?.selectPanel?.(null);
				return "session";
			}
			const known = sessions.subagentAddress?.(childSessionId);
			if (known?.parentSessionId === parentSessionId && known.childSessionId === childSessionId) {
				if (navigation?.aborted) return "cancelled";
				sessions.openSubagent(known);
				layout?.selectPanel?.(null);
				return "subagent";
			}
			let reads = catalogReads.get(sessions);
			if (!reads) {
				reads = /* @__PURE__ */ new Map();
				catalogReads.set(sessions, reads);
			}
			let pending = reads.get(parentSessionId);
			if (!pending) {
				pending = Promise.resolve().then(() => sessions.refreshSubagents(parentSessionId));
				reads.set(parentSessionId, pending);
				pending.finally(() => {
					if (reads.get(parentSessionId) === pending) reads.delete(parentSessionId);
				}).catch(() => {});
			}
			try {
				await pending;
			} catch (error) {
				if (navigation?.aborted || navigationEpochs.get(sessions) !== epoch) return "cancelled";
				throw error;
			}
			if (navigation?.aborted || navigationEpochs.get(sessions) !== epoch) return "cancelled";
			const retained = sessions.subagentAddress?.(childSessionId);
			sessions.openSubagent(retained?.parentSessionId === parentSessionId ? retained : {
				parentSessionId,
				childSessionId,
				mode: "continuable"
			});
			layout?.selectPanel?.(null);
			return "subagent";
		}
		/** Blank sessions suppress the host's normal header actions. */
		function blankTeamflowSession(state, conversationVisible) {
			const id = currentSessionId(state);
			return conversationVisible && id && state.byId[id]?.blank ? id : void 0;
		}
		//#endregion
		//#region lib/client/workflow-launcher.js
		function selectedWorkflowWorkspace(workspaces, sessions) {
			const current = currentSessionId(sessions);
			return current && sessions.byId[current]?.blank !== true ? workspaces.find((workspace) => workspace.sessionIds.includes(current)) : void 0;
		}
		async function workflowLauncherRequest(action, fields = {}) {
			return workflowRequest({
				action,
				...fields
			});
		}
		/** Owns one fresh conversation across retries, and releases it with the panel. */
		var WorkflowLaunchController = class {
			sessions;
			request;
			attempt;
			disposed = false;
			busy = false;
			constructor(sessions, request = workflowLauncherRequest) {
				this.sessions = sessions;
				this.request = request;
			}
			release() {
				this.attempt?.reference.release();
				this.attempt = void 0;
			}
			dispose() {
				this.disposed = true;
				this.release();
			}
			async launch(input, workspace, signal) {
				if (this.busy) throw new Error("流程正在创建，请稍候");
				this.busy = true;
				const check = () => {
					signal.throwIfAborted();
					if (this.disposed) throw new Error("Workflow entry closed");
				};
				try {
					check();
					const key = JSON.stringify([
						workspace.workspaceId,
						input.template.id,
						input.template.version,
						input.name,
						input.goal,
						input.language
					]);
					if (this.attempt?.key !== key) {
						this.release();
						const sessionId = await this.sessions.create({ workspaceId: workspace.workspaceId });
						check();
						this.attempt = {
							key,
							reference: this.sessions.retain(sessionId, {
								source: "teamflowLauncher",
								signal
							})
						};
					}
					const reference = this.attempt.reference;
					await reference.ready;
					check();
					const same = (team) => team && team.workflow?.templateSource?.id === input.template.id && team.workflow.templateSource.version === input.template.version && team.name === input.name.trim() && team.description === input.goal.trim();
					let team = (await this.request("state", { sessionId: reference.sessionId })).team;
					check();
					if (team && !same(team)) throw new Error("新对话已有其他流程，请返回模板库后重试");
					if (!team) try {
						team = (await this.request("template_apply", {
							sessionId: reference.sessionId,
							templateId: input.template.id,
							version: input.template.version,
							name: input.name,
							description: input.goal,
							language: input.language
						})).team;
					} catch (error) {
						check();
						const recovered = (await this.request("state", { sessionId: reference.sessionId }).catch(() => ({}))).team;
						if (!same(recovered)) throw error;
						team = recovered;
					}
					check();
					if (!team) throw new Error("未能创建流程，请查看页面错误或刷新重试");
					return {
						sessionId: reference.sessionId,
						team
					};
				} finally {
					this.busy = false;
				}
			}
		};
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/WorkflowLauncher.module.css.mjs
		const css$3 = ".EoXFMW_launcher{--wb-bg:var(--dsw-alias-bg-layer-1,light-dark(#fff,#24272c));--wb-base:var(--dsw-alias-bg-base,light-dark(#f6f7f9,#181a1e));--wb-text:var(--dsw-alias-label-primary,light-dark(#26303d,#e3e6ec));--wb-muted:var(--dsw-alias-label-secondary,light-dark(#737d8b,#a0a8b5));--wb-border:var(--dsw-alias-border-l2,light-dark(#e1e5eb,#363940));--wb-accent:var(--dsw-alias-state-business-primary,light-dark(#2866d7,#82b4ff));--wb-error:var(--dsw-alias-state-error-primary,light-dark(#b94444,#ef9797));background:var(--wb-base);height:100%;min-height:0;color:var(--wb-text);font-size:14px;overflow:auto}.EoXFMW_header{background:var(--wb-bg);border-bottom:1px solid var(--wb-border);align-items:center;gap:12px;padding:20px 32px;display:flex}.EoXFMW_header h1{margin:0;font-size:20px}.EoXFMW_header p{color:var(--wb-muted);margin:4px 0 0;font-size:12px}.EoXFMW_header>span{color:var(--wb-muted);margin-left:auto;font-size:12px}.EoXFMW_gallery{min-height:0}.EoXFMW_gallery[hidden]{display:none}.EoXFMW_choose{overflow-wrap:anywhere;max-width:760px;margin:auto;padding:28px}.EoXFMW_choose h2{font-size:24px}.EoXFMW_choose p{line-height:1.7}.EoXFMW_choose button,.EoXFMW_choose input{font:inherit;color:inherit;border:1px solid var(--wb-border);background:var(--wb-bg);border-radius:8px;padding:9px 12px}.EoXFMW_choose button{cursor:pointer}.EoXFMW_choose button:disabled{opacity:.5;cursor:not-allowed}.EoXFMW_choose :is(button,input):focus-visible{outline:2px solid var(--wb-accent);outline-offset:2px}.EoXFMW_summary{border:1px solid var(--wb-border);background:var(--wb-bg);border-radius:12px;padding:16px}.EoXFMW_summary p{white-space:pre-wrap;max-height:96px;margin-bottom:0;overflow:auto}.EoXFMW_projects{overscroll-behavior:contain;max-height:240px;margin:10px 0 0;overflow:auto}.EoXFMW_projects>button{text-align:left;flex-direction:column;gap:4px;width:100%;margin-top:8px;display:flex}.EoXFMW_projects small{color:var(--wb-muted);white-space:nowrap;text-overflow:ellipsis;max-width:100%;overflow:hidden}.EoXFMW_choose label{flex-direction:column;gap:8px;margin:16px 0;display:flex}.EoXFMW_choose .EoXFMW_primary{background:var(--wb-accent);color:var(--wb-bg);border-color:var(--wb-accent)}.EoXFMW_error{color:var(--wb-error);white-space:pre-wrap;overflow-wrap:anywhere;margin:16px 28px}@media (width<=700px){.EoXFMW_header{flex-wrap:wrap;padding:16px}.EoXFMW_header>span{margin:0}.EoXFMW_choose{padding:20px}}.EoXFMW_hint{color:var(--wb-muted);font-size:12px}.EoXFMW_workspaceToolbar{justify-content:space-between;align-items:center;gap:12px;margin:20px 0 10px;display:flex}.EoXFMW_workspaceToolbar h3{margin:0;font-size:14px}.EoXFMW_workspaceToolbar small{color:var(--wb-muted);font-weight:400}.EoXFMW_workspaceSearch{box-sizing:border-box;width:100%}";
		const tagId$3 = "@yogurtss/dsh-teamflow/WorkflowLauncher.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var WorkflowLauncher_module_css_default = {
			"choose": "EoXFMW_choose",
			"error": "EoXFMW_error",
			"gallery": "EoXFMW_gallery",
			"header": "EoXFMW_header",
			"hint": "EoXFMW_hint",
			"launcher": "EoXFMW_launcher",
			"primary": "EoXFMW_primary",
			"projects": "EoXFMW_projects",
			"summary": "EoXFMW_summary",
			"workspaceSearch": "EoXFMW_workspaceSearch",
			"workspaceToolbar": "EoXFMW_workspaceToolbar"
		};
		//#endregion
		//#region lib/client/WorkflowLauncher.js
		function Launcher({ sessions, workspaces, uiWorkspace, modelDirectories, t, openMember }) {
			const l = useWorkflowText();
			const workspaceSource = (0, react.useMemo)(() => ({
				subscribe: (listener) => workspaces.list.subscribe(listener),
				getSnapshot: () => workspaces.list.getSnapshot()
			}), [workspaces]);
			const sessionSource = (0, react.useMemo)(() => ({
				subscribe: (listener) => sessions.list.subscribe(listener),
				getSnapshot: () => sessions.list.getSnapshot()
			}), [sessions]);
			const workspaceState = (0, react.useSyncExternalStore)(workspaceSource.subscribe, workspaceSource.getSnapshot);
			const sessionState = (0, react.useSyncExternalStore)(sessionSource.subscribe, sessionSource.getSnapshot);
			const currentWorkspace = selectedWorkflowWorkspace(workspaceState.items, sessionState);
			const [pending, setPending] = (0, react.useState)();
			const [created, setCreated] = (0, react.useState)();
			const [busy, setBusy] = (0, react.useState)(false), [error, setError] = (0, react.useState)("");
			const [directoryMode, setDirectoryMode] = (0, react.useState)("loading");
			const [adding, setAdding] = (0, react.useState)(false), [query, setQuery] = (0, react.useState)("");
			const filteredWorkspaces = workspaceState.items.filter((item) => `${item.title} ${item.path}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
			const controller = (0, react.useRef)(), lifetime = (0, react.useRef)();
			const busyRef = (0, react.useRef)(false), choiceHeading = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				const abort = new AbortController(), instance = new WorkflowLaunchController(sessions);
				lifetime.current = abort;
				controller.current = instance;
				workflowLauncherRequest("launcher_context").then((result) => {
					if (!abort.signal.aborted) setDirectoryMode(result.directoryPicker ?? "unavailable");
				}).catch(() => {
					if (!abort.signal.aborted) setDirectoryMode("unavailable");
				});
				return () => {
					abort.abort();
					instance.dispose();
				};
			}, [sessions]);
			(0, react.useEffect)(() => {
				if (pending) choiceHeading.current?.focus();
			}, [pending]);
			async function run(action) {
				if (busyRef.current) return;
				busyRef.current = true;
				setBusy(true);
				setError("");
				try {
					await action();
				} catch (error) {
					if (!lifetime.current?.signal.aborted) setError(error instanceof Error ? error.message : String(error));
				} finally {
					busyRef.current = false;
					if (!lifetime.current?.signal.aborted) setBusy(false);
				}
			}
			async function launch(input, workspace) {
				const result = await controller.current.launch(input, workspace, lifetime.current.signal);
				setCreated({
					sessionId: result.sessionId,
					teamId: result.team.id
				});
				setPending(void 0);
			}
			async function adoptDirectory(directory) {
				lifetime.current.signal.throwIfAborted();
				const workspace = await workspaces.create({ path: directory });
				lifetime.current.signal.throwIfAborted();
				if (pending) await launch(pending, workspace);
			}
			async function addWorkspace() {
				if (directoryMode === "native") {
					const chosen = await uiWorkspace.pickDirectory();
					if (chosen) await adoptDirectory(chosen);
				} else if (directoryMode === "browse") setAdding(true);
			}
			return (0, react_jsx_runtime.jsxs)("main", {
				className: WorkflowLauncher_module_css_default.launcher,
				"aria-label": "Workflow",
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: WorkflowLauncher_module_css_default.header,
						children: [
							(0, react_jsx_runtime.jsx)(BrandIcon, { size: 26 }),
							(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("h1", { children: "Workflow" }), (0, react_jsx_runtime.jsx)("p", { children: l("先选择模板、填写需求，再选择工作区。") })] }),
							currentWorkspace && (0, react_jsx_runtime.jsx)("span", { children: l("当前工作区 · {0}", currentWorkspace.title) })
						]
					}),
					error && (0, react_jsx_runtime.jsx)("p", {
						className: WorkflowLauncher_module_css_default.error,
						role: "alert",
						children: workflowMessage(error, l)
					}),
					(0, react_jsx_runtime.jsx)("div", {
						hidden: !!pending || !!created,
						className: WorkflowLauncher_module_css_default.gallery,
						children: (0, react_jsx_runtime.jsx)(TemplateGallery, { onApply: async (template, name, goal) => {
							const input = {
								template,
								name,
								goal,
								language: l.language
							};
							setPending(input);
							if (currentWorkspace) await run(() => launch(input, currentWorkspace));
						} })
					}),
					pending && !created && (0, react_jsx_runtime.jsxs)("section", {
						className: WorkflowLauncher_module_css_default.choose,
						"aria-label": l("选择流程工作区"),
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: () => {
									setPending(void 0);
									setError("");
								},
								children: l("返回修改需求")
							}),
							(0, react_jsx_runtime.jsx)("h2", {
								ref: choiceHeading,
								tabIndex: -1,
								children: l("选择工作区")
							}),
							(0, react_jsx_runtime.jsx)("p", { children: l("模板和需求已保留。选择工作区后，将在其中的新对话中创建流程。") }),
							(0, react_jsx_runtime.jsxs)("div", {
								className: WorkflowLauncher_module_css_default.summary,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: pending.name }), (0, react_jsx_runtime.jsx)("p", { children: pending.goal })]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: WorkflowLauncher_module_css_default.workspaceToolbar,
								children: [(0, react_jsx_runtime.jsxs)("h3", { children: [
									l("已有工作区"),
									" ",
									(0, react_jsx_runtime.jsx)("small", { children: workspaceState.items.length })
								] }), (0, react_jsx_runtime.jsx)("button", {
									className: WorkflowLauncher_module_css_default.primary,
									type: "button",
									disabled: busy || directoryMode === "loading" || directoryMode === "unavailable",
									onClick: () => void run(addWorkspace),
									children: busy ? l("正在准备工作区与流程…") : l("添加工作区")
								})]
							}),
							!!workspaceState.items.length && (0, react_jsx_runtime.jsx)("input", {
								className: WorkflowLauncher_module_css_default.workspaceSearch,
								"aria-label": l("搜索工作区"),
								placeholder: l("搜索工作区名称或路径"),
								value: query,
								onChange: (event) => setQuery(event.target.value)
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: WorkflowLauncher_module_css_default.projects,
								"aria-label": l("已有工作区"),
								children: [filteredWorkspaces.map((workspace) => (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									title: workspace.path,
									disabled: busy,
									onClick: () => void run(() => launch(pending, workspace)),
									children: [(0, react_jsx_runtime.jsx)("strong", { children: workspace.title }), (0, react_jsx_runtime.jsx)("small", { children: workspace.path })]
								}, workspace.workspaceId)), workspaceState.state !== "loading" && !filteredWorkspaces.length && (0, react_jsx_runtime.jsx)("p", {
									className: WorkflowLauncher_module_css_default.hint,
									children: query.trim() ? l("没有匹配的工作区，可更换关键词或添加工作区。") : l("还没有工作区，点击「添加工作区」选择文件夹。")
								})]
							}),
							workspaceState.state === "loading" && (0, react_jsx_runtime.jsx)("p", {
								role: "status",
								children: l("正在读取工作区…")
							}),
							workspaceState.state === "error" && (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								children: l("工作区列表读取失败，仍可添加工作区。")
							}),
							directoryMode === "unavailable" && (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								children: l("目录选择器暂不可用，请检查 DSH 的工作区组件后重试。")
							}),
							adding && (0, react_jsx_runtime.jsx)(WorkspaceDirectoryPicker, {
								workspace: uiWorkspace,
								onClose: () => setAdding(false),
								onPick: async (directory) => {
									await adoptDirectory(directory);
									setAdding(false);
								}
							})
						]
					}),
					created && (0, react_jsx_runtime.jsx)(WorkflowWorkbench, {
						sessionId: created.sessionId,
						teamId: created.teamId,
						initiallyOpen: true,
						entryDiscussion: "adapt",
						t,
						modelDirectory: modelDirectories.directoryFor(created.sessionId),
						openExecution: (target, parent) => openMember(parent ?? created.sessionId, target),
						onClose: () => {
							setCreated(void 0);
							controller.current?.release();
						}
					}, created.sessionId)
				]
			});
		}
		function WorkflowLauncher(props) {
			return (0, react_jsx_runtime.jsx)(WorkflowLocale, {
				t: props.t,
				children: (0, react_jsx_runtime.jsx)(Launcher, { ...props })
			});
		}
		//#endregion
		//#region lib/client/activity-status.js
		/** Completed nodes, not estimated model progress. Scope matches the badge's click target. */
		function activityStatus(team, archived = false) {
			const tasks = team?.tasks ?? [];
			const completed = tasks.filter((t) => t.status === "completed" && (!t.checkpoint || t.checkpoint.decision === "approve")).length;
			const running = archived || team?.halted ? 0 : tasks.filter((t) => !t.workflowPaused && ["claimed", "in_progress"].includes(t.status)).length;
			const reviews = archived || team?.halted || team?.phase === "staged" ? 0 : tasks.filter((t) => t.checkpoint && !t.checkpoint.decision && t.status === "pending" && !t.workflowPaused && !t.workflowRerunRequired && !t.workflowConfigPending && t.dependencies.every((id) => tasks.some((up) => up.id === id && up.status === "completed"))).length;
			const issues = archived ? 0 : tasks.filter((t) => t.status === "failed" || t.checkpoint?.decision === "reject" || t.workflowConfigPending || t.workflowRerunRequired).length;
			const configuration = archived ? 0 : tasks.filter((t) => t.workflowConfigPending && t.status !== "failed" && t.checkpoint?.decision !== "reject" && !t.workflowRerunRequired).length;
			const attention = reviews + issues;
			const done = tasks.length > 0 && completed === tasks.length;
			const paused = !!team?.halted || tasks.some((t) => t.workflowPaused) && !running && !tasks.some((t) => t.status === "pending" && !t.workflowPaused && !t.workflowConfigPending && !t.workflowRerunRequired && !t.checkpoint?.decision);
			return {
				state: done ? "completed" : archived ? "archived" : !team ? "history" : issues ? configuration === issues && !reviews ? "configuration" : "attention" : team.phase === "staged" ? "staged" : reviews ? "review" : paused ? "paused" : running ? "running" : "waiting",
				completed,
				total: tasks.length,
				percent: tasks.length ? Math.floor(completed / tasks.length * 100) : 0,
				running,
				reviews,
				attention
			};
		}
		//#endregion
		//#region lib/client/activity-session.js
		async function resolveActivitySession(sessionId, signal, fetchState = fetch) {
			const fallback = {
				sessionId,
				owner: sessionId
			};
			if (!sessionId.startsWith("session-at-discussion-")) return fallback;
			const response = await fetchState("/plugins/dsh-agent-teams/workflow", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					sessionId,
					action: "state"
				}),
				signal
			});
			if (!response.ok) return fallback;
			const value = await response.json();
			const owner = value.team?.captainSessionId;
			if (!value.currentDiscussion || typeof owner !== "string" || !owner) return fallback;
			return {
				sessionId,
				owner,
				...value.activity?.captainSessionId === owner ? { activity: value.activity } : {}
			};
		}
		//#endregion
		//#region lib/client/QuickMemberEditor.js
		/** Inline member configuration in the activity list, saved via the same workflow API as the canvas. */
		async function request(payload, signal) {
			return workflowRequest(payload, fetch, void 0, signal);
		}
		function QuickMemberEditor({ team, member, directory, t, close, onRerun }) {
			const l = useWorkflowText(t);
			const [base, setBase] = (0, react.useState)("");
			const [role, setRole] = (0, react.useState)(member.role);
			const [route, setRoute] = (0, react.useState)({
				provider: "",
				model: "",
				reasoningEffort: ""
			});
			const [routeChanged, setRouteChanged] = (0, react.useState)(false);
			const [busy, setBusy] = (0, react.useState)(true);
			const [error, setError] = (0, react.useState)("");
			const [tasks, setTasks] = (0, react.useState)([]);
			const [rerunId, setRerunId] = (0, react.useState)("");
			(0, react.useEffect)(() => {
				let live = true;
				const controller = new AbortController();
				setBusy(true);
				setError("");
				request({
					action: "state",
					sessionId: team.captainSessionId,
					teamId: team.teamId
				}, controller.signal).then((result) => {
					const current = result.team.members.find((item) => item.name === member.name);
					if (!current) throw new Error(l("成员不存在"));
					if (live) {
						setBase(result.base);
						setRole(current.role ?? "");
						setRoute({
							provider: current.provider ?? "",
							model: current.model ?? "",
							reasoningEffort: current.reasoningEffort ?? ""
						});
						setRouteChanged(false);
						setTasks(result.team.tasks);
						setRerunId(rerunnableTasks(result.team.tasks, member.name).at(-1)?.id ?? "");
					}
				}).catch((err) => {
					if (live) setError(err instanceof Error ? err.message : String(err));
				}).finally(() => {
					if (live) setBusy(false);
				});
				return () => {
					live = false;
					controller.abort();
				};
			}, [
				team.captainSessionId,
				team.teamId,
				member.name
			]);
			async function save(rerun = false) {
				setBusy(true);
				setError("");
				try {
					const operations = [{
						action: "update_member",
						name: member.name,
						role,
						...routeChanged ? {
							...route,
							reasoningEffort: route.reasoningEffort || "default"
						} : {}
					}];
					if (rerun && !rerunId) throw new Error(l("请选择重跑任务"));
					await request({
						action: "edit",
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						title: l("调整 {0} 的配置{1}", member.name, rerun ? l("并进入任务编辑") : ""),
						base,
						operations
					});
					if (rerun) onRerun(rerunId);
					close();
				} catch (err) {
					setError(err instanceof Error ? err.message : String(err));
				} finally {
					setBusy(false);
				}
			}
			return (0, react_jsx_runtime.jsxs)("form", {
				className: ActivityPanel_module_css_default.quickMember,
				"aria-label": l("配置 {0}", member.name),
				onSubmit: (event) => {
					event.preventDefault();
					save(event.nativeEvent.submitter?.getAttribute("data-rerun") === "true");
				},
				children: [
					(0, react_jsx_runtime.jsxs)("strong", { children: [l("配置 · "), member.name] }),
					(0, react_jsx_runtime.jsx)(StagedModelPicker, {
						directory,
						t,
						...route,
						busy: busy || !base,
						onChange: (value) => {
							setRoute(value);
							setRouteChanged(true);
						}
					}),
					(0, react_jsx_runtime.jsxs)("label", { children: [l("职责"), (0, react_jsx_runtime.jsx)("textarea", {
						value: role,
						disabled: busy || !base,
						onChange: (event) => setRole(event.target.value)
					})] }),
					(0, react_jsx_runtime.jsx)(TaskRerunPicker, {
						tasks,
						member: member.name,
						taskId: rerunId,
						disabled: busy || !base,
						onTask: setRerunId
					}),
					error && (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						children: workflowMessage(error, l)
					}),
					(0, react_jsx_runtime.jsxs)("div", { children: [
						(0, react_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy || !base,
							children: l("保存")
						}),
						rerunId && (0, react_jsx_runtime.jsx)("button", {
							type: "submit",
							"data-rerun": "true",
							disabled: busy || !base,
							children: l("保存成员并编辑重跑要求")
						}),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: close,
							children: l("取消")
						})
					] })
				]
			});
		}
		//#endregion
		//#region lib/client/WorkflowHistory.js
		/** History comes from activity snapshots, never from the mutable workflow API. */
		function WorkflowHistory({ name, children, restore }) {
			const l = useWorkflowText();
			const dialog = (0, react.useRef)(null);
			const [busy, setBusy] = (0, react.useState)(false), [error, setError] = (0, react.useState)(""), [restored, setRestored] = (0, react.useState)(false);
			async function restoreWorkflow() {
				if (!restore || busy) return;
				setBusy(true);
				setError("");
				try {
					const result = await workflowRequest({
						action: "restore_archive",
						sessionId: restore.sessionId,
						teamId: restore.teamId
					});
					if (!result.activity) throw new Error(result.error ?? l("恢复失败，请重新连接后重试"));
					setRestored(true);
					dialog.current?.close();
					publishWorkflowActivity(result.activity);
				} catch (err) {
					setError(err instanceof Error ? err.message : String(err));
				} finally {
					setBusy(false);
				}
			}
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: `${WorkflowWorkbench_module_css_default.entry} ${WorkflowWorkbench_module_css_default.launcher}`,
				"aria-haspopup": "dialog",
				onClick: () => dialog.current?.showModal(),
				children: [(0, react_jsx_runtime.jsxs)("strong", { children: [l("团队与流程 "), (0, react_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: "↗"
				})] }), (0, react_jsx_runtime.jsxs)("span", { children: [
					name,
					" ",
					l(" · 历史记录，只读")
				] })]
			}), (0, react_dom.createPortal)((0, react_jsx_runtime.jsxs)("dialog", {
				ref: dialog,
				className: `${WorkflowWorkbench_module_css_default.entry} ${WorkflowWorkbench_module_css_default.historyDialog}`,
				"aria-label": l("{0} · 团队与流程（只读）", name),
				children: [
					(0, react_jsx_runtime.jsxs)("header", { children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: name }), (0, react_jsx_runtime.jsx)("p", { children: l("历史记录 · 只读") })] }), (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						autoFocus: true,
						onClick: () => dialog.current?.close(),
						children: l("关闭")
					})] }),
					restore && (0, react_jsx_runtime.jsxs)("section", { children: [
						(0, react_jsx_runtime.jsx)("p", { children: l("可恢复为待确认流程：保留已完成成果与原归档，重新建立空闲成员；不会自动执行。请确认成员配置后启动，人工节点仍需正式验收。") }),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy || restored,
							onClick: () => void restoreWorkflow(),
							children: busy ? l("正在恢复…") : restored ? l("已恢复，请查看当前团队") : l("恢复为待确认流程")
						}),
						error && (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							children: workflowMessage(error, l)
						})
					] }),
					children
				]
			}), document.body)] });
		}
		/** Compact `provider/model` route, or just the model when the provider is absent. */
		function memberRouteLabel(member) {
			if (member === void 0) return "";
			const provider = member.provider?.trim() ?? "";
			const model = member.model?.trim() ?? "";
			if (provider !== "" && model !== "") return `${provider}/${model}`;
			return model;
		}
		/**
		* Compact route shown on a running task. Prefer the task's own snapshot
		* field; fall back to the assignee member when older hosts omit it.
		*/
		function taskModelLabel(task, members) {
			const direct = task.model?.trim() ?? "";
			if (direct !== "") return direct;
			return memberRouteLabel(members.find((candidate) => candidate.name === task.assignee));
		}
		/** Short model id for tight DAG/chip surfaces (`openai/gpt-5.6-sol` → `gpt-5.6-sol`). */
		function compactModelLabel(route) {
			const trimmed = route.trim();
			if (trimmed === "") return "";
			const slash = trimmed.lastIndexOf("/");
			return slash === -1 ? trimmed : trimmed.slice(slash + 1);
		}
		/**
		* Latest terminal-task `updatedAt` owned by one member.
		* @param memberName - member whose owned tasks are scanned.
		* @param tasks - team tasks carrying durable `updatedAt` stamps.
		* @returns the newest terminal stamp, or undefined when the member owns none.
		*/
		function memberFinishedAt(memberName, tasks) {
			let latest;
			for (const task of tasks) {
				if (task.assignee !== memberName) continue;
				if (task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled") continue;
				const stamp = task.updatedAt;
				if (typeof stamp !== "number" || !Number.isFinite(stamp)) continue;
				if (latest === void 0 || stamp > latest) latest = stamp;
			}
			return latest;
		}
		/** Whether a member still has live work (running activity or an open task). */
		function memberIsRunning(member, tasks) {
			if (member.activity === "working" || member.status === "working") return true;
			return tasks.some((task) => task.assignee === member.name && (task.status === "pending" || task.status === "claimed" || task.status === "in_progress"));
		}
		/**
		* Order the delegation member list for issue #192.
		*
		* Running members keep their incoming relative order and come first; finished
		* members follow sorted by finish time, newest first. Members without a
		* derivable finish time keep their incoming relative order after the stamped
		* ones, so an older host that omits stamps never reorders them randomly.
		* @param members - delegation roster in snapshot order.
		* @param tasks - team tasks carrying durable `updatedAt` stamps.
		* @returns the members in display order.
		*/
		function orderDelegationMembers(members, tasks) {
			const running = [];
			const finishedStamped = [];
			const finishedUnstamped = [];
			members.forEach((member, index) => {
				if (memberIsRunning(member, tasks)) {
					running.push({
						member,
						index
					});
					return;
				}
				const finishedAt = memberFinishedAt(member.name, tasks);
				if (finishedAt === void 0) finishedUnstamped.push({
					member,
					index
				});
				else finishedStamped.push({
					member,
					index,
					finishedAt
				});
			});
			finishedStamped.sort((left, right) => right.finishedAt - left.finishedAt || left.index - right.index);
			return [
				...running,
				...finishedStamped,
				...finishedUnstamped
			].map((entry) => entry.member);
		}
		/** Whether the captain chat should keep showing the in-progress banner. */
		function teamIsActive(team) {
			if (team.halted === true || team.phase === "staged") return false;
			if (team.members.some((member) => member.activity === "working" || member.status === "working")) return true;
			if (team.tasks.some((task) => task.status === "pending" || task.status === "claimed" || task.status === "in_progress")) return true;
			return team.members.length > 0 && team.tasks.length === 0;
		}
		/** Use a fill-width grid when the task graph has no real dependency edges. */
		function usesParallelTaskGrid(tasks) {
			if (tasks.length === 0) return false;
			const taskIds = new Set(tasks.map((task) => task.id));
			return tasks.every((task) => task.dependencies.every((dependency) => !taskIds.has(dependency)));
		}
		/**
		* Whether an expanded activity panel still belongs to the current session.
		*
		* The panel is mounted in the root-scoped shell overlay, so React does not
		* remount it when the conversation route changes. Ownership keeps an expanded
		* panel from leaking onto the new-session screen (or another conversation)
		* while its local open state is being reset.
		*/
		function activityPanelExpandedForSession(open, owner, current) {
			return open && owner !== void 0 && owner === current;
		}
		/**
		* Resolve the task whose dependency chain should be highlighted.
		*
		* A pinned task is an explicit user choice. Keyboard focus takes precedence
		* over delayed pointer intent so an older hover timer cannot steal the active
		* chain from someone navigating the task map with the keyboard.
		*/
		function dependencyFocusTaskId(pinnedTaskId, keyboardTaskId, hoverTaskId) {
			return pinnedTaskId ?? keyboardTaskId ?? hoverTaskId;
		}
		/** Group tasks by their precomputed dependency depth. */
		function taskStages(tasks) {
			const byDepth = /* @__PURE__ */ new Map();
			for (const task of tasks) {
				const depth = Number.isFinite(task.depth) ? Math.max(0, Math.floor(task.depth)) : 0;
				const stage = byDepth.get(depth) ?? [];
				stage.push(task);
				byDepth.set(depth, stage);
			}
			return [...byDepth.entries()].sort(([left], [right]) => left - right).map(([depth, stageTasks]) => ({
				depth,
				tasks: stageTasks.slice().sort((left, right) => left.id.localeCompare(right.id, "en", { numeric: true }))
			}));
		}
		/**
		* Lay tasks out as the reference panel's compact left-to-right DAG.
		*
		* Columns are dependency-depth stages. Rows are stable task-id order within
		* each stage. Edges use cubic curves so fan-in remains readable without
		* turning every task into a large card.
		*/
		function compactDagLayout(tasks, dimensions) {
			const nodeWidth = dimensions?.nodeWidth ?? 112;
			const nodeHeight = dimensions?.nodeHeight ?? 56;
			const columnGap = dimensions?.columnGap ?? 26;
			const rowGap = dimensions?.rowGap ?? 8;
			const stages = taskStages(tasks);
			const positions = /* @__PURE__ */ new Map();
			const nodes = [];
			for (const [column, stage] of stages.entries()) for (const [row, task] of stage.tasks.entries()) {
				const x = column * (nodeWidth + columnGap);
				const y = row * (nodeHeight + rowGap);
				positions.set(task.id, {
					x,
					y
				});
				nodes.push({
					task,
					x,
					y
				});
			}
			const edges = [];
			for (const task of tasks) {
				const target = positions.get(task.id);
				if (target === void 0) continue;
				for (const dependency of task.dependencies) {
					const source = positions.get(dependency);
					if (source === void 0) continue;
					const x1 = source.x + nodeWidth;
					const y1 = source.y + nodeHeight / 2;
					const x2 = target.x;
					const y2 = target.y + nodeHeight / 2;
					edges.push({
						from: dependency,
						to: task.id,
						path: `M${x1} ${y1}C${x1 + 14} ${y1},${x2 - 14} ${y2},${x2} ${y2}`
					});
				}
			}
			const rows = Math.max(1, ...stages.map((stage) => stage.tasks.length));
			return {
				width: stages.length === 0 ? 0 : stages.length * nodeWidth + (stages.length - 1) * columnGap,
				height: stages.length === 0 ? 0 : rows * nodeHeight + (rows - 1) * rowGap,
				nodes,
				edges
			};
		}
		/**
		* Return the complete upstream/downstream chain around one task.
		*
		* Traversal uses both dependency directions and remains cycle-safe, so the UI
		* can highlight every handoff related to the focused task even if malformed
		* durable data contains a cycle.
		*/
		function relatedTaskIds(taskId, tasks) {
			const byId = new Map(tasks.map((task) => [task.id, task]));
			if (!byId.has(taskId)) return /* @__PURE__ */ new Set();
			const dependents = /* @__PURE__ */ new Map();
			for (const task of tasks) for (const dependency of task.dependencies) {
				const targets = dependents.get(dependency) ?? [];
				targets.push(task.id);
				dependents.set(dependency, targets);
			}
			const related = /* @__PURE__ */ new Set();
			const upstreamSeen = /* @__PURE__ */ new Set();
			const downstreamSeen = /* @__PURE__ */ new Set();
			const visitUpstream = (id) => {
				if (upstreamSeen.has(id)) return;
				upstreamSeen.add(id);
				related.add(id);
				for (const dependency of byId.get(id)?.dependencies ?? []) visitUpstream(dependency);
			};
			const visitDownstream = (id) => {
				if (downstreamSeen.has(id)) return;
				downstreamSeen.add(id);
				related.add(id);
				for (const dependent of dependents.get(id) ?? []) visitDownstream(dependent);
			};
			visitUpstream(taskId);
			visitDownstream(taskId);
			return related;
		}
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/AgentTeamsCard.module.css.mjs
		const css$2 = ".oflnFa_root{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:10px;flex-direction:column;gap:8px;width:100%;min-width:0;padding:10px 12px;display:flex}.oflnFa_head{align-items:center;gap:8px;min-width:0;display:flex}.oflnFa_leadAvatar{object-fit:contain;filter:none;background:0 0;border:0;border-radius:0;flex:none;width:30px;height:30px}.oflnFa_teamName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:0 auto;font-size:13px;font-weight:600;line-height:20px;overflow:hidden}.oflnFa_memberCount{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;margin-left:auto;font-size:11px;line-height:16px}.oflnFa_panelButton{border:1px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;flex:none;padding:2px 8px;font-size:10.5px;font-weight:600;line-height:16px;transition:border-color .12s,color .12s}.oflnFa_panelButton:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}.oflnFa_panelButton:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.oflnFa_members{flex-wrap:wrap;gap:6px;min-width:0;display:flex}.oflnFa_member{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);max-width:160px;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;align-items:center;gap:5px;padding:3px 8px 3px 3px;font-size:11px;font-weight:500;line-height:16px;transition:border-color .12s,background-color .12s;display:inline-flex}.oflnFa_member:hover{border-color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-button-ghost-active-fill)}.oflnFa_member:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.oflnFa_memberArt{object-fit:contain;filter:none;background:0 0;border:0;border-radius:0;width:24px;height:24px}.oflnFa_memberInitial{background:var(--dsw-alias-state-business-primary);width:20px;height:20px;color:var(--dsw-alias-label-primary-inverted);border-radius:50%;justify-content:center;align-items:center;font-size:10px;font-weight:600;line-height:20px;display:inline-flex}.oflnFa_memberName{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.oflnFa_turnCards{gap:8px;margin-block:10px;display:grid}@media (width<=600px){.oflnFa_head{flex-wrap:wrap}}";
		const tagId$2 = "@yogurtss/dsh-teamflow/AgentTeamsCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var AgentTeamsCard_module_css_default = {
			"head": "oflnFa_head",
			"leadAvatar": "oflnFa_leadAvatar",
			"member": "oflnFa_member",
			"memberArt": "oflnFa_memberArt",
			"memberCount": "oflnFa_memberCount",
			"memberInitial": "oflnFa_memberInitial",
			"memberName": "oflnFa_memberName",
			"members": "oflnFa_members",
			"panelButton": "oflnFa_panelButton",
			"root": "oflnFa_root",
			"teamName": "oflnFa_teamName",
			"turnCards": "oflnFa_turnCards"
		};
		//#endregion
		//#region lib/client/AgentTeamsCard.js
		/**
		* AgentTeams conversation card: the lightweight in-conversation summary for
		* one team — the captain's role avatar and name, the member roster as
		* clickable role avatars (opening the member's subagent transcript), and
		* an "activity panel" button that re-activates the top-right floater.
		*
		* The floater and this card share the `agent-teams:open-panel` window event
		* so the card can summon the panel even after it was closed (or when an old
		* session is re-opened for review).
		* @module dsh-agent-teams/client/card
		*/
		/** Window event name the floater listens for to open itself. */
		const OPEN_PANEL_EVENT = "agent-teams:open-panel";
		/** Open the matching team view, carrying this team's summary
		* so the panel can show it even when the team no longer exists on disk
		* (historical session review). */
		function openActivityPanel(data) {
			window.dispatchEvent(new CustomEvent(OPEN_PANEL_EVENT, { detail: {
				teamId: data.teamId,
				captainSessionId: data.captainSessionId,
				teamName: data.teamName,
				members: data.members
			} }));
		}
		/** Render one durable team as a compact conversation card. */
		const noWorkspace = () => void 0;
		const noSubscription = () => () => {};
		function AgentTeamsCard({ node, openMember, sessionId, t, workspaceBridge }) {
			const native = (0, react.useSyncExternalStore)(workspaceBridge?.subscribe ?? noSubscription, workspaceBridge?.getSnapshot ?? noWorkspace);
			const location = node.location;
			if (native && (location.kind === "turn" || location.kind === "step") && location.turn.status === "closed") return null;
			return (0, react_jsx_runtime.jsx)(AgentTeamsSummary, {
				data: node.data,
				openMember,
				sessionId,
				t
			});
		}
		function AgentTeamsSummary({ data, openMember, sessionId, t }) {
			const owner = data.captainSessionId || sessionId;
			const { teams, archivedTeams } = (0, react.useSyncExternalStore)(subscribeActivitySnapshots, getActivitySnapshotsSnapshot);
			(0, react.useEffect)(() => {
				return monitorAgentTeam(owner, data.teamId);
			}, [data.teamId, owner]);
			const snapshot = teams.find((team) => team.teamId === data.teamId && (owner === "" || team.captainSessionId === owner)) ?? archivedTeams.find((team) => team.teamId === data.teamId && (owner === "" || team.captainSessionId === owner));
			const resolved = (0, react.useMemo)(() => ({
				...data,
				captainSessionId: snapshot?.captainSessionId ?? owner,
				teamName: snapshot?.name ?? data.teamName,
				members: snapshot?.members.map((member) => ({
					id: member.id,
					name: member.name,
					role: member.role
				})) ?? data.members
			}), [
				data,
				owner,
				snapshot
			]);
			return (0, react_jsx_runtime.jsxs)("section", {
				className: AgentTeamsCard_module_css_default.root,
				"data-agent-teams-card": true,
				"data-team-id": resolved.teamId,
				children: [(0, react_jsx_runtime.jsxs)("header", {
					className: AgentTeamsCard_module_css_default.head,
					children: [
						(0, react_jsx_runtime.jsx)("img", {
							className: AgentTeamsCard_module_css_default.leadAvatar,
							src: LEAD_ART,
							alt: "",
							"aria-hidden": true
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: AgentTeamsCard_module_css_default.teamName,
							title: resolved.teamName,
							children: resolved.teamName
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: AgentTeamsCard_module_css_default.memberCount,
							children: t("card.memberCount", { count: resolved.members.length })
						}),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: AgentTeamsCard_module_css_default.panelButton,
							onClick: () => {
								openActivityPanel(resolved);
							},
							"aria-label": t("action.openActivityPanel"),
							title: t("action.openActivityPanel"),
							children: t("activity.panelButton")
						})
					]
				}), resolved.members.length > 0 && (0, react_jsx_runtime.jsx)("div", {
					className: AgentTeamsCard_module_css_default.members,
					children: resolved.members.map((member) => (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: AgentTeamsCard_module_css_default.member,
						onClick: () => {
							if (member.id !== "") openMember(owner, member.id);
						},
						title: member.role === "" ? member.name : `${member.name} · ${member.role}`,
						children: [memberArtUrl(member.name, member.role) !== null ? (0, react_jsx_runtime.jsx)("img", {
							className: AgentTeamsCard_module_css_default.memberArt,
							src: memberArtUrl(member.name, member.role) ?? "",
							alt: "",
							"aria-hidden": true
						}) : (0, react_jsx_runtime.jsx)("span", {
							className: AgentTeamsCard_module_css_default.memberInitial,
							children: member.name.trim().slice(0, 1).toUpperCase() || "?"
						}), (0, react_jsx_runtime.jsx)("span", {
							className: AgentTeamsCard_module_css_default.memberName,
							children: member.name
						})]
					}, member.id || member.name))
				})]
			});
		}
		//#endregion
		//#region lib/client/panel-geometry.js
		/** Pure persisted geometry rules for the AgentTeams shell-overlay panel. */
		const PANEL_LAYOUT_STORAGE_KEY = "dsh-agent-teams:activity-panel:v1";
		const DEFAULT_PANEL_LAYOUT = Object.freeze({
			mode: "docked",
			x: 0,
			y: 64,
			width: 388,
			height: 640,
			heightMode: "auto"
		});
		function clamp(value, minimum, maximum) {
			return Math.min(Math.max(value, minimum), maximum);
		}
		function finite(value) {
			return typeof value === "number" && Number.isFinite(value);
		}
		/** Decode one versioned localStorage value, rejecting partial/corrupt state. */
		function parsePanelLayout(value) {
			if (value === null) return DEFAULT_PANEL_LAYOUT;
			try {
				const parsed = JSON.parse(value);
				if (typeof parsed !== "object" || parsed === null) return DEFAULT_PANEL_LAYOUT;
				const record = parsed;
				if (record.mode !== "docked" && record.mode !== "floating" || !finite(record.x) || !finite(record.y) || !finite(record.width) || !finite(record.height)) return DEFAULT_PANEL_LAYOUT;
				return {
					mode: record.mode,
					x: record.x,
					y: record.y,
					width: record.width,
					height: record.height,
					heightMode: record.mode === "floating" && record.heightMode === "manual" ? "manual" : "auto"
				};
			} catch {
				return DEFAULT_PANEL_LAYOUT;
			}
		}
		/** Whether the panel should become a simple inset overlay with no gestures. */
		function compactPanelForBounds(bounds) {
			return bounds.width <= 960;
		}
		/** Docked and compact panels always fit content; floating panels may be user-sized. */
		function panelUsesAutoHeight(layout, bounds) {
			return compactPanelForBounds(bounds) || layout.mode === "docked" || layout.heightMode === "auto";
		}
		/** CSS max-height ceiling that keeps an auto-height panel inside its shell. */
		function panelMaximumHeight(layout, bounds) {
			const bottomInset = compactPanelForBounds(bounds) || layout.mode === "floating" ? 12 : 48;
			return Math.max(1, bounds.height - layout.y - bottomInset);
		}
		/** Resolve persisted state into a visible rectangle inside the current shell. */
		function resolvePanelGeometry(layout, bounds) {
			const boundsWidth = Math.max(1, bounds.width);
			const boundsHeight = Math.max(1, bounds.height);
			if (compactPanelForBounds(bounds)) return {
				...layout,
				x: 12,
				y: 12,
				width: Math.max(1, boundsWidth - 24),
				height: Math.max(1, boundsHeight - 24)
			};
			const maximumWidth = Math.max(1, Math.min(640, boundsWidth - 24));
			const minimumWidth = Math.min(320, maximumWidth);
			const width = clamp(layout.width, minimumWidth, maximumWidth);
			const maximumHeight = Math.max(1, boundsHeight - 24);
			const minimumHeight = Math.min(360, maximumHeight);
			if (layout.mode === "docked") {
				const y = clamp(64, 12, Math.max(12, boundsHeight - minimumHeight - 12));
				const availableHeight = Math.max(1, boundsHeight - y - 48);
				const height = clamp(availableHeight, Math.min(minimumHeight, availableHeight), maximumHeight);
				const anchorRight = clamp(bounds.anchorRight, 0, boundsWidth);
				const maximumX = Math.max(12, boundsWidth - width - 12);
				return {
					mode: "docked",
					x: clamp(anchorRight - 18 - width, 12, maximumX),
					y,
					width,
					height,
					heightMode: layout.heightMode
				};
			}
			const height = clamp(layout.height, minimumHeight, maximumHeight);
			return {
				mode: "floating",
				x: clamp(layout.x, 12, Math.max(12, boundsWidth - width - 12)),
				y: clamp(layout.y, 12, Math.max(12, boundsHeight - height - 12)),
				width,
				height,
				heightMode: layout.heightMode
			};
		}
		/** Undock without a visual jump by adopting the panel's resolved rectangle. */
		function floatPanelLayout(geometry, bounds) {
			return resolvePanelGeometry({
				...geometry,
				mode: "floating"
			}, bounds);
		}
		/** Return to the right dock, preserving width and restoring content-fit height. */
		function dockPanelLayout(layout, bounds) {
			return resolvePanelGeometry({
				...layout,
				mode: "docked",
				heightMode: "auto"
			}, bounds);
		}
		/** Translate a floating panel and clamp it back into the visible shell. */
		function movePanelLayout(start, dx, dy, bounds) {
			return resolvePanelGeometry({
				...start,
				mode: "floating",
				x: start.x + dx,
				y: start.y + dy
			}, bounds);
		}
		/** Resize while keeping the edge opposite the active handle stationary. */
		function resizePanelLayout(start, edge, dx, dy, bounds) {
			if (start.mode === "docked") {
				if (edge !== "left") return resolvePanelGeometry(start, bounds);
				return resolvePanelGeometry({
					...start,
					width: start.width - dx
				}, bounds);
			}
			const resolved = resolvePanelGeometry(start, bounds);
			const minimumWidth = Math.min(320, resolved.x + resolved.width - 12);
			const minimumHeight = Math.min(360, bounds.height - resolved.y - 12);
			if (edge === "left") {
				const right = resolved.x + resolved.width;
				const maximumWidth = Math.max(1, Math.min(640, right - 12));
				const width = clamp(resolved.width - dx, Math.min(minimumWidth, maximumWidth), maximumWidth);
				return {
					...resolved,
					x: right - width,
					width
				};
			}
			const maximumHeight = Math.max(1, bounds.height - resolved.y - 12);
			const height = clamp(resolved.height + dy, Math.min(minimumHeight, maximumHeight), maximumHeight);
			if (edge === "bottom") return {
				...resolved,
				height,
				heightMode: "manual"
			};
			const maximumWidth = Math.max(1, Math.min(640, bounds.width - resolved.x - 12));
			const width = clamp(resolved.width + dx, Math.min(minimumWidth, maximumWidth), maximumWidth);
			return {
				...resolved,
				width,
				height,
				heightMode: "manual"
			};
		}
		//#endregion
		//#region lib/client/ActivityPanel.js
		/**
		* AgentTeams activity panel: the top-right floater monitoring every team.
		*
		* Modeled on the Claude Code desktop SessionActivityPanel: a shell-overlay
		* panel that docks at the conversation's top-right edge by default, can be
		* dragged into a floating window, resized, and folded into an activity badge.
		* On wide viewports the docked panel makes the conversation column yield
		* space; narrow viewports keep a simple inset overlay. It
		* polls the host `/plugins/dsh-agent-teams/state` route for
		* server-side snapshots (durable files + live subagent activity), with a
		* badge that opens the workflow canvas on demand. Archived
		* teams stay available for the owning conversation after live work ends.
		*
		* The floater mounts in ui-layout's additive `shell.overlay`; it is not a
		* conversation node — the in-conversation panel was removed in favor of this
		* always-available monitor.
		* @module dsh-agent-teams/client/activity
		*/
		/** Grace before the panel collapses once no team remains. */
		const AUTOCLOSE_GRACE_MS = 2e3;
		/** Root marker shared with the panel CSS while the shell overlay is expanded. */
		const PANEL_OPEN_ATTRIBUTE = "data-agent-teams-panel-open";
		/** Shared width concession consumed by the conversation root CSS. */
		const PANEL_SHIFT_PROPERTY = "--agent-teams-panel-shift";
		const PANEL_CONVERSATION_GAP = 14;
		const MOVE_THRESHOLD = 4;
		const CAPTAIN_ASSIGNEE = "captain";
		function initialPanelLayout() {
			if (typeof window === "undefined") return DEFAULT_PANEL_LAYOUT;
			return parsePanelLayout(window.localStorage.getItem(PANEL_LAYOUT_STORAGE_KEY));
		}
		function initialPanelBounds() {
			if (typeof window === "undefined") return {
				width: 1440,
				height: 900,
				anchorRight: 1440
			};
			return {
				width: window.innerWidth,
				height: window.innerHeight,
				anchorRight: window.innerWidth
			};
		}
		/** Initial-letter fallback for unmatched roles. */
		function memberInitial(name) {
			return name.trim().slice(0, 1).toUpperCase() || "?";
		}
		function stableHash(value) {
			let hash = 0;
			for (let index = 0; index < value.length; index += 1) hash = (hash << 5) - hash + value.charCodeAt(index) | 0;
			return Math.abs(hash);
		}
		const ACCENTS = [
			"var(--dsw-alias-state-business-primary)",
			"var(--dsw-alias-state-success-primary)",
			"var(--dsw-alias-state-error-primary)",
			"var(--dsw-alias-state-warn-primary)",
			"var(--dsw-alias-label-tertiary)"
		];
		function accentOf(id) {
			return ACCENTS[stableHash(id) % ACCENTS.length] ?? ACCENTS[0];
		}
		function formatTaskIds(ids, t) {
			return ids.join(t("format.listSeparator"));
		}
		function taskTitle(task, model) {
			const extras = [
				task.kind,
				task.round === void 0 ? void 0 : `r${task.round}`,
				task.verdict,
				task.verdictStale === void 0 ? void 0 : `⚠ ${task.verdictStale}`,
				model === "" ? void 0 : model
			].filter((item) => item !== void 0);
			return extras.length === 0 ? `${task.id} · ${task.subject}` : `${task.id} · ${task.subject} · ${extras.join(" · ")}`;
		}
		/** Badge/bar coloring key: visual state, widened for terminal statuses. */
		function taskTone(state, status) {
			if (status === "failed") return "failed";
			if (status === "cancelled") return "cancelled";
			return state;
		}
		function Chevron({ open }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: ActivityPanel_module_css_default.chevron,
				"data-open": open,
				width: "9",
				height: "9",
				viewBox: "0 0 10 10",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				"aria-hidden": true,
				children: (0, react_jsx_runtime.jsx)("path", { d: "M3.5 2l3 3-3 3" })
			});
		}
		function WorkGlyph({ active }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: ActivityPanel_module_css_default.workGlyph,
				"data-active": active,
				width: "11",
				height: "11",
				viewBox: "0 0 11 11",
				fill: "currentColor",
				"aria-hidden": true,
				children: [
					[0, 0],
					[4.2, 0],
					[8.4, 0],
					[0, 4.2],
					[4.2, 4.2],
					[8.4, 4.2]
				].map(([x, y], index) => (0, react_jsx_runtime.jsx)("rect", {
					x,
					y,
					width: "2.6",
					height: "2.6",
					rx: ".6",
					style: { animationDelay: `${index * .15}s` }
				}, `${x}:${y}`))
			});
		}
		/** Collapsed badge: an always-visible corner pill while any team exists. */
		function CollapsedBadge({ count, busy, onClick, t, team, archived }) {
			const status = activityStatus(team, archived);
			const label = t("activity.state." + status.state);
			const detail = t("activity.summary", {
				done: status.completed,
				total: status.total,
				running: status.running,
				review: status.reviews,
				attention: status.attention
			});
			const title = [
				team?.name,
				label,
				status.total ? status.percent + "%" : void 0,
				detail,
				t("activity.badgeAria", { count })
			].filter(Boolean).join(" · ");
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: ActivityPanel_module_css_default.badge,
				"data-agent-teams-collapsed": true,
				"data-busy": busy,
				"data-status": status.state,
				onClick,
				"aria-label": title,
				title,
				children: [
					(0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.statusRing,
						"aria-hidden": true,
						children: [(0, react_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 20 20",
							width: "20",
							height: "20",
							children: [(0, react_jsx_runtime.jsx)("circle", {
								cx: "10",
								cy: "10",
								r: "7.5",
								className: ActivityPanel_module_css_default.ringTrack
							}), (0, react_jsx_runtime.jsx)("circle", {
								cx: "10",
								cy: "10",
								r: "7.5",
								className: ActivityPanel_module_css_default.ringValue,
								pathLength: "100",
								strokeDasharray: status.percent + " 100"
							})]
						}), status.state === "completed" ? (0, react_jsx_runtime.jsx)("i", { children: "✓" }) : status.state === "paused" ? (0, react_jsx_runtime.jsx)("i", { children: "Ⅱ" }) : status.attention > 0 ? (0, react_jsx_runtime.jsx)("i", { children: "·" }) : null]
					}),
					(0, react_jsx_runtime.jsx)("span", {
						className: ActivityPanel_module_css_default.statusLabel,
						children: label
					}),
					status.total > 0 && status.state !== "completed" && (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.statusPercent,
						children: [status.percent, (0, react_jsx_runtime.jsx)("small", { children: "%" })]
					}),
					status.attention > 0 && (0, react_jsx_runtime.jsx)("span", {
						className: ActivityPanel_module_css_default.statusCount,
						"aria-hidden": true,
						children: status.attention > 99 ? "99+" : status.attention
					})
				]
			});
		}
		function memberStateLabel(member, tasks, historic, t) {
			const owned = tasks.filter((task) => task.assignee === member.name);
			if (member.activity === "working") return t("member.state.working");
			if (owned.some((task) => task.status === "failed")) return t("member.state.failed");
			if (owned.some((task) => task.state === "blocked")) return t("member.state.waiting");
			if (owned.length > 0 && owned.every((task) => task.status === "completed")) return t("member.state.delivered");
			if (member.status === "removed") return t(historic ? "member.state.left" : "member.state.removed");
			if (owned.length > 0) return t("member.state.pending");
			return t("member.state.unassigned");
		}
		function memberStatusText(member, tasks, t) {
			const owned = tasks.filter((task) => task.assignee === member.name);
			const current = owned.find((task) => task.id === member.currentTask);
			const blocked = owned.find((task) => task.state === "blocked");
			if (member.activity === "working" && current !== void 0) {
				const model = taskModelLabel(current, [member]);
				return model === "" ? t("member.status.executing", { taskId: current.id }) : t("member.status.executingModel", {
					taskId: current.id,
					model
				});
			}
			if (member.activity === "working") return t("member.status.working");
			if (blocked !== void 0) {
				const dependency = tasks.find((task) => blocked.dependencies.includes(task.id) && task.state !== "completed");
				if (dependency !== void 0) return t("member.status.waitingOn", {
					taskId: dependency.id,
					assignee: dependency.assignee || t("task.assignee.unclaimed")
				});
				return t("member.status.waitingPrerequisite");
			}
			if (member.total === 0) return t("member.status.waitingAssignment");
			if (member.done === member.total) return t("member.status.delivered");
			if (owned.some((task) => task.status === "failed")) return t("task.detail.failed");
			if (owned.length > 0 && owned.every((task) => task.status === "completed" || task.status === "cancelled")) return t("member.status.settled");
			return t(member.activity === "idle" ? "member.status.idle" : "member.status.unknown");
		}
		function compactTaskLabel(subject) {
			const withoutVerb = subject.replace(/^开发\s*/u, "").replace(/^\d+[-_.、\s]*/u, "");
			const head = withoutVerb.split(/[（(·：:]/u)[0]?.trim() ?? withoutVerb;
			return head.length > 18 ? `${head.slice(0, 17)}…` : head;
		}
		function taskSummary(team, t, discarded = false) {
			const completed = team.tasks.filter((task) => task.status === "completed");
			const cancelled = team.tasks.filter((task) => task.status === "cancelled");
			const running = team.tasks.filter((task) => task.state === "running");
			const claimed = team.tasks.filter((task) => task.state === "claimed");
			const blocked = team.tasks.filter((task) => taskControlState(team, task).checked && taskControlState(team, task).waiting.length > 0);
			const ready = team.tasks.filter((task) => taskControlState(team, task).label === "task.control.queued");
			const reviews = team.tasks.filter((task) => taskControlState(team, task).reviewReady);
			const failed = team.tasks.filter((task) => task.status === "failed");
			if (discarded) return t("task.summary.discarded", { count: team.tasks.length });
			if (team.tasks.length === 0) return t("task.summary.waitingBreakdown");
			if (team.phase === "staged") return t("task.summary.staged", { count: team.tasks.length });
			if (completed.length === team.tasks.length) return t("task.summary.allDelivered", { count: completed.length });
			if (completed.length + cancelled.length + failed.length === team.tasks.length) return t("task.summary.ended", {
				completed: completed.length,
				cancelled: cancelled.length,
				failed: failed.length
			});
			if (failed.length > 0 && running.length === 0 && claimed.length === 0 && ready.length === 0 && reviews.length === 0 && blocked.length === 0) return t("task.summary.failedSettled", { count: failed.length });
			if (blocked.length > 0 && running.length > 0) return t("task.summary.blockedAndRunning", {
				tasks: formatTaskIds(blocked.slice(0, 3).map((task) => task.id), t),
				more: blocked.length > 3 ? t("task.summary.more", { count: blocked.length - 3 }) : ""
			});
			if (running.length > 0) return t("task.summary.running", { tasks: formatTaskIds(running.map((task) => task.id), t) });
			if (claimed.length > 0) return t("task.summary.claimed", { tasks: formatTaskIds(claimed.map((task) => task.id), t) });
			if (reviews.length > 0) return t("task.summary.review", { tasks: formatTaskIds(reviews.map((task) => task.id), t) });
			if (ready.length > 0) return t("task.summary.ready", { tasks: formatTaskIds(ready.map((task) => task.id), t) });
			if (blocked.length > 0) return t("task.summary.blocked", { tasks: formatTaskIds(blocked.map((task) => task.id), t) });
			if (team.tasks.some((task) => !taskControlState(team, task).terminal && !taskControlState(team, task).checked)) return t("flow.summary.held");
			return t("task.summary.waitingSchedule");
		}
		function ProgressOverview({ team, t, discarded = false }) {
			const running = discarded ? 0 : team.tasks.filter((task) => task.state === "running").length;
			const claimed = discarded ? 0 : team.tasks.filter((task) => task.state === "claimed").length;
			const blocked = discarded ? 0 : team.tasks.filter((task) => taskControlState(team, task).checked && taskControlState(team, task).waiting.length > 0).length;
			const held = discarded ? 0 : team.tasks.filter((task) => !taskControlState(team, task).terminal && !taskControlState(team, task).checked).length;
			const completed = discarded ? 0 : team.tasks.filter((task) => task.status === "completed").length;
			const settled = !discarded && team.tasks.length > 0 && team.tasks.every((task) => task.status === "completed" || task.status === "failed" || task.status === "cancelled");
			const summaryTone = discarded ? "discarded" : blocked > 0 || team.tasks.some((task) => task.status === "failed" || task.status === "cancelled") ? "warning" : settled ? "completed" : "running";
			return (0, react_jsx_runtime.jsxs)("section", {
				className: ActivityPanel_module_css_default.progressOverview,
				"aria-label": t("progress.aria"),
				"data-progress-summary": true,
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						className: ActivityPanel_module_css_default.progressTitle,
						children: t("progress.title")
					}),
					team.tasks.length > 0 ? (0, react_jsx_runtime.jsx)("span", {
						className: ActivityPanel_module_css_default.progressSegments,
						"aria-hidden": true,
						children: team.tasks.map((task) => (0, react_jsx_runtime.jsx)("span", { "data-state": discarded ? "cancelled" : taskTone(task.state, task.status) }, task.id))
					}) : (0, react_jsx_runtime.jsx)("span", { className: ActivityPanel_module_css_default.progressEmpty }),
					(0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.progressLegend,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								"data-state": "running",
								children: t("progress.running", { count: running })
							}),
							claimed > 0 && (0, react_jsx_runtime.jsx)("span", {
								"data-state": "claimed",
								children: t("progress.claimed", { count: claimed })
							}),
							(0, react_jsx_runtime.jsx)("span", {
								"data-state": "blocked",
								children: t("progress.blocked", { count: blocked })
							}),
							held > 0 && (0, react_jsx_runtime.jsx)("span", {
								"data-state": "blocked",
								children: t("progress.held", { count: held })
							}),
							(0, react_jsx_runtime.jsx)("span", {
								"data-state": "completed",
								children: t("progress.delivered", { count: completed })
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.progressSummary,
						"data-state": summaryTone,
						children: [(0, react_jsx_runtime.jsx)("span", { className: ActivityPanel_module_css_default.progressSummaryDot }), (0, react_jsx_runtime.jsx)("span", { children: taskSummary(team, t, discarded) })]
					})
				]
			});
		}
		/** Workspace-only summary of durable completion and the current unread inbox.
		* The snapshot is not a chat transcript: it provides at most five unread
		* captain messages, with no timestamps, so do not imply a complete history.
		*/
		function WorkspaceSummary({ team, t, discarded }) {
			const completed = discarded ? 0 : team.tasks.filter((task) => task.status === "completed").length;
			const total = team.tasks.length;
			return (0, react_jsx_runtime.jsxs)("div", {
				className: ActivityPanel_module_css_default.workspaceSummary,
				children: [(0, react_jsx_runtime.jsxs)("section", {
					className: ActivityPanel_module_css_default.completionCard,
					"aria-label": t("progress.aria"),
					children: [(0, react_jsx_runtime.jsx)("h3", { children: t("progress.title") }), (0, react_jsx_runtime.jsxs)("div", {
						className: ActivityPanel_module_css_default.completionBody,
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: ActivityPanel_module_css_default.completionRing,
							role: "img",
							"aria-label": t("team.stats.completed", {
								completed,
								total
							}),
							"data-completed": completed,
							"data-total": total,
							children: [(0, react_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 120 120",
								"aria-hidden": true,
								children: [(0, react_jsx_runtime.jsx)("circle", {
									className: ActivityPanel_module_css_default.ringTrack,
									cx: "60",
									cy: "60",
									r: "51"
								}), (0, react_jsx_runtime.jsx)("circle", {
									className: ActivityPanel_module_css_default.ringValue,
									cx: "60",
									cy: "60",
									r: "51",
									pathLength: "100",
									strokeDasharray: `${total === 0 ? 0 : completed / total * 100} 100`
								})]
							}), (0, react_jsx_runtime.jsxs)("span", {
								"aria-hidden": true,
								children: [(0, react_jsx_runtime.jsxs)("strong", { children: [completed, (0, react_jsx_runtime.jsxs)("small", { children: [" / ", total] })] }), (0, react_jsx_runtime.jsx)("span", { children: t(discarded ? "task.status.notRun" : "workspace.completed") })]
							})]
						}), total === 0 ? (0, react_jsx_runtime.jsx)("p", {
							className: ActivityPanel_module_css_default.summaryEmpty,
							children: t("workspace.noTasks")
						}) : (0, react_jsx_runtime.jsx)("ul", {
							className: ActivityPanel_module_css_default.completionTasks,
							tabIndex: 0,
							"aria-label": t("workspace.taskSummary"),
							children: team.tasks.map((task) => (0, react_jsx_runtime.jsxs)("li", {
								"data-state": discarded ? "cancelled" : taskTone(task.state, task.status),
								"data-verdict-stale": task.verdictStale === void 0 ? void 0 : "true",
								title: taskTitle(task, taskModelLabel(task, team.members)),
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.completionDot,
										"aria-hidden": true,
										children: task.verdictStale !== void 0 ? "!" : !discarded && task.status === "completed" ? "✓" : "·"
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.completionTaskId,
										children: task.id
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.completionTaskSubject,
										title: task.subject,
										children: task.subject
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.completionTaskStatus,
										children: discarded ? t("task.status.notRun") : task.verdictStale !== void 0 ? t("workspace.verdictStale") : t(taskControlState(team, task).label)
									})
								]
							}, task.id))
						})]
					})]
				}), (0, react_jsx_runtime.jsxs)("section", {
					className: ActivityPanel_module_css_default.inboxCard,
					"aria-label": t("workspace.inbox"),
					children: [(0, react_jsx_runtime.jsxs)("header", { children: [(0, react_jsx_runtime.jsx)("h3", { children: t("workspace.inbox") }), (0, react_jsx_runtime.jsx)("span", { children: t("workspace.inboxHint") })] }), team.captainInbox.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
						className: ActivityPanel_module_css_default.summaryEmpty,
						children: t("workspace.inboxEmpty")
					}) : (0, react_jsx_runtime.jsx)("ul", {
						className: ActivityPanel_module_css_default.inboxMessages,
						tabIndex: 0,
						"aria-label": t("workspace.inbox"),
						children: team.captainInbox.map((message, index) => {
							const member = team.members.find((candidate) => candidate.name === message.from);
							const art = message.from === CAPTAIN_ASSIGNEE ? LEAD_ART : memberArtUrl(message.from, member?.role ?? "");
							return (0, react_jsx_runtime.jsxs)("li", { children: [art === null ? (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.inboxInitial,
								"aria-hidden": true,
								children: memberInitial(message.from)
							}) : (0, react_jsx_runtime.jsx)("img", {
								src: art,
								alt: "",
								"aria-hidden": true
							}), (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: message.from }), (0, react_jsx_runtime.jsx)("p", { children: message.content })] })] }, `${index}:${message.from}`);
						})
					})]
				})]
			});
		}
		function DependencyMap({ tasks, members, t, discarded = false, workspace = false, onSelectTask, team, historic = false, onToggle, onOpenTask, controlBusy }) {
			const [open, setOpen] = (0, react.useState)(true);
			const [hoverTaskId, setHoverTaskId] = (0, react.useState)(null);
			const [keyboardTaskId, setKeyboardTaskId] = (0, react.useState)(null);
			const [pinnedTaskId, setPinnedTaskId] = (0, react.useState)(null);
			const hoverTimer = (0, react.useRef)(null);
			const focusedTaskId = dependencyFocusTaskId(pinnedTaskId, keyboardTaskId, hoverTaskId);
			const nodeWidth = workspace ? 164 : 112;
			const nodeHeight = workspace ? 94 : 56;
			const layout = (0, react.useMemo)(() => compactDagLayout(tasks, workspace ? {
				nodeWidth: 164,
				nodeHeight: 94,
				columnGap: 36,
				rowGap: 16
			} : void 0), [tasks, workspace]);
			const parallel = (0, react.useMemo)(() => usesParallelTaskGrid(tasks), [tasks]);
			const related = (0, react.useMemo)(() => focusedTaskId === null ? null : relatedTaskIds(focusedTaskId, tasks), [focusedTaskId, tasks]);
			const scheduleHover = (id) => {
				if (hoverTimer.current !== null) {
					clearTimeout(hoverTimer.current);
					hoverTimer.current = null;
				}
				if (id === null) {
					setHoverTaskId(null);
					return;
				}
				hoverTimer.current = setTimeout(() => {
					hoverTimer.current = null;
					setHoverTaskId(id);
				}, 180);
			};
			(0, react.useEffect)(() => () => {
				if (hoverTimer.current !== null) clearTimeout(hoverTimer.current);
			}, []);
			(0, react.useEffect)(() => {
				const onKeyDown = (event) => {
					if (event.key === "Escape") {
						setPinnedTaskId(null);
						onSelectTask?.(null);
					}
				};
				window.addEventListener("keydown", onKeyDown);
				return () => {
					window.removeEventListener("keydown", onKeyDown);
				};
			}, [onSelectTask]);
			if (tasks.length === 0) return null;
			const fallbackTask = tasks.find((task) => task.state === "blocked") ?? tasks.find((task) => task.state === "running") ?? tasks.find((task) => task.state === "claimed") ?? tasks[0];
			const detailTask = tasks.find((task) => task.id === focusedTaskId) ?? fallbackTask;
			const control = taskControlState(team, detailTask, historic);
			const detailModel = taskModelLabel(detailTask, members);
			const waitingOn = detailTask.dependencies.filter((dependency) => tasks.find((task) => task.id === dependency)?.status !== "completed");
			const dependents = tasks.filter((task) => task.dependencies.includes(detailTask.id));
			return (0, react_jsx_runtime.jsxs)("section", {
				className: ActivityPanel_module_css_default.dependencySection,
				"aria-label": t("dependency.aria"),
				"data-dependency-map": true,
				children: [(0, react_jsx_runtime.jsxs)("header", {
					className: ActivityPanel_module_css_default.sectionHead,
					children: [(0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: ActivityPanel_module_css_default.sectionToggleTitle,
						onClick: () => {
							setOpen((current) => !current);
						},
						"aria-expanded": open,
						children: [
							(0, react_jsx_runtime.jsx)(Chevron, { open }),
							(0, react_jsx_runtime.jsx)(IconBranchOutline16, {}),
							" ",
							t(parallel ? "dependency.parallel" : "dependency.title")
						]
					}), (0, react_jsx_runtime.jsx)("span", {
						className: ActivityPanel_module_css_default.sectionHint,
						children: pinnedTaskId === null ? t(parallel ? "dependency.hint.parallel" : workspace ? "workspace.dependencies" : "dependency.hint.chain") : t("dependency.hint.pinned", { taskId: pinnedTaskId })
					})]
				}), open && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("div", {
					className: ActivityPanel_module_css_default.dagViewport,
					children: (0, react_jsx_runtime.jsxs)("div", {
						className: ActivityPanel_module_css_default.dagCanvas,
						"data-layout": parallel ? "parallel" : "dependency",
						style: parallel ? void 0 : {
							width: layout.width,
							height: layout.height
						},
						children: [!parallel && (0, react_jsx_runtime.jsx)("svg", {
							className: ActivityPanel_module_css_default.dagEdges,
							width: layout.width,
							height: layout.height,
							"aria-hidden": true,
							children: layout.edges.map((edge) => {
								const active = related !== null && related.has(edge.from) && related.has(edge.to);
								return (0, react_jsx_runtime.jsx)("path", {
									d: edge.path,
									"data-active": active,
									"data-dimmed": related !== null && !active
								}, `${edge.from}:${edge.to}`);
							})
						}), layout.nodes.map(({ task, x, y }) => {
							const model = taskModelLabel(task, members);
							const control = taskControlState(team, task, historic);
							return (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": pinnedTaskId === task.id,
								onClick: () => {
									const next = pinnedTaskId === task.id ? null : task.id;
									setPinnedTaskId(next);
									onSelectTask?.(next);
								},
								className: `${ActivityPanel_module_css_default.dagNode} ${taskStateNodeClass}`,
								"data-lifecycle": discarded ? "notRun" : task.verdictStale ? "stale" : control.visual,
								style: parallel ? { height: nodeHeight } : {
									left: x,
									top: y,
									width: nodeWidth,
									height: nodeHeight
								},
								"data-task-id": task.id,
								"data-checkpoint": !!task.checkpoint || void 0,
								"data-review-ready": control.reviewReady || void 0,
								"data-state": discarded ? "cancelled" : taskTone(task.state, task.status),
								"data-verdict-stale": task.verdictStale === void 0 ? void 0 : "true",
								"data-task-model": model || void 0,
								"data-focused": related?.has(task.id) ?? false,
								"data-dimmed": related !== null && !related.has(task.id),
								title: `${taskTitle(task, model)} · ${t(control.label)}`,
								onMouseEnter: () => {
									scheduleHover(task.id);
								},
								onMouseLeave: () => {
									scheduleHover(null);
								},
								onFocus: () => {
									setKeyboardTaskId(task.id);
								},
								onBlur: () => {
									setKeyboardTaskId(null);
								},
								children: [
									(0, react_jsx_runtime.jsxs)("span", {
										className: ActivityPanel_module_css_default.dagNodeHead,
										children: [
											(0, react_jsx_runtime.jsx)("span", { className: ActivityPanel_module_css_default.dagNodeDot }),
											task.id,
											task.checkpoint ? (0, react_jsx_runtime.jsxs)("span", {
												className: ActivityPanel_module_css_default.reviewKind,
												title: t("task.control.round", { round: task.checkpoint.round }),
												children: [
													(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: "review" }),
													" ",
													t("task.control.human")
												]
											}) : workspace && (0, react_jsx_runtime.jsx)("span", {
												className: ActivityPanel_module_css_default.dagOwner,
												children: task.assignee || t("task.assignee.unclaimed")
											})
										]
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.dagNodeLabel,
										children: workspace ? task.subject : compactTaskLabel(task.subject)
									}),
									(0, react_jsx_runtime.jsx)(TaskStateBadge, {
										control,
										t,
										className: ActivityPanel_module_css_default.dagState,
										discarded,
										stale: !!task.verdictStale,
										detail: task.status === "claimed" ? t("task.control.claimedHint") : void 0
									}),
									task.state === "running" && (0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.dagRunningState,
										"aria-label": t("task.runningAria"),
										children: (0, react_jsx_runtime.jsx)(WorkGlyph, { active: true })
									})
								]
							}, task.id);
						})]
					})
				}), (0, react_jsx_runtime.jsxs)("section", {
					className: ActivityPanel_module_css_default.taskDetail,
					"data-task-detail": detailTask.id,
					children: [
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.taskDetailHead,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: ActivityPanel_module_css_default.taskDetailId,
									children: detailTask.id
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: ActivityPanel_module_css_default.taskDetailSubject,
									title: detailTask.subject,
									children: detailTask.subject
								}),
								(0, react_jsx_runtime.jsxs)("span", {
									className: ActivityPanel_module_css_default.taskDetailBadge,
									"data-verdict-stale": detailTask.verdictStale ? "true" : void 0,
									"data-review-ready": control.reviewReady || void 0,
									"data-state": discarded ? "cancelled" : taskTone(detailTask.state, detailTask.status),
									children: [(0, react_jsx_runtime.jsxs)("span", {
										"aria-hidden": "true",
										children: [detailTask.verdictStale ? "!" : detailTask.status === "completed" ? "✓" : detailTask.status === "failed" ? "!" : control.reviewReady ? "◇" : "•", " "]
									}), discarded ? t("task.status.notRun") : t(control.label)]
								})
							]
						}),
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.taskDetailLine,
							children: [
								detailTask.checkpoint ? t("task.assignee.human") : detailTask.assignee || t("task.assignee.unclaimed"),
								detailModel !== "" && (0, react_jsx_runtime.jsxs)("span", {
									className: ActivityPanel_module_css_default.taskDetailModel,
									"data-task-model": detailModel,
									children: [" · ", t("task.model", { model: detailModel })]
								}),
								detailTask.checkpoint && (0, react_jsx_runtime.jsxs)("span", {
									className: ActivityPanel_module_css_default.reviewKind,
									children: [" · ", t("task.control.round", { round: detailTask.checkpoint.round })]
								})
							]
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: ActivityPanel_module_css_default.taskDetailControls,
							children: [(!control.terminal || control.canRerun) && (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-task-action": control.canRerun ? "rerun" : control.stopping ? "retry" : control.queued ? "dequeue" : control.checked ? "pause" : "play",
								"data-rerun-action": control.canRerun || void 0,
								"data-running": !control.stopping && detailTask.status === "in_progress" || void 0,
								"aria-label": control.canRerun ? t("task.control.rerunTask", { task: detailTask.subject }) : `${t(control.actionLabel)} · ${detailTask.subject}`,
								className: ActivityPanel_module_css_default.taskPlayback,
								disabled: !control.canRerun && control.disabled || !!controlBusy,
								title: t(control.canRerun ? "task.control.rerunHint" : control.disabled || control.stopping ? control.label : "task.control.hint"),
								onClick: () => control.canRerun ? onOpenTask(detailTask, false, true) : onToggle(detailTask, control.stopping ? false : !control.checked),
								children: [(0, react_jsx_runtime.jsx)("svg", {
									className: ActivityPanel_module_css_default.taskPlaybackIcon,
									viewBox: "0 0 16 16",
									"aria-hidden": "true",
									focusable: "false",
									children: control.queued ? (0, react_jsx_runtime.jsx)("path", { d: "M3 3h10v10H3z" }) : control.checked && !control.canRerun ? (0, react_jsx_runtime.jsx)("path", { d: "M4 3h3v10H4zm5 0h3v10H9z" }) : (0, react_jsx_runtime.jsx)("path", { d: "M4 2.5v11l9-5.5z" })
								}), t(control.canRerun ? "task.control.rerun" : control.disabled ? control.label : control.actionLabel)]
							}), (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-review-action": control.reviewReady || void 0,
								disabled: !!controlBusy,
								onClick: () => onOpenTask(detailTask, control.reviewReady),
								children: [(0, react_jsx_runtime.jsx)(WorkflowIcon, { name: control.reviewReady ? "review" : "properties" }), t(control.reviewReady ? "task.control.review" : "task.control.properties")]
							})]
						}),
						!control.terminal && waitingOn.length > 0 && (0, react_jsx_runtime.jsx)("p", {
							className: ActivityPanel_module_css_default.taskControlHint,
							children: t("task.detail.waitingOn", { tasks: formatTaskIds(waitingOn, t) })
						}),
						detailTask.checkpoint?.note && (0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.reviewNote,
							children: detailTask.checkpoint.note
						}),
						detailTask.description && (0, react_jsx_runtime.jsx)("p", {
							className: ActivityPanel_module_css_default.taskDetailDescription,
							title: detailTask.description,
							children: detailTask.description
						}),
						(0, react_jsx_runtime.jsxs)("details", {
							className: ActivityPanel_module_css_default.taskDetailMore,
							children: [
								(0, react_jsx_runtime.jsx)("summary", { children: t("task.detail.more") }),
								(0, react_jsx_runtime.jsx)("span", {
									className: ActivityPanel_module_css_default.taskDetailMeta,
									children: dependents.length === 0 ? t("task.detail.noDownstream") : t("task.detail.unlocks", { tasks: formatTaskIds(dependents.map((task) => task.id), t) })
								}),
								!control.terminal && !control.disabled && (0, react_jsx_runtime.jsx)("p", {
									className: ActivityPanel_module_css_default.taskControlHint,
									children: t("task.control.hint")
								}),
								control.canRerun && (0, react_jsx_runtime.jsx)("p", {
									className: ActivityPanel_module_css_default.taskControlHint,
									children: t("task.control.rerunHint")
								})
							]
						}, detailTask.id)
					]
				})] })]
			});
		}
		function LocalizedTeamSection({ team, modelDirectory, onContinuePlanning, onDiscarded, onNavigate, t, historic = false, workspace = false }) {
			const [selectedTaskId, setSelectedTaskId] = (0, react.useState)(null);
			const [controlBusy, setControlBusy] = (0, react.useState)();
			const controlPending = (0, react.useRef)(false);
			const [controlError, setControlError] = (0, react.useState)("");
			const [taskEntry, setTaskEntry] = (0, react.useState)();
			async function toggleTask(task, enabled) {
				if (controlPending.current || taskControlState(team, task, historic).disabled) return;
				controlPending.current = true;
				setControlBusy(task.id);
				setControlError("");
				try {
					const value = await workflowRequest({
						action: "set_task_enabled",
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						taskId: task.id,
						enabled,
						updatedAt: task.updatedAt
					});
					if (!value.activity) throw new Error(t("task.control.failed"));
					publishWorkflowActivity(value.activity);
				} catch (error) {
					setControlError(error instanceof Error ? error.message : t("task.control.failed"));
				} finally {
					controlPending.current = false;
					setControlBusy(void 0);
				}
			}
			const flow = flowControlState(team);
			async function toggleFlow(enabled) {
				if (controlPending.current) return;
				controlPending.current = true;
				setControlBusy("flow");
				setControlError("");
				try {
					const value = await workflowRequest({
						action: team.phase === "staged" ? "start" : "set_flow_enabled",
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						enabled,
						version: flowControlVersion(team)
					});
					if (!value.activity) throw new Error(t("task.control.failed"));
					publishWorkflowActivity(value.activity);
				} catch (error) {
					setControlError(error instanceof Error ? error.message : t("task.control.failed"));
				} finally {
					controlPending.current = false;
					setControlBusy(void 0);
				}
			}
			const [editingMember, setEditingMember] = (0, react.useState)();
			const selectedAssignee = team.tasks.find((task) => task.id === selectedTaskId)?.assignee;
			const [membersOpen, setMembersOpen] = (0, react.useState)(workspace);
			const [stopOpen, setStopOpen] = (0, react.useState)(false);
			const [stopping, setStopping] = (0, react.useState)(false);
			const [stopError, setStopError] = (0, react.useState)("");
			const discarded = historic && team.phase === "staged";
			const stopped = !historic && team.halted === true;
			const busyCount = team.members.filter((member) => member.activity === "working").length;
			const assignedCount = team.tasks.filter((task) => task.assignee !== "" && task.assignee !== CAPTAIN_ASSIGNEE).length;
			const captainOwned = team.tasks.filter((task) => task.assignee === CAPTAIN_ASSIGNEE && task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled");
			const captainBusy = captainOwned.length > 0;
			const captainTaskIds = formatTaskIds(captainOwned.map((task) => task.id), t);
			const completedCount = team.tasks.filter((task) => task.status === "completed").length;
			const allCompleted = team.tasks.length > 0 && completedCount === team.tasks.length;
			const allSettled = team.tasks.length > 0 && team.tasks.every((task) => task.status === "completed" || task.status === "failed" || task.status === "cancelled");
			const unfinishedCount = team.tasks.filter((task) => task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled").length;
			const canStop = !historic && team.phase === "running" && team.halted !== true && teamIsActive(team);
			const stopTeam = async () => {
				if (stopping) return;
				setStopping(true);
				setStopError("");
				try {
					const response = await fetch(ACTIVITY_HALT_URL, {
						method: "POST",
						cache: "no-store",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId: team.captainSessionId,
							teamId: team.teamId
						})
					});
					if (!response.ok) {
						let message = t("team.stopRequestFailed");
						try {
							const body = await response.json();
							if (typeof body.error === "string" && body.error.trim() !== "") message = body.error;
						} catch {}
						throw new Error(message);
					}
					setStopOpen(false);
				} catch (error) {
					setStopError(t("team.stopFailed", { message: error instanceof Error ? error.message : String(error) }));
				} finally {
					setStopping(false);
				}
			};
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("section", {
				className: ActivityPanel_module_css_default.team,
				"data-team-id": team.teamId,
				"data-workspace-team": workspace || void 0,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: ActivityPanel_module_css_default.teamHead,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.teamName,
								title: team.name,
								children: team.name
							}),
							historic && (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.historicPill,
								children: t(discarded ? "team.discarded" : "team.ended")
							}),
							stopped && (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.historicPill,
								children: t("team.stopped")
							}),
							(0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.teamStats,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										"data-stat": "members",
										children: t("team.stats.members", { count: team.members.length })
									}),
									(0, react_jsx_runtime.jsx)("span", {
										"data-stat": "tasks",
										children: t("team.stats.completed", {
											completed: completedCount,
											total: team.tasks.length
										})
									}),
									(0, react_jsx_runtime.jsx)("span", {
										"data-stat": "messages",
										children: t("team.stats.messages", { count: team.messageCount })
									})
								]
							}),
							canStop && (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ActivityPanel_module_css_default.teamStopButton,
								"aria-label": t("team.stop"),
								title: t("team.stop"),
								onClick: () => {
									setStopError("");
									setStopOpen(true);
								},
								children: (0, react_jsx_runtime.jsx)(IconStopFill16, {})
							})
						]
					}),
					!historic && !team.halted && (0, react_jsx_runtime.jsxs)("div", {
						className: ActivityPanel_module_css_default.taskDetailControls,
						title: t("flow.control.hint"),
						"data-flow-controls": true,
						children: [(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !!controlBusy || !(team.phase === "staged" ? team.tasks.length > 0 : flow.canStart),
							onClick: () => void toggleFlow(true),
							children: t("flow.control.start")
						}), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !!controlBusy || !flow.canPause,
							onClick: () => void toggleFlow(false),
							children: t("flow.control.pause")
						})]
					}),
					team.phase === "staged" && !team.workflowEnabled && !historic && modelDirectory !== void 0 && onContinuePlanning !== void 0 && onDiscarded !== void 0 && (0, react_jsx_runtime.jsx)(StagingPlanEditor, {
						team,
						modelDirectory,
						onContinuePlanning,
						onDiscarded,
						t
					}),
					(0, react_jsx_runtime.jsxs)("section", {
						className: ActivityPanel_module_css_default.delegationSection,
						"aria-label": t("delegation.aria"),
						"data-delegation-map": true,
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: ActivityPanel_module_css_default.captainNode,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.captainAvatar,
										children: (0, react_jsx_runtime.jsx)("img", {
											className: ActivityPanel_module_css_default.leadAvatar,
											src: LEAD_ART,
											alt: "",
											"aria-hidden": true
										})
									}),
									(0, react_jsx_runtime.jsxs)("span", {
										className: ActivityPanel_module_css_default.captainInfo,
										children: [(0, react_jsx_runtime.jsxs)("span", {
											className: ActivityPanel_module_css_default.captainLine,
											children: [(0, react_jsx_runtime.jsx)("span", {
												className: ActivityPanel_module_css_default.captainName,
												children: t("captain.name")
											}), (0, react_jsx_runtime.jsx)("span", {
												className: ActivityPanel_module_css_default.captainRole,
												children: t("captain.role")
											})]
										}), (0, react_jsx_runtime.jsx)("span", {
											className: ActivityPanel_module_css_default.captainSummary,
											children: discarded ? t("captain.summary.discarded", {
												tasks: team.tasks.length,
												members: team.members.length
											}) : captainBusy ? t("captain.summary.withTakeover", {
												tasks: assignedCount,
												captainTasks: captainTaskIds
											}) : team.phase === "staged" ? t(team.planReviewState === "awaiting_feedback" ? "captain.summary.awaitingFeedback" : "captain.summary.staged", {
												tasks: team.tasks.length,
												members: team.members.length
											}) : t("captain.summary", {
												tasks: assignedCount,
												members: team.members.length
											})
										})]
									}),
									(0, react_jsx_runtime.jsxs)("span", {
										className: ActivityPanel_module_css_default.captainState,
										"data-busy": captainBusy || busyCount > 0,
										children: [(0, react_jsx_runtime.jsx)(WorkGlyph, { active: captainBusy || busyCount > 0 }), discarded ? t("captain.state.discarded") : captainBusy ? t("captain.state.takeover", { tasks: captainTaskIds }) : team.phase === "staged" ? t(team.planReviewState === "awaiting_feedback" ? "captain.state.awaitingFeedback" : "captain.state.staged") : busyCount > 0 ? t("captain.state.working", { count: busyCount }) : t(allCompleted ? "captain.state.collected" : allSettled ? "captain.state.settled" : "captain.state.waiting")]
									})
								]
							}),
							(0, react_jsx_runtime.jsx)(ProgressOverview, {
								team,
								t,
								discarded
							}),
							(() => {
								const orderedMembers = orderDelegationMembers(team.members, team.tasks);
								const runningMembers = orderedMembers.filter((member) => member.activity === "working" || member.status === "working" || team.tasks.some((task) => task.assignee === member.name && (task.status === "pending" || task.status === "claimed" || task.status === "in_progress")));
								const visibleMembers = membersOpen ? orderedMembers : runningMembers;
								const hiddenFinishedCount = orderedMembers.length - visibleMembers.length;
								const expandLabel = membersOpen ? t("members.collapse") : hiddenFinishedCount > 0 ? t("members.expandFinished", { count: hiddenFinishedCount }) : t("members.expand");
								return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: ActivityPanel_module_css_default.membersToggle,
									onClick: () => {
										setMembersOpen((current) => !current);
									},
									"aria-expanded": membersOpen,
									"data-members-toggle": true,
									children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)(Chevron, { open: membersOpen }), t("members.toggle", { count: team.members.length })] }), (0, react_jsx_runtime.jsx)("span", { children: expandLabel })]
								}), (membersOpen || visibleMembers.length > 0) && (0, react_jsx_runtime.jsxs)("div", {
									className: ActivityPanel_module_css_default.delegationTree,
									children: [team.members.length === 0 && (0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.emptyHint,
										children: t("members.empty")
									}), visibleMembers.map((member) => {
										const owned = team.tasks.filter((task) => task.assignee === member.name);
										const memberModel = memberRouteLabel(member);
										return (0, react_jsx_runtime.jsxs)("div", {
											className: ActivityPanel_module_css_default.memberBlock,
											"data-activity": member.activity,
											"data-selected-member": editingMember === member.name || workspace && selectedAssignee === member.name || void 0,
											children: [
												(0, react_jsx_runtime.jsx)("span", {
													className: ActivityPanel_module_css_default.memberBranch,
													"aria-hidden": true,
													children: (0, react_jsx_runtime.jsx)("span", {})
												}),
												(0, react_jsx_runtime.jsxs)("button", {
													type: "button",
													className: ActivityPanel_module_css_default.memberRow,
													"data-activity": member.activity,
													onClick: () => {
														if (!historic && modelDirectory) setEditingMember((value) => value === member.name ? void 0 : member.name);
														else if (member.id !== "") onNavigate(team.captainSessionId, member.id);
													},
													children: [
														(0, react_jsx_runtime.jsxs)("span", {
															className: ActivityPanel_module_css_default.memberAvatar,
															"data-unread": member.unread > 0,
															children: [memberArtUrl(member.name, member.role) !== null ? (0, react_jsx_runtime.jsx)("img", {
																className: ActivityPanel_module_css_default.memberArt,
																src: memberArtUrl(member.name, member.role) ?? "",
																alt: "",
																"aria-hidden": true
															}) : (0, react_jsx_runtime.jsx)("span", {
																className: ActivityPanel_module_css_default.memberInitial,
																style: { background: accentOf(member.id) },
																children: memberInitial(member.name)
															}), (0, react_jsx_runtime.jsx)("img", {
																className: ActivityPanel_module_css_default.stateArt,
																"data-activity": member.activity,
																src: ACTION_ART[member.activity],
																alt: "",
																"aria-hidden": true
															})]
														}),
														(0, react_jsx_runtime.jsxs)("span", {
															className: ActivityPanel_module_css_default.memberInfo,
															children: [(0, react_jsx_runtime.jsxs)("span", {
																className: ActivityPanel_module_css_default.memberLine,
																children: [
																	(0, react_jsx_runtime.jsx)("span", {
																		className: ActivityPanel_module_css_default.memberName,
																		children: member.name
																	}),
																	member.role !== "" && (0, react_jsx_runtime.jsx)("span", {
																		className: ActivityPanel_module_css_default.memberRole,
																		children: member.role
																	}),
																	memberModel !== "" && (0, react_jsx_runtime.jsx)("span", {
																		className: ActivityPanel_module_css_default.memberModel,
																		role: "img",
																		"data-member-model": memberModel,
																		title: memberModel,
																		"aria-label": memberModel,
																		children: compactModelLabel(memberModel)
																	}),
																	(0, react_jsx_runtime.jsxs)("span", {
																		className: ActivityPanel_module_css_default.memberState,
																		"data-activity": member.activity,
																		children: [(0, react_jsx_runtime.jsx)(WorkGlyph, { active: member.activity === "working" }), discarded ? t("member.state.notCreated") : stopped ? t("member.state.stopped") : team.phase === "staged" ? t("member.state.staged") : memberStateLabel(member, team.tasks, historic, t)]
																	})
																]
															}), (0, react_jsx_runtime.jsx)("span", {
																className: ActivityPanel_module_css_default.memberStatusLine,
																children: discarded ? t("member.status.discarded") : stopped ? t("member.status.stopped") : team.phase === "staged" ? t("member.status.staged") : historic && owned.length > 0 && owned.every((task) => task.status === "completed" || task.status === "failed" || task.status === "cancelled") ? t("member.status.settled") : memberStatusText(member, team.tasks, t)
															})]
														}),
														(0, react_jsx_runtime.jsxs)("span", {
															className: ActivityPanel_module_css_default.memberCount,
															children: [
																member.done,
																"/",
																member.total
															]
														})
													]
												}),
												editingMember === member.name && modelDirectory && !historic && (0, react_jsx_runtime.jsx)(QuickMemberEditor, {
													team,
													member,
													directory: modelDirectory,
													t,
													close: () => setEditingMember(void 0),
													onRerun: (taskId) => setTaskEntry({
														taskId,
														review: false,
														rerun: true
													})
												}, member.name),
												!historic && modelDirectory && member.id !== "" && (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: ActivityPanel_module_css_default.quickTranscript,
													onClick: () => onNavigate(team.captainSessionId, member.id),
													children: t("workflow.executionChat")
												}),
												(0, react_jsx_runtime.jsxs)("div", {
													className: ActivityPanel_module_css_default.assignmentLine,
													children: [(0, react_jsx_runtime.jsx)("span", {
														className: ActivityPanel_module_css_default.assignmentLabel,
														children: t(discarded ? "assignment.discarded" : team.phase === "staged" ? "assignment.staged" : "assignment.label")
													}), (0, react_jsx_runtime.jsx)("span", {
														className: ActivityPanel_module_css_default.assignmentTasks,
														children: owned.length === 0 ? (0, react_jsx_runtime.jsx)("span", {
															className: ActivityPanel_module_css_default.taskEmpty,
															children: t("assignment.empty")
														}) : owned.map((task) => {
															const model = taskModelLabel(task, team.members);
															const shortModel = compactModelLabel(model);
															return (0, react_jsx_runtime.jsx)("span", {
																className: ActivityPanel_module_css_default.assignmentChip,
																"data-state": discarded ? "cancelled" : taskTone(task.state, task.status),
																"data-verdict-stale": task.verdictStale === void 0 ? void 0 : "true",
																"data-task-model": model || void 0,
																title: taskTitle(task, model),
																children: task.state === "running" && shortModel !== "" ? `${task.id} · ${shortModel}` : task.id
															}, task.id);
														})
													})]
												})
											]
										}, member.id || member.name);
									})]
								})] });
							})()
						]
					}),
					controlBusy && (0, react_jsx_runtime.jsx)("p", {
						role: "status",
						className: ActivityPanel_module_css_default.taskControlHint,
						children: t("task.control.saving")
					}),
					controlError && (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						className: ActivityPanel_module_css_default.stopModalError,
						children: controlError
					}),
					(0, react_jsx_runtime.jsx)(DependencyMap, {
						team,
						tasks: team.tasks,
						members: team.members,
						t,
						historic,
						discarded,
						workspace,
						onSelectTask: setSelectedTaskId,
						controlBusy,
						onToggle: (task, enabled) => void toggleTask(task, enabled),
						onOpenTask: (task, review, rerun) => setTaskEntry({
							taskId: task.id,
							review,
							rerun
						})
					}),
					taskEntry && (0, react_jsx_runtime.jsx)(WorkflowWorkbench, {
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						archived: historic,
						entryTarget: taskEntry,
						onClose: () => setTaskEntry(void 0),
						modelDirectory,
						t,
						openExecution: (id, parent) => onNavigate(parent ?? team.captainSessionId, id),
						openConversation: (id) => openWorkflowConversation(onNavigate, id)
					}, taskEntry.taskId),
					workspace && (0, react_jsx_runtime.jsx)(WorkspaceSummary, {
						team,
						t,
						discarded
					})
				]
			}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: stopOpen,
				onClose: () => {
					if (!stopping) setStopOpen(false);
				},
				title: t("team.stopTitle", { team: team.name }),
				closeLabel: t("plan.cancel"),
				description: t("team.stopDescription", {
					tasks: unfinishedCount,
					members: busyCount
				}),
				footer: (0, react_jsx_runtime.jsxs)("span", {
					className: ActivityPanel_module_css_default.stopModalActions,
					children: [(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: stopping,
						onClick: () => {
							setStopOpen(false);
						},
						children: t("team.stopCancel")
					}), (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						"data-danger": true,
						disabled: stopping,
						onClick: () => {
							stopTeam();
						},
						children: [(0, react_jsx_runtime.jsx)(IconStopFill16, {}), stopping ? t("team.stopping") : t("team.stopConfirm")]
					})]
				}),
				children: stopError !== "" && (0, react_jsx_runtime.jsxs)("p", {
					className: ActivityPanel_module_css_default.stopModalError,
					role: "alert",
					children: [(0, react_jsx_runtime.jsx)(IconWarningOutline16, {}), stopError]
				})
			})] });
		}
		/** Legacy conversation cards may outlive their host archive. Project their
		* durable roster through the same rebuilt panel instead of a second UI. */
		function historicCardTeam(data, owner) {
			return {
				workspace: "",
				teamId: data.teamId,
				name: data.teamName,
				captainSessionId: data.captainSessionId || owner,
				phase: "running",
				members: data.members.map((member) => ({
					...member,
					status: "removed",
					activity: "idle",
					progress: 0,
					done: 0,
					total: 0,
					currentTask: "",
					unread: 0
				})),
				tasks: [],
				messageCount: 0,
				captainInbox: []
			};
		}
		function ActivityPanel({ sessionsList, modelDirectories, openMember, t, conversationVisible = true, onMonitorStatus, onRememberTeam }) {
			const navigateToSession = (parentId, childId) => {
				setOpen(false);
				setWasActive(false);
				return openMember(parentId, childId);
			};
			const [open, setOpen] = (0, react.useState)(false);
			const [openOwner, setOpenOwner] = (0, react.useState)();
			const [canvasEntry, setCanvasEntry] = (0, react.useState)();
			const [wasActive, setWasActive] = (0, react.useState)(false);
			const [historic, setHistoric] = (0, react.useState)(/* @__PURE__ */ new Map());
			const [layout, setLayout] = (0, react.useState)(initialPanelLayout);
			const [bounds, setBounds] = (0, react.useState)(initialPanelBounds);
			const [interaction, setInteraction] = (0, react.useState)(null);
			const panelRef = (0, react.useRef)(null);
			const boundsRef = (0, react.useRef)(bounds);
			const gestureRef = (0, react.useRef)(null);
			const frameRef = (0, react.useRef)(null);
			const pendingLayoutRef = (0, react.useRef)(null);
			const selectedSession = currentSessionId((0, react.useSyncExternalStore)(sessionsList.subscribe, sessionsList.getSnapshot));
			const [sessionOwner, setSessionOwner] = (0, react.useState)();
			const current = sessionOwner && sessionOwner.sessionId === selectedSession ? sessionOwner.owner : selectedSession;
			(0, react.useEffect)(() => {
				if (!selectedSession) return;
				const controller = new AbortController();
				let active = true;
				resolveActivitySession(selectedSession, controller.signal).then((result) => {
					if (!active) return;
					if (result.activity) publishWorkflowActivity(result.activity);
					setSessionOwner(result);
				}).catch(() => {});
				return () => {
					active = false;
					controller.abort();
				};
			}, [selectedSession]);
			const monitorTargets = (0, react.useSyncExternalStore)(subscribeActivityMonitorTargets, getActivityMonitorTargetsSnapshot);
			const returnToComposer = () => {
				setOpen(false);
				setOpenOwner(void 0);
				window.requestAnimationFrame(() => {
					document.querySelector("[data-composer-card] [contenteditable=\"true\"][role=\"textbox\"], [data-composer-card] textarea")?.focus();
				});
			};
			const { teams, archivedTeams } = (0, react.useSyncExternalStore)(subscribeActivitySnapshots, getActivitySnapshotsSnapshot);
			const currentTargets = (0, react.useMemo)(() => current === void 0 ? [] : monitorTargets.filter((target) => target.sessionId === current), [current, monitorTargets]);
			const currentRef = (0, react.useRef)(current);
			(0, react.useEffect)(() => {
				currentRef.current = current;
			}, [current]);
			const expanded = conversationVisible && activityPanelExpandedForSession(open, openOwner, current);
			const geometry = (0, react.useMemo)(() => resolvePanelGeometry(layout, bounds), [layout, bounds]);
			const compact = compactPanelForBounds(bounds);
			const commitLayout = (0, react.useCallback)((next) => {
				setLayout(next);
			}, []);
			(0, react.useEffect)(() => {
				window.localStorage.setItem(PANEL_LAYOUT_STORAGE_KEY, JSON.stringify(layout));
			}, [layout]);
			(0, react.useLayoutEffect)(() => {
				const overlay = document.querySelector("[data-shell-overlay]");
				if (overlay === null) return;
				const conversation = document.querySelector("[data-phase='active']");
				let frame = null;
				const measure = () => {
					frame = null;
					const overlayRect = overlay.getBoundingClientRect();
					const conversationRect = conversation?.getBoundingClientRect();
					const next = {
						width: overlayRect.width,
						height: overlayRect.height,
						anchorRight: conversationRect === void 0 ? overlayRect.width : Math.min(Math.max(conversationRect.right - overlayRect.left, 0), overlayRect.width)
					};
					const previous = boundsRef.current;
					if (previous.width === next.width && previous.height === next.height && previous.anchorRight === next.anchorRight) return;
					boundsRef.current = next;
					setBounds(next);
				};
				const scheduleMeasure = () => {
					frame ??= requestAnimationFrame(measure);
				};
				measure();
				const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleMeasure);
				observer?.observe(overlay);
				if (conversation !== null) observer?.observe(conversation);
				window.addEventListener("resize", scheduleMeasure);
				return () => {
					if (frame !== null) cancelAnimationFrame(frame);
					observer?.disconnect();
					window.removeEventListener("resize", scheduleMeasure);
				};
			}, [current]);
			(0, react.useLayoutEffect)(() => {
				if (canvasEntry && canvasEntry.owner !== current) setCanvasEntry(void 0);
				if (openOwner === void 0 || openOwner === current) return;
				setOpen(false);
				setOpenOwner(void 0);
			}, [
				current,
				openOwner,
				canvasEntry
			]);
			(0, react.useLayoutEffect)(() => {
				const root = document.documentElement;
				if (expanded && geometry.mode === "docked" && !compact) {
					root.setAttribute(PANEL_OPEN_ATTRIBUTE, "");
					root.style.setProperty(PANEL_SHIFT_PROPERTY, `${geometry.width + PANEL_CONVERSATION_GAP + 18}px`);
				} else {
					root.removeAttribute(PANEL_OPEN_ATTRIBUTE);
					root.style.removeProperty(PANEL_SHIFT_PROPERTY);
				}
				return () => {
					root.removeAttribute(PANEL_OPEN_ATTRIBUTE);
					root.style.removeProperty(PANEL_SHIFT_PROPERTY);
				};
			}, [
				compact,
				expanded,
				geometry.mode,
				geometry.width
			]);
			(0, react.useEffect)(() => {
				if (current === void 0) return;
				onMonitorStatus?.(current, "loading");
				const controller = startActivityPolling(currentTargets, {
					discoverySessionId: current,
					onStatus: (status) => onMonitorStatus?.(current, status)
				});
				return () => controller.stop();
			}, [
				current,
				currentTargets,
				onMonitorStatus
			]);
			(0, react.useEffect)(() => {
				const onOpenPanel = (event) => {
					const activeSession = currentRef.current;
					if (activeSession === void 0) return;
					const detail = event.detail;
					if (detail?.captainSessionId && detail.captainSessionId !== activeSession) return;
					setOpenOwner(activeSession);
					setOpen(true);
					if (detail?.teamId !== void 0) {
						onRememberTeam?.(activeSession, detail);
						const owner = detail.captainSessionId || activeSession;
						const teamKey = `${owner}:${detail.teamId}`;
						setHistoric((previous) => {
							const next = new Map(previous);
							next.set(teamKey, {
								data: detail,
								owner
							});
							return next;
						});
					}
				};
				window.addEventListener(OPEN_PANEL_EVENT, onOpenPanel);
				return () => {
					window.removeEventListener(OPEN_PANEL_EVENT, onOpenPanel);
				};
			}, [onRememberTeam]);
			const visibleTeams = (0, react.useMemo)(() => current === void 0 ? [] : teams.filter((team) => team.captainSessionId === current), [teams, current]);
			const visibleHistoric = (0, react.useMemo)(() => current === void 0 ? [] : [...historic.values()].filter(({ data, owner }) => owner === current && !teams.some((live) => live.captainSessionId === current && live.teamId === data.teamId) && !archivedTeams.some((archived) => archived.captainSessionId === current && archived.teamId === data.teamId)), [
				historic,
				current,
				teams,
				archivedTeams
			]);
			const visibleArchived = (0, react.useMemo)(() => current === void 0 ? [] : archivedTeams.filter((team) => team.captainSessionId === current && !teams.some((live) => live.captainSessionId === current && live.teamId === team.teamId)), [
				archivedTeams,
				current,
				teams
			]);
			const visibleCount = visibleTeams.length + visibleArchived.length + visibleHistoric.length;
			(0, react.useEffect)(() => {
				if (visibleCount > 0) {
					setWasActive(true);
					return;
				}
				if (!wasActive) return;
				const timer = setTimeout(() => {
					setOpen(false);
					setOpenOwner(void 0);
					setWasActive(false);
				}, AUTOCLOSE_GRACE_MS);
				return () => {
					clearTimeout(timer);
				};
			}, [
				visibleCount,
				wasActive,
				current
			]);
			const busy = (0, react.useMemo)(() => visibleTeams.some((team) => team.members.some((member) => member.activity === "working")), [visibleTeams]);
			const hasTeams = visibleCount > 0;
			const panelGeometryForGesture = (0, react.useCallback)(() => {
				const measuredHeight = panelRef.current?.getBoundingClientRect().height;
				if (measuredHeight === void 0 || measuredHeight <= 0) return geometry;
				return {
					...geometry,
					height: measuredHeight
				};
			}, [geometry]);
			const flushScheduledLayout = (0, react.useCallback)(() => {
				if (frameRef.current !== null) {
					cancelAnimationFrame(frameRef.current);
					frameRef.current = null;
				}
				const pending = pendingLayoutRef.current;
				pendingLayoutRef.current = null;
				if (pending !== null) commitLayout(pending);
			}, [commitLayout]);
			const scheduleLayout = (0, react.useCallback)((next) => {
				pendingLayoutRef.current = next;
				frameRef.current ??= requestAnimationFrame(() => {
					frameRef.current = null;
					const pending = pendingLayoutRef.current;
					pendingLayoutRef.current = null;
					if (pending !== null) commitLayout(pending);
				});
			}, [commitLayout]);
			(0, react.useEffect)(() => () => {
				if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
			}, []);
			const beginMove = (0, react.useCallback)((event) => {
				if (compact || event.button !== 0 || event.target.closest("button") !== null) return;
				event.preventDefault();
				event.currentTarget.setPointerCapture(event.pointerId);
				gestureRef.current = {
					kind: "move",
					pointerId: event.pointerId,
					originX: event.clientX,
					originY: event.clientY,
					start: panelGeometryForGesture(),
					activated: false
				};
			}, [compact, panelGeometryForGesture]);
			const beginResize = (0, react.useCallback)((edge, event) => {
				if (compact || event.button !== 0 || geometry.mode === "docked" && edge !== "left") return;
				event.preventDefault();
				event.stopPropagation();
				event.currentTarget.setPointerCapture(event.pointerId);
				gestureRef.current = {
					kind: "resize",
					edge,
					pointerId: event.pointerId,
					originX: event.clientX,
					originY: event.clientY,
					start: panelGeometryForGesture(),
					activated: true
				};
				setInteraction("resizing");
			}, [
				compact,
				geometry.mode,
				panelGeometryForGesture
			]);
			const updateGesture = (0, react.useCallback)((event) => {
				const gesture = gestureRef.current;
				if (gesture === null || gesture.pointerId !== event.pointerId || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
				const dx = event.clientX - gesture.originX;
				const dy = event.clientY - gesture.originY;
				const activeBounds = boundsRef.current;
				if (gesture.kind === "move") {
					if (!gesture.activated && Math.hypot(dx, dy) < MOVE_THRESHOLD) return;
					if (!gesture.activated) {
						gesture.activated = true;
						setInteraction("dragging");
					}
					scheduleLayout(movePanelLayout(floatPanelLayout(gesture.start, activeBounds), dx, dy, activeBounds));
					return;
				}
				scheduleLayout(resizePanelLayout(gesture.start, gesture.edge ?? "left", dx, dy, activeBounds));
			}, [scheduleLayout]);
			const endGesture = (0, react.useCallback)((event) => {
				const gesture = gestureRef.current;
				if (gesture === null || gesture.pointerId !== event.pointerId) return;
				updateGesture(event);
				flushScheduledLayout();
				if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
				gestureRef.current = null;
				setInteraction(null);
			}, [flushScheduledLayout, updateGesture]);
			const cancelGesture = (0, react.useCallback)((event) => {
				const gesture = gestureRef.current;
				if (gesture === null || gesture.pointerId !== event.pointerId) return;
				flushScheduledLayout();
				gestureRef.current = null;
				setInteraction(null);
			}, [flushScheduledLayout]);
			const toggleDock = (0, react.useCallback)(() => {
				const liveGeometry = panelGeometryForGesture();
				commitLayout(liveGeometry.mode === "docked" ? floatPanelLayout(liveGeometry, boundsRef.current) : dockPanelLayout(liveGeometry, boundsRef.current));
			}, [commitLayout, panelGeometryForGesture]);
			const autoHeight = panelUsesAutoHeight(geometry, bounds);
			const panelStyle = {
				width: geometry.width,
				height: autoHeight ? "auto" : geometry.height,
				maxHeight: panelMaximumHeight(geometry, bounds),
				transform: `translate3d(${geometry.x}px, ${geometry.y}px, 0)`
			};
			if (!conversationVisible || !hasTeams && !expanded && !canvasEntry) return null;
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				!expanded && (0, react_jsx_runtime.jsx)(CollapsedBadge, {
					count: visibleCount,
					busy,
					team: visibleTeams[0] ?? visibleArchived[0],
					archived: !visibleTeams.length && !!visibleArchived.length,
					t,
					onClick: () => {
						if (current === void 0) return;
						const team = visibleTeams[0] ?? visibleArchived[0];
						if (team) setCanvasEntry({
							owner: current,
							teamId: team.teamId,
							archived: visibleArchived.includes(team)
						});
						else {
							setOpenOwner(current);
							setOpen(true);
						}
					}
				}),
				canvasEntry && canvasEntry.owner === current && (0, react_jsx_runtime.jsx)(WorkflowWorkbench, {
					initiallyOpen: true,
					sessionId: canvasEntry.owner,
					teamId: canvasEntry.teamId,
					archived: canvasEntry.archived,
					t,
					modelDirectory: modelDirectories.directoryFor(canvasEntry.owner),
					openExecution: (id, parent) => navigateToSession(parent ?? canvasEntry.owner, id),
					onShowActivity: () => {
						setCanvasEntry(void 0);
						setOpenOwner(current);
						setOpen(true);
					},
					onClose: () => setCanvasEntry(void 0)
				}, canvasEntry.owner + ":" + canvasEntry.teamId),
				expanded && (0, react_jsx_runtime.jsxs)("aside", {
					ref: panelRef,
					className: ActivityPanel_module_css_default.panel,
					style: panelStyle,
					"data-agent-teams-activity": true,
					"data-panel-mode": geometry.mode,
					"data-height-mode": autoHeight ? "auto" : "manual",
					"data-compact": compact || void 0,
					"data-dragging": interaction === "dragging" || void 0,
					"data-resizing": interaction === "resizing" || void 0,
					"aria-label": t("activity.panelAria"),
					children: [
						(0, react_jsx_runtime.jsxs)("header", {
							className: ActivityPanel_module_css_default.panelHead,
							onPointerDown: beginMove,
							onPointerMove: updateGesture,
							onPointerUp: endGesture,
							onPointerCancel: cancelGesture,
							"data-drag-handle": !compact || void 0,
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.panelTitle,
								children: [t("activity.title"), (0, react_jsx_runtime.jsx)("span", {
									className: ActivityPanel_module_css_default.panelDot,
									"data-busy": busy,
									"aria-hidden": true
								})]
							}), (0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.panelControls,
								children: [!compact && (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: ActivityPanel_module_css_default.iconButton,
									"data-control": "dock",
									"data-mode": geometry.mode,
									onClick: toggleDock,
									"aria-label": t(geometry.mode === "docked" ? "activity.float" : "activity.dockRight"),
									title: t(geometry.mode === "docked" ? "activity.float" : "activity.dockRight"),
									children: (0, react_jsx_runtime.jsx)(IconPanelLeftOutline16, {})
								}), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: ActivityPanel_module_css_default.iconButton,
									"data-control": "collapse",
									onClick: () => {
										setOpen(false);
										setOpenOwner(void 0);
									},
									"aria-label": t("activity.collapse"),
									title: t("activity.collapse"),
									children: (0, react_jsx_runtime.jsx)(IconChevronDownOutline14, {})
								})]
							})]
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: ActivityPanel_module_css_default.teams,
							children: [(0, react_jsx_runtime.jsxs)("div", {
								className: ActivityPanel_module_css_default.workflowLaunchers,
								children: [
									current && visibleCount === 0 && (0, react_jsx_runtime.jsx)(WorkflowWorkbench, {
										sessionId: current,
										modelDirectory: modelDirectories.directoryFor(current),
										t,
										openConversation: (id) => openWorkflowConversation(navigateToSession, id),
										openExecution: (id, parentId) => navigateToSession(parentId ?? current, id)
									}, current),
									[...visibleTeams, ...visibleArchived].map((team) => (0, react_jsx_runtime.jsx)(WorkflowWorkbench, {
										sessionId: team.captainSessionId,
										teamId: team.teamId,
										archived: visibleArchived.includes(team),
										modelDirectory: modelDirectories.directoryFor(team.captainSessionId),
										t,
										openConversation: (id) => openWorkflowConversation(navigateToSession, id),
										openExecution: (id, parentId) => navigateToSession(parentId ?? team.captainSessionId, id)
									}, team.teamId)),
									visibleHistoric.map(({ data, owner }) => (0, react_jsx_runtime.jsx)(WorkflowHistory, {
										name: data.teamName,
										children: (0, react_jsx_runtime.jsx)(TeamSection, {
											team: historicCardTeam(data, owner),
											workspace: true,
											historic: true,
											onNavigate: navigateToSession,
											t
										})
									}, data.teamId))
								]
							}), visibleCount === 0 ? (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.emptyHint,
								children: t("activity.empty")
							}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								visibleTeams.map((team) => (0, react_jsx_runtime.jsx)(TeamSection, {
									team,
									modelDirectory: modelDirectories.directoryFor(team.captainSessionId),
									onContinuePlanning: returnToComposer,
									onDiscarded: returnToComposer,
									onNavigate: navigateToSession,
									t
								}, team.teamId)),
								visibleArchived.map((team) => (0, react_jsx_runtime.jsxs)("div", {
									"data-team-id": team.teamId,
									"data-historic": true,
									className: ActivityPanel_module_css_default.archivedWrap,
									children: [(0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.archiveLabel,
										children: t(team.phase === "staged" ? "archive.discardedLabel" : "archive.label")
									}), (0, react_jsx_runtime.jsx)(TeamSection, {
										team,
										onNavigate: navigateToSession,
										t,
										historic: true
									})]
								}, `${team.captainSessionId}:${team.teamId}`)),
								visibleHistoric.map(({ data: team, owner }) => {
									const teamKey = `${owner}:${team.teamId}`;
									return (0, react_jsx_runtime.jsx)(TeamSection, {
										team: historicCardTeam(team, owner),
										onNavigate: navigateToSession,
										t,
										historic: true
									}, teamKey);
								})
							] })]
						}),
						!compact && (0, react_jsx_runtime.jsx)("div", {
							className: ActivityPanel_module_css_default.resizeHandle,
							"data-resize-edge": "left",
							onPointerDown: (event) => {
								beginResize("left", event);
							},
							onPointerMove: updateGesture,
							onPointerUp: endGesture,
							onPointerCancel: cancelGesture,
							"aria-hidden": true
						}),
						!compact && geometry.mode === "floating" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("div", {
							className: ActivityPanel_module_css_default.resizeHandle,
							"data-resize-edge": "bottom",
							onPointerDown: (event) => {
								beginResize("bottom", event);
							},
							onPointerMove: updateGesture,
							onPointerUp: endGesture,
							onPointerCancel: cancelGesture,
							"aria-hidden": true
						}), (0, react_jsx_runtime.jsx)("div", {
							className: ActivityPanel_module_css_default.resizeHandle,
							"data-resize-edge": "corner",
							onPointerDown: (event) => {
								beginResize("corner", event);
							},
							onPointerMove: updateGesture,
							onPointerUp: endGesture,
							onPointerCancel: cancelGesture,
							"aria-hidden": true
						})] })
					]
				})
			] });
		}
		function TeamSection(props) {
			return (0, react_jsx_runtime.jsx)(WorkflowLocale, {
				t: props.t,
				children: (0, react_jsx_runtime.jsx)(LocalizedTeamSection, { ...props })
			});
		}
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/WorkspaceActivity.module.css.mjs
		const css$1 = ".aHCVsa_root{--dsw-alias-state-business-primary:light-dark(#2866d7,#82b4ff);height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 78%, var(--dsw-alias-bg-base));font-variant-numeric:tabular-nums;font-family:inherit;overflow:auto;container:aHCVsa_team-workspace/inline-size}.aHCVsa_content{max-width:1400px;margin:0 auto;padding:16px 14px 28px}.aHCVsa_heading{flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:20px;display:flex}.aHCVsa_heading img{object-fit:contain;width:32px;height:32px}.aHCVsa_heading h2{letter-spacing:-.4px;margin:0;font-size:17px;font-weight:650}.aHCVsa_heading>span{color:var(--dsw-alias-label-secondary);margin-left:auto;font-size:12px}.aHCVsa_selector{flex-wrap:wrap;gap:8px;margin-bottom:18px;display:flex}.aHCVsa_selector button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);text-align:left;overflow-wrap:anywhere;border-radius:10px;align-items:center;gap:10px;max-width:100%;padding:10px 12px;font-size:12px;transition:background-color .14s,border-color .14s;display:flex}.aHCVsa_selector span{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-size:10px}.aHCVsa_selector button[aria-pressed=true]{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, var(--dsw-alias-bg-layer-1));border-color:var(--dsw-alias-state-business-primary)}.aHCVsa_selector button:hover{border-color:var(--dsw-alias-state-business-primary)}.aHCVsa_root button{cursor:pointer;font-family:inherit}.aHCVsa_selector button,.aHCVsa_empty button,.aHCVsa_error button{color:inherit}.aHCVsa_root button:active{transform:scale(.98)}.aHCVsa_root button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px}.aHCVsa_empty{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:18px;padding:32px 24px}.aHCVsa_emptyMark{width:44px;height:44px;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent);border-radius:13px;place-items:center;font-size:26px;display:grid}.aHCVsa_empty h3{margin:20px 0 10px;font-size:16px;font-weight:600}.aHCVsa_empty p{max-width:45ch;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.8}.aHCVsa_empty button,.aHCVsa_error button{background:var(--dsw-alias-bg-module-platform);border:1px solid var(--dsw-alias-border-l2);border-radius:9px;padding:9px 13px;font-size:12px}.aHCVsa_empty button:hover,.aHCVsa_error button:hover{border-color:var(--dsw-alias-state-business-primary)}.aHCVsa_error{border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);border-radius:12px;flex-wrap:wrap;align-items:start;gap:12px;margin-bottom:18px;padding:14px;font-size:12px;line-height:1.65;display:flex}.aHCVsa_error>span{flex:180px}.aHCVsa_error button{flex:none}.aHCVsa_skeleton{gap:14px;display:grid}.aHCVsa_skeleton i{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:16px;height:130px;animation:1.8s ease-in-out infinite alternate aHCVsa_breathe}.aHCVsa_skeleton i:first-child{height:74px}.aHCVsa_skeleton i:last-child{animation-delay:.3s}@keyframes aHCVsa_breathe{to{opacity:.45}}@container aHCVsa_team-workspace (width>=720px){.aHCVsa_content{padding:24px 24px 32px}.aHCVsa_heading{margin-bottom:24px}}@media (prefers-reduced-motion:reduce){.aHCVsa_skeleton i{animation:none}.aHCVsa_root button{transition:none}}";
		const tagId$1 = "@yogurtss/dsh-teamflow/WorkspaceActivity.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var WorkspaceActivity_module_css_default = {
			"breathe": "aHCVsa_breathe",
			"content": "aHCVsa_content",
			"empty": "aHCVsa_empty",
			"emptyMark": "aHCVsa_emptyMark",
			"error": "aHCVsa_error",
			"heading": "aHCVsa_heading",
			"root": "aHCVsa_root",
			"selector": "aHCVsa_selector",
			"skeleton": "aHCVsa_skeleton",
			"team-workspace": "aHCVsa_team-workspace"
		};
		//#endregion
		//#region lib/client/WorkspaceActivity.js
		/** Native workspace content; discovery remains mounted independently of tab lifetime. */
		const TEAM_TAB_KIND = "agent-teams";
		const TEAM_TAB_ID = "@yogurtss/dsh-teamflow/activity";
		/** Optional host integration tracks whether the host renders durable turn-tail cards. */
		function createWorkspaceBridge() {
			let sidebar;
			const listeners = /* @__PURE__ */ new Set();
			return {
				getSnapshot: () => sidebar,
				subscribe: (listener) => {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				set(value) {
					sidebar = value;
					for (const listener of listeners) listener();
				}
			};
		}
		/** The activity dot is the primary monitor on every host; native tabs are supplementary. */
		function ActivitySurface({ state, ...props }) {
			return (0, react_jsx_runtime.jsx)(ActivityPanel, {
				...props,
				onMonitorStatus: state.status,
				onRememberTeam: state.remember
			});
		}
		function WorkspaceActivity({ sessionId, useTabInfo, t, state, modelDirectories, openMember, openContext }) {
			const { tab } = useTabInfo();
			const snapshots = (0, react.useSyncExternalStore)(subscribeActivitySnapshots, getActivitySnapshotsSnapshot);
			const local = (0, react.useSyncExternalStore)(state.subscribe, state.getSnapshot);
			const [retry, setRetry] = (0, react.useState)(0);
			const [isNativeContext, setIsNativeContext] = (0, react.useState)(false);
			const live = snapshots.teams.filter((team) => team.captainSessionId === sessionId);
			const archived = snapshots.archivedTeams.filter((team) => team.captainSessionId === sessionId && !live.some((item) => item.teamId === team.teamId));
			const historic = [...local.history.values()].filter((team) => team.captainSessionId === sessionId && !live.some((item) => item.teamId === team.teamId) && !archived.some((item) => item.teamId === team.teamId)).map((team) => historicCardTeam(team, sessionId));
			const records = [
				...live,
				...archived,
				...historic
			];
			const selected = records.find((team) => team.teamId === local.selected.get(sessionId)) ?? records[0];
			const history = selected !== void 0 && !live.includes(selected);
			const status = local.statuses.get(sessionId) ?? "loading";
			(0, react.useEffect)(() => {
				if (retry === 0 || !tab.visible) return;
				const controller = startActivityPolling([], {
					discoverySessionId: sessionId,
					onStatus: (value) => state.status(sessionId, value)
				});
				controller.firstTick.finally(() => {
					controller.stop();
				});
				return () => {
					controller.stop();
				};
			}, [
				retry,
				sessionId,
				state,
				tab.visible
			]);
			const backToChat = () => {
				tab.actions.close();
				requestAnimationFrame(() => document.querySelector("[data-composer-card] [contenteditable=\"true\"][role=\"textbox\"], [data-composer-card] textarea")?.focus());
			};
			return (0, react_jsx_runtime.jsx)("div", {
				className: WorkspaceActivity_module_css_default.root,
				"data-agent-teams-workspace": true,
				"data-session-id": sessionId,
				children: (0, react_jsx_runtime.jsxs)("div", {
					className: WorkspaceActivity_module_css_default.content,
					children: [
						(0, react_jsx_runtime.jsxs)("header", {
							className: WorkspaceActivity_module_css_default.heading,
							children: [
								(0, react_jsx_runtime.jsx)("img", {
									src: LEAD_ART,
									alt: "",
									"aria-hidden": true
								}),
								(0, react_jsx_runtime.jsx)("h2", { children: "TeamFlow" }),
								(0, react_jsx_runtime.jsx)("span", { children: t("workspace.title") })
							]
						}),
						history && selected && !archived.includes(selected) && (0, react_jsx_runtime.jsx)(WorkflowHistory, {
							name: selected.name,
							children: (0, react_jsx_runtime.jsx)(TeamSection, {
								team: selected,
								workspace: true,
								historic: true,
								onNavigate: openMember,
								t
							})
						}),
						(!history || !!selected && archived.includes(selected)) && (0, react_jsx_runtime.jsx)(WorkflowWorkbench, {
							sessionId,
							teamId: selected?.teamId,
							archived: history,
							embeddedContext: isNativeContext,
							onNativeContext: setIsNativeContext,
							openContext,
							modelDirectory: modelDirectories.directoryFor(sessionId),
							t,
							waitingCount: selected?.phase !== "staged" && !selected?.halted ? selected?.tasks.filter((task) => task.checkpoint && !task.workflowConfigPending && !task.workflowPaused && !task.checkpoint.decision && task.status === "pending" && task.dependencies.every((id) => selected.tasks.some((t) => t.id === id && t.status === "completed"))).length : 0,
							openConversation: (id) => openWorkflowConversation(openMember, id),
							openExecution: (id, parentId) => openMember(parentId ?? sessionId, id)
						}, `${sessionId}:${selected?.teamId ?? ""}`),
						!isNativeContext && status === "error" && (0, react_jsx_runtime.jsxs)("div", {
							className: WorkspaceActivity_module_css_default.error,
							role: "alert",
							children: [(0, react_jsx_runtime.jsx)("span", { children: t("workspace.error") }), (0, react_jsx_runtime.jsx)("button", {
								onClick: () => setRetry((value) => value + 1),
								children: t("workspace.retry")
							})]
						}),
						records.length > 1 && (0, react_jsx_runtime.jsx)("nav", {
							className: WorkspaceActivity_module_css_default.selector,
							"aria-label": t("workspace.title"),
							children: records.map((team) => (0, react_jsx_runtime.jsxs)("button", {
								"aria-pressed": selected?.teamId === team.teamId,
								onClick: () => state.select(sessionId, team.teamId),
								children: [team.name, (0, react_jsx_runtime.jsx)("span", { children: t(live.includes(team) ? "workspace.current" : "workspace.history") })]
							}, team.teamId))
						}),
						selected === void 0 ? isNativeContext ? null : status === "loading" ? (0, react_jsx_runtime.jsxs)("div", {
							className: WorkspaceActivity_module_css_default.skeleton,
							role: "status",
							"aria-label": t("workspace.loading"),
							children: [
								(0, react_jsx_runtime.jsx)("i", {}),
								(0, react_jsx_runtime.jsx)("i", {}),
								(0, react_jsx_runtime.jsx)("i", {})
							]
						}) : (0, react_jsx_runtime.jsxs)("section", {
							className: WorkspaceActivity_module_css_default.empty,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: WorkspaceActivity_module_css_default.emptyMark,
									"aria-hidden": true,
									children: "↳"
								}),
								(0, react_jsx_runtime.jsx)("h3", { children: t("workspace.emptyTitle") }),
								(0, react_jsx_runtime.jsx)("p", { children: t("workspace.emptyBody") }),
								(0, react_jsx_runtime.jsx)("button", {
									onClick: backToChat,
									children: t("workspace.back")
								})
							]
						}) : (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: (0, react_jsx_runtime.jsx)(TeamSection, {
							team: selected,
							workspace: true,
							historic: history,
							modelDirectory: !history ? modelDirectories.directoryFor(sessionId) : void 0,
							onContinuePlanning: backToChat,
							onDiscarded: backToChat,
							onNavigate: openMember,
							t
						}, `${sessionId}:${selected.teamId}`) })
					]
				})
			});
		}
		//#endregion
		//#region \0dsh-css:/private/tmp/dsh-teamflow-dev/src/client/BlankSessionTeamflowEntry.module.css.mjs
		const css = ".ogi52q_entry{pointer-events:auto;-webkit-app-region:no-drag;position:absolute;top:12px;right:72px}@media (width<=600px){.ogi52q_entry{top:10px;right:56px}}";
		const tagId = "@yogurtss/dsh-teamflow/BlankSessionTeamflowEntry.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@yogurtss/dsh-teamflow";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var BlankSessionTeamflowEntry_module_css_default = { "entry": "ogi52q_entry" };
		//#endregion
		//#region lib/client/BlankSessionTeamflowEntry.js
		/** Blank Web sessions hide header.actions; the additive shell seat stays mounted. */
		function BlankSessionTeamflowEntry({ sessionsList, modelDirectories, openMember, t, conversationVisible = true }) {
			const id = blankTeamflowSession((0, react.useSyncExternalStore)(sessionsList.subscribe, sessionsList.getSnapshot), conversationVisible);
			if (!id) return null;
			return (0, react_jsx_runtime.jsx)("div", {
				className: BlankSessionTeamflowEntry_module_css_default.entry,
				"data-teamflow-blank-entry": true,
				children: (0, react_jsx_runtime.jsx)(WorkflowWorkbench, {
					sessionId: id,
					nativeOnly: true,
					t,
					modelDirectory: modelDirectories.directoryFor(id),
					openConversation: (target) => openWorkflowConversation(openMember, target),
					openExecution: (target, parent) => openMember(parent ?? id, target)
				}, id)
			});
		}
		//#endregion
		//#region lib/client/agent-teams-card-definition.js
		/**
		* AgentTeams conversation card: a lightweight in-conversation summary shown
		* when a team is created — the captain's name, the member roster with whale
		* avatars, and an entry point that re-activates the top-right activity
		* panel (useful after the floater was closed, or when re-opening an old
		* session for review).
		*
		* The fold anchors to the Harness's durable `tool/call` + `tool/result`
		* records for `agent_teams_create`. Those are first-party session events, so
		* the card survives restarts without writing an out-of-repo event type.
		* @module dsh-agent-teams/client/card
		*/
		/**
		* Fold a team name the way the host's `sanitizeKey` does, minus the host's
		* digest fallback. The host keeps Unicode letters and digits, so an ASCII-only
		* client derivation turned every CJK name into the shared `team` key and the
		* card could never match its live team (issue #203). Names with no letters or
		* digits at all, and names longer than the host's key limit, still need the
		* host's canonical id; the create result now carries it.
		* @param name - the create call's team name.
		* @returns the host-shaped key for the name.
		*/
		function teamKeyFromName(name) {
			const cleaned = name.normalize("NFC").trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
			return cleaned === "" ? "team" : cleaned;
		}
		/** Parse the only create-call fields the historic card owns. */
		function parseAgentTeamsCreateArgs(value) {
			try {
				const parsed = JSON.parse(value);
				if (typeof parsed !== "object" || parsed === null || !("name" in parsed) || typeof parsed.name !== "string") return;
				const name = parsed.name.trim();
				if (name === "") return void 0;
				return {
					teamId: teamKeyFromName(name),
					name
				};
			} catch {
				return;
			}
		}
		/**
		* Read the canonical identity the host attaches to the `agent_teams_create`
		* result. Records written before the host published it carry no metadata, so
		* an absent or malformed payload falls back to the client derivation.
		* @param meta - the durable `tool/result` metadata payload, if any.
		* @returns the canonical identity, or `undefined` when the host published none.
		*/
		function parseAgentTeamsCreateResult(meta) {
			if (typeof meta !== "object" || meta === null) return void 0;
			const record = meta;
			const teamId = typeof record.team_id === "string" ? record.team_id.trim() : "";
			if (teamId === "") return void 0;
			const captainSessionId = typeof record.captain_session_id === "string" ? record.captain_session_id.trim() : "";
			const members = [];
			if (Array.isArray(record.members)) for (const entry of record.members) {
				if (typeof entry !== "object" || entry === null) continue;
				const member = entry;
				const name = typeof member.name === "string" ? member.name : "";
				if (name === "") continue;
				members.push({
					id: typeof member.id === "string" ? member.id : "",
					name,
					role: typeof member.role === "string" ? member.role : ""
				});
			}
			return {
				teamId,
				captainSessionId,
				members
			};
		}
		/**
		* Read the canonical team id out of a `tool/result` recorded before the host
		* published {@link parseAgentTeamsCreateResult}'s metadata. Both historic
		* renderings carry it and have been stable since they were introduced:
		* `Team "<name>" created (id <canonical>) under <state_dir>. You are the
		* captain.` and the staged `Team "<name>" plan created under <state_dir>. It is
		* staged: …`, whose `state_dir` ends in the canonical id. This is the only
		* legacy path for names the client cannot re-derive (host digest fallback,
		* over-long names). Matches are taken right-to-left because the team name sits
		* in front of the canonical segment and may itself contain a look-alike.
		* @param text - the concatenated text blocks of one successful create result.
		* @returns the canonical id, or `undefined` when the text carries none.
		*/
		function teamIdFromCreateResultText(text) {
			const created = [...text.matchAll(/" created \(id ([^()\s]+)\) under /gu)].at(-1)?.[1];
			if (created !== void 0 && created !== "") return created;
			const stagedPath = [...text.matchAll(/plan created under (.+?)\. It is staged: /gu)].at(-1)?.[1];
			if (stagedPath === void 0) return void 0;
			const segment = stagedPath.split(/[\\/]/u).filter((part) => part !== "").at(-1);
			return segment === void 0 || segment === "" ? void 0 : segment;
		}
		/** Durable first-party tool events folded into one keyed Chat node. */
		const agentTeamsCardDefinition = {
			kind: "agent-teams",
			target: "chat",
			match: (event) => {
				if (event.type === "tool/call" && event.data.name === "agent_teams_create") return parseAgentTeamsCreateArgs(event.data.arguments) === void 0 ? null : {
					id: String(event.data.callId),
					role: "start"
				};
				if (event.type === "tool/result" && event.data.message.source.kind === "tool") return {
					id: String(event.data.message.source.callId),
					role: "update"
				};
				return null;
			},
			start: (_context, match) => {
				if (match.event.type !== "tool/call") throw new Error("agent-teams card start requires agent_teams_create tool/call");
				const parsed = parseAgentTeamsCreateArgs(match.event.data.arguments);
				if (parsed === void 0) throw new Error("agent-teams card start requires valid create arguments");
				return {
					...parsed,
					accepted: false,
					captainSessionId: "",
					members: []
				};
			},
			update: (context, match) => {
				if (match.event.type !== "tool/result") return context.state;
				if (match.event.data.error !== void 0 || toolResultFailed(match.event.data.message)) return context.state;
				const canonical = parseAgentTeamsCreateResult(match.event.data.meta);
				const legacyId = canonical === void 0 ? teamIdFromCreateResultText(resultText(match.event.data.message)) : void 0;
				if (canonical === void 0 && legacyId === void 0) return {
					...context.state,
					accepted: true
				};
				return {
					...context.state,
					accepted: true,
					teamId: canonical?.teamId ?? legacyId ?? context.state.teamId,
					captainSessionId: canonical?.captainSessionId ?? "",
					members: canonical?.members ?? []
				};
			},
			buildViewNode: (context) => {
				if (context.start === void 0) return null;
				const state = context.state;
				if (!state.accepted) return null;
				return {
					key: context.key,
					kind: "agent-teams",
					id: context.id,
					target: "chat",
					anchorSeq: context.start.event.seq,
					location: context.start.location,
					visibility: "visible",
					data: {
						teamId: state.teamId,
						captainSessionId: state.captainSessionId,
						teamName: state.name,
						members: state.members
					}
				};
			}
		};
		/** Concatenate the text blocks of one durable tool-result message. */
		function resultText(message) {
			return message.content.filter((block) => typeof block === "object" && block !== null && "type" in block && block.type === "text" && "text" in block && typeof block.text === "string").map((block) => block.text).join("\n");
		}
		/** V4 tool-role results carry isError directly; older logs nest tool-result blocks. */
		function toolResultFailed(message) {
			return message.isError === true || message.content.some((block) => typeof block === "object" && block !== null && "type" in block && block.type === "tool-result" && "isError" in block && block.isError === true);
		}
		/** Keep summaries tied to the create turn, including multiple teams in one turn. */
		function teamCardsForTurn(nodes, turn) {
			return [...nodes].filter((node) => node.kind === "agent-teams" && (node.location.kind === "turn" || node.location.kind === "step") && node.location.turn.turn === turn);
		}
		//#endregion
		//#region lib/client/TeamChatEntry.js
		/** Session-owned review reminders, discussion entry and durable team cards. */
		function TeamChatEntry({ sessionId, t, openMember, openContext }) {
			const { teams, archivedTeams } = (0, react.useSyncExternalStore)(subscribeActivitySnapshots, getActivitySnapshotsSnapshot);
			const team = [...teams, ...archivedTeams].find((team) => team.captainSessionId === sessionId);
			if (!team) return (0, react_jsx_runtime.jsx)(WorkflowWorkbench, {
				sessionId,
				nativeOnly: true,
				openContext,
				openConversation: openMember ? (id) => openWorkflowConversation(openMember, id) : void 0,
				openExecution: (id, parentId) => openMember?.(parentId ?? sessionId, id)
			}, sessionId);
			return (0, react_jsx_runtime.jsx)(WorkflowWorkbench, {
				sessionId,
				teamId: team.teamId,
				nativeOnly: true,
				archived: archivedTeams.includes(team),
				openConversation: openMember ? (id) => openWorkflowConversation(openMember, id) : void 0
			}, sessionId);
		}
		function TeamTurnCard({ sessionId, turn, useChat, t, openMember }) {
			const cards = teamCardsForTurn(useChat((snapshot) => snapshot.nodes).values(), turn.turn);
			if (turn.status !== "closed" || cards.length === 0) return null;
			return (0, react_jsx_runtime.jsx)("div", {
				className: AgentTeamsCard_module_css_default.turnCards,
				"data-team-turn-cards": true,
				children: cards.map((node) => (0, react_jsx_runtime.jsx)(AgentTeamsSummary, {
					data: node.data,
					sessionId,
					t,
					openMember
				}, node.key))
			});
		}
		//#endregion
		//#region lib/client/workspace-state.js
		function createWorkspaceState() {
			let snapshot = {
				statuses: /* @__PURE__ */ new Map(),
				history: /* @__PURE__ */ new Map(),
				selected: /* @__PURE__ */ new Map()
			};
			const listeners = /* @__PURE__ */ new Set();
			const publish = (next) => {
				snapshot = next;
				for (const listener of listeners) listener();
			};
			return {
				getSnapshot: () => snapshot,
				subscribe: (listener) => {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				status(session, status) {
					if (snapshot.statuses.get(session) === status) return;
					publish({
						...snapshot,
						statuses: new Map(snapshot.statuses).set(session, status)
					});
				},
				select(session, team) {
					if (snapshot.selected.get(session) === team) return;
					publish({
						...snapshot,
						selected: new Map(snapshot.selected).set(session, team)
					});
				},
				remember(session, data) {
					const owner = data.captainSessionId || session;
					if (owner !== session) return;
					publish({
						...snapshot,
						history: new Map(snapshot.history).set(`${owner}:${data.teamId}`, {
							...data,
							captainSessionId: owner
						}),
						selected: new Map(snapshot.selected).set(owner, data.teamId)
					});
				}
			};
		}
		//#endregion
		//#region lib/client/discussion-session-presentation.js
		const discussionId = /^session-at-discussion-[a-f0-9]{16}-[a-f0-9-]{36}$/u;
		const installationKey = Symbol.for("@yogurtss/dsh-teamflow:discussion-session-presentation");
		/** Older discussion headers are immutable. Project their existing catalog rows
		* as auxiliary sessions so the host's normal workspace/search filters exclude
		* them. Keep ids, history, retention and the underlying store untouched.
		* Harness has no additive catalog-filter API; this narrow adapter is removable
		* and memoized to satisfy useSyncExternalStore's snapshot identity contract. */
		function installDiscussionSessionPresentation(catalog) {
			const owned = catalog;
			let installed = owned[installationKey];
			if (!installed) {
				const original = catalog.getSnapshot;
				const cache = /* @__PURE__ */ new WeakMap();
				const projected = () => {
					const source = original.call(catalog);
					if (!source?.byId) return source;
					const prior = cache.get(source);
					if (prior) return prior;
					const changed = Object.entries(source.byId).filter(([id, row]) => discussionId.test(id) && row.origin !== "subagent");
					const result = changed.length ? {
						...source,
						byId: { ...source.byId }
					} : source;
					for (const [id, row] of changed) result.byId[id] = {
						...row,
						origin: "subagent"
					};
					cache.set(source, result);
					return result;
				};
				installed = {
					count: 0,
					original,
					projected
				};
				catalog.getSnapshot = projected;
				Object.defineProperty(owned, installationKey, {
					value: installed,
					configurable: true
				});
			}
			installed.count++;
			let disposed = false;
			return () => {
				if (disposed) return;
				disposed = true;
				if (--installed.count) return;
				if (catalog.getSnapshot === installed.projected) catalog.getSnapshot = installed.original;
				delete owned[installationKey];
			};
		}
		//#endregion
		//#region lib/client/index.js
		/** Required services: conversation nodes, slots, sessions navigation, and locale. */
		const inject = [
			"uiConversation",
			"slots",
			"sessions",
			"locale",
			"modelDirectories",
			"layout"
		];
		const useLegacyPanelInfo = (select) => select({ activePanelId: null });
		/** The replayed user message is the canonical transcript entry. */
		function HiddenAgentTeamsCommand() {
			return null;
		}
		/**
		* Register the activity monitor in the shell's additive overlay and the
		* in-conversation team card. The card's activity button re-opens a folded
		* monitor via a window event — the recovery path for an old session.
		*/
		function apply(ctx) {
			ctx.effect(() => installDiscussionSessionPresentation(ctx.sessions.list), "teamflow: workflow-only discussions");
			ctx.sessions.refresh?.().catch((error) => console.warn(`teamflow: discussion catalog refresh failed: ${String(error)}`));
			const bridge = createWorkspaceBridge();
			const state = createWorkspaceState();
			ctx.effect(() => ctx.locale.register(AGENT_TEAMS_LOCALE_NAMESPACE, {
				zh,
				en
			}), "agent-teams: dictionaries");
			const openMember = async (parentId, childId) => {
				await openAgentTeamMember(ctx.sessions, parentId, childId, ctx.layout, ctx.get("uiWorkspace")).catch((error) => {
					console.warn(`agent-teams: failed to open member transcript ${childId}: ${String(error)}`);
					throw error;
				});
			};
			const Panel = ({ t, usePanelInfo }) => {
				const conversationVisible = (usePanelInfo ?? useLegacyPanelInfo)((panel) => panel.activePanelId === null);
				return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(BlankSessionTeamflowEntry, {
					sessionsList: ctx.sessions.list,
					modelDirectories: ctx.modelDirectories,
					openMember,
					t,
					conversationVisible
				}), (0, react_jsx_runtime.jsx)(ActivitySurface, {
					state,
					conversationVisible,
					sessionsList: ctx.sessions.list,
					modelDirectories: ctx.modelDirectories,
					openMember,
					t
				})] });
			};
			ctx.inject([
				"workspaces",
				"uiWorkspace",
				"remote.session"
			], (native) => {
				if (typeof native.sessions.retain !== "function" || typeof native.sessions.create !== "function" || !native.workspaces.list || typeof native.uiWorkspace.pickDirectory !== "function") return;
				native.slots.inject("main", () => native.slots.register({
					name: "main",
					key: "dsh-teamflow-workflow",
					locale: AGENT_TEAMS_LOCALE_NAMESPACE,
					inject: () => ({
						sessions: native.sessions,
						workspaces: native.workspaces,
						uiWorkspace: native.uiWorkspace,
						modelDirectories: native.modelDirectories,
						openMember
					})
				}, WorkflowLauncher));
				native.slots.inject("sidebar.panellist", () => native.slots.register({
					name: "sidebar.panellist",
					id: "dsh-teamflow-workflow",
					order: 30,
					label: "Workflow"
				}, ({ size }) => (0, react_jsx_runtime.jsx)(BrandIcon, { size })));
			});
			ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
				name: "conversation.session.header.actions",
				id: "agent-teams-entry",
				order: 50,
				locale: AGENT_TEAMS_LOCALE_NAMESPACE,
				inject: () => ({ openMember })
			}, TeamChatEntry));
			ctx.inject(["sidebarRight", "sidebarRightTabs"], (native) => {
				const t = native.locale.bind(AGENT_TEAMS_LOCALE_NAMESPACE);
				native.effect(() => native.sidebarRightTabs.register({
					id: TEAM_TAB_ID,
					kind: TEAM_TAB_KIND,
					title: () => t("workspace.title")
				}));
				native.slots.inject("conversation.chat.turnTail", () => native.slots.register({
					name: "conversation.chat.turnTail",
					id: "agent-teams-summary",
					order: 50,
					locale: AGENT_TEAMS_LOCALE_NAMESPACE,
					inject: () => ({ openMember })
				}, TeamTurnCard));
				native.slots.inject("sidebar.right.pane.tab", () => {
					const dispose = native.slots.register({
						name: "sidebar.right.pane.tab",
						key: TEAM_TAB_ID,
						locale: AGENT_TEAMS_LOCALE_NAMESPACE,
						inject: () => ({
							state,
							modelDirectories: native.modelDirectories,
							openMember,
							openContext: () => native.sidebarRight.openTab(TEAM_TAB_KIND)
						})
					}, WorkspaceActivity);
					bridge.set(native.sidebarRight);
					return () => {
						bridge.set(void 0);
						dispose();
					};
				});
			});
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "agent-teams-activity",
				order: 80,
				label: "TeamFlow activity",
				locale: AGENT_TEAMS_LOCALE_NAMESPACE
			}, Panel));
			for (const command of ["teamflow", "agent-teams"]) ctx.slots.inject("conversation.chat.commandview", () => ctx.slots.register({
				name: "conversation.chat.commandview",
				key: command
			}, HiddenAgentTeamsCommand));
			ctx.uiConversation.events.register(agentTeamsCardDefinition);
			ctx.slots.inject("conversation.chat.node", () => ctx.slots.register({
				name: "conversation.chat.node",
				key: "agent-teams",
				locale: AGENT_TEAMS_LOCALE_NAMESPACE,
				inject: () => ({
					openMember,
					workspaceBridge: bridge
				})
			}, AgentTeamsCard));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map