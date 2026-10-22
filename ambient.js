(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let stretch = 0;
  let angle = 0;
  let initialized = false;
  let frame = 0;
  let lastTime = 0;
  let scrollFrame = 0;

  const paint = () => {
    root.style.setProperty("--light-x", `${x.toFixed(1)}px`);
    root.style.setProperty("--light-y", `${y.toFixed(1)}px`);
    root.style.setProperty("--light-xp", `${(x / Math.max(innerWidth, 1) * 100).toFixed(2)}%`);
    root.style.setProperty("--light-yp", `${(y / Math.max(innerHeight, 1) * 100).toFixed(2)}%`);
    root.style.setProperty("--light-angle", `${angle.toFixed(2)}deg`);
    root.style.setProperty("--light-scale-x", (1 + stretch).toFixed(4));
    root.style.setProperty("--light-scale-y", (1 - stretch * .38).toFixed(4));
  };
  const settle = (time) => {
    frame = 0;
    const elapsed = lastTime ? clamp(time - lastTime, .1, 50) : 16.7;
    lastTime = time;
    const ease = 1 - Math.exp(-elapsed / 125);
    const dx = (targetX - x) * ease;
    const dy = (targetY - y) * ease;
    x += dx;
    y += dy;
    const resting = Math.hypot(targetX - x, targetY - y) < .15;
    const shapeEase = 1 - Math.exp(-elapsed / 105);
    const nextStretch = resting ? 0 : Math.min(Math.hypot(dx, dy) / elapsed * 1000 / 9000, .07);
    const nextAngle = resting ? 0 : clamp(dx / elapsed * 6, -6, 6);
    stretch += (nextStretch - stretch) * shapeEase;
    angle += (nextAngle - angle) * shapeEase;
    if (resting && stretch < .0003 && Math.abs(angle) < .015) {
      x = targetX;
      y = targetY;
      stretch = 0;
      angle = 0;
      paint();
      lastTime = 0;
      return;
    }
    paint();
    frame = window.requestAnimationFrame(settle);
  };
  const hide = () => {
    root.style.setProperty("--cursor-alpha", "0");
    window.cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    stretch = 0;
    angle = 0;
    initialized = false;
  };
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || reducedMotion.matches || !finePointer.matches) return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!initialized) {
      x = targetX;
      y = targetY;
      initialized = true;
      paint();
    }
    root.style.setProperty("--cursor-alpha", document.body.dataset.theme === "dark" ? ".64" : ".52");
    if (!frame && (Math.abs(targetX - x) > .15 || Math.abs(targetY - y) > .15)) {
      lastTime = performance.now();
      frame = window.requestAnimationFrame(settle);
    }
  }, { passive: true });
  document.addEventListener("mouseleave", hide);
  window.addEventListener("blur", hide);
  document.addEventListener("visibilitychange", () => { if (document.hidden) hide(); });
  reducedMotion.addEventListener("change", hide);
  finePointer.addEventListener("change", hide);

  const drift = () => {
    scrollFrame = 0;
    const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 1);
    const p = reducedMotion.matches ? 0 : clamp(window.scrollY / maxScroll, 0, 1);
    const wave = Math.sin(p * Math.PI * 2);
    const softWave = Math.sin(p * Math.PI);
    const counterWave = Math.cos(p * Math.PI * 1.6);
    const ribbonWave = Math.sin(p * Math.PI * 3.4 + .7);
    const slowWave = Math.cos(p * Math.PI * 1.15 - .35);
    const values = {
      "--scroll-glow": `${(softWave * 112).toFixed(1)}px`,
      "--scroll-drift-x": `${((p - .5) * 92 + slowWave * 18).toFixed(1)}px`,
      "--scroll-drift-y": `${(softWave * -54 + ribbonWave * 16).toFixed(1)}px`,
      "--orb-a-x": `${clamp(14 + p * 62 + wave * 7, 6, 92).toFixed(2)}%`,
      "--orb-a-y": `${clamp(30 + Math.sin(p * Math.PI * 2.4 + .2) * 21, 12, 88).toFixed(2)}%`,
      "--orb-b-x": `${clamp(60 - p * 42 + counterWave * 9, 8, 88).toFixed(2)}%`,
      "--orb-b-y": `${clamp(68 - softWave * 34 + Math.sin(p * Math.PI * 3.1 + .9) * 8, 16, 90).toFixed(2)}%`,
      "--orb-c-x": `${clamp(78 - Math.sin(p * Math.PI * 1.25 + .35) * 28 + ribbonWave * 4, 14, 94).toFixed(2)}%`,
      "--orb-c-y": `${clamp(16 + p * 52 + Math.cos(p * Math.PI * 2.2) * 10, 8, 92).toFixed(2)}%`,
      "--orb-rotate": `${((p - .5) * 24 + ribbonWave * 5).toFixed(2)}deg`,
      "--orb-scale": (1 + softWave * .12).toFixed(3),
      "--heat-condense": (1 + softWave * .22 + Math.max(ribbonWave, 0) * .08).toFixed(3),
      "--heat-bloom": `${(softWave * -8 + Math.max(ribbonWave, 0) * -4).toFixed(1)}px`
    };
    Object.entries(values).forEach(([name, value]) => root.style.setProperty(name, value));
  };
  const scheduleDrift = () => { if (!scrollFrame) scrollFrame = window.requestAnimationFrame(drift); };
  window.addEventListener("scroll", scheduleDrift, { passive: true });
  window.addEventListener("resize", () => { hide(); scheduleDrift(); }, { passive: true });
  reducedMotion.addEventListener("change", scheduleDrift);
  drift();
})();
