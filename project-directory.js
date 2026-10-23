(() => {
  const list = document.querySelector('#projectDirectoryList');
  if (!list) return;
  const order = ['ea01u','aurora-mood','equiflow','the-world-of-kantan','this-conversation','meditate-naturally','moving-crowds','clink','generative-hmi','five-stars','rako-rako-ramen'];
  const projects = new Map((window.LILIAN_PROJECTS || []).map(project => [project.slug, project]));
  const featured = new Map((window.LILIAN_FEATURED_CASES || []).map(project => [project.slug, project]));
  const translations = window.LILIAN_PROJECT_TRANSLATIONS || {};
  const records = [];
  order.forEach((slug, index) => {
    const project = projects.get(slug);
    if (!project) return;
    const link = document.createElement('a');
    link.className = 'directory-project';
    link.href = `project.html?slug=${encodeURIComponent(slug)}`;
    const number = document.createElement('span'); number.className = 'directory-number'; number.textContent = String(index + 1).padStart(2, '0'); number.setAttribute('aria-hidden','true');
    const title = document.createElement('span'); title.className = 'directory-title';
    const kind = document.createElement('span'); kind.className = 'directory-kind';
    const arrow = document.createElement('span'); arrow.className = 'directory-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden','true');
    link.append(number,title,kind,arrow);
    list.append(link);
    records.push({ project, slug, title, kind });
  });
  document.querySelector('.directory-count').textContent = String(records.length).padStart(2, '0');
  function translate() {
    const language = document.body.dataset.lang === 'en' ? 'en' : 'zh';
    records.forEach(({project,slug,title,kind}) => {
      const translated = (language === 'zh' && project.zh) || translations[language]?.[slug] || {};
      const feature = featured.get(slug);
      const copy = feature ? {...feature,...(language === 'zh' ? feature.zh || {} : {})} : null;
      title.textContent = copy?.title || translated.title || project.title;
      kind.textContent = copy?.kind || translated.meta || project.meta || '';
    });
  }
  new MutationObserver(translate).observe(document.body,{attributes:true,attributeFilter:['data-lang']});
  translate();
})();
