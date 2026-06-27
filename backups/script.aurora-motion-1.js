const projects = window.LILIAN_PROJECTS || [];
const projectTranslations = window.LILIAN_PROJECT_TRANSLATIONS || {};

const projectList = document.querySelector("#projectList");
const projectGallery = document.querySelector("#projectGallery");
const galleryPrev = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");
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
let currentLanguage = window.localStorage.getItem("lilian-language") === "zh" ? "zh" : "en";
let galleryAutoFrame = 0;
let galleryAutoDirection = 1;
let galleryAutoPosition = 0;
let galleryAutoPaused = false;
let galleryResumeTimer = 0;

const staticTranslations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.project": "Project",
    "nav.gallery": "Gallery",
    "hero.name": "LILIAN",
    "hero.portfolio": "PORTFOLIO",
    "hero.roleLine": "UI&UX | HMI",
    "hero.role": "AI PRODUCT MANAGER",
    "about.kicker": "LILIAN",
    "about.title": "ABOUT",
    "about.profileLabel": "( Profile )",
    "about.p1": "Hello, I am Lilian Zhou.",
    "about.p2": "I am a UX / UI / interaction experience designer with a background across art technology, information experience and digital products. Based in Shanghai, I work on social products, AI assistants and web experiences, with additional experience in automotive services and intelligent cockpit projects.",
    "about.p3": "I like turning complex problems into experiences that feel natural.",
    "about.p4": "I start from user scenarios, information architecture and interaction prototypes, then carry ideas through testing and development. I also use AI tools to validate design concepts quickly. For me, good design is not only visual: it should be clear, reliable and genuinely useful.",
    "about.p5": "I care about responsive, emotionally aware design.",
    "about.p6": "Whether it is a conversation, a button, sound, light or space, I want systems to give the right feedback at the right moment, making the relationship between people and products feel more natural and warmer.",
    "about.educationLabel": "( Education )",
    "about.edu1": "Royal College of Art | MA Information Experience Design",
    "about.edu2": "Shanghai University of Engineering Science | BA Art and Technology",
    "about.workLabel": "( Work )",
    "about.work1": "ICERED | AI Product Manager",
    "about.work2": "NIO | Service Designer",
    "about.contactLabel": "( Contact )",
    "project.kicker": "SELECTED WORKS",
    "project.title": "PROJECT",
    "gallery.kicker": "VISUAL ARCHIVE",
    "gallery.title": "GALLERY",
    "gallery.prev": "Previous gallery item",
    "gallery.next": "Next gallery item"
  },
  zh: {
    "nav.home": "首页",
    "nav.about": "关于",
    "nav.project": "项目",
    "nav.gallery": "画廊",
    "hero.name": "LILIAN",
    "hero.portfolio": "作品集",
    "hero.roleLine": "UI&UX｜HMI",
    "hero.role": "AI 产品经理",
    "about.kicker": "周琳",
    "about.title": "关于",
    "about.profileLabel": "（个人简介）",
    "about.p1": "你好，我是周琳。",
    "about.p2": "我是一名 UX / UI / 交互体验设计师，背景横跨艺术科技、信息体验与数字产品。现在在上海参与社会产品、AI 助手和网站体验设计，也做过汽车服务与智能座舱项目。",
    "about.p3": "我喜欢把复杂的问题，变成自然的体验。",
    "about.p4": "我会从用户场景、信息架构和交互原型出发，一直推进到测试与开发落地。也会使用 AI 工具快速验证设计想法。对我来说，好的设计不只是好看，更应该清楚、可信，并真正解决问题。",
    "about.p5": "我喜欢有回应的设计。",
    "about.p6": "无论是一段对话、一个按钮，还是声音、光线与空间，我都希望系统能在合适的时刻给予恰当反馈，让人与产品之间的交流更自然，也更有温度。",
    "about.educationLabel": "（教育背景）",
    "about.edu1": "英国皇家艺术学院｜信息体验设计硕士",
    "about.edu2": "上海工程技术大学｜艺术与科技学士",
    "about.workLabel": "（工作经历）",
    "about.work1": "ICERED｜AI 产品经理",
    "about.work2": "蔚来汽车｜服务设计师",
    "about.contactLabel": "（联系方式）",
    "project.kicker": "精选项目",
    "project.title": "项目",
    "gallery.kicker": "视觉档案",
    "gallery.title": "画廊",
    "gallery.prev": "上一张画廊图片",
    "gallery.next": "下一张画廊图片"
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
  const translation = projectTranslations[currentLanguage]?.[project.slug] || {};
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

  updateLanguageToggle();
}

function applyLanguage() {
  applyStaticTranslations();
  renderProjects();
  renderProjectGallery();
  rebuildPluckTextTargets();
  updateGalleryControls();
}

function renderProjects() {
  if (!projectList) return;

  projectList.innerHTML = projects
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

  const galleryOrder = [
    "aurora-mood",
    "equiflow",
    "this-conversation",
    "clink",
    "five-stars",
    "rako-rako-ramen",
    "the-world-of-kantan",
    "meditate-naturally",
    "moving-crowds"
  ];
  const orderedProjects = [
    ...galleryOrder.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean),
    ...projects.filter((project) => !galleryOrder.includes(project.slug))
  ];
  const galleryVersion = "aurora-motion-1";

  const cards = orderedProjects
    .map((project, index) => {
      const copy = getProjectCopy(project);
      const imageSource = project.galleryImage || project.image;
      const versionedSource = `${imageSource}${imageSource.includes("?") ? "&" : "?"}v=${galleryVersion}`;
      const label = currentLanguage === "zh" ? `打开 ${copy.title}` : `Open ${copy.title}`;

      return `
      <a class="gallery-card gallery-${project.slug}" href="project.html?slug=${project.slug}" aria-label="${label}" data-slug="${project.slug}">
        <span class="gallery-thumb">
          <img src="${versionedSource}" alt="${copy.title} project preview" loading="eager" decoding="async">
        </span>
        <span class="gallery-caption">
          <span class="gallery-title">${copy.title}</span>
          <span class="gallery-type">${copy.meta}</span>
        </span>
      </a>
    `;
    })
    .join("");

  projectGallery.innerHTML = `<div class="gallery-track">${cards}</div>`;
  galleryAutoPosition = 0;
  projectGallery.style.setProperty("--gallery-shift", "0px");

  projectGallery.classList.add("is-visible");
}

function getGalleryTrack() {
  return projectGallery?.querySelector(".gallery-track");
}

function getGalleryMaxShift() {
  const track = getGalleryTrack();
  if (!projectGallery || !track) return 0;
  return Math.max(0, track.scrollWidth - projectGallery.clientWidth);
}

function setGalleryShift(position) {
  if (!projectGallery) return;
  const maxShift = getGalleryMaxShift();
  galleryAutoPosition = clamp(position, 0, maxShift);
  projectGallery.style.setProperty("--gallery-shift", `${galleryAutoPosition.toFixed(2)}px`);
  updateGalleryControls();
}

function updateGalleryControls() {
  if (!projectGallery || !galleryPrev || !galleryNext) return;

  const maxShift = getGalleryMaxShift();
  galleryPrev.disabled = galleryAutoPosition <= 2;
  galleryNext.disabled = maxShift <= 2 || galleryAutoPosition >= maxShift - 2;
}

function scrollGallery(direction) {
  if (!projectGallery) return;
  pauseGalleryAuto(2400);

  const firstCard = projectGallery.querySelector(".gallery-card");
  const track = getGalleryTrack();
  const styles = window.getComputedStyle(track || projectGallery);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 28;
  const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : projectGallery.clientWidth * 0.72;
  setGalleryShift(galleryAutoPosition + direction * (cardWidth + gap));
}

function setGalleryAutoPaused(paused) {
  galleryAutoPaused = paused;
}

function pauseGalleryAuto(duration = 0) {
  setGalleryAutoPaused(true);
  window.clearTimeout(galleryResumeTimer);

  if (duration > 0) {
    galleryResumeTimer = window.setTimeout(() => {
      setGalleryAutoPaused(false);
    }, duration);
  }
}

function startGalleryAutoPlay() {
  if (!projectGallery) return;
  window.cancelAnimationFrame(galleryAutoFrame);

  const tick = () => {
    if (!galleryAutoPaused) {
      const maxShift = getGalleryMaxShift();

      if (maxShift > 2) {
        if (galleryAutoPosition >= maxShift - 1) galleryAutoDirection = -1;
        if (galleryAutoPosition <= 1) galleryAutoDirection = 1;
        setGalleryShift(galleryAutoPosition + galleryAutoDirection * (motionQuery.matches ? 0.12 : 0.28));
      }
    }

    galleryAutoFrame = window.requestAnimationFrame(tick);
  };

  galleryAutoFrame = window.requestAnimationFrame(tick);
}

function setupGalleryCarousel() {
  if (!projectGallery) return;

  galleryPrev?.addEventListener("click", () => scrollGallery(-1));
  galleryNext?.addEventListener("click", () => scrollGallery(1));
  projectGallery.addEventListener("mouseenter", () => setGalleryAutoPaused(true));
  projectGallery.addEventListener("mouseleave", () => setGalleryAutoPaused(false));
  projectGallery.addEventListener("focusin", () => setGalleryAutoPaused(true));
  projectGallery.addEventListener("focusout", () => setGalleryAutoPaused(false));
  window.addEventListener("resize", () => setGalleryShift(galleryAutoPosition), { passive: true });
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
  const shift = softWave * 96;
  const orbAX = 18 + progress * 52 + wave * 5;
  const orbAY = 34 + Math.sin(progress * Math.PI * 2.5) * 18;
  const orbBX = 58 - progress * 34 + counterWave * 6;
  const orbBY = 62 - softWave * 30 + Math.sin(progress * Math.PI * 3.2) * 6;
  const orbCX = 76 - Math.sin(progress * Math.PI * 1.15) * 22;
  const orbCY = 20 + progress * 46 + Math.cos(progress * Math.PI * 2.4) * 8;

  root.style.setProperty("--scroll-glow", `${shift.toFixed(1)}px`);
  root.style.setProperty("--scroll-drift-x", `${((progress - 0.5) * 72).toFixed(1)}px`);
  root.style.setProperty("--scroll-drift-y", `${(softWave * -42).toFixed(1)}px`);
  root.style.setProperty("--orb-a-x", `${clamp(orbAX, 6, 92).toFixed(2)}%`);
  root.style.setProperty("--orb-a-y", `${clamp(orbAY, 12, 88).toFixed(2)}%`);
  root.style.setProperty("--orb-b-x", `${clamp(orbBX, 8, 88).toFixed(2)}%`);
  root.style.setProperty("--orb-b-y", `${clamp(orbBY, 16, 90).toFixed(2)}%`);
  root.style.setProperty("--orb-c-x", `${clamp(orbCX, 14, 94).toFixed(2)}%`);
  root.style.setProperty("--orb-c-y", `${clamp(orbCY, 8, 92).toFixed(2)}%`);
  root.style.setProperty("--orb-rotate", `${((progress - 0.5) * 18).toFixed(2)}deg`);
  root.style.setProperty("--orb-scale", `${(1 + softWave * 0.08).toFixed(3)}`);
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
