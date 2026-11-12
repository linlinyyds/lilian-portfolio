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
      intro: '单碗和组合装放在同一个拉面分区，甜点另设分区。用户先确定要买哪种、买几碗，再决定是否需要进入详情。',
      open: '查看官网商品目录'
    },
    purchase: {
      intro: '确认一碗拉面与选配一箱拉面，需要回答不同的问题。详情页共用商品图、价格和购买区的布局，选项随商品类型变化。',
      single: '查看单碗商品详情',
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
      intro: 'Single bowls and boxes share the ramen section. Desserts have their own section. Shoppers can narrow their choice by flavour and pack size before opening a product page.',
      open: 'Explore the live catalogue'
    },
    purchase: {
      intro: 'The detail pages share a layout for photography, price and purchase. The fields change with the product, since ordering one bowl and configuring a box require different decisions.',
      single: 'See the single-bowl product page',
      box: 'See the live 4-bowl configuration',
      delivery: 'See delivery information'
    },
    outcomeTitle: 'Carry the brand through product choice and into the cart',
    outcome: 'The design covered the homepage, product cards, Quick View, product pages and delivery FAQs. I contributed to desktop and mobile layouts and reviewed brand consistency so the same flavour, pack size and configuration information remains easy to find.',
    next: 'Next project'
  }
};

const shots = {
  catalogue: ['catalogue', 1760, 2178],
  quick: ['quick-view', 1600, 1078],
  classic: ['classic-detail', 1760, 1080],
  sampler: ['sampler-detail', 1760, 1213],
  preparation: ['preparation', 1760, 1796]
};

const design = {
  zh: {
    source: '官网实装界面',
    zoom: '放大查看',
    fullSize: '打开高清图',
    close: '关闭图片',
    journey: [
      ['理解商品', '先知道是冷冻拉面，以及如何在家吃。'],
      ['比较选项', '再按口味、辣度和碗数缩小范围。'],
      ['完成选购', '核对必选项、保存和配送信息后加购。']
    ],
    brand: [
      ['先展示一碗成品', '用拉面成品摄影和一句产品定位回答「卖的是什么」。把慢熬、速冻和加热时间收成短句，放在首屏下一层。'],
      ['把购买入口放在理解之后', 'Shop All 紧邻主介绍，About 留给想了解品牌的人。日文和角色插画延续识别，操作按钮用英文。']
    ],
    catalogue: {
      title: '目录把口味、份量和下一步放在同一屏',
      notes: [
        ['标签用于扫读', '辣度放在单碗商品图上角，名字和价格集中在图下，让用户在不同口味之间来回比较时，视线可以停在同一位置。'],
        ['组合装按购买任务区分', '4、6、8 碗放在组合名和主图里，赠品数量也能快速识别。用户可以先按尝鲜、囤货或备餐选份量，再到详情看具体内容。'],
        ['快速查看留在目录内', '保留背景目录位置，在浮层里展示主图、价格、数量和加购。配料和烹饪等长信息通过 View More Details 进入详情。']
      ]
    },
    configuration: {
      title: '两类商品沿用同一详情布局，购买表单按需变化',
      notes: [
        ['单碗只确认数量', '口味已经由所选商品决定，所以购买区只保留数量。产品说明、配料和营养信息放在购买操作下方，按需查看。'],
        ['四碗装先确认内容', '组合装在数量上方增加口味组合和赠品两个必选字段。把选择顺序和加购动作放在同一区域，减少用户往返查找。']
      ]
    },
    preparation: {
      nav: '保存与食用',
      title: '让购买前的疑问，在商品页内有答案',
      intro: '冷冻食品的体验延续到收货和食用。商品详情先提示冷冻保存，再通过「开盒、加热、开吃」概览和两套图解说明，把关键步骤讲清楚。配送范围和发货安排放在独立页面。',
      notes: [
        ['快速判断', '三步概览让第一次购买的人先判断是否方便，角色插画贯穿步骤。'],
        ['按设备查看做法', '锅煮和微波炉各有一份操作图，用户可以按自己的设备查看。']
      ],
      detail: '查看官网食用指导'
    },
    images: {
      catalogue: ['六张核心商品卡', '单碗用 Mild / Spicy 提示辣度，组合装用碗数和赠品区分规格。'],
      quick: ['Quick View 商品浮层', '直接调整数量并加购，或通过 View More Details 继续查看详情。'],
      classic: ['经典豚骨 · 单碗购买区', '数量与加购在上方，产品说明、配料和营养信息分区呈现。'],
      sampler: ['四碗尝鲜装 · 组合选配', '口味组合与赠品在数量之前，用户顺着表单确认箱内内容。'],
      preparation: ['从开盒到食用', '三步概览配合锅煮和微波炉图解，让购买前就能了解食用方式。']
    }
  },
  en: {
    source: 'Live storefront',
    zoom: 'Enlarge',
    fullSize: 'Open full-resolution image',
    close: 'Close image',
    journey: [
      ['Understand', 'Find out what frozen ramen is and how to prepare it.'],
      ['Compare', 'Shortlist by flavour, heat and number of bowls.'],
      ['Configure', 'Review options, storage and delivery before adding to cart.']
    ],
    brand: [
      ['Lead with the finished bowl', 'Food photography and one product line explain what is for sale. Short points about broth, freezing and preparation sit just below the main message.'],
      ['Give the introduction a next step', 'Shop All sits next to the product introduction. About serves visitors exploring the brand. Japanese details and the character carry the identity while actions are written in English.']
    ],
    catalogue: {
      title: 'Make flavour, pack size and the next action easy to compare',
      notes: [
        ['Labels support scanning', 'Heat level appears on the single-bowl image, with name and price underneath. Consistent positions make it easier to scan across flavours.'],
        ['Group boxes by shopping intent', 'Four, six and eight bowls are visible in the box names and imagery, alongside gifts. Shoppers can shortlist by how much they need before checking the exact contents.'],
        ['Keep Quick View in context', 'The overlay leaves the catalogue behind it and surfaces the photo, price, quantity and add-to-cart action. View More Details leads to longer product information.']
      ]
    },
    configuration: {
      title: 'Use a consistent detail layout and adapt the purchase form',
      notes: [
        ['Single bowl: confirm quantity', 'The chosen product already determines the flavour. The purchase area asks for quantity, with product, ingredient and nutrition information below.'],
        ['Four-bowl box: confirm contents first', 'The box adds two required fields above quantity for the flavour combination and gift. The fields and cart action sit together in the order shoppers need them.']
      ]
    },
    preparation: {
      nav: 'Storage and preparation',
      title: 'Answer practical questions before checkout',
      intro: 'Frozen food needs guidance through delivery and preparation. The detail page gives storage information first, then a three-step overview and illustrated instructions. Delivery coverage and dispatch information have their own page.',
      notes: [
        ['A quick overview', 'Unbox, cook and enjoy gives first-time shoppers a quick sense of effort. The character illustrates each step.'],
        ['Instructions by equipment', 'Separate stovetop and microwave guides help shoppers find the preparation method they use.']
      ],
      detail: 'See preparation on the product page'
    },
    images: {
      catalogue: ['The six core ramen cards', 'Single bowls show heat labels. Box cards show bowl counts and gifts.'],
      quick: ['Quick View overlay', 'Choose quantity and add to cart or open the full product page via View More Details.'],
      classic: ['Classic Tonkotsu · Single bowl', 'Quantity and purchase actions sit above the product, ingredients and nutrition sections.'],
      sampler: ['Ramen Sampler Box · Configuration', 'Flavour combination and gift come before quantity and the add-to-cart action.'],
      preparation: ['From unboxing to eating', 'A three-step overview and illustrated stovetop and microwave guides explain preparation.']
    }
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
css.href = 'rako-ramen-case.css?v=20261112-visuals';
document.head.append(css);
main.classList.add('rako-case');

const external = (href, label, className = 'rako-link') =>
  `<a class="${className}" href="${href}" target="_blank" rel="noopener">${label}<span aria-hidden="true">↗</span></a>`;

const chapterHeader = (chapter, number) => `
  <div class="chapter-header">
    <span class="chapter-number" aria-hidden="true">0${number}</span>
    <h2>${chapter.title}</h2><p class="chapter-intro">${chapter.intro}</p>
  </div>`;

function gallery(evidence, keys) {
  const single = keys.length === 1 ? ' rako-ui-gallery--single' : '';
  return `<div class="rako-ui-gallery${single}">${keys.map(key => {
    const [asset, width, height] = shots[key];
    const [title, detail] = evidence.images[key];
    return `<figure class="rako-ui-shot">
      <button class="rako-ui-image" type="button" data-rako-shot="${key}" aria-label="${evidence.zoom} ${title}" aria-haspopup="dialog">
        <img src="${media}/rako-ui-${asset}.webp" width="${width}" height="${height}" alt="${title}" loading="lazy" decoding="async">
        <span class="rako-ui-zoom" aria-hidden="true">↗</span>
      </button>
      <figcaption><strong>${title}</strong><small>${evidence.source}</small><p>${detail}</p></figcaption>
    </figure>`;
  }).join('')}</div>`;
}

function designNotes(items) {
  return `<dl class="rako-design-notes">${items.map(([title, detail]) => `<div><dt>${title}</dt><dd>${detail}</dd></div>`).join('')}</dl>`;
}

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;
  document.body.dataset.theme = currentTheme;
  theme.setAttribute('aria-pressed', String(currentTheme === 'dark'));
}

function render() {
  const t = copy[lang];
  const e = design[lang];
  const chapters = [
    ['question', t.toc[0]], ['chapter-1', t.toc[1]], ['chapter-2', t.toc[2]],
    ['chapter-3', t.toc[3]], ['chapter-4', e.preparation.nav], ['reflection', t.toc[4]]
  ];
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
      ${chapters.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}
    </nav>

    <section class="proposition" id="question">
      <span class="small-label">${t.toc[0]}</span>
      <div><h2>${t.question}</h2><p class="rako-context">${t.context}</p>${designNotes(e.journey)}</div>
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
      <div class="chapter-content">${designNotes(e.brand)}</div>
    </section>

    <section class="chapter" id="chapter-2">
      ${chapterHeader({ title: e.catalogue.title, intro: t.catalogue.intro }, 2)}
      <div class="chapter-content">
        ${gallery(e, ['catalogue', 'quick'])}
        ${designNotes(e.catalogue.notes)}
        <div class="rako-links">${external(site + '/our-ramen', t.catalogue.open)}</div>
      </div>
    </section>

    <section class="chapter" id="chapter-3">
      ${chapterHeader({ title: e.configuration.title, intro: t.purchase.intro }, 3)}
      <div class="chapter-content">
        ${gallery(e, ['classic', 'sampler'])}
        ${designNotes(e.configuration.notes)}
        <div class="rako-links">
          ${external(site + '/product-page/japanese-classic-tonkotsu-ramen', t.purchase.single)}
          ${external(site + '/product-page/ramen-box-4-bowl', t.purchase.box)}
        </div>
      </div>
    </section>

    <section class="chapter" id="chapter-4">
      ${chapterHeader(e.preparation, 4)}
      <div class="chapter-content rako-preparation">
        ${gallery(e, ['preparation'])}
        <div>
          ${designNotes(e.preparation.notes)}
          <div class="rako-links">
            ${external(site + '/product-page/japanese-classic-tonkotsu-ramen#comp-mp23ro6d', e.preparation.detail)}
            ${external(site + '/delivery-shipping', t.purchase.delivery)}
          </div>
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

const lightbox = document.querySelector('#lightbox');
main.addEventListener('click', event => {
  const button = event.target.closest('[data-rako-shot]');
  if (!button) return;
  const key = button.dataset.rakoShot;
  const e = design[lang];
  const [title] = e.images[key];
  const preview = button.querySelector('img');
  const image = document.createElement('img');
  image.src = preview.src;
  image.alt = title;
  lightbox.querySelector('.lightbox-media').replaceChildren(image);
  lightbox.setAttribute('aria-label', title);
  lightbox.querySelector('.lightbox-close').setAttribute('aria-label', e.close);
  const link = document.createElement('a');
  link.href = preview.src;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = e.fullSize + ' ↗';
  lightbox.querySelector('p').replaceChildren(title + ' · ', link);
  lightbox.showModal();
});

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
