(function () {
  var SLIDES = [
    { tag: "Backend", title: "APIs robustes avec Spring Boot & Django", text: "Conception d'API REST, sécurité, base de données et tests pour des applications fiables et évolutives.", img: "./assets/projectTwo-c07c40ce.jpg", stack: ["Spring Boot", "Django", "REST"] },
    { tag: "Frontend", title: "Interfaces modernes en Angular & React", text: "Des interfaces claires, responsives et accessibles, pensées pour une navigation simple sur mobile comme sur desktop.", img: "./assets/projectOne-db6ed5ff.jpg", stack: ["Angular", "React", "Tailwind"] },
    { tag: "DevOps", title: "Déploiement avec Docker", text: "Conteneurisation et mise en production reproductible pour livrer plus vite et sans surprise.", img: "./assets/hero-portrait.png", stack: ["Docker", "CI/CD", "Linux"] }
  ];

  function dot(filled) {
    return '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M7.52649 4C7.52649 5.94763 5.94763 7.52649 4 7.52649C2.05237 7.52649 0.47351 5.94763 0.47351 4C0.47351 2.05237 2.05237 0.47351 4 0.47351C5.94763 0.47351 7.52649 2.05237 7.52649 4Z" ' +
      (filled ? 'fill="#EBF3EE" ' : '') + 'stroke-width="0.94702" stroke="#EBF3EE"/></svg>';
  }

  function build() {
    var s = document.createElement("section");
    s.id = "highlights";
    s.className = "hl";
    s.setAttribute("aria-roledescription", "carousel");
    s.setAttribute("aria-label", "Highlights");
    s.innerHTML =
      '<div class="hl-head"><p class="hl-eyebrow">What I bring</p><h2>Highlights</h2></div>' +
      '<div class="hl-stage">' + SLIDES.map(function (d, i) {
        return '<article class="hl-slide' + (i === 0 ? ' is-active' : '') + '" aria-hidden="' + (i !== 0) + '">' +
          '<img src="' + d.img + '" alt="" loading="lazy">' +
          '<div class="hl-body"><span class="hl-tag">' + d.tag + '</span><h3>' + d.title + '</h3><p>' + d.text + '</p>' +
          '<ul>' + d.stack.map(function (t) { return '<li>' + t + '</li>'; }).join("") + '</ul></div></article>';
      }).join("") + '</div>' +
      '<div class="Pagination" role="tablist">' + SLIDES.map(function (d, i) {
        return '<button type="button" role="tab" aria-label="Slide ' + (i + 1) + ': ' + d.tag + '" aria-selected="' + (i === 0) + '">' + dot(i === 0) + '</button>';
      }).join("") + '</div>';

    var slides = s.querySelectorAll(".hl-slide"), btns = s.querySelectorAll(".Pagination button"), cur = 0, timer;
    function go(n) {
      cur = (n + SLIDES.length) % SLIDES.length;
      slides.forEach(function (el, i) { el.classList.toggle("is-active", i === cur); el.setAttribute("aria-hidden", i !== cur); });
      btns.forEach(function (b, i) { b.setAttribute("aria-selected", i === cur); b.innerHTML = dot(i === cur); });
    }
    function play() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      stop(); timer = setInterval(function () { go(cur + 1); }, 5000);
    }
    function stop() { clearInterval(timer); }
    btns.forEach(function (b, i) { b.addEventListener("click", function () { go(i); play(); }); });
    s.addEventListener("mouseenter", stop); s.addEventListener("mouseleave", play);
    s.addEventListener("focusin", stop); s.addEventListener("focusout", play);
    s.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { go(cur + 1); } else if (e.key === "ArrowLeft") { go(cur - 1); }
    });
    play();
    return s;
  }

  function mount() {
    if (document.getElementById("highlights")) return true;
    var anchor = document.getElementById("projects");
    if (!anchor) return false;
    anchor.parentElement.insertBefore(build(), anchor.nextSibling);
    return true;
  }

  var mo = new MutationObserver(function () { if (mount()) mo.disconnect(); });
  mo.observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
