(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let initialized = false;
  let frame = 0;
  let lastTime = 0;
  let fadeTimer = 0;
  let scrollFrame = 0;

  const paint = () => {
    root.style.setProperty("--light-x", `${x.toFixed(1)}px`);
    root.style.setProperty("--light-y", `${y.toFixed(1)}px`);
  };
  const settle = (time) => {
    frame = 0;
    const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16.7;
    lastTime = time;
    const ease = 1 - Math.exp(-elapsed / 65);
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    if (Math.hypot(targetX - x, targetY - y) < .15) {
      x = targetX;
      y = targetY;
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
    window.clearTimeout(fadeTimer);
    frame = 0;
    lastTime = 0;
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
    root.style.setProperty("--cursor-alpha", document.body.dataset.theme === "dark" ? ".38" : ".32");
    if (!frame && (Math.abs(targetX - x) > .15 || Math.abs(targetY - y) > .15)) {
      lastTime = 0;
      frame = window.requestAnimationFrame(settle);
    }
    window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(hide, 900);
  }, { passive: true });
  document.addEventListener("mouseleave", hide);
  window.addEventListener("blur", hide);
  document.addEventListener("visibilitychange", () => { if (document.hidden) hide(); });
  reducedMotion.addEventListener("change", hide);
  finePointer.addEventListener("change", hide);

  const drift = () => {
    scrollFrame = 0;
    const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 1);
    const progress = Math.max(0, Math.min(window.scrollY / maxScroll, 1));
    root.style.setProperty("--scroll-drift-x", reducedMotion.matches ? "0px" : `${((progress - .5) * 12).toFixed(1)}px`);
    root.style.setProperty("--scroll-drift-y", reducedMotion.matches ? "0px" : `${(Math.sin(progress * Math.PI) * -10).toFixed(1)}px`);
  };
  const scheduleDrift = () => { if (!scrollFrame) scrollFrame = window.requestAnimationFrame(drift); };
  window.addEventListener("scroll", scheduleDrift, { passive: true });
  window.addEventListener("resize", () => { hide(); scheduleDrift(); }, { passive: true });
  reducedMotion.addEventListener("change", scheduleDrift);
  drift();
})();
