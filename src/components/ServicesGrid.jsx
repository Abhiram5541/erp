import { SITE } from '../content';

const iso = (x, y, w, d) => `M${x},${y} l${w},${-w / 2} l${d},${d / 2} l${-w},${w / 2} Z`;

const ART = {
  erp: (
    <svg viewBox="0 0 240 170" aria-hidden="true">
      {[0, 1, 2, 3].map(i => (
        <g key={i} className={i === 1 ? 'float' : ''}>
          <path className={i === 1 ? 'ac fl' : 'ln'} d={iso(60, 118 - i * 22, 60, 60)} />
          <path className="ln" d={`M60,${118 - i * 22} v8 l60,30 l60,-30 v-8`} />
        </g>
      ))}
      <circle className="dot pulse" cx="120" cy="80" r="4" />
    </svg>
  ),
  software: (
    <svg viewBox="0 0 240 170" aria-hidden="true">
      <path className="ln" d="M70 40 l-30 45 l30 45 M170 40 l30 45 l-30 45" />
      <g className="float">
        <rect className="ac fl" x="92" y="58" width="56" height="54" rx="8" />
        <path className="ac" d="M106 85 h28 M120 71 v28" />
      </g>
      {[[62, 85], [178, 85], [120, 30], [120, 140]].map(([x, y], i) => (
        <circle key={i} className={i === 2 ? 'dot pulse' : 'ln'} cx={x} cy={y} r="4" />
      ))}
      <path className="ln" d="M120 34 v24 M120 112 v24" strokeDasharray="3 4" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 240 170" aria-hidden="true">
      <path className="ln" d="M40 120 l80 -40 l80 40 l-80 40 Z" />
      <g className="float">
        <path className="ln" d="M60 92 v-48 l60 -30 v48 Z" />
        <path className="ac fl" d="M120 62 v-48 l60 30 v48 Z" />
        <path className="ac" d="M132 34 l36 18 M132 46 l24 12 M132 58 l30 15" />
      </g>
      <circle className="dot pulse" cx="72" cy="56" r="4" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 240 170" aria-hidden="true">
      <path className="ln" d="M30 125 l90 -45 l90 45 l-90 45 Z" />
      {[[70, 30], [100, 55], [130, 40], [160, 75]].map(([x, h], i) => (
        <g key={i} className={i === 3 ? 'float' : ''}>
          <path className={i === 3 ? 'ac fl' : 'ln'} d={`M${x} ${118 - (x - 70) * 0.1} v${-h} l14 -7 l14 7 v${h} l-14 7 Z`} />
        </g>
      ))}
      <path className="ac" d="M60 70 Q 110 30 190 40" strokeDasharray="4 5" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 240 170" aria-hidden="true">
      {[[120, 85], [60, 50], [180, 50], [60, 125], [180, 125], [120, 30], [120, 145]].map(([x, y], i, a) => i && (
        <path key={i} className="ln" d={`M${a[0][0]} ${a[0][1]} L${x} ${y}`} />
      ))}
      {[[60, 50], [180, 50], [60, 125], [180, 125], [120, 30], [120, 145]].map(([x, y], i) => (
        <circle key={i} className="ln" cx={x} cy={y} r="5" />
      ))}
      <g className="float">
        <circle className="ac fl" cx="120" cy="85" r="22" />
        <path className="ac" d="M120 73 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3 Z" />
      </g>
      <circle className="dot pulse" cx="180" cy="50" r="4" />
    </svg>
  ),
};

export function ServicesGrid() {
  return (
    <section className="section rule" id="services">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow rv">Core Capabilities · Linear Riff</p>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Five interconnected pillars. Zero technical silos.</h2>
          <p className="lede rv" style={{ '--d': 2 }}>
            Every component is built on a shared event bus and unified database schema, ensuring your data model never fragments as your business scales.
          </p>
        </div>

        <div className="svc-grid">
          {SITE.services.map((s, i) => (
            <article key={s.id} className={`svc spot rv ${i > 2 ? 'wide' : ''}`} style={{ '--d': i % 3 }}>
              <div className="svc-top-row">
                <span className="svc-eyebrow">{s.eyebrow}</span>
                <span className="svc-metric-pill">{s.metrics[0]}</span>
              </div>
              <div className="art">{ART[s.id]}</div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-body">{s.body}</p>
              <ul className="svc-points">
                {s.points.map(p => (
                  <li key={p}>
                    <span className="bullet-arrow">→</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="svc-footer">
                <span className="svc-tag">{s.metrics[1]}</span>
                <a href="#contact" className="svc-link">Consult architecture →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
