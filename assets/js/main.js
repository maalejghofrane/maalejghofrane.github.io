/* Boot: initialises every module in a fixed order.
   Modules subscribe to events in init(), so `lang` must come last: it fires
   the first "lang" event that renders translated content everywhere.
   `timeline` must precede `scroll`, which emits the first "scroll" event. */
(function (App) {
  "use strict";

  var ORDER = [
    "theme", "typing", "stack", "timeline", "effects", "reveal",
    "scroll", "network", "palette", "contact", "lang"
  ];

  ORDER.forEach(function (name) { App.modules[name].init(); });

  App.$("#year").textContent = new Date().getFullYear();
})(window.App);
