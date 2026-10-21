/* Contact form: validates, then opens the visitor's mail client with the
   message pre-filled (there is no backend). */
(function (App) {
  "use strict";

  var EMAIL_RE = /^\S+@\S+\.\S+$/;
  var form, note;

  function isInvalid(field) {
    var value = field.value.trim();
    return !value || (field.name === "email" && !EMAIL_RE.test(value));
  }

  function submit(e) {
    e.preventDefault();
    var f = form.elements, valid = true;

    ["name", "email", "message"].forEach(function (key) {
      var bad = isInvalid(f[key]);
      f[key].classList.toggle("invalid", bad);
      if (bad) valid = false;
    });
    if (!valid) { note.textContent = App.t("ct.err"); return; }

    var subject = App.t("ct.subject") + " " + f.name.value;
    var body = f.message.value + "\n\n— " + f.name.value + " (" + f.email.value + ")";
    note.textContent = App.t("ct.opening");
    location.href = "mailto:" + window.SITE.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  App.modules.contact = {
    init: function () {
      form = App.$("#contactForm");
      note = App.$("#formNote");
      form.addEventListener("submit", submit);
      App.on("lang", function () { note.textContent = ""; });
    }
  };
})(window.App);
