# 周琳智能座舱 HMI 作品集

面向智能座舱 HMI、Automotive UX 与 AI 体验设计岗位的静态作品集，提供中英文和明暗主题。线上地址为 https://lilianportfolio.xyz/ 。履历以 2026 年 10 月的上海求职版 V4 简历为依据。

## 内容维护

- `index.html`：原版居中封面、About/CV、项目展示、画廊和联系入口。
- `script.js`：首页中英文文案、项目渲染、菜单与手动图库交互。
- `project-data.js`：原有项目的基础资料。
- `ea01u-data.js`：EA01U 中英文内容与公开展示媒体。
- `career-projects.js`：HMI 求职方向的内容补充、极光心境更新、生成式 HMI 专题和四个精选案例。
- `project-detail.js`：项目详情、职责与阶段摘要、章节目录、媒体与状态矩阵。
- `experience-detail.js`：德赛西威、ICERED 和蔚来的中英文经历。
- `styles.css`：原有封面、视觉与文字交互基础；`portfolio.css`：首页开放式排版与响应式布局；`career.css`：案例阅读样式。
- `ambient.css` / `ambient.js`：共享青绿、雾蓝、淡紫与柔粉配色，保留原色团、呼吸与轻微形变；光晕内部色斑按运动方向错位，停留后自然回拢。触屏和减少动画模式关闭鼠标效果。
- `click-feedback.css` / `click-feedback.js`：完成点击后触发渐变细涟漪，拖动与选文不触发；最多四组并发，动画后回收。
- `header-behavior.css` / `header-behavior.js`：共享顶部菜单显隐；下滑收起、上滑出现，展开菜单与键盘操作保持可见。
- `assets/resume/`：检查后的两页 PDF 简历及原版 DOCX。

新增数据脚本应在基础项目资料之后、页面脚本之前加载。首页和详情默认中文，保留用户已选择的英文偏好；`?lang=zh` 或 `?lang=en` 可指定分享链接语言。

## 展示口径

首页按封面 → About/CV → 作品展示排列。两处向下浏览链接共享锚点与焦点行为，保留自然滚动、直接访问和菜单跳转。About 以 HMI 交互设计为主、AI 产品体验为辅，左侧介绍能力与方法，右侧排列工作经历、教育与语言；公司信息仅放在履历中。排版参考 [Qingyun Liu 的 About](https://www.qingyunliu.com/about) 的姓名、专业方向与分栏 CV 层次，沿用本站原有字体、留白和光晕。

已移除首页“工作与研究”区及其重复索引，既有案例详情仍保留。EA01U 与 Aurora Mood 使用真实项目图展示，Gallery 展示其他八个项目，提供前后按钮、拖拽、水平滚动和键盘操作，不自动播放。概念方案、进行中的研究、交付范围及后续验证规划均在案例中标明。

生成式 HMI 详情中的 SVG 表达应用方案，未呈现已完成的模型评测结果。已存档的 ICERED 和蔚来 SVG 是流程示意，首页不使用这些示意图作为项目封面。

EA01U 保留 52 个原始公开媒体、六段视频的封面及简烨的展示参考链接；官方 YouTube 视频标注德赛西威来源。`assets/portfolio/ea01u/source-manifest.json` 记录原始媒体地址和 SHA-256。公开资料不包含未公开的 Figma、Sketch 或 AE 工程。

## 本地预览与发布

无需安装前端依赖。在仓库根目录启动静态文件服务，即可打开 `index.html` 预览。发布沿用现有 GitHub Pages 仓库与 `main` 分支，保留 `CNAME` 和 `.nojekyll`，以维持现有域名。

## 动效参考

配色与色斑组织参考 [Paper Mesh Gradient](https://shaders.paper.design/mesh-gradient)，渐变细线与波动参考 [Marlène Bruhat 的 SVG Emitter](https://tympanus.net/codrops/2022/08/24/custom-svg-cursors-with-an-interactive-emitter-effect/)，点击节奏参考 [Codrops Subtle Click Feedback](https://tympanus.net/codrops/2015/02/11/subtle-click-feedback-effects/)。按本站背景与字体重新设计，使用本地原生 CSS、SVG 和 JavaScript 实现。
