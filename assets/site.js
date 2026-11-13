/* My Battery site: small progressive enhancements. Every page is complete without this file. */
(() => {
  const d = document, root = d.documentElement;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");
  if (!calm) root.classList.add("motion");
  const $$ = (s, r = d) => [...r.querySelectorAll(s)];

  // Scroll reveal, only when motion is welcome.
  if (!calm && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".section-head, .tile, .panel, details, .gallery figure, .promise li, .article h2, .press-grid > *").filter((el) => !el.closest(".how")).forEach((el) => {
      el.style.setProperty("--i", Math.min([...el.parentElement.children].indexOf(el), 6));
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // How it works: the phone shows the step in view.
  const how = d.querySelector(".how");
  if ("IntersectionObserver" in window && how) {
    const steps = $$(".steps li", how), shots = $$(".how-phone img", how);
    const set = (i) => { steps.forEach((s, j) => s.classList.toggle("active", j === i)); shots.forEach((im, j) => im.classList.toggle("on", j === i)); };
    set(0);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) set(steps.indexOf(e.target)); }), { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach((s) => io.observe(s));
  }

  // Pause the hero's loops when it is out of sight or the tab is hidden.
  const art = d.querySelector(".hero-art");
  if (art && "IntersectionObserver" in window) new IntersectionObserver((es) => art.classList.toggle("off", !es[0].isIntersecting)).observe(art);
  d.addEventListener("visibilitychange", () => root.classList.toggle("paused", d.hidden));
})();
