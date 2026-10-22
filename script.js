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
    "project.practice": "( Practice & research )", "project.view": "View project", "project.archive": "Browse project index",
    "research.title": "Generative HMI", "research.index": "R&D proposal · In progress",
    "about.profileLabel": "( Profile )", "about.workLabel": "( Experience )", "about.educationLabel": "( Education )",
    "about.p1": "Hello, I am Lilian Zhou.",
    "about.p2": "I design automotive HMI at Desay SV, working on cockpit interaction, AI interfaces and generative HMI application planning. I hold an MA in Information Experience Design from the Royal College of Art.",
    "about.p4": "Previously, I worked on an overseas AI social product at ICERED and vehicle-inspection services at NIO. My practice spans user flows, interface states and prototypes, through to design documentation and delivery validation.",
    "about.resume": "Résumé PDF · 中文",
    "about.workDate0": "2026.08—Present", "about.work0": "Desay SV | Innovation Experience Design Engineer",
    "about.workDesc0": "Cockpit interaction, UI adaptation, AI interfaces and generative HMI application planning.",
    "about.workDate1": "2025.10—2026.07", "about.work1": "ICERED | AI Product Manager",
    "about.workDesc1": "AI interaction, design-to-code, collaboration in English and product iteration.",
    "about.workDate2": "2024.04—2024.08", "about.work2": "NIO | Service Design Intern",
    "about.workDesc2": "Vehicle-inspection service digitalization, app flows and service blueprinting.",
    "about.edu1School": "Royal College of Art", "about.edu1Degree": "MA Information Experience Design",
    "about.edu2School": "Shanghai University of Engineering Science", "about.edu2Degree": "BA Art and Technology",
    "gallery.hint": "Drag to browse", "gallery.previous": "Previous project", "gallery.next": "Next project", "gallery.aria": "Project gallery. Use left and right arrow keys to browse.",
    "contact.kicker": "For a conversation, or just a hello.", "footer.top": "Back to top ↑",
    "meta.title": "Lilian Portfolio",
    "meta.description": "Lilian Zhou’s portfolio. Automotive HMI, UI/UX, AI products and experience design. Royal College of Art, Desay SV, ICERED and NIO."
  },
  zh: {
    "nav.home": "首页", "nav.project": "作品", "nav.about": "关于", "nav.gallery": "探索", "nav.contact": "联系", "nav.skip": "跳至作品",
    "nav.menu": "导航菜单", "hero.scroll": "向下浏览",
    "project.practice": "（工作与研究）", "project.view": "查看项目", "project.archive": "浏览项目目录",
    "research.title": "生成式 HMI", "research.index": "研发方案 · 进行中",
    "about.profileLabel": "（个人简介）", "about.workLabel": "（工作经历）", "about.educationLabel": "（教育背景）",
    "about.p1": "你好，我是周琳。",
    "about.p2": "目前在德赛西威做智能座舱 HMI 交互设计，参与座舱交互、AI 界面优化与生成式 HMI 方案设计。硕士毕业于英国皇家艺术学院信息体验设计专业。",
    "about.p4": "此前在 ICERED 参与海外 AI 社交产品迭代，在蔚来参与车辆年检服务数字化。我的工作从用户流程、界面状态和原型出发，延伸到设计文档与交付验证。",
    "about.resume": "下载简历 PDF",
    "about.workDate0": "2026.08—至今", "about.work0": "德赛西威｜创新体验设计工程师",
    "about.workDesc0": "座舱交互、界面适配、AI 界面优化与生成式 HMI 方案设计。",
    "about.workDate1": "2025.10—2026.07", "about.work1": "ICERED｜AI 产品经理",
    "about.workDesc1": "AI 交互、设计转前端、英文跨团队协作与产品迭代。",
    "about.workDate2": "2024.04—2024.08", "about.work2": "蔚来汽车｜服务设计实习生",
    "about.workDesc2": "车辆年检服务数字化、App 流程与服务蓝图。",
    "about.edu1School": "英国皇家艺术学院", "about.edu1Degree": "信息体验设计硕士",
    "about.edu2School": "上海工程技术大学", "about.edu2Degree": "艺术与科技学士",
    "gallery.hint": "拖动浏览", "gallery.previous": "上一个作品", "gallery.next": "下一个作品", "gallery.aria": "作品图库，可使用左右方向键浏览",
    "contact.kicker": "聊聊设计，或打个招呼。", "footer.top": "返回顶部 ↑",
    "meta.title": "Lilian Portfolio · 周琳",
    "meta.description": "周琳 Lilian Zhou 的作品集。智能座舱 HMI、UI/UX、AI 产品与体验设计。英国皇家艺术学院、德赛西威、ICERED 与蔚来。"
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
  const practice = document.querySelector("#practiceCases");
  if (practice) practice.innerHTML = featured.slice(2).map((item) => {
    const copy = currentLanguage === "zh" ? { ...item, ...item.zh } : item;
    return `<a class="practice-row" href="${escapeHTML(item.href)}"><span class="practice-name">${escapeHTML(copy.title)}</span><span class="practice-description">${escapeHTML(copy.kind)}</span><span class="row-arrow" aria-hidden="true">↗</span></a>`;
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

setMenu(false);
setupNavigationTracking();
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
