import { useState } from 'react';
import { Logo } from './Layout';

const SIDE = [
  { id: 'overview', label: 'Overview', icon: '⚡' },
  { id: 'finance', label: 'Finance & Ledger', icon: '💰' },
  { id: 'inventory', label: 'Inventory & Hubs', icon: '📦' },
  { id: 'ai', label: 'AI Automation', icon: '✦' },
];

const KPIS = [
  { l: 'Revenue (MTD)', v: 1284000, u: '$', d: '+14.2%', good: true },
  { l: 'Open Orders', v: 3842, u: '', d: '+6.1%', good: true },
  { l: 'Cash on Hand', v: 412000, u: '$', d: '+3.8%', good: true },
  { l: 'Auto-Matched AP', v: 99.2, u: '%', d: 'Zero-touch', good: true },
];

const ORDERS = [
  { id: 'SO-10482', client: 'Veloce Aerospace Ltd', amount: '$42,800', status: 'paid', statusLabel: 'Paid' },
  { id: 'SO-10481', client: 'Nexa Healthtech Systems', amount: '$18,950', status: 'ship', statusLabel: 'Shipped' },
  { id: 'SO-10480', client: 'Apex Logistics Hub', amount: '$67,400', status: 'wait', statusLabel: 'Awaiting PO' },
  { id: 'SO-10479', client: 'Kestrel Industrial Group', amount: '$11,200', status: 'paid', statusLabel: 'Paid' },
];

// Revenue curve smooth SVG path
const pts = [26, 32, 29, 44, 40, 52, 49, 62, 58, 70, 78, 88].map((v, i) => [i * (560 / 11), 140 - v * 1.3]);
const smooth = p => p.reduce((d, [x, y], i, a) => {
  if (!i) return `M${x},${y}`;
  const [px, py] = a[i - 1], cx = (px + x) / 2;
  return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
}, '');
const LINE = smooth(pts);
const AREA = `${LINE} L560,150 L0,150 Z`;

export function HeroDashboard({ onOpenCmd }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dash-hero-window" id="dash" aria-label="ERPsol interactive dashboard preview" role="region">
      {/* Browser Top Chrome */}
      <div className="chrome">
        <div className="chrome-dots">
          <i className="dot-red" />
          <i className="dot-yellow" />
          <i className="dot-green" />
        </div>
        <div className="chrome-address">
          <span className="chrome-lock">🔒</span>
          <span className="url">erp.yourcompany.com</span>
          <span className="url-sep">/</span>
          <span className="url-active">{activeTab}</span>
        </div>
        <div className="chrome-quick-actions">
          <button className="chrome-cmd-btn" onClick={() => onOpenCmd?.(true)} title="Press ⌘K">
            <kbd>⌘K</kbd> <span>Commands</span>
          </button>
        </div>
      </div>

      {/* Main ERP Layout */}
      <div className="app-shell">
        {/* Sidebar */}
        <aside className="app-sidebar">
          <div className="app-org">
            <Logo size={18} />
            <div className="org-meta">
              <b>Acme Enterprise</b>
              <span>Production Core</span>
            </div>
          </div>

          <div className="app-nav-group">
            <span className="nav-sec-label">OPERATING MODULES</span>
            {SIDE.map(item => (
              <button
                key={item.id}
                className={`app-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="app-nav-group bottom">
            <span className="nav-sec-label">SYSTEM HEALTH</span>
            <div className="system-health-badge">
              <span className="pulse-dot" />
              <span>Zero-Loss Ledger Active</span>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Screen */}
        <div className="app-main">
          {/* Top Bar */}
          <div className="app-topbar">
            <div>
              <h4 className="app-heading">Executive Command Center</h4>
              <p className="app-sub">Consolidated Real-Time Ledger & Operations Telemetry</p>
            </div>
            <div className="topbar-right">
              <span className="topbar-timestamp">Synced 3s ago</span>
              <span className="live-indicator">LIVE</span>
            </div>
          </div>

          {/* 4 KPIs */}
          <div className="kpis-row">
            {KPIS.map(k => (
              <div key={k.l} className="kpi-hero-box">
                <span className="kpi-hero-label">{k.l}</span>
                <div className="kpi-hero-val-wrap">
                  <b className="kpi-hero-val" data-count={k.v} data-unit={k.u}>
                    {k.u === '$' ? `$${(k.v / 1000).toLocaleString()}K` : k.u === '%' ? `${k.v}%` : k.v.toLocaleString()}
                  </b>
                  <span className="kpi-hero-delta">{k.d}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts & Split Cards */}
          <div className="hero-panels-grid">
            <div className="panel-card chart-panel">
              <div className="panel-header">
                <h5>Revenue Velocity <span>Trailing 12 Months · $12.8M Run-rate</span></h5>
                <span className="badge-trend">+24.8% YoY</span>
              </div>
              <svg className="hero-chart-svg" viewBox="0 0 560 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff7a3d" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#ff7a3d" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ff7a3d" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {[30, 65, 100].map(y => (
                  <line key={y} x1="0" x2="560" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                ))}
                <path d={AREA} fill="url(#chartGrad)" />
                <path d={LINE} fill="none" stroke="#ff7a3d" strokeWidth="2.5" />
                {pts.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#ffedd7" stroke="#dc5000" strokeWidth="1.5" />
                ))}
              </svg>
            </div>

            <div className="panel-card wh-panel">
              <div className="panel-header">
                <h5>Warehouse Capacity <span>Real-Time Telemetry</span></h5>
                <span className="badge-trend">3 Sites Optimal</span>
              </div>
              <div className="wh-meters">
                {[
                  { name: 'Chicago DC', pct: 84 },
                  { name: 'Dallas West', pct: 62 },
                  { name: 'Rotterdam Hub', pct: 49 },
                  { name: 'Frankfurt Hub', pct: 91 },
                ].map(wh => (
                  <div key={wh.name} className="wh-meter-row">
                    <span className="wh-meter-name">{wh.name}</span>
                    <div className="wh-meter-track">
                      <div className="wh-meter-fill" style={{ width: `${wh.pct}%` }} />
                    </div>
                    <span className="wh-meter-pct">{wh.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="panel-card orders-panel">
            <div className="panel-header">
              <h5>Continuous Event Ingestion <span>Live Settlement Stream</span></h5>
              <span className="badge-live-stream">● Streaming</span>
            </div>
            <table className="hero-orders-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Enterprise Account</th>
                  <th>Settlement Amount</th>
                  <th>Ledger State</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map(o => (
                  <tr key={o.id}>
                    <td><span className="order-id-chip">{o.id}</span></td>
                    <td className="order-client">{o.client}</td>
                    <td className="order-amt">{o.amount}</td>
                    <td>
                      <span className={`order-status-pill ${o.status}`}>
                        <span className="dot" />
                        {o.statusLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Raycast / Linear style AI Toast */}
      <div className="hero-floating-toast">
        <span className="toast-sparkle">✦</span>
        <div className="toast-content">
          <b>ERPsol Autonomous Agent · Invoices Reconciled</b>
          <p>18 vendor bills matched to POs & bank stream with 0 discrepancies</p>
        </div>
        <span className="toast-time">Just now</span>
      </div>
    </div>
  );
}

export function Hero({ onOpenCmd }) {
  return (
    <section className="hero-section" id="top">
      {/* Stripe-style luminous ambient glow mesh */}
      <div className="hero-aurora-bg" aria-hidden="true">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
        <div className="raycast-light-streak" />
      </div>

      <div className="wrap">
        <div className="hero-copy-container">
          {/* Monospace System Badge */}
          <div className="hero-badge-wrap rv">
            <button className="hero-pill-badge" onClick={() => onOpenCmd?.(true)}>
              <span className="badge-spark">✦</span>
              <span className="badge-text">ERPsol OS 3.0 · Enterprise Release</span>
              <span className="badge-cmd-hint">Press <kbd>⌘K</kbd> for Command Menu →</span>
            </button>
          </div>

          {/* Hero Headline */}
          <h1 className="hero-headline grad rv" style={{ '--d': 1 }}>
            Enterprise Operating Systems &amp; Autonomous Software
          </h1>

          {/* Subtitle */}
          <p className="hero-lede rv" style={{ '--d': 2 }}>
            We design, engineer, and deploy high-concurrency ERP platforms, custom business software, real-time analytics, and private AI automation shaped precisely around how your enterprise operates.
          </p>

          {/* Primary Call to Actions */}
          <div className="hero-cta-group rv" style={{ '--d': 3 }}>
            <a href="#contact" className="btn btn-primary btn-lg">
              <span>Book 30-Min Architecture Call</span>
              <span className="arr">→</span>
            </a>
            <a href="#live-sandbox" className="btn btn-ghost btn-lg">
              <span>Explore Live Sandbox</span>
            </a>
            <button className="btn btn-kbd" onClick={() => onOpenCmd?.(true)}>
              <kbd>⌘K</kbd>
              <span>Command Hub</span>
            </button>
          </div>

          {/* Assurance Note */}
          <div className="hero-note-strip rv" style={{ '--d': 4 }}>
            <span>Direct consultation with Principal Architect</span>
            <span className="note-sep">·</span>
            <span>Fixed-scope milestones</span>
            <span className="note-sep">·</span>
            <span>Reply within 1 business day</span>
          </div>
        </div>

        {/* Hero Interactive Dashboard Screen */}
        <div className="hero-stage-wrap rv" style={{ '--d': 3 }}>
          <HeroDashboard onOpenCmd={onOpenCmd} />
        </div>
      </div>
    </section>
  );
}
