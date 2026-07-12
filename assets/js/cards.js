/* GEMIS — procedural animated visuals for work cards.
   Each card canvas runs a lightweight 2D animation, active only while on screen. */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll('.card[data-visual]');

  const VISUALS = {
    /* Liquid chrome — layered sine ridges with emerald glints */
    chrome(ctx, w, h, t) {
      ctx.fillStyle = '#0a0a0b';
      ctx.fillRect(0, 0, w, h);
      const rows = 26;
      for (let r = 0; r < rows; r++) {
        const yBase = (r / rows) * h * 1.25 - h * 0.12;
        const p = r / rows;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const n =
            Math.sin(x * 0.012 + t * 0.9 + r * 0.55) * 14 +
            Math.sin(x * 0.004 - t * 0.5 + r * 0.9) * 26 +
            Math.sin(x * 0.02 + t * 1.6) * 5;
          const y = yBase + n * (0.35 + p * 0.9);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const lum = 30 + 60 * Math.abs(Math.sin(p * Math.PI + t * 0.35));
        const glint = Math.pow(Math.abs(Math.sin(p * 6.1 - t * 0.7)), 18);
        ctx.strokeStyle = glint > 0.5
          ? `rgba(23,230,133,${0.5 * glint})`
          : `hsl(220 4% ${lum}% / ${0.5 + p * 0.4})`;
        ctx.lineWidth = 1 + p * 2.2;
        ctx.stroke();
      }
    },

    /* Neural constellation — drifting nodes with proximity links */
    neural(ctx, w, h, t, state) {
      if (!state.nodes) {
        state.nodes = Array.from({ length: 46 }, (_, i) => ({
          seed: i * 137.5,
          r: 1 + (i % 4) * 0.7,
        }));
      }
      ctx.fillStyle = '#0b0812';
      ctx.fillRect(0, 0, w, h);
      const pts = state.nodes.map((n) => ({
        x: w * (0.5 + 0.46 * Math.sin(n.seed + t * 0.13 + Math.sin(n.seed * 3 + t * 0.07) * 1.4)),
        y: h * (0.5 + 0.44 * Math.cos(n.seed * 1.7 + t * 0.11)),
        r: n.r,
      }));
      const linkDist = Math.min(w, h) * 0.22;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const a = (1 - d / linkDist) * 0.55;
            ctx.strokeStyle = `rgba(178,102,255,${a})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        const pulse = 0.6 + 0.4 * Math.sin(t * 2 + p.x * 0.02);
        ctx.fillStyle = `rgba(232,120,255,${0.85 * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse + 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    },

    /* Silk — flowing amber gradient ribbons */
    silk(ctx, w, h, t) {
      ctx.fillStyle = '#0c0805';
      ctx.fillRect(0, 0, w, h);
      const ribbons = 7;
      for (let r = 0; r < ribbons; r++) {
        const p = r / ribbons;
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, `rgba(255,${140 + r * 12},40,0)`);
        grad.addColorStop(0.5, `rgba(255,${150 + r * 10},${50 + r * 8},${0.16 + p * 0.1})`);
        grad.addColorStop(1, 'rgba(255,120,20,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-20, h);
        for (let x = -20; x <= w + 20; x += 8) {
          const y =
            h * (0.28 + p * 0.5) +
            Math.sin(x * 0.006 + t * 0.6 + r * 1.2) * h * 0.16 +
            Math.sin(x * 0.014 - t * 0.4 + r * 0.6) * h * 0.05;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w + 20, h);
        ctx.closePath();
        ctx.fill();
      }
    },

    /* Emerald grid — perspective floor of pulsing towers */
    grid(ctx, w, h, t) {
      ctx.fillStyle = '#060a08';
      ctx.fillRect(0, 0, w, h);
      const cols = 16, rows = 9;
      const cw = w / cols;
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const depth = gy / rows;
          const x = gx * cw + cw * 0.15;
          const wave =
            Math.sin(gx * 0.7 + t * 1.1) * Math.cos(gy * 0.9 - t * 0.7) * 0.5 + 0.5;
          const barH = (h / rows) * (0.25 + wave * 0.65);
          const y = h - (gy + 1) * (h / rows) * 0.92 + (h / rows - barH);
          const a = 0.12 + wave * 0.55 * (1 - depth * 0.55);
          ctx.fillStyle = `rgba(23,230,133,${a})`;
          ctx.fillRect(x, y + h * 0.06, cw * 0.7, barH);
          if (wave > 0.86) {
            ctx.fillStyle = `rgba(200,255,225,${(wave - 0.86) * 4})`;
            ctx.fillRect(x, y + h * 0.06, cw * 0.7, 2);
          }
        }
      }
    },
  };

  cards.forEach((card) => {
    const canvas = card.querySelector('.card__canvas');
    const kind = card.dataset.visual;
    const draw = VISUALS[kind];
    if (!canvas || !draw) return;

    const ctx = canvas.getContext('2d');
    const state = {};
    let visible = false;
    let raf = null;
    let last = 0;
    let elapsed = Math.random() * 20; // desync cards

    function size() {
      const dpr = Math.min(window.devicePixelRatio, 1.6);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.round(rect.width * dpr));
      canvas.height = Math.max(2, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.w = rect.width;
      state.h = rect.height;
    }
    size();
    window.addEventListener('resize', size);

    function frame(now) {
      raf = null;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      elapsed += dt;
      draw(ctx, state.w, state.h, elapsed, state);
      if (visible && !reduced) raf = requestAnimationFrame(frame);
    }

    if (reduced) {
      // static frame for reduced motion
      draw(ctx, state.w, state.h, elapsed, state);
      return;
    }

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    }, { threshold: 0.05 }).observe(card);
  });
})();
