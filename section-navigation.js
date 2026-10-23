(() => {
  const sections = [...document.querySelectorAll('section[data-page]')];
  const links = [...document.querySelectorAll('.global-header [data-nav]')];
  const pager = document.querySelector('.section-pager');
  const count = pager?.querySelector('span');
  const next = pager?.querySelector('a');
  if (!sections.length) return;
  const sectionIndexes = new Map(sections.map((section, index) => [section.id, index]));
  let frame = 0;
  let navigationIntent = null;
  let intentAppliedAtEnd = false;

  function rememberDestination(hash) {
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { id = ''; }
    navigationIntent = sectionIndexes.has(id) ? id : null;
    intentAppliedAtEnd = false;
  }

  function clearNavigationIntent() {
    navigationIntent = null;
    intentAppliedAtEnd = false;
    schedule();
  }

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
    const atEnd = scrollY + innerHeight >= document.documentElement.scrollHeight - 3;
    if (intentAppliedAtEnd && !atEnd) {
      navigationIntent = null;
      intentAppliedAtEnd = false;
    }
    // A short final section cannot reach the activation line. Honor its explicit
    // anchor only at the clamped destination; ordinary scrolling stays geometric.
    const intendedIndex = sectionIndexes.get(navigationIntent);
    if (atEnd && intendedIndex !== undefined && sections[intendedIndex].getBoundingClientRect().top > line) {
      index = intendedIndex;
      intentAppliedAtEnd = true;
    }
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
  addEventListener('hashchange', () => { normalizeHash(); rememberDestination(location.hash); schedule(); });
  addEventListener('popstate', () => { normalizeHash(); rememberDestination(location.hash); schedule(); });
  addEventListener('wheel', clearNavigationIntent, { passive: true });
  addEventListener('touchstart', clearNavigationIntent, { passive: true });
  addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) clearNavigationIntent();
  });
  document.addEventListener('click', event => {
    if (event.target.closest('summary')) { clearNavigationIntent(); return; }
    const link = event.target.closest('a[href]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = new URL(link.getAttribute('href'), document.baseURI);
    const normalizePath = path => path.replace(/\/index\.html$/, '/');
    if (destination.origin !== location.origin || normalizePath(destination.pathname) !== normalizePath(location.pathname) || !destination.hash) return;
    // The existing smooth-scroll handler uses pushState, which emits no hashchange.
    rememberDestination(destination.hash);
    schedule();
  }, { capture: true });
  addEventListener('pageshow', schedule);
  addEventListener('load', schedule);
  new MutationObserver(translate).observe(document.body, { attributes: true, attributeFilter: ['data-lang'] });
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(schedule);
    sections.forEach(section => observer.observe(section));
  }
  const aliases = { '#projects': '#project', '#portfolio': '#project', '#top': '#home', '#resume': '#cv' };
  function normalizeHash() {
    if (location.hash === '#gallery' || location.hash === '#work') { location.replace('work.html'); return; }
    const destination = aliases[location.hash];
    if (!destination) return;
    history.replaceState(null, '', destination);
    document.querySelector(destination)?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  normalizeHash();
  rememberDestination(location.hash);
  translate();
  update();
})();
