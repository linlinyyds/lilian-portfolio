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
  const copy = p => ({...p,...(window.LILIAN_PROJECT_TRANSLATIONS?.[lang]?.[p.slug] || {}),...(window.LILIAN_CASE_COPY?.[p.slug]?.[lang] || {})});
  const sectionCopy = (p,i) => ({...p.sections[i], ...(window.LILIAN_PROJECT_TRANSLATIONS?.[lang]?.[p.slug]?.sections?.[i] || {}),...(window.LILIAN_CASE_COPY?.[p.slug]?.[lang]?.sections?.[i] || {})});
  const captionMap = {
    'kantan-world': ['最终细胞世界场景：把无形的心理压力转成可探索的环境。','Final cellular landscape: translating pressure into an explorable environment.'],
    'kantan-characters':['Kantan 与风信子向导的角色设定。','Character development for Kantan and the hyacinth guide.'],
    'kantan-scenes':['场景与关卡：收集、对抗与重新开始。','Scene development: collection, confrontation and restarting.'],
    'kantan-modelling':['角色建模与交互原型过程。','Character modelling and interaction prototyping.'],
    'conversation-kit':['实体桌游套件：事件卡、情绪卡与表达强度标记。','The physical kit: event cards, emotion cards and intensity markers.'],
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
    'equiflow-certificate':['绘画记录与疗愈证书：轨迹和停顿被转为评价指标。','Drawing records and the healing certificate: traces and pauses become evaluative metrics.'],
    'equiflow-code':['空间绘画交互的原型实现。','Prototype implementation of spatial drawing.'],
    'clink-mobile':['患者端移动界面与使用情境。','Patient-facing mobile interface in context.'],
    'clink-clinic':['移动医疗车、硬件与服务触点的方案。','The proposed mobile clinic, hardware and service touchpoints.'],
    'clink-service':['连接患者、社区与中心医院的服务设计。','A service linking patients, community care and the central hospital.'],
    'clink-personas':['从访谈中整理患者及照护者需求。','Patient and caregiver needs synthesized from interviews.'],
    'aurora-cockpit':['21:9 中控与 HUD 的座舱概念效果图。','Cockpit concept with a 21:9 center display and HUD.'],
    'aurora-hud':['HUD 保持速度、导航与行程信息清晰可见。','The HUD prioritizes speed, navigation and journey information.'],
    'aurora-center':['中控界面：内容、舒适设置与 AI 伙伴。','The center display: content, comfort settings and an AI companion.'],
    'aurora-gesture':['旋转光环的音量控制概念。','A rotating-ring concept for volume control.'],
    'aurora-palette':['视觉参考与色彩方向。','Visual references and color direction.']
  };
  const caption = (src,fallback) => {
    const key=(src||'').split('/').pop().replace(/\.[^.]+$/,'');
    return captionMap[key] ? captionMap[key][lang === 'zh' ? 0 : 1] : tx(fallback);
  };
  const mediaSizes={"assets/portfolio/ea01u/cover.png":[1280,720],"assets/portfolio/ea01u/launcher-balance-bird-poster.png":[1280,400],"assets/portfolio/ea01u/research-01-ai-model-meaning.png":[1920,1080],"assets/portfolio/ea01u/vpa-outfit-guidance-poster.png":[1280,400],"assets/portfolio/ea01u/vpa-outfit-generating-poster.png":[1280,400],"assets/portfolio/ea01u/launcher-card-reorder-poster.png":[1280,400],"assets/portfolio/ea01u/launcher-card-drag-poster.png":[1280,400],"assets/portfolio/ea01u/ai-storyline-call-journey-poster.png":[1280,400],"assets/gallery/clink-cover.png":[3735,2439],"assets/project-materials/clink-01.png":[650,460],"assets/project-materials/clink-02.png":[650,460],"assets/project-materials/clink-03.png":[650,460],"assets/project-materials/clink-04.png":[650,460],"assets/portfolio/aurora-mood/aurora-01-cover.jpg":[3200,1800],"assets/portfolio/aurora-mood/aurora-02-inspiration.jpg":[3200,1800],"assets/portfolio/aurora-mood/aurora-03-insight.jpg":[3200,1800],"assets/portfolio/aurora-mood/aurora-04-information-architecture.jpg":[3200,1800],"assets/portfolio/aurora-mood/aurora-05-journey-map.jpg":[3200,1800],"assets/portfolio/aurora-mood/aurora-06-gesture-control.jpg":[3200,1800],"assets/portfolio/aurora-mood/aurora-07-ui-detail.jpg":[3200,1800],"assets/portfolio/aurora-mood/aurora-08-final-cockpit.jpg":[3200,1800],"assets/portfolio/generative-hmi/overview.svg":[1200,800],"assets/portfolio/equiflow/equiflow-01-cover.jpg":[1920,1080],"assets/portfolio/equiflow/equiflow-02-context.jpg":[1920,1080],"assets/portfolio/equiflow/equiflow-03-vr-application.jpg":[1920,1080],"assets/portfolio/equiflow/equiflow-04-healing-frame.jpg":[1920,1080],"assets/portfolio/equiflow/equiflow-05-critical-risk.jpg":[1920,1080],"assets/portfolio/equiflow/equiflow-06-spatial-prototype.jpg":[1920,1080],"assets/portfolio/equiflow/equiflow-07-user-experience.jpg":[1920,1080],"assets/portfolio/equiflow/equiflow-08-journey-map.jpg":[1920,1080],"assets/portfolio/equiflow/equiflow-09-technical-system.jpg":[1920,1080],"assets/gallery/five-stars-cover.jpg":[1440,810],"assets/gallery/optimized/five-stars.jpg":[1440,810],"assets/portfolio/fivestars-platform-entry.jpg":[1440,810],"assets/portfolio/fivestars-teacher-discovery.jpg":[1440,810],"assets/portfolio/fivestars-registration-flow.jpg":[1440,810],"assets/portfolio/rako-rako/rako-01-brand-store.jpg":[1600,1132],"assets/portfolio/rako-rako/rako-02-product-catalog.jpg":[1600,1132],"assets/portfolio/rako-rako/rako-03-bundle-flow.jpg":[1600,1132],"assets/details/kantan-world.jpg":[4200,1759],"assets/details/kantan-characters.jpg":[1240,1263],"assets/details/kantan-scenes.jpg":[1366,1189],"assets/details/kantan-modelling.jpg":[568,1263],"assets/details/conversation-kit.jpg":[1509,1008],"assets/details/conversation-clay-world.jpg":[1328,613],"assets/details/conversation-world-map.jpg":[1072,743],"assets/details/conversation-court.jpg":[879,628],"assets/details/conversation-mediator.jpg":[875,625],"assets/details/conversation-board-scenario.jpg":[1857,1477],"assets/details/conversation-physical-test.jpg":[1299,699],"assets/details/meditate-projection-two.jpg":[1588,1406],"assets/details/meditate-dress.jpg":[593,1371],"assets/details/meditate-process.jpg":[2256,1139],"assets/details/meditate-projection-three.jpg":[971,1406],"assets/details/meditate-space-model.jpg":[1298,633],"assets/details/meditate-projection-one.jpg":[1265,1218],"assets/details/moving-lab.jpg":[2681,2104],"assets/details/moving-experiment-diary.jpg":[1324,1144],"assets/details/moving-test-comparison.jpg":[1337,714],"assets/details/moving-material-skin.jpg":[681,1097],"assets/details/moving-patch-sketches.jpg":[2458,785],"assets/details/moving-material-test.jpg":[1366,919],"assets/details/equiflow-office.jpg":[1728,767],"assets/details/equiflow-drawing.jpg":[1114,778],"assets/details/equiflow-headset.jpg":[634,778],"assets/details/equiflow-certificate.jpg":[864,724],"assets/details/equiflow-code.jpg":[806,724],"assets/details/clink-personas.jpg":[273,230],"assets/details/clink-service.jpg":[630,253],"assets/details/clink-mobile.jpg":[260,216],"assets/details/clink-clinic.jpg":[630,207],"assets/details/aurora-palette.jpg":[2400,1005],"assets/details/aurora-gesture.jpg":[2400,790],"assets/details/aurora-hud.jpg":[2400,623],"assets/details/aurora-center.jpg":[2400,771],"assets/details/aurora-cockpit.jpg":[2400,1350],"assets/portfolio/ea01u/research-02-technical-architecture.png":[1920,1080],"assets/portfolio/ea01u/research-03-ai-product-components-v2.png":[1920,1080],"assets/portfolio/ea01u/research-04-interface-patterns.png":[1920,1080],"assets/portfolio/ea01u/research-05-voice-persona.png":[1920,1080],"assets/portfolio/ea01u/research-06-domain-identity.png":[1920,1080],"assets/portfolio/ea01u/vpa-ai-creation.jpg":[2560,800],"assets/portfolio/ea01u/vpa-action-library.jpg":[2560,800],"assets/portfolio/ea01u/ai-storyline.jpg":[2560,800],"assets/portfolio/ea01u/ai-storyline-scratch-popup.png":[685,375],"assets/portfolio/ea01u/ai-storyline-brief.webp":[2560,800],"assets/portfolio/ea01u/ai-storyline-fog-on.webp":[2560,800],"assets/portfolio/ea01u/ai-storyline-music.webp":[2560,800],"assets/portfolio/ea01u/vpa-plaza-dialog.webp":[1280,707],"assets/portfolio/ea01u/vpa-custom-style-scroll.webp":[1280,707],"assets/portfolio/ea01u/vpa-custom-description.webp":[1280,707],"assets/portfolio/ea01u/vpa-balance-bird.gif":[720,720],"assets/portfolio/ea01u/vpa-music.gif":[720,720],"assets/portfolio/ea01u/vpa-high-energy-music.gif":[720,720],"assets/portfolio/ea01u/vpa-fishing.gif":[720,720]};
  const imageDimensions = src => mediaSizes[src] ? ` width="${mediaSizes[src][0]}" height="${mediaSizes[src][1]}"` : "";
  function imageViewport(src, note, eager, crop) {
    const img = `<img src="${esc(asset(src))}" alt="${esc(note)}"${imageDimensions(src)} loading="${eager?'eager':'lazy'}" decoding="async">`;
    if (!crop) return img;
    const {x,y,width,height,sourceWidth,sourceHeight} = crop;
    const style = `--media-ratio:${width}/${height};--media-image-width:${sourceWidth/width*100}%;--media-image-height:${sourceHeight/height*100}%;--media-image-left:${-x/width*100}%;--media-image-top:${-y/height*100}%`;
    return `<span class="media-viewport is-cropped" style="${style}">${img}</span>`;
  }
  function figure(src, text, wide=false, eager=false, options={}) {
    if (!src) return '';
    const note=options.note?tx(options.note):caption(src,text);
    const classes=[wide?'landscape':'',options.portrait?'media-portrait':'',options.compact?'media-compact':''].filter(Boolean).join(' ');
    return `<figure${classes?` class="${classes}"`:''}><button class="image-button" type="button" data-image="${esc(asset(src))}" data-caption="${esc(note)}" aria-label="${esc(l('放大：','Enlarge: ')+note)}">${imageViewport(src,note,eager,options.crop)}<span class="zoom-indicator" aria-hidden="true">↗</span></button><figcaption>${esc(note)}</figcaption></figure>`;
  }
  function film(src,poster,title) {
    return `<figure class="film"><video controls playsinline preload="none"${imageDimensions(poster)}${poster?` poster="${esc(asset(poster))}"`:''} aria-label="${esc(tx(title))}"><source src="${esc(asset(src))}">${esc(l('当前浏览器不支持视频。','This browser does not support video.'))}</video><figcaption>${esc(tx(title))}</figcaption></figure>`;
  }
  function nativePanel(items) {
    return `<div class="concept-map">${items.map((item,i)=>`<article><small>0${i+1} / ${esc(tx(item[0]))}</small><h3>${esc(tx(item[1]))}</h3><p>${esc(tx(item[2]))}</p></article>`).join('')}</div>`;
  }
  const pair=(zh,en)=>({zh,en});
  function auroraVisualLanguage() {
    const src='assets/details/aurora-palette.jpg';
    const directions=[
      [4,pair('极致科技','Technological expression')],
      [800,pair('简洁动感','Restrained motion')],
      [1596,pair('生命温度','Human warmth')]
    ];
    const colors=[['#7A2B2E',pair('情绪温度','Emotional warmth')],['#30497A',pair('背景沉浸','Immersive depth')],['#119DE9',pair('科技理性','Technical clarity')],['#13FFF0',pair('智慧动感','Intelligent motion')]];
    return `<div class="moodboard-grid">${directions.map(([x,note])=>figure(src,note,false,false,{note,crop:{x,y:84,width:795,height:376,sourceWidth:2400,sourceHeight:1005}})).join('')}</div><div class="palette-grid" aria-label="${esc(l('项目色板','Project color palette'))}">${colors.map(([hex,note])=>`<div class="palette-item"><span class="palette-color" style="--swatch:${hex}" aria-hidden="true"></span><strong>${esc(tx(note))}</strong><span class="palette-hex">${hex}</span></div>`).join('')}</div>`;
  }
  function customEvidence(chapter,index) {
    const panels=window.LILIAN_CASE_PANELS?.[slug]?.[String(index)];
    if(panels)return nativePanel(panels);
    if(slug==='moving-crowds' && chapter.sections.includes(0))return `<p class="chapter-quote">${esc(l('2080 年，如果气味成为边界，身体还能如何移动？','In 2080, if scent becomes a border, how might a body move?'))}</p><p class="evidence-note">${esc(l('项目以假想的气味识别社会，讨论迁移与身体自主权。','A fictional scent-identification society frames a discussion of migration and bodily autonomy.'))}</p>`;
    return '';
  }
  function sectionMedia(i) {
    const s=sectionCopy(project,i);
    if(slug==='aurora-mood' && i===6) return [
      {type:'image',src:'assets/portfolio/aurora-mood/aurora-07-ui-detail.jpg',note:pair('HUD｜速度、导航与行程信息','HUD | Speed, navigation and trip information'),crop:{x:530,y:0,width:2140,height:900,sourceWidth:3200,sourceHeight:1800}},
      {type:'image',src:'assets/portfolio/aurora-mood/aurora-07-ui-detail.jpg',note:pair('中控｜内容、舒适设置与 AI 陪伴','Center display | Content, comfort and AI companionship'),crop:{x:530,y:900,width:2140,height:900,sourceWidth:3200,sourceHeight:1800}}
    ];
    if(slug==='aurora-mood' && i===1) return [];
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
  function mediaGrid(imgs,ch,index) {
    if (!imgs.length) return '';
    const garment=slug==='meditate-naturally' && index===2;
    const classes=['media-grid',imgs.length===1?'single':'',garment?'garment-study':''].filter(Boolean).join(' ');
    return `<div class="${classes}">${imgs.map((m,i)=>{
      let wide=imgs.length>1 && imgs.length%2===1 && i===0;
      let portrait=false;
      if(slug==='the-world-of-kantan' && index===2){wide=i===2;portrait=i===2;}
      if(slug==='this-conversation' && index===0)wide=i===2;
      if(slug==='moving-crowds' && index===2){wide=i>=2;portrait=i===2;}
      if(garment)portrait=i===0;
      const compact=slug==='clink';
      return figure(m.src,m.caption||m.alt,wide,false,{...m,portrait,compact});
    }).join('')}</div>`;
  }
  function chapterHTML(ch,index) {
    const media=ch.sections.flatMap(sectionMedia);
    const imgs=media.filter(m=>m.type==='image');
    const videos=media.filter(m=>m.type==='video');
    const source=ch.sections.map(i=>sectionCopy(project,i));
    const custom=slug==='aurora-mood' && ch.layout==='visual'?auroraVisualLanguage():customEvidence(ch,index);
    const texts=source.filter(s=>s.points?.length);
    const details=source.filter(s=>!s.points?.length);
    const containsMatrix=slug==='ea01u' && ch.sections.includes(14);
    const photoLayout=ch.layout==='immersive'?'immersive':ch.layout==='research'?'research':'';
    return `<section class="chapter ${photoLayout}" id="chapter-${index+1}"><div class="chapter-header"><span class="chapter-number">0${index+1}</span><h2>${esc(tx(ch.title))}</h2><p class="chapter-intro">${esc(tx(ch.text))}</p></div><div class="chapter-content">${custom}${mediaGrid(imgs,ch,index)}${videos.map(m=>film(m.src,m.poster,m.caption||m.alt)).join('')}${containsMatrix?matrix():''}${texts.length?`<div class="support-grid">${texts.map(s=>`<article class="support-copy"><h3>${esc(tx(s.title))}</h3><p>${esc(tx(s.text))}</p><ul>${s.points.map(p=>`<li>${esc(tx(p))}</li>`).join('')}</ul></article>`).join('')}</div>`:''}${!imgs.length&&!videos.length&&!custom&&!texts.length&&!containsMatrix?`<div class="support-grid">${details.map(s=>`<article class="support-copy"><h3>${esc(tx(s.title))}</h3><p>${esc(tx(s.text))}</p></article>`).join('')}</div>`:''}${details.length&&(imgs.length||videos.length||custom||texts.length||containsMatrix)?`<details class="text-details"><summary>${esc(tx(ch.detailsLabel)||l('查看：','Read: ')+source.map(s=>tx(s.title)).join(l('、',', ')))} +</summary><div class="support-grid">${details.map(s=>`<article class="support-copy"><h3>${esc(tx(s.title))}</h3><p>${esc(tx(s.text))}</p></article>`).join('')}</div></details>`:''}</div></section>`;
  }
  function render() {
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.querySelector('#language .lang-current').textContent=lang==='zh'?'中':'EN';
    document.body.dataset.lang=lang;
    document.querySelector('#language').ariaLabel=lang==='zh'?'Switch to English':'切换到中文';
    if(!project||!stories[slug]){main.innerHTML=`<section class="empty-case"><p>404 / PROJECT</p><h1>${esc(l('未找到项目','Project not found'))}</h1><a href="work.html">${esc(l('返回所有作品','Back to selected work'))} ↗</a></section>`;return;}
    const p=copy(project),story=stories[slug],map=mediaMap[slug]||{};
    let role=p.roleScope||p.role,year=p.year;
    if(slug==='equiflow')year='2025';
    const hero=slug==='clink'?'assets/gallery/clink-cover.png':map.hero||p.image;
    const nextOrder=['ea01u','aurora-mood','equiflow','the-world-of-kantan','this-conversation','meditate-naturally','moving-crowds','clink','generative-hmi','five-stars','rako-rako-ramen'];
    const next=projects.find(q=>q.slug===nextOrder[(nextOrder.indexOf(slug)+1)%nextOrder.length]);
    const nextP=copy(next||projects[0]);
    document.title=`${p.title} · Lilian Zhou`;
    document.querySelector('meta[name=description]').content=tx(story.lead);
    main.innerHTML=`<section class="case-cover"><a class="back" href="work.html">← ${esc(l('所有作品','Selected work'))}</a><div class="cover-grid"><div><p class="eyebrow">${esc(p.meta)}</p><h1>${esc(p.title)}</h1><h2 class="subtitle">${esc(tx(story.subtitle))}</h2><p class="lead">${esc(tx(story.lead))}</p></div><figure class="hero-figure ${slug==='ea01u'||slug==='generative-hmi'||slug==='clink'?'contain':''}"><button class="image-button" type="button" data-image="${esc(asset(hero))}" data-caption="${esc(caption(hero,p.title))}" aria-label="${esc(l('放大项目成果图','Enlarge project image'))}"><img src="${esc(asset(hero))}" alt="${esc(caption(hero,p.title))}"${imageDimensions(hero)} fetchpriority="high"><span class="zoom-indicator" aria-hidden="true">↗</span></button><figcaption><span>${esc(l('项目概览','PROJECT OVERVIEW'))}</span><span>${esc(year)}</span></figcaption></figure></div><dl class="facts"><div><dt>${esc(l('年份 / 阶段','Year / Stage'))}</dt><dd>${esc(year)}${p.stage?`<br>${esc(p.stage)}`:''}</dd></div><div><dt>${esc(l('个人职责','My contribution'))}</dt><dd>${esc(role)}</dd></div><div><dt>${esc(l('领域','Disciplines'))}</dt><dd>${esc((p.tags||[]).join(' / '))}</dd></div></dl></section><nav class="case-toc" aria-label="${esc(l('项目章节','Case-study chapters'))}"><span class="toc-label">${esc(l('项目内容','IN THIS PROJECT'))}</span><a href="#question">00 ${esc(l('设计问题','Design question'))}</a>${story.chapters.map((c,i)=>`<a href="#chapter-${i+1}">0${i+1} ${esc(tx(c.title))}</a>`).join('')}<a href="#reflection">${esc(l('成果与复盘','Outcome & reflection'))}</a></nav><section class="proposition" id="question"><span class="small-label">${esc(l('设计问题 / DESIGN QUESTION','DESIGN QUESTION'))}</span><h2>${esc(tx(story.question))}</h2></section><div class="mechanisms">${story.steps.map((step,i)=>`<article class="mechanism"><span class="number">0${i+1}</span><h3>${esc(tx(step.label))}</h3><p>${esc(tx(step.description))}</p></article>`).join('')}</div>${story.chapters.map(chapterHTML).join('')}<section class="reflection" id="reflection"><span class="small-label">${esc(l('成果与复盘','OUTCOME & REFLECTION'))}</span><div><h2>${esc(l('项目成果与设计思考','Project outcomes and reflections'))}</h2><p>${esc(tx(story.closing))}</p>${slug==='ea01u'?`<p class="evidence-note">${esc(l('官方影片介绍平台整体体验，个人工作范围见页首。','The official film presents the wider platform; my contribution is outlined above.'))} <a href="https://www.youtube.com/watch?v=lwh04qaL_nY" target="_blank" rel="noopener">${esc(l('观看官方影片','Watch the official project film'))} ↗</a></p>`:''}</div></section><a class="next-work" href="project.html?slug=${esc(nextP.slug)}"><div><span class="small-label">${esc(l('下一个项目','NEXT PROJECT'))}</span><h2>${esc(nextP.title)}</h2></div><span class="next-arrow" aria-hidden="true">↗</span></a>`;
    bindContent();
  }
  function bindContent() {
    const lightbox=document.querySelector('#lightbox');
    main.querySelectorAll('[data-image]').forEach(b=>b.addEventListener('click',()=>{
      const holder=lightbox.querySelector('.lightbox-media');
      const viewport=b.querySelector('.media-viewport');
      if(viewport){
        holder.replaceChildren(viewport.cloneNode(true));
        holder.style.setProperty('--media-ratio',viewport.style.getPropertyValue('--media-ratio'));
      }else{
        const image=document.createElement('img');
        image.src=b.dataset.image;image.alt=b.dataset.caption;
        holder.replaceChildren(image);holder.style.removeProperty('--media-ratio');
      }
      lightbox.querySelector('p').textContent=b.dataset.caption;
      lightbox.showModal();
    }));
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
