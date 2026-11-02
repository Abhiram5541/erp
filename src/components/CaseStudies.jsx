import { SITE } from '../content';

export function CaseStudies() {
  return (
    <section className="section rule" id="case-studies">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">Strategic Outcomes · Thoughtworks Riff</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Measured by enterprise bottom-line impact, not lines of code</h2>
          <p className="lede rv" style={{ '--d': 2 }}>
            Real-world enterprise case studies demonstrating how custom operating architecture replaces brittle legacy systems and eliminates millions in operational drag.
          </p>
        </div>

        {/* Case Studies Cards */}
        <div className="case-studies-list">
          {SITE.caseStudies.map((cs, idx) => (
            <article key={cs.title} className="case-study-card spot rv" style={{ '--d': idx + 1 }}>
              <div className="cs-header-strip">
                <span className="cs-sector-badge">{cs.sector}</span>
                <span className="cs-verified-badge">✓ Verified Client Deployment</span>
              </div>

              <h3 className="cs-title">{cs.title}</h3>

              <div className="cs-body-grid">
                <div className="cs-narrative">
                  <div className="cs-block">
                    <h5 className="cs-label">The Operational Bottleneck</h5>
                    <p className="cs-text">{cs.challenge}</p>
                  </div>

                  <div className="cs-block">
                    <h5 className="cs-label">The ERPsol Architecture Solution</h5>
                    <p className="cs-text">{cs.solution}</p>
                  </div>

                  <blockquote className="cs-quote">
                    <p>“{cs.quote}”</p>
                    <cite>— {cs.author}</cite>
                  </blockquote>
                </div>

                {/* Hard Metrics Column */}
                <div className="cs-metrics-col">
                  <h5 className="cs-label">Audited Business Results</h5>
                  <div className="cs-metrics-stack">
                    {cs.metrics.map(m => (
                      <div key={m.label} className="cs-metric-card">
                        <span className="cs-metric-num">{m.num}</span>
                        <span className="cs-metric-sub">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="cs-compliance-pill">
                    <span className="pill-dot" />
                    <span>Air-Gapped & SOC2 Audited Implementation</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* BeFrame Riff: Senior Engineering Guarantee */}
        <div className="senior-craft-banner spot rv" style={{ '--d': 4 }}>
          <div className="craft-left">
            <span className="craft-badge">SENIOR CRAFTSMANSHIP GUARANTEE</span>
            <h3 className="craft-title">Direct access to Principal Architects. No junior handoffs.</h3>
            <p className="craft-desc">
              Every ERPsol engagement is led directly by systems engineers with 10+ years designing enterprise databases, ERP ledgers, and distributed systems. You talk directly with the engineers building your software.
            </p>
          </div>
          <div className="craft-right">
            <div className="craft-stat">
              <b>10+ Yrs</b>
              <span>Avg Engineer Experience</span>
            </div>
            <div className="craft-stat">
              <b>100%</b>
              <span>In-House Engineering</span>
            </div>
            <div className="craft-stat">
              <b>Bi-Weekly</b>
              <span>Working Demo Cadence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
