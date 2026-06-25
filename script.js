const projects = window.LILIAN_PROJECTS || [];

const projectList = document.querySelector("#projectList");
const projectGallery = document.querySelector("#projectGallery");
const galleryPrev = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");
const drawer = document.querySelector("#projectDrawer");
const drawerContent = document.querySelector("#drawerContent");
const closeDrawer = document.querySelector(".drawer-close");
const themeToggle = document.querySelector(".theme-toggle");
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

function renderProjects() {
  projectList.innerHTML = projects
    .map((project, index) => `
      <a class="project-row" href="project.html?slug=${project.slug}" data-project="${index}">
        <span>
          <span class="project-name">${project.title}</span>
          <span class="project-meta">${project.meta}</span>
        </span>
        <span class="project-arrow" aria-hidden="true">→</span>
      </a>
    `)
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
  const galleryVersion = "gallery-carousel-2";

  projectGallery.innerHTML = orderedProjects
    .map((project, index) => {
      const imageSource = project.galleryImage || project.image;
      const versionedSource = `${imageSource}${imageSource.includes("?") ? "&" : "?"}v=${galleryVersion}`;

      return `
      <a class="gallery-card gallery-${project.slug}" href="project.html?slug=${project.slug}" aria-label="Open ${project.title}" data-slug="${project.slug}">
        <span class="gallery-thumb">
          <img src="${versionedSource}" alt="${project.title} project preview" loading="eager" decoding="async">
        </span>
        <span class="gallery-caption">
          <span class="gallery-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="gallery-title">${project.title}</span>
          <span class="gallery-type">${project.meta}</span>
        </span>
      </a>
    `;
    })
    .join("");

  projectGallery.classList.add("is-visible");
}

function updateGalleryControls() {
  if (!projectGallery || !galleryPrev || !galleryNext) return;

  const maxScroll = projectGallery.scrollWidth - projectGallery.clientWidth - 2;
  galleryPrev.disabled = projectGallery.scrollLeft <= 2;
  galleryNext.disabled = projectGallery.scrollLeft >= maxScroll;
}

function scrollGallery(direction) {
  if (!projectGallery) return;

  const firstCard = projectGallery.querySelector(".gallery-card");
  const styles = window.getComputedStyle(projectGallery);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 28;
  const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : projectGallery.clientWidth * 0.72;
  projectGallery.scrollBy({
    left: direction * (cardWidth + gap),
    behavior: motionQuery.matches ? "auto" : "smooth"
  });
}

function setupGalleryCarousel() {
  if (!projectGallery) return;

  galleryPrev?.addEventListener("click", () => scrollGallery(-1));
  galleryNext?.addEventListener("click", () => scrollGallery(1));
  projectGallery.addEventListener("scroll", updateGalleryControls, { passive: true });
  window.addEventListener("resize", updateGalleryControls, { passive: true });
  updateGalleryControls();
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

  targets.forEach((target) => {
    const text = target.textContent || "";
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
