/* Pointer effects (skipped on touch devices and for reduced motion):
   - spotlight : any .spot gets --mx/--my so its CSS gradient follows the cursor
   - cursor glow: soft light following the pointer
   - tilt       : .tilt cards rotate in 3D (data-tilt = max degrees)
   - magnetic   : .magnetic buttons lean towards the cursor */
(function (App) {
  "use strict";

  function spotlight() {
    App.doc.addEventListener("pointermove", function (e) {
      var el = e.target.closest && e.target.closest(".spot");
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    });
  }

  function cursorGlow() {
    var glow = App.$(".cursor-glow"), x = 0, y = 0;
    var move = App.perFrame(function () { glow.style.transform = "translate3d(" + x + "px," + y + "px,0)"; });

    window.addEventListener("pointermove", function (e) { x = e.clientX; y = e.clientY; glow.classList.add("on"); move(); });
    App.doc.addEventListener("pointerleave", function () { glow.classList.remove("on"); });
  }

  function tilt() {
    App.$$(".tilt").forEach(function (el) {
      var max = parseFloat(el.dataset.tilt) || 8;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(900px) rotateY(" + x * max + "deg) rotateX(" + -y * max + "deg) translateZ(0)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  function magnetic() {
    App.$$(".magnetic").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) * 0.18;
        var dy = (e.clientY - r.top - r.height / 2) * 0.25;
        btn.style.transform = "translate(" + dx + "px," + dy + "px)";
      });
      btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
    });
  }

  App.modules.effects = {
    init: function () {
      spotlight();
      if (!App.finePointer || App.reduceMotion) return;
      cursorGlow();
      tilt();
      magnetic();
    }
  };
})(window.App);
