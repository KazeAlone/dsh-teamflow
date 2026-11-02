# 单份任务描述与模板提炼复测（2026-11-02）

环境：Windows，Harness 0.2.1-rc.2，DeepSeek account / deepseek-flash，reasoningEffort=high。真实模型通过打包插件的原生工具运行；独立 profile、工作区和个人模板目录，不修改用户模板库。模型调用上限 12 次，单轮上限 360 秒。此模型不代表用户其他服务器上的所有小模型。

固定案例：具名 ESM 导出 validatePort(value)，仅原始 number 类型的 1–65535 整数为 true，其余 false，不转换、不抛错；先写 requirements.md，再实现 validator.mjs 和 node:test 测试。无第三方依赖、网络或 git 操作。

## 全部真实模型样本

时间为首条至末条测试事件，包含创建/应用、模型讨论及可选保存，不是单个工具耗时。请求数包含工具结果后的模型回复。

| 本地样本 | 插件 | 路径 | 生成完整任务计划 | 模板提炼并保存 | 模型请求 | 秒 |
| --- | --- | --- | --- | --- | --- | --- |
| captain-1 | dev.11 | 主对话 /teamflow | 通过 | 通过，首次提交 | 6 | 36 |
| captain-2 | dev.11 | 主对话 /teamflow | 通过 | 未测试 | 3 | 23 |
| workflow-1 | dev.11 | Workflow 从空白新建 | 通过 | 未测试 | 3 | 21 |
| template-1 | dev.11 | 应用五节点模板 | 通过 | 失败，7 次工具错误 | 12 | 327 |
| captain-fixed-1 | dev.12 | 主对话 /teamflow | 通过 | 通过，首次提交 | 6 | 45 |
| template-fixed-1 | dev.12 | 应用五节点模板 | 通过 | 通过，首次提交 | 6 | 69 |
| template-fixed-2 | dev.12 | 应用五节点模板 | 通过 | 通过，首次提交 | 6 | 98 |

7 份计划均有完整 description，无 layers，无待配置节点；主对话各一次 create 成功。模板应用全部保留节点、负责人、依赖，模型输出先成为提案，再由测试驱动模拟用户确认。新版 3 次提炼均首次提交成功，保存不改源任务，模板不含 validatePort、validator.mjs、65535 等本次专用标识。

主对话的 3 个样本都先调用 status，得到“尚未加入团队”，随后成功创建。这是多余的状态查询及业务错误，并非参数格式错误，未从日志中排除。没有观察到 operations 或 layers 类型错误。

dev.11 的 template-1 保存阶段发生 4 次内嵌 JSON 解析错误，随后 3 次“模板文本为空或过长”，最终无可保存草稿。dev.12 把 definition 改为带字段类型的原生对象，布局由服务端复制，消除二次 JSON 编码。以上对比说明这次具体故障有改善；样本少、生成长度和服务延迟不同，不构成总体速度或成功率统计。

## 内容人工检查

工具与流程成功不等于语义正确。未修饰测试产物来制造通过：

- captain-1 的验证任务一边要求非整数/越界值为 true，一边又列为 false，存在实质矛盾。
- template-1 的验证任务一边禁止修改实现，一边建议临时破坏实现做反向测试，职责边界矛盾。
- 其余样本未发现上述两种矛盾，关键端点、非法类型、导出方式和测试要求一致；这不是对任意输入生成内容的正确性保证。
- 提炼出的模板仍可能保留“无类型转换、不抛错”等该类校验任务的方法约束。去掉专用名称和数值不等于适用于所有项目，保存前仍应确认模板适用范围。

真实模型本轮只测试规划、提炼与保存，没有让真实模型执行开发节点。执行、人工门禁、完整 description 进入成员 prompt、重跑和冷恢复另由真实 Harness 加脚本化模型的打包集成测试验证，两类证据分别记录。

## 确定性与集成检查

- 107 项相关回归通过（97 项任务/模板/Workflow/UI 测试，以及 10 项计划相关检查）；新增结构化参数、错误类型、结构保护、源任务不变、非空画布位置保留的回归。
- dev.12 安装包在 Harness 0.2.1-rc.2 下的 web-approval、workflow-native-cold 场景通过。原生工具校验、HTTP 确认、模板提炼/应用、执行输入、人工门禁及重跑均通过。
- 全量 verify 在兼容检查处有 6 项既有失败：Windows 符号链接权限 1 项，升级检查器的开发版本身份判断 5 项；其后 68 项检查单独通过。未将全量检查描述为全部通过。
- doctor 验证 295 个包身份通过；构建通过；构建产物与源码一致。

## 复现

先构建打包，再准备运行时：

```powershell
pnpm --config.verify-deps-before-run=false run build
pnpm --config.verify-deps-before-run=false pack --pack-destination output/audit-pack
node scripts/template-runtime-verify.mjs output/audit-pack/yogurtss-dsh-teamflow-0.2.5-dev.12.tgz output/audit-runtime
node scripts/feature-workflow-verify.mjs output/audit-runtime/runtime output/audit-trial "$env:USERPROFILE/.dsh/.credentials.yaml" --planning-only --save-template
```

主对话加 `--captain-planning`，Workflow 空白新建加 `--from-scratch`。每次使用新的输出目录；需要现有 DeepSeek 登录，会消耗模型额度。原始输出只保存在本地 `output/single-description-audit/`，不提交会话全文、凭据或运行状态。只提交本记录、测试驱动、回归和产品修复。
