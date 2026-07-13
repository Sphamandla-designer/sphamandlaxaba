/* ═══════════════════════════════════════════════════════════
   SPHAMANDLA XABA® — hero WebGL particle field (Three.js)
   Silver dust + amber visor sparks with mouse/scroll parallax
   ═══════════════════════════════════════════════════════════ */

import * as THREE from 'three';

const holder = document.getElementById('heroCanvas');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (holder && !reduced) {
  const canvas = document.createElement('canvas');
  holder.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.z = 10;

  const COUNT = 750;
  const positions = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    seeds[i * 3] = Math.random() * Math.PI * 2;
    seeds[i * 3 + 1] = 0.2 + Math.random() * 0.8;
    seeds[i * 3 + 2] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aSeed;
      uniform float uTime;
      uniform float uPixelRatio;
      varying float vTint;
      varying float vFade;
      void main() {
        vec3 p = position;
        float t = uTime * 0.26 * aSeed.y;
        p.y += sin(t + aSeed.x) * 0.9;
        p.x += cos(t * 0.8 + aSeed.x * 2.0) * 0.7;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float size = mix(1.3, 4.0, aSeed.z);
        gl_PointSize = size * uPixelRatio * (9.0 / -mv.z);
        vTint = aSeed.z;
        vFade = smoothstep(-14.0, -2.0, mv.z);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vTint;
      varying float vFade;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.05, d);
        vec3 ink = vec3(0.32, 0.32, 0.38);      // graphite dust
        vec3 amber = vec3(1.0, 0.52, 0.12);     // visor sparks
        vec3 col = mix(ink, amber, step(0.82, vTint));
        float alpha = mix(0.28, 0.55, step(0.82, vTint));
        gl_FragColor = vec4(col, a * alpha * vFade);
      }
    `,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  const resize = () => {
    const w = holder.clientWidth || window.innerWidth;
    const h = holder.clientHeight || window.innerHeight;
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
    mat.uniforms.uTime.value = clock.getElapsedTime();
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;
    points.rotation.y = mouse.x * 0.12;
    points.rotation.x = mouse.y * 0.08;
    camera.position.x = mouse.x * 0.6;
    camera.position.y = -mouse.y * 0.4 - (window.scrollY / window.innerHeight) * 1.2;
    renderer.render(scene, camera);
  });
}
