/* Scroll reveal: adds .in to every .reveal when it enters the viewport and
   runs the number counters ([data-count], optional data-suffix) inside it. */
(function (App) {
  "use strict";

  var COUNT_MS = 1200;

  function count(el) {
    var end = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || "";
    if (App.reduceMotion) { el.textContent = end + suffix; return; }

    var start = performance.now();
    (function step(now) {
      var p = Math.min((now - start) / COUNT_MS, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix; /* ease-out cubic */
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  function show(el) {
    el.classList.add("in");
    App.$$("[data-count]", el).forEach(count);
  }

  App.modules.reveal = {
    init: function () {
      var items = App.$$(".reveal");
      items.forEach(function (el, i) { el.style.setProperty("--d", (i % 4) * 80 + "ms"); }); /* stagger */

      if (!("IntersectionObserver" in window)) { items.forEach(show); return; }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          show(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      items.forEach(function (el) { observer.observe(el); });
    }
  };
})(window.App);
