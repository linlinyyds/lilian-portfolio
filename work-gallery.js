/* One card per project. Language changes update existing card nodes in place. */
(() => {
  'use strict';

  function initialize() {
    const grid = document.querySelector('#workGallery');
    if (!grid || grid.dataset.workGalleryReady === 'true') return;
    grid.dataset.workGalleryReady = 'true';

    const projects = window.LILIAN_PROJECTS || [];
    const translations = window.LILIAN_PROJECT_TRANSLATIONS || {};
    const featured = new Map((window.LILIAN_FEATURED_CASES || []).map(item => [item.slug, item]));
    const uniqueProjects = new Map(projects.filter(item => item && item.slug).map(item => [item.slug, item]));
    const order = ['ea01u', 'aurora-mood', 'equiflow', 'the-world-of-kantan', 'this-conversation', 'meditate-naturally', 'moving-crowds', 'clink', 'generative-hmi', 'five-stars', 'rako-rako-ramen'];
    const ordered = [...order.filter(slug => uniqueProjects.has(slug)), ...[...uniqueProjects.keys()].filter(slug => !order.includes(slug))];
    const visuals = {
      'ea01u': { src: 'assets/portfolio/ea01u/cover.png', width: 1280, height: 720 },
      'aurora-mood': { src: 'assets/portfolio/aurora-mood/aurora-01-cover.jpg', width: 3200, height: 1800 },
      'equiflow': { src: 'assets/editorial-home-equiflow.jpg', width: 1024, height: 576 },
      'the-world-of-kantan': { src: 'assets/editorial-home-the-world-of-kantan.jpg', width: 1400, height: 693 },
      'this-conversation': { src: 'assets/editorial-home-this-conversation.jpg', width: 1400, height: 795 },
      'meditate-naturally': { src: 'assets/editorial-home-meditate-naturally.jpg', width: 968, height: 1299, contain: true, background: '#071d20' },
      'moving-crowds': { src: 'assets/editorial-home-moving-crowds.jpg', width: 1400, height: 1260 },
      'clink': { src: 'assets/editorial-home-clink.jpg', width: 1400, height: 914 },
      'generative-hmi': { src: 'assets/editorial-generative-overview.svg', width: 1200, height: 800, contain: true, background: '#eeeee7' },
      'five-stars': { src: 'assets/editorial-home-five-stars.jpg', width: 1440, height: 810 },
      'rako-rako-ramen': { src: 'assets/editorial-home-rako-rako-ramen.jpg', width: 1400, height: 928 }
    };
    const resolveAsset = src => window.LILIAN_ASSETS?.[src] || src;
    const records = [];
    const fragment = document.createDocumentFragment();

    function element(tag, className, parent) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (parent) parent.append(node);
      return node;
    }

    function arrow() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M5 19 19 5M5 5h14v14');
      svg.append(path);
      return svg;
    }

    ordered.forEach(slug => {
      const project = uniqueProjects.get(slug);
      const visual = visuals[slug] || { src: project.galleryImage || project.image };
      const card = element('a', `work-gallery-card${visual.contain ? ' is-contain' : ''}`, fragment);
      card.href = `project.html?slug=${encodeURIComponent(slug)}`;
      card.dataset.project = slug;
      const imageWrap = element('div', 'work-gallery-visual', card);
      if (visual.background) imageWrap.style.setProperty('--work-mat-color', visual.background);
      const image = element('img', '', imageWrap);
      image.src = resolveAsset(visual.src);
      if (visual.width) image.width = visual.width;
      if (visual.height) image.height = visual.height;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      const cta = element('span', 'work-gallery-cta', imageWrap);
      cta.setAttribute('aria-hidden', 'true');
      const ctaText = element('span', '', cta);
      cta.append(arrow());
      const caption = element('div', 'work-gallery-caption', card);
      const title = element('h3', 'work-gallery-title', caption);
      title.id = `work-title-${slug}`;
      const kind = element('p', 'work-gallery-kind', caption);
      kind.id = `work-kind-${slug}`;
      const linkMark = element('span', 'work-gallery-card-arrow', caption);
      linkMark.textContent = '↗';
      linkMark.setAttribute('aria-hidden', 'true');
      card.setAttribute('aria-labelledby', title.id);
      card.setAttribute('aria-describedby', kind.id);
      records.push({ project, slug, card, image, ctaText, title, kind });
    });

    grid.replaceChildren(fragment);
    let frame = 0;

    function updateLanguage() {
      frame = 0;
      const language = document.body.dataset.lang === 'en' ? 'en' : 'zh';
      const english = language === 'en';
      const view = english ? 'View project' : '查看项目';
      records.forEach(record => {
        const { project, slug } = record;
        const translated = (language === 'zh' && project.zh) || translations[language]?.[slug] || {};
        const feature = featured.get(slug);
        const featureCopy = feature ? { ...feature, ...(language === 'zh' ? feature.zh || {} : {}) } : null;
        const title = featureCopy?.title || translated.title || project.title;
        const kind = featureCopy?.kind || translated.meta || project.meta || '';
        if (record.title.textContent !== title) record.title.textContent = title;
        if (record.kind.textContent !== kind) record.kind.textContent = kind;
        if (record.ctaText.textContent !== view) record.ctaText.textContent = view;
        const alt = english ? `${title} — project preview` : `${title} — 项目预览`;
        if (record.image.alt !== alt) record.image.alt = alt;
      });
      grid.dataset.language = language;
    }

    const observer = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(updateLanguage);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-lang'] });
    updateLanguage();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
