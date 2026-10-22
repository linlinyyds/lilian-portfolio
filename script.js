const projects = window.LILIAN_PROJECTS || [];
const projectTranslations = window.LILIAN_PROJECT_TRANSLATIONS || {};

const projectList = document.querySelector("#projectList");
const projectGallery = document.querySelector("#projectGallery");
const drawer = document.querySelector("#projectDrawer");
const drawerContent = document.querySelector("#drawerContent");
const closeDrawer = document.querySelector(".drawer-close");
const themeToggle = document.querySelector(".theme-toggle");
const languageToggle = document.querySelector(".language-toggle");
const catMenu = document.querySelector(".cat-menu");
const quickNav = document.querySelector("#quickNav");
const root = document.documentElement;
const urlParams = new URLSearchParams(window.location.search);
const effectsEnabled = urlParams.get("fx") !== "off";
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const lightState = {
  x: window.innerWidth * 0.52,
  y: window.innerHeight * 0.38,
  targetX: window.innerWidth * 0.52,
  targetY: window.innerHeight * 0.38
};
let lightShapeTimer;
const pluckLetters = [];
let pluckFrame = 0;
let pluckPointer = null;
let rippleCount = 0;
let rippleFadeTimer;
let currentLanguage = ["zh", "en"].includes(urlParams.get("lang")) ? urlParams.get("lang") : (window.localStorage.getItem("lilian-language") === "en" ? "en" : "zh");
let galleryAutoFrame = 0;
let galleryAutoPosition = 0;
let galleryAutoPaused = false;
let galleryResumeTimer = 0;
let galleryLoopWidth = 0;
let galleryHoverPaused = false;
let galleryTimedPaused = false;
let galleryDragging = false;
let galleryPointerActive = false;
let galleryDragStartX = 0;
let galleryDragStartPosition = 0;
let galleryDragMoved = false;
let gallerySuppressClick = false;

const staticTranslations = {
  "en": {
    "nav.home": "Home",
    "nav.project": "Selected Work",
    "nav.capabilities": "Practice",
    "nav.about": "Experience",
    "nav.gallery": "Explorations",
    "nav.contact": "Contact",
    "hero.heading1": "Automotive UX",
    "hero.heading2": "& HMI Design",
    "hero.description": "From user scenarios and interaction rules to prototype validation — designing clear, understandable cockpit and AI experiences.",
    "hero.viewProjects": "Explore selected work",
    "hero.downloadResume": "Résumé PDF · 中文",
    "hero.current": "Desay SV · Innovation Experience Design Engineer",
    "hero.education": "Royal College of Art · MA Information Experience Design",
    "hero.location": "Seeking opportunities in Shanghai",
    "hero.previewAria": "Explore the EA01U project",
    "hero.previewAlt": "EA01U AI cockpit Launcher design",
    "hero.previewText": "AI cockpit · HMI",
    "hero.previewNote": "Scenarios · Information hierarchy · Conversation states · Feedback",
    "project.title": "Selected work",
    "project.intro": "Cockpit interaction at the center, connected with AI products, prototyping and automotive services.",
    "project.archive": "Browse additional projects",
    "project.diagram": "Interaction flow illustration",
    "project.role": "My contribution",
    "research.status": "R&D focus · In progress",
    "research.title": "Generative HMI design research",
    "research.description": "Planning an application workflow that connects style rules, component templates and interface generation, with a focus on consistency, local edits and quality evaluation.",
    "research.link": "Explore the approach and research scope",
    "research.imageAlt": "Illustration of the proposed generative HMI workflow",
    "capabilities.title": "From scenarios to delivery",
    "capabilities.intro": "Working across interaction design, AI-assisted prototyping and product collaboration.",
    "capabilities.hmiTitle": "HMI interaction & delivery",
    "capabilities.hmiText": "User tasks, information architecture, interface states and exceptions — through UE documentation, UI adaptation, reviews and version delivery.",
    "capabilities.hmiLink": "Experience at Desay SV ↗",
    "capabilities.aiTitle": "AI-assisted development",
    "capabilities.aiText": "Using Claude Code, Codex and Cursor to break down tasks, turn designs into frontend drafts and testable implementations, then debug and verify interaction states.",
    "capabilities.aiLink": "Design & validation at ICERED ↗",
    "capabilities.generativeTitle": "Generative HMI planning",
    "capabilities.generativeText": "Leading application and implementation planning across style rules, component templates, multi-page consistency, local editing and quality evaluation.",
    "capabilities.generativeLink": "Explore the R&D focus ↗",
    "capabilities.collaborationTitle": "Product & global collaboration",
    "capabilities.collaborationText": "Requirements, prioritization, version planning and acceptance testing; aligning scope, schedules and delivery risks with overseas market and engineering teams in English.",
    "capabilities.collaborationLink": "Explore product collaboration ↗",
    "about.title": "Experience & about",
    "about.lead": "Art and technology foundations. Automotive and AI product practice.",
    "about.profileLabel": "( Profile )",
    "about.p1": "Hello, I am Lilian Zhou.",
    "about.p2": "I am an automotive HMI interaction designer with an MA in Information Experience Design from the Royal College of Art. At Desay SV, I work on cockpit interaction, AI cockpit interface refinement and application planning for generative HMI.",
    "about.p4": "My work moves from user scenarios, task flows and information architecture to states and exceptions, UE documentation, UI adaptation and delivery validation. Previously, I worked on an AI social product at ICERED and vehicle-inspection service digitalization at NIO.",
    "about.p6": "I focus on driving-information priorities, understandable system feedback and natural interaction between people and intelligent products.",
    "about.workLabel": "( Experience )",
    "about.workDate0": "2026.08—Present",
    "about.work0": "Desay SV | Innovation Experience Design Engineer",
    "about.workRole0": "Cockpit interaction · Technology R&D team · Guangdong",
    "about.workDesc0": "Multi-brand UE delivery, UI adaptation, AI cockpit refinement and generative HMI application planning.",
    "about.workDate1": "2025.10—2026.07",
    "about.work1": "ICERED | AI Product Manager",
    "about.workRole1": "AI social product for overseas users · Shanghai",
    "about.workDesc1": "AI interaction, design-to-frontend implementation, collaboration in English, requirements and version planning.",
    "about.workDate2": "2024.04—2024.08",
    "about.work2": "NIO | Service Design Intern",
    "about.workRole2": "UX & service design · Shanghai",
    "about.workDesc2": "Vehicle-inspection service digitalization, service blueprinting, online flows, states and exceptions.",
    "about.workCta": "Explore the work ↗",
    "about.educationLabel": "( Education )",
    "about.edu1School": "Royal College of Art",
    "about.edu1Degree": "MA Information Experience Design",
    "about.edu2School": "Shanghai University of Engineering Science",
    "about.edu2Degree": "BA Art and Technology",
    "gallery.title": "Further explorations",
    "gallery.intro": "Ongoing explorations in immersive experience, service systems and digital products.",
    "contact.title": "Let’s talk cockpit & AI experiences",
    "contact.description": "Exploring HMI, automotive UX and AI experience design opportunities in Shanghai.",
    "contact.resume": "Download résumé PDF · 中文 ↓",
    "footer.top": "Back to top ↑",
    "meta.title": "Lilian Zhou | Automotive UX & HMI Design",
    "meta.description": "Lilian Zhou — automotive HMI interaction design, generative HMI application planning and AI-assisted prototyping. Royal College of Art graduate with experience at Desay SV, ICERED and NIO."
  },
  "zh": {
    "nav.home": "首页",
    "nav.project": "精选项目",
    "nav.capabilities": "专业能力",
    "nav.about": "经历与关于",
    "nav.gallery": "更多探索",
    "nav.contact": "联系",
    "hero.heading1": "智能座舱",
    "hero.heading2": "HMI 交互设计",
    "hero.description": "从用户场景、交互规则到原型验证，设计清晰、可理解的座舱与 AI 体验。",
    "hero.viewProjects": "查看精选项目",
    "hero.downloadResume": "下载简历 PDF",
    "hero.current": "德赛西威 · 创新体验设计工程师",
    "hero.education": "英国皇家艺术学院 · 信息体验设计硕士",
    "hero.location": "求职意向：上海",
    "hero.previewAria": "查看 EA01U 项目",
    "hero.previewAlt": "EA01U 智能座舱 Launcher 方案",
    "hero.previewText": "AI 智能座舱 · HMI",
    "hero.previewNote": "场景 · 信息层级 · 对话状态 · 交互反馈",
    "project.title": "精选项目",
    "project.intro": "以座舱交互为主线，连接 AI 产品、原型实现与汽车服务体验。",
    "project.archive": "浏览补充项目",
    "project.diagram": "交互流程示意",
    "project.role": "个人职责",
    "research.status": "研发专题 · 进行中",
    "research.title": "生成式 HMI 设计研发",
    "research.description": "探索风格规则、组件模板与界面生成的协同流程，围绕多页一致性、局部修改和质量评价规划实施路径。",
    "research.link": "查看技术方案与研发重点",
    "research.imageAlt": "生成式 HMI 方案流程示意",
    "capabilities.title": "从场景到交付",
    "capabilities.intro": "在交互设计、AI 原型验证与产品协作之间推进工作。",
    "capabilities.hmiTitle": "HMI 交互与交付",
    "capabilities.hmiText": "用户任务、信息架构、页面状态与异常流程，连接 UE 文档、UI 适配、评审走查和版本交付。",
    "capabilities.hmiLink": "德赛西威工作实践 ↗",
    "capabilities.aiTitle": "AI 辅助研发",
    "capabilities.aiText": "使用 Claude Code、Codex、Cursor 拆解任务，将设计转为前端代码草稿和可测试实现，开展调试与状态验证。",
    "capabilities.aiLink": "ICERED 设计与验证 ↗",
    "capabilities.generativeTitle": "生成式 HMI 方案",
    "capabilities.generativeText": "主导应用方案与实施路径设计，梳理风格规则、组件模板、多页一致性、局部修改及质量评估标准。",
    "capabilities.generativeLink": "查看研发专题 ↗",
    "capabilities.collaborationTitle": "产品与国际协作",
    "capabilities.collaborationText": "需求拆解、优先级判断、版本管理与测试验收；与海外市场和技术团队用英文对齐范围、节奏和交付风险。",
    "capabilities.collaborationLink": "查看产品协作实践 ↗",
    "about.title": "经历与关于",
    "about.lead": "艺术科技背景，汽车与 AI 产品实践。",
    "about.profileLabel": "（个人简介）",
    "about.p1": "你好，我是周琳。",
    "about.p2": "我是一名智能座舱 HMI 交互设计师，毕业于英国皇家艺术学院信息体验设计专业。目前在德赛西威参与座舱交互、AI 座舱界面优化与生成式 HMI 研发方案设计。",
    "about.p4": "我的工作从用户场景、任务流程和信息架构出发，延伸到状态与异常设计、UE 文档、界面适配和交付验证。此前在 ICERED 参与海外 AI 社交产品迭代，在蔚来参与车辆年检服务数字化。",
    "about.p6": "我关注驾驶信息的优先级、系统反馈的可理解性，以及人与智能产品之间自然的交流。",
    "about.workLabel": "（工作经历）",
    "about.workDate0": "2026.08—至今",
    "about.work0": "德赛西威｜创新体验设计工程师",
    "about.workRole0": "智能座舱交互 · 技术研发组 · 广东",
    "about.workDesc0": "多品牌 UE 交付、界面适配、AI 座舱优化与生成式 HMI 方案设计。",
    "about.workDate1": "2025.10—2026.07",
    "about.work1": "ICERED｜AI 产品经理",
    "about.workRole1": "海外 AI 社交产品 · 上海",
    "about.workDesc1": "AI 交互、设计转前端、英文跨团队协作及需求与版本管理。",
    "about.workDate2": "2024.04—2024.08",
    "about.work2": "蔚来汽车｜服务设计实习生",
    "about.workRole2": "UX 与服务设计 · 上海",
    "about.workDesc2": "车辆年检服务数字化、服务蓝图与线上流程、状态及异常设计。",
    "about.workCta": "查看工作实践 ↗",
    "about.educationLabel": "（教育背景）",
    "about.edu1School": "英国皇家艺术学院",
    "about.edu1Degree": "信息体验设计硕士",
    "about.edu2School": "上海工程技术大学",
    "about.edu2Degree": "艺术与科技学士",
    "gallery.title": "更多探索",
    "gallery.intro": "沉浸式体验、服务系统与数字产品中的持续探索。",
    "contact.title": "聊聊座舱与 AI 体验",
    "contact.description": "关注上海的智能座舱 HMI、汽车 UX 与 AI 体验设计机会。",
    "contact.resume": "下载完整简历 PDF ↓",
    "footer.top": "返回顶部 ↑",
    "meta.title": "周琳 Lilian Zhou｜智能座舱 HMI 交互设计",
    "meta.description": "周琳 Lilian Zhou｜智能座舱 HMI 交互设计、生成式 HMI 方案与 AI 辅助研发。英国皇家艺术学院硕士，德赛西威、ICERED 与蔚来项目经验。"
  }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.dataset.state = theme;
  }
  window.localStorage.setItem("lilian-theme", theme);
}

function t(key) {
  return staticTranslations[currentLanguage]?.[key] || staticTranslations.en[key] || "";
}

function getProjectCopy(project) {
  const translation = (currentLanguage === "zh" && project.zh) || projectTranslations[currentLanguage]?.[project.slug] || {};
  return {
    ...project,
    ...translation,
    tags: translation.tags || project.tags
  };
}

function updateLanguageToggle() {
  if (!languageToggle) return;
  languageToggle.setAttribute("aria-pressed", currentLanguage === "zh" ? "true" : "false");
  languageToggle.setAttribute("aria-label", currentLanguage === "zh" ? "Switch to English" : "切换到中文");
  languageToggle.dataset.state = currentLanguage;
  const label = languageToggle.querySelector(".lang-current");
  if (label) label.textContent = currentLanguage === "zh" ? "中" : "EN";
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.body.dataset.lang = currentLanguage;
  window.localStorage.setItem("lilian-language", currentLanguage);
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const text = t(element.dataset.i18n);
    if (!text) return;

    if (element.hasAttribute("data-pluck-text")) {
      element.dataset.pluckSource = text;
    } else {
      element.textContent = text;
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const text = t(element.dataset.i18nAria);
    if (text) element.setAttribute("aria-label", text);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const text = t(element.dataset.i18nAlt);
    if (text) element.alt = text;
  });
  updateLanguageToggle();
}

function applyLanguage() {
  applyStaticTranslations();
  renderFeaturedCases();
  renderProjects();
  renderProjectGallery();
  rebuildPluckTextTargets();
  updateGalleryControls();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
}

function renderFeaturedCases() {
  const container = document.querySelector("#featuredCases");
  if (!container) return;
  container.innerHTML = (window.LILIAN_FEATURED_CASES || []).map((item, index) => {
    const copy = currentLanguage === "zh" ? { ...item, ...item.zh } : item;
    const isDiagram = ["icered", "nio"].includes(item.slug);
    return `<a class="featured-case" href="${escapeHTML(item.href)}" aria-label="${escapeHTML(copy.title)}">
      <div class="featured-case-image"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(copy.title)}" loading="lazy" decoding="async"><span class="featured-case-number">0${index + 1}</span>${isDiagram ? `<span class="featured-case-diagram">${t("project.diagram")}</span>` : ""}</div>
      <div class="featured-case-copy"><p class="featured-case-kind">${escapeHTML(copy.kind)}</p><div class="featured-case-title"><h3>${escapeHTML(copy.title)}</h3><span aria-hidden="true">↗</span></div><p class="featured-case-summary">${escapeHTML(copy.summary)}</p><div class="featured-case-meta"><p><span>${t("project.role")}</span>${escapeHTML(copy.role)}</p><span class="career-status">${escapeHTML(copy.stage)}</span></div></div>
    </a>`;
  }).join("");
}

function renderProjects() {
  if (!projectList) return;

  const featuredSlugs = (window.LILIAN_FEATURED_CASES || []).map((item) => item.slug);
  projectList.innerHTML = projects.filter((project) => !featuredSlugs.includes(project.slug) && project.slug !== "generative-hmi")
    .map((project, index) => {
      const copy = getProjectCopy(project);

      return `
      <a class="project-row" href="project.html?slug=${project.slug}" data-project="${index}" aria-label="${copy.title}">
        <span>
          <span class="project-name">${copy.title}</span>
          <span class="project-meta">${copy.meta}</span>
        </span>
        <span class="project-arrow" aria-hidden="true">→</span>
      </a>
    `;
    })
    .join("");
}

function renderProjectGallery() {
  if (!projectGallery) return;

  const featured = window.LILIAN_FEATURED_CASES || [];
  const featuredSlugs = featured.map((item) => item.slug);
  const orderedProjects = [
    ...featured.map((item) => ({ ...item, meta: item.kind, galleryImage: item.image, zh: item.zh ? { ...item.zh, meta: item.zh.kind } : undefined })),
    ...projects.filter((project) => !featuredSlugs.includes(project.slug))
  ];
  const galleryVersion = "thermal-liquid-3";

  const createCards = (isDuplicate = false) => orderedProjects
    .map((project) => {
      const copy = getProjectCopy(project);
      const imageSource = project.galleryImage || project.image;
      const versionedSource = `${imageSource}${imageSource.includes("?") ? "&" : "?"}v=${galleryVersion}`;
      const label = currentLanguage === "zh" ? `打开 ${copy.title}` : `Open ${copy.title}`;
      const duplicateAttrs = isDuplicate ? ` aria-hidden="true" tabindex="-1"` : "";

      return `
      <a class="gallery-card gallery-${project.slug}" href="${project.href || `project.html?slug=${project.slug}`}" aria-label="${label}" data-slug="${project.slug}"${duplicateAttrs}>
        <span class="gallery-thumb">
          <img src="${versionedSource}" alt="${copy.title} project preview" loading="lazy" decoding="async">
        </span>
        <span class="gallery-caption">
          <span class="gallery-title">${copy.title}</span>
          <span class="gallery-type">${copy.meta}</span>
        </span>
      </a>
    `;
    })
    .join("");

  const cards = createCards();
  const duplicateCards = createCards(true);

  projectGallery.innerHTML = `
    <div class="gallery-track">
      <div class="gallery-sequence" data-gallery-sequence>${cards}</div>
      <div class="gallery-sequence gallery-sequence-clone" aria-hidden="true">${duplicateCards}</div>
    </div>
  `;
  galleryAutoPosition = 0;
  galleryLoopWidth = 0;
  projectGallery.style.setProperty("--gallery-shift", "0px");
  window.requestAnimationFrame(() => {
    updateGalleryLoopWidth();
    updateGalleryControls();
  });

  projectGallery.classList.add("is-visible");
}

function getGalleryTrack() {
  return projectGallery?.querySelector(".gallery-track");
}

function getGallerySequence() {
  return projectGallery?.querySelector("[data-gallery-sequence]");
}

function getGalleryGap() {
  const track = getGalleryTrack();
  if (!track) return 0;
  const styles = window.getComputedStyle(track);
  return Number.parseFloat(styles.columnGap || styles.gap) || 28;
}

function updateGalleryLoopWidth() {
  const sequence = getGallerySequence();
  if (!sequence) {
    galleryLoopWidth = 0;
    return 0;
  }

  galleryLoopWidth = sequence.scrollWidth + getGalleryGap();
  return galleryLoopWidth;
}

function normalizeGalleryPosition(position) {
  const loopWidth = galleryLoopWidth || updateGalleryLoopWidth();
  if (loopWidth <= 2) return 0;
  return ((position % loopWidth) + loopWidth) % loopWidth;
}

function setGalleryShift(position) {
  if (!projectGallery) return;
  galleryAutoPosition = normalizeGalleryPosition(position);
  projectGallery.style.setProperty("--gallery-shift", `${galleryAutoPosition.toFixed(2)}px`);
  updateGalleryControls();
}

function updateGalleryControls() {
  updateGalleryLoopWidth();
}

function setGalleryAutoPaused(paused) {
  galleryAutoPaused = paused;
}

function syncGalleryAutoPause() {
  setGalleryAutoPaused(galleryHoverPaused || galleryTimedPaused || galleryDragging);
}

function setGalleryHoverPaused(paused) {
  galleryHoverPaused = paused;
  syncGalleryAutoPause();
}

function pauseGalleryAuto(duration = 0) {
  galleryTimedPaused = true;
  syncGalleryAutoPause();
  window.clearTimeout(galleryResumeTimer);

  if (duration > 0) {
    galleryResumeTimer = window.setTimeout(() => {
      galleryTimedPaused = false;
      syncGalleryAutoPause();
    }, duration);
  }
}

function releaseGalleryPointer(event) {
  if (!projectGallery || !galleryPointerActive) return;
  galleryPointerActive = false;
  galleryDragging = false;
  projectGallery.classList.remove("is-dragging");
  syncGalleryAutoPause();

  if (event.pointerId !== undefined && projectGallery.hasPointerCapture?.(event.pointerId)) {
    projectGallery.releasePointerCapture(event.pointerId);
  }

  if (galleryDragMoved) {
    gallerySuppressClick = true;
    window.setTimeout(() => {
      gallerySuppressClick = false;
    }, 160);
  }

  pauseGalleryAuto(1200);
}

function startGalleryDrag(event) {
  if (!projectGallery) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;

  galleryPointerActive = true;
  galleryDragging = false;
  galleryDragMoved = false;
  galleryDragStartX = event.clientX;
  galleryDragStartPosition = galleryAutoPosition;
  syncGalleryAutoPause();
}

function moveGalleryDrag(event) {
  if (!projectGallery || !galleryPointerActive) return;

  const delta = event.clientX - galleryDragStartX;
  if (!galleryDragging && Math.abs(delta) > 4) {
    galleryDragging = true;
    galleryDragMoved = true;
    projectGallery.classList.add("is-dragging");
    syncGalleryAutoPause();
    projectGallery.setPointerCapture?.(event.pointerId);
  }

  if (!galleryDragging) return;

  setGalleryShift(galleryDragStartPosition - delta);
  event.preventDefault();
}

function handleGalleryClick(event) {
  if (!gallerySuppressClick) return;
  event.preventDefault();
  event.stopPropagation();
  gallerySuppressClick = false;
}

function handleGalleryWheel(event) {
  if (!projectGallery) return;

  const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
  if (!horizontal) return;

  pauseGalleryAuto(900);
  setGalleryShift(galleryAutoPosition + event.deltaX);
  event.preventDefault();
}

function startGalleryAutoPlay() {
  if (!projectGallery) return;
  window.cancelAnimationFrame(galleryAutoFrame);
  if (motionQuery.matches) return;

  const tick = () => {
    if (!galleryAutoPaused) {
      const loopWidth = galleryLoopWidth || updateGalleryLoopWidth();

      if (loopWidth > projectGallery.clientWidth + 2) {
        setGalleryShift(galleryAutoPosition + 0.18);
      }
    }

    galleryAutoFrame = window.requestAnimationFrame(tick);
  };

  galleryAutoFrame = window.requestAnimationFrame(tick);
}

function setupGalleryCarousel() {
  if (!projectGallery) return;

  projectGallery.addEventListener("mouseenter", () => setGalleryHoverPaused(true));
  projectGallery.addEventListener("mouseleave", () => setGalleryHoverPaused(false));
  projectGallery.addEventListener("focusin", () => setGalleryHoverPaused(true));
  projectGallery.addEventListener("focusout", () => setGalleryHoverPaused(false));
  projectGallery.addEventListener("pointerdown", startGalleryDrag);
  projectGallery.addEventListener("pointermove", moveGalleryDrag);
  projectGallery.addEventListener("pointerup", releaseGalleryPointer);
  projectGallery.addEventListener("pointercancel", releaseGalleryPointer);
  projectGallery.addEventListener("click", handleGalleryClick, true);
  projectGallery.addEventListener("wheel", handleGalleryWheel, { passive: false });
  window.addEventListener("resize", () => {
    updateGalleryLoopWidth();
    setGalleryShift(galleryAutoPosition);
  }, { passive: true });
  updateGalleryControls();
  startGalleryAutoPlay();
}

function openProject(index) {
  const project = projects[index];
  if (!project) return;
  const copy = getProjectCopy(project);

  drawerContent.innerHTML = `
    <img src="${project.image}" alt="${copy.title} project preview">
    <h3>${copy.title}</h3>
    <p>${copy.summary}</p>
    <div class="drawer-tags">
      ${copy.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
  `;

  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeProject() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
}

function setMenu(open) {
  if (!catMenu || !quickNav) return;
  catMenu.classList.toggle("is-open", open);
  catMenu.setAttribute("aria-expanded", open ? "true" : "false");
  quickNav.classList.toggle("is-open", open);
}

function closeMenu() {
  setMenu(false);
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  document.querySelectorAll(".hero, .section").forEach((section) => {
    section.querySelectorAll(".reveal").forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 360)}ms`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function resetTextPluck() {
  pluckLetters.forEach((letter) => {
    letter.style.transform = "";
    letter.classList.remove("is-plucked");
  });
}

function updateTextPluck() {
  pluckFrame = 0;
  if (!pluckPointer) return;

  const { x, y } = pluckPointer;
  pluckLetters.forEach((letter) => {
    const rect = letter.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(centerX - x, centerY - y);
    const isRoleText = Boolean(letter.closest(".hero-role"));
    const radius = isRoleText ? 108 : 158;

    if (distance > radius) {
      letter.style.transform = "";
      letter.classList.remove("is-plucked");
      return;
    }

    const force = Math.pow(1 - distance / radius, 1.75);
    const angle = Math.atan2(centerY - y, centerX - x);
    const moveX = Math.cos(angle) * (isRoleText ? 10 : 15) * force;
    const moveY = Math.sin(angle) * (isRoleText ? 8 : 12) * force;
    const rotate = clamp((centerX - x) * 0.085 * force, -6, 6);

    letter.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0) rotate(${rotate.toFixed(1)}deg)`;
    letter.classList.add("is-plucked");
  });
}

function setupTextPluck() {
  const targets = document.querySelectorAll("[data-pluck-text]");
  if (!targets.length) return;
  rebuildPluckTextTargets();

  if (motionQuery.matches) return;

  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") return;
      pluckPointer = { x: event.clientX, y: event.clientY };
      if (!pluckFrame) {
        pluckFrame = window.requestAnimationFrame(updateTextPluck);
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", resetTextPluck);
  window.addEventListener("blur", resetTextPluck);
}

function rebuildPluckTextTargets() {
  const targets = document.querySelectorAll("[data-pluck-text]");
  pluckLetters.length = 0;

  targets.forEach((target) => {
    const text = target.dataset.pluckSource || target.textContent || "";
    target.setAttribute("aria-label", text);
    target.textContent = "";

    Array.from(text).forEach((char) => {
      const letter = document.createElement("span");
      letter.className = "pluck-letter";
      letter.setAttribute("aria-hidden", "true");
      letter.textContent = char === " " ? "\u00A0" : char;
      target.appendChild(letter);
      pluckLetters.push(letter);
    });
  });
}

function setLightVars(x, y) {
  const width = Math.max(window.innerWidth, 1);
  const height = Math.max(window.innerHeight, 1);
  root.style.setProperty("--light-x", `${x.toFixed(1)}px`);
  root.style.setProperty("--light-y", `${y.toFixed(1)}px`);
  root.style.setProperty("--light-xp", `${((x / width) * 100).toFixed(2)}%`);
  root.style.setProperty("--light-yp", `${((y / height) * 100).toFixed(2)}%`);
}

function updateScrollLight() {
  const page = document.documentElement;
  const maxScroll = Math.max(page.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  const wave = Math.sin(progress * Math.PI * 2);
  const softWave = Math.sin(progress * Math.PI);
  const counterWave = Math.cos(progress * Math.PI * 1.6);
  const ribbonWave = Math.sin(progress * Math.PI * 3.4 + 0.7);
  const slowWave = Math.cos(progress * Math.PI * 1.15 - 0.35);
  const shift = softWave * 112;
  const condense = 1 + softWave * 0.22 + Math.max(ribbonWave, 0) * 0.08;
  const orbAX = 14 + progress * 62 + wave * 7;
  const orbAY = 30 + Math.sin(progress * Math.PI * 2.4 + 0.2) * 21;
  const orbBX = 60 - progress * 42 + counterWave * 9;
  const orbBY = 68 - softWave * 34 + Math.sin(progress * Math.PI * 3.1 + 0.9) * 8;
  const orbCX = 78 - Math.sin(progress * Math.PI * 1.25 + 0.35) * 28 + ribbonWave * 4;
  const orbCY = 16 + progress * 52 + Math.cos(progress * Math.PI * 2.2) * 10;

  root.style.setProperty("--scroll-glow", `${shift.toFixed(1)}px`);
  root.style.setProperty("--scroll-drift-x", `${((progress - 0.5) * 92 + slowWave * 18).toFixed(1)}px`);
  root.style.setProperty("--scroll-drift-y", `${(softWave * -54 + ribbonWave * 16).toFixed(1)}px`);
  root.style.setProperty("--orb-a-x", `${clamp(orbAX, 6, 92).toFixed(2)}%`);
  root.style.setProperty("--orb-a-y", `${clamp(orbAY, 12, 88).toFixed(2)}%`);
  root.style.setProperty("--orb-b-x", `${clamp(orbBX, 8, 88).toFixed(2)}%`);
  root.style.setProperty("--orb-b-y", `${clamp(orbBY, 16, 90).toFixed(2)}%`);
  root.style.setProperty("--orb-c-x", `${clamp(orbCX, 14, 94).toFixed(2)}%`);
  root.style.setProperty("--orb-c-y", `${clamp(orbCY, 8, 92).toFixed(2)}%`);
  root.style.setProperty("--orb-rotate", `${((progress - 0.5) * 24 + ribbonWave * 5).toFixed(2)}deg`);
  root.style.setProperty("--orb-scale", `${(1 + softWave * 0.12).toFixed(3)}`);
  root.style.setProperty("--heat-condense", `${condense.toFixed(3)}`);
  root.style.setProperty("--heat-bloom", `${(softWave * -8 + Math.max(ribbonWave, 0) * -4).toFixed(1)}px`);
}

function tickLight() {
  const ease = motionQuery.matches ? 1 : 0.075;
  lightState.x += (lightState.targetX - lightState.x) * ease;
  lightState.y += (lightState.targetY - lightState.y) * ease;
  setLightVars(lightState.x, lightState.y);

  if (!motionQuery.matches) {
    window.requestAnimationFrame(tickLight);
  }
}

function setupLightField() {
  setLightVars(lightState.x, lightState.y);
  updateScrollLight();

  if (!motionQuery.matches) {
    window.requestAnimationFrame(tickLight);
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") return;
      const dx = event.clientX - lightState.targetX;
      const dy = event.clientY - lightState.targetY;
      const speed = Math.min(Math.hypot(dx, dy), 420);
      const stretch = speed / 2800;
      const pull = 0.42;

      lightState.targetX += (event.clientX - lightState.targetX) * pull;
      lightState.targetY += (event.clientY - lightState.targetY) * pull;
      const angle = clamp(Math.atan2(dy, dx) * 180 / Math.PI, -10, 10);
      root.style.setProperty("--cursor-alpha", document.body.dataset.theme === "dark" ? "0.64" : "0.52");
      root.style.setProperty("--light-angle", `${angle.toFixed(1)}deg`);
      root.style.setProperty("--light-scale-x", `${(1 + stretch).toFixed(3)}`);
      root.style.setProperty("--light-scale-y", `${(1 - stretch * 0.32).toFixed(3)}`);

      window.clearTimeout(lightShapeTimer);
      lightShapeTimer = window.setTimeout(() => {
        root.style.setProperty("--light-scale-x", "1");
        root.style.setProperty("--light-scale-y", "1");
      }, 180);

      if (motionQuery.matches) {
        lightState.x = lightState.targetX;
        lightState.y = lightState.targetY;
        setLightVars(lightState.x, lightState.y);
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    root.style.setProperty("--cursor-alpha", "0");
  });

  window.addEventListener("blur", () => {
    root.style.setProperty("--cursor-alpha", "0");
  });

  window.addEventListener("scroll", updateScrollLight, { passive: true });

  window.addEventListener(
    "resize",
    () => {
      lightState.targetX = Math.min(lightState.targetX, window.innerWidth);
      lightState.targetY = Math.min(lightState.targetY, window.innerHeight);
      updateScrollLight();
    },
    { passive: true }
  );
}

function setupPageRipple() {
  if (!effectsEnabled || motionQuery.matches) return;

  const rippleField = document.createElement("div");
  rippleField.className = "ripple-field";
  rippleField.setAttribute("aria-hidden", "true");
  document.body.appendChild(rippleField);

  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" && event.isPrimary === false) return;
    if (event.target.closest("a, button, input, textarea, select, summary")) return;

    const rippleXp = clamp((event.clientX / Math.max(window.innerWidth, 1)) * 100, 0, 100);
    const rippleYp = clamp((event.clientY / Math.max(window.innerHeight, 1)) * 100, 0, 100);
    const ripple = document.createElement("span");
    ripple.className = "water-ripple";
    ripple.style.setProperty("--ripple-x", `${event.clientX.toFixed(1)}px`);
    ripple.style.setProperty("--ripple-y", `${event.clientY.toFixed(1)}px`);
    ripple.style.setProperty("--ripple-rotate", `${((rippleCount * 29) % 48 - 24).toFixed(1)}deg`);
    rippleCount += 1;

    root.style.setProperty("--ripple-xp", `${rippleXp.toFixed(2)}%`);
    root.style.setProperty("--ripple-yp", `${rippleYp.toFixed(2)}%`);
    root.style.setProperty("--ripple-alpha", document.body.dataset.theme === "dark" ? "0.58" : "0.72");
    lightState.targetX += (event.clientX - lightState.targetX) * 0.28;
    lightState.targetY += (event.clientY - lightState.targetY) * 0.28;

    window.clearTimeout(rippleFadeTimer);
    rippleFadeTimer = window.setTimeout(() => {
      root.style.setProperty("--ripple-alpha", "0");
    }, 520);

    rippleField.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 1700);
  });
}

applyStaticTranslations();
renderFeaturedCases();
renderProjects();
renderProjectGallery();
setupGalleryCarousel();
setupReveal();
setupTextPluck();
setupLightField();
setupPageRipple();

const savedTheme = window.localStorage.getItem("lilian-theme");
setTheme(savedTheme === "dark" ? "dark" : "light");

if (catMenu) {
  catMenu.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenu(!catMenu.classList.contains("is-open"));
  });
}

if (quickNav) {
  quickNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
  });
}

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    window.localStorage.setItem("lilian-language", currentLanguage);
    applyLanguage();
  });
}

closeDrawer?.addEventListener("click", closeProject);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProject();
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!quickNav || !catMenu) return;
  if (quickNav.contains(event.target) || catMenu.contains(event.target)) return;
  closeMenu();
});
