import { useEffect, useRef, useState } from 'react';
import { SITE } from '../content';
import * as D from './data';
import { Mark, JourneyArt, ServiceArt, ModuleMark } from './Art';

const pad = n => String(n).padStart(2, '0');
// split text into word spans; [[...]] marks highlighted words
const Words = ({ text }) => text.split(/(\[\[.*?\]\])/).flatMap((part, i) => {
  const hl = part.startsWith('[[');
  return part.replace(/\[\[|\]\]/g, '').split(/\s+/).filter(Boolean).map((w, j) => <span key={`${i}-${j}`} className={`w${hl ? ' hl' : ''}`}>{w} </span>);
});
const Arrow = () => <span className="ar" aria-hidden="true">→</span>;
// responsive Unsplash photo; decorative unless alt is given
const Photo = ({ id, w, h, alt = '', className, eager, sizes = `${Math.round(w / 2)}px` }) => (
  <img className={className} src={D.img(id, w, h)} srcSet={`${D.img(id, Math.round(w / 2), h && Math.round(h / 2))} ${Math.round(w / 2)}w, ${D.img(id, w, h)} ${w}w`} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
);

/* ---------- nav ---------- */
const NAV = [['services', 'Services'], ['platform', 'Platform'], ['process', 'Process'], ['work', 'Work'], ['faq', 'FAQ']];
export function Nav() {
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false), menu = useRef(null), btn = useRef(null);
  useEffect(() => { const on = () => setScrolled(scrollY > 40); on(); addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on); }, []);
  useEffect(() => {
    const m = menu.current; m.inert = !open; document.body.style.overflow = open ? 'hidden' : '';
    window.__lenis?.[open ? 'stop' : 'start']();
    if (!open) return;
    m.querySelector('a')?.focus();
    const k = e => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); }
      if (e.key !== 'Tab') return;
      const f = [btn.current, ...m.querySelectorAll('a')], i = f.indexOf(document.activeElement);
      e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    };
    document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k);
  }, [open]);
  return (
    <>
      <a className="sr" href="#main" onFocus={e => e.currentTarget.classList.remove('sr')} onBlur={e => e.currentTarget.classList.add('sr')}>Skip to content</a>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="ERPsol home"><b>ERPsol</b><small>ERP · Software · AI</small></a>
          <nav aria-label="Main"><ul>{NAV.map(([id, l]) => <li key={id}><a href={`#${id}`} data-nav={id}>{l}</a></li>)}</ul></nav>
          <a href="#contact" className="pill pill-gold"><span className="dot" />Let's talk</a>
          <button ref={btn} className="menu-btn" aria-expanded={open} aria-controls="mmenu" onClick={() => setOpen(o => !o)}>{open ? 'Close' : 'Menu'}</button>
        </div>
      </header>
      <div ref={menu} id="mmenu" className={`mmenu${open ? ' open' : ''}`} aria-hidden={!open} onClick={e => e.target.closest('a') && setOpen(false)}>
        {NAV.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}
        <a href="#contact" className="pill pill-gold">Let's talk <Arrow /></a>
      </div>
    </>
  );
}

/* ---------- hero with rotating quote ---------- */
function QuoteRotator() {
  const [i, setI] = useState(0), q = D.QUOTES[i];
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % D.QUOTES.length), 6500); return () => clearInterval(t); }, []);
  return (
    <div className="quote">
      <div className="qm">“</div>
      <p key={i} className="fade-swap">{q.q}</p>
      <p className="by">{q.who} — {q.org}{q.sample && <span className="tag-sample">Sample</span>}</p>
      <div className="bar">{D.QUOTES.map((_, j) => <i key={j === i ? `on${i}` : j} className={j === i ? 'on' : ''} />)}</div>
    </div>
  );
}

export function Hero() {
  const [a, b, c] = D.HERO.title;
  return (
    <section className="hero dark" id="top">
      <div className="wrap grid">
        <div>
          <p className="eb rv"><span className="dot" />{D.HERO.eyebrow}</p>
          <p className="k2 rv" style={{ '--d': 1 }}>{D.HERO.kicker}</p>
          <h1 className="rv" style={{ '--d': 2 }}>{a}<span className="it">{b}</span>{c}</h1>
          <p className="body rv" style={{ '--d': 3 }}>{D.HERO.body}</p>
          <div className="ctas rv" style={{ '--d': 4 }}>
            <a href="#contact" className="pill pill-gold">Let's talk <Arrow /></a>
            <a href="#work" className="pill pill-ghost">See what we've built <Arrow /></a>
          </div>
          <div className="stats rv" style={{ '--d': 5 }}>{D.HERO.stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
        </div>
        <div className="hcard rv" style={{ '--d': 2 }}>
          <Photo id={D.PHOTO.hero} w={1200} h={1340} className="ph" eager alt="Three colleagues working together around a laptop" />
          <div className="shade" aria-hidden="true" />
          <div className="chips"><span className="chip"><span className="dot" style={{ color: '#e8731f' }} /><span><small>Technology partner</small>ERPsol delivery team</span></span><a href="#meet" className="chip light">Meet the team ↓</a></div>
          <QuoteRotator />
        </div>
      </div>
    </section>
  );
}

export function Intro() {
  return (
    <section className="intro dark" aria-label="Introduction">
      <div className="wrap"><p className="hello rv">{D.INTRO.hello}</p><p className="stmt rv" style={{ '--d': 1 }}>{D.INTRO.text.split(/\[\[(.*?)\]\]/).map((t, i) => (i % 2 ? <span key={i} className="hl">{t}</span> : t))}</p></div>
    </section>
  );
}

export function Marquee() {
  const items = D.TECH.flatMap((t, i) => [<span key={t}>{t}</span>, <i key={`d${i}`}>◆</i>]);
  return (
    <div className="marq">
      <div className="wrap">
        <p className="lbl">Platforms we build on — ERP, cloud, data & AI</p>
        <div className="mq" aria-label={`Technologies: ${D.TECH.join(', ')}`}><div className="mq-track" aria-hidden="true">{items}<span className="it">and the tools you already use</span><i>◆</i>{items}<span className="it">and the tools you already use</span><i>◆</i></div></div>
      </div>
    </div>
  );
}

export function Belief() {
  return (
    <section className="band cream belief" id="approach">
      <div className="wrap">
        <p className="kicker rv">How we work</p>
        <div className="qm rv">“</div>
        <p className="stmt lit" data-lit><Words text={D.BELIEF.quote} /></p>
        <div className="who rv"><Mark /> {D.BELIEF.by}</div>
        <div className="trio">{D.BELIEF.principles.map(([t, d], i) => <div key={t} className="rv" style={{ '--d': i }}><b>{pad(i + 1)}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div>
    </section>
  );
}

/* ---------- principles: list selects the feature card (hover/focus/auto) ---------- */
export function Principles() {
  const [i, setI] = useState(0), [hold, setHold] = useState(false), [t, d] = D.PRINCIPLES[i];
  useEffect(() => { if (hold) return; const id = setInterval(() => setI(x => (x + 1) % D.PRINCIPLES.length), 5000); return () => clearInterval(id); }, [hold]);
  return (
    <section className="band dark" id="principles">
      <div className="wrap">
        <div className="head">
          <div><p className="kicker rv">Our principles</p><h2 className="h2 rv" style={{ '--d': 1 }}>Rules we<br /><span className="it">won't bend.</span></h2></div>
          <p className="lead rv">Each principle comes from projects that went well, and a few that taught us the hard way. They shape every plan we write.</p>
        </div>
        <div className="ops" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <article className="op-card rv" aria-live="polite">
            <div className="qm">“</div>
            <h3 key={i} className="fade-swap">{t}</h3>
            <p key={`p${i}`} className="fade-swap">{d}</p>
            <div className="op-foot"><a href="#contact" className="pill pill-gold">Discuss your project <Arrow /></a><div className="op-dash">{D.PRINCIPLES.map((_, j) => <i key={j === i ? `on${i}` : j} className={j === i ? 'on' : ''} />)}</div></div>
          </article>
          <ul className="op-list rv" role="tablist" aria-label="Principles" style={{ '--d': 1 }}>
            {D.PRINCIPLES.map(([pt], j) => <li key={pt}><button role="tab" aria-selected={j === i} onMouseEnter={() => setI(j)} onFocus={() => setI(j)} onClick={() => setI(j)}><span>{pt}</span><span>→</span></button></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Platform() {
  const c = D.PLATFORM.card;
  return (
    <section className="band cream" id="platform">
      <div className="wrap">
        <div className="head">
          <div><p className="kicker rv">The platform</p><h2 className="h2 rv" style={{ '--d': 1 }}>Everything on<br /><span className="it">one data model.</span></h2></div>
          <p className="lead rv">Start with the module that hurts most. Everything shares one data model, so adding the next never means starting over.</p>
        </div>
        <article className="plat-card rv">
          <p className="kicker">What we build</p>
          <p className="y">{c.year}</p><h3>{c.name}</h3><p className="role">{c.role}</p>
          <ul className="tags">{c.tags.map(x => <li key={x}>{x}</li>)}</ul>
          <p>{c.body}</p>
          <a className="go" href={c.link[1]}><i />{c.link[0]} <span aria-hidden="true">↗</span></a>
        </article>
        <p className="mods-head rv"><span>Modules on the platform</span><span>{pad(D.PLATFORM.modules.length)}</span></p>
        <ul className="mods">{D.PLATFORM.modules.map(([t, d, m], i) => <li key={t} className="rv" style={{ '--d': i }}><ModuleMark i={i} name={m} /><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul>
      </div>
    </section>
  );
}

export function Show() {
  const { gauge: g, audit: a } = D.SHOW;
  return (
    <section className="band sand" id="free">
      <div className="wrap">
        <div className="head">
          <div><p className="kicker rv">Free to start · no commitment</p><h2 className="h2 rv" style={{ '--d': 1 }}>See the value<br /><span className="it">before you sign.</span></h2></div>
          <p className="lead rv">Two ways to see what ERPsol would change, before you spend anything.</p>
        </div>
        <div className="show">
          <article className="t-dark rv">
            <span className="tg">{g.tag}</span>
            <svg className="gauge" viewBox="0 0 120 70" aria-hidden="true"><path d="M10 64 A50 50 0 0 1 110 64" fill="none" stroke="rgba(243,239,231,.15)" strokeWidth="8" strokeLinecap="round" /><path className="arc" d="M10 64 A50 50 0 0 1 110 64" fill="none" stroke="#e2843f" strokeWidth="8" strokeLinecap="round" pathLength="1" /><text x="60" y="60" textAnchor="middle" fontSize="18" fill="#f3efe7" fontFamily="Inter Tight">?</text></svg>
            <h3>{g.title}</h3><p>{g.body}</p><a href="#contact" className="pill pill-gold">{g.cta} <Arrow /></a>
          </article>
          <article className="t-gold rv" style={{ '--d': 1 }}>
            <span className="tg">{a.tag}</span>
            <div className="checks">{a.checks.map((c, i) => <span key={c} style={{ '--i': i }}>{c}</span>)}</div>
            <h3>{a.title}</h3><p>{a.body}</p><a href="#contact" className="pill pill-ink">{a.cta} <Arrow /></a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Audience() {
  return (
    <section className="band dark" id="who">
      <div className="wrap">
        <p className="kicker rv">Who we help</p>
        <h2 className="aud-title rv" style={{ '--d': 1 }}>Built for teams<br /><span className="it">at every stage.</span></h2>
        <div className="rows">{D.AUDIENCE.map(([t, d], i) => <a key={t} href="#contact" className="row rv" style={{ '--d': i }}><b>{pad(i + 1)}</b><strong>{t}</strong><span>{d}</span><em aria-hidden="true">↗</em></a>)}</div>
        <div className="aud-foot rv"><p>{D.AUDIENCE_FIT}</p><a href="#contact" className="pill pill-ghost">Book a free consultation <Arrow /></a></div>
      </div>
      <div className="slant" aria-hidden="true" />
    </section>
  );
}

/* ---------- journey: sticky stage, horizontal track driven by scroll (motion.js) ---------- */
export function Journey() {
  return (
    <section className="cream journey" id="process" data-journey style={{ height: `${D.JOURNEY.length * 85 + 40}vh` }}>
      <div className="j-pin">
        <div className="wrap j-top">
          <div><p className="kicker">How the work runs</p><h2 className="h2">From first call to <span className="it">go-live.</span></h2></div>
          <div className="stepper" aria-hidden="true">{D.JOURNEY.map((s, i) => <div key={s.k} className={i ? '' : 'on'}><i />{s.k}</div>)}</div>
        </div>
        <div className="j-track">
          {D.JOURNEY.map((s, i) => (
            <article key={s.k} className={`jcard${i ? '' : ' on'}`} aria-label={`Step ${i + 1}: ${s.k}`}>
              <div>
                <p className="k">{pad(i + 1)} · {s.k}</p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="gets"><small>What you get</small><div>{s.gets.map(g => <span key={g}>{g}</span>)}</div></div>
              </div>
              <div className="arch"><JourneyArt k={s.art} /><span className="lbl">{s.k.toUpperCase()}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const [turned, setTurned] = useState(-1);
  return (
    <section className="band cream" id="services">
      <div className="wrap">
        <div className="head">
          <div><p className="kicker rv">What ERPsol delivers</p><h2 className="h2 rv" style={{ '--d': 1 }}>Five services,<br /><span className="it">one standard.</span></h2></div>
          <p className="lead rv">Pick the capability you need now. The same team, process and quality bar apply to every one of them.</p>
        </div>
        <div className="svc">
          {D.SERVICES.map((s, i) => (
            <div key={s.id} className={`flip rv${turned === i ? ' turned' : ''}`} style={{ '--d': i }}>
              <div className="flip-in">
                <div className="flip-face flip-front" onClick={() => setTurned(t => (t === i ? -1 : i))}>
                  <div className="vis"><ServiceArt id={s.id} /></div>
                  <div className="inf">
                    <small>{s.who}</small><h3>{s.title}</h3><p>{s.line}</p>
                    <div className="meta"><span>{s.meta[0]}</span><span>{s.meta[1]}</span></div>
                    <button className="turn" aria-label={`Show what's included in ${s.title}`}>TURN FOR DETAILS ↻</button>
                  </div>
                </div>
                <div className="flip-face flip-back">
                  <small>What's included</small><h3>{s.title}</h3>
                  <ul>{s.back.map(b => <li key={b}>{b}</li>)}</ul>
                  <a href="#contact" className="pill pill-gold">Start a project <Arrow /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Evidence() {
  return (
    <section className="band dark" id="work">
      <div className="wrap">
        <div className="head">
          <div><p className="kicker rv">Case studies</p><h2 className="h2 rv" style={{ '--d': 1 }}>Results,<br /><span className="it">in numbers.</span></h2></div>
          <p className="lead rv">Each project: the starting point, what changed, and the measurable difference it made.</p>
        </div>
        <div className="ev-stats">{D.EVIDENCE.stats.map(([n, l], i) => <div key={l} className="rv" style={{ '--d': i }}><b>{n}</b><span>{l}</span></div>)}</div>
        {D.EVIDENCE.cases.map((c, i) => (
          <a key={c.title} href="#contact" className="case rv">
            <span className="n">{pad(i + 1)}</span>
            <div className="th"><Photo id={c.photo} w={600} h={400} /></div>
            <div><p className="tg">{c.tag}</p><h3>{c.title}</h3><p>{c.body}</p></div>
            <div className="m">{c.m.map(([b, l]) => <div key={l}><b>{b}</b><span>{l}</span></div>)}</div>
            <span className="go" aria-hidden="true">→</span>
          </a>
        ))}
        <p className="sample-note">Sample projects shown for illustration · replace with your case studies</p>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="band cream" id="voices">
      <div className="wrap tst">
        <div className="tst-copy">
          <p className="kicker">In their words</p>
          <h2 style={{ marginTop: 14 }}>Heard from<br />the people<br /><span className="it">who use it.</span></h2>
          <p>References are available after a first consultation.</p>
          <p className="cnt">{pad(D.QUOTES.length)} VOICES</p>
        </div>
        <div className="deck">
          {D.QUOTES.map((q, i) => (
            <figure key={i} className={`deck-card tone-${q.tone}`} style={{ '--i': i }} data-deck>
              <div className="qm">“</div>
              <blockquote><p>{q.q}</p></blockquote>
              <figcaption className="by"><span style={{ display: 'flex', alignItems: 'center' }}><span className="av">{q.who.split(' ').map(w => w[0]).join('').slice(0, 2)}</span><span>{q.who}{q.sample && <span className="tag-sample">Sample</span>}<small>{q.org}</small></span></span><i>{pad(i + 1)} / {pad(D.QUOTES.length)}</i></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Meet() {
  return (
    <section className="meet dark" id="meet" data-meet aria-label="Meet ERPsol">
      <div className="meet-stage">
        <div className="meet-arch"><Photo id={D.PHOTO.team} w={1400} h={1000} alt="The ERPsol team working together around a table" /></div>
        <span className="meet-w l" data-mw="-1">Meet</span>
        <span className="meet-w r" data-mw="1">ERPsol</span>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="band about dark" id="about">
      <Photo id={D.PHOTO.team} w={2000} h={1000} className="bg" sizes="100vw" />
      <div className="wrap grid">
        <div><p className="kicker rv">About</p><h2 className="h2 rv" style={{ '--d': 1 }}>{D.ABOUT.title[0]} <span className="it">{D.ABOUT.title[1]}</span></h2></div>
        <div className="rv" style={{ '--d': 1 }}><p>{D.ABOUT.body}</p><ul>{D.ABOUT.values.map(v => <li key={v}>{v}</li>)}</ul>
          <div className="sign"><span>{D.ABOUT.sign}</span><a href="#contact" className="pill pill-ghost">Work with us <Arrow /></a></div></div>
      </div>
    </section>
  );
}

const ICONS = {
  linkedin: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H9z',
  github: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z',
  clutch: 'M12.6 17.3a5.3 5.3 0 1 1 4-8.8l2.4-2.2A8.6 8.6 0 1 0 19 17.7l-2.3-2.3a5.2 5.2 0 0 1-4.1 1.9zM12.5 10.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z',
};
const ChannelIcon = ({ k }) => <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d={ICONS[k]} /></svg>;

export function Channels() {
  return (
    <section className="band cream" id="follow">
      <div className="wrap">
        <div className="head">
          <div><p className="kicker rv">Follow the work</p><h2 className="h2 rv" style={{ '--d': 1 }}>Where we share<br /><span className="it">what we learn.</span></h2></div>
          <p className="lead rv">Case studies, open-source tools and verified reviews.</p>
        </div>
        <div className="chan">{D.CHANNELS.map(([k, n, d, col], i) => {
          const url = SITE.links?.[k], inner = <><span className="ic" style={{ color: col }}><ChannelIcon k={k} /></span><h3>{n}</h3><small>{url ? url.replace(/^https?:\/\/(www\.)?/, '') : 'Launching soon'}</small><p>{d}</p><span className="f" style={{ color: col }}>{url ? 'Follow ↗' : 'Coming soon'}</span></>;
          return url ? <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="rv" style={{ '--d': i }}>{inner}</a> : <div key={k} className="c rv" style={{ '--d': i }}>{inner}</div>;
        })}</div>
      </div>
    </section>
  );
}

export function Insights() {
  const track = useRef(null), [idx, setIdx] = useState(0), n = D.INSIGHTS.length;
  const go = d => { const el = track.current, w = el.firstElementChild.getBoundingClientRect().width + 14; el.scrollBy({ left: d * w, behavior: 'smooth' }); };
  const onScroll = () => { const el = track.current, w = el.firstElementChild.getBoundingClientRect().width + 14; setIdx(Math.min(n - 1, Math.round(el.scrollLeft / w))); };
  return (
    <section className="band cream" id="insights">
      <div className="wrap">
        <div className="ins-top">
          <div><p className="kicker rv">Field notes</p><h2 className="h2 rv" style={{ '--d': 1 }}>Notes from <span className="it">the build.</span></h2></div>
          <div className="ins-nav"><span className="cnt">{pad(idx + 1)}<small> / {pad(n)}</small></span><button onClick={() => go(-1)} aria-label="Previous article">←</button><button onClick={() => go(1)} aria-label="Next article">→</button><a href="#newsletter" className="pill pill-ghost">Get notified <Arrow /></a></div>
        </div>
        <div className="ins-track" ref={track} onScroll={onScroll} tabIndex={0} aria-label="Articles">
          {D.INSIGHTS.map(([tag, t, d, ph]) => <article key={t} className="ins"><div className="th"><b>{tag}</b><Photo id={ph} w={660} h={496} /></div><small>Coming soon · ERPsol</small><h3>{t}</h3><p>{d}</p><span className="rd">Read soon</span></article>)}
        </div>
        <div className="ins-prog" aria-hidden="true"><i style={{ width: `${((idx + 1) / n) * 100}%` }} /></div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="band sand" id="faq">
      <div className="wrap faq">
        <div className="faq-copy"><p className="kicker">Before you ask</p><h2 style={{ marginTop: 14 }}>Questions we<br /><span className="it">hear most.</span></h2><p>Not covered here? Bring it to the free consultation.</p><a href="#contact" className="pill pill-ink">Let's talk <Arrow /></a></div>
        <div>{D.FAQ.map(([q, a], i) => (
          <div key={q} className={`qa${open === i ? ' open' : ''}`}>
            <button aria-expanded={open === i} aria-controls={`qa-${i}`} onClick={() => setOpen(o => (o === i ? -1 : i))}><b>{pad(i + 1)}</b><span>{q}</span><i aria-hidden="true">+</i></button>
            <div className="ans" id={`qa-${i}`} role="region"><div><p>{a}</p></div></div>
          </div>
        ))}</div>
      </div>
      <div className="slant" aria-hidden="true" />
    </section>
  );
}

/* ---------- CTA + enquiry form (validation, honeypot, accessible errors) ---------- */
const EMPTY = { name: '', company: '', email: '', service: '', message: '', consult: true, website: '' };
const REQ = ['name', 'email', 'service', 'message'];
const check = (k, v) => (REQ.includes(k) && !String(v).trim() ? 'Required' : k === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email' : '');
function Enquiry() {
  const [d, setD] = useState(EMPTY), [e, setE] = useState({}), [st, setSt] = useState('');
  const set = k => ev => { const v = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value; setD(x => ({ ...x, [k]: v })); if (e[k]) setE(x => ({ ...x, [k]: check(k, v) })); };
  const a = k => ({ 'aria-invalid': e[k] ? true : undefined, 'aria-describedby': e[k] ? `e-${k}` : undefined, onBlur: () => setE(x => ({ ...x, [k]: check(k, d[k]) })) });
  const Err = ({ k }) => <span className="err" id={`e-${k}`}>{e[k]}</span>;
  async function submit(ev) {
    ev.preventDefault();
    const nx = Object.fromEntries(Object.keys(EMPTY).map(k => [k, check(k, d[k])])); setE(nx);
    const bad = Object.keys(nx).find(k => nx[k]);
    if (bad) { ev.currentTarget.elements[bad]?.focus(); setSt('Please complete the highlighted fields.'); return; }
    if (d.website) { setSt("Thanks, we'll be in touch within one business day."); setD(EMPTY); return; }
    if (!SITE.formEndpoint) { setSt('Thanks! (Demo mode: set SITE.formEndpoint to receive enquiries.)'); setD(EMPTY); return; }
    setSt('Sending…');
    try { const r = await fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, website: undefined }) }); if (!r.ok) throw 0; setSt("Thanks, we'll be in touch within one business day."); setD(EMPTY); }
    catch { setSt('Something went wrong. Please email us directly.'); }
  }
  return (
    <form className="enq rv" noValidate onSubmit={submit} style={{ '--d': 1 }}>
      <label>Name *<input name="name" autoComplete="name" value={d.name} onChange={set('name')} {...a('name')} /><Err k="name" /></label>
      <label>Company<input name="company" autoComplete="organization" value={d.company} onChange={set('company')} /><span className="err" /></label>
      <label className="full">Work email *<input name="email" type="email" autoComplete="email" value={d.email} onChange={set('email')} {...a('email')} /><Err k="email" /></label>
      <label className="full">What do you need? *<select name="service" value={d.service} onChange={set('service')} {...a('service')}><option value="">Select a service</option>{D.SERVICES.map(s => <option key={s.id}>{s.title}</option>)}<option>Not sure yet</option></select><Err k="service" /></label>
      <label className="full">Project details *<textarea name="message" placeholder="What should be different a year from now?" value={d.message} onChange={set('message')} {...a('message')} /><Err k="message" /></label>
      <label className="hp" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" value={d.website} onChange={set('website')} /></label>
      <label className="chk full"><input type="checkbox" checked={d.consult} onChange={set('consult')} /> I'd like a free 30-minute consultation</label>
      <div className="row full"><button type="submit" className="pill pill-gold">Send enquiry <Arrow /></button><p className="st" role="status" aria-live="polite">{st}</p></div>
    </form>
  );
}

export function Cta() {
  return (
    <section className="band cta" id="contact">
      <Photo id={D.PHOTO.team} w={2000} h={1100} className="bg" sizes="100vw" />
      <div className="wrap">
        <p className="kicker rv">ERPsol · start a project</p>
        <h2 className="rv" style={{ '--d': 1 }}>Let's fix<span className="it">what slows you down.</span></h2>
      </div>
      <div className="wrap grid">
        <div>
          <p className="body rv" style={{ '--d': 2 }}>A short call in plain language. Tell us which tools you run on today and where time gets lost; we will outline how we would approach it and be honest about whether we are the right fit.</p>
          <div className="direct rv" style={{ '--d': 3 }}><a href={`mailto:${SITE.email}`}><span>Email</span>{SITE.email}</a><a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}><span>Phone</span>{SITE.phone}</a></div>
        </div>
        <Enquiry />
      </div>
    </section>
  );
}

function Clock() {
  const [t, setT] = useState('');
  useEffect(() => { const f = () => setT(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); f(); const id = setInterval(f, 30000); return () => clearInterval(id); }, []);
  return <span>● Local time {t}</span>;
}

export function Footer() {
  const ext = (k, l) => (SITE.links?.[k] ? <a href={SITE.links[k]} target="_blank" rel="noopener noreferrer">{l}</a> : <span className="soon">{l}</span>);
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="cols">
          <div><p className="b">ERPsol designs, builds and runs the systems behind growing businesses: ERP, custom software, web, data and AI.</p>
            <div className="nl" id="newsletter"><small>Newsletter · field notes, monthly</small><form onSubmit={e => { e.preventDefault(); e.currentTarget.reset(); e.currentTarget.querySelector('input').placeholder = 'Thanks, you are on the list'; }}><input type="email" required placeholder="you@company.com" aria-label="Email for newsletter" /><button aria-label="Subscribe">→</button></form></div></div>
          <nav className="links" aria-label="Footer">
            <div className="big">{[['services', 'Services'], ['platform', 'Platform'], ['process', 'Process'], ['work', 'Work'], ['contact', 'Contact']].map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</div>
            <div className="big">{D.SERVICES.map(s => <a key={s.id} href="#services">{s.title}</a>)}</div>
          </nav>
          <div className="sm"><small>Contact</small><a href={`mailto:${SITE.email}`}>{SITE.email}</a><a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}>{SITE.phone}</a><small>Elsewhere</small>{ext('linkedin', 'LinkedIn')}{ext('github', 'GitHub')}{ext('clutch', 'Clutch')}</div>
        </div>
        <p className="mark rv" aria-hidden="true">{[...'ERPsol'].map((c, i) => <span key={i} style={{ '--i': i }}>{c}</span>)}</p>
        <div className="bot"><span>© {new Date().getFullYear()} ERPsol. All rights reserved.</span><Clock /><span style={{ display: 'flex', gap: 18 }}>{ext('privacy', 'Privacy')}{ext('terms', 'Terms')}<a href="#top">Back to top ↑</a></span></div>
      </div>
    </footer>
  );
}

export function RvPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero /><Intro /><Marquee /><Belief /><Principles /><Platform /><Show /><Audience /><Journey /><Services /><Evidence /><Testimonials /><Meet /><About /><Channels /><Insights /><Faq /><Cta />
      </main>
      <Footer />
    </>
  );
}
