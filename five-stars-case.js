import { content } from './five-stars-copy.js?v=20261112';

const main = document.querySelector('#main');
const language = document.querySelector('#language');
const theme = document.querySelector('#theme');
const params = new URLSearchParams(location.search);
const preferredLanguage = params.get('lang') || localStorage.getItem('lilian-language');
let lang = preferredLanguage === 'en' ? 'en' : 'zh';
let currentTheme = localStorage.getItem('lilian-theme') === 'dark' ? 'dark' : 'light';

const official = 'https://fivestarsedu.com';
const homepageImage = 'assets/portfolio/five-stars-homepage.webp';
const teachersImage = 'assets/portfolio/five-stars-teachers.webp';
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = 'five-stars-case.css?v=20261112';
document.head.append(stylesheet);
main.classList.add('five-stars');

const external = (url, label, className = 'fs-link') =>
  `<a class="${className}" href="${url}" target="_blank" rel="noopener">${label}<span aria-hidden="true">↗</span></a>`;

const chapterHeading = (chapter, index) => `
  <div class="chapter-header">
    <span class="chapter-number" aria-hidden="true">0${index + 1}</span>
    <h2>${chapter.title}</h2>
    <p class="chapter-intro">${chapter.intro}</p>
  </div>`;

function setTheme() {
  document.body.dataset.theme = currentTheme;
  document.documentElement.dataset.theme = currentTheme;
  theme.setAttribute('aria-pressed', String(currentTheme === 'dark'));
}

function render() {
  const t = content[lang];
  const [discovery, comparison, booking] = t.chapters;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.body.dataset.lang = lang;
  document.title = 'Five Stars · Lilian Zhou';
  document.querySelector('meta[name="description"]').content = t.lead;

  main.innerHTML = `
    <section class="case-cover">
      <a class="back" href="work.html">← ${t.back}</a>
      <div class="fs-cover">
        <div>
          <p class="eyebrow">${t.category}</p>
          <h1>Five Stars</h1>
          <h2 class="subtitle">${t.subtitle}</h2>
          <p class="lead">${t.lead}</p>
          ${external(official + '/', t.visit, 'fs-visit')}
        </div>
        <figure class="fs-home">
          <a class="fs-browser" href="${official}/" target="_blank" rel="noopener" aria-label="${t.visit}">
            <span class="fs-address" aria-hidden="true">fivestarsedu.com <span>↗</span></span>
            <img src="${homepageImage}" width="1440" height="1002" alt="${t.homeAlt}" fetchpriority="high">
          </a>
          <figcaption>${t.homeCaption}</figcaption>
        </figure>
      </div>
      <dl class="facts">
        ${t.facts.map(([label, detail]) => `<div><dt>${label}</dt><dd>${detail}</dd></div>`).join('')}
      </dl>
    </section>

    <nav class="case-toc" aria-label="${t.contents}">
      <a href="#question">${t.problemLabel}</a>
      ${t.chapters.map((chapter, index) => `<a href="#chapter-${index + 1}">${chapter.nav}</a>`).join('')}
      <a href="#reflection">${t.outcomeLabel}</a>
    </nav>

    <section class="proposition" id="question">
      <span class="small-label">${t.problemLabel}</span>
      <div>
        <h2>${t.question}</h2>
        <p class="fs-context">${t.context}</p>
      </div>
    </section>

    <section class="chapter" id="chapter-1">
      ${chapterHeading(discovery, 0)}
      <div class="chapter-content">
        <figure class="fs-journey">
          <ol aria-label="${discovery.journeyLabel}">
            ${discovery.steps.map(([label, detail]) => `<li><strong>${label}</strong><span>${detail}</span></li>`).join('')}
          </ol>
          <figcaption>${discovery.caption}</figcaption>
        </figure>
        <dl class="fs-intents">
          ${discovery.entries.map(([label, detail]) => `<div><dt>${label}</dt><dd>${detail}</dd></div>`).join('')}
        </dl>
      </div>
    </section>

    <section class="chapter fs-comparison" id="chapter-2">
      ${chapterHeading(comparison, 1)}
      <div class="chapter-content fs-comparison-grid">
        <div class="fs-decision">
          <h3>${comparison.layersTitle}</h3>
          ${comparison.layers.map(([label, question, detail]) => `
            <article>
              <p class="eyebrow">${label}</p>
              <h4>${question}</h4>
              <p>${detail}</p>
            </article>`).join('')}
          ${external(official + '/teachers', comparison.open)}
        </div>
        <figure class="fs-teachers">
          <a class="fs-browser" href="${teachersImage}" target="_blank" rel="noopener" aria-label="${comparison.enlarge}">
            <span class="fs-address" aria-hidden="true">fivestarsedu.com/teachers <span>↗</span></span>
            <img src="${teachersImage}" width="1440" height="2423" alt="${comparison.imageAlt}" loading="lazy" decoding="async">
          </a>
          <figcaption>${comparison.imageCaption}</figcaption>
        </figure>
      </div>
    </section>

    <section class="chapter" id="chapter-3">
      ${chapterHeading(booking, 2)}
      <div class="chapter-content">
        <div class="fs-paths">
          ${booking.paths.map(([label, steps, detail]) => `
            <article>
              <h3>${label}</h3>
              <p class="fs-path-steps">${steps}</p>
              <p>${detail}</p>
            </article>`).join('')}
        </div>
        <div class="fs-related">
          ${external(official + '/teachers/cmmqf1tbi000q01ohxx10ipmz', booking.profileLink)}
          ${external(official + '/register?role=teacher', booking.teacherLink)}
        </div>
      </div>
    </section>

    <section class="reflection" id="reflection">
      <span class="small-label">${t.outcomeLabel}</span>
      <div>
        <h2>${t.outcomeTitle}</h2>
        <p>${t.outcome}</p>
        <p class="fs-source">${t.sourceNote}</p>
        ${external(official + '/', t.visit, 'fs-visit')}
      </div>
    </section>

    <a class="next-work" href="project.html?slug=rako-rako-ramen">
      <div><span class="small-label">${t.next}</span><h2>Rako Rako Ramen</h2></div>
      <span class="next-arrow" aria-hidden="true">↗</span>
    </a>`;
}

language.addEventListener('click', () => {
  const y = window.scrollY;
  lang = lang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('lilian-language', lang);
  if (params.has('lang')) {
    params.set('lang', lang);
    history.replaceState(null, '', `${location.pathname}?${params}${location.hash}`);
  }
  render();
  window.scrollTo({ top: y, behavior: 'instant' });
});

theme.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('lilian-theme', currentTheme);
  setTheme();
});

setTheme();
render();
if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
