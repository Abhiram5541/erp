import { useState } from 'react';
import { SITE } from '../content';

const EMPTY = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  message: '',
  consult: true,
  website: '',
};

const REQUIRED = ['name', 'email', 'service', 'message'];
const SERVICES = [
  'Enterprise ERP Systems',
  'Custom Business Software',
  'Enterprise Web & Portals',
  'Real-Time Data & BI',
  'AI & Autonomous Workflows',
  'Full Enterprise Modernization',
];
const BUDGETS = ['Under $25k', '$25k – $75k', '$75k – $200k', '$200k+'];

function check(k, v) {
  if (REQUIRED.includes(k) && !String(v).trim()) return 'Required field';
  if (k === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid corporate email';
  return '';
}

function EnquiryForm() {
  const [data, setData] = useState(EMPTY);
  const [errs, setErrs] = useState({});
  const [status, setStatus] = useState('');

  const set = k => e => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData(d => ({ ...d, [k]: v }));
    if (errs[k]) setErrs(x => ({ ...x, [k]: check(k, v) }));
  };

  const blur = k => () => setErrs(x => ({ ...x, [k]: check(k, data[k]) }));
  const a11y = k => ({
    'aria-invalid': errs[k] ? true : undefined,
    'aria-describedby': errs[k] ? `err-${k}` : undefined,
  });
  const Err = ({ k }) => <span className="err" id={`err-${k}`}>{errs[k]}</span>;

  const field = (k, label, props = {}) => (
    <label className="form-field-label">
      {label}
      <input
        name={k}
        value={data[k]}
        onChange={set(k)}
        onBlur={blur(k)}
        {...a11y(k)}
        {...props}
      />
      <Err k={k} />
    </label>
  );

  async function submit(e) {
    e.preventDefault();
    const next = Object.fromEntries(Object.keys(EMPTY).map(k => [k, check(k, data[k])]));
    setErrs(next);
    const bad = Object.keys(next).find(k => next[k]);
    if (bad) {
      e.currentTarget.elements[bad]?.focus();
      setStatus('Please complete the highlighted required fields.');
      return;
    }
    if (data.website) {
      // Honeypot
      setStatus('Thanks! We have received your inquiry.');
      setData(EMPTY);
      return;
    }

    if (!SITE.formEndpoint) {
      setStatus('✓ Inquiry received. An ERPsol Principal Architect will contact you within one business day.');
      setData(EMPTY);
      return;
    }

    setStatus('Sending your inquiry…');
    try {
      const r = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, website: undefined }),
      });
      if (!r.ok) throw new Error(r.status);
      setStatus('✓ Inquiry received. An ERPsol Principal Architect will contact you within one business day.');
      setData(EMPTY);
    } catch {
      setStatus('Something went wrong. Please email us directly at ' + SITE.email);
    }
  }

  return (
    <form className="enquiry rv" id="enquiry" noValidate onSubmit={submit} style={{ '--d': 1 }}>
      <div className="form-grid">
        {field('name', 'Full Name *', { autoComplete: 'name', required: true, placeholder: 'e.g. Elena Rostova' })}
        {field('company', 'Enterprise / Organization', { autoComplete: 'organization', placeholder: 'e.g. Apex Dynamics Corp' })}
        {field('email', 'Work Email *', { type: 'email', autoComplete: 'email', required: true, placeholder: 'name@company.com' })}
        {field('phone', 'Direct Phone', { type: 'tel', autoComplete: 'tel', placeholder: '+1 (555) 019-2831' })}

        <label className="form-field-label">
          Primary Requirement *
          <select name="service" required value={data.service} onChange={set('service')} onBlur={blur('service')} {...a11y('service')}>
            <option value="">Select an operational focus</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <Err k="service" />
        </label>

        <label className="form-field-label">
          Target Investment Scope
          <select name="budget" value={data.budget} onChange={set('budget')}>
            <option value="">Select scope tier</option>
            {BUDGETS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="err" />
        </label>

        <label className="form-field-label full">
          Operational Challenge &amp; Current Stack *
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Describe your current systems (e.g. spreadsheets, SAP, custom DB), transaction volumes, and key pain points..."
            value={data.message}
            onChange={set('message')}
            onBlur={blur('message')}
            {...a11y('message')}
          />
          <Err k="message" />
        </label>

        <label className="hp" aria-hidden="true" style={{ display: 'none' }}>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={set('website')} />
        </label>

        <label className="check-label full">
          <input type="checkbox" name="consult" checked={data.consult} onChange={set('consult')} />
          <span>I would like a free 30-minute system architecture and scoping call with a Principal Architect</span>
        </label>

        <div className="form-submit-row full">
          <button type="submit" className="btn btn-primary btn-lg">
            <span>Send Scoping Request</span>
            <span className="arr">→</span>
          </button>
          {status && <p className="status-msg" role="status" aria-live="polite">{status}</p>}
        </div>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <section className="section rule" id="contact">
      <div className="wrap contact-wrap">
        <div className="contact-info-col">
          <p className="eyebrow rv">Direct Advisory Channel</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Let’s architect the system that scales your business</h2>
          <p className="lede rv" style={{ '--d': 2 }}>
            Tell us where the operational friction is. We reply within one business day with an initial architecture breakdown and a dedicated time for a technical scoping call.
          </p>

          <div className="contact-direct-cards rv" style={{ '--d': 3 }}>
            <div className="direct-card spot">
              <span className="direct-tag">NEW ENGAGEMENTS</span>
              <a href={`mailto:${SITE.email}`} className="direct-link">
                <strong>{SITE.email}</strong>
              </a>
              <p className="direct-sub">Reviewed directly by Senior Engineering Partners</p>
            </div>

            <div className="direct-card spot">
              <span className="direct-tag">TECHNICAL DESK</span>
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`} className="direct-link">
                <strong>{SITE.phone}</strong>
              </a>
              <p className="direct-sub">Monday – Friday · 8am – 7pm EST</p>
            </div>
          </div>

          <div className="nda-note rv" style={{ '--d': 4 }}>
            <span className="nda-shield">🛡️</span>
            <span>Standard Mutual NDA available prior to technical discovery</span>
          </div>
        </div>

        <EnquiryForm />
      </div>
    </section>
  );
}
