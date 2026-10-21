/* Typing effect for the hero role line. Restarts whenever the language changes. */
(function (App) {
  "use strict";

  var TYPE_MS = 65, DELETE_MS = 28, HOLD_MS = 1800;
  var el, timer, index, chars, deleting;

  function tick() {
    var words = App.t("roles");
    var word = words[index % words.length];

    el.textContent = word.slice(0, chars);

    if (!deleting && chars === word.length) {
      deleting = true;
      timer = setTimeout(tick, HOLD_MS);
      return;
    }
    if (deleting && chars === 0) {
      deleting = false;
      index = (index + 1) % words.length;
    }
    chars += deleting ? -1 : 1;
    timer = setTimeout(tick, deleting ? DELETE_MS : TYPE_MS);
  }

  function restart() {
    clearTimeout(timer);
    index = 0; chars = 0; deleting = false;
    if (App.reduceMotion) { el.textContent = App.t("roles")[0]; return; }
    tick();
  }

  App.modules.typing = {
    init: function () {
      el = App.$("#typed");
      App.on("lang", restart);
    }
  };
})(window.App);
