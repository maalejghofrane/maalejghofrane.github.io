/* Core: the shared `App` object every module plugs into.
   - App.on / App.emit : tiny event bus (events: "lang", "theme", "scroll")
   - App.$ / App.$$    : DOM helpers
   - App.store         : localStorage that never throws
   - App.modules       : feature modules register themselves here (see main.js) */
window.App = (function () {
  "use strict";

  var doc = document;
  var listeners = {};

  var App = {
    doc: doc,
    root: doc.documentElement,
    modules: {},
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    finePointer: window.matchMedia("(hover: hover) and (pointer: fine)").matches,

    $: function (selector, ctx) { return (ctx || doc).querySelector(selector); },
    $$: function (selector, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(selector)); },

    on: function (event, fn) { (listeners[event] = listeners[event] || []).push(fn); },
    emit: function (event, data) { (listeners[event] || []).forEach(function (fn) { fn(data); }); },

    store: {
      get: function (key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
      set: function (key, value) { try { localStorage.setItem(key, value); } catch (e) { /* private mode */ } }
    },

    /* Wrap fn so it runs at most once per animation frame. */
    perFrame: function (fn) {
      var queued = false;
      return function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () { queued = false; fn(); });
      };
    },

    /* Smooth-scroll to a section by id. */
    go: function (id) {
      var el = doc.getElementById(id);
      if (el) el.scrollIntoView({ behavior: App.reduceMotion ? "auto" : "smooth" });
    },

    /* Wire a group of tab buttons: marks the clicked one selected and calls onPick(value). */
    tabs: function (container, attr, onPick) {
      var buttons = App.$$("button", container);
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) { b.setAttribute("aria-selected", b === btn); });
          onPick(btn.getAttribute(attr));
        });
      });
    }
  };

  App.root.classList.add("js");
  return App;
})();
