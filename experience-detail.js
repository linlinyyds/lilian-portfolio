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
    caseStudy: {
      heroTitle: "Making AI social interaction understandable",
      subtitle: "Designing chat, AI assistant and virtual users for cross-border users.",
      tags: ["AI Product", "Interaction Design", "Vibe Coding", "Pre-launch System"],
      summaryCards: [
        "AI Social Product",
        "Chat + AI Assistant + Virtual Users",
        "~10 Frontend Pages",
        "~50 GitHub Issues"
      ],
      contextTitle: "Context",
      context: "ICERED is an AI social product for cross-border users. The challenge is not features, but clarity of AI interaction: users must understand what the system is doing.",
      roleTitle: "My Role",
      roleItems: [
        "Product framing across modules",
        "AI interaction design",
        "Figma to code with Claude and Codex",
        "Testing and GitHub issue loop"
      ],
      focusTitle: "Focus Areas",
      focusAreas: [
        "AI response states: loading / fail / retry",
        "Chat continuity",
        "Virtual user behavior",
        "System feedback clarity"
      ],
      breakdownTitle: "Key Work Breakdown",
      breakdown: [
        { title: "AI state design", text: "Make AI behavior visible before, during and after a response." },
        { title: "Chat system", text: "Shape a continuous interaction flow across user, assistant and virtual users." },
        { title: "Design-to-code", text: "Use AI coding tools to move from prototype to usable frontend faster." },
        { title: "Testing loop", text: "Track issues in GitHub so design, frontend and backend feedback can be resolved." }
      ],
      workflowTitle: "AI + Vibe Coding Flow",
      workflow: ["User signal", "Design", "Prototype", "AI Code", "Test", "Issue", "Iterate"],
      metricsTitle: "Impact Metrics",
      metrics: [
        { value: "~10", label: "Frontend pages" },
        { value: "~50", label: "GitHub issues" },
        { value: "5", label: "Backend issues supported" },
        { value: "3-day", label: "Testing cycle" }
      ],
      insightTitle: "Key Insight",
      insight: "AI experience is not intelligence. It is clarity of system state.",
      previousLabel: "← NIO Case Study",
      backLabel: "Back to Work"
    },
    zh: {
      company: "ICERED",
      date: "2025 - 至今",
      role: "AI 产品经理 · 交互体验",
      summary: "AI 社交产品、对话式交互、Design-to-code 与产品交付。",
      focus: ["AI 社交产品", "对话式交互", "Design-to-code", "产品交付"],
      scopeTitle: "从对话交互到产品落地",
      scope: "这段工作连接用户场景、AI 对话流程与产品执行，重点包括 AI 社交产品交互设计、产品需求梳理，以及将设计概念推进到可开发和可交付的阶段。",
      caseStudy: {
        heroTitle: "让 AI 社交交互更容易被理解",
        subtitle: "为跨境用户设计聊天、AI 助手和虚拟用户体验。",
        tags: ["AI 产品", "交互设计", "Vibe Coding", "上线前系统"],
        summaryCards: [
          "AI 社交产品",
          "聊天 + AI 助手 + 虚拟用户",
          "约 10 个前端页面",
          "约 50 个 GitHub Issues"
        ],
        contextTitle: "项目背景",
        context: "ICERED 是一个面向跨境用户的 AI 社交产品。真正的挑战不是功能数量，而是 AI 交互的清晰度：用户需要理解系统正在做什么。",
        roleTitle: "我的职责",
        roleItems: [
          "跨模块产品框架梳理",
          "AI 交互体验设计",
          "Figma 到代码，结合 Claude 与 Codex",
          "测试与 GitHub issue 迭代闭环"
        ],
        focusTitle: "设计重点",
        focusAreas: [
          "AI 响应状态：加载 / 失败 / 重试",
          "聊天连续性",
          "虚拟用户行为",
          "系统反馈清晰度"
        ],
        breakdownTitle: "关键工作拆解",
        breakdown: [
          { title: "AI 状态设计", text: "让 AI 在响应前、响应中和响应后的行为都能被用户理解。" },
          { title: "聊天系统", text: "梳理用户、助手和虚拟用户之间的连续交互流程。" },
          { title: "Design-to-code", text: "用 AI 编码工具更快把原型推进到可用前端页面。" },
          { title: "测试闭环", text: "通过 GitHub 追踪问题，让设计、前端和后端反馈能持续被解决。" }
        ],
        workflowTitle: "AI + Vibe Coding 流程",
        workflow: ["用户信号", "设计", "原型", "AI 编码", "测试", "Issue", "迭代"],
        metricsTitle: "影响指标",
        metrics: [
          { value: "约 10", label: "前端页面" },
          { value: "约 50", label: "GitHub Issues" },
          { value: "5", label: "支持后端问题" },
          { value: "3 天", label: "测试周期" }
        ],
        insightTitle: "关键洞察",
        insight: "AI 体验不是智能本身，而是系统状态的清晰表达。",
        previousLabel: "← NIO 案例",
        backLabel: "返回工作经历"
      }
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
  const pathMatch = window.location.pathname.match(/\/work\/([^/]+)/);
  return params.get("slug") || pathMatch?.[1] || experiences[0].slug;
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

function renderList(items, className = "case-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderCaseStudy(copy) {
  const caseStudy = copy.caseStudy;

  detail.innerHTML = `
    <section class="experience-hero case-hero">
      <a class="back-link" href="index.html#about">${t("experience.back")}</a>
      <div class="case-hero-grid">
        <div class="experience-title-block">
          <p class="detail-kicker">${t("experience.kicker")}</p>
          <h1>${caseStudy.heroTitle}</h1>
          <p>${caseStudy.subtitle}</p>
          <div class="case-tags" aria-label="Case tags">
            ${caseStudy.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </div>
        <div class="case-flow-panel" aria-label="${caseStudy.workflowTitle}">
          <span class="case-panel-kicker">${caseStudy.workflowTitle}</span>
          <div class="case-mini-flow">
            ${caseStudy.workflow.map((step, index) => `
              <span>${step}</span>
              ${index < caseStudy.workflow.length - 1 ? `<i aria-hidden="true">→</i>` : ""}
            `).join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="case-summary-grid" aria-label="ICERED summary">
      ${caseStudy.summaryCards.map((card) => `<div class="case-summary-card">${card}</div>`).join("")}
    </section>

    <section class="case-section">
      <p class="detail-label">${caseStudy.contextTitle}</p>
      <div class="case-copy">
        <h2>${caseStudy.contextTitle}</h2>
        <p>${caseStudy.context}</p>
      </div>
    </section>

    <section class="case-section">
      <p class="detail-label">${caseStudy.roleTitle}</p>
      <div class="case-two-column">
        <div>
          <h2>${caseStudy.roleTitle}</h2>
          ${renderList(caseStudy.roleItems)}
        </div>
        <div>
          <h2>${caseStudy.focusTitle}</h2>
          ${renderList(caseStudy.focusAreas)}
        </div>
      </div>
    </section>

    <section class="case-section">
      <p class="detail-label">${caseStudy.breakdownTitle}</p>
      <div class="case-breakdown">
        ${caseStudy.breakdown.map((item, index) => `
          <article class="case-breakdown-item">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="case-section">
      <p class="detail-label">${caseStudy.workflowTitle}</p>
      <div class="case-workflow">
        ${caseStudy.workflow.map((step, index) => `
          <span>${step}</span>
          ${index < caseStudy.workflow.length - 1 ? `<i aria-hidden="true">→</i>` : ""}
        `).join("")}
      </div>
    </section>

    <section class="case-section">
      <p class="detail-label">${caseStudy.metricsTitle}</p>
      <div class="case-metrics-grid">
        ${caseStudy.metrics.map((metric) => `
          <div class="case-metric">
            <strong>${metric.value}</strong>
            <span>${metric.label}</span>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="case-insight">
      <p class="detail-label">${caseStudy.insightTitle}</p>
      <blockquote>${caseStudy.insight}</blockquote>
    </section>

    <nav class="case-footer-nav" aria-label="Experience navigation">
      <a href="experience.html?slug=nio">${caseStudy.previousLabel}</a>
      <a href="index.html#about">${caseStudy.backLabel}</a>
    </nav>
  `;
}

function renderExperience(experience) {
  const copy = getExperienceCopy(experience);

  if (copy.caseStudy) {
    renderCaseStudy(copy);
    return;
  }

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
