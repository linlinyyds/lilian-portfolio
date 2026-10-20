# Lin Zhou UX 作品集网站

## EA01U 项目（2026-10-20）

- 首页项目列表和画廊均已接入 `project.html?slug=ea01u`。
- 中英文内容集中在 `ea01u-data.js`，在 `project-data.js` 后加载；可在这里编辑项目职责、简介及各区块说明。
- `assets/portfolio/ea01u/` 包含参考项目公开的 52 个媒体文件，以及为 6 段视频提取的封面。视频按需播放，图片支持查看原图，VPA 的 5×5 状态表可横向滚动。
- `assets/portfolio/ea01u/source-manifest.json` 记录原始媒体地址、大小及 SHA-256。项目页面保留简烨的展示参考链接，YouTube 影片标注德赛西威来源。
- 获取范围为原站公开发布的媒体；没有获取未公开的 Figma、Sketch、AE 工程或完整开发仓库。

这是一个可部署到 GitHub Pages 的完整静态交互式作品集网站。网站内容基于 `作品集.pptx` 整理，定位为 UX / Interaction / Service Experience 设计师作品集。

## 已包含的交互

- 项目类型筛选：All / HMI / Service / App UX / Immersive
- 项目详情弹层：点击 `Open case` 或首屏 `Featured Case` 打开
- 设计流程切换：Discover / Define / Design / Validate
- 滚动进入动画
- 鼠标跟随光效
- 响应式导航与移动端布局

## 文件结构

```text
index.html          页面结构
styles.css          视觉样式与响应式布局
script.js           项目数据、筛选、弹层、流程切换等交互
assets/portfolio/   从作品集 PPTX 提取的项目图片
```

## 后续修改项目内容

大部分作品集内容都集中在 `script.js` 的 `cases` 数组里。修改项目标题、类型、标签、简介、详情、图片路径，优先改这里。

每个项目字段含义：

```js
{
  id: "aurora",
  title: "项目名称",
  type: "项目类型",
  category: "hmi",
  image: "assets/portfolio/xxx.png",
  year: "年份或阶段",
  role: "你的职责",
  tools: "工具与方法",
  summary: "卡片摘要",
  tags: ["标签"],
  challenge: "问题背景",
  decisions: ["关键设计决策"],
  outcome: "结果或产出"
}
```

## 本地预览

直接用浏览器打开 `index.html` 即可。这个网站不需要安装依赖。

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库：`linlinyyds.github.io`
2. 上传本项目所有文件到仓库根目录
3. 进入仓库 `Settings` -> `Pages`
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main` 和 `/root`
6. 部署完成后网站地址为：

```text
https://linlinyyds.github.io
```
