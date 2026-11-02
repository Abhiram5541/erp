// Small, dependency-free motion layer: scroll reveals, count-ups, pointer spotlight,
// hero dashboard tilt, nav scroll-spy and process progress. Everything degrades to static content.
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
let REDUCED = false; // set in initFx (module is also imported during build-time prerender, where matchMedia doesn't exist)

function countUp(el) {
  const n = +el.dataset.count, unit = el.dataset.unit || '', dec = n % 1 ? 1 : 0, t0 = performance.now(), dur = REDUCED ? 0 : 1400;
  const fmt = v => {
    const s = v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (unit === '$') return v >= 1e6 ? `$${(v / 1e6).toFixed(2)}M` : v >= 1e3 ? `$${Math.round(v / 1e3)}K` : `$${s}`;
    if (unit === '%') return `${s}%`;
    return unit ? `${s}<small>${unit}</small>` : s;
  };
  const step = now => {
    const p = dur ? Math.min(1, (now - t0) / dur) : 1, e = 1 - Math.pow(1 - p, 3);
    el.innerHTML = fmt(n * e);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function initFx() {
  const off = [];
  REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // reveals (+ count-ups inside revealed blocks, + process line)
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add('in');
    io.unobserve(el);
    $$('[data-count]', el).forEach(countUp);
    if (el.matches('[data-count]')) countUp(el);
  }), { rootMargin: '0px 0px -10% 0px', threshold: .12 });
  $$('.rv, .dash').forEach(el => io.observe(el));
  off.push(() => io.disconnect());

  // process timeline fills when the list enters
  const steps = document.getElementById('steps');
  if (steps) {
    const so = new IntersectionObserver(([e]) => { if (e.isIntersecting) { steps.classList.add('in'); steps.style.setProperty('--p', 1); so.disconnect(); } }, { threshold: .4 });
    so.observe(steps); off.push(() => so.disconnect());
  }

  // hero dashboard flattens as you scroll (perspective tilt 18deg -> 0)
  const dash = document.getElementById('dash');
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      if (!dash || REDUCED) return;
      const r = dash.getBoundingClientRect(), p = Math.min(1, Math.max(0, 1 - (r.top - innerHeight * .2) / (innerHeight * .7)));
      dash.style.setProperty('--tilt', `${18 * (1 - p)}deg`);
      dash.style.setProperty('--sc', `${.96 + .04 * p}`);
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  off.push(() => removeEventListener('scroll', onScroll));

  // nav scroll-spy
  const links = $$('[data-nav]'), spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.dataset.nav === e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = document.getElementById(a.dataset.nav); if (s) spy.observe(s); });
  off.push(() => spy.disconnect());

  // pointer spotlight on cards (fine pointers only)
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const move = e => {
      const c = e.target.closest?.('.spot'); if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`); c.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', move, { passive: true });
    off.push(() => document.removeEventListener('pointermove', move));
  }
  return () => off.forEach(f => f());
}
