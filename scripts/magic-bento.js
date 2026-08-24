(function () {
  const DEFAULTS = {
    textAutoHide: true,
    enableStars: true,
    enableSpotlight: true,
    enableBorderGlow: true,
    enableTilt: false,
    enableMagnetism: false,
    clickEffect: true,
    spotlightRadius: 400,
    particleCount: 12,
    glowColor: "5, 195, 222",
    disableAnimations: false
  };

  const config = Object.assign({}, DEFAULTS, window.MagicBentoConfig || {});
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const animationsDisabled = config.disableAnimations || isMobile;

  const gsapRef = window.gsap;
  if (!gsapRef) {
    console.error("Magic Bento: GSAP library is required for animations. Please include it before this script.");
    return;
  }

  const parseRGB = (rgb) => {
    const parts = String(rgb)
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => Number.isFinite(n));
    if (parts.length !== 3) {
      return [5, 195, 222];
    }
    return parts;
  };

  const [r, g, b] = parseRGB(config.glowColor);
  document.documentElement.style.setProperty("--mb-glow-rgb", `${r}, ${g}, ${b}`);

  const selector = [
    "[data-magic-bento='true']",
    ".bento-card",
    ".glass-card",
    ".dept-card",
    ".board-card",
    ".member-card",
    "article.glass",
    ".glass.rounded-2xl",
    ".glass.rounded-3xl"
  ].join(",");

  const candidates = Array.from(document.querySelectorAll(selector));
  const cards = candidates.filter((el) => {
    const forced = el.dataset.magicBento === "true";
    if (!forced && (el.closest("header") || el.closest("nav") || el.closest("footer"))) return false;
    if (el.dataset.magicBentoIgnore === "true") return false;
    if (forced) return true;
    const rect = el.getBoundingClientRect();
    return rect.width > 120 && rect.height > 70;
  });

  cards.forEach((card) => {
    card.classList.add("magic-bento-card");
    if (config.enableBorderGlow) {
      card.classList.add("magic-bento-card--border-glow");
    }
  });

  const updateGlow = (card, x, y, intensity) => {
    const rect = card.getBoundingClientRect();
    const rx = ((x - rect.left) / rect.width) * 100;
    const ry = ((y - rect.top) / rect.height) * 100;
    card.style.setProperty("--mb-glow-x", `${rx}%`);
    card.style.setProperty("--mb-glow-y", `${ry}%`);
    card.style.setProperty("--mb-glow-intensity", String(Math.max(0, Math.min(1, intensity))));
    card.style.setProperty("--mb-glow-radius", `${config.spotlightRadius}px`);
  };

  const createParticle = (card, x, y) => {
    const p = document.createElement("div");
    p.className = "magic-bento-particle";
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    card.appendChild(p);
    return p;
  };

  const runParticles = (card) => {
    if (!config.enableStars || animationsDisabled) return;
    const rect = card.getBoundingClientRect();
    const count = Math.min(24, Math.max(0, Number(config.particleCount) || 0));
    for (let i = 0; i < count; i += 1) {
      const p = createParticle(card, Math.random() * rect.width, Math.random() * rect.height);
      gsapRef.fromTo(
        p,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsapRef.to(p, {
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
              opacity: 0,
              scale: 0,
              duration: 1.2 + Math.random() * 0.8,
              ease: "power2.out",
              onComplete: () => p.remove()
            });
          }
        }
      );
    }
  };

  const runRipple = (card, clientX, clientY) => {
    if (!config.clickEffect || animationsDisabled) return;
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height)
    );

    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: absolute;
      width: ${maxDistance * 2}px;
      height: ${maxDistance * 2}px;
      border-radius: 50%;
      left: ${x - maxDistance}px;
      top: ${y - maxDistance}px;
      pointer-events: none;
      z-index: 3;
      background: radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.35) 0%, rgba(${r}, ${g}, ${b}, 0.18) 35%, transparent 72%);
    `;
    card.appendChild(ripple);

    gsapRef.fromTo(
      ripple,
      { scale: 0, opacity: 1 },
      {
        scale: 1,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      }
    );
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("magic-bento-card--active");
      runParticles(card);
      if (!animationsDisabled && config.enableTilt) {
        gsapRef.to(card, {
          rotateX: 4,
          rotateY: 4,
          duration: 0.25,
          ease: "power2.out",
          transformPerspective: 1000
        });
      }
    });

    card.addEventListener("mousemove", (e) => {
      if (animationsDisabled) return;
      updateGlow(card, e.clientX, e.clientY, 1);

      const rect = card.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (config.enableTilt) {
        const rx = ((my - cy) / cy) * -6;
        const ry = ((mx - cx) / cx) * 6;
        gsapRef.to(card, {
          rotateX: rx,
          rotateY: ry,
          duration: 0.12,
          ease: "power2.out",
          transformPerspective: 1000
        });
      }

      if (config.enableMagnetism) {
        gsapRef.to(card, {
          x: (mx - cx) * 0.03,
          y: (my - cy) * 0.03,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("magic-bento-card--active");
      if (!animationsDisabled) {
        gsapRef.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.25, ease: "power2.out" });
      }
      card.style.setProperty("--mb-glow-intensity", "0");
    });

    card.addEventListener("click", (e) => runRipple(card, e.clientX, e.clientY));
  });

  if (config.enableSpotlight && !animationsDisabled && cards.length) {
    const spotlight = document.createElement("div");
    spotlight.className = "magic-bento-spotlight";
    document.body.appendChild(spotlight);

    const onMouseMove = (e) => {
      let minDistance = Number.POSITIVE_INFINITY;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        minDistance = Math.min(minDistance, distance);

        const radius = Number(config.spotlightRadius) || 400;
        const glow = Math.max(0, 1 - distance / radius);
        updateGlow(card, e.clientX, e.clientY, glow);
      });

      gsapRef.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" });
      gsapRef.to(spotlight, {
        opacity: minDistance < (Number(config.spotlightRadius) || 400) ? 0.8 : 0,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const onMouseLeave = () => {
      gsapRef.to(spotlight, { opacity: 0, duration: 0.25, ease: "power2.out" });
      cards.forEach((card) => card.style.setProperty("--mb-glow-intensity", "0"));
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
  }
})();
