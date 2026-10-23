(() => {
  const params = new URLSearchParams(location.search);
  let language = ['zh', 'en'].includes(params.get('lang')) ? params.get('lang') : localStorage.getItem('lilian-language') === 'en' ? 'en' : 'zh';
  function applyLanguage() {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.body.dataset.lang = language;
    document.title = language === 'en' ? 'Work · Lilian' : '作品 · 周琳';
    document.querySelectorAll('[data-zh][data-en]').forEach(element => { element.textContent = language === 'en' ? element.dataset.en : element.dataset.zh; });
    localStorage.setItem('lilian-language', language);
  }
  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('lilian-theme', theme);
  }
  document.querySelector('#language').addEventListener('click', () => { language = language === 'en' ? 'zh' : 'en'; applyLanguage(); });
  document.querySelector('#theme').addEventListener('click', () => applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark'));
  applyLanguage();
  applyTheme(localStorage.getItem('lilian-theme') === 'dark' ? 'dark' : 'light');
})();
