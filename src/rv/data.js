// ERPsol copy for the editorial redesign. Original text; edit freely.
// Anything marked PLACEHOLDER / sample must be replaced with real data before publishing.

export const HERO = {
  eyebrow: 'Builders · Engineers · Operators',
  kicker: 'ERPsol — Technology partner for growing businesses',
  title: ['Your business runs', 'on one system,', 'not ten spreadsheets.'], // middle line renders in serif italic
  body: 'We design and build ERP systems, custom software, web platforms, analytics and AI automation, then stay to run and improve them. One team, accountable from the first workshop to long after go-live.',
  // PLACEHOLDER FIGURES
  stats: [['10+', 'Years delivering software'], ['120+', 'Projects shipped'], ['5', 'Capabilities, one team']],
};

// Stock photography: Unsplash licence (free, attribution optional), hotlinked from images.unsplash.com.
// Swap ids for photos of your own team and projects when you have them. Credits kept here for reference.
export const PHOTO = {
  hero: '1603195827187-459ab02554a0',   // Cherrydeck
  team: '1522071820081-009f0129c71c',   // Annie Spratt (meet, about, cta)
};
export const img = (id, w, h) => `https://images.unsplash.com/photo-${id}?w=${w}${h ? `&h=${h}` : ''}&fit=crop&crop=faces,entropy&q=70&auto=format`;

export const INTRO = {
  hello: "Hello, we're ERPsol.",
  // rendered in condensed caps; words wrapped in [[ ]] are highlighted
  text: "We design, build and run the systems behind growing companies: [[ERP platforms]], custom software, web products, data dashboards and AI automation. One accountable team, from first workshop to long after go-live.",
};

export const TECH = ['Odoo', 'SAP', 'Microsoft .NET', 'React', 'PostgreSQL', 'Power BI', 'Azure', 'AWS', 'Python', 'OpenAI'];

export const BELIEF = {
  quote: 'Good software disappears into the work. We [[map]] the process first, build what removes friction, and then measure whether it actually [[works.]]',
  by: 'ERPsol · how we build',
  principles: [
    ['Process before code', 'Every project starts by mapping how work really flows today, including the workarounds nobody writes down.'],
    ['Small, frequent releases', 'Working software every two weeks, so you see progress and can change course before it is expensive.'],
    ['Measure the outcome', 'We agree what "better" means up front: hours saved, errors avoided, days off the close. Then we report on it.'],
  ],
};

export const PRINCIPLES = [
  ['One source of truth beats ten integrations.', 'Most operational pain comes from the same data living in several places. Consolidate first, then automate.'],
  ['Automate the boring, keep the judgement.', 'AI and workflows should take the copy-paste. People should keep the decisions that need context.'],
  ['A dashboard nobody opens is a cost.', 'Reporting is only useful when it answers a question someone asks every week. We design from those questions.'],
  ['Migrations fail on data, not software.', 'Clean, mapped, reconciled data is most of a successful go-live. We budget for it honestly.'],
  ['Customise the edges, not the core.', 'Keep the ERP core standard so upgrades stay cheap. Put your differentiation in the layers around it.'],
  ['Support is part of the product.', 'Go-live is the start. Monitoring, training and small improvements are where the value compounds.'],
];

export const PLATFORM = {
  card: { year: 'Core', link: ['Start with one module', '#contact'], name: 'The ERPsol platform build', role: 'One connected system', tags: ['ERP core', 'Integrations', 'AI layer'],
    body: 'A typical engagement brings finance, inventory, sales, people and reporting onto one data model, then adds automation and dashboards on top. Start with one module and grow into the rest.' },
  modules: [
    // [name, line, wordmark shown on the card]
    ['Finance & accounting', 'Ledgers, invoicing, payables and receivables', 'Ledger'],
    ['Inventory & supply chain', 'Multi-warehouse stock, reorders, traceability', 'Stock'],
    ['Sales & customers', 'Quotes, orders, customer history and portals', 'Orders'],
    ['People & payroll', 'Records, leave, timesheets and approvals', 'People'],
    ['Reporting & AI insights', 'Live dashboards, anomaly alerts, drafted reports', 'Insight'],
  ],
};

export const SHOW = {
  gauge: { tag: 'Free check', title: 'ERP readiness check', body: 'Twelve questions about your current tools, data and processes. You get a readiness score and the three changes that would matter most.', cta: 'Start the check' },
  audit: { tag: 'Free audit', title: 'Process & systems audit', body: 'A 45-minute session where we map one workflow end to end and show where time and errors leak out.', cta: 'Book the audit', checks: ['Workflow map', 'System inventory', 'Data quality', 'Automation wins', 'Rough roadmap'] },
};

export const AUDIENCE_FIT = 'Best fit: teams ready to change how they work, not just their software';
export const AUDIENCE = [
  ['SMEs', 'outgrowing spreadsheets and disconnected tools'],
  ['Enterprises', 'modernising or integrating across sites and entities'],
  ['Startups', 'turning a validated idea into a product that scales'],
  ['Operations teams', 'drowning in manual approvals and data entry'],
];

export const JOURNEY = [
  { k: 'Discover', title: 'Map how work really flows.', body: 'Workshops with the people who do the work. We map processes, systems and data, and agree what success looks like.', gets: ['Process map', 'System inventory', 'Success metrics'], art: 'discover' },
  { k: 'Design', title: 'Agree it before we build it.', body: 'Architecture, data model and clickable prototypes, reviewed with your team until it fits how you actually work.', gets: ['Architecture', 'Data model', 'Prototype'], art: 'design' },
  { k: 'Build', title: 'Working software, every sprint.', body: 'Two-week sprints with a live demo each time, automated tests and a backlog you can see and reprioritise.', gets: ['Sprint demos', 'Test suite', 'Shared backlog'], art: 'build' },
  { k: 'Launch', title: 'Go live without drama.', body: 'Data migration rehearsed twice, integrations verified, every team trained, and a rollback plan nobody needs.', gets: ['Migration rehearsal', 'Training', 'Go-live plan'], art: 'launch' },
  { k: 'Support', title: 'Keep it getting better.', body: 'Monitoring, fixes and a steady stream of small improvements, reported against the metrics we agreed at the start.', gets: ['Monitoring', 'Monthly review', 'Roadmap'], art: 'support' },
];

export const SERVICES = [
  { id: 'erp', who: 'Growing & multi-site businesses', title: 'Enterprise ERP', line: 'One system for finance, stock, sales and people.', meta: ['8–20 weeks', 'Phased rollout'],
    back: ['Implementation & migration', 'Custom modules & workflows', 'Integrations with existing tools', 'Multi-entity, multi-site', 'Training & support'] },
  { id: 'software', who: 'Teams with unique processes', title: 'Custom software', line: 'Tools built around how you actually work.', meta: ['6–16 weeks', 'Custom quote'],
    back: ['Internal business apps', 'APIs & integrations', 'Customer & partner portals', 'Legacy modernisation', 'Ongoing development'] },
  { id: 'web', who: 'Brands & founders', title: 'Websites & web apps', line: 'Fast, accessible sites and products that convert.', meta: ['3–10 weeks', 'Custom quote'],
    back: ['Corporate sites & CMS', 'E-commerce', 'Web applications', 'MVPs for startups', 'Performance & SEO'] },
  { id: 'data', who: 'Leaders who need clarity', title: 'Data & BI', line: 'Dashboards people actually open every week.', meta: ['4–8 weeks', 'Monthly retainer'],
    back: ['KPI design', 'Data pipelines & warehouse', 'Role-based dashboards', 'Alerts & anomaly detection', 'Self-service BI'] },
  { id: 'ai', who: 'Operations-heavy teams', title: 'AI & automation', line: 'Take the copy-paste out of every workflow.', meta: ['3–8 weeks', 'Custom quote'],
    back: ['Document extraction', 'Approval workflows', 'Forecasting', 'AI assistants on your data', 'Human review queues'] },
];

// SAMPLE: replace with real case studies and figures. Photos: Lalit Kumar, Nathália Rosa, Kelly Sikkema (Unsplash).
export const EVIDENCE = {
  stats: [['120+', 'Projects across ERP, software & data'], ['−60%', 'Month-end close time, manufacturing ERP'], ['80%', 'Invoices processed without manual entry']],
  cases: [
    { tag: 'Manufacturing — ERP', title: 'From three systems to one, across four plants.', body: 'Spreadsheets and disconnected tools replaced by a phased ERP rollout covering production, inventory, procurement and finance.', m: [['−60%', 'Close time'], ['1', 'Source of truth']], photo: '1610891015188-5369212db097' },
    { tag: 'Retail — Data & BI', title: 'Daily stock and sales visibility for a retail chain.', body: 'POS and warehouse data piped into one warehouse with role-based dashboards and low-stock alerts.', m: [['Daily', 'Reporting'], ['−35%', 'Stock-outs']], photo: '1578916171728-46686eac8d58' },
    { tag: 'Services — AI automation', title: 'Invoices that file themselves.', body: 'Document extraction and approval workflow feeding accounting directly, with people reviewing only exceptions.', m: [['80%', 'Auto-processed'], ['Hours', 'Saved weekly']], photo: '1554224155-1696413565d3' },
  ],
};

// SAMPLE QUOTES: placeholders shown with a "Sample" label until replaced with real, attributable reviews.
export const QUOTES = [
  { q: 'They mapped our process before writing a line of code, and it showed. The rollout was the calmest system change we have had.', who: 'Operations Director', org: 'Manufacturing client', tone: 'paper', sample: true },
  { q: 'Month-end used to take two weeks of spreadsheets. Now finance closes in days and the numbers match the first time.', who: 'Finance Lead', org: 'Distribution client', tone: 'ink', sample: true },
  { q: 'Clear communication, demos every sprint and no surprises on budget. We extended the engagement twice.', who: 'Founder', org: 'SaaS startup', tone: 'gold', sample: true },
];

export const ABOUT = {
  title: ['Built for the', 'long run.'],
  body: 'ERPsol exists because too many businesses are held together by spreadsheets and heroics. We build the systems that replace them, then stay to keep them improving. Plain language, visible progress, and engineering we would be happy to maintain ourselves.',
  sign: 'The ERPsol team',
  values: ['Ownership — we treat your outcomes as our own', 'Clarity — plain language and visible progress', 'Craft — clean, tested, maintainable engineering', 'Partnership — we stay after launch'],
};

// [key in SITE.links, name, what you post, brand colour]
export const CHANNELS = [
  ['linkedin', 'LinkedIn', 'Company news, case studies and hiring.', '#0a66c2'],
  ['github', 'GitHub', 'Open-source tools and code samples.', '#171a18'],
  ['clutch', 'Clutch', 'Verified client reviews and ratings.', '#e62415'],
];

// PLACEHOLDER articles: titles for the blog you plan to publish. [tag, title, excerpt, Unsplash photo id]
// Photos: CHUTTERSNAP, Kelly Sikkema, Luke Chesser, Kaleidico, Taylor Vick, Campaign Creators.
export const INSIGHTS = [
  ['ERP', 'Why ERP projects fail on data, not software', 'What a realistic migration plan looks like, and where the budget really goes.', '1587293852726-70cdb56c2866'],
  ['Automation', 'Five approval workflows worth automating first', 'Small, boring processes with the fastest payback and the least risk.', '1554224155-cfa08c2a758f'],
  ['BI', 'Designing dashboards people actually open', 'Start from the weekly question, not the available data.', '1551288049-bebda4e38f71'],
  ['ERP', 'Customise the edges, not the core', 'How to keep upgrades cheap while still fitting the way you work.', '1532622785990-d2c36a76f5a6'],
  ['AI', 'Where AI helps in back-office work today', 'Document extraction, forecasting and drafting: what is ready and what is hype.', '1558494949-ef010cbdcc31'],
  ['Strategy', 'Build, buy or configure?', 'A simple framework for choosing between custom software and off-the-shelf.', '1542744173-8e7e53415bb0'],
];

export const FAQ = [
  ['What does ERPsol actually do?', 'We design, build and support business systems: ERP implementations, custom software, websites and web apps, data dashboards and AI automation. Most clients start with one and add others over time.'],
  ['How do you start a new project?', 'With a free consultation, then a short paid discovery phase where we map your processes and systems and agree scope, success metrics and a roadmap.'],
  ['How long does an ERP rollout take?', 'Typically 8 to 20 weeks depending on modules, sites and data quality. We roll out in phases so teams get value early.'],
  ['How much does it cost?', 'It depends on scope. Discovery gives you a fixed quote for the first release. Websites and focused automations are smaller; multi-site ERP is larger.'],
  ['Which platforms do you work with?', 'Odoo, SAP integrations, Microsoft .NET, React, PostgreSQL, Power BI, Azure, AWS and modern AI APIs. We recommend what fits, not what we resell.'],
  ['How do you use AI in client work?', 'Where it removes manual effort safely: document extraction, drafting, forecasting and assistants grounded in your own data, always with human review on exceptions.'],
  ['Do you support systems after launch?', 'Yes. Monitoring, fixes, training and continuous improvement on a monthly plan, reported against the metrics agreed at the start.'],
];
