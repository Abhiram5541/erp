import { useEffect, useRef, useState } from 'react';
import { SITE } from '../content';

const pad = n => String(n).padStart(2, '0');

/* ---------- line-art illustrations (isometric, thin strokes, one ember element) ---------- */
const iso = (x, y, w, d) => `M${x},${y} l${w},${-w / 2} l${d},${d / 2} l${-w},${w / 2} Z`; // rhombus "plate"
const ART = {
  erp: (
    <svg viewBox="0 0 240 170">
      {[0, 1, 2, 3].map(i => <g key={i} className={i === 1 ? 'float' : ''} style={{ transitionDelay: `${i * 60}ms` }}>
        <path className={i === 1 ? 'ac fl' : 'ln'} d={iso(60, 118 - i * 22, 60, 60)} />
        <path className="ln" d={`M60,${118 - i * 22} v8 l60,30 l60,-30 v-8`} />
      </g>)}
      <circle className="dot pulse" cx="120" cy="80" r="3" />
    </svg>
  ),
  software: (
    <svg viewBox="0 0 240 170">
      <path className="ln" d="M70 40 l-30 45 l30 45 M170 40 l30 45 l-30 45" />
      <g className="float"><rect className="ac fl" x="92" y="58" width="56" height="54" rx="8" /><path className="ac" d="M106 85 h28 M120 71 v28" /></g>
      {[[62, 85], [178, 85], [120, 30], [120, 140]].map(([x, y], i) => <circle key={i} className={i === 2 ? 'dot pulse' : 'ln'} cx={x} cy={y} r="4" />)}
      <path className="ln" d="M120 34 v24 M120 112 v24" strokeDasharray="3 4" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 240 170">
      <path className="ln" d="M40 120 l80 -40 l80 40 l-80 40 Z" />
      <g className="float"><path className="ln" d="M60 92 v-48 l60 -30 v48 Z" /><path className="ac fl" d="M120 62 v-48 l60 30 v48 Z" />
        <path className="ac" d="M132 34 l36 18 M132 46 l24 12 M132 58 l30 15" /></g>
      <circle className="dot pulse" cx="72" cy="56" r="3" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 240 170">
      <path className="ln" d="M30 125 l90 -45 l90 45 l-90 45 Z" />
      {[[70, 30], [100, 55], [130, 40], [160, 75]].map(([x, h], i) => <g key={i} className={i === 3 ? 'float' : ''}>
        <path className={i === 3 ? 'ac fl' : 'ln'} d={`M${x} ${118 - (x - 70) * .1} v${-h} l14 -7 l14 7 v${h} l-14 7 Z`} />
      </g>)}
      <path className="ac" d="M60 70 Q 110 30 190 40" strokeDasharray="4 5" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 240 170">
      {[[120, 85], [60, 50], [180, 50], [60, 125], [180, 125], [120, 30], [120, 145]].map(([x, y], i, a) => i && <path key={i} className="ln" d={`M${a[0][0]} ${a[0][1]} L${x} ${y}`} />)}
      {[[60, 50], [180, 50], [60, 125], [180, 125], [120, 30], [120, 145]].map(([x, y], i) => <circle key={i} className="ln" cx={x} cy={y} r="6" />)}
      <g className="float"><circle className="ac fl" cx="120" cy="85" r="22" /><path className="ac" d="M120 73 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3 Z" /></g>
      <circle className="dot pulse" cx="180" cy="50" r="3" />
    </svg>
  ),
};

export function Logos() {
  const t = SITE.tech.map(x => <span key={x}>{x}</span>);
  return (
    <div className="logos">
      <div className="wrap"><p className="rv">Built with the platforms your business already trusts</p></div>
      <div className="marquee rv" aria-label={`Technologies: ${SITE.tech.join(', ')}`}><div className="mtrack" aria-hidden="true">{t}{t}</div></div>
    </div>
  );
}

export function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">Services</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Five capabilities. One accountable team.</h2>
          <p className="lede rv" style={{ '--d': 2 }}>Start with the system you need most. Everything we build connects, so adding the next piece never means starting over.</p>
        </div>
        <div className="svc-grid">
          {SITE.services.map((s, i) => (
            <article key={s.id} className={`svc spot rv${i > 2 ? ' wide' : ''}`} style={{ '--d': i % 3 }}>
              <div className="art" aria-hidden="true">{ART[s.id]}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul>{s.points.map(p => <li key={p}>{p}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- numbered platform walkthrough ---------- */
function ModulePane({ m, on }) {
  const rows = {
    finance: [['INV-2291', 'Matched', '$4,120'], ['INV-2290', 'Matched', '$910'], ['INV-2289', 'Review', '$12,400']],
    inventory: [['SKU-118 Steel brackets', 'Reorder', '42 left'], ['SKU-204 Fasteners', 'OK', '1,840'], ['SKU-310 Panels', 'OK', '615']],
    sales: [['Quote Q-771', 'Sent', '$38,000'], ['Order SO-10482', 'Won', '$18,240'], ['Quote Q-769', 'Negotiating', '$64,500']],
    people: [['Leave · J. Rivera', 'Pending', '3 days'], ['Timesheet · Week 42', 'Approved', '38h'], ['Expense · Travel', 'Pending', '$310']],
    insights: [['Margin dip · Product line B', 'Anomaly', '−4.2pt'], ['Late supplier · Kestrel', 'Anomaly', '+6 days'], ['Weekly report', 'Drafted', 'Ready']],
  }[m.kind];
  return (
    <div className={`mod-pane${on ? ' on' : ''}`} aria-hidden={!on}>
      <div className="kpi"><p>{m.kpi[0]}</p><b>{m.kpi[1]}</b></div>
      <div className="card-p">
        <h5>{m.title} <span>Live</span></h5>
        <table className="orders"><tbody>{rows.map(([a, b, c]) => <tr key={a}><td style={{ fontFamily: 'inherit', fontSize: 13 }}>{a}</td><td><span className={`st ${/Review|Reorder|Pending|Anomaly|Negotiating/.test(b) ? 'wait' : /Sent|Drafted/.test(b) ? 'ship' : 'paid'}`}>{b}</span></td><td style={{ textAlign: 'right' }}>{c}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}

export function Platform() {
  const [active, setActive] = useState(0), list = useRef(null);
  // scroll-spy: the step crossing the middle of the viewport becomes active
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(+e.target.dataset.step)), { rootMargin: '-45% 0px -45% 0px' });
    list.current.querySelectorAll('.mod-step').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section className="section rule" id="platform">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">The platform</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>One connected system for the whole business</h2>
          <p className="lede rv" style={{ '--d': 2 }}>A typical ERPsol build brings every department onto the same data. Scroll through what that covers.</p>
        </div>
        <div className="modules">
          <div className="mod-visual rv">
            <div className="mod-screen" aria-label={`${SITE.modules[active].title} module preview`} role="img">
              <div className="chrome" aria-hidden="true"><i /><i /><i /><span className="url">erp.yourcompany.com / {SITE.modules[active].kind}</span></div>
              {SITE.modules.map((m, i) => <ModulePane key={m.kind} m={m} on={i === active} />)}
            </div>
          </div>
          <ol className="mod-steps" style={{ listStyle: 'none' }} ref={list}>
            {SITE.modules.map((m, i) => (
              <li key={m.kind} className={`mod-step${i === active ? ' on' : ''}`} data-step={i}>
                <span className="n">{pad(i + 1)}</span><h3>{m.title}</h3><p>{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Outcomes() {
  const [o1, ...rest] = SITE.outcomes;
  return (
    <section className="section rule" id="outcomes">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">Outcomes</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Measured by what changes, not what ships</h2>
        </div>
        <div className="bento">
          <article className="spot b1 rv"><p className="big grad">Less copy-paste.<br />More running the business.</p><div><h3>{o1[0]}</h3><p>{o1[1]}</p></div></article>
          {rest.map(([t, d], i) => <article key={t} className={`spot b${i + 2} rv`} style={{ '--d': (i % 2) + 1 }}><h3>{t}</h3><p>{d}</p></article>)}
        </div>
        <div className="stats rv">{SITE.stats.map(([n, s, l]) => <div className="stat" key={l}><b data-count={n} data-unit={s}>0<small>{s}</small></b><p>{l}</p></div>)}</div>
      </div>
    </section>
  );
}

export function Audience() {
  const [tab, setTab] = useState(0), a = SITE.audience[tab];
  const onKey = e => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const n = (tab + d + SITE.audience.length) % SITE.audience.length;
    setTab(n); e.currentTarget.querySelectorAll('button')[n].focus();
  };
  return (
    <section className="section rule" id="who">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">Who we work with</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Built for every stage of growth</h2>
        </div>
        <div className="tabs rv" role="tablist" aria-label="Who we work with" onKeyDown={onKey}>
          {SITE.audience.map((x, i) => <button key={x.key} role="tab" id={`tab-${x.key}`} aria-selected={i === tab} aria-controls="aud-panel" tabIndex={i === tab ? 0 : -1} onClick={() => setTab(i)}>{x.label}</button>)}
        </div>
        <div className="tab-panel fade-swap" key={a.key} id="aud-panel" role="tabpanel" aria-labelledby={`tab-${a.key}`}>
          <div className="spot"><h3>{a.title}</h3><p>{a.body}</p></div>
          <div className="spot"><ul>{a.points.map(p => <li key={p}>{p}</li>)}</ul></div>
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section className="section rule" id="work">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">Selected work</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Problems solved, results shipped</h2>
        </div>
        <div className="cases">
          {SITE.cases.map((c, i) => (
            <article key={c.title} className="case spot rv" style={{ '--d': i }}>
              <p className="tag">{c.tag}</p><h3>{c.title}</h3>
              <dl><div><dt>Challenge</dt><dd>{c.problem}</dd></div><div><dt>Solution</dt><dd>{c.solution}</dd></div></dl>
              <div className="outs">{c.outs.map(([b, l]) => <div key={l}><b>{b}</b><span>{l}</span></div>)}</div>
            </article>
          ))}
        </div>
        <p className="sample">Sample projects shown for illustration.</p>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section rule" id="process">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">How we work</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>A clear path from idea to impact</h2>
          <p className="lede rv" style={{ '--d': 2 }}>Milestone-driven and transparent, so you always know what is being built, why, and when it lands.</p>
        </div>
        <ol className="steps" id="steps">
          {SITE.steps.map(([t, d, dur], i) => <li key={t} className="rv" style={{ '--d': i, '--i': i }}><span className="dot">{pad(i + 1)}</span><h3>{t}</h3><p>{d}</p><em>{dur}</em></li>)}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section rule" id="about">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">About ERPsol</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>A technology partner, not a vendor</h2>
        </div>
        <div className="about">
          <div className="spot rv"><h3>Mission</h3><p className="big">Give every organisation software that fits the way it operates: reliable, connected, and built to remove manual work rather than add to it.</p></div>
          <div className="spot rv" style={{ '--d': 1 }}><h3>Vision</h3><p className="big">Be the long-term partner growing businesses trust to modernise their operations, from the first system they digitise to the data and AI that drive their next decade.</p></div>
        </div>
        <div className="vals">{SITE.values.map(([t, d], i) => <div key={t} className="spot rv" style={{ '--d': i }}><b>{t}</b><p>{d}</p></div>)}</div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="section tight">
      <div className="wrap">
        <div className="cta-band rv">
          <h2 className="grad">Ready to run on one system?</h2>
          <p className="lede" style={{ margin: '16px auto 0', textAlign: 'center' }}>Tell us where the friction is. We'll show you what an ERPsol build would change, in a free 30-minute call.</p>
          <div className="ctas"><a href="#contact" className="btn btn-primary">Book a free consultation <span className="arr">→</span></a><a href={`mailto:${SITE.email}`} className="btn btn-ghost">Email us</a></div>
        </div>
      </div>
    </section>
  );
}
