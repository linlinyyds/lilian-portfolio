const projects = [
  {
    title: "Aurora Mood",
    meta: "HMI / AI Cockpit",
    image: "assets/portfolio/figma-aurora-result.jpg",
    summary: "以梦核式未来座舱为载体，探索 AI 驱动的情绪陪伴、场景识别和沉浸式车内信息表达。",
    tags: ["HMI", "AI Cockpit", "Spatial UX"]
  },
  {
    title: "Equiflow",
    meta: "VR / Digital Healing",
    image: "assets/portfolio/figma-equiflow-board.jpg",
    summary: "围绕工作压力与情绪表达，设计一个让用户进入 VR 空间自由绘画，并获得 AI 情绪反馈的数字疗愈体验。",
    tags: ["VR", "Healing", "AI Feedback"]
  },
  {
    title: "This Conversation",
    meta: "Research / Narrative",
    image: "assets/portfolio/figma-conversation.jpg",
    summary: "通过访谈、人物画像和情境拆解，研究关系、沟通与行为观察中的设计机会。",
    tags: ["Research", "Persona", "Storytelling"]
  },
  {
    title: "Clink",
    meta: "Medical Service UX",
    image: "assets/portfolio/figma-clink-research.jpg",
    summary: "为中小型城市老年糖尿病患者设计医疗车与应用程序，连接远程医疗、药品配送和身体检查服务。",
    tags: ["Healthcare", "Service Design", "App UX"]
  },
  {
    title: "Five Stars",
    meta: "Education Website",
    image: "assets/portfolio/fivestars-web.jpg",
    summary: "在线教育平台案例，关注教师发现、学科筛选、预约转化与家长信任建立。",
    tags: ["Web UX", "Education", "Responsive"]
  },
  {
    title: "Rako Rako Ramen",
    meta: "Food Brand Website",
    image: "assets/portfolio/rako-web.jpg",
    summary: "英国拉面品牌官网案例，用食物视觉、品牌氛围和购买路径连接故事与电商转化。",
    tags: ["Web UX", "E-commerce", "Brand"]
  },
  {
    title: "The World Of Kantan",
    meta: "Immersive World",
    image: "assets/portfolio/vr-world.png",
    summary: "围绕虚拟世界与空间叙事建立视觉氛围、互动路径和探索式体验框架。",
    tags: ["Immersive", "World Building", "Interaction"]
  },
  {
    title: "Meditate Naturally",
    meta: "Wellbeing Product",
    image: "assets/portfolio/nature-meditation.png",
    summary: "用自然感知、低压力交互和温和反馈，探索更容易进入的冥想与情绪调节体验。",
    tags: ["Wellbeing", "UX", "Calm Tech"]
  },
  {
    title: "Moving Crowds",
    meta: "Service / Mobility",
    image: "assets/portfolio/tripal-ui.png",
    summary: "以移动场景和群体行为为切入点，梳理服务触点、信息流和用户决策路径。",
    tags: ["Mobility", "Service UX", "System"]
  }
];

const projectList = document.querySelector("#projectList");
const drawer = document.querySelector("#projectDrawer");
const drawerContent = document.querySelector("#drawerContent");
const closeDrawer = document.querySelector(".drawer-close");
const themeToggle = document.querySelector(".theme-toggle");
const catMenu = document.querySelector(".cat-menu");
const quickNav = document.querySelector("#quickNav");

function setTheme(theme) {
  document.body.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
  window.localStorage.setItem("lilian-theme", theme);
}

function renderProjects() {
  projectList.innerHTML = projects
    .map((project, index) => `
      <button class="project-row" type="button" data-project="${index}">
        <span>
          <span class="project-name">${project.title}</span>
          <span class="project-meta">${project.meta}</span>
        </span>
        <span class="project-arrow" aria-hidden="true">→</span>
      </button>
    `)
    .join("");
}

function openProject(index) {
  const project = projects[index];
  if (!project) return;

  drawerContent.innerHTML = `
    <img src="${project.image}" alt="${project.title} project preview">
    <h3>${project.title}</h3>
    <p>${project.summary}</p>
    <div class="drawer-tags">
      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
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

renderProjects();
setupReveal();

const savedTheme = window.localStorage.getItem("lilian-theme");
setTheme(savedTheme === "dark" ? "dark" : "light");

projectList.addEventListener("click", (event) => {
  const row = event.target.closest("[data-project]");
  if (!row) return;
  openProject(Number(row.dataset.project));
});

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

closeDrawer.addEventListener("click", closeProject);

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
