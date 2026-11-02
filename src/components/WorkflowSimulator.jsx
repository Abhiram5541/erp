import { useState } from 'react';
import { SITE } from '../content';

export function WorkflowSimulator() {
  const [selectedId, setSelectedId] = useState(SITE.simulatorWorkflows[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(5);
  const [customPrompt, setCustomPrompt] = useState('');

  const currentWorkflow = SITE.simulatorWorkflows.find(w => w.id === selectedId) || SITE.simulatorWorkflows[0];

  const handleSimulate = () => {
    setIsSimulating(true);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);
      if (step >= currentWorkflow.steps.length) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 600);
  };

  return (
    <section className="section rule" id="workflow-simulator">
      <div className="wrap">
        <div className="head center">
          <p className="eyebrow rv">Live Operational Sandbox</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Watch an autonomous business workflow execute</h2>
          <p className="lede rv" style={{ '--d': 2 }}>
            Retool-style live process orchestration: Choose an enterprise workflow or enter your operational bottleneck to simulate how ERPsol automates manual tasks.
          </p>
        </div>

        {/* Interactive Prompt & Preset Bar */}
        <div className="sim-container rv" style={{ '--d': 3 }}>
          <div className="sim-prompt-bar">
            <div className="sim-prompt-icon">✦</div>
            <div className="sim-prompt-input-wrap">
              <span className="sim-prompt-prefix">Describe or trigger workflow:</span>
              <input
                type="text"
                className="sim-prompt-input"
                placeholder={currentWorkflow.name}
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
              />
            </div>
            <button
              className={`btn btn-primary sim-run-btn ${isSimulating ? 'running' : ''}`}
              onClick={handleSimulate}
              disabled={isSimulating}
            >
              {isSimulating ? (
                <>
                  <span className="sim-spinner" />
                  Running Pipeline…
                </>
              ) : (
                <>
                  <span>Simulate Flow</span>
                  <span className="arr">→</span>
                </>
              )}
            </button>
          </div>

          {/* Workflow Selector Tabs */}
          <div className="sim-tabs">
            {SITE.simulatorWorkflows.map(w => (
              <button
                key={w.id}
                className={`sim-tab ${w.id === selectedId ? 'active' : ''}`}
                onClick={() => {
                  setSelectedId(w.id);
                  setActiveStep(w.steps.length);
                  setCustomPrompt('');
                }}
              >
                <span className="sim-tab-badge">{w.badge}</span>
                <span className="sim-tab-title">{w.name}</span>
              </button>
            ))}
          </div>

          {/* Simulation Stage */}
          <div className="sim-stage">
            <div className="sim-grid">
              {/* Left Column: Step-by-Step Pipeline */}
              <div className="sim-pipeline">
                <div className="sim-header">
                  <div>
                    <h3 className="sim-title">{currentWorkflow.name}</h3>
                    <p className="sim-desc">{currentWorkflow.description}</p>
                  </div>
                  <span className="sim-live-chip">
                    <span className="pulse-dot" />
                    {isSimulating ? 'SIMULATION IN FLIGHT' : 'PIPELINE SYNCHRONIZED'}
                  </span>
                </div>

                <div className="sim-steps-list">
                  {currentWorkflow.steps.map((st, idx) => {
                    const isPassed = idx < activeStep;
                    const isCurrent = idx === activeStep && isSimulating;

                    return (
                      <div
                        key={st.label}
                        className={`sim-step-row ${isPassed ? 'completed' : isCurrent ? 'active' : 'pending'}`}
                      >
                        <div className="sim-step-indicator">
                          {isPassed ? (
                            <span className="sim-step-check">✓</span>
                          ) : isCurrent ? (
                            <span className="sim-step-spin" />
                          ) : (
                            <span className="sim-step-num">0{idx + 1}</span>
                          )}
                        </div>
                        <div className="sim-step-content">
                          <div className="sim-step-top">
                            <span className="sim-step-name">{st.label}</span>
                            <span className={`sim-step-status-tag ${st.status}`}>
                              {st.status === 'done' ? 'Completed' : st.status === 'alert' ? 'Discrepancy Flagged' : 'Ready for Signoff'}
                            </span>
                          </div>
                          <p className="sim-step-detail">{st.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Execution Telemetry & KPI Impact */}
              <div className="sim-telemetry">
                <div className="sim-box">
                  <h4 className="sim-box-title">System Impact Delta</h4>
                  <div className="sim-kpi-diff">
                    <span className="sim-kpi-label">{currentWorkflow.kpiImpact.label}</span>
                    <div className="sim-kpi-compare">
                      <div className="sim-before">
                        <span>Legacy Manual</span>
                        <b>{currentWorkflow.kpiImpact.before}</b>
                      </div>
                      <div className="sim-diff-arrow">➔</div>
                      <div className="sim-after">
                        <span>ERPsol Autonomous</span>
                        <b>{currentWorkflow.kpiImpact.after}</b>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sim-box terminal-box">
                  <div className="terminal-bar">
                    <span className="t-dot red" />
                    <span className="t-dot yellow" />
                    <span className="t-dot green" />
                    <span className="terminal-title">telemetry-audit.log</span>
                  </div>
                  <pre className="terminal-content">
                    <code>
{`[${new Date().toISOString().slice(11, 19)}] [AUDIT] Ingest stream active.
[${new Date().toISOString().slice(11, 19)}] [AUTH] Role: Principal Controller
[${new Date().toISOString().slice(11, 19)}] [CORE] Ledger event: EVENT_${currentWorkflow.id.toUpperCase()}
[${new Date().toISOString().slice(11, 19)}] [AI] Model verification: 99.8% match
[${new Date().toISOString().slice(11, 19)}] [STATUS] Double-entry balanced: OK
[${new Date().toISOString().slice(11, 19)}] [ACTION] Awaiting zero-touch lock.`}
                    </code>
                  </pre>
                </div>

                <div className="sim-box action-box">
                  <div className="action-row">
                    <div>
                      <p className="action-heading">Deploy this workflow into your ERP</p>
                      <p className="action-sub">Available as turn-key module or custom API microservice.</p>
                    </div>
                    <a href="#contact" className="btn btn-ghost sim-cta">
                      Request Blueprint
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
