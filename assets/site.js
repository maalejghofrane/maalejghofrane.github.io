(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  root.classList.add("js");

  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }

  /* ---------- Language (en / fr / ar / es) ---------- */
  var LANGS = ["en", "fr", "ar", "es"], lang = "en";
  function t(key) { var d = window.I18N[lang] || {}, e = window.I18N.en; return key in d ? d[key] : e[key]; }
  function detectLang() {
    try { var s = localStorage.getItem("lang"); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    var n = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) > -1 ? n : "en";
  }
  function applyLang(l) {
    lang = l;
    root.lang = l; root.dir = l === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem("lang", l); } catch (e) {}
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.dataset.i18nHtml); });
    $$("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    doc.title = t("meta.title");
    setLangUI(l);
    if (typeof renderStack === "function") renderStack(curCat);
    if (typeof renderPal === "function") renderPal();
    if (note) note.textContent = "";
    roleIdx = 0;
  }
  var roleIdx = 0, curCat = "all";
  var langBtn = $("#langBtn"), langMenu = $("#langMenu"), langOpts = $$("button", langMenu);
  var LANG_NAMES = { en: "English", fr: "Français", ar: "العربية", es: "Español" };
  function setLangUI(l) {
    $("#langUse").setAttribute("href", "#flag-" + l);
    $("#langName").textContent = LANG_NAMES[l];
    langOpts.forEach(function (o) { o.setAttribute("aria-selected", o.dataset.lang === l); });
  }
  function toggleLang(open) {
    langMenu.hidden = !open; langBtn.setAttribute("aria-expanded", open);
    if (open) (langOpts.filter(function (o) { return o.dataset.lang === lang; })[0] || langOpts[0]).focus();
  }
  langBtn.addEventListener("click", function () { toggleLang(langMenu.hidden); });
  langOpts.forEach(function (o) { o.addEventListener("click", function () { applyLang(o.dataset.lang); toggleLang(false); langBtn.focus(); }); });
  langMenu.addEventListener("keydown", function (e) {
    var i = langOpts.indexOf(doc.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); langOpts[(i + 1) % langOpts.length].focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); langOpts[(i - 1 + langOpts.length) % langOpts.length].focus(); }
    else if (e.key === "Escape") { toggleLang(false); langBtn.focus(); }
  });
  doc.addEventListener("pointerdown", function (e) { if (!langMenu.hidden && !e.target.closest("#lang")) toggleLang(false); });

  /* ---------- Theme ---------- */
  var themeBtn = $("#themeBtn");
  function setTheme(t) {
    root.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
    var m = $('meta[name="theme-color"]'); if (m) m.content = t === "light" ? "#f3f8ff" : "#07111f";
  }
  function toggleTheme() { setTheme(root.dataset.theme === "light" ? "dark" : "light"); }
  themeBtn.addEventListener("click", toggleTheme);

  /* ---------- Typing role ---------- */
  var typed = $("#typed");
  (function type() {
    var j = 0, del = false, seen = -1;
    (function tick() {
      var roles = t("roles"), w = roles[roleIdx % roles.length];
      if (reduce) { typed.textContent = roles[0]; return; }
      if (seen !== lang) { seen = lang; j = 0; del = false; }
      typed.textContent = w.slice(0, j);
      if (!del && j === w.length) { del = true; return setTimeout(tick, 1800); }
      if (del && j === 0) { del = false; roleIdx = (roleIdx + 1) % roles.length; }
      j += del ? -1 : 1;
      setTimeout(tick, del ? 28 : 65);
    })();
  })();

  /* ---------- Stack data + filter ---------- */
  var SKILLS = [
    ["Spring Boot", "backend", "spring-boot"], ["Django", "backend", "django"], ["Symfony", "backend", "symfony"], ["Laravel", "backend", "laravel"],
    ["Angular", "frontend", "angular"], ["React JS", "frontend", "react"], ["WordPress", "frontend", "wordpress"], ["PrestaShop", "frontend", "prestashop"],
    ["React Native", "mobile", "react-native"], ["Ionic React", "mobile", "ionic"], ["Android", "mobile", "android"],
    ["Docker", "devops", "docker"], ["Jenkins", "devops", "jenkins"], ["Git", "devops", "git"], ["Postman", "devops", "postman"], ["Machine Learning", "devops", "ml"],
    ["Figma", "design", "figma"], ["Photoshop", "design", "photoshop"], ["Illustrator", "design", "illustrator"], ["Premiere Pro", "design", "premiere"]
  ];
  var grid = $("#stackGrid");
  function renderStack(cat) {
    curCat = cat;
    grid.innerHTML = SKILLS.filter(function (s) { return cat === "all" || s[1] === cat; }).map(function (s, i) {
      return '<li class="skill glass spot" style="animation-delay:' + i * 30 + 'ms"><span class="ico"><img src="./assets/icons/' + s[2] + '.svg" alt="" width="32" height="32" loading="lazy" decoding="async"></span><h3>' + s[0] + '</h3><small>' + t("lab." + s[1]) + '</small></li>';
    }).join("");
  }
  function bindTabs(container, onPick, attr) {
    var tabs = $$("button", container);
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        tabs.forEach(function (t) { t.setAttribute("aria-selected", t === b); });
        onPick(b.getAttribute(attr));
      });
    });
  }
  renderStack("all");
  bindTabs($('.tabs[aria-label="Skill categories"]'), renderStack, "data-cat");
  bindTabs($('.tabs[aria-label="Timeline filter"]'), function (f) {
    $$(".t-item").forEach(function (li) { li.hidden = f !== "all" && li.dataset.type !== f; });
    updateTimeline();
  }, "data-filter");

  /* ---------- Spotlight (mouse follow) on any .spot ---------- */
  doc.addEventListener("pointermove", function (e) {
    var el = e.target.closest && e.target.closest(".spot");
    if (!el) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  });

  /* ---------- Cursor glow ---------- */
  var glow = $(".cursor-glow"), gx = 0, gy = 0, gt = 0;
  if (finePointer && !reduce) {
    window.addEventListener("pointermove", function (e) { gx = e.clientX; gy = e.clientY; glow.classList.add("on"); if (!gt) gt = requestAnimationFrame(moveGlow); });
    doc.addEventListener("pointerleave", function () { glow.classList.remove("on"); });
  }
  function moveGlow() { gt = 0; glow.style.transform = "translate3d(" + gx + "px," + gy + "px,0)"; }

  /* ---------- 3D tilt ---------- */
  if (finePointer && !reduce) {
    $$(".tilt").forEach(function (el) {
      var max = parseFloat(el.dataset.tilt) || 8;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(900px) rotateY(" + x * max + "deg) rotateX(" + -y * max + "deg) translateZ(0)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
    /* magnetic buttons */
    $$(".magnetic").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * 0.18 + "px," + (e.clientY - r.top - r.height / 2) * 0.25 + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }

  /* ---------- Reveal + counters ---------- */
  $$(".reveal").forEach(function (el, i) { el.style.setProperty("--d", (i % 4) * 80 + "ms"); });
  function count(el) {
    var end = parseInt(el.dataset.count, 10), suf = el.dataset.suffix || "";
    if (reduce) { el.textContent = end + suf; return; }
    var t0 = performance.now(), dur = 1200;
    (function step(t) {
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(count);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    $$("[data-count]").forEach(count);
  }

  /* ---------- Scroll progress, dock spy, timeline fill ---------- */
  var bar = $(".progress"), links = $$(".dock a"), sections = links.map(function (a) { return doc.getElementById(a.dataset.nav); });
  var timeline = $("#timeline");
  function updateTimeline() {
    var r = timeline.getBoundingClientRect(), vh = window.innerHeight;
    var p = (vh * 0.6 - r.top) / r.height;
    timeline.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
  }
  function onScroll() {
    var h = root.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
    var y = window.scrollY + window.innerHeight * 0.4, cur = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle("active", i === cur); });
    updateTimeline();
  }
  var st = 0;
  window.addEventListener("scroll", function () { if (!st) st = requestAnimationFrame(function () { st = 0; onScroll(); }); }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Neural network canvas ---------- */
  (function net() {
    var c = $("#net"), ctx = c.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pts = [], W = 0, H = 0, mouse = { x: -9999, y: -9999 }, running = true, raf = 0;
    function size() {
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(90, Math.round((W * H) / 18000));
      pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 });
    }
    function color() { return root.dataset.theme === "light" ? "0,98,223" : "53,161,255"; }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var rgb = color(), L = 140, i, j, a, b, dx, dy, d;
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        if (!reduce) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > W) a.vx *= -1;
          if (a.y < 0 || a.y > H) a.vy *= -1;
          dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160 && d > 0) { a.x += (dx / d) * 0.9; a.y += (dy / d) * 0.9; }
        }
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, 6.283); ctx.fillStyle = "rgba(" + rgb + ",0.7)"; ctx.fill();
        for (j = i + 1; j < pts.length; j++) {
          b = pts[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
          if (d < L * L) { ctx.strokeStyle = "rgba(" + rgb + "," + (0.22 * (1 - Math.sqrt(d) / L)).toFixed(3) + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) { ctx.strokeStyle = "rgba(" + rgb + "," + (0.5 * (1 - d / 200)).toFixed(3) + ")"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
    }
    function loop() { draw(); if (running && !reduce) raf = requestAnimationFrame(loop); }
    window.addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener("resize", function () { size(); draw(); });
    doc.addEventListener("visibilitychange", function () { running = !doc.hidden; if (running) loop(); else cancelAnimationFrame(raf); });
    size(); loop();
  })();

  /* ---------- Command palette ---------- */
  var pal = $("#palette"), palIn = $("#paletteInput"), palList = $("#paletteList"), sel = 0, shown = [];
  var COMMANDS = [
    ["cmd.home", "#home", function () { go("home"); }], ["cmd.about", "#about", function () { go("about"); }],
    ["cmd.stack", "#stack", function () { go("stack"); }], ["cmd.projects", "#projects", function () { go("projects"); }],
    ["cmd.journey", "#journey", function () { go("journey"); }], ["cmd.contact", "#contact", function () { go("contact"); }],
    ["cmd.theme", "theme", toggleTheme],
    ["cmd.mail", "mail", function () { location.href = "mailto:ghofrane.maalej@etudiant-isi.utm.tn"; }],
    ["cmd.linkedin", "in", function () { window.open("https://www.linkedin.com/in/ghofrane-maalej-66a4a5173/", "_blank", "noopener"); }]
  ];
  function go(id) { var el = doc.getElementById(id); if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  function renderPal() {
    var q = palIn.value.trim().toLowerCase();
    shown = COMMANDS.filter(function (c) { return !q || t(c[0]).toLowerCase().indexOf(q) > -1; });
    sel = Math.min(sel, Math.max(shown.length - 1, 0));
    palList.innerHTML = shown.length ? shown.map(function (c, i) {
      return '<li role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '">' + t(c[0]) + "<small>" + c[1] + "</small></li>";
    }).join("") : '<li aria-selected="false">' + t("pal.none") + "</li>";
  }
  function openPal() { pal.hidden = false; palIn.value = ""; sel = 0; renderPal(); palIn.focus(); }
  function closePal() { pal.hidden = true; }
  function run(i) { var c = shown[i]; if (!c) return; closePal(); c[2](); }
  $("#openPalette").addEventListener("click", openPal);
  palIn.addEventListener("input", function () { sel = 0; renderPal(); });
  palList.addEventListener("click", function (e) { var li = e.target.closest("li[data-i]"); if (li) run(+li.dataset.i); });
  pal.addEventListener("mousedown", function (e) { if (e.target === pal) closePal(); });
  doc.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? openPal() : closePal(); return; }
    if (pal.hidden) return;
    if (e.key === "Escape") closePal();
    else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % shown.length; renderPal(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + shown.length) % shown.length; renderPal(); }
    else if (e.key === "Enter") { e.preventDefault(); run(sel); }
  });

  /* ---------- Contact form (opens the mail client) ---------- */
  var form = $("#contactForm"), note = $("#formNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements, ok = true;
    ["name", "email", "message"].forEach(function (k) {
      var bad = !f[k].value.trim() || (k === "email" && !/^\S+@\S+\.\S+$/.test(f[k].value));
      f[k].classList.toggle("invalid", bad); if (bad) ok = false;
    });
    if (!ok) { note.textContent = t("ct.err"); return; }
    var body = f.message.value + "\n\n— " + f.name.value + " (" + f.email.value + ")";
    note.textContent = t("ct.opening");
    location.href = "mailto:ghofrane.maalej@etudiant-isi.utm.tn?subject=" + encodeURIComponent(t("ct.subject") + " " + f.name.value) + "&body=" + encodeURIComponent(body);
  });

  $("#year").textContent = new Date().getFullYear();
  applyLang(detectLang());
})();
