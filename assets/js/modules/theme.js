/* Theme: dark/light toggle. The initial value is applied by the inline script
   in index.html <head> to avoid a flash; this module handles changes. */
(function (App) {
  "use strict";

  var COLORS = { dark: "#07111f", light: "#f3f8ff" };

  function set(theme) {
    App.root.dataset.theme = theme;
    App.store.set("theme", theme);
    var meta = App.$('meta[name="theme-color"]');
    if (meta) meta.content = COLORS[theme];
    App.emit("theme", theme);
  }

  function toggle() { set(App.root.dataset.theme === "light" ? "dark" : "light"); }

  App.modules.theme = {
    toggle: toggle,
    init: function () { App.$("#themeBtn").addEventListener("click", toggle); }
  };
})(window.App);
