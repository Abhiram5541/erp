import { SITE } from '../content';

export function LogosWall() {
  return (
    <section className="logos-wall-section" id="social-proof">
      <div className="wrap">
        {/* Stripe-style Key Metrics Row */}
        <div className="metrics-strip rv">
          {SITE.trustMetrics.map((m, i) => (
            <div key={m.label} className="metric-box" style={{ '--d': i }}>
              <div className="metric-number">
                <span className="metric-prefix">{m.prefix}</span>
                <span className="metric-val" data-count={m.value} data-unit={m.suffix}>
                  {m.prefix}{m.value}{m.suffix}
                </span>
              </div>
              <p className="metric-label">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Enterprise Client Logos & Sectors */}
        <div className="logos-header rv" style={{ '--d': 2 }}>
          <span className="eyebrow">Enterprise Validation</span>
          <p className="logos-lead">Mission-critical systems engineered for high-concurrency operating environments</p>
        </div>

        <div className="clients-grid rv" style={{ '--d': 3 }}>
          {SITE.clientLogos.map((client) => (
            <div key={client.name} className="client-badge-card spot">
              <div className="client-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="client-meta">
                <h4 className="client-name">{client.name}</h4>
                <div className="client-tags">
                  <span className="client-sector">{client.sector}</span>
                  <span className="client-tag-dot">·</span>
                  <span className="client-project">{client.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Badges */}
        <div className="trust-cert-bar rv" style={{ '--d': 4 }}>
          <div className="cert-item">
            <span className="cert-check">✓</span>
            <span>SOC 2 Type II Certified Architecture</span>
          </div>
          <div className="cert-divider" />
          <div className="cert-item">
            <span className="cert-check">✓</span>
            <span>ISO 27001 & GDPR / HIPAA Compliant</span>
          </div>
          <div className="cert-divider" />
          <div className="cert-item">
            <span className="cert-check">✓</span>
            <span>Zero-Downtime Multi-Region Active Failover</span>
          </div>
        </div>
      </div>
    </section>
  );
}
