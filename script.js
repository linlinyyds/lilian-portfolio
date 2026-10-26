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
const urlParams = new URLSearchParams(window.location.search);
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const pluckLetters = [];
let pluckFrame = 0;
let pluckPointer = null;
let currentLanguage = ["zh", "en"].includes(urlParams.get("lang")) ? urlParams.get("lang") : (window.localStorage.getItem("lilian-language") === "en" ? "en" : "zh");
let galleryAutoPosition = 0;
let galleryLoopWidth = 0;
let galleryDragging = false;
let galleryPointerActive = false;
let galleryDragStartX = 0;
let galleryDragStartY = 0;
let galleryDragStartPosition = 0;
let galleryDragMoved = false;
let gallerySuppressClick = false;
const menuTabIndexes = new WeakMap();

const staticTranslations = {
  en: {
    "nav.home": "Home", "nav.project": "Work", "nav.about": "About", "nav.gallery": "Gallery", "nav.contact": "Contact", "nav.skip": "Skip to work",
    "nav.menu": "Navigation menu", "hero.scroll": "Scroll to explore",
    "project.view": "View project", "project.archive": "Browse project index",
    "about.workLabel": "Experience", "about.educationLabel": "Education",
    "about.direction1": "UX & interaction design",
    "about.direction2": "Digital products · Automotive · AI experiences",
    "about.p2": "I focus on how people understand products and complete tasks, making each step of a complex journey clear and coherent.",
    "about.p4": "My practice spans digital products, automotive interfaces and service experiences. I develop ideas through scenarios, prototypes and design documentation, working with teams to check the details and using AI tools to explore implementations.",
    "about.focusLabel": "Design capabilities",
    "about.focus1Title": "Scenarios & experience mapping",
    "about.focus1Copy": "Map user tasks, flows, information architecture and key touchpoints to identify gaps between parts of an experience.",
    "about.focus2Title": "Interaction design & prototyping",
    "about.focus2Copy": "Define interface logic, system states and recovery paths; check flows through interactive prototypes and support implementation with documentation and reviews.",
    "about.focus3Title": "AI-assisted implementation & collaboration",
    "about.focus3Copy": "Explore design-to-code with AI tools, follow requirements, releases and test feedback, and collaborate across teams in English.",
    "about.resume": "Download résumé · 中文 PDF",
    "about.next": "Continue to selected work",
    "about.workDate0": "2026.08—Present", "about.company0": "Desay SV", "about.role0": "Innovation Experience Design Engineer",
    "about.workDesc0": "Contribute to vehicle and two-wheeler interactions, UI adaptation and specifications; lead application planning for generative HMI.",
    "about.workDate1": "2025.10—2026.07", "about.company1": "ICERED", "about.role1": "AI Product Manager",
    "about.workDesc1": "Connect requirements, interaction prototypes and pre-launch testing for an overseas AI social app, using AI tools for frontend implementation.",
    "about.workDate2": "2024.04—2024.08", "about.company2": "NIO", "about.role2": "Service Design Intern",
    "about.workDesc2": "Map vehicle-inspection journeys and service blueprints, translating offline bookings, document submission and progress tracking into app flows.",
    "about.edu1School": "Royal College of Art", "about.edu1Degree": "MA Information Experience Design",
    "about.edu2School": "Shanghai University of Engineering Science", "about.edu2Degree": "BA Art and Technology",
    "about.languageLabel": "Languages", "about.languages": "Mandarin · English for cross-team collaboration",
    "gallery.hint": "Drag to browse", "gallery.previous": "Previous project", "gallery.next": "Next project", "gallery.aria": "Project gallery. Use left and right arrow keys to browse.",
    "contact.kicker": "For a conversation, or just a hello.", "footer.top": "Back to top ↑",
    "meta.title": "Lilian Portfolio",
    "meta.description": "Lilian Zhou’s UX and interaction design portfolio. Digital products, automotive interfaces, AI experiences and service design."
  },
  zh: {
    "nav.home": "首页", "nav.project": "作品", "nav.about": "关于我", "nav.gallery": "探索", "nav.contact": "联系", "nav.skip": "跳至作品",
    "nav.menu": "导航菜单", "hero.scroll": "向下浏览",
    "project.view": "查看项目", "project.archive": "浏览项目目录",
    "about.workLabel": "工作经历", "about.educationLabel": "教育背景",
    "about.direction1": "UX 与交互设计",
    "about.direction2": "数字产品 · 智能座舱 · AI 体验",
    "about.p2": "我关注人们如何理解产品、完成任务，让复杂流程中的每一步都清晰、连贯。",
    "about.p4": "我的实践涉及数字产品、智能座舱与服务体验。我通过场景梳理、原型和设计文档细化方案，和团队一起验证细节，也使用 AI 工具探索更直接的实现方式。",
    "about.focusLabel": "设计能力",
    "about.focus1Title": "场景理解与体验梳理",
    "about.focus1Copy": "从用户任务与使用场景出发，梳理流程、信息架构和关键触点，找到体验中的衔接问题。",
    "about.focus2Title": "交互设计与原型验证",
    "about.focus2Copy": "设计页面逻辑、系统状态与异常反馈，用可操作原型检查流程，再通过文档与走查推动落地。",
    "about.focus3Title": "AI 辅助实现与团队协作",
    "about.focus3Copy": "使用 AI 工具探索设计转前端，跟进需求、版本和测试反馈，并以英文参与跨团队沟通。",
    "about.resume": "下载简历 PDF",
    "about.next": "继续浏览作品",
    "about.workDate0": "2026.08—至今", "about.company0": "德赛西威", "about.role0": "创新体验设计工程师",
    "about.workDesc0": "参与车机与二轮车交互、界面适配及 UE 文档交付，主导生成式 HMI 应用方案设计。",
    "about.workDate1": "2025.10—2026.07", "about.company1": "ICERED", "about.role1": "AI 产品经理",
    "about.workDesc1": "参与海外 AI 社交产品迭代，连接需求梳理、交互原型与上线前测试，使用 AI 工具推进前端实现。",
    "about.workDate2": "2024.04—2024.08", "about.company2": "蔚来汽车", "about.role2": "服务设计实习生",
    "about.workDesc2": "参与年检服务的用户旅程与服务蓝图梳理，将线下预约、资料提交和进度追踪转为 App 流程。",
    "about.edu1School": "英国皇家艺术学院", "about.edu1Degree": "信息体验设计硕士",
    "about.edu2School": "上海工程技术大学", "about.edu2Degree": "艺术与科技学士",
    "about.languageLabel": "语言", "about.languages": "普通话 · 英语跨团队沟通",
    "gallery.hint": "拖动浏览", "gallery.previous": "上一个作品", "gallery.next": "下一个作品", "gallery.aria": "作品图库，可使用左右方向键浏览",
    "contact.kicker": "聊聊设计，或打个招呼。", "footer.top": "返回顶部 ↑",
    "meta.title": "Lilian Portfolio · 周琳",
    "meta.description": "周琳 Lilian Zhou 的 UX 与交互设计作品集，涵盖数字产品、智能座舱、AI 体验与服务设计。"
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
  const featured = window.LILIAN_FEATURED_CASES || [];
  container.innerHTML = featured.slice(0, 2).map((item) => {
    const copy = currentLanguage === "zh" ? { ...item, ...item.zh } : item;
    return `<a class="work-feature" href="${escapeHTML(item.href)}" aria-label="${escapeHTML(copy.title)}">
      <div class="work-image"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(copy.title)}" loading="lazy" decoding="async" width="1200" height="750"><span class="work-open" aria-hidden="true">${t("project.view")} <span>↗</span></span></div>
      <div class="work-caption"><div class="work-caption-top"><span>${escapeHTML(copy.kind)}</span><span>${item.slug === "ea01u" ? "2026" : "2024"}</span></div><div class="work-title"><h3>${escapeHTML(copy.title)}</h3><span class="row-arrow" aria-hidden="true">↗</span></div><p>${escapeHTML(copy.summary)}</p></div>
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
  const previousPosition = galleryAutoPosition;

  const featured = window.LILIAN_FEATURED_CASES || [];
  const featuredSlugs = featured.map((item) => item.slug);
  const orderedProjects = projects.filter((project) => !featuredSlugs.includes(project.slug) && project.slug !== "generative-hmi");
  const galleryVersion = "thermal-liquid-3";

  const createCards = () => orderedProjects
    .map((project) => {
      const copy = getProjectCopy(project);
      const imageSource = project.galleryImage || project.image;
      const versionedSource = `${imageSource}${imageSource.includes("?") ? "&" : "?"}v=${galleryVersion}`;
      const label = currentLanguage === "zh" ? `打开 ${copy.title}` : `Open ${copy.title}`;

      return `
      <a class="gallery-card gallery-${project.slug}" href="${project.href || `project.html?slug=${project.slug}`}" aria-label="${label}" data-slug="${project.slug}">
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

  projectGallery.innerHTML = `
    <div class="gallery-track">
      <div class="gallery-sequence" data-gallery-sequence>${cards}</div>
    </div>
  `;
  galleryAutoPosition = previousPosition;
  galleryLoopWidth = 0;
  projectGallery.style.setProperty("--gallery-shift", `${previousPosition}px`);
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

  galleryLoopWidth = sequence.scrollWidth;
  return galleryLoopWidth;
}

function getGalleryViewport() {
  if (!projectGallery) return { left: 0, right: 0, width: 0 };
  const rect = projectGallery.getBoundingClientRect();
  const styles = window.getComputedStyle(projectGallery);
  const leftPadding = Number.parseFloat(styles.paddingLeft) || 0;
  const rightPadding = Number.parseFloat(styles.paddingRight) || 0;
  const width = Math.max(0, projectGallery.clientWidth - leftPadding - rightPadding);
  const left = rect.left + leftPadding;
  return { left, right: left + width, width };
}

function getGalleryMaxShift() {
  const width = galleryLoopWidth || updateGalleryLoopWidth();
  return Math.max(0, width - getGalleryViewport().width);
}

function normalizeGalleryPosition(position) {
  return clamp(position, 0, getGalleryMaxShift());
}

function setGalleryShift(position) {
  if (!projectGallery) return;
  galleryAutoPosition = normalizeGalleryPosition(position);
  projectGallery.style.setProperty("--gallery-shift", `${galleryAutoPosition.toFixed(2)}px`);
  updateGalleryControls();
}

function updateGalleryControls() {
  if (!projectGallery) return;
  updateGalleryLoopWidth();
  const maxShift = getGalleryMaxShift();
  galleryAutoPosition = normalizeGalleryPosition(galleryAutoPosition);
  projectGallery.style.setProperty("--gallery-shift", `${galleryAutoPosition.toFixed(2)}px`);
  document.querySelectorAll("[data-gallery-prev]").forEach((button) => {
    button.disabled = galleryAutoPosition <= 1;
    button.setAttribute("aria-controls", projectGallery.id);
  });
  document.querySelectorAll("[data-gallery-next]").forEach((button) => {
    button.disabled = galleryAutoPosition >= maxShift - 1;
    button.setAttribute("aria-controls", projectGallery.id);
  });
  projectGallery.querySelectorAll(".gallery-sequence-clone").forEach((clone) => {
    clone.inert = true;
    clone.querySelectorAll("a").forEach((link) => link.setAttribute("tabindex", "-1"));
  });
}

function moveGalleryByCard(direction) {
  const card = getGallerySequence()?.querySelector(".gallery-card");
  if (!card) return;
  const step = card.getBoundingClientRect().width + getGalleryGap();
  setGalleryShift(galleryAutoPosition + direction * step);
}

function ensureGalleryCardVisible(card) {
  if (!projectGallery || !card || card.closest(".gallery-sequence-clone")) return;
  projectGallery.scrollLeft = 0;
  const viewport = getGalleryViewport();
  const rect = card.getBoundingClientRect();
  if (rect.left < viewport.left) {
    setGalleryShift(galleryAutoPosition + rect.left - viewport.left);
  } else if (rect.right > viewport.right) {
    setGalleryShift(galleryAutoPosition + rect.right - viewport.right);
  }
}

function handleGalleryKeydown(event) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const cards = Array.from(getGallerySequence()?.querySelectorAll(".gallery-card") || []);
  if (!cards.length) return;
  const focusedCard = event.target.closest(".gallery-card");
  const focusedIndex = cards.indexOf(focusedCard);
  let nextIndex;
  if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = cards.length - 1;
  else if (focusedIndex >= 0) nextIndex = clamp(focusedIndex + (event.key === "ArrowRight" ? 1 : -1), 0, cards.length - 1);
  else {
    const viewport = getGalleryViewport();
    nextIndex = cards.findIndex((card) => card.getBoundingClientRect().right > viewport.left + 1);
    nextIndex = Math.max(0, nextIndex);
  }
  event.preventDefault();
  cards[nextIndex].focus({ preventScroll: true });
  ensureGalleryCardVisible(cards[nextIndex]);
}

function releaseGalleryPointer(event) {
  if (!projectGallery || !galleryPointerActive) return;
  galleryPointerActive = false;
  galleryDragging = false;
  projectGallery.classList.remove("is-dragging");

  if (event.pointerId !== undefined && projectGallery.hasPointerCapture?.(event.pointerId)) {
    projectGallery.releasePointerCapture(event.pointerId);
  }

  if (galleryDragMoved) {
    gallerySuppressClick = true;
    window.setTimeout(() => {
      gallerySuppressClick = false;
    }, 160);
  }
}

function startGalleryDrag(event) {
  if (!projectGallery) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;
  if (event.isPrimary === false) return;

  galleryPointerActive = true;
  galleryDragging = false;
  galleryDragMoved = false;
  galleryDragStartX = event.clientX;
  galleryDragStartY = event.clientY;
  galleryDragStartPosition = galleryAutoPosition;
}

function moveGalleryDrag(event) {
  if (!projectGallery || !galleryPointerActive) return;

  const delta = event.clientX - galleryDragStartX;
  const verticalDelta = event.clientY - galleryDragStartY;
  if (!galleryDragging && event.pointerType === "touch" && Math.abs(verticalDelta) > Math.abs(delta) && Math.abs(verticalDelta) > 6) {
    galleryPointerActive = false;
    return;
  }
  if (!galleryDragging && Math.abs(delta) > 4) {
    galleryDragging = true;
    galleryDragMoved = true;
    projectGallery.classList.add("is-dragging");
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

  const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
  if (!horizontal) return;

  const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? getGalleryViewport().width : 1;
  const delta = event.shiftKey && Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
  setGalleryShift(galleryAutoPosition + delta * unit);
  event.preventDefault();
}

function setupGalleryCarousel() {
  if (!projectGallery) return;

  projectGallery.setAttribute("aria-keyshortcuts", "ArrowLeft ArrowRight Home End");
  projectGallery.addEventListener("focusin", (event) => ensureGalleryCardVisible(event.target.closest(".gallery-card")));
  projectGallery.addEventListener("keydown", handleGalleryKeydown);
  projectGallery.addEventListener("dragstart", (event) => event.preventDefault());
  projectGallery.addEventListener("pointerdown", startGalleryDrag);
  projectGallery.addEventListener("pointermove", moveGalleryDrag);
  projectGallery.addEventListener("pointerup", releaseGalleryPointer);
  projectGallery.addEventListener("pointercancel", releaseGalleryPointer);
  projectGallery.addEventListener("lostpointercapture", releaseGalleryPointer);
  projectGallery.addEventListener("click", handleGalleryClick, true);
  projectGallery.addEventListener("wheel", handleGalleryWheel, { passive: false });
  window.addEventListener("pointerup", releaseGalleryPointer);
  window.addEventListener("pointercancel", releaseGalleryPointer);
  document.querySelectorAll("[data-gallery-prev]").forEach((button) => button.addEventListener("click", () => moveGalleryByCard(-1)));
  document.querySelectorAll("[data-gallery-next]").forEach((button) => button.addEventListener("click", () => moveGalleryByCard(1)));
  window.addEventListener("resize", () => {
    updateGalleryLoopWidth();
    setGalleryShift(galleryAutoPosition);
  }, { passive: true });
  updateGalleryControls();
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
  if (!drawer) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
}

function setMenu(open, { restoreFocus = false } = {}) {
  if (!catMenu || !quickNav) return;
  catMenu.classList.toggle("is-open", open);
  catMenu.setAttribute("aria-expanded", open ? "true" : "false");
  quickNav.classList.toggle("is-open", open);
  quickNav.inert = !open;
  quickNav.setAttribute("aria-hidden", open ? "false" : "true");
  quickNav.querySelectorAll("a").forEach((link) => {
    if (!open) {
      if (!menuTabIndexes.has(link)) menuTabIndexes.set(link, link.getAttribute("tabindex"));
      link.setAttribute("tabindex", "-1");
    } else if (menuTabIndexes.has(link)) {
      const previousTabIndex = menuTabIndexes.get(link);
      if (previousTabIndex === null) link.removeAttribute("tabindex");
      else link.setAttribute("tabindex", previousTabIndex);
      menuTabIndexes.delete(link);
    }
  });
  if (!open && restoreFocus) catMenu.focus({ preventScroll: true });
}

function closeMenu(options) {
  setMenu(false, options);
}

function updateActiveNavigation() {
  if (!quickNav) return;
  const destinations = Array.from(quickNav.querySelectorAll('a[href^="#"]')).map((link) => {
    const hash = link.getAttribute("href");
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return null; }
    const section = document.getElementById(id);
    return section ? { link, section, top: section.getBoundingClientRect().top } : null;
  }).filter(Boolean);
  if (!destinations.length) return;
  const activationLine = Math.min(window.innerHeight * 0.25, 180);
  const reached = destinations.filter((item) => item.top <= activationLine);
  let active = reached.sort((a, b) => b.top - a.top)[0] || destinations[0];
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    active = destinations.reduce((last, item) => item.top > last.top ? item : last);
  }
  destinations.forEach(({ link }) => {
    if (link === active.link) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function setupNavigationTracking() {
  if (!quickNav) return;
  let scheduled = false;
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      updateActiveNavigation();
    });
  };
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("hashchange", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);
  updateActiveNavigation();
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

setMenu(false);
setupNavigationTracking();
applyStaticTranslations();
renderFeaturedCases();
renderProjects();
renderProjectGallery();
setupGalleryCarousel();
setupReveal();
setupTextPluck();

const savedTheme = window.localStorage.getItem("lilian-theme");
setTheme(savedTheme === "dark" ? "dark" : "light");

if (catMenu) {
  catMenu.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenu(!catMenu.classList.contains("is-open"));
  });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest('#quickNav a[href^="#"], a[data-section-link]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const hash = link.getAttribute("href");
  if (!hash?.startsWith("#")) return;
  let id;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  closeMenu();
  if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  const hadTabIndex = target.hasAttribute("tabindex");
  if (!hadTabIndex) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  target.scrollIntoView({ block: "start", behavior: motionQuery.matches ? "auto" : "smooth" });
});

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
    const menuWasOpen = catMenu?.getAttribute("aria-expanded") === "true";
    closeProject();
    closeMenu({ restoreFocus: menuWasOpen });
  }
});

document.addEventListener("click", (event) => {
  if (!quickNav || !catMenu) return;
  if (quickNav.contains(event.target) || catMenu.contains(event.target)) return;
  closeMenu();
});
