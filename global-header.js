/* Page scripts own language/theme switching; this component reflects their state. */
(() => {
  'use strict';

  function initialize() {
    const header = document.querySelector('.global-header');
    if (!header || header.dataset.globalHeaderReady === 'true') return;
    const nav = header.querySelector('.global-nav');
    const menu = header.querySelector('.global-menu-toggle');
    if (!nav || !menu) return;
    header.dataset.globalHeaderReady = 'true';

    const languageButton = header.querySelector('#language');
    const themeButton = header.querySelector('#theme');
    const menuLabel = menu.querySelector('[data-menu-label]');
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const savedTabIndexes = new WeakMap();
    const labels = {
      zh: { work: '作品', about: '关于 / CV', gallery: '探索', contact: '联系' },
      en: { work: 'Work', about: 'About / CV', gallery: 'Gallery', contact: 'Contact' }
    };
    let expanded = false;
    let syncFrame = 0;

    const language = () => document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'zh';
    const setAttribute = (element, name, value) => {
      if (element && element.getAttribute(name) !== value) element.setAttribute(name, value);
    };
    const setText = (element, value) => {
      if (element && element.textContent !== value) element.textContent = value;
    };

    function syncMenuLabel() {
      const english = language() === 'en';
      setText(menuLabel, expanded ? (english ? 'Close' : '关闭') : (english ? 'Menu' : '菜单'));
      setAttribute(menu, 'aria-label', expanded ? (english ? 'Close navigation' : '关闭导航菜单') : (english ? 'Open navigation' : '打开导航菜单'));
      setAttribute(menu, 'aria-expanded', String(expanded));
    }

    function setNavInteractive(interactive) {
      nav.inert = !interactive;
      setAttribute(nav, 'aria-hidden', String(!interactive));
      nav.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach(element => {
        if (!interactive) {
          if (!savedTabIndexes.has(element)) savedTabIndexes.set(element, element.getAttribute('tabindex'));
          setAttribute(element, 'tabindex', '-1');
        } else if (savedTabIndexes.has(element)) {
          const previous = savedTabIndexes.get(element);
          if (previous === null) element.removeAttribute('tabindex');
          else setAttribute(element, 'tabindex', previous);
          savedTabIndexes.delete(element);
        }
      });
    }

    function setMenu(open, { restoreFocus = false, focusFirst = false } = {}) {
      expanded = mobileQuery.matches && Boolean(open);
      header.classList.toggle('is-menu-open', expanded);
      setNavInteractive(!mobileQuery.matches || expanded);
      syncMenuLabel();
      if (expanded && focusFirst) nav.querySelector('a[href]')?.focus({ preventScroll: true });
      if (!expanded && restoreFocus && mobileQuery.matches) menu.focus({ preventScroll: true });
    }

    function normalizeHomeLinks() {
      if (document.body.dataset.navContext !== 'home') return;
      const normalizeIndex = path => path.replace(/\/index\.html$/, '/');
      const currentPath = normalizeIndex(location.pathname);
      header.querySelectorAll('a[href]').forEach(link => {
        const destination = new URL(link.getAttribute('href'), document.baseURI);
        if (destination.origin !== location.origin || normalizeIndex(destination.pathname) !== currentPath) return;
        const hash = destination.hash || (link.classList.contains('global-brand') ? '#home' : '');
        if (!hash) return;
        if (link.getAttribute('href') !== hash) link.setAttribute('href', hash);
        link.setAttribute('data-section-link', '');
      });
    }

    function synchronize() {
      syncFrame = 0;
      const lang = language();
      const english = lang === 'en';
      const theme = document.body.dataset.theme === 'dark' ? 'dark' : 'light';
      const context = document.body.dataset.navContext;
      header.dataset.theme = theme;
      header.dataset.lang = lang;
      const personName = english ? 'Lilian' : '周琳';
      const brand = header.querySelector('.global-brand');
      setText(brand, personName);
      setAttribute(brand, 'aria-label', english ? 'Lilian · Home' : '周琳 · 首页');
      document.querySelectorAll('[data-person-name]').forEach(element => setText(element, personName));
      document.querySelectorAll('[data-person-portrait]').forEach(element => setAttribute(element, 'alt', personName));
      setAttribute(nav, 'aria-label', english ? 'Main navigation' : '主导航');
      nav.querySelectorAll('a[data-nav]').forEach(link => {
        const key = link.dataset.nav;
        if (labels[lang][key]) setText(link, labels[lang][key]);
        if (context && context !== 'home') {
          if (key === context) setAttribute(link, 'aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      });

      if (languageButton) {
        let current = languageButton.querySelector('.lang-current');
        if (!current) {
          current = document.createElement('span');
          current.className = 'lang-current';
          current.setAttribute('aria-hidden', 'true');
          languageButton.replaceChildren(current);
        }
        setText(current, english ? 'EN' : '中');
        setAttribute(languageButton, 'aria-label', english ? 'Switch to Chinese' : '切换到英文');
        setAttribute(languageButton, 'aria-pressed', String(!english));
        languageButton.dataset.state = lang;
      }
      if (themeButton) {
        setAttribute(themeButton, 'aria-label', theme === 'dark' ? (english ? 'Switch to light mode' : '切换到浅色模式') : (english ? 'Switch to dark mode' : '切换到深色模式'));
        setAttribute(themeButton, 'aria-pressed', String(theme === 'dark'));
        themeButton.dataset.state = theme;
        themeButton.querySelectorAll('svg').forEach(svg => {
          setAttribute(svg, 'aria-hidden', 'true');
          setAttribute(svg, 'focusable', 'false');
        });
      }
      syncMenuLabel();
      normalizeHomeLinks();
    }

    function scheduleSync() {
      if (!syncFrame) syncFrame = requestAnimationFrame(synchronize);
    }

    menu.addEventListener('click', () => setMenu(!expanded, { focusFirst: !expanded }));
    nav.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      setMenu(false);
    });
    header.querySelector('.global-brand')?.addEventListener('click', () => setMenu(false));
    document.addEventListener('pointerdown', event => {
      if (expanded && !header.contains(event.target)) setMenu(false);
    }, { capture: true });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && expanded) {
        event.preventDefault();
        setMenu(false, { restoreFocus: true });
      }
    });
    mobileQuery.addEventListener('change', () => setMenu(false));
    window.addEventListener('pageshow', () => { setMenu(false); scheduleSync(); });

    const observer = new MutationObserver(scheduleSync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme', 'data-lang'] });

    if (!nav.id) nav.id = 'global-navigation';
    setAttribute(menu, 'aria-controls', nav.id);
    setMenu(false);
    synchronize();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
