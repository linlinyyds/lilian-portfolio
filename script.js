const cases = [
  {
    id: "aurora",
    title: "极光心境 Aurora Mood",
    type: "HMI / Multi-modal Interaction",
    category: "hmi",
    image: "assets/portfolio/aurora-hero.png",
    year: "2028 concept",
    role: "HMI visual, interaction logic, journey mapping",
    tools: "Figma, visual system, scenario storyboard",
    summary:
      "面向 95 后新中产出行需求，探索主动理解、主动适配、主动陪伴的智能座舱 HMI 概念。",
    tags: ["AI Agent", "HUD", "Center Display", "Emotion-aware UX"],
    challenge:
      "智能座舱中信息过载会增加驾驶压力，系统需要在安全驾驶、情绪陪伴和沉浸体验之间取得平衡。",
    decisions: [
      "用低饱和深色背景承载地图和核心驾驶信息，用少量高饱和蓝绿色元素引导注意。",
      "将 HUD 定义为安全辅助界面，只保留速度、导航和必要警示。",
      "把中控作为情绪化主体空间，根据拥堵、音乐、AI 建议等场景动态适配。"
    ],
    outcome:
      "形成“一眼专注，一触沉浸”的多屏交互原则，并围绕舒压模式、手势音量控制和情绪光效完成原型表达。"
  },
  {
    id: "fivestars",
    title: "Five Stars Education Website",
    type: "Web UX / Online Education Platform",
    category: "web",
    image: "assets/portfolio/fivestars-web.jpg",
    year: "Recent web case",
    role: "Web UX audit, information structure, responsive experience review",
    tools: "Responsive web, education service UX, conversion flow analysis",
    link: "https://fivestarsedu.com",
    summary:
      "在线教育平台案例，围绕教师发现、学科筛选、预约转化与学生/家长信任建立，呈现清晰的服务型 Web 体验。",
    tags: ["Web UX", "Education", "Service Platform", "Responsive"],
    challenge:
      "教育平台需要同时服务学生、家长和教师，首页必须快速建立信任，并把复杂的课程、老师和预约信息转化为明确行动。",
    decisions: [
      "用强对比首屏表达核心价值：找到适合的私人导师，并直接引导浏览老师与教师入驻。",
      "将教师、学科、价格、评分和预约入口组织成可扫描的信息结构，降低选择成本。",
      "保留移动端导航与搜索入口，让用户在不同设备上都能快速进入关键任务。"
    ],
    outcome:
      "形成一个适合作为近期 Web 体验案例展示的教育平台样本，重点体现服务转化、信息层级和多角色体验设计。"
  },
  {
    id: "rako",
    title: "Rako Rako Ramen Website",
    type: "Web UX / Food E-commerce",
    category: "web",
    image: "assets/portfolio/rako-web.jpg",
    year: "Recent web case",
    role: "Brand website review, product storytelling, e-commerce UX analysis",
    tools: "Wix, e-commerce flow, visual merchandising, responsive review",
    link: "https://www.rakorakoramen.co.uk/",
    summary:
      "英国拉面品牌官网案例，通过强烈的食物视觉、品牌氛围和商品购买路径，连接品牌故事与电商转化。",
    tags: ["Web UX", "E-commerce", "Food Brand", "Visual Storytelling"],
    challenge:
      "食品品牌官网既要让用户感到“好吃可信”，也要让购买路径清晰顺畅，避免视觉氛围压过商品信息。",
    decisions: [
      "将高质感拉面视觉作为第一识别点，强化品牌记忆和食欲联想。",
      "围绕产品卡片、套餐、价格和库存状态组织电商信息，让用户可以快速比较。",
      "用日英混合命名和品牌元素保留文化语境，同时让英国用户能理解购买内容。"
    ],
    outcome:
      "补充了一个更商业化的近期 Web 案例，用于展示品牌视觉、商品陈列和转化路径之间的设计判断。"
  },
  {
    id: "clink",
    title: "CLINK 医疗服务系统",
    type: "Service Design / Medical UX",
    category: "service",
    image: "assets/portfolio/clink-product.png",
    year: "Future service concept",
    role: "Service system, app UI, product concept",
    tools: "Service blueprint, ecosystem map, app prototype",
    summary:
      "为中小型城市老年糖尿病患者设计医疗车与应用程序，连接远程医疗、药品配送和身体检查服务。",
    tags: ["Healthcare", "Service Blueprint", "Elderly Care", "App UI"],
    challenge:
      "医疗资源存在地域和城乡分布不均，老年慢病患者需要更低门槛、更连续的健康管理服务。",
    decisions: [
      "建立患者、家属、医生、社区、医疗公司和政府之间的服务系统图。",
      "将药品配送、身体检查、远程问诊整合进医疗车和手机端应用。",
      "用服务蓝图拆解线上预约、线下到达、检查、反馈和后续护理。"
    ],
    outcome:
      "完成医疗车产品概念、药盒/注射设备探索和 App UI 设计，呈现未来 5-10 年医疗服务交付方式。"
  },
  {
    id: "tripal",
    title: "TRIPAL 旅游体验 App",
    type: "Mobile UX / Social Rating",
    category: "app",
    image: "assets/portfolio/tripal-ui.png",
    year: "App UX",
    role: "UI design, rating flow, travel interaction",
    tools: "Figma, mobile prototype, visual design",
    summary:
      "围绕导游与游客的双向评分机制，设计旅游服务与社交互动结合的移动端体验。",
    tags: ["Mobile App", "Rating System", "Travel Experience", "Social UX"],
    challenge:
      "旅游服务体验中，游客和导游之间的信息不对称会影响信任和服务质量。",
    decisions: [
      "通过双向评分让游客与导游都拥有更透明的反馈机制。",
      "将导游服务物料、游客行为评分和路线信息集中到移动端界面。",
      "用高对比深色界面搭配荧光绿色，增强旅途中快速识别和操作效率。"
    ],
    outcome:
      "形成完整移动端视觉方向和多页面 UI 展示，可继续扩展为可用性测试版本。"
  },
  {
    id: "equiflow",
    title: "Equiflow 数字疗愈体验",
    type: "VR / Digital Healing",
    category: "immersive",
    image: "assets/portfolio/equiflow-vr.png",
    year: "Interactive installation",
    role: "Experience flow, VR interaction, exhibition design",
    tools: "VR, AI analysis, spatial storytelling",
    summary:
      "讨论工作场所数字疗愈的交互体验，用户在 VR 空间自由绘画，系统介入分析员工状态并生成反馈。",
    tags: ["VR", "Digital Healing", "Exhibition", "AI Feedback"],
    challenge:
      "生产力压力往往难以被表达，体验设计需要为情绪提供安全、可视化、可被讨论的出口。",
    decisions: [
      "构建从进入展览、接受测试、进入 VR、自由绘画到获得疗愈证书的完整旅程。",
      "用空间中的绘画动作替代传统问卷，让情绪表达更自然。",
      "把 AI 分析结果转化为可带走的证书，延长体验后的反思。"
    ],
    outcome:
      "完成 VR 体验流程、现场展示与互动记录，为数字疗愈在工作场景中的应用提供概念样本。"
  },
  {
    id: "nature",
    title: "自然冥想 Nature Meditation",
    type: "TouchDesigner / Media Interaction",
    category: "immersive",
    image: "assets/portfolio/nature-meditation.png",
    year: "Media interaction",
    role: "Interactive visual, installation setup, concept design",
    tools: "TouchDesigner, sensor input, projection",
    summary:
      "通过触摸传感器感应数据并转化为自然植物影像，投射在服装和空间上，形成沉浸式互动体验。",
    tags: ["TouchDesigner", "Sensor", "Projection", "Sustainable Future"],
    challenge:
      "如何让观众在数字时代重新感受人与自然、技术与生命形式之间的关系。",
    decisions: [
      "使用传感器数据驱动自然影像，让身体触摸成为视觉变化的入口。",
      "将服装、背景投影和现场灯光组织成统一体验场景。",
      "以数字冥想引导观众进入自然空间，激发对可持续未来的讨论。"
    ],
    outcome:
      "完成媒体互动设计与现场搭建，呈现人、技术与自然之间的沉浸式对话。"
  }
];

const processSteps = [
  {
    title: "Discover / 识别问题",
    body: "从真实用户、业务目标和场景约束开始，先判断问题是否值得被解决。",
    points: ["用户访谈与观察", "竞品与服务生态分析", "问题假设与设计机会"]
  },
  {
    title: "Define / 建立结构",
    body: "把复杂材料整理成可沟通的结构，让团队对用户、场景和优先级形成共识。",
    points: ["用户旅程图", "服务蓝图", "信息架构与任务流"]
  },
  {
    title: "Design / 形成方案",
    body: "从低保真到高保真逐步推进，把交互逻辑、视觉系统和情绪体验落到具体界面。",
    points: ["线框与原型", "视觉语言与组件", "多端/多模态交互"]
  },
  {
    title: "Validate / 验证迭代",
    body: "通过可用性测试、反馈归纳和设计复盘，让方案不断接近真实使用需求。",
    points: ["可用性测试", "反馈归纳", "迭代记录与复盘"]
  }
];

const caseGrid = document.querySelector("#caseGrid");
const drawer = document.querySelector("#caseDrawer");
const drawerContent = document.querySelector("#drawerContent");
const processDetail = document.querySelector("#processDetail");
const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
const cursorLight = document.querySelector(".cursor-light");
const activeSectionLabel = document.querySelector("#activeSection");
const navLinks = Array.from(document.querySelectorAll(".nav a"));
const trackedSections = Array.from(document.querySelectorAll("main section[id]"));

function renderCases(filter = "all") {
  const visibleCases = filter === "all" ? cases : cases.filter((item) => item.category === filter);
  caseGrid.innerHTML = visibleCases
    .map((item, index) => {
      const featuredClass = index === 0 && filter === "all" ? " is-featured" : "";
      return `
        <article class="case-card reveal${featuredClass}" data-category="${item.category}" data-index="${String(index + 1).padStart(2, "0")}">
          <div class="case-image">
            <img src="${item.image}" alt="${item.title} 项目封面">
          </div>
          <div class="case-content">
            <p class="case-kicker">${item.type}</p>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="case-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            <div class="case-footer">
              <button type="button" data-open-case="${item.id}">Open case</button>
              ${item.link ? `<a href="${item.link}" target="_blank" rel="noreferrer">Live site</a>` : ""}
              <span>${item.year}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
  observeReveals();
}

function renderProcess(stepIndex = 0) {
  const step = processSteps[stepIndex];
  processDetail.innerHTML = `
    <h3>${step.title}</h3>
    <p>${step.body}</p>
    <ul>${step.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;
}

function openCase(id) {
  const item = cases.find((caseItem) => caseItem.id === id);
  if (!item) return;
  drawerContent.innerHTML = `
    <div class="drawer-hero">
      <img src="${item.image}" alt="${item.title} 项目图">
    </div>
    <div class="drawer-body">
      <p class="eyebrow">${item.type}</p>
      <h2 id="drawerTitle">${item.title}</h2>
      <p>${item.summary}</p>
      <div class="drawer-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <div class="drawer-meta">
        <div><span>Year</span><strong>${item.year}</strong></div>
        <div><span>Role</span><strong>${item.role}</strong></div>
        <div><span>Tools</span><strong>${item.tools}</strong></div>
      </div>
      ${item.link ? `<a class="drawer-link" href="${item.link}" target="_blank" rel="noreferrer">View live website</a>` : ""}
      <h3>Challenge</h3>
      <p>${item.challenge}</p>
      <h3>Design decisions</h3>
      <ul>${item.decisions.map((decision) => `<li>${decision}</li>`).join("")}</ul>
      <h3>Outcome</h3>
      <p>${item.outcome}</p>
    </div>
  `;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function observeReveals() {
  const reveals = document.querySelectorAll(".reveal:not(.is-visible)");
  reveals.forEach((element) => revealObserver.observe(element));
}

function updateScrollState() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${Math.min(progress, 100)}%`);

  document.querySelectorAll("[data-parallax]").forEach((element) => {
    const speed = Number(element.dataset.parallax);
    element.style.transform = `translateY(${window.scrollY * speed}px)`;
  });

  let activeId = trackedSections[0]?.id || "home";
  trackedSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 160 && rect.bottom >= 160) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
  });

  if (activeSectionLabel) {
    activeSectionLabel.textContent = activeId.charAt(0).toUpperCase() + activeId.slice(1);
  }
}

document.querySelector("#year").textContent = new Date().getFullYear();
renderCases();
renderProcess();
observeReveals();
updateScrollState();

document.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open-case]");
  const closeButton = event.target.closest("[data-close-drawer]");
  const filterButton = event.target.closest("[data-filter]");
  const stepButton = event.target.closest("[data-step]");
  const navLink = event.target.closest(".nav a");

  if (openButton) openCase(openButton.dataset.openCase);
  if (closeButton) closeDrawer();

  if (filterButton) {
    document.querySelectorAll(".filter-button").forEach((button) => button.classList.remove("is-active"));
    filterButton.classList.add("is-active");
    renderCases(filterButton.dataset.filter);
  }

  if (stepButton) {
    document.querySelectorAll(".timeline-step").forEach((button) => button.classList.remove("is-active"));
    stepButton.classList.add("is-active");
    renderProcess(Number(stepButton.dataset.step));
  }

  if (navLink && nav.classList.contains("is-open")) {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener(
  "pointermove",
  (event) => {
    cursorLight.style.left = `${event.clientX}px`;
    cursorLight.style.top = `${event.clientY}px`;
  },
  { passive: true }
);

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
