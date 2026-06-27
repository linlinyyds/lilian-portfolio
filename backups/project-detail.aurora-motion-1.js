const projects = window.LILIAN_PROJECTS || [];
const projectTranslations = window.LILIAN_PROJECT_TRANSLATIONS || {};
const detail = document.querySelector("#projectDetail");
const themeToggle = document.querySelector(".theme-toggle");
const languageToggle = document.querySelector(".language-toggle");
const root = document.documentElement;
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const lightState = {
  x: window.innerWidth * 0.52,
  y: window.innerHeight * 0.38,
  targetX: window.innerWidth * 0.52,
  targetY: window.innerHeight * 0.38
};
let lightShapeTimer;
let currentLanguage = window.localStorage.getItem("lilian-language") === "zh" ? "zh" : "en";

const staticTranslations = {
  en: {
    "detailNav.projects": "All Projects",
    "nav.about": "About",
    "nav.gallery": "Gallery",
    "detail.loading": "Loading project...",
    "detail.notFoundKicker": "PROJECT",
    "detail.notFoundTitle": "Project not found",
    "detail.notFoundText": "This project could not be found. Please return to the project list and choose another one.",
    "detail.back": "← Back to projects",
    "detail.role": "ROLE",
    "detail.year": "YEAR",
    "detail.tags": "TAGS",
    "detail.intro": "INTRO",
    "detail.challenge": "CHALLENGE",
    "detail.approach": "APPROACH",
    "detail.outcome": "OUTCOME",
    "detail.videoFallback": "Your browser does not support the video tag."
  },
  zh: {
    "detailNav.projects": "所有项目",
    "nav.about": "关于",
    "nav.gallery": "画廊",
    "detail.loading": "正在加载项目...",
    "detail.notFoundKicker": "项目",
    "detail.notFoundTitle": "未找到项目",
    "detail.notFoundText": "没有找到这个项目，请返回项目列表选择其他内容。",
    "detail.back": "← 返回项目",
    "detail.role": "角色",
    "detail.year": "年份",
    "detail.tags": "标签",
    "detail.intro": "简介",
    "detail.challenge": "挑战",
    "detail.approach": "方法",
    "detail.outcome": "成果",
    "detail.videoFallback": "当前浏览器不支持视频播放。"
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
  const translatedSections = translation.sections || [];

  return {
    ...project,
    ...translation,
    tags: translation.tags || project.tags,
    approach: translation.approach || project.approach,
    sections: project.sections.map((section, index) => ({
      ...section,
      ...(translatedSections[index] || {})
    }))
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
    if (text) element.textContent = text;
  });

  updateLanguageToggle();
}

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || projects[0]?.slug || "";
}

function renderNotFound() {
  detail.innerHTML = `
    <section class="detail-hero detail-empty">
      <p class="detail-kicker">${t("detail.notFoundKicker")}</p>
      <h1>${t("detail.notFoundTitle")}</h1>
      <p>${t("detail.notFoundText")}</p>
      <a class="back-link" href="index.html#project">${t("detail.back")}</a>
    </section>
  `;
}

function renderSectionMedia(section) {
  if (section.video) {
    const poster = section.poster ? ` poster="${section.poster}"` : "";
    const type = section.videoType || "video/mp4";

    return `
      <div class="material-video">
        <video controls playsinline preload="metadata"${poster}>
          <source src="${section.video}" type="${type}">
          ${t("detail.videoFallback")}
        </video>
      </div>
    `;
  }

  if (!section.image) {
    return "";
  }

  return `
    <a class="material-image" href="${section.image}" target="_blank" rel="noreferrer">
      <img src="${section.image}" alt="${section.title}">
    </a>
  `;
}

function renderProject(project, index) {
  const copy = getProjectCopy(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const previousCopy = getProjectCopy(previous);
  const nextCopy = getProjectCopy(next);

  detail.innerHTML = `
    <section class="detail-hero">
      <a class="back-link" href="index.html#project">${t("detail.back")}</a>
      <div class="detail-title-block">
        <p class="detail-kicker">${copy.meta}</p>
        <h1>${copy.title}</h1>
        <p>${copy.summary}</p>
      </div>
      <div class="detail-cover">
        <img src="${project.image}" alt="${copy.title} cover">
      </div>
    </section>

    <section class="detail-overview">
      <div>
        <span class="detail-label">${t("detail.role")}</span>
        <p>${copy.role}</p>
      </div>
      <div>
        <span class="detail-label">${t("detail.year")}</span>
        <p>${copy.year}</p>
      </div>
      <div>
        <span class="detail-label">${t("detail.tags")}</span>
        <p>${copy.tags.join(" · ")}</p>
      </div>
    </section>

    <section class="detail-story">
      <div>
        <span class="detail-label">${t("detail.intro")}</span>
        <p>${copy.intro}</p>
      </div>
      <div>
        <span class="detail-label">${t("detail.challenge")}</span>
        <p>${copy.challenge}</p>
      </div>
    </section>

    <section class="detail-process">
      <span class="detail-label">${t("detail.approach")}</span>
      <ol>
        ${copy.approach.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    </section>

    <section class="detail-materials">
      ${copy.sections
        .map(
          (section) => `
            <article class="material-card${section.wide ? " is-wide" : ""}${section.video ? " has-video" : ""}">
              <div class="material-copy">
                <span class="detail-label">${section.label}</span>
                <h2>${section.title}</h2>
                <p>${section.text}</p>
              </div>
              ${renderSectionMedia(section)}
            </article>
          `
        )
        .join("")}
    </section>

    <section class="detail-outcome">
      <span class="detail-label">${t("detail.outcome")}</span>
      <p>${copy.outcome}</p>
    </section>

    <nav class="project-pager" aria-label="Project switcher">
      <a href="project.html?slug=${previous.slug}">← ${previousCopy.title}</a>
      <a href="project.html?slug=${next.slug}">${nextCopy.title} →</a>
    </nav>
  `;

  document.title = `${copy.title} · Lilian Portfolio`;
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
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    root.style.setProperty("--cursor-alpha", "0");
  });
  window.addEventListener("scroll", updateScrollLight, { passive: true });
}

const slug = getSlug();
const index = projects.findIndex((project) => project.slug === slug);
const project = projects[index];

applyStaticTranslations();

if (project) {
  renderProject(project, index);
} else {
  renderNotFound();
}

setupLightField();
setTheme(window.localStorage.getItem("lilian-theme") === "dark" ? "dark" : "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
  });
}

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    window.localStorage.setItem("lilian-language", currentLanguage);
    applyStaticTranslations();
    if (project) {
      renderProject(project, index);
    } else {
      renderNotFound();
    }
  });
}
