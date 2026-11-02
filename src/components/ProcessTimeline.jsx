import { SITE } from '../content';

export function ProcessTimeline() {
  return (
    <section className="section rule" id="process">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">Delivery Methodology</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Predictable, milestone-driven execution</h2>
          <p className="lede rv" style={{ '--d': 2 }}>
            Zero surprise handoffs. We operate in bi-weekly deployable sprints with interactive working prototypes, automated regression tests, and transparent steering committee demos.
          </p>
        </div>

        <div className="roadmap-grid">
          {SITE.roadmapSteps.map((step, idx) => (
            <div key={step.step} className="roadmap-card spot rv" style={{ '--d': idx }}>
              <div className="roadmap-top-row">
                <span className="roadmap-step-pill">{step.step}</span>
                <span className="roadmap-duration-pill">{step.duration}</span>
              </div>
              <h3 className="roadmap-title">{step.title}</h3>
              <p className="roadmap-details">{step.details}</p>
              <div className="roadmap-step-footer">
                <span className="roadmap-check">✓ Milestone Signoff Required</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
