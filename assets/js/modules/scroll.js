/* Scroll: top progress bar and the active item of the dock. Also emits a
   throttled "scroll" event (also on resize) for other modules (timeline). */
(function (App) {
  "use strict";

  var bar, links, sections;

  function update() {
    var max = App.root.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";

    /* The active section is the last one whose top is above 40% of the viewport. */
    var line = window.scrollY + window.innerHeight * 0.4, active = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= line) active = i; });
    links.forEach(function (a, i) { a.classList.toggle("active", i === active); });

    App.emit("scroll");
  }

  App.modules.scroll = {
    init: function () {
      bar = App.$(".progress");
      links = App.$$(".dock a");
      sections = links.map(function (a) { return App.doc.getElementById(a.dataset.nav); });

      var onScroll = App.perFrame(update);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
    }
  };
})(window.App);
