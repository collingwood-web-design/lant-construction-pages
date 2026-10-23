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

  var frame = document.querySelector("[data-slider] .slider-frame");
  var photos = frame.querySelectorAll("img");
  var currentImg = photos[0];
  var bufferImg = photos[1];
  var dots = document.querySelector("[data-slider-dots]");
  var index = 0;
  var timer;
  var token = 0;

  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Photo " + (i + 1));
    dot.addEventListener("click", function () {
      show(i);
      start();
    });
    dots.appendChild(dot);
  });

  function updateDots() {
    dots.querySelectorAll("button").forEach(function (dot, i) {
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function show(next) {
    next = (next + slides.length) % slides.length;
    if (next === index) return;
    var ticket = ++token;
    var revealed = false;

    function reveal() {
      if (revealed || ticket !== token) return;
      revealed = true;
      bufferImg.classList.add("is-current");
      bufferImg.alt = "Lant Construction project photo";
      bufferImg.removeAttribute("aria-hidden");
      currentImg.classList.remove("is-current");
      currentImg.alt = "";
      currentImg.setAttribute("aria-hidden", "true");
      var swap = currentImg;
      currentImg = bufferImg;
      bufferImg = swap;
      index = next;
      updateDots();
    }

    bufferImg.onload = function () {
      bufferImg.onload = null;
      reveal();
    };
    bufferImg.src = slides[next];
    if (bufferImg.complete && bufferImg.naturalWidth) {
      bufferImg.onload = null;
      reveal();
    }
  }

  function start() {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = window.setInterval(function () { show(index + 1); }, 6000);
  }

  function stop() {
    window.clearInterval(timer);
  }

  updateDots();

  frame.addEventListener("click", function (event) {
    if (!event.target.classList.contains("is-current")) return;
    openLightbox(currentImg.src, currentImg.alt);
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
