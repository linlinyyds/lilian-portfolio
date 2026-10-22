(() => {
  const header = document.querySelector(".site-header");
  if (!header || header.dataset.scrollHeaderReady === "true") return;
  header.dataset.scrollHeaderReady = "true";
  header.classList.add("header-behavior");

  const topBoundary = 80;
  const hideDistance = 12;
  const showDistance = 16;
  let hidden = false;
  let travel = 0;
  let keyboardMode = false;
  let frame = 0;

  function scrollPosition() {
    const scrollingElement = document.scrollingElement || document.documentElement;
    const maximum = Math.max(0, scrollingElement.scrollHeight - window.innerHeight);
    const position = Number.isFinite(window.scrollY) ? window.scrollY : 0;
    return Math.max(0, Math.min(position, maximum));
  }

  let lastPosition = scrollPosition();

  function menuIsOpen() {
    return Boolean(header.querySelector('[aria-expanded="true"]'));
  }

  function hasKeyboardFocus() {
    return keyboardMode && header.contains(document.activeElement);
  }

  function syncFocusClass() {
    header.classList.toggle("has-keyboard-focus", hasKeyboardFocus());
  }

  function setHidden(value) {
    hidden = value;
    header.classList.toggle("is-header-hidden", hidden);
  }

  function resetTravel() {
    lastPosition = scrollPosition();
    travel = 0;
  }

  function reveal() {
    setHidden(false);
    resetTravel();
  }

  function update() {
    frame = 0;
    const position = scrollPosition();
    const delta = position - lastPosition;
    lastPosition = position;
    syncFocusClass();

    if (position <= topBoundary || menuIsOpen() || hasKeyboardFocus()) {
      setHidden(false);
      travel = 0;
      return;
    }

    // Count net travel toward the next state so tiny reversals do not flicker.
    travel = Math.max(0, travel + (hidden ? -delta : delta));
    if ((!hidden && travel >= hideDistance) || (hidden && travel >= showDistance)) {
      setHidden(!hidden);
      travel = 0;
    }
  }

  function scheduleUpdate() {
    if (!frame) frame = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", () => {
    resetTravel();
    scheduleUpdate();
  }, { passive: true });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) reveal();
    scheduleUpdate();
  });

  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    keyboardMode = true;
    syncFocusClass();
    if (hasKeyboardFocus()) reveal();
  }, true);

  document.addEventListener("pointerdown", () => {
    keyboardMode = false;
    syncFocusClass();
    resetTravel();
    scheduleUpdate();
  }, true);

  header.addEventListener("focusin", () => {
    syncFocusClass();
    reveal();
  });
  header.addEventListener("focusout", scheduleUpdate);

  const menuObserver = new MutationObserver(() => {
    if (menuIsOpen()) reveal();
    scheduleUpdate();
  });
  menuObserver.observe(header, {
    subtree: true,
    attributes: true,
    attributeFilter: ["aria-expanded"]
  });

  scheduleUpdate();
})();
