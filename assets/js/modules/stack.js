/* Stack section: renders the technology cards from window.SKILLS, filters
   them by category and splits them into pages of PAGE_SIZE.
   Re-renders on language change (category labels, pager labels). */
(function (App) {
  "use strict";

  var PAGE_SIZE = 8;
  var grid, pager, category = "all", page = 1;

  var ICON_PREV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  function card(skill, i) {
    return '<li class="skill glass spot" style="animation-delay:' + i * 30 + 'ms">' +
      '<span class="ico"><img src="./assets/icons/' + skill.icon + '.svg" alt="" width="32" height="32" loading="lazy" decoding="async"></span>' +
      "<h3>" + skill.name + "</h3>" +
      "<small>" + App.t("lab." + skill.cat) + "</small>" +
      "</li>";
  }

  function renderPager(pages) {
    grid.classList.toggle("is-paged", pages > 1);
    pager.hidden = pages <= 1;
    if (pages <= 1) { pager.innerHTML = ""; return; }

    var numbers = "";
    for (var n = 1; n <= pages; n++) {
      numbers += '<li><button type="button" class="pg-num" data-page="' + n + '" aria-label="' + App.t("pager.page") + " " + n + '"' +
        (n === page ? ' aria-current="page"' : "") + ">" + n + "</button></li>";
    }

    pager.setAttribute("aria-label", App.t("pager.label"));
    pager.innerHTML =
      '<button type="button" class="pg-btn" data-page="' + (page - 1) + '" aria-label="' + App.t("pager.prev") + '"' + (page === 1 ? " disabled" : "") + ">" + ICON_PREV + "</button>" +
      '<ol class="pg-list">' + numbers + "</ol>" +
      '<button type="button" class="pg-btn" data-page="' + (page + 1) + '" aria-label="' + App.t("pager.next") + '"' + (page === pages ? " disabled" : "") + ">" + ICON_NEXT + "</button>";
  }

  function render() {
    var items = window.SKILLS.filter(function (s) { return category === "all" || s.cat === category; });
    var pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    page = Math.min(page, pages);

    grid.innerHTML = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(card).join("");
    renderPager(pages);
  }

  App.modules.stack = {
    init: function () {
      grid = App.$("#stackGrid");
      pager = App.$("#stackPager");

      App.tabs(App.$('.tabs[aria-label="Skill categories"]'), "data-cat", function (cat) {
        category = cat;
        page = 1;
        render();
      });

      pager.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-page]");
        if (!btn || btn.disabled) return;
        page = parseInt(btn.dataset.page, 10);
        render();
        var target = pager.querySelector('[aria-current="page"]');
        if (target && App.doc.activeElement && pager.contains(App.doc.activeElement)) target.focus();
      });

      App.on("lang", render);
    }
  };
})(window.App);
