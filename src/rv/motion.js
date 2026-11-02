// Motion layer for the editorial redesign. One rAF loop driven by Lenis smooth scroll:
// reveals, scroll-lit words, pinned horizontal journey, stacking testimonial deck, "Meet" word slide.
import Lenis from 'lenis';

const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function initMotion() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  const off = [];

  // smooth scroll (native scroll stays the source of truth, so anchors, focus and restore keep working)
  const lenis = reduced ? null : new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  window.__lenis = lenis;
  if (lenis) {
    const onLink = e => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const id = a.getAttribute('href'); if (id.length < 2 || !document.querySelector(id)) return;
      e.preventDefault(); lenis.scrollTo(id, { offset: id === '#top' ? 0 : -70, duration: 1.4 }); history.replaceState(null, '', id === '#top' ? location.pathname : id);
    };
    document.addEventListener('click', onLink); off.push(() => document.removeEventListener('click', onLink), () => lenis.destroy());
  }

  // reveals
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .1 });
  $$('.rv').forEach(el => io.observe(el)); off.push(() => io.disconnect());

  // nav scroll-spy
  const links = $$('[data-nav]');
  const spy = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && links.forEach(a => a.classList.toggle('active', a.dataset.nav === e.target.id))), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = document.getElementById(a.dataset.nav); s && spy.observe(s); }); off.push(() => spy.disconnect());

  const lits = $$('[data-lit]').map(el => ({ el, words: $$('.w', el) }));
  const journey = document.querySelector('[data-journey]');
  const jTrack = journey?.querySelector('.j-track'), jCards = journey ? $$('.jcard', journey) : [], jSteps = journey ? $$('.stepper div', journey) : [], stepper = journey?.querySelector('.stepper');
  const meet = document.querySelector('[data-meet]'), meetW = meet ? $$('[data-mw]', meet) : [];
  const deck = $$('[data-deck]');
  let jActive = -1;

  function frame() {
    const vh = innerHeight;
    // words light up as their block crosses the viewport
    lits.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect(), p = reduced ? 1 : clamp((vh * .85 - r.top) / (r.height + vh * .35));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    });
    // journey: section height gives the scroll distance; the sticky stage translates the track horizontally
    if (journey && jTrack) {
      const r = journey.getBoundingClientRect(), total = r.height - vh, p = clamp(-r.top / (total || 1));
      const max = jTrack.scrollWidth - innerWidth + parseFloat(getComputedStyle(jTrack).paddingLeft) * 2;
      jTrack.style.transform = `translate3d(${-p * Math.max(0, max)}px,0,0)`;
      stepper?.style.setProperty('--jp', p.toFixed(3));
      const a = Math.min(jCards.length - 1, Math.round(p * (jCards.length - 1)));
      if (a !== jActive) { jActive = a; jCards.forEach((c, i) => c.classList.toggle('on', i === a)); jSteps.forEach((s, i) => s.classList.toggle('on', i <= a)); }
    }
    // testimonial deck: earlier cards shrink and dim as the next one stacks on top
    deck.forEach((c, i) => {
      const next = deck[i + 1]; if (!next) return;
      const p = clamp(1 - (next.getBoundingClientRect().top - c.getBoundingClientRect().top) / (vh * .5));
      c.style.transform = `scale(${1 - p * .06})`; c.style.filter = `brightness(${1 - p * .15})`;
    });
    // "Meet ERPsol": words slide apart as the arch scrolls through
    if (meet && !reduced) {
      const r = meet.getBoundingClientRect(), p = clamp((vh - r.top) / (vh + r.height)) - .5;
      meetW.forEach(w => { w.style.transform = `translate3d(${+w.dataset.mw * p * 38}vw,-50%,0)`; });
    }
  }

  let raf = 0;
  const loop = t => { lenis?.raf(t); frame(); raf = requestAnimationFrame(loop); };
  raf = requestAnimationFrame(loop);
  off.push(() => cancelAnimationFrame(raf));

  // restore #hash on load (after layout)
  if (location.hash) { const t = document.querySelector(location.hash); if (t) setTimeout(() => (lenis ? lenis.scrollTo(t, { immediate: true, offset: -70 }) : t.scrollIntoView()), 60); }
  return () => off.forEach(f => f());
}
