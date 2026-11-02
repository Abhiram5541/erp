import { useState } from 'react';
import { SITE } from '../content';

export function InteractiveSandbox() {
  const [activeModule, setActiveModule] = useState('finance');
  const [rowStates, setRowStates] = useState({});

  const moduleData = SITE.dashboardModules[activeModule] || SITE.dashboardModules.finance;

  const handleAction = (rowId) => {
    setRowStates(prev => {
      const current = prev[rowId];
      if (current === 'completed') return { ...prev, [rowId]: 'pending' };
      return { ...prev, [rowId]: 'completed' };
    });
  };

  return (
    <section className="section rule" id="live-sandbox">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">Live App Sandbox</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Explore real ERP screens and interactive tools</h2>
          <p className="lede rv" style={{ '--d': 2 }}>
            Switch between production modules. Click rows to test approval workflows, resolve anomalies, and inspect live ledger tables.
          </p>
        </div>

        {/* Sandbox Shell */}
        <div className="sandbox-card rv" style={{ '--d': 3 }}>
          {/* Top Window Bar */}
          <div className="sandbox-chrome">
            <div className="chrome-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="chrome-url">
              <span className="lock-icon">🔒</span>
              <span>erp.yourcompany.com</span>
              <span className="url-path">/ {activeModule}</span>
            </div>
            <div className="chrome-status">
              <span className="pulse-dot" />
              <span>LIVE CLOUD INSTANCE</span>
            </div>
          </div>

          {/* Module Navigation Tabs */}
          <div className="sandbox-nav-bar">
            {[
              { id: 'finance', label: 'Finance & Treasury', icon: '💰' },
              { id: 'inventory', label: 'Warehouse & Supply', icon: '📦' },
              { id: 'sales', label: 'Sales & CRM', icon: '📈' },
              { id: 'ai', label: 'AI Intelligence', icon: '✦' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`sandbox-nav-tab ${activeModule === tab.id ? 'active' : ''}`}
                onClick={() => setActiveModule(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Dashboard Stage */}
          <div className="sandbox-body">
            <div className="sandbox-header-row">
              <div>
                <h3 className="sandbox-module-title">{moduleData.title}</h3>
                <p className="sandbox-module-sub">{moduleData.summary}</p>
              </div>
              <div className="sandbox-header-actions">
                <span className="badge-live">Updated Real-Time</span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => alert(`Exporting ${moduleData.title} CSV snapshot...`)}
                >
                  Export CSV ↓
                </button>
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="sandbox-kpis-grid">
              {moduleData.kpis.map((kpi) => (
                <div key={kpi.label} className="sandbox-kpi-card">
                  <span className="kpi-name">{kpi.label}</span>
                  <div className="kpi-value-row">
                    <b className="kpi-val">{kpi.val}</b>
                    <span className={`kpi-change ${kpi.trend}`}>{kpi.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Data Table */}
            <div className="sandbox-table-wrap">
              <table className="sandbox-table">
                <thead>
                  <tr>
                    {moduleData.tableHead.map((th, i) => (
                      <th key={th} style={{ textAlign: i === moduleData.tableHead.length - 1 ? 'right' : 'left' }}>
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {moduleData.tableRows.map((row) => {
                    const isDone = rowStates[row.id] === 'completed';
                    const displayStatus = isDone ? 'Reconciled / Settled' : row.status;
                    const displayAction = isDone ? 'Undo Action' : row.action;

                    return (
                      <tr key={row.id} className={isDone ? 'row-completed' : ''}>
                        <td className="cell-id">
                          <span className="id-code">{row.id}</span>
                        </td>
                        <td className="cell-client">{row.client}</td>
                        <td className="cell-amount">{row.amount}</td>
                        <td className="cell-date">{row.date}</td>
                        <td>
                          <span
                            className={`status-pill ${
                              isDone
                                ? 'status-good'
                                : row.status.toLowerCase().includes('alert') || row.status.toLowerCase().includes('review') || row.status.toLowerCase().includes('flag')
                                ? 'status-warn'
                                : 'status-good'
                            }`}
                          >
                            <span className="pill-dot" />
                            {displayStatus}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className={`btn-table-action ${isDone ? 'btn-done' : ''}`}
                            onClick={() => handleAction(row.id)}
                          >
                            {displayAction}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Status Bar */}
            <div className="sandbox-footer">
              <div className="footer-left">
                <span className="footer-label">Double-Entry Balance:</span>
                <span className="footer-val text-good">MATCHED ($0.00 Variance)</span>
                <span className="footer-divider">|</span>
                <span className="footer-label">Active Database:</span>
                <span className="footer-val">PostgreSQL Columnar Engine (42ms)</span>
              </div>
              <div className="footer-right">
                <span>✦ Tip: Click any row action button to test interactive state changes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
