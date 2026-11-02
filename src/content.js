// ERPsol Enterprise Content & System Architecture Data
export const SITE = {
  name: 'ERPsol',
  tagline: 'Enterprise Operating Systems & Intelligent Software',
  formEndpoint: '',
  email: 'advisory@erpsol.com',
  phone: '+1 (800) 419-3770',
  links: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    clutch: 'https://clutch.co',
    privacy: '/privacy',
    terms: '/terms',
  },

  trustMetrics: [
    { value: 2.4, suffix: 'B+', label: 'Annual ERP Volume Managed', prefix: '$' },
    { value: 120, suffix: '+', label: 'Enterprise Systems Shipped', prefix: '' },
    { value: 99.99, suffix: '%', label: 'Mission-Critical SLA Uptime', prefix: '' },
    { value: 24, suffix: ' Days', label: 'Avg. First Production Release', prefix: '<' },
  ],

  clientLogos: [
    { name: 'Veloce Aerospace', sector: 'Advanced Manufacturing', tag: 'Global Multi-Site ERP' },
    { name: 'Nexa Healthtech', sector: 'Healthcare & Clinical', tag: 'HIPAA-Compliant Core' },
    { name: 'Apex Logistics', sector: 'Supply Chain & Freight', tag: 'Automated Fleet BI' },
    { name: 'Kestrel Industrial', sector: 'Fabrication & Robotics', tag: 'Shop-Floor Execution' },
    { name: 'Lumina Energy', sector: 'Renewables & Grid', tag: 'IoT Ingestion Platform' },
    { name: 'Orion Commerce', sector: 'Omnichannel Retail', tag: 'ERP & POS Synchronizer' },
  ],

  services: [
    {
      id: 'erp',
      title: 'Enterprise ERP Systems',
      eyebrow: '01 / CORE SYSTEMS',
      body: 'Unified operating platforms that connect finance, manufacturing, inventory, procurement, and HR into one immutable source of truth.',
      points: [
        'Multi-entity, multi-currency ledger consolidation',
        'Automated 3-way matching and PO reconciliation',
        'Zero-downtime migration from legacy systems & spreadsheets',
        'Custom modular workflows shaped to your exact business logic'
      ],
      metrics: ['−65% Month-end close time', '100% Audit traceability']
    },
    {
      id: 'software',
      title: 'Custom Business Software',
      eyebrow: '02 / ARCHITECTURE',
      body: 'Bespoke web applications, high-throughput internal tools, and microservices engineered for departments where off-the-shelf software falls short.',
      points: [
        'Proprietary operational portals & field dispatch apps',
        'High-concurrency database architecture & event streaming',
        'Role-based permissions (RBAC) & enterprise SSO (Okta, Azure AD)',
        'Modernization of brittle legacy desktop or mainframe tools'
      ],
      metrics: ['Sub-50ms API responses', '99.99% Guaranteed uptime']
    },
    {
      id: 'web',
      title: 'Enterprise Web & Portals',
      eyebrow: '03 / DIGITAL EXPERIENCE',
      body: 'High-performance customer portals, supplier extranets, and B2B ordering platforms that integrate directly into your operational backend.',
      points: [
        'Self-service customer & supplier management portals',
        'Headless B2B wholesale ordering & quote configurators',
        'WCAG 2.1 AA accessibility & sub-second Core Web Vitals',
        'Seamless bidirectional sync with ERP billing & fulfillment'
      ],
      metrics: ['< 0.8s Global LCP', '3.4x Portal self-service adoption']
    },
    {
      id: 'data',
      title: 'Real-Time Data & BI',
      eyebrow: '04 / INTELLIGENCE',
      body: 'Enterprise data lakes, automated ETL pipelines, and executive dashboards that turn raw operational telemetry into predictive strategic decisions.',
      points: [
        'Continuous pipeline from POS, warehouse, and bank APIs',
        'Custom executive reporting built around true bottom-line KPIs',
        'Automated anomaly detection for margin drift & supplier delay',
        'Self-service BI queries with zero SQL required for department heads'
      ],
      metrics: ['Real-time vs monthly sync', '−35% Unplanned stock-outs']
    },
    {
      id: 'ai',
      title: 'AI & Autonomous Workflows',
      eyebrow: '05 / AUTOMATION',
      body: 'Production-grade AI agents and automation pipelines grounded in your private enterprise data, eliminating repetitive human data processing.',
      points: [
        'Intelligent document processing: PDF invoices, bills of lading & contracts',
        'Predictive demand forecasting & safety stock automated RFQs',
        'Natural-language query over enterprise ERP data & documents',
        'Exception-only human approval queues with full audit log'
      ],
      metrics: ['80% Invoices auto-reconciled', '18+ hrs saved/week per branch']
    },
  ],

  // Live Workflow Simulator Scenarios (Retool-style live interactive simulator)
  simulatorWorkflows: [
    {
      id: 'invoice-matching',
      name: '3-Way Invoice Matching & Reconciliation',
      badge: 'Finance & AP',
      description: 'Vendor sends an invoice PDF. AI extracts line items, validates against Purchase Order and Receiving Slip, flags $420 freight discrepancy, and cues payment upon approval.',
      steps: [
        { label: 'PDF Ingestion', status: 'done', detail: 'Received INV-8829 ($24,850.00) from Kestrel Steel' },
        { label: 'OCR & Line Item Extraction', status: 'done', detail: '14 SKUs parsed with 99.8% model confidence' },
        { label: 'PO Cross-Reference', status: 'done', detail: 'Matched against PO-4102 and Warehouse Slip WH-994' },
        { label: 'Discrepancy Check', status: 'alert', detail: 'Detected +$420 freight charge exceeding contract cap' },
        { label: 'Smart Routing', status: 'ready', detail: 'Queued for Controller single-click override signoff' },
      ],
      kpiImpact: { label: 'Processing time', before: '42 mins manual', after: '3.8 seconds' },
    },
    {
      id: 'stock-replenishment',
      name: 'Predictive Multi-Warehouse Stock Replenishment',
      badge: 'Supply Chain',
      description: 'System detects high sales velocity in Dallas DC, forecasts stock-out in 9 days, triggers an automated transfer from Chicago hub, and drafts supplier PO.',
      steps: [
        { label: 'Telemetry Monitoring', status: 'done', detail: 'Dallas DC stock for SKU-884 at 14% safety reserve' },
        { label: 'Demand Forecasting', status: 'done', detail: 'Predicted surge (+28%) over upcoming 14-day cycle' },
        { label: 'Inventory Rebalancing', status: 'done', detail: 'Identified 840 surplus units available in Chicago DC' },
        { label: 'Automated Transfer Order', status: 'done', detail: 'Generated Inter-DC transfer manifest TR-5510' },
        { label: 'ERP Stock Lock', status: 'ready', detail: 'Allocated units in transit, preventing double-selling' },
      ],
      kpiImpact: { label: 'Stock-out risk', before: '18.4% incident rate', after: '0.4% under ERPsol' },
    },
    {
      id: 'cashflow-forecast',
      name: 'Real-Time Multi-Entity Cash Flow Forecast',
      badge: 'Treasury & CFO',
      description: 'Aggregates live banking feeds across 4 legal entities, projects next 60-day cash position incorporating expected receivables, planned payroll, and CapEx.',
      steps: [
        { label: 'Bank Feeds Sync', status: 'done', detail: 'Synced JPMorgan, Silicon Valley Bank & Barclays APIs' },
        { label: 'Accounts Receivable Probability', status: 'done', detail: 'Scored $1.42M open invoices based on historical DSO' },
        { label: 'Tax & Payroll Projection', status: 'done', detail: 'Scheduled $380K bi-weekly payroll and VAT obligations' },
        { label: 'Scenario Modeling', status: 'done', detail: 'Run stress test under 15% payment delay scenario' },
        { label: 'CFO Executive Brief', status: 'ready', detail: 'Target runway: 14.8 months; recommended CapEx window clear' },
      ],
      kpiImpact: { label: 'Forecast accuracy', before: 'Bi-monthly spreadsheet', after: 'Continuous real-time' },
    },
  ],

  // Retool / ERPSAA Interactive Live Dashboard Data
  dashboardModules: {
    finance: {
      title: 'Finance & Treasury',
      summary: 'Automated general ledger, accounts payable & cash visibility',
      kpis: [
        { label: 'Cash on Hand', val: '$1,482,000', change: '+8.4%', trend: 'up' },
        { label: 'Monthly Invoiced', val: '$840,250', change: '+14.2%', trend: 'up' },
        { label: 'Avg DSO (Days)', val: '28.4', change: '−4.6 days', trend: 'good' },
        { label: 'Auto-Matched Invoices', val: '94.2%', change: '+3.1pt', trend: 'good' },
      ],
      tableHead: ['Invoice ID', 'Entity / Client', 'Amount', 'Date', 'Status', 'Action'],
      tableRows: [
        { id: 'INV-4401', client: 'Veloce Aerospace Ltd', amount: '$42,800.00', date: 'Today', status: 'Approved', action: 'Settled' },
        { id: 'INV-4402', client: 'Nexa Healthtech Systems', amount: '$18,950.00', date: 'Today', status: 'Pending Review', action: 'Approve' },
        { id: 'INV-4403', client: 'Apex Logistics Hub', amount: '$67,400.00', date: 'Yesterday', status: 'Reconciled', action: 'View Receipt' },
        { id: 'INV-4404', client: 'Kestrel Industrial Group', amount: '$11,200.00', date: 'Yesterday', status: 'Approved', action: 'Settled' },
      ],
    },
    inventory: {
      title: 'Warehouse & Supply Chain',
      summary: 'Multi-location inventory tracking with automated stock velocity',
      kpis: [
        { label: 'Total Active SKUs', val: '14,820', change: '+120 new', trend: 'up' },
        { label: 'Warehouse Capacity', val: '78.4%', change: 'Optimal', trend: 'good' },
        { label: 'Fulfillment Rate', val: '99.4%', change: '+1.2pt', trend: 'good' },
        { label: 'Stock Alerts', val: '2 Pending', change: 'Action required', trend: 'warn' },
      ],
      tableHead: ['SKU Code', 'Description', 'Warehouse', 'On Hand', 'Status', 'Action'],
      tableRows: [
        { id: 'SKU-0914', client: 'Titanium Fastener 12mm', amount: 'Chicago Main', date: '4,280 units', status: 'In Stock', action: 'Details' },
        { id: 'SKU-1822', client: 'Hydraulic Actuator H-4', amount: 'Dallas West', date: '84 units', status: 'Low Stock Alert', action: 'Reorder' },
        { id: 'SKU-3190', client: 'Ceramic Composite Plate', amount: 'Berlin Hub', date: '1,920 units', status: 'In Stock', action: 'Details' },
        { id: 'SKU-4408', client: 'Sensor Interface PCB v2', amount: 'Chicago Main', date: '210 units', status: 'PO Placed', action: 'Track Freight' },
      ],
    },
    sales: {
      title: 'Commercial Operations & CRM',
      summary: 'Connected quote-to-cash workflow with ERP stock reservations',
      kpis: [
        { label: 'Quarterly Bookings', val: '$3.48M', change: '+22.1%', trend: 'up' },
        { label: 'Quote-to-Cash Speed', val: '3.2 days', change: '−68% faster', trend: 'good' },
        { label: 'Active Pipeline', val: '$6.12M', change: '42 deals', trend: 'up' },
        { label: 'Contract Retention', val: '98.8%', change: '+0.4pt', trend: 'good' },
      ],
      tableHead: ['Deal / Quote', 'Enterprise Account', 'Contract Value', 'Stage', 'Status', 'Action'],
      tableRows: [
        { id: 'Q-7782', client: 'Global Dynamics Corp', amount: '$185,000', date: 'Final Signature', status: 'Won', action: 'Deploy ERP' },
        { id: 'Q-7783', client: 'Meridian Energy Group', amount: '$94,000', date: 'Commercial Review', status: 'Active', action: 'Send Rev' },
        { id: 'Q-7784', client: 'Starlight Medical Inc', amount: '$310,000', date: 'Security Audit', status: 'Active', action: 'Review SOC2' },
        { id: 'Q-7785', client: 'Atlas Transport Ltd', amount: '$78,500', date: 'Contract Signed', status: 'Won', action: 'Provision' },
      ],
    },
    ai: {
      title: 'AI Operational Intelligence',
      summary: 'Continuous anomaly scans, automated briefings, and workflow copilot',
      kpis: [
        { label: 'Documents Processed', val: '4,892 /mo', change: '100% automated', trend: 'good' },
        { label: 'Anomalies Prevented', val: '38 flags', change: '$82k saved', trend: 'good' },
        { label: 'Model Confidence', val: '99.4%', change: 'Enterprise grade', trend: 'good' },
        { label: 'Exceptions Pending', val: '1 Item', change: 'Human review', trend: 'warn' },
      ],
      tableHead: ['Event / Signal', 'System Source', 'Financial Impact', 'AI Confidence', 'Resolution', 'Action'],
      tableRows: [
        { id: 'FLAG-991', client: 'Supplier Freight Surcharge +12%', amount: '$1,840 variance', date: '99.8%', status: 'Flagged', action: 'Dispute' },
        { id: 'FLAG-992', client: 'Duplicate Invoice Match Detected', amount: '$8,450 prevented', date: '100%', status: 'Auto-Blocked', action: 'View Log' },
        { id: 'FLAG-993', client: 'Stock Depletion Acceleration (Dallas)', amount: '3 days early', date: '96.4%', status: 'PO Drafted', action: 'Approve PO' },
        { id: 'FLAG-994', client: 'Unusual Discount Threshold on Order', amount: '$4,100 variance', date: '98.2%', status: 'Needs VP Signoff', action: 'Review' },
      ],
    },
  },

  // Architecture Backbone (Vercel-style technical schematic)
  architectureNodes: [
    { id: 'frontend', name: 'Executive Web & Portals', tech: 'Next.js 15 · React 18 · Edge SSR', latency: '< 40ms TTFB', role: 'Global CDN Delivery' },
    { id: 'gateway', name: 'Enterprise API Gateway', tech: 'GraphQL Mesh · REST · WebSockets', latency: '< 15ms Latency', role: 'Auth, Rate Limiting & Audit' },
    { id: 'core', name: 'ERPsol Core Operating Engine', tech: 'Distributed Event Bus · Temporal Workflows', latency: 'ACID Guaranteed', role: 'Double-Entry Ledger & State' },
    { id: 'lake', name: 'Operational Data Mesh', tech: 'PostgreSQL · ClickHouse · Kafka Streams', latency: 'Zero-Lag Telemetry', role: 'Columnar Analytics & Logs' },
    { id: 'ai', name: 'Private AI Agent Runtime', tech: 'Fine-Tuned LLMs · Private Vector Store', latency: 'Air-Gapped & SOC2', role: 'Doc Extraction & Anomaly Scans' },
    { id: 'connectors', name: 'Legacy & External Connectors', tech: 'SAP · Salesforce · NetSuite · Stripe · Bank APIs', latency: 'Bi-Directional', role: 'Continuous Sync Engine' },
  ],

  // Case Studies (Thoughtworks-style strategic outcomes)
  caseStudies: [
    {
      sector: 'Aerospace & Heavy Fabrication',
      title: 'Unifying 4 Global Manufacturing Plants into One Real-Time ERP',
      challenge: 'Client operated across 4 facilities with disconnected ERP instances, 120+ Excel reconciliation sheets, and a 16-day month-end accounting close.',
      solution: 'Designed and deployed a unified ERPsol multi-entity architecture connecting shop-floor barcode telemetry, automated procurement, and unified general ledger.',
      metrics: [
        { num: '−68%', label: 'Accounting close time (16 days down to 5)' },
        { num: '$1.4M', label: 'Inventory carry cost eliminated in Year 1' },
        { num: '100%', label: 'Traceability compliance across ISO & FAA audits' },
      ],
      quote: 'ERPsol gave us something no off-the-shelf software could: an operating platform shaped precisely around how our assembly lines actually run.',
      author: 'VP of Operations, Global Aerospace Manufacturing',
    },
    {
      sector: 'Omnichannel Logistics & Retail',
      title: 'Real-Time Inventory Engine & Predictive Order Allocation for 65 Locations',
      challenge: 'High stock-out frequency in high-velocity metro stores while rural distribution centers held excess inventory, causing $3.8M in missed seasonal sales.',
      solution: 'Engineered a real-time event-driven inventory routing engine with predictive restocking triggers and unified POS-to-warehouse reconciliation.',
      metrics: [
        { num: '−35%', label: 'Reduction in out-of-stock lost revenue' },
        { num: '99.4%', label: 'Same-day fulfillment accuracy' },
        { num: '14 mins', label: 'End-of-day store reconciliation (from 2.5 hrs)' },
      ],
      quote: 'We went from reacting to stock shortages days too late to having our supply chain rebalance itself automatically.',
      author: 'Chief Supply Chain Officer, National Retail Network',
    },
    {
      sector: 'Healthcare & Clinical Services',
      title: 'AI Document Processing & Autonomous Accounts Payable Pipeline',
      challenge: 'Medical staff and finance coordinators manually processed over 18,000 vendor invoices, claims, and compliance certificates monthly.',
      solution: 'Implemented ERPsol AI Document Agent with intelligent 3-way matching against clinical supply agreements and automated fraud/duplicate checks.',
      metrics: [
        { num: '84%', label: 'Invoices processed with zero human touch' },
        { num: '22 hrs', label: 'Saved per branch per week for clinical staff' },
        { num: '0.00%', label: 'Duplicate invoice payments since rollout' },
      ],
      quote: 'Our finance team expanded operations 3x without having to add a single data-entry headcount.',
      author: 'Chief Financial Officer, Healthcare Group',
    },
  ],

  // Process / Delivery Roadmap
  roadmapSteps: [
    {
      step: '01',
      title: 'Architectural Discovery & Process Blueprint',
      duration: 'Week 1–2',
      details: 'Deep-dive workshops with department heads, process mapping, data dictionary audit, and technical integration requirements. Deliverable: Full system architecture & fixed milestone roadmap.',
    },
    {
      step: '02',
      title: 'Clickable Prototype & Data Model Verification',
      duration: 'Week 3–4',
      details: 'High-fidelity interactive prototype of the entire system. Your team tests real workflows, edge cases, and role permissions before production code begins.',
    },
    {
      step: '03',
      title: 'Core Engine Sprint & Continuous Demo Cadence',
      duration: 'Week 5–10',
      details: 'Bi-weekly deployable sprint releases with testable environments. Automated CI/CD, 100% test coverage, and weekly steering committee reviews.',
    },
    {
      step: '04',
      title: 'Data Migration & Shadow Run Go-Live',
      duration: 'Week 11–12',
      details: 'Automated historical data migration, reconciliation audits, side-by-side shadow runs with legacy tools, and zero-downtime cutover with instant rollback contingencies.',
    },
    {
      step: '05',
      title: 'Post-Launch Scaled Partnership & SLA Support',
      duration: 'Ongoing',
      details: '24/7 technical operations, continuous performance monitoring, quarterly AI model retraining, and dedicated principal engineer availability.',
    },
  ],

  // Command Palette Items (Linear / Raycast riff)
  quickCommands: [
    { id: 'cmd-calc', title: 'Calculate Your ERP ROI & Timeline', category: 'Tools', shortcut: 'R', target: '#roi-calculator' },
    { id: 'cmd-sim', title: 'Open Live Workflow Simulator', category: 'Interactive', shortcut: 'S', target: '#workflow-simulator' },
    { id: 'cmd-dash', title: 'Test Live Dashboard Sandbox', category: 'Interactive', shortcut: 'D', target: '#live-sandbox' },
    { id: 'cmd-arch', title: 'Inspect Technical Architecture & APIs', category: 'Engineering', shortcut: 'A', target: '#architecture' },
    { id: 'cmd-cases', title: 'Review Enterprise Case Studies', category: 'Outcomes', shortcut: 'C', target: '#case-studies' },
    { id: 'cmd-3d', title: 'Interact with 3D Operational Core', category: 'Experience', shortcut: '3', target: '#operational-core' },
    { id: 'cmd-consult', title: 'Book 30-Min Principal Architect Call', category: 'Action', shortcut: 'B', target: '#contact' },
  ],
};
