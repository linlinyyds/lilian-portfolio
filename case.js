(() => {
  'use strict';
  const projects = window.LILIAN_PROJECTS || [];
  const stories = window.LILIAN_STORIES || {};
  const mediaMap = window.LILIAN_MEDIA || {};
  const main = document.querySelector('#main');
  let lang = localStorage.getItem('lilian-language') === 'en' ? 'en' : 'zh';
  const slug = new URLSearchParams(location.search).get('slug') || 'ea01u';
  const project = projects.find(p => p.slug === slug);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tx = v => typeof v === 'object' && v ? (v[lang] || v.en || '') : (v || '');
  const l = (zh,en) => lang === 'zh' ? zh : en;
  const asset = path => /^(https?:|data:)/.test(path || '') ? path : (window.LILIAN_ASSETS?.[path] || `https://lilianportfolio.xyz/${path}`);
  const copy = p => ({...p,...(window.LILIAN_PROJECT_TRANSLATIONS?.[lang]?.[p.slug] || {})});
  const sectionCopy = (p,i) => ({...p.sections[i], ...(window.LILIAN_PROJECT_TRANSLATIONS?.[lang]?.[p.slug]?.sections?.[i] || {})});
  const captionMap = {
    'kantan-world': ['最终细胞世界场景：把无形的心理压力转成可探索的环境。','Final cellular landscape: translating pressure into an explorable environment.'],
    'kantan-characters':['Kantan 与风信子向导的角色设定。','Character development for Kantan and the hyacinth guide.'],
    'kantan-scenes':['场景与关卡：收集、对抗与重新开始。','Scene development: collection, confrontation and restarting.'],
    'kantan-modelling':['角色建模与交互原型过程。','Character modelling and interaction prototyping.'],
    'conversation-kit':['实体桌游：事件、情绪与表达强度的共同语言。','The physical kit: a shared vocabulary for events, emotions and their intensity.'],
    'conversation-clay-world':['共创中的黏土世界模型。','Clay-world model developed through co-design.'],
    'conversation-world-map':['共同空间的场景地图。','Map of the shared dialogue world.'],
    'conversation-court':['数字小法庭：为双方提供相对平等的发言空间。','The digital mini-court gives both participants a place to speak.'],
    'conversation-mediator':['Joker 调解角色的视觉设计。','Visual design for the Joker mediator.'],
    'conversation-board-scenario':['事件卡与情绪卡组成的对话流程。','A dialogue sequence built from event and emotion cards.'],
    'conversation-physical-test':['实体桌游流程演示。','A demonstration of the physical board-game sequence.'],
    'meditate-projection-two':['展陈现场：服装与背景形成两层投影。','Exhibition view: separate projections on garment and background.'],
    'meditate-projection-three':['身体表面与自然视觉的叠合。','Nature-inspired visuals across the body and background.'],
    'meditate-projection-one':['投影反馈的另一种视觉状态。','An alternative state of the projection feedback.'],
    'meditate-dress':['团队制作的服装载体。','The garment developed by the team.'],
    'meditate-process':['团队的 OM 符号与服装形态推演。','The team’s development of OM-inspired garment forms.'],
    'meditate-space-model':['石、芦苇与双投影构成的空间模型。','Spatial model with stones, reeds and two projection surfaces.'],
    'moving-lab':['虚构生物科技公司的实验室展陈。','A laboratory installation for the fictional biotech company.'],
    'moving-experiment-diary':['植物提取与培养皿观察的设计实验记录。','Design experiment diary: plant extraction and petri-dish observations.'],
    'moving-test-comparison':['探索性的材料对比记录。','Exploratory material comparisons.'],
    'moving-material-skin':['皮肤附近的材料与纹理试验。','Material and texture tests close to the skin.'],
    'moving-patch-sketches':['贴片形态与身体佩戴位置推演。','Patch forms and body-placement sketches.'],
    'moving-material-test':['展陈中对实验过程的呈现。','Presenting the material process within the exhibition.'],
    'equiflow-office':['废墟办公室：把职场压力变成可进入的现场。','The ruins office makes workplace pressure spatial and tangible.'],
    'equiflow-drawing':['VR 中的自由绘画轨迹。','Free drawing traces inside the VR experience.'],
    'equiflow-headset':['观众通过头显进入体验。','A visitor entering the experience through the headset.'],
    'equiflow-certificate':['从绘画到分析输出：私密表达被重新量化。','From drawing to an analytical output: expression becomes quantified.'],
    'equiflow-code':['空间绘画交互的原型实现。','Prototype implementation of spatial drawing.'],
    'clink-mobile':['患者端移动界面与使用情境。','Patient-facing mobile interface in context.'],
    'clink-clinic':['移动医疗车、硬件与服务触点的方案。','The proposed mobile clinic, hardware and service touchpoints.'],
    'clink-service':['连接患者、社区与中心医院的服务设计。','A service linking patients, community care and the central hospital.'],
    'clink-personas':['从访谈中整理患者及照护者需求。','Patient and caregiver needs synthesized from interviews.'],
    'aurora-cockpit':['21:9 中控与 HUD 的座舱概念效果图。','Cockpit concept with a 21:9 center display and HUD.'],
    'aurora-hud':['HUD 保持速度、导航与行程信息清晰可见。','The HUD prioritizes speed, navigation and journey information.'],
    'aurora-center':['中控承接更丰富的内容与 AI 陪伴。','The center display supports richer content and AI companionship.'],
    'aurora-gesture':['旋转光环的音量控制概念。','A rotating-ring concept for volume control.'],
    'aurora-palette':['视觉参考与色彩方向。','Visual references and color direction.']
  };
  const caption = (src,fallback) => {
    const key=(src||'').split('/').pop().replace(/\.[^.]+$/,'');
    return captionMap[key] ? captionMap[key][lang === 'zh' ? 0 : 1] : tx(fallback);
  };
  function figure(src, text, wide=false, eager=false) {
    if (!src) return '';
    const note=caption(src,text);
    return `<figure${wide?' class="landscape"':''}><button class="image-button" type="button" data-image="${esc(asset(src))}" data-caption="${esc(note)}" aria-label="${esc(l('放大：','Enlarge: ')+note)}"><img src="${esc(asset(src))}" alt="${esc(note)}" loading="${eager?'eager':'lazy'}" decoding="async"><span class="zoom-indicator" aria-hidden="true">↗</span></button><figcaption>${esc(note)}</figcaption></figure>`;
  }
  function film(src,poster,title) {
    return `<figure class="film"><video controls playsinline preload="none"${poster?` poster="${esc(asset(poster))}"`:''} aria-label="${esc(tx(title))}"><source src="${esc(asset(src))}">${esc(l('当前浏览器不支持视频。','This browser does not support video.'))}</video><figcaption>${esc(tx(title))}</figcaption></figure>`;
  }
  function nativePanel(items) {
    return `<div class="concept-map">${items.map((item,i)=>`<article><small>0${i+1} / ${esc(tx(item[0]))}</small><h3>${esc(tx(item[1]))}</h3><p>${esc(tx(item[2]))}</p></article>`).join('')}</div>`;
  }
  const pair=(zh,en)=>({zh,en});
  function customEvidence(chapter) {
    const ids = chapter.sections;
    if(slug==='equiflow' && ids.some(i=>[1,2].includes(i))) return nativePanel([
      [pair('研究参照 / HEADSPACE','Research reference / HEADSPACE'),pair('情绪标记路径','Emotion-tagged paths'),pair('研究关注情绪如何进入分类与预设路径，并据此发展 Equiflow 的情绪入口。','The research examines how feelings enter categories and guided paths, informing Equiflow’s emotion-selection entry.')],
      [pair('研究参照 / CALM','Research reference / CALM'),pair('游戏化反馈循环','Gamified feedback loops'),pair('将徽章与持续参与的奖励逻辑作为设计参照，观察关怀如何与完成任务相连。','Badges and rewards for continued engagement provide a reference for examining how care becomes linked with task completion.')],
      [pair('研究参照 / LYRA','Research reference / LYRA'),pair('职场中的心理数据','Mental-health data at work'),pair('在企业心理健康服务的语境中，追问私人情绪何时成为组织衡量表现的依据。','In the context of employer-led mental-health services, the project asks when private emotions become part of organizational assessment.')]
    ]);
    if(slug==='equiflow' && ids.some(i=>[3,4].includes(i))) return nativePanel([
      [pair('情绪标签','Emotion tags'),pair('选择也在引导行为','Choice shapes behavior'),pair('借鉴情绪标签与路径引导，将观众的感受纳入预设选项，让关怀与引导同时发生。','Emotion labels and guided paths translate a visitor’s feelings into predefined choices, making care and direction occur together.')],
      [pair('奖励循环','Reward loops'),pair('持续参与成为目标','Participation becomes a goal'),pair('将徽章与奖励式反馈转译为体验机制，追问“感觉更好”何时变成继续完成系统任务。','Reward-based feedback asks when feeling better becomes another reason to keep completing system tasks.')],
      [pair('量化输出','Quantified output'),pair('表达变成可评估数据','Expression becomes assessable'),pair('绘画轨迹与停顿被写进分析和证书，暴露自我表达如何被重新定义为可比较的指标。','Drawing traces and pauses are translated into analysis and a certificate, exposing how expression can become a comparable metric.')]
    ]);
    if(slug==='the-world-of-kantan' && ids.includes(0))return nativePanel([
      [pair('起点','Starting point'),pair('休息的内疚','Guilt while resting'),pair('从家人休息时仍感到落后的经历出发，将生产力压力转为具体的设计问题。','A family member’s feeling of falling behind while resting provides a concrete starting point for the project.')],
      [pair('隐喻','Metaphor'),pair('不断收集的身体','An accumulating body'),pair('角色收集细胞器来组装自己，积累与自我价值之间的关系被变成游戏规则。','Collecting organelles to assemble a body turns accumulation and self-worth into game rules.')],
      [pair('离场','After the headset'),pair('一盆风信子','A physical hyacinth'),pair('用带回现实的植物延伸体验，把注意力从虚拟奖励移向生长与照料。','A plant extends the experience into everyday life, shifting attention from virtual rewards to growth and care.')]
    ]);
    if(slug==='this-conversation' && ids.includes(0))return nativePanel([
      [pair('父母视角','Parent perspective'),pair('保护与控制交叠','Care can become control'),pair('访谈材料中，严格要求常被视为保护，孩子的解释却可能因此被提前排除。','Interview material shows strict demands framed as protection while a young person’s explanation can be excluded.')],
      [pair('孩子视角','Young person’s perspective'),pair('想说，却选择隐藏','Choosing to hide concerns'),pair('当年龄与经验决定谁更有道理，表达的困难也来自关系中的发言权差异。','When age and experience determine who is right, unequal speaking rights become part of the problem.')],
      [pair('设计回应','Design response'),pair('引入第三方空间','A third space'),pair('用中立场景、调解角色与访客投票，把双方的情感和论点分开呈现。','A neutral setting, mediator and visitor voting give emotional and rational perspectives separate forms.')]
    ]);
    if(slug==='meditate-naturally' && ids.includes(2))return nativePanel([
      [pair('输入','Input'),pair('传感与串口数据','Sensor and serial data'),pair('由传感器与 Arduino 采集数据，经串口进入视觉系统。','Sensor data is acquired through Arduino and sent to the visual system over a serial connection.')],
      [pair('个人贡献','My contribution'),pair('TouchDesigner 参数映射','TouchDesigner mapping'),pair('解析数据并映射到自然视觉参数，让传感变化对应可感知的图像变化。','Parse data and map it to nature-inspired visual parameters so signal changes produce visible responses.')],
      [pair('呈现','Output'),pair('服装与背景双投影','Two projection surfaces'),pair('在团队设计的服装和空间中输出花朵、生长与水墨波动等视觉。','Project floral, growth and ink-like visuals onto the team’s garment and surrounding space.')]
    ]);
    if(slug==='moving-crowds' && ids.includes(0))return `<p class="chapter-quote">${esc(l('2080 年，如果气味成为边界，身体还能如何移动？','In 2080, if scent becomes a border, how might a body move?'))}</p><p class="evidence-note">${esc(l('这是项目设定的未来情境，用于讨论人口流动、识别与身体自主权。','This fictional scenario opens a discussion of mobility, identification and bodily autonomy.'))}</p>`;
    if(slug==='clink' && ids.includes(0))return nativePanel([
      [pair('患者','Patient'),pair('日常管理的负担','The burden of daily care'),pair('监测、用药和就诊之间的信息与操作负担。','Information and operational burdens across monitoring, medication and appointments.')],
      [pair('照护者','Caregiver'),pair('分散的照护信息','Fragmented care information'),pair('家属需要了解变化，也需要与专业医疗支持保持连接。','Families need to understand changes and stay connected with professional support.')],
      [pair('服务','Service'),pair('连接社区与中心医院','Connect community and hospital'),pair('通过服务蓝图组织移动医疗、远程咨询与药品配送触点。','A service blueprint organizes mobile care, remote consultation and medication touchpoints.')]
    ]);
    if(slug==='aurora-mood' && ids.includes(3))return nativePanel([
      [pair('HUD','HUD'),pair('稳定的驾驶信息','Stable driving information'),pair('速度、导航与行程进度保持在明确的位置。','Speed, navigation and journey progress retain a stable place.')],
      [pair('中控','Center display'),pair('丰富但可选的语境','Richer, optional context'),pair('AI 陪伴、内容和舒适设置由中控承接。','The center display accommodates AI companionship, content and comfort settings.')],
      [pair('协同','Coordination'),pair('区分信息优先级','A clear information hierarchy'),pair('驾驶信息优先，可选体验的展开与退出需要明确边界。','Driving information takes priority, while optional experiences need clear entry and exit boundaries.')]
    ]);
    return '';
  }
  function sectionMedia(i) {
    const s=sectionCopy(project,i);
    const override=mediaMap[slug]?.sections?.[String(i)];
    if(override) return override.map(path=>({type:'image',src:path,caption:s.title}));
    if(s.image)return [{type:'image',src:s.image,caption:s.title}];
    if(s.video)return [{type:'video',src:s.video,poster:s.poster,caption:s.title}];
    return (s.media||[]).filter(m=>m.type!=='youtube');
  }
  function matrix() {
    const s=sectionCopy(project,14),m=s.matrix;
    if(!m)return '';
    return `<div class="matrix-viewer"><div class="matrix-controls"><label>${esc(l('助手人设','Persona'))}<select id="persona">${m.columns.map((v,i)=>`<option value="${i}">${esc(tx(v))}</option>`).join('')}</select></label><label>${esc(l('对话状态','Conversation state'))}<select id="state">${m.rows.map((v,i)=>`<option value="${i}">${esc(tx(v.label))}</option>`).join('')}</select></label></div><div class="matrix-image"><img id="persona-image" src="${esc(asset(m.rows[0].media[0].src))}" alt="${esc(tx(m.rows[0].media[0].alt))}" loading="lazy"><p id="persona-caption">${esc(tx(m.columns[0]))} / ${esc(tx(m.rows[0].label))}</p></div></div>`;
  }
  function chapterHTML(ch,index) {
    const media=ch.sections.flatMap(sectionMedia);
    const imgs=media.filter(m=>m.type==='image');
    const videos=media.filter(m=>m.type==='video');
    const source=ch.sections.map(i=>sectionCopy(project,i));
    const custom=customEvidence(ch);
    const texts=source.filter(s=>s.points?.length);
    const details=slug==='equiflow'?[]:source.filter(s=>!s.points?.length);
    const containsMatrix=slug==='ea01u' && ch.sections.includes(14);
    const photoLayout=ch.layout==='immersive'?'immersive':ch.layout==='research'?'research':'';
    return `<section class="chapter ${photoLayout}" id="chapter-${index+1}"><div class="chapter-header"><span class="chapter-number">0${index+1}</span><h2>${esc(tx(ch.title))}</h2><p class="chapter-intro">${esc(tx(ch.text))}</p></div><div class="chapter-content">${custom}${imgs.length?`<div class="media-grid ${imgs.length===1?'single':''}">${imgs.map((m,i)=>figure(m.src,m.caption||m.alt,(imgs.length===3&&i===0),false)).join('')}</div>`:''}${videos.map(m=>film(m.src,m.poster,m.caption||m.alt)).join('')}${containsMatrix?matrix():''}${texts.length?`<div class="support-grid">${texts.map(s=>`<article class="support-copy"><h3>${esc(tx(s.title))}</h3><p>${esc(tx(s.text))}</p><ul>${s.points.map(p=>`<li>${esc(tx(p))}</li>`).join('')}</ul></article>`).join('')}</div>`:''}${!imgs.length&&!videos.length&&!custom&&!texts.length&&!containsMatrix?`<div class="support-grid">${details.map(s=>`<article class="support-copy"><h3>${esc(tx(s.title))}</h3><p>${esc(tx(s.text))}</p></article>`).join('')}</div>`:''}${details.length&&(imgs.length||videos.length)?`<details class="text-details"><summary>${esc(l('展开本章的设计决策与过程','Read the design decisions and process'))} +</summary><div class="support-grid">${details.map(s=>`<article class="support-copy"><h3>${esc(tx(s.title))}</h3><p>${esc(tx(s.text))}</p></article>`).join('')}</div></details>`:''}</div></section>`;
  }
  function render() {
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.querySelector('#language').textContent=lang==='zh'?'EN':'中';
    document.querySelector('#language').ariaLabel=lang==='zh'?'Switch to English':'切换到中文';
    ['work','about','contact'].forEach((id,i)=>document.querySelector(`[data-ui=${id}]`).textContent=([['作品','Work'],['关于','About'],['联系 ↗','Contact ↗']][i])[lang==='zh'?0:1]);
    if(!project||!stories[slug]){main.innerHTML=`<section class="empty-case"><p>404 / PROJECT</p><h1>${esc(l('未找到项目','Project not found'))}</h1><a href="index.html#project">${esc(l('返回所有作品','Back to selected work'))} ↗</a></section>`;return;}
    const p=copy(project),story=stories[slug],map=mediaMap[slug]||{};
    let role=p.roleScope||p.role,year=p.year;
    if(slug==='meditate-naturally')role=l('团队项目；个人负责脑波数据解析、TouchDesigner 视觉映射与投影反馈。','Team project. My contribution: brainwave-data parsing, TouchDesigner mapping and projection feedback.');
    if(slug==='equiflow')year='2025';
    const hero=map.hero||p.image;
    const nextOrder=['ea01u','aurora-mood','equiflow','the-world-of-kantan','this-conversation','meditate-naturally','moving-crowds','clink','generative-hmi','five-stars','rako-rako-ramen'];
    const next=projects.find(q=>q.slug===nextOrder[(nextOrder.indexOf(slug)+1)%nextOrder.length]);
    const nextP=copy(next||projects[0]);
    document.title=`${p.title} · Lilian Zhou`;
    document.querySelector('meta[name=description]').content=tx(story.lead);
    main.innerHTML=`<section class="case-cover"><a class="back" href="index.html#project">← ${esc(l('所有作品','Selected work'))}</a><div class="cover-grid"><div><p class="eyebrow">${esc(p.meta)}</p><h1>${esc(p.title)}</h1><h2 class="subtitle">${esc(tx(story.subtitle))}</h2><p class="lead">${esc(tx(story.lead))}</p></div><figure class="hero-figure ${slug==='ea01u'||slug==='generative-hmi'?'contain':''}"><button class="image-button" type="button" data-image="${esc(asset(hero))}" data-caption="${esc(caption(hero,p.title))}" aria-label="${esc(l('放大项目成果图','Enlarge project image'))}"><img src="${esc(asset(hero))}" alt="${esc(caption(hero,p.title))}" fetchpriority="high"><span class="zoom-indicator" aria-hidden="true">↗</span></button><figcaption><span>${esc(l('项目成果 / 概念与原型','PROJECT VIEW / CONCEPT & PROTOTYPE'))}</span><span>${esc(year)}</span></figcaption></figure></div><dl class="facts"><div><dt>${esc(l('年份 / 阶段','Year / Stage'))}</dt><dd>${esc(year)}${p.stage?`<br>${esc(p.stage)}`:''}</dd></div><div><dt>${esc(l('个人职责','My contribution'))}</dt><dd>${esc(role)}</dd></div><div><dt>${esc(l('领域','Disciplines'))}</dt><dd>${esc((p.tags||[]).join(' / '))}</dd></div></dl></section><nav class="case-toc" aria-label="${esc(l('项目章节','Case-study chapters'))}"><span class="toc-label">${esc(l('项目导览','IN THIS PROJECT'))}</span><a href="#question">00 ${esc(l('核心问题','The question'))}</a>${story.chapters.map((c,i)=>`<a href="#chapter-${i+1}">0${i+1} ${esc(tx(c.title))}</a>`).join('')}<a href="#reflection">${esc(l('成果与思考','Outcome & reflection'))}</a></nav><section class="proposition" id="question"><span class="small-label">${esc(l('核心问题 / THE QUESTION','THE QUESTION'))}</span><h2>${esc(tx(story.question))}</h2></section><div class="mechanisms">${story.steps.map((step,i)=>`<article class="mechanism"><span class="number">0${i+1}</span><h3>${esc(tx(step.label))}</h3><p>${esc(tx(step.description))}</p></article>`).join('')}</div>${story.chapters.map(chapterHTML).join('')}<section class="reflection" id="reflection"><span class="small-label">${esc(l('成果与思考','OUTCOME & REFLECTION'))}</span><div><h2>${esc(l('这次设计留下了什么','What the work leaves us with'))}</h2><p>${esc(tx(story.closing))}</p>${slug==='ea01u'?`<p class="evidence-note">${esc(l('项目层面的展示材料；个人职责范围见页首。','Project-level presentation material; my contribution is described above.'))} <a href="https://www.youtube.com/watch?v=lwh04qaL_nY" target="_blank" rel="noopener">${esc(l('观看官方影片','Watch the official project film'))} ↗</a></p>`:''}</div></section><a class="next-work" href="project.html?slug=${esc(nextP.slug)}"><div><span class="small-label">${esc(l('下一个项目','NEXT PROJECT'))}</span><h2>${esc(nextP.title)}</h2></div><span class="next-arrow" aria-hidden="true">↗</span></a>`;
    bindContent();
  }
  function bindContent() {
    const lightbox=document.querySelector('#lightbox');
    main.querySelectorAll('[data-image]').forEach(b=>b.addEventListener('click',()=>{lightbox.querySelector('img').src=b.dataset.image;lightbox.querySelector('img').alt=b.dataset.caption;lightbox.querySelector('p').textContent=b.dataset.caption;lightbox.showModal();}));
    const persona=main.querySelector('#persona'),state=main.querySelector('#state');
    if(persona&&state){const update=()=>{const s=sectionCopy(project,14),p=+persona.value,r=+state.value,m=s.matrix.rows[r].media[p];document.querySelector('#persona-image').src=asset(m.src);document.querySelector('#persona-image').alt=tx(m.alt);document.querySelector('#persona-caption').textContent=`${tx(s.matrix.columns[p])} / ${tx(s.matrix.rows[r].label)}`;};persona.addEventListener('change',update);state.addEventListener('change',update);}
    if(window.caseObserver)window.caseObserver.disconnect();
    window.caseObserver=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){main.querySelectorAll('.case-toc a').forEach(a=>{if(a.hash===`#${e.target.id}`)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}},{rootMargin:'-15% 0px -60% 0px'});
    main.querySelectorAll('#question,.chapter,#reflection').forEach(s=>window.caseObserver.observe(s));
  }
  document.querySelector('#language').addEventListener('click',()=>{const y=window.scrollY;lang=lang==='zh'?'en':'zh';localStorage.setItem('lilian-language',lang);render();window.scrollTo({top:y,behavior:'instant'});});
  function setTheme(theme){document.body.dataset.theme=theme;document.documentElement.dataset.theme=theme;document.querySelector('#theme').ariaLabel=theme==='dark'?l('切换浅色','Switch to light mode'):l('切换深色','Switch to dark mode');document.querySelector('#theme').setAttribute('aria-pressed',String(theme==='dark'));localStorage.setItem('lilian-theme',theme);}
  document.querySelector('#theme').addEventListener('click',()=>setTheme(document.body.dataset.theme==='dark'?'light':'dark'));
  document.querySelector('#lightbox').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close();});
  setTheme(localStorage.getItem('lilian-theme')==='dark'?'dark':'light');
  render();
})();
