/* AX-Channels — home page behaviour.
   1. Mobile nav panel
   2. Selected-work carousel (arrows page the track)
   3. Motion system: entrance, masked line reveals, scroll reveals, counters,
      scroll depth, inner-image parallax, magnetic buttons, trailing cursor.
   4. Brand-material slideshow in the studio section.
   5. Contact drawers — the three closing links open a right-hand panel.
   Additive: without JS, or with prefers-reduced-motion, the page renders
   complete and static. Only transform/opacity/translate are animated. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var motionOK = !reduced && "IntersectionObserver" in window;
  var finePointer = window.matchMedia("(pointer: fine)");
  var deskFine = window.matchMedia("(min-width: 1101px) and (pointer: fine)");

  if (motionOK) document.documentElement.classList.add("js-motion");

  /* ---------------------------------------------------------------- nav -- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    var setOpen = function (open) {
      nav.setAttribute("data-open", String(open));
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    var wide = window.matchMedia("(min-width: 1101px)");
    var sync = function () { if (wide.matches) setOpen(false); };
    wide.addEventListener ? wide.addEventListener("change", sync) : wide.addListener(sync);
  }

  /* -------------------------------------------- selected work carousel -- */
  var track = document.getElementById("work-track");
  var prev = document.querySelector("[data-work-prev]");
  var next = document.querySelector("[data-work-next]");

  if (track && prev && next) {
    var step = function () {
      var first = track.children[0];
      if (!first) return track.clientWidth;
      return first.getBoundingClientRect().width +
        parseFloat(getComputedStyle(track).columnGap || 0);
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
    };
    var go = function (dir) {
      track.scrollBy({ left: dir * step(), behavior: reduced ? "auto" : "smooth" });
    };
    next.addEventListener("click", function () { go(1); });
    prev.addEventListener("click", function () { go(-1); });
    track.addEventListener("scroll", function () { requestAnimationFrame(update); }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ------------------------------------------------------------ tickers -- */
  /* Both looping rows — the word marquee and the work belt — carry the same
     pause control, so one handler drives whichever are on the page. */
  document.querySelectorAll("[data-ticker-pause]").forEach(function (btn) {
    var host = btn.closest("[data-ticker]");
    if (!host) return;
    btn.addEventListener("click", function () {
      var paused = host.classList.toggle("is-paused");
      btn.setAttribute("aria-pressed", String(paused));
      btn.textContent = paused ? "Play Motion" : "Pause Motion";
    });
  });

  /* --------------------------------------------------------- work belt -- */
  /* Hovering or focusing a name stops the belt (CSS does that part) and
     raises a card describing the project. The card is positioned here rather
     than nested in the chip, because the belt's viewport clips to make the
     loop and would cut a nested card off at the band's edge. */
  var belt = document.querySelector(".belt");
  var beltCard = belt && belt.querySelector("[data-belt-card]");

  if (belt && beltCard) {
    var cardImg  = beltCard.querySelector(".belt__card-img");
    var cardType = beltCard.querySelector(".belt__card-type");
    var cardTwo  = beltCard.querySelector(".belt__card-two");
    var hideTimer = null;

    var placeCard = function (chip) {
      var c = chip.getBoundingClientRect();
      var b = belt.getBoundingClientRect();
      var w = beltCard.offsetWidth;
      var left = c.left - b.left + c.width / 2 - w / 2;
      /* keep the card inside the band even when the name is at either end */
      var edge = 12;
      left = Math.max(edge, Math.min(left, b.width - w - edge));
      beltCard.style.left = Math.round(left) + "px";
      beltCard.style.top = Math.round(c.bottom - b.top + 12) + "px";
    };

    var openCard = function (chip) {
      window.clearTimeout(hideTimer);
      var src = chip.getAttribute("data-img");
      /* the thumbnails are already on the page further down, so this is a
         cache hit rather than a new request */
      if (src && cardImg.getAttribute("src") !== src) {
        cardImg.src = src;
        cardImg.alt = chip.getAttribute("data-alt") || "";
        cardImg.width = chip.getAttribute("data-w") || 16;
        cardImg.height = chip.getAttribute("data-h") || 9;
      }
      cardType.textContent = chip.getAttribute("data-type") || "";
      cardTwo.textContent = chip.getAttribute("data-two") || "";
      beltCard.hidden = false;
      placeCard(chip);
      /* one frame between display and the class, or the transition is skipped */
      requestAnimationFrame(function () { beltCard.classList.add("is-up"); });
    };

    var closeCard = function () {
      beltCard.classList.remove("is-up");
      hideTimer = window.setTimeout(function () { beltCard.hidden = true; }, 300);
    };

    belt.querySelectorAll(".belt__chip").forEach(function (chip) {
      /* the duplicate run is out of the tab order and hidden from assistive
         tech, but it is still under the cursor, so it opens the card too */
      chip.addEventListener("mouseenter", function () { openCard(chip); });
      chip.addEventListener("focus", function () {
        /* holds the belt still while the name is tabbed to; the CSS hover
           rule only covers the viewport, so keyboard needs its own hold */
        belt.classList.add("is-held");
        openCard(chip);
      });
      chip.addEventListener("blur", function () {
        belt.classList.remove("is-held");
        closeCard();
      });
    });
    belt.addEventListener("mouseleave", closeCard);
    window.addEventListener("resize", closeCard);
  }

  /* --------------------------------------------------------- SAST clock -- */
  var clockTime = document.querySelector("[data-clock-time]");
  if (clockTime && window.Intl && Intl.DateTimeFormat) {
    try {
      var clockFmt = new Intl.DateTimeFormat("en-ZA", {
        hour: "2-digit", minute: "2-digit", hour12: false,
        timeZone: "Africa/Johannesburg"
      });
      var tickClock = function () { clockTime.textContent = clockFmt.format(new Date()); };
      tickClock();
      window.setInterval(tickClock, 30000);
    } catch (e) { /* unsupported timezone data — leave the placeholder */ }
  }

  /* ------------------------------------------------- contact drawers -- */
  /* The three closing links stay real mailto: anchors, so without JS they
     still open a composer. With JS the click is intercepted and the matching
     drawer opens instead; on submit the same address is used, with the
     answers written into the body. To post to a form service later, replace
     the body of `send` — the markup and validation do not change. */
  var drawerLinks = document.querySelectorAll("[data-form]");

  if (drawerLinks.length && typeof HTMLDialogElement === "function" &&
      HTMLDialogElement.prototype.showModal) {

    var MAIL = "info@axchannels.co.za";

    var openDrawer = function (key) {
      var dlg = document.getElementById("drawer-" + key);
      if (!dlg) return false;
      dlg.showModal();
      /* focus the first control rather than the close button */
      var first = dlg.querySelector(".ff__control");
      if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
      return true;
    };

    Array.prototype.forEach.call(drawerLinks, function (link) {
      link.addEventListener("click", function (e) {
        /* let a modified click through to the mail client */
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        if (openDrawer(link.getAttribute("data-form"))) e.preventDefault();
      });
    });

    document.querySelectorAll("[data-drawer-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var d = btn.closest("dialog"); if (d) d.close();
      });
    });

    /* clicking the backdrop closes: the dialog box itself is the only child
       that receives clicks inside, so a hit on the element is a hit outside */
    document.querySelectorAll(".drawer").forEach(function (dlg) {
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    });

    document.querySelectorAll("[data-drawer-form]").forEach(function (form) {
      var note = form.querySelector("[data-drawer-note]");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        form.classList.add("is-checked");
        /* aria-invalid tells a screen reader which fields failed; the
           underline colour alone does not */
        Array.prototype.forEach.call(form.querySelectorAll("input, select, textarea"), function (el) {
          el.setAttribute("aria-invalid", String(!el.checkValidity()));
        });
        if (!form.checkValidity()) {
          /* the first invalid *control*: a bare ":invalid" matches the name
             fieldset first, which cannot take focus, so the keyboard never
             opened on the field that needed fixing */
          var bad = form.querySelector("input:invalid, select:invalid, textarea:invalid");
          if (bad) bad.focus();
          if (note) { note.textContent = "Check the highlighted fields"; note.removeAttribute("data-state"); }
          return;
        }

        var lines = [];
        Array.prototype.forEach.call(form.elements, function (el) {
          if (!el.name) return;
          /* an unchecked box still reports a value, so it is tested first */
          if (el.type === "checkbox") {
            if (el.checked) lines.push(el.name + ":\nYes");
            return;
          }
          if (!el.value) return;
          lines.push(el.name + ":\n" + el.value);
        });

        var subject = form.getAttribute("data-subject") || "Enquiry";
        var href = "mailto:" + MAIL +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(lines.join("\n\n") + "\n\n\u2014\nSent from axchannels.co.za");

        if (note) { note.textContent = "Opening your email app\u2026"; note.setAttribute("data-state", "sent"); }
        window.location.href = href;
      });
    });
  }

  if (!motionOK) return;

  /* ------------------------------------- testimonials: smooth auto-slide -- */
  /* The card set is cloned once for a seamless loop and scrollLeft drifts
     forward each frame; hovering, touching or the Pause Reviews button
     pauses it. Clones are added before the reveal setup so they join the
     group reveal like the originals. */
  var vTrack = document.querySelector(".voices__track");
  var vBtn = document.querySelector("[data-voices-pause]");
  if (vTrack && vTrack.children.length > 1) {
    var vCount = vTrack.children.length;
    Array.prototype.slice.call(vTrack.children).forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      vTrack.appendChild(clone);
    });
    vTrack.classList.add("is-auto");

    var vDist = 0, vRaf = null, vLast = null;
    var vHover = false, vStopped = false, vManualTs = -1e9;
    var V_SPEED = 34; /* px per second */

    var vMeasure = function () {
      vDist = vTrack.children[vCount].offsetLeft - vTrack.children[0].offsetLeft;
    };
    var vStep = function (now) {
      vRaf = requestAnimationFrame(vStep);
      if (vLast === null) { vLast = now; return; }
      var dt = Math.min((now - vLast) / 1000, .1);
      vLast = now;
      if (vHover || vStopped || !vDist || now - vManualTs < 4000) return;
      var x = vTrack.scrollLeft + V_SPEED * dt;
      if (x >= vDist) x -= vDist;
      vTrack.scrollLeft = x;
    };
    var vStart = function () { if (!vRaf) { vLast = null; vRaf = requestAnimationFrame(vStep); } };
    var vStop = function () { if (vRaf) { cancelAnimationFrame(vRaf); vRaf = null; } };

    var vVisible = false;
    var vio = new IntersectionObserver(function (entries) {
      vVisible = entries[0].isIntersecting;
      vVisible ? vStart() : vStop();
    });
    vio.observe(vTrack);

    vMeasure();
    window.addEventListener("resize", vMeasure);
    vTrack.addEventListener("pointerenter", function () { vHover = true; });
    vTrack.addEventListener("pointerleave", function () { vHover = false; });
    vTrack.addEventListener("touchstart", function () { vManualTs = performance.now(); }, { passive: true });
    vTrack.addEventListener("wheel", function () { vManualTs = performance.now(); }, { passive: true });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) vStop(); else if (vVisible) vStart();
    });

    if (vBtn) {
      vBtn.addEventListener("click", function () {
        vStopped = !vStopped;
        vBtn.setAttribute("aria-pressed", String(vStopped));
        vBtn.textContent = vStopped ? "Play Reviews" : "Pause Reviews";
      });
    }
  }

  /* ------------------------------------------- masked line reveals ------ */
  /* Big editorial headings reveal line-by-line through masks (split at
     runtime, honouring <br>, and reverted to the original markup after the
     animation so the DOM stays clean for assistive tech and selection). */
  var splitData = new Map();

  var splitLines = function (el) {
    var original = el.innerHTML;
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          var s = document.createElement("span");
          s.className = "w";
          s.textContent = part;
          frag.appendChild(s);
        });
        el.replaceChild(frag, n);
      } else if (n.nodeType === 1 && n.tagName !== "BR") {
        /* inline elements (accent .mark spans) travel as one word */
        var wrap = document.createElement("span");
        wrap.className = "w";
        el.replaceChild(wrap, n);
        wrap.appendChild(n);
      }
    });
    /* Rebuild line by line, keeping the original spacing (no space is
       invented before punctuation that follows an accent span). */
    var lines = [], top = null;
    Array.prototype.forEach.call(el.childNodes, function (n) {
      if (n.nodeType === 1 && n.classList.contains("w")) {
        if (n.offsetTop !== top) { lines.push(""); top = n.offsetTop; }
        lines[lines.length - 1] += n.innerHTML;
      } else if (n.nodeType === 3 && lines.length) {
        lines[lines.length - 1] += " ";
      }
    });
    if (lines.length < 1) { el.innerHTML = original; return; }
    el.innerHTML = lines.map(function (ws, i) {
      return '<span class="rl"><span class="rl-in" style="--ln:' + i + '">' + ws.trim() + "</span></span>";
    }).join("");
    el.classList.add("split-done");
    splitData.set(el, { html: original, lines: lines.length, armed: false });
  };

  var armSplitRevert = function (el) {
    var d = splitData.get(el);
    if (!d || d.armed) return;
    d.armed = true;
    window.setTimeout(function () {
      el.innerHTML = d.html;
      el.classList.remove("split-done");
      splitData.delete(el);
    }, 1000 + d.lines * 90);
  };

  /* ------------------------------------------------------ reveal setup -- */
  var STAGGER = 0.07;

  var setupReveals = function () {
    /* .studio__title is deliberately absent: splitLines treats an inline
       element as a single unbreakable word, which would stop the statement's
       second tone from wrapping at all. It reveals as a block instead. */
    document.querySelectorAll(".sec-head .h2, .cta__title").forEach(splitLines);

    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      group.classList.add("m-group");
      Array.prototype.forEach.call(group.children, function (child, i) {
        if (child.classList.contains("split-done")) return;
        child.classList.add("m-child");
        child.style.setProperty("--d", (Math.min(i, 7) * STAGGER).toFixed(2) + "s");
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.classList.contains("m-group")) {
          Array.prototype.forEach.call(el.children, function (child) {
            child.classList.add("is-in");
            if (child.classList.contains("split-done")) armSplitRevert(child);
          });
        } else {
          el.classList.add("is-in");
          if (el.classList.contains("split-done")) armSplitRevert(el);
        }
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -7% 0px" });

    document.querySelectorAll("[data-reveal], .m-group").forEach(function (el) { io.observe(el); });
  };

  /* ------------------------------------------------------ hero entrance -- */
  var started = false;
  var kick = function () {
    if (started) return;
    started = true;
    setupReveals(); // measured with the settled webfont
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add("is-in");
      });
    });
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(kick, kick);
  window.setTimeout(kick, 250);

  /* ---------------------------------------------------------- counters -- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    var runCount = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var t0 = null, dur = 900;
      /* The suffix is its own element so the stats panel can hang it off the
         numeral's cap line. The markup may already supply it — that is what
         keeps the panel correct with JS off and under reduced motion — so
         only build it when it is missing, and write the digits alone. */
      var digits;
      if (suffix && !el.querySelector(".num__suffix")) {
        el.textContent = "";
        digits = el.appendChild(document.createTextNode(String(target)));
        var sfx = document.createElement("span");
        sfx.className = "num__suffix";
        sfx.textContent = suffix;
        el.appendChild(sfx);
      } else if (el.firstChild && el.firstChild.nodeType === 3) {
        digits = el.firstChild;
      } else {
        digits = el.insertBefore(document.createTextNode(""), el.firstChild);
      }
      var tick = function (now) {
        if (t0 === null) t0 = now;
        var p = Math.min((now - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        digits.nodeValue = String(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------------------------------------------- scroll depth layers -- */
  var hero = document.querySelector(".hero");
  var workSection = document.querySelector(".work");
  var root = document.documentElement;
  var plxImgs = Array.prototype.map.call(
    document.querySelectorAll(".project__media img, .studio__figure img"),
    function (img) { return { img: img, frame: img.closest(".project__media, .studio__figure") }; }
  );

  if (hero) {
    var ticking = false;
    var apply = function () {
      ticking = false;
      if (!deskFine.matches) {
        root.style.removeProperty("--par-portrait");
        root.style.removeProperty("--par-body");
        root.style.removeProperty("--par-fade");
        root.style.removeProperty("--par-wm");
        return;
      }
      var vh = window.innerHeight;
      var y = window.scrollY;
      var heroH = hero.offsetHeight || 1;
      if (y <= heroH) {
        var p = y / heroH;
        root.style.setProperty("--par-portrait", (p * heroH * 0.10).toFixed(1) + "px");
        root.style.setProperty("--par-body", (p * heroH * 0.05).toFixed(1) + "px");
        root.style.setProperty("--par-fade", (1 - p * 0.35).toFixed(3));
      }
      if (workSection) {
        var r = workSection.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          var wp = 1 - (r.top + r.height / 2) / (vh / 2 + r.height / 2);
          root.style.setProperty("--par-wm", (wp * 36).toFixed(1) + "px");
        }
      }
      plxImgs.forEach(function (o) {
        var fr = o.frame.getBoundingClientRect();
        if (fr.top < vh && fr.bottom > 0) {
          var off = (fr.top + fr.height / 2 - vh / 2) / vh;
          o.img.style.setProperty("--plx", (off * -22).toFixed(1) + "px");
        }
      });
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }, { passive: true });
    window.addEventListener("resize", apply);
    apply();
  }

  /* ----------------------------------------------- hero pointer parallax -- */
  /* The hero's atmosphere layers drift a few pixels toward the pointer
     (ring ±6px, washes ±4px, cloud light ±2.5px — set in CSS). Event-driven
     and rAF-coalesced: no continuous loop runs. Desktop fine pointers only. */
  if (hero && deskFine.matches) {
    var pmx = 0, pmy = 0, pRaf = null;
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      pmx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - .5) * 2));
      pmy = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - .5) * 2));
      if (!pRaf) pRaf = requestAnimationFrame(function () {
        pRaf = null;
        hero.style.setProperty("--mx", pmx.toFixed(3));
        hero.style.setProperty("--my", pmy.toFixed(3));
      });
    }, { passive: true });
    hero.addEventListener("pointerleave", function () {
      hero.style.setProperty("--mx", "0");
      hero.style.setProperty("--my", "0");
    });
  }

  /* --------------------------------------------------- magnetic buttons -- */
  if (finePointer.matches) {
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) * 0.18;
        var dy = (e.clientY - r.top - r.height / 2) * 0.3;
        btn.style.translate =
          Math.max(-8, Math.min(8, dx)).toFixed(1) + "px " +
          Math.max(-6, Math.min(6, dy)).toFixed(1) + "px";
      });
      btn.addEventListener("pointerleave", function () { btn.style.translate = ""; });
    });
  }

  /* ----------------------------------------------------- hero smoke trail -- */
  /* A soft cyan/magenta glow drifts after the pointer inside the hero like
     smoke: heavily blurred, screen-blended, lagging well behind the cursor
     and fading out on leave. The native cursor is untouched. */
  if (finePointer.matches && hero) {
    var smoke = document.querySelector(".hero__smoke");
    if (smoke) {
      var sx = 0, sy = 0, stx = 0, sty = 0, sRaf = null, sOn = false;
      var sLoop = function () {
        sx += (stx - sx) * 0.06;
        sy += (sty - sy) * 0.06;
        smoke.style.transform =
          "translate3d(" + sx.toFixed(1) + "px," + sy.toFixed(1) + "px,0) translate(-50%,-50%)";
        if (!sOn && Math.abs(stx - sx) < 0.5 && Math.abs(sty - sy) < 0.5) { sRaf = null; return; }
        sRaf = requestAnimationFrame(sLoop);
      };
      var sWake = function () { if (!sRaf) sRaf = requestAnimationFrame(sLoop); };

      hero.addEventListener("pointerenter", function (e) {
        var r = hero.getBoundingClientRect();
        sx = stx = e.clientX - r.left;
        sy = sty = e.clientY - r.top;
        sOn = true;
        hero.classList.add("smoke-on");
        sWake();
      });
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        stx = e.clientX - r.left;
        sty = e.clientY - r.top;
        sWake();
      }, { passive: true });
      hero.addEventListener("pointerleave", function () {
        sOn = false;
        hero.classList.remove("smoke-on");
      });
      document.addEventListener("visibilitychange", function () {
        if (document.hidden && sRaf) { cancelAnimationFrame(sRaf); sRaf = null; }
      });
    }
  }

  /* ------------------------------------------ brand-material slideshow -- */
  /* Cross-fades the studio frame through the brand-material photographs.
     The markup ships with the first slide already carrying .is-active, so
     without JS — or with prefers-reduced-motion, where motionOK is false —
     the frame simply shows that one photograph and nothing moves. */
  var slideBox = document.querySelector("[data-slides]");

  if (slideBox && motionOK) {
    var slides = Array.prototype.slice.call(slideBox.querySelectorAll(".studio__slide"));

    if (slides.length > 1) {
      var HOLD = 3200;               /* time a slide is held, fade included */
      var cur = 0;
      var timer = null;

      var show = function (next) {
        slides.forEach(function (img) { img.classList.remove("is-prev"); });
        /* the slide being replaced stays opaque one layer down while the new
           one fades up over it, so the frame is covered the whole way */
        slides[cur].classList.remove("is-active");
        slides[cur].classList.add("is-prev");
        slides[next].classList.add("is-active");
        cur = next;
      };

      var advance = function () { show((cur + 1) % slides.length); };

      /* Fetch the slides after the first one the first time the frame comes
         into view — not on page load, which cost every phone ~250KB for
         a slideshow most visitors had not reached. The first slide's hold
         leaves time for the next to arrive before its cross-fade. */
      var primed = false;
      var start = function () {
        if (!primed) {
          slides.forEach(function (img, i) { if (i > 0) { img.loading = "eager"; } });
          primed = true;
        }
        if (timer === null) timer = setInterval(advance, HOLD);
      };
      var stop = function () {
        if (timer !== null) { clearInterval(timer); timer = null; }
      };

      /* Only run while the frame is on screen, and never in a hidden tab. */
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !document.hidden) { start(); } else { stop(); }
        });
      }, { threshold: 0.25 });
      vio.observe(slideBox);

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) { stop(); }
      });

      /* Holding the pointer still on the frame pauses it, so a visitor can
         look at one material without it sliding away. */
      slideBox.addEventListener("pointerenter", stop);
      slideBox.addEventListener("pointerleave", function () {
        if (slideBox.getBoundingClientRect().top < window.innerHeight) { start(); }
      });
    }
  }
})();
