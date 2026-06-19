window.hookRevealResize = function (engine) {
  const resize = () => engine.resize();
  window.addEventListener("resize", resize);
  [100, 400, 1200].forEach((ms) => setTimeout(resize, ms));
  try {
    const reveal = window.parent && window.parent.Reveal;
    if (reveal && typeof reveal.on === "function") {
      reveal.on("slidechanged", resize);
      reveal.on("resize", resize);
    }
  } catch (_) {}
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        resize();
        setTimeout(resize, 150);
      }
    }, { threshold: 0.05 }).observe(document.documentElement);
  }
};
