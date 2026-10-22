(function () {
  var slides = [
    "gallery-01.jpg",
    "gallery-02.jpg",
    "gallery-03.jpg",
    "gallery-04.jpg",
    "gallery-05.jpg",
    "gallery-06.jpg",
    "gallery-07.jpg",
    "gallery-08.jpg",
    "gallery-09.jpg",
    "gallery-10.jpg",
    "gallery-11.jpg",
    "gallery-12.jpg",
    "gallery-13.jpg"
  ].map(function (name) {
    return "https://media.cwd-cdn.com/lant-construction/images/" + name;
  });

  var frame = document.querySelector("[data-slider] img");
  var index = 0;
  var timer;

  function show(next) {
    index = (next + slides.length) % slides.length;
    frame.src = slides[index];
  }

  function start() {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = window.setInterval(function () { show(index + 1); }, 6000);
  }

  function stop() {
    window.clearInterval(timer);
  }

  document.querySelector(".slider-btn.next").addEventListener("click", function () {
    show(index + 1);
    start();
  });

  document.querySelector(".slider-btn.prev").addEventListener("click", function () {
    show(index - 1);
    start();
  });

  frame.addEventListener("click", function () {
    openLightbox(frame.src, frame.alt);
  });

  start();

  var dialog = document.querySelector(".lightbox");
  var dialogImg = dialog.querySelector("img");

  function openLightbox(src, alt) {
    dialogImg.src = src;
    dialogImg.alt = alt || "";
    dialog.showModal();
  }

  document.querySelectorAll(".zoom").forEach(function (button) {
    button.addEventListener("click", function () {
      openLightbox(button.getAttribute("data-full"), button.getAttribute("data-alt"));
    });
  });

  dialog.querySelector(".lightbox-close").addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  var toTop = document.querySelector(".to-top");

  window.addEventListener("scroll", function () {
    toTop.hidden = window.scrollY < 500;
  }, { passive: true });

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
