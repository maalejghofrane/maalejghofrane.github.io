/* Stack section: renders the technology cards from window.SKILLS and
   filters them by category. Re-renders on language change (category labels). */
(function (App) {
  "use strict";

  var grid, category = "all";

  function card(skill, i) {
    return '<li class="skill glass spot" style="animation-delay:' + i * 30 + 'ms">' +
      '<span class="ico"><img src="./assets/icons/' + skill.icon + '.svg" alt="" width="32" height="32" loading="lazy" decoding="async"></span>' +
      "<h3>" + skill.name + "</h3>" +
      "<small>" + App.t("lab." + skill.cat) + "</small>" +
      "</li>";
  }

  function render() {
    grid.innerHTML = window.SKILLS
      .filter(function (s) { return category === "all" || s.cat === category; })
      .map(card)
      .join("");
  }

  App.modules.stack = {
    init: function () {
      grid = App.$("#stackGrid");
      App.tabs(App.$('.tabs[aria-label="Skill categories"]'), "data-cat", function (cat) {
        category = cat;
        render();
      });
      App.on("lang", render);
    }
  };
})(window.App);
