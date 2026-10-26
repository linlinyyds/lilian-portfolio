const detail = document.querySelector("#experienceDetail");
const themeToggle = document.querySelector(".theme-toggle");
const languageToggle = document.querySelector(".language-toggle");
const root = document.documentElement;
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
let currentLanguage = ["zh", "en"].includes(requestedLanguage) ? requestedLanguage : (window.localStorage.getItem("lilian-language") === "en" ? "en" : "zh");

const staticTranslations = {
  en: {
    "experience.loading": "Loading experience...",
    "experience.kicker": "EXPERIENCE",
    "experience.back": "← Back to About",
    "experience.date": "DATE / LOCATION",
    "experience.role": "ROLE",
    "experience.focus": "FOCUS",
    "experience.scope": "SCOPE",
    "experience.notFoundKicker": "EXPERIENCE",
    "experience.notFoundTitle": "Experience not found",
    "experience.notFoundText": "This experience could not be found. Return to About to browse the experience list."
  },
  zh: {
    "experience.loading": "正在加载经历...",
    "experience.kicker": "工作经历",
    "experience.back": "← 返回关于我",
    "experience.date": "时间 / 地点",
    "experience.role": "角色",
    "experience.focus": "重点",
    "experience.scope": "职责范围",
    "experience.notFoundKicker": "工作经历",
    "experience.notFoundTitle": "未找到经历",
    "experience.notFoundText": "没有找到这段经历，请返回关于我，浏览工作经历列表。"
  }
};

const experiences = [
  {
    "slug": "desay-sv",
    "company": "Desay SV",
    "date": "2026.08 – Present",
    "location": "Guangdong, China",
    "role": "Innovation Experience Design Engineer · Technical R&D Team",
    "summary": "Automotive HMI interaction and delivery, interface adaptation, and generative HMI application planning.",
    "focus": [
      "HMI interaction",
      "UE specifications and delivery",
      "Generative HMI",
      "AI cockpit UI"
    ],
    "scopeTitle": "Connecting HMI interaction delivery with generative design workflows",
    "scope": "My work spans vehicle and two-wheeler interaction design, requirements reviews, UE documentation and version delivery. Alongside project delivery, I lead application-solution and implementation-path planning for generative HMI.",
    "sections": [
      {
        "title": "Multi-brand HMI interaction and UE documentation",
        "body": "Participate in vehicle and two-wheeler projects, mapping user tasks, feature flows, page transitions and state feedback. Produce and maintain UE documents to support design reviews and version delivery."
      },
      {
        "title": "Requirements, boundaries and version delivery",
        "body": "Participate in requirements and development reviews, handle interaction changes, project handovers and document maintenance. Clarify cross-page logic and exception flows, and follow review feedback through documentation updates."
      },
      {
        "title": "Generative HMI application planning",
        "body": "Lead application-solution and implementation-path planning. Explore how multimodal style understanding, reusable component templates and interface generation can work together, and define prototype tasks and quality criteria for multi-page consistency, local editing and high-resolution output."
      },
      {
        "title": "Interface adaptation and AI cockpit UI",
        "body": "Adapt layouts, component proportions and information hierarchy to screen specifications and existing design rules. Support AI cockpit UI iterations through visual checks, component presentation and detail refinement."
      },
      {
        "title": "Scenario research",
        "body": "Help organise the experience-scenario library by category, user task and trigger, providing scenario inputs for cockpit concepts and generative HMI research."
      }
    ],
    "zh": {
      "company": "德赛西威",
      "date": "2026.08 – 至今",
      "location": "广东",
      "role": "创新体验设计工程师 · 技术研发组",
      "summary": "智能座舱交互与交付、界面适配，以及生成式 HMI 应用方案与实施路径设计。",
      "focus": [
        "HMI 交互",
        "UE 规范与交付",
        "生成式 HMI",
        "AI 座舱 UI"
      ],
      "scopeTitle": "连接座舱交互交付与生成式设计流程",
      "scope": "参与车机与二轮车交互设计、需求评审、UE 文档和版本交付；同时主导生成式 HMI 应用方案与实施路径设计，将交互规范、组件模板和原型验证任务纳入技术方案。",
      "sections": [
        {
          "title": "多品牌 HMI 交互与 UE 文档",
          "body": "参与多品牌车机及二轮车项目，梳理用户任务、功能流程、页面跳转与状态反馈，输出和维护 UE 设计文档，支持设计评审与版本交付。"
        },
        {
          "title": "需求边界与版本交付",
          "body": "参与需求与开发评审，承接需求变更、交互方案调整、项目交接和版本维护。梳理跨页面逻辑、交互边界与异常流程，跟进评审意见并同步文档。"
        },
        {
          "title": "生成式 HMI 应用方案",
          "body": "主导应用方案与实施路径设计，探索多模态风格理解、组件模板复用与界面生成的协同流程。围绕多页一致性、局部修改与高清输出，梳理技术路线、原型验证任务和质量评估标准。"
        },
        {
          "title": "界面适配与 AI 座舱 UI",
          "body": "依据屏幕规格和既有设计规范调整布局、组件比例与信息层级，进行跨分辨率适配与视觉校验；参与 AI 座舱 UI 优化，完善组件呈现和视觉细节。"
        },
        {
          "title": "用户体验场景研究",
          "body": "协同梳理体验场景库的分类、用户任务与触发条件，为座舱创新方案和生成式 HMI 研究提供场景依据。"
        }
      ]
    }
  },
  {
    "slug": "icered",
    "company": "ICERED",
    "date": "2025.10 – 2026.07",
    "location": "Shanghai, China",
    "role": "AI Product Manager",
    "summary": "AI social product for overseas users: requirements, interaction prototypes, AI-assisted frontend implementation and pre-launch testing.",
    "focus": [
      "AI social product",
      "Interaction design",
      "AI-assisted development",
      "Requirements and acceptance"
    ],
    "scopeTitle": "From user feedback to testable product delivery",
    "scope": "Participated in iterations across social, chat, AI assistant and virtual-user modules. Translated feedback into requirements, user flows and acceptance criteria, and supported prioritisation, English-language collaboration and version delivery.",
    "caseStudy": {
      "heroTitle": "From AI product requirements to testable interactions",
      "heroLines": [
        "AI product",
        "interaction",
        "and delivery"
      ],
      "heroHighlightIndex": 1,
      "subtitle": "AI Product Manager at ICERED, working across requirements, interaction prototypes and pre-launch testing for an AI social app serving overseas users.",
      "tags": [
        "AI Product",
        "Interaction Design",
        "AI-assisted Development",
        "English Collaboration"
      ],
      "summaryLabels": [
        "Period / Location",
        "Role",
        "Product Scope",
        "Delivery Scope"
      ],
      "summaryCards": [
        "2025.10 – 2026.07 · Shanghai",
        "AI Product Manager",
        "Social · Chat · AI Assistant · Virtual Users",
        "Requirements · Prototypes · Testing · Acceptance"
      ],
      "contextTitle": "Context",
      "contextLead": "An AI social app for overseas users.",
      "context": "The work covered four product modules: social, chat, AI assistant and virtual users. My focus connected user feedback, interaction requirements, testable frontend implementations and traceable issue follow-up.",
      "roleTitle": "My Responsibilities",
      "roleItems": [
        "Translate feedback into requirements, user flows and acceptance criteria",
        "Support prioritisation by impact, development cost and release risk",
        "Turn Figma designs into code drafts and testable implementations using Claude Code, Codex and Cursor",
        "Align scope, release cadence and delivery risks with overseas market and engineering teams in English"
      ],
      "focusTitle": "Interaction and Delivery Focus",
      "focusAreas": [
        "User flows across four modules",
        "Interaction states and expected behaviour",
        "Frontend prototype checks",
        "Issue reproduction and acceptance criteria"
      ],
      "breakdownTitle": "Key Work",
      "breakdown": [
        {
          "title": "Requirements and Priorities",
          "icon": "↯",
          "text": "Translate user feedback into feature requirements and flows, define acceptance criteria, and participate in priority decisions based on scope, effort and release risk."
        },
        {
          "title": "Design to Testable Frontend",
          "icon": "▱",
          "text": "Use Claude Code, Codex and Cursor to produce code drafts and testable implementations for around 10 frontend pages. Break down tasks, organise context and iterate through debugging and interaction checks."
        },
        {
          "title": "English-language Collaboration",
          "icon": "↻",
          "text": "Work with overseas market and engineering teams in English to clarify requirements, review designs and align feature scope, release cadence and delivery risks."
        },
        {
          "title": "Pre-launch Testing and Acceptance",
          "icon": "⌘",
          "text": "Participate in pre-launch test rounds roughly every three days. Organise and follow up close to 50 GitHub issues with reproduction steps, priorities, expected results and acceptance criteria, tracking them through fixes and acceptance checks."
        }
      ],
      "workflowTitle": "Requirements to Acceptance",
      "workflow": [
        "Feedback",
        "Requirements",
        "Priority",
        "Prototype",
        "Test",
        "Issue",
        "Acceptance"
      ],
      "metricsTitle": "Delivery Scale and Iteration",
      "metrics": [
        {
          "value": "~10",
          "label": "Frontend pages: code drafts and testable implementations"
        },
        {
          "value": "~50",
          "label": "GitHub issues organised and followed up"
        },
        {
          "value": "~3",
          "label": "Days between pre-launch test rounds attended"
        },
        {
          "value": "4",
          "label": "Product modules covered"
        }
      ],
      "insightTitle": "Working Principle",
      "insightLines": [
        "Define the behaviour.",
        "Make it testable.",
        "Follow it through acceptance."
      ],
      "insightHighlightIndex": 1,
      "insight": "Define the behaviour. Make it testable. Follow it through acceptance.",
      "previousLabel": "← NIO Experience",
      "backLabel": "Back to About"
    },
    "zh": {
      "company": "ICERED",
      "date": "2025.10 – 2026.07",
      "location": "上海",
      "role": "AI 产品经理",
      "summary": "面向海外用户的 AI 社交产品，覆盖需求、交互原型、AI 辅助前端实现与上线前测试。",
      "focus": [
        "AI 社交产品",
        "交互设计",
        "AI 辅助研发",
        "需求与验收"
      ],
      "scopeTitle": "从用户反馈到可测试的产品交付",
      "scope": "参与社交、聊天、AI 助手、虚拟用户四模块迭代，将反馈转化为需求、用户流程和验收标准，协同优先级判断、英文跨团队沟通与版本交付。",
      "caseStudy": {
        "heroTitle": "从 AI 产品需求到可测试的交互实现",
        "heroLines": [
          "AI 产品需求",
          "交互实现",
          "与交付"
        ],
        "heroHighlightIndex": 1,
        "subtitle": "在 ICERED 担任 AI 产品经理，为面向海外用户的 AI 社交 App 参与需求梳理、交互原型与上线前测试。",
        "tags": [
          "AI 产品",
          "交互设计",
          "AI 辅助研发",
          "英文跨团队协作"
        ],
        "summaryLabels": [
          "时间 / 地点",
          "角色",
          "产品范围",
          "交付范围"
        ],
        "summaryCards": [
          "2025.10 – 2026.07 · 上海",
          "AI 产品经理",
          "社交 · 聊天 · AI 助手 · 虚拟用户",
          "需求 · 原型 · 测试 · 验收"
        ],
        "contextTitle": "项目背景",
        "contextLead": "面向海外用户的 AI 社交 App。",
        "context": "工作覆盖社交、聊天、AI 助手、虚拟用户四个模块，连接用户反馈、交互需求、可测试的前端实现与可追踪的问题跟进。",
        "roleTitle": "我的职责",
        "roleItems": [
          "将用户反馈转化为功能需求、用户流程与验收标准",
          "依据影响范围、开发成本和上线风险，参与优先级判断",
          "使用 Claude Code、Codex、Cursor，将 Figma 方案转为代码草稿与可测试实现",
          "与海外市场和技术团队英文沟通，对齐功能范围、版本节奏和交付风险"
        ],
        "focusTitle": "交互与交付重点",
        "focusAreas": [
          "四模块用户流程",
          "交互状态与预期行为",
          "前端原型实现走查",
          "问题复现与验收标准"
        ],
        "breakdownTitle": "关键工作",
        "breakdown": [
          {
            "title": "需求与优先级",
            "icon": "↯",
            "text": "将用户反馈转化为功能需求与用户流程，明确验收标准，并依据影响范围、开发成本和上线风险参与优先级判断。"
          },
          {
            "title": "设计到可测试前端",
            "icon": "▱",
            "text": "运用 Claude Code、Codex、Cursor，将 Figma 方案转为约 10 个前端页面的代码草稿与可测试实现。通过任务拆解、上下文组织与迭代调试，完成交互状态验证和实现走查。"
          },
          {
            "title": "英文跨团队协作",
            "icon": "↻",
            "text": "与海外市场及技术团队开展英文沟通，协同需求澄清、设计评审和研发对接，对齐功能范围、版本节奏与交付风险。"
          },
          {
            "title": "上线前测试与验收",
            "icon": "⌘",
            "text": "约每 3 天参与一轮上线前测试，累计整理并跟进近 50 个 GitHub issue，明确复现路径、优先级、预期结果与验收标准，跟进问题修复和验收确认。"
          }
        ],
        "workflowTitle": "从需求到验收",
        "workflow": [
          "用户反馈",
          "需求拆解",
          "优先级",
          "原型实现",
          "测试",
          "Issue",
          "验收"
        ],
        "metricsTitle": "交付规模与迭代",
        "metrics": [
          {
            "value": "约10",
            "label": "个前端页面的代码草稿与可测试实现"
          },
          {
            "value": "近50",
            "label": "个 GitHub issue 整理并跟进"
          },
          {
            "value": "约3",
            "label": "天参与一轮上线前测试"
          },
          {
            "value": "4",
            "label": "个业务模块"
          }
        ],
        "insightTitle": "工作原则",
        "insightLines": [
          "明确交互行为。",
          "形成可测试实现。",
          "跟进至验收确认。"
        ],
        "insightHighlightIndex": 1,
        "insight": "明确交互行为，形成可测试实现，跟进至验收确认。",
        "previousLabel": "← 蔚来工作经历",
        "backLabel": "返回关于我"
      }
    }
  },
  {
    "slug": "nio",
    "company": "NIO",
    "date": "2024.04 – 2024.08",
    "location": "Shanghai, China",
    "role": "Service Design Intern · UX Design",
    "summary": "Vehicle annual-inspection service digitalisation: user research, service flows and app experience.",
    "focus": [
      "User research",
      "Service blueprint",
      "Information flow",
      "States and exceptions"
    ],
    "scopeTitle": "Connecting offline service procedures with online user flows",
    "scope": "Participated in the digitalisation of vehicle annual-inspection services, focusing on booking, document submission, progress tracking and vehicle return. Supported the translation of offline SOPs into app-side product flows.",
    "sections": [
      {
        "title": "User journey and service blueprint",
        "body": "Participated in user research, journey mapping and service-blueprint work across the four service touchpoints, considering how vehicle owners, customer support, suppliers and inspection agencies exchange information."
      },
      {
        "title": "Online flows, states and exceptions",
        "body": "Supported information architecture, field specifications, state feedback and exception-flow design. Worked with product, customer support, suppliers and testing teams on walkthroughs and validation, supporting standardised information flows and online service delivery."
      }
    ],
    "zh": {
      "company": "蔚来汽车",
      "date": "2024.04 – 2024.08",
      "location": "上海",
      "role": "服务设计实习生 · UX 设计",
      "summary": "车辆年检服务数字化，涉及用户研究、服务流程与 App 体验。",
      "focus": [
        "用户研究",
        "服务蓝图",
        "信息流",
        "状态与异常"
      ],
      "scopeTitle": "连接线下服务 SOP 与线上用户流程",
      "scope": "参与车辆年检服务数字化，围绕预约、资料提交、进度追踪与车辆归还四个节点，支持将线下 SOP 转化为 App 端产品流程。",
      "sections": [
        {
          "title": "用户旅程与服务蓝图",
          "body": "参与用户研究、用户旅程与服务蓝图梳理，关注车主、客服、供应商及检测机构在四个服务节点中的协作与信息传递。"
        },
        {
          "title": "线上流程、状态与异常",
          "body": "参与信息架构、字段规范、状态反馈与异常流程设计，与产品、客服、供应商和测试团队完成走查与验证，支持多角色信息流标准化和年检流程线上化落地。"
        }
      ]
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
  window.localStorage.setItem("lilian-language", currentLanguage);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const text = t(element.dataset.i18n);
    if (text) element.textContent = text;
  });

  updateLanguageToggle();
}

function renderNotFound() {
  document.body.classList.remove("case-study-page");
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

function renderCaseTitle(lines, highlightIndex = -1) {
  return lines
    .map((line, index) => `<span class="${index === highlightIndex ? "is-highlighted" : ""}">${line}</span>`)
    .join("");
}

function renderCaseStudy(copy) {
  const caseStudy = copy.caseStudy;
  document.body.classList.add("case-study-page");

  detail.innerHTML = `
    <section class="case-hero">
      <div class="case-shell case-back-row">
        <a class="back-link" href="index.html#about">${t("experience.back")}</a>
      </div>
      <div class="case-shell case-hero-layout">
        <div class="case-hero-copy">
          <p class="case-eyebrow"><span aria-hidden="true"></span>CASE STUDY</p>
          <h1>${renderCaseTitle(caseStudy.heroLines || [caseStudy.heroTitle], caseStudy.heroHighlightIndex)}</h1>
          <p>${caseStudy.subtitle}</p>
        </div>
        <div class="case-tag-list" aria-label="Case tags">
          ${caseStudy.tags.map((tag) => `<span><i aria-hidden="true"></i>${tag}</span>`).join("")}
        </div>
      </div>
      <div class="case-shell case-summary-grid" aria-label="ICERED summary">
        ${caseStudy.summaryCards.map((card, index) => `
          <div class="case-summary-card">
            <span>${caseStudy.summaryLabels[index]}</span>
            <strong>${card}</strong>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="case-shell case-context-role">
      <div class="case-context-block">
        <p class="case-section-label">${caseStudy.contextTitle}</p>
        <h2>${caseStudy.contextLead}</h2>
        <p>${caseStudy.context}</p>
      </div>
      <div class="case-role-block">
        <p class="case-section-label">${caseStudy.roleTitle}</p>
        ${caseStudy.roleItems.map((item, index) => `
          <div class="case-number-row">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <p>${item}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="case-shell case-focus-section">
      <p class="case-section-label">${caseStudy.focusTitle}</p>
      <div class="case-focus-grid">
        ${caseStudy.focusAreas.map((item) => `
          <div class="case-focus-card">
            <span aria-hidden="true"></span>
            <p>${item}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="case-shell case-work-section">
      <p class="case-section-label">${caseStudy.breakdownTitle}</p>
      <div class="case-breakdown">
        ${caseStudy.breakdown.map((item, index) => `
          <article class="case-breakdown-item">
            <div>
              <span>${String(index + 1).padStart(2, "0")}</span>
              <i aria-hidden="true">${item.icon || ""}</i>
            </div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="case-shell case-flow-section">
      <p class="case-section-label">${caseStudy.workflowTitle}</p>
      <div class="case-workflow">
        ${caseStudy.workflow.map((step, index) => `
          <div class="case-workflow-step">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <p>${step}</p>
          </div>
          ${index < caseStudy.workflow.length - 1 ? `<i aria-hidden="true"></i>` : ""}
        `).join("")}
      </div>
    </section>

    <section class="case-shell case-metrics-section">
      <p class="case-section-label">${caseStudy.metricsTitle}</p>
      <div class="case-metrics-grid">
        ${caseStudy.metrics.map((metric) => `
          <div class="case-metric">
            <strong>${metric.value}</strong>
            <span>${metric.label}</span>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="case-shell case-insight">
      <p class="case-section-label"><span aria-hidden="true"></span>${caseStudy.insightTitle}</p>
      <blockquote>
        ${(caseStudy.insightLines || [caseStudy.insight]).map((line, index) => `
          <span class="${index === caseStudy.insightHighlightIndex ? "is-highlighted" : ""}">${line}</span>
        `).join("")}
      </blockquote>
    </section>

    <nav class="case-shell case-footer-nav" aria-label="Experience navigation">
      <a href="experience.html?slug=nio">${caseStudy.previousLabel}</a>
      <a href="index.html#about">${caseStudy.backLabel}</a>
    </nav>
  `;
}

function renderExperience(experience) {
  const copy = getExperienceCopy(experience);
  document.title = currentLanguage === "zh"
    ? `${copy.company} · 周琳作品集`
    : `${copy.company} · Lilian Portfolio`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", copy.summary);

  if (copy.caseStudy) {
    renderCaseStudy(copy);
    return;
  }

  document.body.classList.remove("case-study-page");

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
        <p>${copy.date}${copy.location ? `<br>${copy.location}` : ""}</p>
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
    ${(copy.sections || []).map((section, index) => `
      <section class="experience-story">
        <p class="detail-label">${String(index + 1).padStart(2, "0")}</p>
        <div>
          <h2>${section.title}</h2>
          <p>${section.body}</p>
        </div>
      </section>
    `).join("")}
  `;
}

const slug = getSlug();
const experience = experiences.find((item) => item.slug === slug);

applyStaticTranslations();

if (experience) {
  renderExperience(experience);
} else {
  renderNotFound();
}

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
