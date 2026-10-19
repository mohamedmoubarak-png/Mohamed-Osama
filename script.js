(function () {
  var cfg = window.SITE_CONFIG || {};
  var waBase = "https://wa.me/" + (cfg.whatsapp || "");

  // social links
  document.querySelectorAll("[data-link]").forEach(function (a) {
    var key = a.getAttribute("data-link");
    var url = key === "whatsapp" ? waBase : key === "phone" ? (cfg.phone && "tel:" + cfg.phone) : cfg[key];
    if (url) a.href = url; else a.remove();
  });

  // mobile menu
  var btn = document.querySelector(".menu-btn");
  var links = document.querySelector(".links");
  btn.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") links.classList.remove("open");
  });

  // preselect plan from plan buttons
  var form = document.getElementById("contact-form");
  document.querySelectorAll("[data-plan]").forEach(function (a) {
    a.addEventListener("click", function () {
      form.plan.value = a.getAttribute("data-plan");
    });
  });

  // form -> WhatsApp
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text =
      "أهلاً كابتن محمد 👋\n" +
      "الاسم: " + form.name.value + "\n" +
      "الهدف: " + form.goal.value + "\n" +
      "الباقة: " + form.plan.value +
      (form.msg.value ? "\n" + form.msg.value : "");
    window.open(waBase + "?text=" + encodeURIComponent(text), "_blank");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
