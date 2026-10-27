# 周琳个人作品集

面向 UX 与交互设计的通用个人作品集，涵盖数字产品、智能座舱、AI 体验与服务设计，提供中英文和明暗主题。线上地址为 https://lilianportfolio.xyz/ 。工作与教育信息以 2026 年 10 月的简历为依据。

## 内容维护

- `index.html`：原版居中封面、关于我（介绍、经历与能力）、作品目录和联系入口。
- `work.html`：完整作品图库，沿用现有图片展示及项目详情入口。
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

首页按封面 → 关于我（About）→ 作品目录排列，完整作品展示在 `work.html`。照片介绍与“经历与能力”两屏统一归属关于我，保留 `#about`、`#cv` 锚点及现有翻屏导航。简介面向通用 UX 与交互设计，数字产品、智能座舱、AI 体验与服务设计作为实践领域；能力行说明具体方法，经历摘要交代实际工作，减少重复罗列。公司信息仅放在履历中。导航、分区标题及经历详情返回入口统一命名，简历保留为下载入口。排版参考 [Qingyun Liu 的 About](https://www.qingyunliu.com/about) 的姓名、专业方向与分栏履历层次，沿用本站照片、字体、留白和光晕。

履历优先展示教育背景与工作经历。工作行默认只列公司、岗位与时间，点击右侧加号在同一页展开两条职责说明，每次展开一段；支持键盘和触屏操作。收起时压缩标题、列表和行间距，常规桌面尺寸下可在一屏查看主要履历。

已移除首页“工作与研究”区及其重复索引，既有案例详情仍保留。首页目录与独立作品图库连接项目详情，沿用项目图和完整预览。概念方案、进行中的研究、交付范围及后续验证规划均在案例中标明。

生成式 HMI 详情中的 SVG 表达应用方案，未呈现已完成的模型评测结果。已存档的 ICERED 和蔚来 SVG 是流程示意，首页不使用这些示意图作为项目封面。

EA01U 保留 52 个原始公开媒体、六段视频的封面及简烨的展示参考链接；官方 YouTube 视频标注德赛西威来源。`assets/portfolio/ea01u/source-manifest.json` 记录原始媒体地址和 SHA-256。公开资料不包含未公开的 Figma、Sketch 或 AE 工程。

## 本地预览与发布

无需安装前端依赖。在仓库根目录启动静态文件服务，即可打开 `index.html` 预览。发布沿用现有 GitHub Pages 仓库与 `main` 分支，保留 `CNAME` 和 `.nojekyll`，以维持现有域名。

## 动效参考

配色与色斑组织参考 [Paper Mesh Gradient](https://shaders.paper.design/mesh-gradient)，渐变细线与波动参考 [Marlène Bruhat 的 SVG Emitter](https://tympanus.net/codrops/2022/08/24/custom-svg-cursors-with-an-interactive-emitter-effect/)，点击节奏参考 [Codrops Subtle Click Feedback](https://tympanus.net/codrops/2015/02/11/subtle-click-feedback-effects/)。按本站背景与字体重新设计，使用本地原生 CSS、SVG 和 JavaScript 实现。
