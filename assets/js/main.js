var isLarge = window.innerWidth >= 1024;

if (document.getElementById("worthSwiper")) {
  var sw = new Swiper("#worthSwiper", {
    loop: true,
    centeredSlides: !isLarge,
    speed: isLarge ? 0 : 3000,
    autoplay: isLarge
      ? false
      : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
    freeMode: isLarge ? false : { enabled: true, momentum: false },
    grabCursor: !isLarge,
    slidesPerView: isLarge ? 4 : 1.3,
    spaceBetween: 16,
    breakpoints: {
      480: { slidesPerView: 2.1, spaceBetween: 14, centeredSlides: true },
      768: { slidesPerView: 3.1, spaceBetween: 16, centeredSlides: true },
      1024: {
        slidesPerView: 4,
        spaceBetween: 16,
        centeredSlides: false,
        loop: false,
        autoplay: false,
        freeMode: false,
        grabCursor: false,
      },
    },
  });

  window.addEventListener("resize", function () {
    var large = window.innerWidth >= 1024;
    if (large !== isLarge) {
      isLarge = large;
      sw.destroy(true, true);
      location.reload();
    }
  });
}

function openVideo(id, title, tag, start) {
  var s = start ? "&start=" + start : "";
  document.getElementById("ytFrame").src =
    "https://www.youtube.com/embed/" +
    id +
    "?autoplay=1&rel=0&modestbranding=1" +
    s;
  var titleEl = document.getElementById("overlayTitle");
  titleEl.childNodes[0].textContent = title || "";
  document.getElementById("overlayTag").textContent = tag || "";
  document.getElementById("vidOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  var frame = document.getElementById("ytFrame");
  if (frame) frame.src = "";
  var overlay = document.getElementById("vidOverlay");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function closeOnBg(e) {
  if (e.target === document.getElementById("vidOverlay")) closeVideo();
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeVideo();
    closeModal();
  }
});

function openModal() {
  var modal = document.getElementById("bookModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  var modal = document.getElementById("bookModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function closeModalBg(e) {
  if (e.target === document.getElementById("bookModal")) closeModal();
}

function submitModal() {
  var n = document.getElementById("mName"),
    em = document.getElementById("mEmail"),
    ph = document.getElementById("mPhone"),
    ref = document.getElementById("mReferral");
  var en = document.getElementById("errName"),
    ee = document.getElementById("errEmail"),
    ep = document.getElementById("errPhone"),
    er = document.getElementById("errReferral");
  var ok = true;
  n.classList.remove("error");
  em.classList.remove("error");
  ph.classList.remove("error");
  ref.classList.remove("error");
  en.classList.remove("show");
  ee.classList.remove("show");
  ep.classList.remove("show");
  er.classList.remove("show");
  if (!n.value.trim()) {
    n.classList.add("error");
    en.classList.add("show");
    ok = false;
  }
  if (!em.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) {
    em.classList.add("error");
    ee.classList.add("show");
    ok = false;
  }
  if (!ph.value.trim() || !/^\d{10}$/.test(ph.value.replace(/\s/g, ""))) {
    ph.classList.add("error");
    ep.classList.add("show");
    ok = false;
  }
  if (!ref.value.trim() || ref.value.trim().length !== 6) {
    ref.classList.add("error");
    er.classList.add("show");
    ok = false;
  }
  if (ok) {
    alert("Booking confirmed! We will contact you shortly.");
  }
}

document.querySelectorAll('a[href="#"]').forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    openModal();
  });
});

var btnSticky = document.querySelector(".btn-sticky");
if (btnSticky) {
  btnSticky.addEventListener("click", function (e) {
    e.preventDefault();
    openModal();
  });
}

var fy = document.getElementById("footerYear");
if (fy) fy.textContent = new Date().getFullYear();