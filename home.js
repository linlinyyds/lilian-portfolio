(() => {
  'use strict';
  const allProjects = window.LILIAN_PROJECTS || [];
  let language = localStorage.getItem('lilian-language') === 'en' ? 'en' : 'zh';
  let selectedFilter = 'all';
  const e = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const copy = {
    zh:{resumeLabel:'下载简历 PDF',navWork:'作品',navAbout:'关于',navContact:'联系',heroLine1:'设计人与系统',heroLine2:'之间的交互。',heroNote:'从智能座舱到沉浸式体验，探索技术如何被理解、被使用，以及它如何影响人的感受。',explore:'浏览作品',workTitle:'项目精选',filterAll:'全部',filterInteractive:'沉浸与交互',filterServices:'服务与产品',aboutTitle:'让复杂的系统，<br>成为清晰的体验。',aboutP1:'我是周琳，交互与体验设计师，毕业于英国皇家艺术学院信息体验设计专业，目前在德赛西威从事智能座舱体验设计。',aboutP2:'我的工作从用户场景、信息架构和状态设计，延伸到交互原型、UE 文档与设计交付。也使用 AI 辅助工具探索设计到代码的流程，以及生成式 HMI 的可能性。',experienceTitle:'工作经历',present:'至今',desayName:'德赛西威',desayRole:'创新体验设计工程师',iceredRole:'AI 产品经理',nioName:'蔚来汽车',nioRole:'服务设计实习生',educationTitle:'教育背景',rcaName:'英国皇家艺术学院',rcaDegree:'信息体验设计 · 硕士',suesName:'上海工程技术大学',suesDegree:'艺术与科技 · 学士',languages:'普通话 / 英语可作为工作语言',backTop:'返回顶部 ↑',contactTitle:'聊聊设计，或打个招呼。'},
    en:{resumeLabel:'Download CV PDF',navWork:'Work',navAbout:'About',navContact:'Contact',heroLine1:'Designing interactions,',heroLine2:'between people & systems.',heroNote:'From intelligent cockpits to immersive experiences. Exploring how technology is understood, used, and felt.',explore:'Explore work',workTitle:'Selected work',filterAll:'All',filterInteractive:'Interactive',filterServices:'Services & products',aboutTitle:'Making complex systems<br>clear to experience.',aboutP1:'I’m Lilian Zhou, an interaction and experience designer with an MA in Information Experience Design from the Royal College of Art. I currently work on intelligent cockpit experiences at Desay SV.',aboutP2:'My practice connects user scenarios, information architecture and system states with interaction prototypes, UE documentation and design delivery. I also explore AI-assisted design-to-code workflows and generative HMI.',experienceTitle:'Experience',present:'Present',desayName:'Desay SV',desayRole:'Innovation Experience Design Engineer',iceredRole:'AI Product Manager',nioName:'NIO',nioRole:'Service Design Intern',educationTitle:'Education',rcaName:'Royal College of Art',rcaDegree:'MA · Information Experience Design',suesName:'Shanghai University of Engineering Science',suesDegree:'BA · Arts & Technology',languages:'Mandarin / Professional working English',backTop:'Back to top ↑',contactTitle:'A conversation starts here.'}
  };
  const curated = [
    {slug:'ea01u',category:'hmi',featured:true,image:'cover.png',kind:{zh:'AI 智能座舱 / HMI',en:'AI COCKPIT / HMI'},description:{zh:'连接 Launcher、虚拟个人助理与日常用车服务的交互研究和原型。',en:'Connecting Launcher, virtual assistants and everyday vehicle services through research and interaction prototypes.'}},
    {slug:'aurora-mood',category:'hmi',featured:true,image:'aurora-01-cover.jpg',kind:{zh:'座舱体验 / 个人概念',en:'COCKPIT EXPERIENCE / PERSONAL CONCEPT'},description:{zh:'通过 HUD、中控与 AI 陪伴，探索驾驶信息和氛围体验之间的关系。',en:'Exploring the relationship between driving information and ambient experience across HUD, center display and AI companionship.'}},
    {slug:'equiflow',category:'interactive',image:'equiflow.jpg',year:'2025',kind:{zh:'批判设计 / VR 装置',en:'CRITICAL DESIGN / VR INSTALLATION'},description:{zh:'以虚构疗愈公司为入口，追问数字关怀如何成为行为管理。',en:'A fictional healing company questions how digital care can become a form of behavioral management.'}},
    {slug:'generative-hmi',category:'hmi',image:null,kind:{zh:'生成式 HMI / 进行中',en:'GENERATIVE HMI / WORK IN PROGRESS'},description:{zh:'围绕风格规则、组件模板和质量检查，组织界面生成的应用方案。',en:'An ongoing application proposal for generating interfaces within style rules, component templates and explicit quality checks.'}},
    {slug:'clink',category:'services',image:'clink.jpg',kind:{zh:'医疗服务 / 系统设计',en:'HEALTHCARE / SERVICE DESIGN'},description:{zh:'从老年糖尿病患者的日常困难出发，连接远程问诊、检测和用药服务。',en:'A service concept connecting consultation, monitoring and medication around older adults living with diabetes.'}},
    {slug:'the-world-of-kantan',category:'interactive',image:'the-world-of-kantan.jpg',kind:{zh:'虚拟世界 / VR 体验',en:'WORLD BUILDING / VR EXPERIENCE'},description:{zh:'把生产力内疚转化为可探索的细胞世界，以园艺意象展开互动叙事。',en:'Translating productivity guilt into an explorable cellular world through horticultural imagery and interactive storytelling.'}},
    {slug:'this-conversation',category:'services',image:'this-conversation.jpg',kind:{zh:'家庭沟通 / 服务游戏',en:'FAMILY DIALOGUE / SERVICE GAME'},description:{zh:'结合虚拟小法庭与实体桌游，为亲子双方提供更平衡的表达空间。',en:'A virtual mini-court and physical board game create a space for more balanced expression between children and parents.'}},
    {slug:'meditate-naturally',category:'interactive',image:'meditate-naturally.jpg',kind:{zh:'感知数据 / 交互装置',en:'BIOSIGNALS / INTERACTIVE INSTALLATION'},description:{zh:'将脑波传感数据转为服装与空间中的投影，探索身体与环境的感知联系。',en:'Translating brainwave-sensor data into projections across a garment and space, exploring connections between body and environment.'}},
    {slug:'moving-crowds',category:'interactive',image:'moving-crowds.jpg',kind:{zh:'思辨设计 / 材料实验',en:'SPECULATIVE DESIGN / MATERIAL EXPLORATION'},description:{zh:'以气味识别为未来情境，通过材料实验和产品叙事讨论迁徙与身份。',en:'Material experiments and a speculative product narrative examine migration and identity in a future shaped by odor recognition.'}},
    {slug:'five-stars',category:'services',image:'five-stars.jpg',kind:{zh:'教育平台 / WEB UX',en:'EDUCATION PLATFORM / WEB UX'},description:{zh:'围绕教师发现与学生注册，梳理在线教育平台的信息和转化路径。',en:'Structuring information and conversion paths around teacher discovery and student registration.'}},
    {slug:'rako-rako-ramen',category:'services',image:'rako-rako-ramen.jpg',kind:{zh:'餐饮品牌 / 电商体验',en:'FOOD BRAND / E-COMMERCE'},description:{zh:'连接品牌入口、口味选择和组合购买，组织更清晰的拉面购物路径。',en:'Connecting a brand storefront, flavor discovery and bundle selection through a clear ramen-shopping journey.'}}
  ];
  const grid = document.querySelector('#work-grid');
  function renderProjects(){
    grid.innerHTML = curated.map((item,index) => {
      const project = allProjects.find(p => p.slug === item.slug);
      if (!project) return '';
      const translation = window.LILIAN_PROJECT_TRANSLATIONS?.[language]?.[item.slug] || {};
      const title = translation.title || project.title;
      const requestedImage = item.image ? `assets/home/${item.image}` : 'assets/portfolio/generative-hmi/overview.svg';
      const image = window.LILIAN_ASSETS?.[requestedImage] || requestedImage;
      const hidden = selectedFilter !== 'all' && selectedFilter !== item.category;
      return `<article class="work-card${item.featured?' featured':''}"${hidden?' hidden':''} data-category="${e(item.category)}"><a href="project.html?slug=${e(item.slug)}" aria-label="${e(language==='zh'?'查看项目：':'View project: ')}${e(title)}"><div class="work-figure"><img src="${e(image)}" alt="${e(title)}" loading="${index<2?'eager':'lazy'}" decoding="async"${index===0?' fetchpriority="high"':''}><span class="work-arrow" aria-hidden="true">↗</span></div><div class="work-meta"><span>${e(item.kind[language])}</span><span class="work-year">${e(item.year || translation.year || project.year)}</span></div><h3><span class="project-number">${String(index+1).padStart(2,'0')}</span>${e(title)}</h3><p>${e(item.description[language])}</p></a></article>`;
    }).join('');
    const visible = curated.filter(item => selectedFilter === 'all' || item.category === selectedFilter).length;
    document.querySelector('#filter-count').textContent = `${visible} / ${curated.length}`;
    grid.classList.toggle('is-filtered', selectedFilter!=='all');
  }
  function applyLanguage(){
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-copy]').forEach(element => {
      const value = copy[language][element.dataset.copy];
      if (!value) return;
      if (['aboutTitle'].includes(element.dataset.copy)) element.innerHTML=value;
      else element.textContent=value;
    });
    const languageButton = document.querySelector('.language-toggle');
    languageButton.innerHTML = language === 'zh' ? '中 <span>/ EN</span>' : 'EN <span>/ 中</span>';
    languageButton.setAttribute('aria-label',language==='zh'?'Switch to English':'切换到中文');
    document.querySelector('.menu-toggle').setAttribute('aria-label',language==='zh'?'打开导航':'Open navigation');
    document.querySelector('#main-nav').setAttribute('aria-label',language==='zh'?'主导航':'Main navigation');
    document.querySelector('.filter-bar').setAttribute('aria-label',language==='zh'?'项目筛选':'Filter projects');
    document.title = language==='zh'?'Lilian Zhou 周琳 · 交互设计作品集':'Lilian Zhou · Selected Work';
    localStorage.setItem('lilian-language',language);
    renderProjects();
  }
  function applyTheme(theme){
    document.body.dataset.theme=theme;
    document.documentElement.dataset.theme=theme;
    document.querySelector('.theme-toggle').setAttribute('aria-label',theme==='dark'?(language==='zh'?'切换浅色模式':'Switch to light mode'):(language==='zh'?'切换深色模式':'Switch to dark mode'));
    document.querySelector('.theme-toggle').setAttribute('aria-pressed',String(theme==='dark'));
    localStorage.setItem('lilian-theme',theme);
  }
  document.querySelector('.language-toggle').addEventListener('click',()=>{language=language==='zh'?'en':'zh';applyLanguage();applyTheme(document.body.dataset.theme);});
  document.querySelector('.theme-toggle').addEventListener('click',()=>applyTheme(document.body.dataset.theme==='dark'?'light':'dark'));
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    selectedFilter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(candidate=>{const active=candidate===button;candidate.classList.toggle('active',active);candidate.setAttribute('aria-pressed',String(active));});
    renderProjects();
  }));
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#main-nav');
  function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
  menu.addEventListener('click',()=>{const isOpen=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!isOpen));nav.classList.toggle('is-open',!isOpen);});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  applyLanguage();
  const legacyTargets = {home:'top', project:'work', gallery:'work'};
  const followLegacyAnchor = () => {const target = legacyTargets[location.hash.slice(1)]; if (target) document.getElementById(target)?.scrollIntoView();};
  window.addEventListener('hashchange', followLegacyAnchor);
  requestAnimationFrame(followLegacyAnchor);
  applyTheme(localStorage.getItem('lilian-theme')==='dark'?'dark':'light');
})();
