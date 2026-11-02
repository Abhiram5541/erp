// Original line illustrations used across the redesign.
export const Mark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
    <rect x="3" y="5" width="26" height="5" rx="2.5" fill="#f3efe7" /><rect x="3" y="13.5" width="26" height="5" rx="2.5" fill="#c9a36b" /><rect x="3" y="22" width="26" height="5" rx="2.5" fill="#6c5f51" />
  </svg>
);

// journey arch illustrations
export const JourneyArt = ({ k }) => {
  const a = {
    discover: <><circle className="ln" cx="90" cy="80" r="38" /><path className="lg" d="M118 108 l34 34" /><rect className="ln" x="60" y="70" width="16" height="30" /><rect className="ln" x="82" y="56" width="16" height="44" /><rect className="fg" x="104" y="76" width="16" height="24" /></>,
    design: <><rect className="ln" x="30" y="30" width="140" height="100" rx="8" /><path className="ln" d="M30 52h140M70 52v78" /><rect className="fg" x="84" y="64" width="72" height="26" rx="4" /><path className="lg" d="M84 104h50M84 116h30" /></>,
    build: <>{[0, 1, 2, 3].map(i => <rect key={i} className={i === 3 ? 'fg' : 'ln'} x={36 + i * 34} y={130 - (i + 1) * 24} width="24" height={(i + 1) * 24} rx="4" />)}<path className="lg" d="M40 96 L84 74 L118 60 L160 30" strokeDasharray="5 6" /></>,
    launch: <><path className="ln" d="M100 30 c22 18 30 46 22 76 h-44 c-8 -30 0 -58 22 -76z" /><circle className="lg" cx="100" cy="66" r="10" /><path className="fg" d="M80 110 l-14 24 l24 -10z M120 110 l14 24 l-24 -10z" /><path className="lg" d="M92 118 q8 26 16 0" /></>,
    support: <><path className="ln" d="M30 120 C 60 120, 70 60, 100 70 S 150 40, 170 36" /><path className="lg" d="M30 120 C 60 120, 70 60, 100 70 S 150 40, 170 36" strokeDasharray="1 0" opacity=".9" /><circle className="fo" cx="100" cy="70" r="5" /><rect className="ln" x="40" y="132" width="130" height="10" rx="5" /><rect className="fg" x="40" y="132" width="96" height="10" rx="5" /></>,
  };
  return <svg viewBox="0 0 200 160" aria-hidden="true">{a[k]}</svg>;
};

// service card fronts (dark UI vignettes)
export const ServiceArt = ({ id }) => {
  const s = {
    erp: <><rect x="10" y="10" width="200" height="120" rx="10" fill="#241e18" />{[0, 1, 2].map(i => <rect key={i} x={20 + i * 64} y="22" width="56" height="30" rx="6" fill="#2f2720" />)}<rect x="28" y="30" width="22" height="5" rx="2.5" fill="#c9a36b" /><path d="M24 112 C 60 100, 80 70, 120 78 S 170 50, 200 46" fill="none" stroke="#c9a36b" strokeWidth="2" /><rect x="20" y="64" width="90" height="6" rx="3" fill="rgba(243,239,231,.18)" /></>,
    software: <><rect x="10" y="10" width="200" height="120" rx="10" fill="#241e18" />{[0, 1, 2, 3, 4].map(i => <rect key={i} x={24 + (i % 2) * 12} y={26 + i * 16} width={60 + (i * 23) % 80} height="6" rx="3" fill={i === 2 ? '#c9a36b' : 'rgba(243,239,231,.25)'} />)}<rect x="150" y="26" width="46" height="46" rx="8" fill="none" stroke="#c9a36b" /><path d="M166 49h14M173 42v14" stroke="#c9a36b" strokeWidth="2" /></>,
    web: <><rect x="10" y="10" width="200" height="120" rx="10" fill="#f3efe7" /><rect x="10" y="10" width="200" height="16" rx="8" fill="#e4dccf" /><text x="22" y="56" fontSize="18" fontWeight="600" fill="#171a18" fontFamily="Inter Tight">Grow faster</text><rect x="22" y="66" width="90" height="5" rx="2.5" fill="#b9b0a3" /><rect x="22" y="82" width="54" height="16" rx="8" fill="#12100e" />{[0, 1, 2].map(i => <rect key={i} x={130 + i * 22} y={110 - (i + 1) * 18} width="14" height={(i + 1) * 18} rx="3" fill={i === 2 ? '#b38a50' : '#cfc4b3'} />)}</>,
    data: <><rect x="10" y="10" width="200" height="120" rx="10" fill="#241e18" />{[...Array(9)].map((_, i) => <rect key={i} x={24 + i * 14} y={118 - (18 + (i * 29) % 60)} width="9" height={18 + (i * 29) % 60} rx="2" fill={i === 8 ? '#e2843f' : '#5a4e42'} />)}<circle cx="172" cy="64" r="24" fill="none" stroke="#3a3128" strokeWidth="9" /><circle cx="172" cy="64" r="24" fill="none" stroke="#c9a36b" strokeWidth="9" strokeDasharray="100 151" transform="rotate(-90 172 64)" /></>,
    ai: <><rect x="10" y="10" width="200" height="120" rx="10" fill="#241e18" />{[[40, 40], [40, 100], [110, 70], [180, 40], [180, 100]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 2 ? 16 : 9} fill={i === 2 ? '#c9a36b' : '#2f2720'} stroke="rgba(243,239,231,.2)" />)}<path d="M49 44 L96 66 M49 96 L96 74 M126 66 L171 44 M126 74 L171 96" stroke="#c9a36b" strokeWidth="1.4" strokeDasharray="4 4" /></>,
  };
  return <svg viewBox="0 0 220 140" aria-hidden="true">{s[id]}</svg>;
};

// platform module card marks: one glyph per module, in module order
const MOD_GLYPH = [
  <g key="0"><rect x="3" y="4" width="26" height="24" rx="4" /><path d="M3 12h26M12 12v16" /></g>,
  <g key="1"><path d="M16 3l12 6v14l-12 6-12-6V9z" /><path d="M4 9l12 6 12-6M16 15v14" /></g>,
  <g key="2"><path d="M4 6h4l3 14h14l3-10H10" /><circle cx="13" cy="26" r="2" /><circle cx="23" cy="26" r="2" /></g>,
  <g key="3"><circle cx="12" cy="11" r="5" /><path d="M3 28c1-6 5-9 9-9s8 3 9 9" /><circle cx="23" cy="9" r="3.5" /><path d="M22 17c4 0 6.5 3 7 7" /></g>,
  <g key="4"><path d="M4 26l7-8 6 5 11-14" /><path d="M21 9h7v7" /></g>,
];
export const ModuleMark = ({ i, name }) => (
  <div className="mod-mark"><svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{MOD_GLYPH[i]}</svg><span>{name}</span></div>
);
