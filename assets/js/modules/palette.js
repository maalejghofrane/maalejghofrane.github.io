/* Command palette (Ctrl/⌘ + K): fuzzy-free filter over a list of commands.
   Command labels are i18n keys, so the list follows the current language. */
(function (App) {
  "use strict";

  var box, input, list, selected = 0, shown = [];

  function goTo(id) { return function () { App.go(id); }; }

  /* [i18n key, hint shown on the right, action] */
  var COMMANDS = [
    ["cmd.home",     "#home",     goTo("home")],
    ["cmd.about",    "#about",    goTo("about")],
    ["cmd.stack",    "#stack",    goTo("stack")],
    ["cmd.projects", "#projects", goTo("projects")],
    ["cmd.journey",  "#journey",  goTo("journey")],
    ["cmd.contact",  "#contact",  goTo("contact")],
    ["cmd.theme",    "theme",     function () { App.modules.theme.toggle(); }],
    ["cmd.mail",     "mail",      function () { location.href = "mailto:" + window.SITE.email; }],
    ["cmd.linkedin", "in",        function () { window.open(window.SITE.linkedin, "_blank", "noopener"); }]
  ];

  function render() {
    var query = input.value.trim().toLowerCase();
    shown = COMMANDS.filter(function (c) { return !query || App.t(c[0]).toLowerCase().indexOf(query) > -1; });
    selected = Math.min(selected, Math.max(shown.length - 1, 0));

    list.innerHTML = shown.length
      ? shown.map(function (c, i) {
          return '<li role="option" data-i="' + i + '" aria-selected="' + (i === selected) + '">' + App.t(c[0]) + "<small>" + c[1] + "</small></li>";
        }).join("")
      : '<li aria-selected="false">' + App.t("pal.none") + "</li>";
  }

  function open() { box.hidden = false; input.value = ""; selected = 0; render(); input.focus(); }
  function close() { box.hidden = true; }
  function run(i) { var c = shown[i]; if (c) { close(); c[2](); } }

  function onKey(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      box.hidden ? open() : close();
      return;
    }
    if (box.hidden) return;

    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { e.preventDefault(); selected = (selected + 1) % shown.length; render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); selected = (selected - 1 + shown.length) % shown.length; render(); }
    else if (e.key === "Enter") { e.preventDefault(); run(selected); }
  }

  App.modules.palette = {
    init: function () {
      box = App.$("#palette");
      input = App.$("#paletteInput");
      list = App.$("#paletteList");

      App.$("#openPalette").addEventListener("click", open);
      input.addEventListener("input", function () { selected = 0; render(); });
      list.addEventListener("click", function (e) { var li = e.target.closest("li[data-i]"); if (li) run(+li.dataset.i); });
      box.addEventListener("mousedown", function (e) { if (e.target === box) close(); });
      App.doc.addEventListener("keydown", onKey);
      App.on("lang", render);
    }
  };
})(window.App);
