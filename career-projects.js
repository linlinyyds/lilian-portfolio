(() => {
  const projects = window.LILIAN_PROJECTS || [];
  const translations = window.LILIAN_PROJECT_TRANSLATIONS || {};
  translations.zh = translations.zh || {};

  const aurora = projects.find((project) => project.slug === "aurora-mood");
  if (aurora) {
    const visualSections = aurora.sections.map((section) => ({ ...section }));
    visualSections[2].text = "The concept targets drivers who value clear information and low-pressure assistance. This framing is a design hypothesis for the proposed AI companion and its role across driving, congestion and rest scenarios.";
    visualSections[3].text = "The shown architecture gives speed, navigation and trip progress a stable place in the HUD. The center display holds richer context, comfort settings and the AI companion. The intended hierarchy is driving information first, optional experience content second; its legibility remains a question for prototype evaluation.";
    visualSections[4].text = "The congestion scenario assumes that traffic context and a possible emotional cue lead to an AI suggestion. The shown flow asks for confirmation before coordinating music, ambient light and seat massage. Rejection, interruption and exit are developed as further design checks below.";
    visualSections[5].text = "The visual proposal explores an AR-style rotating ring for volume adjustment. It describes an interaction concept rather than an implemented recognition system. Activation, feedback, misrecognition and a conventional control alternative are part of the proposed next-stage checks.";
    visualSections[7].text = "The cockpit mockup brings the 21:9 display, restrained HUD, AI companion and ambient visual language together. It communicates the intended spatial relationship and visual direction of the personal concept.";

    const reviewSections = [
      {
        label: "09 Further Design Check",
        title: "Driving and parked modes",
        text: "Proposed rules for the next prototype iteration separate the driver's information needs from richer interactions while parked.",
        points: [
          "While driving, keep core HUD information stable and make optional AI suggestions brief and dismissible.",
          "While parked, allow richer companion content and detailed comfort settings in the center display.",
          "Check mode changes and interrupted tasks so an optional experience cannot hide information needed to continue driving."
        ],
        wide: true
      },
      {
        label: "10 Further Design Check",
        title: "Suggest, confirm, decline and exit",
        text: "The concept's positive flow needs explicit boundaries around AI assistance. These are proposed interaction rules to carry into a prototype.",
        points: [
          "Present an AI recommendation as a suggestion with an identifiable reason, rather than treating an inferred emotional state as certain.",
          "Require an explicit choice before starting the optional comfort scene; provide equally clear accept and decline actions.",
          "Provide a persistent exit and visible feedback about active settings; define which previous settings can be restored when the scene ends."
        ],
        wide: true
      },
      {
        label: "11 Further Design Check",
        title: "Gesture feedback and recovery",
        text: "A future gesture prototype should make the input boundary visible and give users a dependable way to recover from an unintended action.",
        points: [
          "Define an activation cue, a limited adjustment range and visible feedback before a gesture changes volume.",
          "Specify cancellation, inactivity timeout and the response to an unrecognized or ambiguous gesture.",
          "Retain a familiar volume-control alternative and evaluate the concept under both driving and parked conditions."
        ],
        wide: true
      }
    ];

    Object.assign(aurora, {
      meta: "HMI / Personal Concept",
      summary: "A personal cockpit concept exploring the information hierarchy between HUD and center display, AI companionship and ambient interaction.",
      tags: ["HMI", "Personal Concept", "AI Interaction", "Information Architecture"],
      role: "Personal HMI concept, cockpit information architecture, scenario flow and visual design",
      roleScope: "Personal concept work spanning HUD and center-display information hierarchy, an AI companionship scenario and an AR-style gesture proposal.",
      year: "2024",
      stage: "Personal concept · design exploration",
      projectType: "Personal concept",
      deliverables: [
        "Eight visual concept boards",
        "HUD and center-display information architecture",
        "AI companionship scenario and gesture concept",
        "Further interaction rules for prototype review"
      ],
      intro: "Aurora Mood is a personal concept developed in 2024. Eight visual boards explore how a restrained HUD, a richer center display and an AI companion might share a cockpit. The additional interaction rules describe what the next prototype iteration should examine.",
      challenge: "The design question is how to give driving information a clear priority while offering optional, emotionally aware assistance. The concept needs boundaries for AI suggestions, attention-demanding content and unfamiliar gesture input.",
      approach: [
        "Frame a cockpit experience around driving information, contextual assistance and optional companionship.",
        "Separate the HUD's core information from richer center-display content.",
        "Visualize an AI-assisted comfort scene in a congestion scenario.",
        "Explore a gesture concept alongside a conventional control alternative.",
        "Identify further design checks for driving and parked modes, user confirmation and input recovery."
      ],
      outcome: "The concept is documented through eight visual boards and a cockpit mockup. Further rules for mode changes, AI suggestions and gesture recovery define questions for a subsequent interactive prototype and evaluation.",
      sections: [...visualSections, ...reviewSections]
    });

    const existingZh = translations.zh[aurora.slug] || {};
    const visualSectionsZh = (existingZh.sections || []).map((section) => ({ ...section }));
    visualSectionsZh[2].text = "概念面向重视清晰信息与低压辅助体验的驾驶者。这一用户定位作为设计假设，用于推演 AI 伙伴在驾驶、拥堵和休息场景中的角色。";
    visualSectionsZh[3].text = "现有信息架构把速度、导航与行程进度稳定地组织在 HUD 中，中控承载更丰富的语境、舒适设置与 AI 伙伴。设计意图是驾驶信息优先、可选体验内容其次；信息可读性需要在后续原型中检查。";
    visualSectionsZh[4].text = "拥堵场景假设 AI 根据交通语境与可能的情绪线索提出建议。现有流程在用户确认后联动音乐、氛围灯与座椅按摩；拒绝、打断和退出作为下方进一步设计检查展开。";
    visualSectionsZh[5].text = "视觉方案探索通过 AR 风格旋转光环调整音量。它表达交互概念，识别系统的实现仍属于后续工作；激活、反馈、误识别处理与常规控制入口是下一阶段需要检查的内容。";
    visualSectionsZh[7].text = "座舱效果图将 21:9 显示、克制的 HUD、AI 伙伴与氛围视觉整合在一起，呈现个人概念的空间关系与视觉方向。";

    translations.zh[aurora.slug] = {
      ...existingZh,
      title: "Aurora Mood 极光心境",
      meta: "HMI / 个人概念",
      summary: "一个个人座舱概念，围绕 HUD 与中控的信息优先级、AI 陪伴和氛围交互展开设计探索。",
      tags: ["HMI", "个人概念", "AI 交互", "信息架构"],
      role: "个人 HMI 概念、座舱信息架构、场景流程与视觉设计",
      roleScope: "个人概念探索，涵盖 HUD 与中控的信息层级、AI 陪伴场景和 AR 风格手势方案。",
      year: "2024",
      stage: "个人概念 · 设计探索",
      projectType: "个人概念",
      deliverables: ["八张视觉概念板", "HUD 与中控信息架构", "AI 陪伴场景与手势概念", "面向后续原型的交互规则检查"],
      intro: "Aurora Mood 是于 2024 年开展的个人概念设计。八张视觉方案探索克制的 HUD、丰富的中控与 AI 伙伴如何共享座舱空间。补充的交互规则说明下一轮原型应检查的问题。",
      challenge: "设计需要在明确驾驶信息优先级的同时，提供可选择、有情绪温度的辅助体验，并为 AI 建议、需要注意力的内容和陌生手势输入建立清楚的边界。",
      approach: [
        "围绕驾驶信息、语境辅助和可选陪伴建立座舱体验框架。",
        "区分 HUD 核心信息与更丰富的中控内容。",
        "用拥堵场景呈现 AI 辅助的舒适体验。",
        "探索手势概念，同时保留常规控制入口。",
        "梳理驾驶与驻车模式、用户确认和输入恢复的进一步设计检查。"
      ],
      outcome: "项目以八张视觉方案和座舱效果图记录概念。模式切换、AI 建议和手势恢复的补充规则，为后续交互原型与评估明确了检查方向。",
      sections: [
        ...visualSectionsZh,
        {
          label: "09 进一步设计检查",
          title: "驾驶与驻车模式",
          text: "面向下一轮原型的规则，将驾驶中的信息需求与驻车时更丰富的交互区分开。",
          points: [
            "驾驶中保持 HUD 核心信息稳定，可选 AI 建议保持简短并可直接关闭。",
            "驻车时允许在中控展开更丰富的陪伴内容与详细舒适设置。",
            "检查模式切换与任务打断，确保可选体验不会遮挡继续驾驶所需的信息。"
          ],
          wide: true
        },
        {
          label: "10 进一步设计检查",
          title: "建议、确认、拒绝与退出",
          text: "在概念的正向流程之外，为 AI 辅助补充明确边界。这些规则用于指导后续原型。",
          points: [
            "把 AI 推荐表达为附带原因的建议，对推断的情绪保留不确定性。",
            "在开启可选舒适场景前要求明确选择，同时提供清晰的接受与拒绝操作。",
            "提供持续可见的退出入口与当前设置反馈，并定义结束场景时可恢复的原有设置。"
          ],
          wide: true
        },
        {
          label: "11 进一步设计检查",
          title: "手势反馈与恢复",
          text: "后续手势原型需要让输入边界可见，并为用户提供从意外操作中恢复的可靠路径。",
          points: [
            "在手势改变音量前，定义激活提示、调整范围与可见反馈。",
            "说明取消、无操作超时，以及未识别或含糊手势的响应方式。",
            "保留熟悉的音量控制入口，并分别评估驾驶与驻车条件下的概念。"
          ],
          wide: true
        }
      ]
    };
  }

  const generativeHmi = {
    slug: "generative-hmi",
    title: "Generative HMI",
    meta: "Generative HMI / Application Planning",
    image: "assets/portfolio/generative-hmi/overview.svg",
    galleryImage: "assets/portfolio/generative-hmi/overview.svg",
    summary: "An ongoing application and implementation plan for generating HMI pages within style rules, component templates and explicit quality checks.",
    tags: ["Generative HMI", "Design Systems", "AI Workflow", "Ongoing"],
    role: "Lead application planning and implementation-path design",
    roleScope: "Lead the HMI application proposal and its implementation path, with a focus on design constraints, component organization and the plan for prototype evaluation.",
    year: "2026—Ongoing",
    stage: "R&D proposal · prototype validation planning",
    projectType: "Ongoing application study",
    deliverables: ["Application workflow proposal", "Style-rule and component-template structure", "Multi-page and local-edit evaluation plan"],
    intro: "This ongoing study asks how generative tools can support HMI design while retaining a controlled visual language and reusable components. The current work concerns the application proposal and implementation path: what goes into generation, what can be changed and how outputs should be reviewed.",
    challenge: "A plausible single screen is only one part of the problem. A useful HMI generation workflow also needs consistent components across pages, controlled local edits and a repeatable way to examine output quality.",
    approach: [
      "Define the intended HMI task and structure style rules as generation constraints.",
      "Organize reusable component templates and their page relationships.",
      "Plan multi-page generation and scoped edits around a shared design context.",
      "Compare candidate models with the same tasks, constraints and review criteria.",
      "Use a prototype evaluation plan to identify failure cases and refine the application workflow."
    ],
    outcome: "The topic is in the R&D proposal and prototype-validation planning stage. The workflow and review criteria define the next implementation steps; model comparisons and quality findings will be documented when evaluation evidence is available.",
    sections: [
      {
        label: "01 Application Goal",
        title: "Generate within a shared HMI language",
        text: "The proposed workflow connects a design task, style rules and component templates to generation, review and revision. The diagram is an application-workflow illustration.",
        image: "assets/portfolio/generative-hmi/overview.svg",
        wide: true
      },
      {
        label: "02 Input Structure",
        title: "Make constraints explicit",
        text: "The application plan treats style and component choices as explicit inputs rather than relying on a free-form visual prompt alone.",
        points: [
          "Describe visual rules such as typography, color, spacing and information hierarchy.",
          "Define reusable component templates and the content they accept.",
          "Keep task context and page relationships available when generating or revising a screen."
        ],
        wide: true
      },
      {
        label: "03 Page Relationships",
        title: "Preserve consistency across screens",
        text: "Multi-page generation is framed as a connected HMI task. The evaluation plan should examine whether shared components and state language remain consistent as page content changes.",
        points: ["Check repeated components against the same template.", "Inspect navigation and information hierarchy across related pages.", "Record inconsistent states and visual drift as issues to resolve."],
        wide: true
      },
      {
        label: "04 Scoped Revision",
        title: "Change a region without losing context",
        text: "Local modification is a separate design task: a request should identify what is allowed to change and the surrounding elements that need to remain stable.",
        points: ["Define the target region and requested change.", "Check surrounding components, alignment and page relationships after revision.", "Include unintended changes in the quality-review record."],
        wide: true
      },
      {
        label: "05 Evaluation Plan",
        title: "Compare models with common criteria",
        text: "The planned comparison uses the same tasks, design inputs and review criteria for each candidate model. The criteria below define a review framework rather than completed benchmark results.",
        points: ["Style-rule adherence and component fidelity.", "Multi-page consistency and information completeness.", "Local-edit accuracy and unintended-change scope.", "Clear documentation of failed cases and the revisions they require."],
        wide: true
      },
      {
        label: "06 Current Stage",
        title: "From application proposal to prototype evidence",
        text: "The next stage is to exercise the proposed workflow on representative HMI tasks and document the generated output, review decisions and revision history. That evidence will determine which parts of the application path need to change.",
        wide: true
      }
    ]
  };

  if (!projects.some((project) => project.slug === generativeHmi.slug)) {
    const auroraIndex = projects.findIndex((project) => project.slug === "aurora-mood");
    projects.splice(auroraIndex >= 0 ? auroraIndex + 1 : projects.length, 0, generativeHmi);
  }
  translations.zh[generativeHmi.slug] = {
    title: "生成式 HMI",
    meta: "生成式 HMI / 应用方案",
    summary: "一个进行中的生成式 HMI 应用方案与实施路径专题，围绕风格规则、组件模板和明确的质量检查组织页面生成。",
    tags: ["生成式 HMI", "设计系统", "AI 工作流", "进行中"],
    role: "主导应用方案与实施路径设计",
    roleScope: "主导 HMI 应用方案与实施路径设计，重点是设计约束、组件组织与原型评估规划。",
    year: "2026—进行中",
    stage: "研发方案 · 原型验证规划",
    projectType: "进行中的应用探索",
    deliverables: ["应用工作流方案", "风格规则与组件模板结构", "多页一致性与局部修改评估规划"],
    intro: "这一进行中的专题探索生成式工具如何在保留可控视觉语言与可复用组件的前提下支持 HMI 设计。当前工作聚焦应用方案与实施路径：生成需要哪些输入、允许怎样修改，以及如何检查输出。",
    challenge: "单张页面在视觉上成立只是问题的一部分。可用的 HMI 生成工作流还需要跨页面组件一致性、可控的局部修改，以及可重复执行的质量检查方式。",
    approach: [
      "明确 HMI 任务，将风格规则组织为生成约束。",
      "整理可复用组件模板及其页面关系。",
      "围绕共享设计语境规划多页面生成与局部修改。",
      "用相同任务、约束与检查标准比较候选模型。",
      "通过原型评估规划识别失败情形，迭代应用工作流。"
    ],
    outcome: "专题处于研发方案与原型验证规划阶段。工作流和检查标准明确了下一步实施路径；后续将在具备评估证据时补充模型对比与质量发现。",
    sections: [
      {
        label: "01 应用目标",
        title: "在统一的 HMI 语言中生成",
        text: "拟定工作流将设计任务、风格规则与组件模板连接到生成、检查和修改。此图为应用流程示意。",
        image: "assets/portfolio/generative-hmi/overview.svg",
        wide: true
      },
      {
        label: "02 输入结构",
        title: "把设计约束表达清楚",
        text: "应用方案将风格与组件选择作为明确输入，而不是仅依赖自由描述的视觉提示词。",
        points: ["描述字体、颜色、间距与信息层级等视觉规则。", "定义可复用组件模板及其可接收的内容。", "在生成和修改页面时保留任务语境与页面关系。"],
        wide: true
      },
      {
        label: "03 页面关系",
        title: "保持多个界面的一致性",
        text: "将多页面生成视作相互关联的 HMI 任务，评估规划关注共享组件与状态语言是否随内容变化仍保持一致。",
        points: ["按同一模板检查重复组件。", "跨关联页面检查导航与信息层级。", "把状态不一致与视觉漂移记录为待解决问题。"],
        wide: true
      },
      {
        label: "04 局部修改",
        title: "修改局部，同时保留上下文",
        text: "局部修改作为独立设计任务，需要明确允许变化的范围，以及周边应保持稳定的元素。",
        points: ["确定目标区域与修改要求。", "修改后检查周边组件、对齐与页面关系。", "将非预期变化纳入质量检查记录。"],
        wide: true
      },
      {
        label: "05 评估规划",
        title: "用共同标准比较模型",
        text: "拟定对比使用相同任务、设计输入与检查标准。下列内容是评估框架，具体结果将在后续验证中形成。",
        points: ["风格规则遵循程度与组件还原度。", "多页面一致性与信息完整性。", "局部修改准确性与非预期变化范围。", "失败案例及其所需修改的清晰记录。"],
        wide: true
      },
      {
        label: "06 当前阶段",
        title: "从应用方案走向原型证据",
        text: "下一阶段将用有代表性的 HMI 任务检验拟定工作流，并记录生成输出、检查决策与修改历史，以此判断实施路径中需要调整的部分。",
        wide: true
      }
    ]
  };

  window.LILIAN_FEATURED_CASES = [
    {
      slug: "ea01u",
      href: "project.html?slug=ea01u",
      image: "assets/portfolio/ea01u/cover.png",
      title: "EA01U · AI Cockpit",
      kind: "AI Cockpit / HMI",
      summary: "Project-level research and interaction prototypes across Launcher, VPA and everyday AI journeys.",
      role: "AI cockpit research, interaction architecture and HMI design",
      stage: "Team project · ongoing",
      zh: {
        slug: "ea01u", href: "project.html?slug=ea01u", image: "assets/portfolio/ea01u/cover.png",
        title: "EA01U｜AI 智能座舱", kind: "AI 座舱 / HMI",
        summary: "围绕 Launcher、VPA 与日常 AI 旅程的项目研究和交互原型展示。",
        role: "AI 座舱研究、交互架构与 HMI 设计", stage: "团队项目 · 进行中"
      }
    },
    {
      slug: "aurora-mood",
      href: "project.html?slug=aurora-mood",
      image: "assets/portfolio/aurora-mood/aurora-01-cover.jpg",
      title: "Aurora Mood",
      kind: "HMI / Personal Concept",
      summary: "HUD and center-display hierarchy, AI companionship and ambient interaction in a personal cockpit concept.",
      role: "HMI concept, information architecture and visual design",
      stage: "Personal concept · 2024",
      zh: {
        slug: "aurora-mood", href: "project.html?slug=aurora-mood", image: "assets/portfolio/aurora-mood/aurora-01-cover.jpg",
        title: "Aurora Mood 极光心境", kind: "HMI / 个人概念",
        summary: "探索 HUD 与中控信息层级、AI 陪伴和氛围交互的个人座舱概念。",
        role: "HMI 概念、信息架构与视觉设计", stage: "个人概念 · 2024"
      }
    },
    {
      slug: "icered",
      href: "work/icered/",
      image: "assets/case-covers/icered.svg",
      title: "ICERED",
      kind: "AI Conversation / Product Iteration",
      summary: "AI response states, chat continuity and a design-to-code workflow. Cover: interaction-flow illustration.",
      role: "AI Product Manager · interaction design and delivery support",
      stage: "Pre-launch iteration · 2025.10–2026.07",
      zh: {
        slug: "icered", href: "work/icered/", image: "assets/case-covers/icered.svg",
        title: "ICERED", kind: "AI 对话 / 产品迭代",
        summary: "AI 响应状态、聊天连续性与设计到代码的迭代流程。封面为交互流程示意。",
        role: "AI 产品经理 · 交互设计与交付支持", stage: "上线前迭代 · 2025.10–2026.07"
      }
    },
    {
      slug: "nio",
      href: "experience.html?slug=nio",
      image: "assets/case-covers/nio.svg",
      title: "NIO",
      kind: "Vehicle Services / Service Design",
      summary: "Annual-inspection service digitalization and app touchpoints. Cover: service-flow illustration.",
      role: "Service Design Intern · service flow and app UX support",
      stage: "Internship · 2024.04–08",
      zh: {
        slug: "nio", href: "experience.html?slug=nio", image: "assets/case-covers/nio.svg",
        title: "蔚来 NIO", kind: "车辆服务 / 服务设计",
        summary: "年检服务数字化与 App 服务触点。封面为服务流程示意。",
        role: "服务设计实习生 · 服务流程与 App 体验支持", stage: "实习项目 · 2024.04–08"
      }
    }
  ];

  window.LILIAN_PROJECTS = projects;
  window.LILIAN_PROJECT_TRANSLATIONS = translations;
})();
