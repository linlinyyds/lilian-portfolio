const projects = window.LILIAN_PROJECTS || [];
const detail = document.querySelector("#projectDetail");
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const lightState = {
  x: window.innerWidth * 0.52,
  y: window.innerHeight * 0.38,
  targetX: window.innerWidth * 0.52,
  targetY: window.innerHeight * 0.38
};
let lightShapeTimer;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
  window.localStorage.setItem("lilian-theme", theme);
}

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || projects[0]?.slug || "";
}

function renderNotFound() {
  detail.innerHTML = `
    <section class="detail-hero detail-empty">
      <p class="detail-kicker">PROJECT</p>
      <h1>Project not found</h1>
      <p>这个项目暂时没有找到。你可以返回项目列表重新选择。</p>
      <a class="back-link" href="index.html#project">Back to projects</a>
    </section>
  `;
}

function renderProject(project, index) {
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  detail.innerHTML = `
    <section class="detail-hero">
      <a class="back-link" href="index.html#project">← Back to projects</a>
      <div class="detail-title-block">
        <p class="detail-kicker">${project.meta}</p>
        <h1>${project.title}</h1>
        <p>${project.summary}</p>
      </div>
      <div class="detail-cover">
        <img src="${project.image}" alt="${project.title} cover">
      </div>
    </section>

    <section class="detail-overview">
      <div>
        <span class="detail-label">ROLE</span>
        <p>${project.role}</p>
      </div>
      <div>
        <span class="detail-label">YEAR</span>
        <p>${project.year}</p>
      </div>
      <div>
        <span class="detail-label">TAGS</span>
        <p>${project.tags.join(" · ")}</p>
      </div>
    </section>

    <section class="detail-story">
      <div>
        <span class="detail-label">INTRO</span>
        <p>${project.intro}</p>
      </div>
      <div>
        <span class="detail-label">CHALLENGE</span>
        <p>${project.challenge}</p>
      </div>
    </section>

    <section class="detail-process">
      <span class="detail-label">APPROACH</span>
      <ol>
        ${project.approach.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    </section>

    <section class="detail-materials">
      ${project.sections
        .map(
          (section) => `
            <article class="material-card">
              <div class="material-copy">
                <span class="detail-label">${section.label}</span>
                <h2>${section.title}</h2>
                <p>${section.text}</p>
              </div>
              <a class="material-image" href="${section.image}" target="_blank" rel="noreferrer">
                <img src="${section.image}" alt="${section.title}">
              </a>
            </article>
          `
        )
        .join("")}
    </section>

    <section class="detail-outcome">
      <span class="detail-label">OUTCOME</span>
      <p>${project.outcome}</p>
    </section>

    <nav class="project-pager" aria-label="项目切换">
      <a href="project.html?slug=${previous.slug}">← ${previous.title}</a>
      <a href="project.html?slug=${next.slug}">${next.title} →</a>
    </nav>
  `;

  document.title = `${project.title} · Lilian Portfolio`;
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
  const shift = Math.sin(progress * Math.PI) * 96;
  root.style.setProperty("--scroll-glow", `${shift.toFixed(1)}px`);
  root.style.setProperty("--scroll-drift-x", `${(shift * 0.42).toFixed(1)}px`);
  root.style.setProperty("--scroll-drift-y", `${(shift * -0.26).toFixed(1)}px`);
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
