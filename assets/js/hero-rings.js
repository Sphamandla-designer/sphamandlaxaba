/* ═══════════════════════════════════════════════════════════
   SPHAMANDLA XABA® — hero ring knot (Three.js)
   The interlocked rings from the hero image, rebuilt as a live
   3D object: graphite tori with neon magenta light stripes.
   ═══════════════════════════════════════════════════════════ */

import * as THREE from 'three';

const holder = document.getElementById('heroObj3d');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (holder && holder.offsetParent !== null) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  holder.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0, 0, 7.2);

  /* lights — dim white key for the graphite body, magenta fill */
  scene.add(new THREE.AmbientLight(0x1a1a22, 2.2));
  const key = new THREE.DirectionalLight(0xdde2ff, 1.4);
  key.position.set(-3, 5, 4);
  scene.add(key);
  const magenta = new THREE.PointLight(0xff2bd4, 28, 14);
  magenta.position.set(0.6, 0, 2.4);
  scene.add(magenta);

  const group = new THREE.Group();
  scene.add(group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x101014, roughness: 0.32, metalness: 0.5,
  });
  const stripeMat = new THREE.MeshBasicMaterial({ color: 0xff2bd4 });

  /* each ring: graphite torus + a thin glowing stripe on its outer equator */
  const RINGS = [
    { p: [ 0.10,  1.55,  0.00], r: [1.30, 0.15,  0.30], s: 1.00 },
    { p: [ 0.35,  0.80,  0.15], r: [0.55, 0.85, -0.10], s: 1.05 },
    { p: [-0.20,  0.10, -0.10], r: [1.45, -0.35, -0.45], s: 1.10 },
    { p: [ 0.30, -0.70,  0.05], r: [0.75, -0.80,  0.25], s: 1.05 },
    { p: [-0.15, -1.50,  0.10], r: [1.25, 0.40,  0.55], s: 1.00 },
  ];

  const rings = RINGS.map(({ p, r, s }) => {
    const ring = new THREE.Group();
    const body = new THREE.Mesh(new THREE.TorusGeometry(1.05 * s, 0.16, 40, 120), bodyMat);
    const stripe = new THREE.Mesh(new THREE.TorusGeometry(1.05 * s + 0.155, 0.028, 16, 120), stripeMat);
    ring.add(body, stripe);
    ring.position.set(...p);
    ring.rotation.set(...r);
    group.add(ring);
    return ring;
  });

  group.scale.setScalar(1.28);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
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
  const render = () => renderer.render(scene, camera);

  if (reduced) {
    group.rotation.y = 0.5;
    render();
    window.addEventListener('resize', render);
  } else {
    renderer.setAnimationLoop(() => {
      if (!visible) return;
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.22;
      group.rotation.z = Math.sin(t * 0.18) * 0.06;
      rings.forEach((ring, i) => {
        ring.rotation.x += Math.sin(t * 0.3 + i * 1.7) * 0.0012;
        ring.rotation.y += Math.cos(t * 0.24 + i * 2.1) * 0.0010;
      });
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      group.rotation.x = mouse.y * 0.14;
      camera.position.x = mouse.x * 0.35;
      camera.lookAt(0, 0, 0);
      render();
    });
  }
}
