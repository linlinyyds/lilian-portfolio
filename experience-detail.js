const detail = document.querySelector("#experienceDetail");
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
    "experience.loading": "Loading experience...",
    "experience.kicker": "EXPERIENCE",
    "experience.back": "← Back to work",
    "experience.date": "DATE",
    "experience.role": "ROLE",
    "experience.focus": "FOCUS",
    "experience.scope": "SCOPE",
    "experience.notFoundKicker": "EXPERIENCE",
    "experience.notFoundTitle": "Experience not found",
    "experience.notFoundText": "This experience could not be found. Please return to the work section and choose another item."
  },
  zh: {
    "experience.loading": "正在加载经历...",
    "experience.kicker": "工作经历",
    "experience.back": "← 返回工作经历",
    "experience.date": "时间",
    "experience.role": "角色",
    "experience.focus": "重点",
    "experience.scope": "职责范围",
    "experience.notFoundKicker": "工作经历",
    "experience.notFoundTitle": "未找到经历",
    "experience.notFoundText": "没有找到这段经历，请返回工作经历区域选择其他内容。"
  }
};

const experiences = [
  {
    slug: "icered",
    company: "ICERED",
    date: "2025 - Present",
    role: "AI Product Manager · Interaction Experience",
    summary: "AI social product, conversational interaction, design-to-code and product delivery.",
    focus: ["AI social product", "Conversational interaction", "Design-to-code", "Product delivery"],
    scopeTitle: "From conversational interaction to product delivery",
    scope: "The work connects user scenarios, AI conversation flows and product execution. It focuses on shaping AI social product interactions, clarifying product requirements and moving design concepts toward buildable delivery.",
    zh: {
      company: "ICERED",
      date: "2025 - 至今",
      role: "AI 产品经理 · 交互体验",
      summary: "AI 社交产品、对话式交互、Design-to-code 与产品交付。",
      focus: ["AI 社交产品", "对话式交互", "Design-to-code", "产品交付"],
      scopeTitle: "从对话交互到产品落地",
      scope: "这段工作连接用户场景、AI 对话流程与产品执行，重点包括 AI 社交产品交互设计、产品需求梳理，以及将设计概念推进到可开发和可交付的阶段。"
    }
  },
  {
    slug: "nio",
    company: "NIO",
    date: "2024",
    role: "Service Design Intern · UX",
    summary: "Vehicle service digitalisation, service blueprint and app experience.",
    focus: ["Vehicle service digitalisation", "Service blueprint", "App experience", "UX support"],
    scopeTitle: "Service design for digital vehicle-service touchpoints",
    scope: "The internship focused on vehicle-service digitalisation and the user experience around service touchpoints. The work included understanding service flows, mapping blueprint logic and supporting app-side experience design.",
    zh: {
      company: "蔚来汽车",
      date: "2024",
      role: "服务设计实习生 · UX",
      summary: "车辆服务数字化、服务蓝图与 App 体验。",
      focus: ["车辆服务数字化", "服务蓝图", "App 体验", "UX 支持"],
      scopeTitle: "面向车辆服务触点的数字化服务设计",
      scope: "这段实习聚焦车辆服务数字化和服务触点中的用户体验，包括理解服务流程、梳理服务蓝图逻辑，并支持 App 端体验设计。"
    }
  }
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function t(key) {
  return staticTranslations[currentLanguage]?.[key] || staticTranslations.en[key] || "";
}

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || experiences[0].slug;
}

function getExperienceCopy(experience) {
  return {
    ...experience,
    ...(currentLanguage === "zh" ? experience.zh : {})
  };
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

function renderNotFound() {
  detail.innerHTML = `
    <section class="experience-hero detail-empty">
      <p class="detail-kicker">${t("experience.notFoundKicker")}</p>
      <h1>${t("experience.notFoundTitle")}</h1>
      <p>${t("experience.notFoundText")}</p>
      <a class="back-link" href="index.html#about">${t("experience.back")}</a>
    </section>
  `;
}

function renderExperience(experience) {
  const copy = getExperienceCopy(experience);

  detail.innerHTML = `
    <section class="experience-hero">
      <a class="back-link" href="index.html#about">${t("experience.back")}</a>
      <div class="experience-title-block">
        <p class="detail-kicker">${t("experience.kicker")}</p>
        <h1>${copy.company}</h1>
        <p>${copy.summary}</p>
      </div>
    </section>

    <section class="experience-overview" aria-label="Experience overview">
      <div>
        <span>${t("experience.date")}</span>
        <p>${copy.date}</p>
      </div>
      <div>
        <span>${t("experience.role")}</span>
        <p>${copy.role}</p>
      </div>
      <div>
        <span>${t("experience.focus")}</span>
        <p>${copy.focus.join(" / ")}</p>
      </div>
    </section>

    <section class="experience-story">
      <p class="detail-label">${t("experience.scope")}</p>
      <div>
        <h2>${copy.scopeTitle}</h2>
        <p>${copy.scope}</p>
      </div>
    </section>
  `;
}

function updateScrollLight() {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = window.scrollY / maxScroll;
  const driftX = Math.sin(progress * Math.PI * 1.4) * 16;
  const driftY = Math.cos(progress * Math.PI * 1.2) * 14;

  root.style.setProperty("--scroll-glow", `${Math.round(progress * 120)}px`);
  root.style.setProperty("--scroll-drift-x", `${driftX.toFixed(1)}px`);
  root.style.setProperty("--scroll-drift-y", `${driftY.toFixed(1)}px`);
  root.style.setProperty("--orb-rotate", `${(progress * 18).toFixed(1)}deg`);
}

function setupLightField() {
  if (motionQuery.matches) return;

  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") return;
      const dx = event.clientX - lightState.targetX;
      const dy = event.clientY - lightState.targetY;
      const speed = Math.min(Math.hypot(dx, dy), 420);
      const stretch = speed / 2800;

      lightState.targetX += (event.clientX - lightState.targetX) * 0.42;
      lightState.targetY += (event.clientY - lightState.targetY) * 0.42;

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
const experience = experiences.find((item) => item.slug === slug);

applyStaticTranslations();

if (experience) {
  renderExperience(experience);
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
    if (experience) {
      renderExperience(experience);
    } else {
      renderNotFound();
    }
  });
}
