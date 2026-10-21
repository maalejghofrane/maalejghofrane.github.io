/* Journey section: Experience/Education filter and the scroll-driven fill
   of the timeline line (CSS variable --p, 0..1). */
(function (App) {
  "use strict";

  var timeline;

  function updateFill() {
    var rect = timeline.getBoundingClientRect();
    var progress = (window.innerHeight * 0.6 - rect.top) / rect.height;
    timeline.style.setProperty("--p", Math.max(0, Math.min(1, progress)).toFixed(3));
  }

  App.modules.timeline = {
    init: function () {
      timeline = App.$("#timeline");

      App.tabs(App.$('.tabs[aria-label="Timeline filter"]'), "data-filter", function (type) {
        App.$$(".t-item", timeline).forEach(function (item) {
          item.hidden = type !== "all" && item.dataset.type !== type;
        });
        updateFill();
      });

      App.on("scroll", updateFill);
    }
  };
})(window.App);
