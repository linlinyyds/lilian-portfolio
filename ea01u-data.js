(() => {
  const asset = (file) => `assets/portfolio/ea01u/${file}`;
  const text = (en, zh) => ({ en, zh });
  const media = (type, file, alt, caption) => ({
    type, src: asset(file), alt, caption,
    ...(type === "video" ? { poster: asset(file.replace(/\.mp4$/, "-poster.png")) } : {})
  });

  const personas = [
    { slug: "default-custom", label: text("Default & Custom", "默认与自定义") },
    { slug: "secretary", label: text("Personal Secretary", "贴心秘书") },
    { slug: "road-trip", label: text("Road-trip Assistant", "自驾游助手") },
    { slug: "child-care", label: text("Child Care", "儿童关怀") },
    { slug: "emotional-healing", label: text("Emotional Wellbeing", "情绪疗愈") }
  ];
  const states = [
    { slug: "default", label: text("Default", "默认") },
    { slug: "listening", label: text("Listening", "聆听") },
    { slug: "thinking", label: text("Thinking", "思考") },
    { slug: "broadcast", label: text("Speaking", "播报") },
    { slug: "error", label: text("Error", "错误") }
  ];

  const sections = [
    {
      label: text("01 Project Film", "01 项目影片"),
      title: text("Desay SV EA01U", "德赛西威 EA01U"),
      text: text(
        "The official project film introduces the EA01U intelligent cockpit platform and its connected in-car experience.",
        "官方项目影片展示 EA01U 智能座舱平台及其车内协同体验。"
      ),
      wide: true,
      media: [{
        type: "youtube",
        id: "lwh04qaL_nY",
        title: text("Desay SV EA01U — official project film", "德赛西威 EA01U — 官方项目影片"),
        caption: text("Official film: Desay SV EA01U · YouTube", "官方影片：德赛西威 EA01U · YouTube")
      }]
    },
    {
      label: text("02 Cockpit Overview", "02 座舱概览"),
      title: text("AI companionship within the Launcher", "Launcher 中的 AI 陪伴"),
      text: text(
        "The Launcher brings navigation, content cards and a visible virtual personal assistant into a shared cockpit workspace. The motion prototype shows the assistant alongside everyday vehicle information.",
        "Launcher 将导航、内容卡片与可视化虚拟个人助理整合在同一座舱工作区。动态原型展示助手如何与日常用车信息共同呈现。"
      ),
      wide: true,
      media: [media("video", "launcher-balance-bird.mp4",
        text("EA01U Launcher with the Balance Bird virtual assistant", "搭载平衡鸟虚拟助手的 EA01U Launcher"),
        text("Launcher overview with the Balance Bird VPA.", "搭载平衡鸟 VPA 的 Launcher 概览。"))]
    },
    {
      label: text("03 Research", "03 研究"),
      title: text("From fragmented tasks to intent-led interaction", "从碎片化任务到意图交互"),
      text: text(
        "The research examines how language interaction can connect user intent with vehicle services. The focus is on reducing the steps between expressing a need and completing a task across applications.",
        "研究关注语言交互如何连接用户意图与车辆服务，梳理从表达需求到完成跨应用任务之间的操作环节。"
      ),
      image: asset("research-01-ai-model-meaning.png"),
      zoom: true
    },
    {
      label: text("04 System Architecture", "04 系统架构"),
      title: text("Connecting language, capability and feedback", "连接语言、能力与反馈"),
      text: text(
        "The architecture study maps the relationship between user input, model interpretation, vehicle-domain capabilities and execution feedback. It also identifies information that needs a clear visual presence alongside voice interaction.",
        "架构分析梳理用户输入、模型理解、车辆垂域能力与执行反馈之间的关系，同时识别语音交互中仍需要清晰视觉承接的信息。"
      ),
      image: asset("research-02-technical-architecture.png"),
      zoom: true
    },
    {
      label: text("05 Conversation Patterns", "05 对话模式"),
      title: text("A vocabulary for AI conversation", "AI 对话的组件语言"),
      text: text(
        "A comparison of AI products groups common conversation patterns into waiting, results, feedback and follow-up actions. These references inform how cockpit responses can remain understandable through different stages of a request.",
        "通过比较 AI 产品，将常见对话模式归纳为等待、结果、反馈和后续操作，为车内请求在不同阶段的清晰表达提供参考。"
      ),
      image: asset("research-03-ai-product-components-v2.png"),
      zoom: true
    },
    {
      label: text("06 Interface Strategy", "06 界面策略"),
      title: text("Finding the right space for conversation", "为对话寻找合适的界面空间"),
      text: text(
        "Embedded panels, overlays and full-screen views are compared against the cockpit's information hierarchy. The study considers how a conversation can expand for complex tasks while keeping driving information visible.",
        "围绕座舱信息层级比较嵌入面板、浮层与全屏界面，探索复杂任务中的对话展开方式，以及驾驶信息的持续可见性。"
      ),
      image: asset("research-04-interface-patterns.png"),
      zoom: true
    },
    {
      label: text("07 Voice Identity", "07 语音身份"),
      title: text("Calibrating the assistant's personality", "校准助手的角色表达"),
      text: text(
        "Voice identity is studied across abstract assistants, personified characters and functional agents. The comparison helps define how visual presence and personality communicate the assistant's role and capability.",
        "语音身份研究比较抽象助手、拟人角色与功能型 Agent，探索视觉存在感和性格表达如何传递助手的角色与能力边界。"
      ),
      image: asset("research-05-voice-persona.png"),
      zoom: true
    },
    {
      label: text("08 Vehicle Domains", "08 车辆垂域"),
      title: text("Organizing AI around in-car services", "围绕车内服务组织 AI 能力"),
      text: text(
        "Navigation, vehicle control, entertainment and cabin settings are organized into distinct service domains. This structure gives a general AI assistant a more specific role within the vehicle.",
        "将导航、车控、娱乐与座舱环境等能力放入不同服务垂域，为通用 AI 助手建立更明确的车内服务身份。"
      ),
      image: asset("research-06-domain-identity.png"),
      zoom: true
    },
    {
      label: text("09 VPA Entry", "09 VPA 入口"),
      title: text("Guidance and generation states", "引导与生成状态"),
      text: text(
        "The desktop entry demonstrates how the interface introduces VPA creation and communicates background generation. Both states keep the assistant's progress visible within the Launcher.",
        "桌面入口演示 VPA 创作的初始引导与后台生成状态，让用户在 Launcher 中了解助手的生成进展。"
      ),
      wide: true,
      media: [
        media("video", "vpa-outfit-guidance.mp4",
          text("VPA creation entry before an assistant has been generated", "尚未生成助手时的 VPA 创作入口"),
          text("Creation guidance before a VPA is generated.", "生成 VPA 前的初始引导。")),
        media("video", "vpa-outfit-generating.mp4",
          text("VPA background generation state in the Launcher", "Launcher 中的 VPA 后台生成状态"),
          text("Background generation feedback in the Launcher.", "Launcher 中的后台生成反馈。"))
      ]
    },
    {
      label: text("10 VPA Creation", "10 VPA 创作"),
      title: text("AI creation and an action library", "AI 创作与动作库"),
      text: text(
        "Two connected views support assistant creation and action selection. The AI creation view offers a route to a personalized character, while the action library presents reusable motion options.",
        "AI 创作与动作库构成两个相互连接的界面：前者支持个性化角色创作，后者提供可选择的动作内容。"
      ),
      wide: true,
      layout: "grid",
      media: [
        media("image", "vpa-ai-creation.jpg",
          text("VPA AI creation interface", "VPA AI 创作界面"),
          text("VPA AI creation.", "VPA AI 创作。")),
        media("image", "vpa-action-library.jpg",
          text("VPA action library interface", "VPA 动作库界面"),
          text("VPA action library.", "VPA 动作库。"))
      ]
    },
    {
      label: text("11 VPA Motion", "11 VPA 动作"),
      title: text("A repertoire of companion actions", "陪伴角色的动作表达"),
      text: text(
        "Preset animations explore different expressions of the virtual companion, including balance, music and a playful fishing scene.",
        "预设动画探索虚拟伙伴的不同表现，包括平衡鸟、音乐互动与钓鱼等场景。"
      ),
      wide: true,
      layout: "grid",
      media: [
        media("image", "vpa-balance-bird.gif", text("Balance Bird VPA animation", "平衡鸟 VPA 动画"), text("Balance Bird", "平衡鸟")),
        media("image", "vpa-music.gif", text("VPA music animation", "VPA 普通音乐动画"), text("Music", "普通音乐")),
        media("image", "vpa-high-energy-music.gif", text("VPA high-energy music animation", "VPA 高能音乐动画"), text("High-energy music", "高能音乐")),
        media("image", "vpa-fishing.gif", text("VPA fishing animation", "VPA 钓鱼动画"), text("Fishing", "钓鱼"))
      ]
    },
    {
      label: text("12 Launcher Editing", "12 Launcher 编辑"),
      title: text("Flexible cards within a shared layout", "共享布局中的灵活卡片"),
      text: text(
        "Two motion prototypes demonstrate card swapping and drag-to-reorder behavior. The layout adapts as cards change position, illustrating a customizable home-screen arrangement.",
        "两个动态原型分别演示卡片互换自适应与拖拽换位，展示卡片位置变化时的布局响应，以及桌面编排的自定义方式。"
      ),
      wide: true,
      media: [
        media("video", "launcher-card-reorder.mp4",
          text("Launcher cards adapting when swapped", "Launcher 卡片互换时的自适应变化"),
          text("Adaptive card swapping.", "卡片互换自适应。")),
        media("video", "launcher-card-drag.mp4",
          text("Dragging Launcher cards to reorder them", "通过拖拽调整 Launcher 卡片顺序"),
          text("Drag to reorder.", "拖拽换位。"))
      ]
    },
    {
      label: text("13 Experience Journey", "13 体验旅程"),
      title: text("An AI storyline across everyday tasks", "贯穿日常任务的 AI 故事线"),
      text: text(
        "The journey brings together a proactive welcome, vehicle alerts, briefing preferences, fog-light control, a phone call and music playback. The examples show how related cockpit services can be presented as a continuous experience.",
        "体验旅程连接主动问候、车辆提醒、简报偏好、雾灯控制、电话与音乐播放，展示不同座舱服务如何组成连续的使用体验。"
      ),
      wide: true,
      media: [
        media("image", "ai-storyline.jpg",
          text("EA01U AI storyline dashboard", "EA01U AI 故事线桌面"),
          text("Proactive welcome and AI storyline dashboard.", "主动问候与 AI 故事线桌面。")),
        media("image", "ai-storyline-scratch-popup.png",
          text("Vehicle scratch alert with a sentry-video popup", "车身剐蹭提醒的哨兵视频弹窗"),
          text("Sentry-video popup for a vehicle scratch alert.", "车身剐蹭提醒的哨兵视频弹窗。")),
        media("image", "ai-storyline-brief.webp",
          text("AI briefing preference interface", "AI 简报偏好界面"),
          text("AI briefing preferences.", "AI 简报偏好。")),
        media("image", "ai-storyline-fog-on.webp",
          text("Vehicle interface showing fog lights switched on", "显示雾灯已开启的车辆界面"),
          text("Fog-light control.", "雾灯控制。")),
        media("video", "ai-storyline-call-journey.mp4",
          text("Phone-call journey from dialing to a call summary", "从拨号到通话小结的电话旅程"),
          text("Phone-call journey and call summary.", "电话旅程与通话小结。")),
        media("image", "ai-storyline-music.webp",
          text("Music playback in the AI storyline", "AI 故事线中的音乐播放"),
          text("Music playback.", "音乐播放。"))
      ]
    },
    {
      label: text("14 VPA Plaza", "14 VPA 广场"),
      title: text("A place to choose a conversation companion", "选择对话伙伴的空间"),
      text: text(
        "The VPA Plaza introduces different assistant personas and a direct route into conversation. The demonstration moves between starting and closing a dialogue.",
        "VPA 广场呈现不同助手人设，并提供直接进入对话的入口。演示展示从开始对话到关闭对话的状态切换。"
      ),
      wide: true,
      media: [media("image", "vpa-plaza-dialog.webp",
        text("VPA Plaza opening and closing a conversation", "VPA 广场开始与关闭对话"),
        text("Starting and closing a conversation in VPA Plaza.", "VPA 广场中的开始与关闭对话。"))]
    },
    {
      label: text("15 Persona States", "15 人设状态"),
      title: text("Five personas, five conversation states", "五种人设与五种对话状态"),
      text: text(
        "A state matrix compares Default & Custom, Personal Secretary, Road-trip Assistant, Child Care and Emotional Wellbeing. Each persona is shown in default, listening, thinking, speaking and error states.",
        "状态矩阵并列展示默认与自定义、贴心秘书、自驾游助手、儿童关怀和情绪疗愈五种人设。每种人设包含默认、聆听、思考、播报和错误五种状态。"
      ),
      wide: true,
      layout: "matrix",
      matrix: {
        columns: personas.map((persona) => persona.label),
        rows: states.map((state) => ({
          label: state.label,
          media: personas.map((persona) => ({
            src: asset(`vpa-plaza-${persona.slug}-${state.slug}.gif`),
            alt: text(`${persona.label.en} — ${state.label.en}`, `${persona.label.zh} · ${state.label.zh}`)
          }))
        }))
      }
    },
    {
      label: text("16 Personalization", "16 个性化"),
      title: text("Shaping a custom VPA", "塑造自定义 VPA"),
      text: text(
        "The customization flow presents style settings and description-based generation in a modal. The two demonstrations show browsing the available settings and switching into the description step.",
        "自定义流程在弹窗中提供风格设置与描述生成。两段演示分别展示设置内容的浏览，以及从风格自定义进入描述生成的切换。"
      ),
      wide: true,
      layout: "grid",
      media: [
        media("image", "vpa-custom-style-scroll.webp",
          text("Scrolling through custom VPA style settings", "上下浏览自定义 VPA 风格设置"),
          text("Browsing custom VPA style settings.", "浏览自定义 VPA 风格设置。")),
        media("image", "vpa-custom-description.webp",
          text("Custom VPA switching to description-based generation", "自定义 VPA 切换至描述生成"),
          text("Description-based VPA generation.", "通过描述生成 VPA。"))
      ]
    }
  ];

  const localizedText = (value, language) => typeof value === "object" && value !== null ? value[language] : value;
  const localizedMedia = (item, language) => ({
    ...item,
    ...(item.alt ? { alt: localizedText(item.alt, language) } : {}),
    ...(item.title ? { title: localizedText(item.title, language) } : {}),
    ...(item.caption ? { caption: localizedText(item.caption, language) } : {})
  });
  const localizedSection = (section, language) => ({
    ...section,
    label: localizedText(section.label, language),
    title: localizedText(section.title, language),
    text: localizedText(section.text, language),
    ...(section.media ? { media: section.media.map((item) => localizedMedia(item, language)) } : {}),
    ...(section.matrix ? { matrix: {
      columns: section.matrix.columns.map((column) => localizedText(column, language)),
      rows: section.matrix.rows.map((row) => ({
        label: localizedText(row.label, language),
        media: row.media.map((item) => localizedMedia(item, language))
      }))
    } } : {})
  });

  const project = {
    slug: "ea01u",
    title: "EA01U",
    meta: "AI Cockpit / HMI",
    image: asset("cover.png"),
    galleryImage: asset("cover.png"),
    summary: "An ongoing AI cockpit HMI project connecting large-model interaction, virtual personal assistants, customizable Launcher cards and everyday vehicle services.",
    tags: ["AI Cockpit", "HMI", "VPA", "Work in Progress"],
    role: "AI cockpit research, interaction architecture and HMI design",
    year: "2026—Ongoing",
    intro: "EA01U is an AI intelligent cockpit platform from Desay SV. This project presentation explores how conversational AI, virtual personal assistants and interface customization come together across the Launcher and common in-car journeys.",
    challenge: "Complex in-car tasks often span several applications and vehicle functions. The design explores how to connect those capabilities through understandable conversation, clear system states and a cockpit interface that preserves information priorities.",
    approach: [
      "Examine the relationship between large-model capabilities, vehicle-domain services and user intent.",
      "Compare AI conversation components, interface patterns and assistant identities.",
      "Explore VPA creation, preset actions and consistent feedback across conversation states.",
      "Prototype flexible Launcher cards and connected journeys for briefings, vehicle control, calls and music.",
      "Extend assistant personalization through persona selection, style settings and description-based generation."
    ],
    outcome: "The work-in-progress presentation connects research with visual and motion prototypes for the Launcher, VPA creation, an AI storyline and VPA Plaza, showing the proposed experience and interaction behavior.",
    sourceUrl: "https://www.yejian.design/#/project?slug=ea01u&lang=cn",
    sourceLabel: "Project presentation reference · YE JIAN",
    sections: sections.map((section) => localizedSection(section, "en"))
  };

  window.LILIAN_PROJECTS = window.LILIAN_PROJECTS || [];
  if (!window.LILIAN_PROJECTS.some((item) => item.slug === project.slug)) {
    window.LILIAN_PROJECTS.unshift(project);
  }
  window.LILIAN_PROJECT_TRANSLATIONS = window.LILIAN_PROJECT_TRANSLATIONS || {};
  window.LILIAN_PROJECT_TRANSLATIONS.zh = window.LILIAN_PROJECT_TRANSLATIONS.zh || {};
  window.LILIAN_PROJECT_TRANSLATIONS.zh.ea01u = {
    title: "EA01U",
    meta: "AI 智能座舱 / HMI",
    summary: "一个进行中的 AI 智能座舱 HMI 项目，连接大模型交互、虚拟个人助理、可自定义 Launcher 卡片与日常用车服务。",
    tags: ["AI 座舱", "HMI", "VPA", "进行中"],
    role: "AI 座舱研究、交互架构与 HMI 设计",
    year: "2026—进行中",
    intro: "EA01U 是德赛西威的 AI 智能座舱平台。本项目展示围绕 Launcher 与常见用车旅程，探索对话式 AI、虚拟个人助理和界面自定义的组合方式。",
    challenge: "复杂用车任务往往涉及多个应用和车辆功能。设计探索如何通过易于理解的对话、清晰的系统状态和保留信息优先级的座舱界面连接这些能力。",
    approach: [
      "梳理大模型能力、车辆垂域服务与用户意图之间的关系。",
      "比较 AI 对话组件、界面承载方式与助手身份。",
      "探索 VPA 创作、预设动作和不同对话状态下的一致反馈。",
      "通过动态原型展示灵活的 Launcher 卡片，以及简报、车控、电话和音乐组成的体验旅程。",
      "通过人设选择、风格设置与描述生成延展助手个性化。"
    ],
    outcome: "进行中的项目展示将研究与 Launcher、VPA 创作、AI 故事线及 VPA 广场的视觉和动态原型连接起来，呈现方案体验与交互行为。",
    sourceUrl: "https://www.yejian.design/#/project?slug=ea01u&lang=cn",
    sourceLabel: "项目展示参考 · 简烨",
    sections: sections.map((section) => localizedSection(section, "zh"))
  };
})();
