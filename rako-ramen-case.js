const site = 'https://www.rakorakoramen.co.uk';
const media = 'assets/portfolio/rako-rako';
const copy = {
  zh: {
    back: '所有作品',
    category: '品牌官网 · 电商 UI / UE',
    subtitle: '第一次买冷冻拉面，怎么选口味、买几碗？',
    lead: 'Rako Rako Ramen 是一个英国冷冻拉面品牌。我参与设计品牌官网与商店体验，从首页解释产品，到目录比较口味和份量，再到详情页完成选配和加购。',
    visit: '访问 Rako Rako Ramen 官网',
    heroAlt: '筷子夹起一片叉烧，碗里有拉面和配料',
    heroCaption: '项目原始拉面摄影',
    facts: [
      ['项目', '英国冷冻拉面品牌 · 2026.02–05'],
      ['我的职责', '参与品牌官网与电商 UI／UE，梳理首页、商品目录、快速查看、加购和配送 FAQ。'],
      ['交付', '桌面与移动端界面、商品卡片和购买流程。']
    ],
    toc: ['设计问题', '品牌首页', '商品目录', '选配与加购', '交付成果'],
    contents: '项目章节',
    question: '用户在加购前，需要知道什么？',
    context: '第一次买冷冻拉面的人，要先知道它如何保存、怎么加热，再判断口味、份量和配送是否适合自己。我把这些问题安排在首页、目录和详情页各自最容易被看到的位置。',
    brand: {
      title: '让首页先说清这是一碗什么样的拉面',
      intro: '用拉面大图展示成品，搭配「10 分钟即食、慢熬汤底、冷冻保鲜」等短信息，回答它是什么、为什么适合在家吃。首屏把 Shop All 放在品牌介绍旁，感兴趣的用户可以直接去选购。',
      imageAlt: 'Rako Rako Ramen 首页原始设计稿，含主导航、产品摄影、Shop All 入口及产品卖点',
      imageCaption: '首页原始设计稿 · 点击查看完整首屏',
      enlarge: '放大查看首页设计稿',
      roroAlt: '坐在橙色拉面碗里的 Roro-chan 品牌角色',
      roroCaption: 'Roro-chan 原始品牌插画',
      aside: '用 Roro-chan 和日文细节延续品牌语气。产品类型、食用方式和操作按钮用清晰的英文呈现，方便英国市场用户扫读。'
    },
    catalogue: {
      title: '单碗看口味，组合装看份量',
      intro: '单碗卡片把商品图、口味名、辣度和价格放在固定位置，方便横向比较。组合装的标题直接写出碗数，让想尝鲜的人和计划囤货的人从同一目录找到合适选项。甜点另设分区。',
      lists: [
        ['单碗 · 口味与辣度', [
          ['经典豚骨', 'Classic Tonkotsu · Mild'],
          ['辛辣豚骨', 'Spicy Tonkotsu · Spicy'],
          ['黑蒜豚骨', 'Black Garlic Tonkotsu · Mild']
        ]],
        ['组合装 · 份量与用途', [
          ['4 碗尝鲜装', 'Ramen Sampler Box · 试吃不同口味'],
          ['6 碗囤货装', 'Freezer Stock Box · 家庭备餐'],
          ['8 碗工作日晚餐装', 'Weeknight Rescue Box · 多餐储备']
        ]]
      ],
      caption: '目录信息结构 · 以官网当前商品为例',
      open: '查看官网商品目录'
    },
    purchase: {
      title: '让简单商品快速加购，复杂商品先完成选配',
      intro: '把 Quick View 和 Add to Cart 放在商品卡上。对已知道要买什么的人，卡片直接提供下一步。对仍在比较的人，快速查看和商品详情提供继续了解的入口。',
      paths: [
        ['单碗 · 选口味后确认数量', ['比较口味与辣度', '查看商品信息或选择数量', '加入购物车'], '把配料、营养及加热方式放在详情页，帮助用户按需核对。'],
        ['组合装 · 先选搭配，再加购', ['选定组合装份量', '以 4 碗装为例，选择口味组合与赠品', '确认数量后加入购物车'], '在商品详情提供冷冻保存提示，配送说明集中在独立服务页。']
      ],
      box: '查看 4 碗装的实际选配',
      delivery: '查看配送说明'
    },
    outcomeTitle: '把品牌表达延续到商品和加购',
    outcome: '设计交付覆盖首页、商品卡片、快速查看、商品详情和配送 FAQ。我参与桌面与移动端的界面适配及品牌一致性走查，让用户在不同屏幕上都能按口味、份量和选配要求完成选购。',
    next: '下一个项目'
  },
  en: {
    back: 'Selected work',
    category: 'Brand website · E-commerce UI / UX',
    subtitle: 'Help first-time shoppers choose a flavour and a pack size',
    lead: 'Rako Rako Ramen is a UK frozen ramen brand. I contributed to the website and shop experience, from introducing the product on the homepage to comparing flavours and pack sizes and configuring a purchase.',
    visit: 'Visit the Rako Rako Ramen website',
    heroAlt: 'Chopsticks lift a slice of chashu above a bowl of ramen',
    heroCaption: 'Original ramen photography from the project',
    facts: [
      ['Project', 'UK frozen ramen brand · Feb–May 2026'],
      ['My contribution', 'Brand website and e-commerce UI/UX across the homepage, catalogue, Quick View, cart entry and delivery FAQs.'],
      ['Deliverables', 'Desktop and mobile screens, product cards and shopping flows.']
    ],
    toc: ['Design question', 'Brand homepage', 'Catalogue', 'Options and cart', 'Deliverables'],
    contents: 'Case study chapters',
    question: 'What do shoppers need to know before adding ramen to their cart?',
    context: 'First-time shoppers need to know how frozen ramen is stored and reheated. They also need to compare flavour, pack size and delivery. I placed each answer where it could support the next decision.',
    brand: {
      title: 'Show what a bowl of frozen ramen offers',
      intro: 'A large food photograph shows the finished bowl. Short messages on ten-minute preparation, slow-simmered broth and freezing explain why it fits an at-home meal. Shop All gives interested shoppers a direct route from the introduction to the catalogue.',
      imageAlt: 'Original Rako Rako Ramen homepage design with full navigation, product photography, Shop All and product benefits',
      imageCaption: 'Original homepage design · Click to enlarge',
      enlarge: 'Open the original homepage design',
      roroAlt: 'Roro-chan sitting in an orange bowl of ramen',
      roroCaption: 'Original Roro-chan brand illustration',
      aside: 'Roro-chan and Japanese details carry the brand voice. Plain English keeps the product, preparation and actions easy to scan for UK shoppers.'
    },
    catalogue: {
      title: 'Compare single bowls by flavour and boxes by size',
      intro: 'Single-bowl cards give photography, flavour name, heat level and price a consistent position. Box titles lead with bowl count, so people can choose a sampler or stock up. Desserts have their own section.',
      lists: [
        ['Single bowls · Flavour and heat', [
          ['Classic Tonkotsu', 'Mild'],
          ['Spicy Tonkotsu', 'Spicy'],
          ['Black Garlic Tonkotsu', 'Mild']
        ]],
        ['Boxes · Pack size and use', [
          ['Ramen Sampler Box · 4 bowls', 'Try different flavours'],
          ['Freezer Stock Box · 6 bowls', 'Stock the freezer'],
          ['Weeknight Rescue Box · 8 bowls', 'Plan several dinners']
        ]]
      ],
      caption: 'Catalogue information structure · Examples from the current shop',
      open: 'Explore the live catalogue'
    },
    purchase: {
      title: 'Match the cart path to the choices a product requires',
      intro: 'Quick View and Add to Cart sit on the product cards. Shoppers who have decided can act from the catalogue. Shoppers who need more information can open a preview or a product page.',
      paths: [
        ['Single bowl · Choose a flavour and quantity', ['Compare flavour and heat', 'Review details or select a quantity', 'Add to cart'], 'Ingredients, nutrition and preparation are available on the product page.'],
        ['Box · Choose the contents before adding', ['Choose a pack size', 'For the 4-bowl box, select a flavour combination and gift', 'Confirm quantity and add to cart'], 'Storage instructions sit with the product. Delivery terms have a dedicated service page.']
      ],
      box: 'See the live 4-bowl configuration',
      delivery: 'See delivery information'
    },
    outcomeTitle: 'Carry the brand through product choice and into the cart',
    outcome: 'The design covered the homepage, product cards, Quick View, product pages and delivery FAQs. I contributed to desktop and mobile layouts and reviewed brand consistency so the same flavour, pack size and configuration information remains easy to find.',
    next: 'Next project'
  }
};

const main = document.querySelector('#main');
const language = document.querySelector('#language');
const theme = document.querySelector('#theme');
const params = new URLSearchParams(location.search);
let lang = (params.get('lang') || localStorage.getItem('lilian-language')) === 'en' ? 'en' : 'zh';
let currentTheme = localStorage.getItem('lilian-theme') === 'dark' ? 'dark' : 'light';

const css = document.createElement('link');
css.rel = 'stylesheet';
css.href = 'rako-ramen-case.css?v=20261112';
document.head.append(css);
main.classList.add('rako-case');

const external = (href, label, className = 'rako-link') =>
  `<a class="${className}" href="${href}" target="_blank" rel="noopener">${label}<span aria-hidden="true">↗</span></a>`;

const chapterHeader = (chapter, number) => `
  <div class="chapter-header">
    <span class="chapter-number" aria-hidden="true">0${number}</span>
    <h2>${chapter.title}</h2><p class="chapter-intro">${chapter.intro}</p>
  </div>`;

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;
  document.body.dataset.theme = currentTheme;
  theme.setAttribute('aria-pressed', String(currentTheme === 'dark'));
}

function render() {
  const t = copy[lang];
  const anchors = ['question', 'chapter-1', 'chapter-2', 'chapter-3', 'reflection'];
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.body.dataset.lang = lang;
  document.title = 'Rako Rako Ramen · Lilian Zhou';
  document.querySelector('meta[name="description"]').content = t.lead;

  main.innerHTML = `
    <section class="case-cover">
      <a class="back" href="work.html">← ${t.back}</a>
      <div class="rako-cover-grid">
        <div>
          <p class="eyebrow">${t.category}</p>
          <h1>Rako Rako Ramen</h1>
          <h2 class="subtitle">${t.subtitle}</h2>
          <p class="lead">${t.lead}</p>
          ${external(site + '/', t.visit, 'rako-button')}
        </div>
        <figure class="rako-hero">
          <img src="${media}/rako-ramen-photo.webp" width="1440" height="960" alt="${t.heroAlt}" fetchpriority="high">
          <figcaption>${t.heroCaption}</figcaption>
        </figure>
      </div>
      <dl class="facts">${t.facts.map(([label, detail]) => `<div><dt>${label}</dt><dd>${detail}</dd></div>`).join('')}</dl>
    </section>

    <nav class="case-toc" aria-label="${t.contents}">
      ${t.toc.map((label, index) => `<a href="#${anchors[index]}">${label}</a>`).join('')}
    </nav>

    <section class="proposition" id="question">
      <span class="small-label">${t.toc[0]}</span>
      <div><h2>${t.question}</h2><p class="rako-context">${t.context}</p></div>
    </section>

    <section class="chapter" id="chapter-1">
      ${chapterHeader(t.brand, 1)}
      <div class="chapter-content rako-brand-grid">
        <figure class="rako-design">
          <a href="${media}/rako-home-design.webp" target="_blank" rel="noopener" aria-label="${t.brand.enlarge}">
            <img src="${media}/rako-home-design.webp" width="1600" height="1060" alt="${t.brand.imageAlt}" loading="lazy">
          </a>
          <figcaption>${t.brand.imageCaption}</figcaption>
        </figure>
        <aside class="rako-brand-aside">
          <figure class="rako-roro">
            <img src="${media}/rako-roro-bowl.webp" width="900" height="842" alt="${t.brand.roroAlt}" loading="lazy">
            <figcaption>${t.brand.roroCaption}</figcaption>
          </figure>
          <p>${t.brand.aside}</p>
        </aside>
      </div>
    </section>

    <section class="chapter" id="chapter-2">
      ${chapterHeader(t.catalogue, 2)}
      <div class="chapter-content">
        <figure>
          <div class="rako-catalogue">${t.catalogue.lists.map(([title, products]) => `
            <article class="rako-list">
              <h3>${title}</h3><ul>${products.map(([name, note]) => `<li><strong>${name}</strong><span>${note}</span></li>`).join('')}</ul>
            </article>`).join('')}</div>
          <figcaption>${t.catalogue.caption}</figcaption>
        </figure>
        <div class="rako-links">${external(site + '/our-ramen', t.catalogue.open)}</div>
      </div>
    </section>

    <section class="chapter" id="chapter-3">
      ${chapterHeader(t.purchase, 3)}
      <div class="chapter-content">
        <div class="rako-paths">${t.purchase.paths.map(([title, steps, note]) => `
          <article class="rako-path">
            <h3>${title}</h3><ol>${steps.map(step => `<li>${step}</li>`).join('')}</ol><p>${note}</p>
          </article>`).join('')}</div>
        <div class="rako-links">
          ${external(site + '/product-page/ramen-box-4-bowl', t.purchase.box)}
          ${external(site + '/delivery-shipping', t.purchase.delivery)}
        </div>
      </div>
    </section>

    <section class="reflection" id="reflection">
      <span class="small-label">${t.toc[4]}</span>
      <div><h2>${t.outcomeTitle}</h2><p>${t.outcome}</p>${external(site + '/', t.visit)}</div>
    </section>

    <a class="next-work" href="project.html?slug=ea01u">
      <div><span class="small-label">${t.next}</span><h2>${lang === 'zh' ? '德赛西威 EA01U' : 'Desay SV EA01U'}</h2></div>
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
  applyTheme();
});

applyTheme();
render();
if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
