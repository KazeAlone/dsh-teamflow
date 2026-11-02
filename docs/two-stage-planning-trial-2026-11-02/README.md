# 两阶段任务生成实测（2026-11-02）

第二阶段确实收到通用要求。在本次 12 次 dev.8 真实试跑中，逐一检查生成本次任务前的模型请求：工具返回上下文包含全部节点的通用 requirements、deliverables、acceptance，且与最后保存的通用层完全一致。该检查只读取工具返回内容，不把模型上一轮自己输出的通用层当作证据。队长创建结果和状态恢复也显式返回这些内容。

## 行为与字段变化

| 入口 | 第一阶段 | 第二阶段 |
| --- | --- | --- |
| 新建画布流程 | `plan_general`：成员、节点、依赖、通用三字段，保存可恢复草稿 | `plan_specific`：draftId、全部任务 ID、每个任务的三个本次文本字段 |
| Gallery 模板 | 已由模板提供，跳过 | 同一 `plan_specific`；服务端保留通用层、负责人和 DAG |
| `/teamflow` 队长 | `create`：approval=required，plan.tasks[].general | `edit_plan`：update_task、真实 task_id、specific 三字段；服务端保留 general |

画布第二阶段不再要求模型输出 operations、layers、general、confirmConfiguration 或 adaptationIssue。真正存在阻塞时可选填 blocker。人工节点第一阶段的 assignee 明确要求空字符串，普通节点填成员名；不接受 null。两阶段之间不要求用户审批，完成后统一确认。执行 Agent 仍只读取本次完整任务，因此需要把通用要求具体化纳入本次文本。

通用草稿尚未应用时不创建执行成员或任务，界面提供恢复讨论和放弃草稿入口；过期草稿不能覆盖新状态，迟到的放弃请求不能取消已经完成的提案。队长入口保存的是 staged 计划，通用要求未完成具体化时不能启动。

## 真实模型结果

固定 Harness **0.2.1-rc.2**，模型 **deepseek-account / deepseek-flash / high**，独立临时工作区；每轮最多 12 次模型请求、300 秒讨论等待、360 秒进程上限。任务为无依赖的 `validatePort`，只接受 1–65535 的 primitive number 整数。测试停在计划完成/应用后，成员未启动。模板使用内置功能开发 v1 的 5 节点流程。

“生成首次通过”指所需创建/生成工具没有失败或重试；“所有工具无错误”还包括状态读取、文件工具等外围调用。不能将二者混用。

| 场景 | 生成首次通过 | 最终完成 | 所有工具无错误 | 模型请求数 |
| --- | --- | --- | --- | --- |
| dev.7 模板对照 | 3/3 | 3/3 | 3/3 | 每轮 3 |
| dev.8 模板第二阶段 | 3/3 | 3/3 | 3/3 | 每轮 3 |
| dev.8 从零创建，初版候选 | 2/3 | 3/3 | 2/3 | 4、5、4 |
| dev.8 从零创建，修正 assignee 后 | 3/3 | 3/3 | 3/3 | 每轮 4 |
| dev.8 队长入口，完整宿主工具集 | 2/2 | 2/2 | 0/2 | 12、10 |
| dev.8 队长入口，限定规划工具 | 1/1 | 1/1 | 0/1 | 4 |

- 初版从零创建的一轮把两个人工节点的 assignee 填为 null，Schema 拒绝；模型重试后完成。随后把字段改为必填字符串，并在 Schema 和提示词中明确人工节点使用 `""`，重新跑三轮均一次通过。原失败样本保留在证据中，不并入修正后的分母。
- 两次完整宿主队长测试中，create 和 edit_plan 均首次成功，但先调用 status 时团队尚不存在，并且尝试文件/终端调查，遇到 Windows `SetNamedSecurityInfoW / grantWrite` 错误。不能据此宣称队长完整链路零错误。第三次限定 create/edit_plan/status 后消除了文件工具干扰，仍有一次无团队时的 status 错误。测试限制仅作用于夹具，产品工具权限未改动。
- dev.7/dev.8 模板试跑交替、串行进行。总耗时中位数为 **98.238 秒 / 41.060 秒**；模型报告的 outputTokens 中位数 **14,486 / 7,339**；生成参数 JSON 字符数中位数 **8,124 / 6,239**。第二轮旧版首次上下文请求单独等待约 195 秒，故耗时不能直接归因于本次改动。outputTokens 也不等同于可见文字字符数。
- 新旧模板样本都是 3/3 首次成功，**本次没有证明模板成功率提升**。可以确认新协议减少了模型需要输出的结构和文本，并修复了实测发现的 null 字段问题。每组只有少量样本、只有一个模型，不能外推到其他服务器的小模型，也未用这些规划试跑评估后续任务执行质量。
- 通用内容进入上下文不等于语义上必然被完整落实；结构校验、非空检查和通用层保留不能代替最终任务书内容审阅。

## 自动化与打包验证

- 构建通过；两阶段、队长实际 ToolRuntime、模板、工作流、界面语言及可用性相关 **107 项测试通过**。覆盖草稿恢复、通用上下文、缺失节点原子拒绝、过期 token、模板固定结构、阻塞保留/解除、未完成禁止启动、放弃草稿并发保护。
- 后续能力、权限、会话恢复、Git 安装及来源修复等 **68 项检查通过**。依赖 doctor 检查 295 个 DSH 包身份通过，Git 产物指纹一致。
- 最终打包产物通过固定 Harness 的原生运行测试，包括创建、最终审批、模板套用、本次任务执行、原生冷恢复和人工关卡。此组模型回答由夹具提供，不计入真实成功率。
- 全量 verify 仍停在既有 6 项问题：1 项 Windows 符号链接权限，5 项升级检查器不接受 `-dev` 版本；此前已用未修改的 dev.6 包信息复现。没有把全量检查标记为通过。后续检查已单独执行。

原生模板/初版从零试跑使用 dev8NativeCandidate 打包版本；修正后从零试跑使用 dev8Final；队长试跑使用 dev8Captain。后两者的队长工具实现相同。期间新增的草稿界面、队长上下文回传、人工节点 assignee 修正均在最终打包版本验证。各产物源码/构建指纹与关键模块摘要、逐轮结果和原始 trace 的 SHA-256 见 [evidence.json](./evidence.json)。临时工作区、原始会话和账号配置不入库。

复跑命令（准备项目固定宿主的独立打包 runtime 后）：

```text
node scripts/feature-workflow-verify.mjs <runtime> <new-report> <credential-file> --planning-only
node scripts/feature-workflow-verify.mjs <runtime> <new-report> <credential-file> --planning-only --from-scratch
node scripts/feature-workflow-verify.mjs <runtime> <new-report> <credential-file> --planning-only --captain-planning
```

当前 `--captain-planning` 限定规划工具，不能用它复现最初两次完整工具集的外围错误。两阶段是两次生成提交，此外仍有上下文读取和模型最终回复；正常原生新建需要 4 次模型请求，模板适配需要 3 次。
