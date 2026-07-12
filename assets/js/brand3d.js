/* GEMIS Brand Studio — hero WebGL centerpiece: faceted chrome gem + orbit ring */
import * as THREE from 'three';

const canvas = document.getElementById('heroCanvas');
const isBrandPage = document.body.classList.contains('page-brand');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && isBrandPage && !reduced) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  const env = buildStudioEnv();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(env, 0.04).texture;
  env.clear();

  const group = new THREE.Group();
  scene.add(group);

  // the gem — flat-shaded icosahedron reads as a cut stone in chrome
  const gemMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 1,
    roughness: 0.12,
    flatShading: true,
  });
  const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, 0), gemMat);
  group.add(gem);

  // orbiting emerald ring
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x17e685, metalness: 0.6, roughness: 0.3,
    emissive: 0x0a5c36, emissiveIntensity: 0.6,
  });
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.025, 12, 128), ringMat);
  orbit.rotation.x = Math.PI / 2.4;
  group.add(orbit);

  // small satellite stone on the ring
  const sat = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), gemMat.clone());
  group.add(sat);

  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x17e685, 2.0);
  rim.position.set(-6, -3, -4);
  scene.add(rim);
  const ambient = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambient);

  const chromeColor = new THREE.Color(0xd8d8d8);
  const charcoalColor = new THREE.Color(0xa7adb4);

  const target = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.__glP = 0;

  let base = { x: 1.55, y: 0.45, s: 1, compact: false };
  function layout() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const compact = w < 820;
    base = compact
      ? { x: 0, y: 1.2, s: 0.6, compact }
      : { x: 1.55, y: 0.45, s: 1, compact };
  }
  layout();
  window.addEventListener('resize', layout);

  const clock = new THREE.Clock();
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

    const p = window.__glP || 0;
    const pHero = Math.min(p / 0.4, 1);
    const pMan = Math.max(0, (p - 0.4) / 0.6);

    gem.rotation.x = t * 0.14 + eased.y * 0.3 + pHero * 1.4 + pMan * 0.8;
    gem.rotation.y = t * 0.22 + eased.x * 0.45 + pHero * 1.3 + pMan * 0.9;
    orbit.rotation.z = t * 0.25 + pHero * 1.1;
    orbit.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3) * 0.12 + pMan * 0.5;

    // satellite rides the ring
    const sa = t * 0.9 + pHero * 2.5;
    sat.position.set(Math.cos(sa) * 2.5, Math.sin(sa) * 2.5 * Math.cos(orbit.rotation.x), Math.sin(sa) * 2.5 * Math.sin(orbit.rotation.x));
    sat.rotation.y = t * 2;

    group.position.x = base.x + pMan * (base.compact ? 0 : 0.6);
    group.position.y = base.y - pMan * (base.compact ? 0.35 : 0.45) + Math.sin(t * 0.7) * 0.06;
    group.scale.setScalar(base.s * (1 - pMan * 0.2));

    // chrome → satin charcoal-silver over the light section
    gemMat.color.copy(chromeColor).lerp(charcoalColor, pMan);
    gemMat.metalness = 1 - pMan * 0.55;
    gemMat.roughness = 0.12 + pMan * 0.34;
    gemMat.envMapIntensity = 1 - pMan * 0.45;
    rim.intensity = 2.0 * (1 - pMan);
    key.intensity = 1.5 + pMan * 0.7;
    ambient.intensity = 0.25 + pMan * 0.45;
    ringMat.opacity = 1;

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
    panel(0xffffff, 6, 6, 2, new THREE.Vector3(0, 5, 0), c);
    panel(0xffffff, 2.5, 2, 5, new THREE.Vector3(-6, 0, 2), c);
    panel(0x17e685, 3.5, 2, 6, new THREE.Vector3(6, -1, -2), c);
    panel(0x8888ff, 1.2, 4, 1, new THREE.Vector3(0, -5, 3), c);
    return s;
  }
}
