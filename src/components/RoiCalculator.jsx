import { useState } from 'react';

export function RoiCalculator() {
  const [employees, setEmployees] = useState(65);
  const [transactions, setTransactions] = useState(1800);
  const [manualHoursWeekly, setManualHoursWeekly] = useState(48);

  // Dynamic Calculations
  // Average hourly cost loaded: $55/hr
  const monthlyManualHours = manualHoursWeekly * 4.33;
  const hoursSavedMonthly = Math.round(monthlyManualHours * 0.76); // 76% automation rate
  const annualDollarsSaved = Math.round(hoursSavedMonthly * 12 * 55);

  let launchWeeks = '3–4 weeks';
  if (employees > 300 || transactions > 8000) {
    launchWeeks = '8–10 weeks';
  } else if (employees > 100 || transactions > 3000) {
    launchWeeks = '5–7 weeks';
  }

  const handlePreFillContact = () => {
    const contactForm = document.getElementById('contact');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      const textarea = contactForm.querySelector('textarea[name="message"]');
      if (textarea) {
        textarea.value = `Estimated Profile: ${employees} team members, ~${transactions.toLocaleString()} monthly transactions, spending ${manualHoursWeekly}h/week on manual ops. We want to achieve the projected ~${hoursSavedMonthly}h/mo reduction.`;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <section className="section rule" id="roi-calculator">
      <div className="wrap">
        <div className="head center">
          <p className="eyebrow rv">Financial Impact Model</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Calculate your estimated ERPsol ROI & timeline</h2>
          <p className="lede rv" style={{ '--d': 2 }}>
            Stripe-style interactive financial estimator: Adjust your operational profile to calculate projected labor savings and delivery timeframe.
          </p>
        </div>

        <div className="roi-calculator-card rv" style={{ '--d': 3 }}>
          <div className="roi-grid">
            {/* Left: Interactive Input Sliders */}
            <div className="roi-inputs">
              <h3 className="roi-section-title">Your Operational Profile</h3>

              {/* Slider 1: Employees */}
              <div className="roi-control">
                <div className="roi-control-header">
                  <label htmlFor="employees-slider">Total Team / System Users</label>
                  <span className="roi-val-badge">{employees} users</span>
                </div>
                <input
                  id="employees-slider"
                  type="range"
                  min="10"
                  max="1000"
                  step="5"
                  value={employees}
                  onChange={e => setEmployees(+e.target.value)}
                  className="roi-slider"
                />
                <div className="roi-range-labels">
                  <span>10 users</span>
                  <span>500 users</span>
                  <span>1,000+ users</span>
                </div>
              </div>

              {/* Slider 2: Monthly Transactions */}
              <div className="roi-control">
                <div className="roi-control-header">
                  <label htmlFor="transactions-slider">Monthly Invoices & Orders</label>
                  <span className="roi-val-badge">{transactions.toLocaleString()} / mo</span>
                </div>
                <input
                  id="transactions-slider"
                  type="range"
                  min="200"
                  max="25000"
                  step="100"
                  value={transactions}
                  onChange={e => setTransactions(+e.target.value)}
                  className="roi-slider"
                />
                <div className="roi-range-labels">
                  <span>200</span>
                  <span>10,000</span>
                  <span>25,000+</span>
                </div>
              </div>

              {/* Slider 3: Current Manual Hours */}
              <div className="roi-control">
                <div className="roi-control-header">
                  <label htmlFor="hours-slider">Manual Hours Spent Weekly (Spreadsheets/AP)</label>
                  <span className="roi-val-badge">{manualHoursWeekly} hrs / week</span>
                </div>
                <input
                  id="hours-slider"
                  type="range"
                  min="10"
                  max="200"
                  step="2"
                  value={manualHoursWeekly}
                  onChange={e => setManualHoursWeekly(+e.target.value)}
                  className="roi-slider"
                />
                <div className="roi-range-labels">
                  <span>10 hrs</span>
                  <span>100 hrs</span>
                  <span>200+ hrs</span>
                </div>
              </div>
            </div>

            {/* Right: Calculated Yield Results */}
            <div className="roi-results-box">
              <div className="roi-results-inner">
                <span className="roi-results-tag">PROJECTED EFFICIENCY YIELD</span>

                <div className="roi-primary-metric">
                  <span className="roi-dollar-saved">${annualDollarsSaved.toLocaleString()}</span>
                  <p className="roi-dollar-sub">Projected Annual Cost Recaptured</p>
                </div>

                <div className="roi-stat-rows">
                  <div className="roi-stat-row">
                    <span className="roi-row-k">Hours Saved Monthly</span>
                    <span className="roi-row-v">~{hoursSavedMonthly.toLocaleString()} hrs / mo</span>
                  </div>
                  <div className="roi-stat-row">
                    <span className="roi-row-k">Process Automation Rate</span>
                    <span className="roi-row-v text-accent">~76% autonomous</span>
                  </div>
                  <div className="roi-stat-row">
                    <span className="roi-row-k">Est. Time to Production</span>
                    <span className="roi-row-v text-good">{launchWeeks}</span>
                  </div>
                  <div className="roi-stat-row">
                    <span className="roi-row-k">Payback Period</span>
                    <span className="roi-row-v">&lt; 3.8 months</span>
                  </div>
                </div>

                <div className="roi-action-wrap">
                  <button
                    className="btn btn-primary roi-submit-btn"
                    onClick={handlePreFillContact}
                  >
                    Lock in this architecture estimate <span className="arr">→</span>
                  </button>
                  <p className="roi-disclaimer">
                    Calculated based on standard loaded operational rate ($55/hr) across 120+ ERPsol deployments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
