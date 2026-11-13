(() => {
  'use strict';

  const categories = {
    'vehicle-hmi': ['ea01u', 'aurora-mood', 'generative-hmi', 'clink'],
    'digital-design': ['icered', 'five-stars', 'rako-rako-ramen'],
    'immersive-experience': ['equiflow', 'the-world-of-kantan', 'meditate-naturally', 'this-conversation', 'moving-crowds']
  };

  const descriptions = {
    ea01u: {
      zh: '把日常用车任务组织为 Launcher 卡片，并设计语音助手与场景服务的交互路径。',
      en: 'Organises everyday driving tasks into Launcher cards and maps how the voice assistant connects to in-car services.'
    },
    'aurora-mood': {
      zh: '探索 HUD、中控屏和氛围反馈如何协同，支持驾驶信息呈现与 AI 陪伴。',
      en: 'Explores how the HUD, centre display and ambient feedback can support driving information and AI companionship.'
    },
    'generative-hmi': {
      zh: '用样式规则、组件模板和质量检查，规划可保持界面一致性的 HMI 页面生成流程。',
      en: 'Proposes an HMI generation workflow built around style rules, component templates and quality checks.'
    },
    equiflow: {
      zh: '通过 VR 绘画和 AI 反馈，探讨职场数字疗愈如何引导用户行为。',
      en: 'Uses VR drawing and AI feedback to examine how digital wellbeing tools shape behaviour at work.'
    },
    'the-world-of-kantan': {
      zh: '把生产力焦虑转化为可探索的细胞世界，用园艺游戏引导玩家放慢节奏。',
      en: 'Turns productivity anxiety into a cellular world where gardening encourages players to slow down.'
    },
    'meditate-naturally': {
      zh: '结合脑电感应与实时投影，把冥想过程中的状态变化转化为空间反馈。',
      en: 'Connects brainwave sensing with real-time projection to give meditation a visible response in space.'
    },
    'this-conversation': {
      zh: '用虚拟法庭和实体桌游，给青少年与家长一个表达和讨论冲突的空间。',
      en: 'Pairs a virtual court with a physical board game to help teenagers and parents discuss family conflicts.'
    },
    clink: {
      kind: { zh: '移动医疗与跨端交互', en: 'Mobile Healthcare / Cross-device Interaction' },
      zh: '串联移动医疗车、患者 App 与远程问诊，为老年糖尿病患者设计日常照护服务。',
      en: 'Connects a mobile clinic, patient app and remote consultations to support daily care for older adults with diabetes.'
    },
    'moving-crowds': {
      zh: '以气味识别和生物材料为线索，探讨未来人口流动中的身份识别。',
      en: 'Uses scent recognition and biomaterials to explore identity in a speculative future of human mobility.'
    },
    icered: {
      zh: '梳理 AI 对话的响应状态与会话衔接，并参与界面从设计到代码的交付迭代。',
      en: 'Defines AI response states and chat continuity, and supports iterations from design to code.'
    },
    'five-stars': {
      zh: '为家长和学生梳理筛选导师、比较资质到发起咨询的在线教育路径。',
      en: 'Designs a path for parents and students to filter tutors, compare credentials and make an enquiry.'
    },
    'rako-rako-ramen': {
      zh: '以口味、组合与库存状态组织商品浏览，衔接品牌故事与购买路径。',
      en: 'Organises flavours, bundles and stock information to connect brand storytelling with the shopping journey.'
    }
  };

  const revisedCovers = new Set(['equiflow', 'rako-rako-ramen', 'five-stars', 'clink']);

  function element(tag, className, parent) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    parent.append(node);
    return node;
  }

  function buildCard(slug, project, feature, grid, lead) {
    const card = element('a', `work-gallery-card${lead ? ' is-lead' : ''}`, grid);
    card.href = feature?.href || `project.html?slug=${encodeURIComponent(slug)}`;
    card.dataset.project = slug;

    const visual = element('div', 'work-gallery-visual', card);
    const image = element('img', '', visual);
    const cover = `assets/gallery/optimized/work-${slug}`;
    const version = revisedCovers.has(slug) ? '?v=20261113' : '';
    const smallCover = `${cover}-960.webp${version}`;
    const largeCover = `${cover}-1920.webp${version}`;
    const mobileSizes = '(max-width: 380px) calc(100vw - 36px), (max-width: 760px) calc(100vw - 44px)';
    image.width = 1920;
    image.height = 1080;
    image.sizes = lead ? `${mobileSizes}, (max-width: 1470px) 58vw, 845px` : `${mobileSizes}, (max-width: 1470px) 46vw, 655px`;
    image.alt = '';
    image.loading = slug === 'ea01u' ? 'eager' : 'lazy';
    image.decoding = 'async';
    image.draggable = false;
    if (slug === 'ea01u') image.fetchPriority = 'high';
    image.srcset = `${smallCover} 960w, ${largeCover} 1920w`;
    image.src = largeCover;

    const caption = element('div', 'work-gallery-caption', card);
    const kind = element('p', 'work-gallery-kind', caption);
    const title = element('h3', 'work-gallery-title', caption);
    const description = element('p', 'work-gallery-description', caption);
    const cta = element('span', 'work-gallery-cta', caption);
    const ctaText = element('span', '', cta);
    const arrow = element('span', '', cta);
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';

    title.id = `work-title-${slug}`;
    kind.id = `work-kind-${slug}`;
    description.id = `work-description-${slug}`;
    card.setAttribute('aria-labelledby', title.id);
    card.setAttribute('aria-describedby', `${kind.id} ${description.id}`);
    return { project, feature, slug, title, kind, description, ctaText };
  }

  function initialize() {
    const gallery = document.querySelector('#workGallery');
    if (!gallery || gallery.dataset.workGalleryReady === 'true') return;

    const projects = new Map((window.LILIAN_PROJECTS || []).filter(Boolean).map(project => [project.slug, project]));
    const translations = window.LILIAN_PROJECT_TRANSLATIONS || {};
    const featured = new Map((window.LILIAN_FEATURED_CASES || []).map(item => [item.slug, item]));
    const records = [];

    Object.entries(categories).forEach(([id, slugs]) => {
      const grid = gallery.querySelector(`#${id} .work-gallery-grid`);
      slugs.forEach((slug, index) => {
        const feature = featured.get(slug);
        const project = projects.get(slug) || feature;
        if (project) records.push(buildCard(slug, project, feature, grid, index === 0));
      });
    });

    function updateLanguage() {
      const language = document.body.dataset.lang === 'en' ? 'en' : 'zh';
      records.forEach(({ project, feature, slug, title, kind, description, ctaText }) => {
        const translation = (language === 'zh' && project.zh) || translations[language]?.[slug] || {};
        const featureCopy = language === 'zh' ? feature?.zh : feature;
        const copy = descriptions[slug];
        title.textContent = featureCopy?.title || translation.title || project.title;
        kind.textContent = copy.kind?.[language] || featureCopy?.kind || translation.meta || project.meta || '';
        description.textContent = copy[language];
        ctaText.textContent = language === 'en' ? 'View case study' : '查看案例';
      });
    }

    new MutationObserver(updateLanguage).observe(document.body, { attributes: true, attributeFilter: ['data-lang'] });
    updateLanguage();
    gallery.dataset.workGalleryReady = 'true';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
