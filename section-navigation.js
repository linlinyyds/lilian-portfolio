(() => {
  const sections = [...document.querySelectorAll('section[data-page]')];
  const links = [...document.querySelectorAll('.global-header [data-nav]')];
  const pager = document.querySelector('.section-pager');
  const count = pager?.querySelector('span');
  const next = pager?.querySelector('a');
  if (!sections.length) return;
  let frame = 0;

  function translate() {
    const english = document.body.dataset.lang === 'en';
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
      el.textContent = english ? el.dataset.en : el.dataset.zh;
    });
    document.querySelectorAll('[data-alt-zh][data-alt-en]').forEach(el => {
      el.alt = english ? el.dataset.altEn : el.dataset.altZh;
    });
    if (pager) pager.setAttribute('aria-label', english ? 'Section navigation' : '分屏导航');
    schedule();
  }

  function update() {
    frame = 0;
    const line = Math.min(innerHeight * .28, 190);
    let index = 0;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= line) index = i;
    });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 3) index = sections.length - 1;
    const current = sections[index];
    document.body.dataset.activeSection = current.id;
    const group = current.id === 'cv' ? 'about' : current.id === 'project' ? 'work' : current.id;
    links.forEach(link => {
      if (link.dataset.nav === group) {
        if (link.getAttribute('aria-current') !== 'location') link.setAttribute('aria-current', 'location');
      } else link.removeAttribute('aria-current');
    });
    if (count) count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(sections.length).padStart(2, '0');
    if (next) {
      const last = index === sections.length - 1;
      next.href = '#' + (last ? sections[0] : sections[index + 1]).id;
      next.textContent = last ? '↑' : '↓';
      next.setAttribute('aria-label', document.body.dataset.lang === 'en' ? (last ? 'Back to the cover' : 'Next section') : (last ? '返回首页' : '浏览下一屏'));
    }
  }

  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  addEventListener('hashchange', schedule);
  addEventListener('pageshow', schedule);
  addEventListener('load', schedule);
  new MutationObserver(translate).observe(document.body, { attributes: true, attributeFilter: ['data-lang'] });
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(schedule);
    sections.forEach(section => observer.observe(section));
  }
  const aliases = { '#work': '#project', '#top': '#home', '#resume': '#cv' };
  if (aliases[location.hash]) {
    history.replaceState(null, '', aliases[location.hash]);
    document.querySelector(aliases[location.hash])?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  translate();
  update();
})();
