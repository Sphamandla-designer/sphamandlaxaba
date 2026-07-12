/* GEMIS — hero WebGL centerpiece: liquid-chrome torus knot */
import * as THREE from 'three';

const canvas = document.getElementById('heroCanvas');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !reduced) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  // Procedural studio environment for chrome reflections
  const env = buildStudioEnv();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(env, 0.04).texture;
  env.clear();

  const geo = new THREE.TorusKnotGeometry(1.45, 0.42, 400, 64, 2, 3);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 1,
    roughness: 0.08,
  });
  const knot = new THREE.Mesh(geo, mat);
  scene.add(knot);

  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x17e685, 2.2);
  rim.position.set(-6, -3, -4);
  scene.add(rim);
  const ambient = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambient);

  // colour states: mirror chrome in the hero → satin charcoal-silver over text
  const chromeColor = new THREE.Color(0xd8d8d8);
  const charcoalColor = new THREE.Color(0xa7adb4);

  // pointer parallax (lerped)
  const target = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // travel progress (0 → 1 across hero + manifesto) — set by main.js
  window.__glP = 0;

  let base = { x: 1.55, y: 0.55, s: 1, compact: false };
  function layout() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const compact = w < 820;
    base = compact
      ? { x: 0, y: 1.15, s: 0.62, compact }
      : { x: 1.55, y: 0.55, s: 1, compact };
  }
  layout();
  window.addEventListener('resize', layout);

  const clock = new THREE.Clock();
  // visibility via rect polling — ScrollTrigger's pin reparents the stage,
  // which permanently confuses IntersectionObserver
  let inView = true;
  let tick = 0;

  renderer.setAnimationLoop(() => {
    if (++tick % 12 === 0) {
      const r = canvas.getBoundingClientRect();
      inView = r.bottom > -80 && r.top < window.innerHeight + 80;
    }
    if (!inView) return;
    const t = clock.getElapsedTime();
    eased.x += (target.x - eased.x) * 0.045;
    eased.y += (target.y - eased.y) * 0.045;

    // phase A: hero (p 0 → .4) — spin up; phase B: manifesto (p .4 → 1) — drift & settle
    const p = window.__glP || 0;
    const pHero = Math.min(p / 0.4, 1);
    const pMan = Math.max(0, (p - 0.4) / 0.6);

    knot.rotation.x = t * 0.18 + eased.y * 0.35 + pHero * 1.7 + pMan * 0.9;
    knot.rotation.y = t * 0.24 + eased.x * 0.5 + pHero * 1.1 + pMan * 0.8;
    knot.rotation.z = pMan * 0.35;

    knot.position.x = base.x + pMan * (base.compact ? 0 : 0.65);
    knot.position.y = base.y - pMan * (base.compact ? 0.35 : 0.5) + Math.sin(t * 0.8) * 0.05;
    knot.scale.setScalar(base.s * (1 - pMan * 0.22));

    // morph chrome → satin charcoal-silver while travelling over the light section
    mat.color.copy(chromeColor).lerp(charcoalColor, pMan);
    mat.metalness = 1 - pMan * 0.55;
    mat.roughness = 0.08 + pMan * 0.38;
    mat.envMapIntensity = 1 - pMan * 0.45;
    rim.intensity = 2.2 * (1 - pMan);
    key.intensity = 1.4 + pMan * 0.7;
    ambient.intensity = 0.25 + pMan * 0.45;

    renderer.render(scene, camera);
  });

  function buildStudioEnv() {
    const s = new THREE.Scene();
    s.background = new THREE.Color(0x050505);
    const panel = (color, intensity, w, h, pos, lookAt) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
      );
      m.material.color.multiplyScalar(intensity);
      m.position.copy(pos);
      m.lookAt(lookAt);
      s.add(m);
      return m;
    };
    const c = new THREE.Vector3(0, 0, 0);
    panel(0xffffff, 6, 6, 2, new THREE.Vector3(0, 5, 0), c);      // top softbox
    panel(0xffffff, 2.5, 2, 5, new THREE.Vector3(-6, 0, 2), c);   // left strip
    panel(0x17e685, 3.5, 2, 6, new THREE.Vector3(6, -1, -2), c);  // emerald strip
    panel(0x8888ff, 1.2, 4, 1, new THREE.Vector3(0, -5, 3), c);   // cool floor bounce
    return s;
  }
}
