/* Language: translations (window.I18N), the language menu, and RTL for Arabic.
   Text is translated through data-i18n* attributes:
     data-i18n="key"       -> textContent
     data-i18n-html="key"  -> innerHTML
     data-i18n-ph="key"    -> placeholder
     data-i18n-aria="key"  -> aria-label
   Other modules call App.t(key) and listen to the "lang" event to re-render. */
(function (App) {
  "use strict";

  var LANGS = { en: "English", fr: "Français", ar: "العربية", es: "Español" };
  var current = "en";
  var btn, menu, options;

  /* Translate a key; falls back to English so a missing entry never shows blank. */
  function t(key) {
    var dict = window.I18N[current] || {};
    return key in dict ? dict[key] : window.I18N.en[key];
  }

  function detect() {
    var saved = App.store.get("lang");
    if (saved in LANGS) return saved;
    var browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    return browser in LANGS ? browser : "en";
  }

  function translateDom() {
    App.$$("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    App.$$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.dataset.i18nHtml); });
    App.$$("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
    App.$$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    App.doc.title = t("meta.title");
  }

  function syncMenu() {
    App.$("#langUse").setAttribute("href", "#flag-" + current);
    App.$("#langName").textContent = LANGS[current];
    options.forEach(function (o) { o.setAttribute("aria-selected", o.dataset.lang === current); });
  }

  function set(lang) {
    current = lang;
    App.lang = lang;
    App.root.lang = lang;
    App.root.dir = lang === "ar" ? "rtl" : "ltr";
    App.store.set("lang", lang);
    translateDom();
    syncMenu();
    App.emit("lang", lang);
  }

  function toggleMenu(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", open);
    if (open) (options.filter(function (o) { return o.dataset.lang === current; })[0] || options[0]).focus();
  }

  function bindMenu() {
    btn.addEventListener("click", function () { toggleMenu(menu.hidden); });

    options.forEach(function (o) {
      o.addEventListener("click", function () { set(o.dataset.lang); toggleMenu(false); btn.focus(); });
    });

    menu.addEventListener("keydown", function (e) {
      var i = options.indexOf(App.doc.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); options[(i + 1) % options.length].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); options[(i - 1 + options.length) % options.length].focus(); }
      else if (e.key === "Escape") { toggleMenu(false); btn.focus(); }
    });

    App.doc.addEventListener("pointerdown", function (e) {
      if (!menu.hidden && !e.target.closest("#lang")) toggleMenu(false);
    });
  }

  App.t = t;
  App.lang = current;
  App.modules.lang = {
    init: function () {
      btn = App.$("#langBtn");
      menu = App.$("#langMenu");
      options = App.$$("button", menu);
      bindMenu();
      set(detect());
    }
  };
})(window.App);
