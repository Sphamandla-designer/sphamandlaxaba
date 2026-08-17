/* ═══════════════════════════════════════════════════════════
   SPHAMANDLA XABA® — chrome 3D "S" (Three.js)
   The brand letterform from the design, rebuilt as a live
   object: a polished-steel serpentine that rotates smoothly.
   Mounted in the hero and in the "What I design" stage.
   ═══════════════════════════════════════════════════════════ */

import * as THREE from 'three';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* studio environment for chrome reflections (PMREM from a lit box scene) */
function makeEnvironment(renderer) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x40424a);

  const panel = (w, h, color, x, y, z, ry = 0, rx = 0) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    );
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, 0);
    scene.add(m);
  };
  panel(14, 8, 0xffffff, 0, 7, 0, 0, Math.PI / 2);      // ceiling key
  panel(10, 6, 0xf2f3f5, -8, 1, 2, Math.PI / 2.3);      // left soft
  panel(10, 6, 0xb9bcc4, 8, 0, -1, -Math.PI / 2.2);     // right grey
  panel(16, 4, 0x1a1b20, 0, -6, 0, 0, Math.PI / 2);     // dark floor
  panel(6, 10, 0xe8e9ec, 0, 2, -8);                     // back fill

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(scene, 0.04).texture;
  pmrem.dispose();
  return env;
}

/* serpentine "S" centreline */
function makeSCurve() {
  const pts = [
    [ 0.92,  1.42, 0.00],
    [ 0.30,  1.74, 0.06],
    [-0.48,  1.60, 0.00],
    [-0.88,  1.02, -0.05],
    [-0.55,  0.45, 0.00],
    [ 0.12,  0.16, 0.06],
    [ 0.62, -0.16, 0.00],
    [ 0.88, -0.72, -0.05],
    [ 0.52, -1.28, 0.00],
    [-0.18, -1.62, 0.06],
    [-0.95, -1.40, 0.00],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z));
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.35);
}

export function mountS(holder, { size = 1.0, speed = 0.35 } = {}) {
  if (!holder) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    return; // no WebGL — the layout stands on its own
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  holder.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, 0, 6.4);

  scene.environment = makeEnvironment(renderer);
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(-4, 6, 5);
  scene.add(key);

  const chrome = new THREE.MeshStandardMaterial({
    color: 0xf4f5f7,
    metalness: 1.0,
    roughness: 0.12,
  });

  const group = new THREE.Group();
  const curve = makeSCurve();
  const R = 0.30;
  group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 220, R, 28, false), chrome));
  // rounded end caps
  for (const t of [0, 1]) {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(R, 24, 18), chrome);
    cap.position.copy(curve.getPoint(t));
    group.add(cap);
  }
  group.scale.setScalar(1.02 * size);
  group.rotation.z = -0.05;
  scene.add(group);

  const mouse = { x: 0, tx: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
  }, { passive: true });

  const resize = () => {
    const w = holder.clientWidth || 1, h = holder.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  let visible = true;
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; }, { threshold: 0 })
    .observe(holder);

  const clock = new THREE.Clock();
  if (reduced) {
    group.rotation.y = 0.4;
    renderer.render(scene, camera);
    window.addEventListener('resize', () => renderer.render(scene, camera));
  } else {
    renderer.setAnimationLoop(() => {
      if (!visible) return;
      const t = clock.getElapsedTime();
      group.rotation.y = t * speed;                 // slow, constant, smooth
      group.rotation.x = Math.sin(t * 0.4) * 0.06;  // gentle breathing tilt
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      camera.position.x = mouse.x * 0.4;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    });
  }
}

mountS(document.getElementById('sHero'), { size: 1.0, speed: 0.35 });
mountS(document.getElementById('sWhat'), { size: 0.92, speed: 0.3 });
