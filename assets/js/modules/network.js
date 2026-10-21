/* Background neural network: drifting points linked by lines, repelled by
   and linked to the cursor. Pauses when the tab is hidden; static for
   reduced motion. */
(function (App) {
  "use strict";

  var LINK_DIST = 140, MOUSE_LINK = 200, REPEL_DIST = 160, SPEED = 0.35;
  var canvas, ctx, dpr, W, H, points, raf, running = true;
  var mouse = { x: -9999, y: -9999 };

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var n = Math.min(90, Math.round((W * H) / 18000));
    points = [];
    for (var i = 0; i < n; i++) {
      points.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * SPEED, vy: (Math.random() - 0.5) * SPEED });
    }
  }

  function rgb() { return App.root.dataset.theme === "light" ? "0,98,223" : "53,161,255"; }

  function line(a, bx, by, alpha, color) {
    ctx.strokeStyle = "rgba(" + color + "," + alpha.toFixed(3) + ")";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(bx, by); ctx.stroke();
  }

  function move(p) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    var dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
    if (d < REPEL_DIST && d > 0) { p.x += (dx / d) * 0.9; p.y += (dy / d) * 0.9; }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var color = rgb();

    for (var i = 0; i < points.length; i++) {
      var a = points[i];
      if (!App.reduceMotion) move(a);

      ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + color + ",0.7)"; ctx.fill();

      for (var j = i + 1; j < points.length; j++) {
        var b = points[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) line(a, b.x, b.y, 0.22 * (1 - Math.sqrt(d2) / LINK_DIST), color);
      }

      var mx = a.x - mouse.x, my = a.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
      if (md < MOUSE_LINK) line(a, mouse.x, mouse.y, 0.5 * (1 - md / MOUSE_LINK), color);
    }
  }

  function loop() {
    draw();
    if (running && !App.reduceMotion) raf = requestAnimationFrame(loop);
  }

  App.modules.network = {
    init: function () {
      canvas = App.$("#net");
      ctx = canvas.getContext("2d");
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      window.addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
      window.addEventListener("resize", function () { resize(); draw(); });
      App.on("theme", draw);
      App.doc.addEventListener("visibilitychange", function () {
        running = !App.doc.hidden;
        if (running) loop(); else cancelAnimationFrame(raf);
      });

      resize();
      loop();
    }
  };
})(window.App);
