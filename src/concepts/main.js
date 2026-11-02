// Concept gallery: six live 3D candidates for the site's centrepiece. Not part of the main site bundle.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const PI = Math.PI, C = { cream: 0xffedd7, walnut: 0x100904, bark: 0x382416, ember: 0xdc5000, drift: 0x6c5f51 };
const DPR = Math.min(devicePixelRatio, 1.5);

const CONCEPTS = [
  { id: 'A', title: 'Particle morph', build: particleMorph,
    pitch: 'Thousands of glowing particles that reassemble into a new form for each part of the story.',
    scroll: 'Hero: your logo mark. About: a sphere (one connected business). Services: a grid (structured systems). Value: a flowing wave (data in motion).',
    fit: 'Most "AI and data" feeling. Very premium, and it moves the most.' },
  { id: 'B', title: 'Kinetic logo mark', build: logoMark,
    pitch: 'Your three-bar ERPsol mark as a glossy 3D object. The bars slide, turn and separate.',
    scroll: 'Hero: bars stacked as the logo. About: they pull apart into layers. Process: they turn in sequence, one per step.',
    fit: 'Strongest brand recall. Simple, confident, timeless.' },
  { id: 'C', title: 'Data city', build: dataCity,
    pitch: 'A grid of bars like a living 3D chart, with heights shifting like real-time metrics.',
    scroll: 'Hero: calm skyline. Value: bars climb as "efficiency" appears. Work: a few ember bars highlight results.',
    fit: 'Says "analytics and operations" without words.' },
  { id: 'D', title: 'Floating dashboards', build: dashboards,
    pitch: 'Layered glass panels showing charts and KPIs, floating at different depths.',
    scroll: 'Hero: fanned stack. Services: the panel for each service comes to the front.',
    fit: 'Most literal "we build business software". Product-led, like a SaaS launch page.' },
  { id: 'E', title: 'Connected globe', build: globe,
    pitch: 'A dotted globe with ember arcs and data packets flying between points.',
    scroll: 'Hero: slow rotation. About: arcs multiply as systems connect. Contact: zooms to one glowing point.',
    fit: 'Integration, reach and scale. Familiar enterprise metaphor.' },
  { id: 'F', title: 'Process pipeline', build: pipeline,
    pitch: 'A flowing glass ribbon with light travelling through five rings, your delivery stages.',
    scroll: 'Process: each ring lights up as its step is reached. Services: light flows faster as automation kicks in.',
    fit: 'Tells the "how we work" and automation story. Calm and elegant.' },
];

/* ---------- shared stage ---------- */
function stage(view, { z = 7, target = [0, 0, 0], auto = .6 } = {}) {
  const canvas = view.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(DPR); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture; pm.dispose();
  scene.add(new THREE.HemisphereLight(0xffe2c0, 0x1a0d05, .5));
  const key = new THREE.DirectionalLight(0xffd6a8, 2.4); key.position.set(4, 6, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xff6a1a, 3); rim.position.set(-4, 2, -5); scene.add(rim);
  const camera = new THREE.PerspectiveCamera(32, 4 / 3, .1, 100); camera.position.set(0, 1.2, z);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(...target); controls.enableDamping = true; controls.enableZoom = false; controls.enablePan = false;
  controls.autoRotate = auto > 0; controls.autoRotateSpeed = auto;
  const resize = () => { const r = view.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); };
  new ResizeObserver(resize).observe(view); resize();
  return { renderer, scene, camera, controls };
}

const dotTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
const roundRect = (w, h, r) => { const x = -w / 2, y = -h / 2, s = new THREE.Shape(); s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s; };
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ---------- A: particle morph ---------- */
function particleMorph(v) {
  const s = stage(v, { z: 7.5, auto: .4 }), N = 7000;
  const shapes = [], cream = new THREE.Color(C.cream), ember = new THREE.Color(0xff7a2a), drift = new THREE.Color(0x9a7a62);
  const logo = new Float32Array(N * 3), logoC = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { const b = i % 3; logo.set([(Math.random() - .5) * 2.8, .75 - b * .75 + (Math.random() - .5) * .42, (Math.random() - .5) * .42], i * 3); [cream, ember, drift][b].toArray(logoC, i * 3); }
  const sphere = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963; sphere.set([Math.cos(th) * r * 1.45, y * 1.45, Math.sin(th) * r * 1.45], i * 3); }
  const grid = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const f = i % 6, a = (Math.random() - .5) * 2.2, b = (Math.random() - .5) * 2.2, h = 1.1 * (f % 2 ? 1 : -1); const p = f < 2 ? [h, a, b] : f < 4 ? [a, h, b] : [a, b, h]; grid.set(p.map(q => Math.round(q * 6) / 6), i * 3); }
  const wave = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const x = (Math.random() - .5) * 4, z = (Math.random() - .5) * 2.6; wave.set([x, Math.sin(x * 1.6) * .35 + Math.cos(z * 2.2) * .2, z], i * 3); }
  shapes.push(logo, sphere, grid, wave);
  const pos = new Float32Array(logo), col = new Float32Array(logoC), geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  s.scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: .035, map: dotTex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));
  const flatC = new Float32Array(N * 3), emberish = new THREE.Color(0xffb27a); // non-logo shapes: cream with ember sparks
  for (let i = 0; i < N; i++) (i % 9 ? cream : emberish).toArray(flatC, i * 3);
  return t => {
    const cyc = 3.2, k = Math.floor(t / cyc) % 4, f = ease(Math.min(1, (t % cyc) / 1.6)), a = shapes[k], b = shapes[(k + 1) % 4];
    for (let i = 0; i < N * 3; i++) pos[i] = a[i] + (b[i] - a[i]) * f + (i % 3 === 1 ? Math.sin(t * 2 + i) * .004 : 0);
    const from = k === 0 ? logoC : flatC, to = (k + 1) % 4 === 0 ? logoC : flatC;
    for (let i = 0; i < N * 3; i++) col[i] = from[i] + (to[i] - from[i]) * f;
    geo.attributes.position.needsUpdate = geo.attributes.color.needsUpdate = true;
    return s;
  };
}

/* ---------- B: kinetic logo mark ---------- */
function logoMark(v) {
  const s = stage(v, { z: 7, auto: .8 });
  const geo = new THREE.ExtrudeGeometry(roundRect(2.6, .52, .26), { depth: .5, bevelEnabled: true, bevelThickness: .06, bevelSize: .06, bevelSegments: 6, curveSegments: 20 }); geo.center();
  const bars = [C.cream, C.ember, 0x6c5f51].map((c, i) => { const m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: c, roughness: .3, clearcoat: 1, clearcoatRoughness: .12, envMapIntensity: .8 })); s.scene.add(m); return m; });
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), new THREE.MeshBasicMaterial({ map: dotTex, color: 0x000000, transparent: true, opacity: .6, depthWrite: false })); sh.rotation.x = -PI / 2; sh.position.y = -1.6; s.scene.add(sh);
  return t => {
    const sep = (Math.sin(t * .7) * .5 + .5); // 0 = logo, 1 = layers pulled apart
    bars.forEach((b, i) => {
      const ph = t * 1.1 - i * .5;
      b.position.set(Math.sin(ph) * .35 * (1 - sep), .78 - i * .78 - (i - 1) * sep * .5, (i - 1) * sep * 1.1);
      const turn = Math.max(0, Math.sin(t * .5 - i * .9)); b.rotation.set(turn * .5, 0, 0);
    });
    return s;
  };
}

/* ---------- C: data city ---------- */
function dataCity(v) {
  const s = stage(v, { z: 9, target: [0, -.3, 0], auto: .5 }); s.camera.position.set(5, 5, 6);
  const n = 14, gap = .26, geo = new THREE.BoxGeometry(.2, 1, .2); geo.translate(0, .5, 0);
  const mat = new THREE.MeshPhysicalMaterial({ roughness: .4, clearcoat: .6, envMapIntensity: .7 });
  const city = new THREE.InstancedMesh(geo, mat, n * n); s.scene.add(city);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(n * gap + .3, .06, n * gap + .3), new THREE.MeshPhysicalMaterial({ color: 0x1f130a, roughness: .6 })); plate.position.y = -1.03; s.scene.add(plate);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), sc = new THREE.Vector3(), col = new THREE.Color(), hot = new Set([...Array(9)].map(() => Math.random() * n * n | 0));
  return t => {
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const k = i * n + j, x = (i - n / 2) * gap, z = (j - n / 2) * gap;
      const h = .15 + .9 * (Math.sin(i * .55 + t * .9) * Math.cos(j * .45 - t * .7) * .5 + .5) ** 2 + (hot.has(k) ? .9 + Math.sin(t * 2 + k) * .25 : 0);
      m.compose(p.set(x, -1, z), q, sc.set(1, h, 1)); city.setMatrixAt(k, m);
      city.setColorAt(k, hot.has(k) ? col.set(C.ember) : col.set(0x3a2516).lerp(new THREE.Color(0xc9a27e), Math.min(1, h / 1.4)));
    }
    city.instanceMatrix.needsUpdate = true; city.instanceColor.needsUpdate = true;
    return s;
  };
}

/* ---------- D: floating dashboards ---------- */
function panelTex(kind) {
  const c = document.createElement('canvas'); c.width = 640; c.height = 400; const g = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const draw = t => {
    g.clearRect(0, 0, 640, 400);
    g.fillStyle = 'rgba(36,21,9,.92)'; g.beginPath(); g.roundRect(0, 0, 640, 400, 28); g.fill();
    g.strokeStyle = 'rgba(255,237,215,.14)'; g.lineWidth = 2; g.stroke();
    g.fillStyle = '#a39280'; g.font = '500 22px Inter'; g.fillText({ line: 'REVENUE', bars: 'ORDERS BY WEEK', kpi: 'THIS MONTH', donut: 'ON-TIME FULFILMENT', flow: 'AUTOMATION' }[kind], 32, 50);
    g.fillStyle = '#ffedd7';
    if (kind === 'line') { g.font = '600 64px Inter'; g.fillText('$4.2M', 32, 130); g.strokeStyle = '#dc5000'; g.lineWidth = 5; g.beginPath(); for (let x = 0; x <= 576; x += 8) { const y = 330 - x * .32 - Math.sin(x / 40 + t) * 18; x ? g.lineTo(32 + x, y) : g.moveTo(32, y); } g.stroke(); }
    if (kind === 'bars') for (let i = 0; i < 10; i++) { const h = 60 + (Math.sin(i * 1.3 + t) * .5 + .5) * 220; g.fillStyle = i === 9 ? '#dc5000' : '#6c5f51'; g.beginPath(); g.roundRect(36 + i * 58, 360 - h, 38, h, 6); g.fill(); }
    if (kind === 'kpi') [['ORDERS', '18,904', '+8%'], ['MARGIN', '31.5%', '+2.1'], ['TURNS', '7.4x', '+0.6']].forEach(([k, val, d], i) => { g.fillStyle = '#a39280'; g.font = '500 18px Inter'; g.fillText(k, 32, 120 + i * 92); g.fillStyle = '#ffedd7'; g.font = '600 46px Inter'; g.fillText(val, 32, 168 + i * 92); g.fillStyle = '#dc5000'; g.font = '500 22px Inter'; g.fillText(d, 420, 160 + i * 92); });
    if (kind === 'donut') { const a = .64 + Math.sin(t) * .04; g.lineWidth = 46; g.strokeStyle = '#40372e'; g.beginPath(); g.arc(320, 230, 110, 0, 7); g.stroke(); g.strokeStyle = '#dc5000'; g.beginPath(); g.arc(320, 230, 110, -PI / 2, -PI / 2 + a * PI * 2); g.stroke(); g.fillStyle = '#ffedd7'; g.font = '600 54px Inter'; g.textAlign = 'center'; g.fillText(Math.round(a * 100) + '%', 320, 250); g.textAlign = 'left'; }
    if (kind === 'flow') { const xs = [80, 250, 420, 570]; g.strokeStyle = '#dc5000'; g.lineWidth = 4; g.setLineDash([12, 10]); g.lineDashOffset = -t * 40; g.beginPath(); g.moveTo(80, 230); g.lineTo(570, 230); g.stroke(); g.setLineDash([]); ['IN', 'AI', 'CHECK', 'ERP'].forEach((l, i) => { g.fillStyle = i === 1 ? '#dc5000' : '#382416'; g.beginPath(); g.arc(xs[i], 230, 44, 0, 7); g.fill(); g.fillStyle = '#ffedd7'; g.font = '600 20px Inter'; g.textAlign = 'center'; g.fillText(l, xs[i], 237); g.textAlign = 'left'; }); }
    tex.needsUpdate = true;
  };
  return { tex, draw };
}
function dashboards(v) {
  const s = stage(v, { z: 8, auto: .3 });
  const kinds = ['line', 'bars', 'kpi', 'donut', 'flow'], panels = kinds.map((k, i) => {
    const p = panelTex(k), mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), new THREE.MeshBasicMaterial({ map: p.tex, transparent: true, side: THREE.DoubleSide, toneMapped: false }));
    mesh.position.set((i - 2) * .55, (i % 2 ? .45 : -.35) + (2 - Math.abs(i - 2)) * .1, (i - 2) * -.7); mesh.rotation.y = -.35;
    s.scene.add(mesh); return { mesh, p, base: mesh.position.y, i };
  });
  let last = 0;
  return t => {
    panels.forEach(({ mesh, base, i }) => { mesh.position.y = base + Math.sin(t * .9 + i) * .06; });
    if (t - last > .08) { last = t; panels.forEach(({ p }) => p.draw(t)); }
    return s;
  };
}

/* ---------- E: connected globe ---------- */
function globe(v) {
  const s = stage(v, { z: 7, auto: 1 }), R = 1.5, N = 2600;
  const dots = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963; dots.set([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], i * 3); }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dots, 3));
  s.scene.add(new THREE.Points(dg, new THREE.PointsMaterial({ color: C.cream, size: .034, map: dotTex, transparent: true, opacity: .8, depthWrite: false })));
  s.scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * .985, 48, 48), new THREE.MeshStandardMaterial({ color: 0x140b05, roughness: .95, envMapIntensity: .15 })));
  const rand = () => { const v = new THREE.Vector3().randomDirection(); return v.multiplyScalar(R); };
  const arcs = [...Array(22)].map(() => { const a = rand(), b = rand(); const mid = a.clone().add(b).normalize().multiplyScalar(R * (1.25 + a.distanceTo(b) * .18)); return new THREE.QuadraticBezierCurve3(a, mid, b); });
  arcs.forEach(c => s.scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(c.getPoints(40)), new THREE.LineBasicMaterial({ color: C.ember, transparent: true, opacity: .45 }))));
  const pk = new Float32Array(arcs.length * 3), pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pk, 3));
  s.scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffb070, size: .14, map: dotTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));
  const tmp = new THREE.Vector3();
  return t => { arcs.forEach((c, i) => c.getPoint((t * .35 + i * .37) % 1, tmp).toArray(pk, i * 3)); pg.attributes.position.needsUpdate = true; return s; };
}

/* ---------- F: process pipeline ---------- */
function labelSprite(text) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#ffedd7'; g.font = '500 30px Inter'; g.textAlign = 'center'; g.fillText(text, 128, 42);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false })); sp.scale.set(1, .25, 1); return sp;
}
function pipeline(v) {
  const s = stage(v, { z: 8, auto: .4 });
  const curve = new THREE.CatmullRomCurve3([[-2.6, -.8, .4], [-1.4, .4, -.6], [0, -.3, .6], [1.3, .6, -.4], [2.6, -.4, .3]].map(p => new THREE.Vector3(...p)));
  s.scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 200, .07, 20), new THREE.MeshPhysicalMaterial({ color: C.cream, roughness: .2, clearcoat: 1, transmission: .0, envMapIntensity: .9 })));
  const steps = ['DISCOVER', 'DESIGN', 'BUILD', 'LAUNCH', 'SUPPORT'], rings = steps.map((label, i) => {
    const u = .08 + i * .21, pos = curve.getPointAt(u), tan = curve.getTangentAt(u);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.26, .025, 12, 48), new THREE.MeshPhysicalMaterial({ color: C.ember, emissive: C.ember, emissiveIntensity: .2, roughness: .3 }));
    ring.position.copy(pos); ring.lookAt(pos.clone().add(tan)); s.scene.add(ring);
    const sp = labelSprite(label); sp.position.copy(pos).add(new THREE.Vector3(0, .5, 0)); s.scene.add(sp);
    return { ring, u };
  });
  const NP = 60, pk = new Float32Array(NP * 3), pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pk, 3));
  s.scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffa060, size: .09, map: dotTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));
  const tmp = new THREE.Vector3();
  return t => {
    for (let i = 0; i < NP; i++) curve.getPointAt((t * .08 + i / NP) % 1, tmp).toArray(pk, i * 3);
    pg.attributes.position.needsUpdate = true;
    const lead = (t * .08) % 1;
    rings.forEach(({ ring, u }) => { const d = Math.abs(((lead - u) % 1 + 1) % 1); ring.material.emissiveIntensity = .2 + Math.max(0, 1 - d * 12) * 2.5; });
    return s;
  };
}

/* ---------- mount: only animate cards that are on screen ---------- */
const grid = document.getElementById('grid'), live = new Set(), clock = new THREE.Clock();
CONCEPTS.forEach(c => {
  const card = document.createElement('article'); card.className = 'card';
  card.innerHTML = `<div class="view"><canvas></canvas><span class="badge">${c.id}</span><span class="hint">DRAG TO ROTATE</span></div>
    <div class="info"><h2>${c.id} · ${c.title}</h2><p>${c.pitch}</p><dl><dt>On scroll</dt><dd>${c.scroll}</dd><dt>Why</dt><dd>${c.fit}</dd></dl></div>`;
  grid.appendChild(card);
  const view = card.querySelector('.view'), tick = c.build(view);
  new IntersectionObserver(([e]) => e.isIntersecting ? live.add(tick) : live.delete(tick), { rootMargin: '100px' }).observe(view);
});
(function loop() {
  const t = clock.getElapsedTime();
  live.forEach(tick => { const s = tick(t); s.controls.update(); s.renderer.render(s.scene, s.camera); });
  requestAnimationFrame(loop);
})();
