(() => {
  if (new URLSearchParams(window.location.search).get("fx") === "off") return;
  if (document.documentElement.dataset.clickFeedbackReady === "true") return;
  document.documentElement.dataset.clickFeedbackReady = "true";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const svgNamespace = "http://www.w3.org/2000/svg";
  const excluded = 'input, textarea, select, option, summary, label, video, audio, iframe, [disabled], [aria-disabled="true"], [inert], [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="slider"], [role="spinbutton"], [role="combobox"], [role="switch"]';
  const interactive = 'a, button, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';
  const effects = new Set();
  const queuedFrames = new Set();
  let candidate = null;
  let revision = 0;
  let nextId = 0;
  let layer = null;

  const selectionIsClear = () => {
    const selection = window.getSelection();
    return !selection || selection.isCollapsed;
  };
  const isEnabled = () => !reducedMotion.matches && !document.hidden;
  const targetElement = (target) => target?.closest ? target : target?.parentElement;
  const shouldExclude = (target) => !target || Boolean(target.closest(excluded));
  const cancelCandidate = () => {
    candidate = null;
    revision += 1;
  };

  function removeEffect(effect) {
    window.clearTimeout(effect.timeout);
    effect.node.remove();
    effects.delete(effect);
  }

  function clearFeedback() {
    cancelCandidate();
    queuedFrames.forEach((frame) => window.cancelAnimationFrame(frame));
    queuedFrames.clear();
    [...effects].forEach(removeEffect);
  }

  function svgElement(tag, attributes = {}) {
    const element = document.createElementNS(svgNamespace, tag);
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    return element;
  }

  function emit(x, y, compact) {
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "click-feedback-layer";
      layer.setAttribute("aria-hidden", "true");
      layer.inert = true;
      document.body.appendChild(layer);
    }
    if (effects.size >= 4) removeEffect(effects.values().next().value);

    const node = document.createElement("div");
    node.className = `click-feedback${compact ? " is-compact" : ""}`;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    const svg = svgElement("svg", { viewBox: "0 0 200 200", focusable: "false" });
    const defs = svgElement("defs");
    const gradientId = `click-feedback-gradient-${++nextId}`;
    const gradient = svgElement("linearGradient", { id: gradientId, x1: "0%", y1: "12%", x2: "100%", y2: "88%" });
    [
      ["0%", "click-feedback-mint"],
      ["52%", "click-feedback-blue"],
      ["100%", "click-feedback-rose"]
    ].forEach(([offset, className]) => gradient.appendChild(svgElement("stop", { offset, class: className })));
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // An absolute document reference also works on pages with <base href="../../">.
    const documentUrl = new URL(window.location.href);
    documentUrl.hash = "";
    const stroke = `url("${documentUrl.href}#${gradientId}")`;
    const main = svgElement("circle", { class: "click-feedback-wave is-main", cx: "100", cy: "100", r: "9", stroke, fill: "none" });
    const echo = svgElement("circle", { class: "click-feedback-wave is-echo", cx: "100", cy: "100", r: "9", stroke, fill: "none" });
    svg.appendChild(main);
    svg.appendChild(echo);
    node.appendChild(svg);

    const effect = { node, timeout: 0 };
    effects.add(effect);
    main.addEventListener("animationend", () => removeEffect(effect), { once: true });
    main.addEventListener("animationcancel", () => removeEffect(effect), { once: true });
    effect.timeout = window.setTimeout(() => removeEffect(effect), 1150);
    layer.appendChild(node);
  }

  document.addEventListener("pointerdown", (event) => {
    cancelCandidate();
    if (!isEnabled() || event.isPrimary === false || event.button !== 0 || !selectionIsClear()) return;
    const target = targetElement(event.target);
    if (shouldExclude(target)) return;
    if (event.clientX < 0 || event.clientY < 0 || event.clientX >= document.documentElement.clientWidth || event.clientY >= window.innerHeight) return;
    candidate = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      movementLimit: target.closest("#projectGallery") ? 4 : 7,
      started: performance.now(),
      control: target.closest(interactive),
      downEvent: event
    };
  }, true);

  document.addEventListener("pointermove", (event) => {
    if (!candidate || event.pointerId !== candidate.id) return;
    if (Math.hypot(event.clientX - candidate.x, event.clientY - candidate.y) >= candidate.movementLimit) cancelCandidate();
  }, { capture: true, passive: true });

  document.addEventListener("pointerup", (event) => {
    const completed = candidate;
    candidate = null;
    if (!completed || !isEnabled() || event.pointerId !== completed.id || event.isPrimary === false || event.button !== 0) return;
    if (performance.now() - completed.started >= 700 || Math.hypot(event.clientX - completed.x, event.clientY - completed.y) >= completed.movementLimit) return;
    const target = targetElement(event.target);
    if (shouldExclude(target) || target.closest(interactive) !== completed.control) return;
    const completedRevision = revision;
    const frame = window.requestAnimationFrame(() => {
      queuedFrames.delete(frame);
      if (revision !== completedRevision || !isEnabled() || !selectionIsClear() || event.defaultPrevented || completed.downEvent.defaultPrevented) return;
      emit(event.clientX, event.clientY, Boolean(completed.control));
    });
    queuedFrames.add(frame);
  }, true);

  document.addEventListener("pointercancel", cancelCandidate, true);
  document.addEventListener("dragstart", cancelCandidate, true);
  document.addEventListener("scroll", cancelCandidate, { capture: true, passive: true });
  document.addEventListener("selectionchange", () => { if (!selectionIsClear()) clearFeedback(); });
  window.addEventListener("blur", clearFeedback);
  document.addEventListener("visibilitychange", () => { if (document.hidden) clearFeedback(); });
  reducedMotion.addEventListener("change", clearFeedback);
})();
