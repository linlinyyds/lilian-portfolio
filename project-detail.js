const projects = window.LILIAN_PROJECTS || [];
const projectTranslations = window.LILIAN_PROJECT_TRANSLATIONS || {};
const detail = document.querySelector("#projectDetail");
const themeToggle = document.querySelector(".theme-toggle");
const languageToggle = document.querySelector(".language-toggle");
const root = document.documentElement;
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
let currentLanguage = ["zh", "en"].includes(requestedLanguage) ? requestedLanguage : (window.localStorage.getItem("lilian-language") === "en" ? "en" : "zh");

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
    "detail.videoFallback": "Your browser does not support the video tag.",
    "detail.fullSize": "View full size",
    "detail.watchVideo": "Watch on YouTube",
    "detail.matrixState": "State",
    "detail.matrixScroll": "Scroll horizontally to compare all five personas",
    "detail.source": "PROJECT REFERENCE",
    "detail.stage": "PROJECT STAGE",
    "detail.scope": "MY CONTRIBUTION",
    "detail.deliverables": "DELIVERABLES & SCOPE",
    "detail.contents": "Explore the case study"
  },
  zh: {
    "detailNav.projects": "所有项目",
    "nav.about": "关于我",
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
    "detail.videoFallback": "当前浏览器不支持视频播放。",
    "detail.fullSize": "查看原图",
    "detail.watchVideo": "在 YouTube 观看",
    "detail.matrixState": "状态",
    "detail.matrixScroll": "左右滑动，比较全部五种角色",
    "detail.source": "项目展示参考",
    "detail.stage": "项目阶段",
    "detail.scope": "个人职责范围",
    "detail.deliverables": "交付物与展示范围",
    "detail.contents": "浏览案例目录"
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
  window.localStorage.setItem("lilian-language", currentLanguage);

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
  if (section.matrix) {
    const matrix = section.matrix;
    return `
      <div class="material-matrix-block">
        <p class="material-scroll-hint">${t("detail.matrixScroll")}</p>
        <div class="material-matrix-scroll" role="region" tabindex="0" aria-label="${escapeHTML(section.title)}">
          <table class="material-matrix">
            <caption class="visually-hidden">${escapeHTML(section.title)}</caption>
            <thead><tr><th scope="col">${t("detail.matrixState")}</th>${matrix.columns.map((column) => `<th scope="col">${escapeHTML(column)}</th>`).join("")}</tr></thead>
            <tbody>${matrix.rows.map((row) => `<tr><th scope="row">${escapeHTML(row.label)}</th>${row.media.map((media) => `<td>${renderMediaItem(media)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  if (section.media) {
    return `<div class="material-media-collection${section.layout === "grid" ? " is-grid" : ""}">${section.media.map(renderMediaItem).join("")}</div>`;
  }

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

  if (section.zoom) {
    return renderMediaItem({ src: section.image, alt: section.title });
  }

  return `
    <div class="material-image">
      <img src="${section.image}" alt="${section.title}">
    </div>
  `;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
}

function renderMediaItem(media) {
  const label = escapeHTML(media.alt || media.title || media.caption || "EA01U");
  let content;

  if (media.type === "youtube") {
    const id = encodeURIComponent(media.id);
    content = `<div class="material-embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${label}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><a class="material-external-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">${t("detail.watchVideo")} ↗</a>`;
  } else if (media.type === "video") {
    const poster = media.poster ? ` poster="${escapeHTML(media.poster)}"` : "";
    content = `<div class="material-video"><video controls playsinline preload="none" aria-label="${label}"${poster}><source src="${escapeHTML(media.src)}" type="${escapeHTML(media.videoType || "video/mp4")}">${t("detail.videoFallback")}</video></div>`;
  } else {
    content = `<a class="material-image material-full-size" href="${escapeHTML(media.src)}" target="_blank" rel="noopener noreferrer" aria-label="${t("detail.fullSize")}: ${label}"><img src="${escapeHTML(media.src)}" alt="${label}" loading="lazy" decoding="async"></a>`;
  }

  return `<figure class="material-media-item">${content}${media.caption ? `<figcaption>${escapeHTML(media.caption)}</figcaption>` : ""}</figure>`;
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
        <div class="detail-hero-meta">${copy.stage ? `<span class="career-status">${escapeHTML(copy.stage)}</span>` : ""}<p><span class="detail-label">${t("detail.role")}</span>${escapeHTML(copy.role)}</p></div>
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

    ${copy.stage || copy.roleScope || copy.deliverables ? `
      <section class="detail-brief" aria-label="${t("detail.scope")}">
        <div class="detail-brief-grid">
          <div><span class="detail-label">${t("detail.stage")}</span><p>${escapeHTML(copy.stage || copy.projectType || copy.year)}</p></div>
          <div><span class="detail-label">${t("detail.scope")}</span><p>${escapeHTML(copy.roleScope || copy.role)}</p></div>
        </div>
        ${copy.deliverables?.length ? `<div><span class="detail-label">${t("detail.deliverables")}</span><ul>${copy.deliverables.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></div>` : ""}
      </section>
    ` : ""}

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

    <details class="detail-contents"><summary>${t("detail.contents")}</summary><nav aria-label="${t("detail.contents")}">${copy.sections.map((section, sectionIndex) => `<a href="#section-${sectionIndex + 1}">${escapeHTML(section.label)} · ${escapeHTML(section.title)}</a>`).join("")}</nav></details>

    <section class="detail-materials">
      ${copy.sections
        .map(
          (section, sectionIndex) => `
            <article id="section-${sectionIndex + 1}" class="material-card${section.wide ? " is-wide" : ""}${section.video ? " has-video" : ""}${section.media || section.matrix ? " has-media-collection" : ""}${section.zoom ? " is-document" : ""}${!section.image && !section.video && !section.media && !section.matrix ? " is-text-only" : ""}">
              <div class="material-copy">
                <span class="detail-label">${section.label}</span>
                <h2>${section.title}</h2>
                <p>${section.text}</p>
                ${section.points?.length ? `<ul class="material-points">${section.points.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul>` : ""}
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

    ${copy.sourceUrl ? `<aside class="detail-source"><span class="detail-label">${t("detail.source")}</span><a href="${escapeHTML(copy.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(copy.sourceLabel || copy.sourceUrl)} ↗</a></aside>` : ""}

    <nav class="project-pager" aria-label="Project switcher">
      <a href="project.html?slug=${previous.slug}">← ${previousCopy.title}</a>
      <a href="project.html?slug=${next.slug}">${nextCopy.title} →</a>
    </nav>
  `;

  document.title = `${copy.title} · Lilian Portfolio`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy.summary);
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
