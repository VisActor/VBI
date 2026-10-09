---
name: vbi
description: 使用 VBI 的 DSL 和 Builder 构建图表、仪表盘与洞察。适用于 VBI 数据接入、分析配置、渲染集成及配置保存与恢复。
---

# VBI Dashboard 构建指南

## 核心方法论：基于 Dashboard 模板构建

模板仅作为实现与视觉参考。新建 Dashboard 先根据数据结构、分析任务和业务语境决定布局与主题色，再从下方索引选取适用片段；可重排、组合或重新设计，不默认复制某个模板，也不限于已有布局和配色。布局与颜色独立选择，例如趋势主导布局可以使用暖色，指标先行布局也可以使用蓝色；变化应有业务与阅读依据，不为多样性随机换色。已有宿主或用户指定风格时优先适配其要求。下方 [24 份模板索引](#24-份模板索引)列出简介与设计动机；[基础模板](templates/template-business-overview.html)用于查阅最小接入机制，[完整轻量示例](templates/example.html)用于查阅扩展实现；单图和局部修改只执行相关步骤。

构建前必须查看所选模板的 HTML 和对应截图，确认主辅比例、信息密度、字号与交互；不能只读索引或复制接入片段就开始交付。模板是产物的质量基线：业务适配与设计变化不能降低可读性、视觉完成度或必要交互。保留真实图表、适合数据的平滑趋势、`updateSpec()` 与指标文本动画、≤2° 小卡倾斜、默认展开明细和卡内联动；减少动态效果模式立即展示最终状态。详细约束统一遵循[轻量看板基线](references/best-practices/layout.md#轻量看板的功能与视觉基线)，不能因精简删去必要能力。

相近风格也要有设计差异：布局、背景与主题色分别按任务选择，避免反复输出同一骨架和固定渐变，仅替换标题或主色。遵循[差异设计](references/best-practices/design.md#相近风格中的差异设计)，在统一阅读面、密度与交互品质的基础上变化。指标字号统一按[数值字号规范](references/best-practices/metric-card.md#数值字号规范)分级：默认桌面主指标 / 辅助指标 / 卡内衍生指标为 **60 / 28 / 22px**，窄屏为 **40 / 26 / 20px**；同层级共用 token，不按卡宽、数字长度或筛选状态临时缩放。已有品牌规范可统一替换整套字号。

按以下 4 个阶段推进，已有结论直接沿用，局部修改只处理相关内容。按资料索引和阶段内链接查阅当前任务需要的内容。

## 资料索引

| 类别       | 资料                                                               | 用途与查阅时机                                                       |
| ---------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| 模板与示例 | [24 份模板索引](#24-份模板索引) · [可视总览](templates/index.html) | 查阅全部模板简介、布局和主题色动机；所有 HTML 与截图平铺在同一目录。 |
| 模板与示例 | [完整轻量 Dashboard](templates/example.html)                       | 扩展布局、配色与交互时查阅。                                         |
| 最佳实践   | [设计与布局](references/best-practices/layout.md)                  | 适配模板骨架、控制密度、配置布局与卡片动效。                         |
| 最佳实践   | [配色与背景](references/best-practices/design.md)                  | 确定页面与图表的颜色层级。                                           |
| 最佳实践   | [指标卡](references/best-practices/metric-card.md)                 | 实现辅助图形、指标动画与卡内联动。                                   |
| 最佳实践   | [趋势图](references/best-practices/trend.md)                       | 实现平滑趋势、渐变面积与图内交互。                                   |
| 最佳实践   | [Filter 筛选器](references/best-practices/filter.md)               | 设计平铺筛选、维护 Builder 条件并联动更新。                          |
| 最佳实践   | [核心发现与指标洞察](references/best-practices/insight.md)         | 选择衍生指标，组织计算口径、结论与证据。                             |
| 最佳实践   | [截图对照验收](references/best-practices/visual-acceptance.md)     | 验证桌面、窄屏的视觉效果与必要交互。                                 |
| 接入参考   | [核心能力](references/usage/capabilities.md)                       | 确认 DSL、Builder、Connector 与 UI 的职责。                          |
| 接入参考   | [实践技巧](references/usage/tips.md)                               | 配置查询、字段映射、资源关联与保存恢复。                             |
| 接入参考   | [HTML 接入](references/usage/how-use-vbi-in-html.md)               | 使用 HTML / ESM 时查阅加载、渲染与模板关键片段。                     |
| API 文档   | [VBI API 索引](references/api/vbi/index.md)                        | 核对实例、Chart、Dashboard、Insight Builder 的接口与类型。           |
| API 文档   | [VSeed API 索引](references/api/vseed/index.md)                    | 核对 Spec 构建、图表类型、主题、注册与数据工具。                     |

## 24 份模板索引

模板 HTML 为直接维护的参考产物，按需阅读、修改或组合片段。全部模板位于 `templates/`，统一使用 `template-分析主题.html`；对应桌面截图为同名 `.png`，手机截图为同名 `-mobile.png`。下表展示设计的判断过程，不是行业与布局、颜色的固定映射。先按阅读问题选择主次和结构，再独立选择主题色，可组合不同模板的片段；不要默认复制第一份或仅替换数据。

<!-- template-catalog:start -->

| 模板                                                                              | 简介与分析重点                                                         | 布局动机                                                                      | 主题色动机                                                                    |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [template-life-expectancy](templates/template-life-expectancy.html)               | 全球寿命观察；2,938 条寿命记录；真实年度趋势、国家覆盖与教育指标。     | 左侧大趋势承载长期变化，右侧小卡补充变化幅度、覆盖和教育，保持单一视觉中心。  | `#9FBFDF`；浅蓝与中性阅读面营造平静氛围，让长期曲线和数字优先。               |
| [template-heart-failure](templates/template-heart-failure.html)                   | 心衰样本观察；299 条临床样本；事件占比、射血分数、肌酐与年龄组比较。   | 顶部三项指标先概览，下方宽幅条形图再看年龄组；随访天数不伪装成日历趋势。      | `#B4A6D5`；低饱和紫区分指标概览风格，事件状态由标签表达，避免主题色暗示风险。 |
| [template-meal-workout](templates/template-meal-workout.html)                     | 餐食与运动画像；8,000 条餐食记录；热量、估算运动时长、营养与样本构成。 | 热量主区、运动与营养双列、样本构成收尾，分段解释不同量纲，避免 KPI 挤在一排。 | `#E4B18E`；暖橙呼应餐食与日常生活，统一各段强调色，减少多指标页面的颜色噪声。 |
| [template-business-overview](templates/template-business-overview.html)           | 经营概览；轻量销售示例；销售额、增长、订单、利润与衍生效率指标。       | 左主趋势与右侧三张辅助卡突出销售规模，标题右侧合并筛选，明细承接核对。        | `#A8C7E8`；浅蓝统一趋势与卡片，白色阅读面降低密度，正负变化另用语义色表达。   |
| [template-education-performance](templates/template-education-performance.html)   | 学习成果观察；葡萄牙两所中学 · 葡语课程                                | 大幅年龄组比较居左，成绩、出勤与进步互相补充。                                | `#7694D4`；蓝紫表达安静的学习氛围，以中性阅读面承载成绩。                     |
| [template-education-attendance](templates/template-education-attendance.html)     | 出勤与学习节奏；样本记录 · 学习投入与成绩                              | 先读三个概览结果，再进入全宽学习时长比较，避免用因果语言解释出勤。            | `#B37C69`；陶土色配纸白强调教育观察的温度，与另一份冷色模板区分。             |
| [template-retail-sales](templates/template-retail-sales.html)                     | 零售月度脉搏；合成交易样本 · 金额与购买结构                            | 全宽月度金额趋势先回答规模变化，随后一排结构与效率指标。                      | `#CE7864`；柔和珊瑚色呼应消费场景，低饱和避免促销色淹没数据。                 |
| [template-retail-basket](templates/template-retail-basket.html)                   | 品类与客单结构；合成零售样本 · 商品组合                                | 右侧大品类比较与左侧结构卡形成镜像阅读，先看客单再看件数。                    | `#558B98`；石油蓝用于冷静的商品结构分析，避免与金额趋势页共用暖色。           |
| [template-healthcare-charges](templates/template-healthcare-charges.html)         | 医疗费用样本；保险费用数据 · 描述性观察                                | 费用比较占据左侧主区，两个相关特征居右，样本结构横向收尾。                    | `#8294AC`；灰蓝色稳定费用数据的阅读感，不以主题色暗示临床风险。               |
| [template-healthcare-regions](templates/template-healthcare-regions.html)         | 地区费用画像；费用与家庭结构 · 样本概览                                | 顶部两张概览卡后接左侧地区费用主图与右侧结构卡，强调区域描述。                | `#B77D91`；灰玫瑰与中性纸白让家庭结构观察更柔和，分类含义仍由文本表达。       |
| [template-banking-outreach](templates/template-banking-outreach.html)             | 银行触达观察；营销样本 · 联系渠道与账户特征                            | 渠道主图与窄侧栏构成主辅层级，底部全宽卡补充触达强度。                        | `#767CB8`；靛蓝延续金融场景的克制感，负余额由坐标真实呈现。                   |
| [template-banking-response](templates/template-banking-response.html)             | 营销响应结构；教育分组 · 样本接受与联系强度                            | 左侧两张细卡、右侧宽比较图，再以联系强度收尾，避免多组指标等权排列。          | `#B49759`；柔金色用于响应结构的重点强调，以白色卡片控制金融配色重量。         |
| [template-housing-price](templates/template-housing-price.html)                   | 住宅价格与空间；房源样本 · 卧室与配置                                  | 全宽卧室价格比较后，以宽结构卡和两张小卡说明房源配置。                        | `#BB8C70`；沙陶色呼应空间与居住，金额采用原始单位而不编造币种。               |
| [template-housing-efficiency](templates/template-housing-efficiency.html)         | 装修与空间效率；房源样本 · 总量口径的单位面积价格                      | 宽空调结构卡在前，随后左主图与右辅卡；突出总价与面积的不同口径。              | `#9B6F80`；莓灰色与纸面边线让房源比较更像市场观察报告，与沙色空间页区分。     |
| [template-energy-renewables](templates/template-energy-renewables.html)           | 可再生能源长镜头；美国 EIA 数据 · 1973—2024                            | 右侧长年度曲线配左侧来源概览，底部宽卡补充风能报告值。                        | `#C19A50`；琥珀色呼应能源，轻量纸面使长期曲线成为主视觉。                     |
| [template-energy-wind](templates/template-energy-wind.html)                       | 风能的部门画像；报告覆盖与消费结构 · 美国部门样本                      | 半宽部门比较和右侧上下分组卡形成紧凑双区，强调部门结构而非年度规模。          | `#5278A5`；深湖蓝强调风能与电力的清晰感，用中性背景区别长期琥珀曲线。         |
| [template-agriculture-climate](templates/template-agriculture-climate.html)       | 作物环境样本；降雨与气候 · 标签数据观察                                | 半宽气候主图置右，左侧用结构与温湿度解释样本，避免堆放 22 个作物 KPI。        | `#919565`；灰橄榄色呼应田野环境，保持原始分类与区间标签可读。                 |
| [template-agriculture-nutrients](templates/template-agriculture-nutrients.html)   | 土壤养分分组；氮磷钾与 pH · 观察样本                                   | 宽养分主图后接中间宽指标卡与两侧结构卡，按土壤问题组织阅读。                  | `#B17851`；赭色呼应土壤，并与气候页的橄榄色区分，避免高饱和农作物拼色。       |
| [template-hospitality-bookings](templates/template-hospitality-bookings.html)     | 酒店预订节奏；2017—2018 到店月份 · 预订记录                            | 顶部指标分成窄宽窄节奏，再用全宽月份曲线承接预订规模。                        | `#5E9DA4`；海蓝色呼应旅行体验，取消状态通过明确文字表达而不靠主题色判好坏。   |
| [template-hospitality-guests](templates/template-hospitality-guests.html)         | 旅客与入住计划；渠道结构 · 人次、夜数与复住记录                        | 左主图与右侧两张较高计划卡承接不同量纲，底部以取消记录补足质量。              | `#AD956E`；砂金色配报告式边线表达住宿计划，与月份页的海蓝轻量卡片区分。       |
| [template-manufacturing-failures](templates/template-manufacturing-failures.html) | 设备运行样本；合成预测维护数据 · 故障标签                              | 右侧故障数量比较与左侧运行特征卡形成主辅，底部保留温差信息。                  | `#7891A1`；钢灰蓝匹配设备运行语境，不把装饰色当故障告警色。                   |
| [template-manufacturing-wear](templates/template-manufacturing-wear.html)         | 磨损与运行工况；合成记录 · 速度、扭矩与故障标签                        | 全宽故障结构卡后接七列工况主图与五列运行特征，突出量纲差异。                  | `#C0884F`；铜橙呼应机械与工具，白色阅读面避免工业大屏的视觉重量。             |
| [template-logistics-fulfillment](templates/template-logistics-fulfillment.html)   | 仓库履约观察；发运样本 · 准时状态与服务                                | 较窄主图承载五个仓库分组，右侧三张大小有别的服务指标补充解释。                | `#588FBD`；晴蓝呼应物流流转，强调状态文字与样本占比的可读性。                 |
| [template-logistics-service](templates/template-logistics-service.html)           | 运输与服务画像；重量、折扣与商品成本 · 发运记录                        | 三个概览卡在前，后接七列运输比较与五列服务卡，使重量成为主分析。              | `#A778A3`；灰兰紫区别运营规模页，给服务与商品属性建立温和的分析氛围。         |

<!-- template-catalog:end -->

## Step1：确定指标、布局与主题色

- 明确核心分析问题、数据来源、交付环境及验收范围；阅读[核心能力](references/usage/capabilities.md)。按[实践技巧](references/usage/tips.md)确认字段、粒度、聚合、去重、单位与比较周期，用已知数据核对口径；按[洞察最佳实践](references/best-practices/insight.md)选择核心与衍生指标，明确公式和分母有效性，从同一范围的汇总结果计算。
- 按阅读任务选择布局：一个主问题与真实时间变化适合主辅布局，多个关键结果需要先概览时适合指标行，多个不同量纲或解释层次适合分段组织。结合基准模板、[模板总览](templates/index.html)与[寿命截图](templates/template-life-expectancy.png)、[心衰截图](templates/template-heart-failure.png)、[餐食截图](templates/template-meal-workout.png)判断主次、面积与阅读顺序；不因模板有趋势图就为无日期数据制造时间轴。行业名称不直接决定模板，先比较同一行业两页为什么采用不同分析与布局，再匹配当前任务。
- 按用户要求、品牌与宿主风格优先确定主题色，再结合业务语境、阅读氛围和对比度调整。主题色用于统一页面与图表的视觉强调；类别区分、正负变化和风险状态另按数据语义编码，不让装饰色改变含义。说明本次布局与配色的选择理由，以及参考了模板的哪些部分。

产出：指标口径与预期数值、已查看的模板与截图、布局 / 背景 / 主题色的选择理由及相对参照的设计差异。

## Step2：适配业务与视觉

- 将分析问题映射到核心发现、主分析区、辅助指标卡和明细。按[布局](references/best-practices/layout.md)、[指标卡](references/best-practices/metric-card.md)与[趋势图](references/best-practices/trend.md)最佳实践突出主次、合并重复信息；图表适配实际数据。核心发现用一句结论连接核心与衍生指标，并提供范围、基准和证据。
- 以参考模板的主辅比例和留白为起点，按当前内容量与阅读顺序调整；按[配色最佳实践](references/best-practices/design.md)落实布局、背景与主题的差异，统一页面与图表。先定义主、辅、衍生指标及单位的字号 token，全页同层级一致；长数值优先调整单位表达与空间，不逐卡缩字。布局与配色切换控件仅在用户要求时添加。
- 按[Filter 最佳实践](references/best-practices/filter.md)明确筛选与局部交互的作用范围；全局筛选集中在标题最右侧，优先一行平铺，省略重复标签并保留无障碍名称，避免未经设计的原生 `select` / `input`。确定桌面与窄屏布局。

产出：业务模块、页面骨架与联动范围。

## Step3：接入数据与交互

- 替换模板的数据接入与查询，确保 Connector 执行筛选、分组和聚合；沿 Chart Builder → `buildVSeed()` → VSeed Builder → VChart / VTable 渲染，HTML 指标复用查询结果并保留字段 ID。使用 HTML 时阅读[接入指南](references/usage/how-use-vbi-in-html.md)，按需查阅 [VBI API](references/api/vbi/index.md) 与 [VSeed API](references/api/vseed/index.md)。
- 通过 Builder 维护自身筛选条件，保留其他条件；查询后复用实例调用 `updateSpec()`，同步指标动画与区间洞察。卡内联动复用缓存，防止旧结果覆盖；处理加载、空数据、错误、尺寸变化与资源释放。
- Dashboard、Chart 与 Insight 使用同一 VBI 实例及资源 ID，组件提供 `layouts.lg`；可保存状态归所属 DSL，由 Builder 操作，UI 管理渲染与临时状态。需要恢复时保存 Dashboard 与引用资源，在新实例先注册资源再恢复，并明确外部数据和衍生公式的恢复方式。

产出：数据与交互完整、按需支持保存恢复的页面。

## Step4：验收与交付

- 核对汇总、筛选、比较及衍生指标，覆盖相关的空值、零分母和负值；在浏览器实际检查模板基线、筛选动画、卡内联动、连续操作、减少动态效果模式与控制台。承诺保存的配置须做 JSON 往返及新实例恢复，领域能力须可通过 DSL 与 Builder 独立使用。
- 按[截图对照验收](references/best-practices/visual-acceptance.md)，在图表就绪后与所选模板做同视口桌面、窄屏对照，检查质量是否退步、设计差异是否清楚，以及同层级指标字号在汇总、筛选和局部查看时是否一致。保留有依据的差异；明显弱于模板时先修正再截图，不能以“已套用模板”或“能运行”替代验收。
- 交付文件、运行入口、必要数据与接入说明，附最终截图、验证结果及限制；明确未验证范围，与 Step1 的交付范围一致。

产出：可运行、可检查的 Dashboard 与验收证据。
