export const content = {
  zh: {
    back: '所有作品',
    category: '在线教育平台 · Web UI / UE',
    subtitle: '让学生和家长从找老师走到预约',
    lead: 'Five Stars 是一对一在线辅导平台。我参与设计学生和家长选老师的核心流程，把学科、资质、课时价格与档期放进同一条浏览路径，让用户在决定预约前有足够的信息可比较。',
    visit: '访问 Five Stars 官网',
    homeAlt: '五满星教育官网桌面首页，显示导航、导师推荐、浏览老师和教师入驻入口',
    homeCaption: '线上官网 · 桌面首页首屏',
    facts: [
      ['项目类型', '双边在线教育平台 · 已上线'],
      ['我的职责', '参与信息架构、导师筛选与详情、预约与咨询、学生注册与教师入驻的界面及交互设计。'],
      ['设计交付', '响应式 Web 页面、关键流程与组件，配合开发落地。']
    ],
    contents: '项目章节',
    problemLabel: '设计问题',
    question: '学生和家长怎样判断一位老师适不适合自己？',
    context: '选老师涉及三个连续的判断：是否教我需要的科目、资质和预算是否合适、有没有能约的时间。我的设计从这些判断出发，安排每一步该出现的信息与操作。',
    chapters: [
      {
        nav: '入口与路径',
        title: '从学科或老师出发，汇入同一条选课路径',
        intro: '有明确科目的人可以先从学科页找对应老师，心里已有候选的人可以搜索老师姓名。首页将「浏览老师」设为主要按钮，「教师入驻」用次级按钮区分身份，顾问咨询则作为独立入口，服务暂未明确学习需求的访客。',
        journeyLabel: '学生与家长的选师路径',
        steps: [
          ['找到候选', '按科目浏览或按姓名搜索'],
          ['筛选比较', '按认证、评分、价格与档期缩小范围'],
          ['查看详情', '核对教学背景、评价和具体时段'],
          ['进入预约', '选择时段，或提交约课意向']
        ],
        caption: '交互流程示意 · 学生与家长的自助选师路径',
        entries: [
          ['已知科目', '探索学科 → 查看该科目的老师'],
          ['已知老师', '搜索姓名 → 查看匹配结果'],
          ['需求未定', '企业微信咨询 → 由顾问协助梳理需求']
        ]
      },
      {
        nav: '筛选与详情',
        title: '列表负责比较，详情负责确认',
        intro: '我把会直接影响选择的信息放在导师卡片的固定位置。学科用标签表达，评分与小时价并列，档期用「可预约」和「暂无档期」区分，用户可以连续扫读多位老师，再打开详情核实。',
        layersTitle: '每一层回答一个问题',
        layers: [
          ['筛选', '有哪些人符合条件？', '把姓名搜索、科目筛选与价格、评分、认证、预约状态组织在列表页，帮助用户缩小候选范围。'],
          ['卡片', '哪几位值得继续了解？', '在同一位置显示科目、评分、小时价和预约状态，方便逐项比较。'],
          ['详情', '我可以放心约这位老师吗？', '展示认证、教学背景、评价与预约日历，让用户核对实际课程与具体时间。']
        ],
        imageAlt: '五满星教育官网完整导师列表页，包含页面导航、搜索框、筛选区、导师卡片、分页和页脚',
        imageCaption: '线上官网 · 完整导师列表页。点击查看原图。',
        enlarge: '在新标签页查看完整导师列表截图',
        open: '体验导师筛选'
      },
      {
        nav: '预约与分流',
        title: '按用户的准备程度安排下一步',
        intro: '预约是选师流程的下一步，咨询是帮助用户明确需求的另一条路径。教师有独立的入驻入口，学生注册和资质提交各自对应不同的操作目标。',
        paths: [
          ['已经选定老师', '导师详情 → 查看日历 → 预约或提交约课意向', '有合适档期时直接选择时段。遇到时间不合适，可以提交约课意向，继续协商。'],
          ['还在梳理需求', '首页 → 企业微信 → 顾问咨询', '在首页就提供顾问入口，让需要先聊科目、目标或预算的人能直接开始沟通。'],
          ['教师希望加入', '教师入驻 → 教师身份 → 资质申请', '从首页进入教师身份的注册流程，后续准备资料、认证资质与设置档期。']
        ],
        profileLink: '查看导师详情与预约入口',
        teacherLink: '查看教师入驻入口'
      }
    ],
    outcomeLabel: '交付成果',
    outcomeTitle: '把选师决策落到可用的 Web 页面',
    outcome: '交付覆盖首页、导师筛选与详情、预约咨询，以及学生注册和教师入驻的关键页面与流程。响应式设计围绕同一信息顺序调整布局，让桌面和手机都能先筛选、再比较，最后找到下一步。',
    sourceNote: '界面图取自当前线上官网。案例聚焦我参与设计的 Web 选师、预约与入驻体验。',
    next: '下一个项目'
  },
  en: {
    back: 'Selected work',
    category: 'Education platform · Web UI / UX',
    subtitle: 'Help families find and book the right tutor',
    lead: 'Five Stars is a one-to-one tutoring platform. I helped design how students and parents find tutors, bringing subject fit, credentials, hourly rates and availability into one browsing journey so families can compare their options before booking.',
    visit: 'Visit the Five Stars website',
    homeAlt: 'Five Stars desktop homepage with navigation, featured tutors and entry points for browsing and teacher onboarding',
    homeCaption: 'Live website · Desktop homepage, first screen',
    facts: [
      ['Project', 'Two-sided tutoring platform · Live'],
      ['My contribution', 'I contributed to information architecture and UI/UX for tutor search, profiles, booking, consultation, student registration and teacher onboarding.'],
      ['Deliverables', 'Responsive web pages, core flows and components, with development handoff.']
    ],
    contents: 'Case study chapters',
    problemLabel: 'Design question',
    question: 'How can students and parents tell whether a tutor is right for them?',
    context: 'Choosing a tutor involves three decisions: do they teach the right subject, do their credentials and rates fit, and can I book a suitable time? I used those decisions to prioritize what each screen needed to show and what users could do next.',
    chapters: [
      {
        nav: 'Discovery',
        title: 'Two ways to start, one tutor discovery journey',
        intro: 'Visitors who know the subject can start with the subject directory. Those with a tutor in mind can search by name. The homepage prioritizes Browse tutors, gives Teacher onboarding a secondary button and offers advisor support for visitors still defining their needs.',
        journeyLabel: 'Tutor discovery journey for students and parents',
        steps: [
          ['Discover', 'Browse by subject or search by tutor name'],
          ['Shortlist', 'Use credentials, rating, price and availability'],
          ['Review', 'Check background, reviews and specific times'],
          ['Book', 'Select a time or submit a booking enquiry']
        ],
        caption: 'Flow diagram · Self-service tutor discovery for students and parents',
        entries: [
          ['I know the subject', 'Explore subjects → See tutors for the subject'],
          ['I know the tutor', 'Search by name → Review matching profiles'],
          ['I need guidance', 'WeChat consultation → Discuss learning needs with an advisor']
        ]
      },
      {
        nav: 'Search and profiles',
        title: 'Compare tutors in the list and verify the details in profiles',
        intro: 'I gave the information that drives selection a consistent place on each tutor card. Subject tags, rating, hourly rates and availability are easy to scan across several options before opening a profile.',
        layersTitle: 'What each screen helps users decide',
        layers: [
          ['Filters', 'Who meets my criteria?', 'Name search and filters for subject, price, rating, certification and availability help narrow the list.'],
          ['Tutor card', 'Who should I look at more closely?', 'Subject, rating, hourly rate and availability appear in consistent positions for comparison.'],
          ['Profile', 'Can I book this tutor with confidence?', 'Credentials, teaching background, reviews and a booking calendar support the final decision.']
        ],
        imageAlt: 'Complete Five Stars tutor directory showing navigation, search, filters, tutor cards, pagination and footer',
        imageCaption: 'Live website · Full tutor directory page. Click to view at full size.',
        enlarge: 'Open the full tutor directory screenshot in a new tab',
        open: 'Try the tutor filters'
      },
      {
        nav: 'Booking and onboarding',
        title: 'Give each visitor a next step that fits their needs',
        intro: 'Booking follows tutor selection. Consultation supports people who are still working out their needs. A dedicated teacher entry takes applicants into the onboarding flow for their role.',
        paths: [
          ['Ready to book', 'Tutor profile → Calendar → Book or submit an enquiry', 'Visitors can select an available time or send a booking enquiry to discuss alternatives.'],
          ['Still exploring', 'Homepage → WeChat → Advisor consultation', 'An advisor entry on the homepage helps families discuss their subject, goals or budget before choosing a tutor.'],
          ['Joining as a teacher', 'Teacher onboarding → Teacher registration → Credentials', 'Teachers enter registration with their role selected and can proceed to credentials and availability setup.']
        ],
        profileLink: 'See a tutor profile and booking options',
        teacherLink: 'See teacher onboarding'
      }
    ],
    outcomeLabel: 'Deliverables',
    outcomeTitle: 'A responsive web experience for choosing a tutor',
    outcome: 'The design covered the homepage, tutor discovery and profiles, booking and consultation, student registration and teacher onboarding. Desktop and mobile layouts retain the same decision order so users can filter, compare and find their next step.',
    sourceNote: 'Screens are from the current live website. The case study covers my contributions to tutor discovery, booking and onboarding.',
    next: 'Next project'
  }
};
