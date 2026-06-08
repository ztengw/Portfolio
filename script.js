// Header background on scroll
const header = document.querySelector("header");

// Hamburger navigation
const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

if (hamburger && navigation) {
  hamburger.addEventListener("click", function () {
    navigation.classList.toggle("active");
  });
}

// Multiple side-preview slideshows
const slideshows = document.querySelectorAll(".project-slideshow-section");

slideshows.forEach((section) => {
  const slideTrack = section.querySelector(".slide-track");
  const slideCards = section.querySelectorAll(".slide-card");
  const slidePrev = section.querySelector(".slide-prev");
  const slideNext = section.querySelector(".slide-next");
  const slideDots = section.querySelector(".slide-dots");

  let currentSlide = 0;
  let autoTimer;

  if (
    !slideTrack ||
    slideCards.length === 0 ||
    !slidePrev ||
    !slideNext ||
    !slideDots
  ) {
    return;
  }

  slideCards.forEach((card, index) => {
    const dot = document.createElement("button");
    dot.classList.add("slide-dot");

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      goToSlide(index);
    });

    slideDots.appendChild(dot);
  });

  const dots = slideDots.querySelectorAll(".slide-dot");

  function goToSlide(index) {
    currentSlide = (index + slideCards.length) % slideCards.length;

    const cardWidth = slideCards[0].offsetWidth;
    const gap = 18;
    const moveAmount = currentSlide * (cardWidth + gap);

    slideTrack.style.transform = `translateX(-${moveAmount}px)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");

    resetAuto();
  }

  slideNext.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
  });

  slidePrev.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
  });

  let startX = 0;

  slideTrack.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );

  slideTrack.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;

    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
    }
  });

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  window.addEventListener("resize", () => {
    goToSlide(currentSlide);
  });

  resetAuto();
});