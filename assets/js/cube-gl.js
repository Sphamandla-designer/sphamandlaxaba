/* ═══════════════════════════════════════════════════════════
   SPHAMANDLA XABA® — the black cube (Three.js)
   One polished black cube, persistent across all projects.
   Faces carry machined engravings — PRODUCT, AI, SYSTEMS,
   MOTION, STRATEGY — visible only when the light catches them.
   Each project morphs its lighting, rotation and glow.
   ═══════════════════════════════════════════════════════════ */

import * as THREE from 'three';

const holder = document.getElementById('cubeCanvas');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (holder) {
  const canvas = document.createElement('canvas');
  holder.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  const CAM_Z = 7.2;
  camera.position.set(0, 0.15, CAM_Z);

  /* ── environment: studio gradient cubemap for the reflections ── */
  const envFace = (bright) => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, bright ? '#ffffff' : '#3c3c46');
    grad.addColorStop(0.42, '#c9c9d2');
    grad.addColorStop(0.55, '#f4f4f8'); // bright horizon band
    grad.addColorStop(0.68, '#3a3a44');
    grad.addColorStop(1, '#0c0c10');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return c;
  };
  const envTex = new THREE.CubeTexture([
    envFace(false), envFace(false), envFace(true),
    envFace(false), envFace(false), envFace(false),
  ]);
  envTex.needsUpdate = true;

  /* ── engraved face materials ── */
  const LABELS = ['AI', 'SYSTEMS', 'STRATEGY', '', 'PRODUCT', 'MOTION']; // +x -x +y -y +z -z
  const faceMaterial = (label) => {
    const size = 512;
    const col = document.createElement('canvas');
    col.width = col.height = size;
    const cg = col.getContext('2d');
    cg.fillStyle = '#0b0b0e';
    cg.fillRect(0, 0, size, size);
    const rough = document.createElement('canvas');
    rough.width = rough.height = size;
    const rg = rough.getContext('2d');
    rg.fillStyle = 'rgb(150,150,150)';
    rg.fillRect(0, 0, size, size);
    if (label) {
      const font = '700 74px "Archivo", system-ui, sans-serif';
      for (const [g, fill] of [[cg, '#191920'], [rg, 'rgb(60,60,60)']]) {
        g.font = font;
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillStyle = fill;
        g.fillText(label.split('').join(' '), size / 2, size / 2);
      }
    }
    const map = new THREE.CanvasTexture(col);
    const roughnessMap = new THREE.CanvasTexture(rough);
    return new THREE.MeshStandardMaterial({
      map,
      roughnessMap,
      metalness: 0.92,
      roughness: 0.42,
      envMap: envTex,
      envMapIntensity: 1.15,
    });
  };
  const materials = LABELS.map(faceMaterial);

  const cube = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.3, 2.3), materials);
  const group = new THREE.Group();
  group.add(cube);
  scene.add(group);

  /* ── soft glow sprite behind the cube ── */
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = glowCanvas.height = 256;
  const gg = glowCanvas.getContext('2d');
  const rad = gg.createRadialGradient(128, 128, 0, 128, 128, 128);
  rad.addColorStop(0, 'rgba(255,255,255,1)');
  rad.addColorStop(0.4, 'rgba(255,255,255,0.35)');
  rad.addColorStop(1, 'rgba(255,255,255,0)');
  gg.fillStyle = rad;
  gg.fillRect(0, 0, 256, 256);
  const glowMat = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(glowCanvas),
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const glow = new THREE.Sprite(glowMat);
  glow.position.set(0, 0, -2.2);
  glow.scale.set(7, 7, 1);
  scene.add(glow);

  /* ── lights ── */
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3.5, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0xffffff, 14, 30);
  rim.position.set(-4, 2, -3);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.32));

  /* ── per-project personalities ── */
  const MOODS = [
    { rx: 0.34, ry: 0.65, key: 0xffffff, keyI: 2.4, rim: 0xffffff, glowC: 0xffffff, glowO: 0.05 }, // ManaGem — polished, neutral
    { rx: 0.12, ry: 2.25, key: 0xdfffe9, keyI: 2.1, rim: 0x53e08c, glowC: 0x33d17c, glowO: 0.17 }, // WhatsApp AI — soft green life
    { rx: 0.52, ry: 3.95, key: 0xffe9d4, keyI: 2.3, rim: 0xff9a4d, glowC: 0xff7a1a, glowO: 0.15 }, // Lisa — warm amber
  ];

  const state = {
    rx: MOODS[0].rx, ry: MOODS[0].ry,
    trx: MOODS[0].rx, try_: MOODS[0].ry,
    hover: 0, hoverT: 0,
    scale: 1, scaleT: 1,
    spin: 0,
    entered: reduced, // reduced motion: visible immediately
    zooming: false,
  };
  group.scale.setScalar(0.001);
  if (reduced) group.scale.setScalar(1);

  const lerpColor = (light, target, k) => light.color.lerp(new THREE.Color(target), k);

  /* ── public API ── */
  window.XabaCube = {
    setProject(i) {
      const m = MOODS[i] ?? MOODS[0];
      state.trx = m.rx;
      state.try_ = m.ry;
      state.mood = m;
    },
    setHover(on) {
      state.hoverT = on ? 1 : 0;
    },
    enter() {
      if (state.entered) return;
      state.entered = true;
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(group.position, { y: -0.35 }, { y: 0, duration: 1.4, ease: 'expo.out' });
        gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 1.4, ease: 'expo.out' });
        gsap.fromTo(group.rotation, { z: 0.035 }, { z: 0, duration: 1.6, ease: 'expo.out' });
      } else {
        group.scale.setScalar(1);
      }
    },
    zoomTo(done) {
      if (state.zooming) return;
      state.zooming = true;
      if (typeof gsap !== 'undefined' && !reduced) {
        gsap.to(camera.position, { z: 2.15, y: 0, duration: 0.85, ease: 'power3.in' });
        gsap.to(state, { spin: state.spin + 0.5, duration: 0.85, ease: 'power2.in', onComplete: done });
      } else {
        done();
      }
    },
  };
  state.mood = MOODS[0];

  const resize = () => {
    const w = holder.clientWidth || 600;
    const h = holder.clientHeight || 600;
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
  renderer.setAnimationLoop(() => {
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);

    if (!reduced) state.spin += dt * 0.055; // almost unnoticeable
    state.rx += (state.trx - state.rx) * 0.045;
    state.ry += (state.try_ - state.ry) * 0.045;
    state.hover += (state.hoverT - state.hover) * 0.08;
    state.scaleT = 1 + state.hover * 0.02;
    state.scale += (state.scaleT - state.scale) * 0.1;

    group.rotation.x = state.rx + state.hover * 0.03;
    group.rotation.y = state.ry + state.spin + state.hover * 0.087; // +5° on hover
    if (state.entered && !state.zooming) group.scale.setScalar(state.scale);

    const m = state.mood;
    lerpColor(key, m.key, 0.04);
    key.intensity += (m.keyI - key.intensity) * 0.04;
    lerpColor(rim, m.rim, 0.04);
    glowMat.color.lerp(new THREE.Color(m.glowC), 0.05);
    const glowTarget = m.glowO + state.hover * 0.06;
    glowMat.opacity += (glowTarget - glowMat.opacity) * 0.05;

    renderer.render(scene, camera);
  });
}
