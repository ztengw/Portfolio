// Hamburger navigation
const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");

if (hamburger && navigation) {
  hamburger.addEventListener("click", function () {
    navigation.classList.toggle("active");
  });
}

// Side-preview slider with dots
const sideSliders = document.querySelectorAll(".side-slider");

sideSliders.forEach((slider) => {
  const track = slider.querySelector(".side-track");
  const cards = slider.querySelectorAll(".side-card");
  const prev = slider.querySelector(".side-prev");
  const next = slider.querySelector(".side-next");
  const dotsContainer = slider.nextElementSibling;

  let current = 0;

  if (!track || cards.length === 0 || !prev || !next || !dotsContainer) {
    return;
  }

  cards.forEach((card, index) => {
    const dot = document.createElement("button");
    dot.classList.add("side-dot");

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      goToSideSlide(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".side-dot");

  function goToSideSlide(index) {
    current = (index + cards.length) % cards.length;

    const cardWidth = cards[0].offsetWidth;
    const gap = window.innerWidth <= 700 ? 14 : 20;
    const moveAmount = current * (cardWidth + gap);

    track.style.transform = `translateX(-${moveAmount}px)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[current].classList.add("active");
  }

  next.addEventListener("click", () => {
    goToSideSlide(current + 1);
  });

  prev.addEventListener("click", () => {
    goToSideSlide(current - 1);
  });

  // Swipe on phone/tablet
  let startX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;

    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        goToSideSlide(current + 1);
      } else {
        goToSideSlide(current - 1);
      }
    }
  });

  window.addEventListener("resize", () => {
    goToSideSlide(current);
  });
});

// Image lightbox
const galleryImages = document.querySelectorAll(".side-card img");

const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");

lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Close image">×</button>
  <img class="lightbox-image" src="" alt="">
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxClose = lightbox.querySelector(".lightbox-close");

galleryImages.forEach((image) => {
  image.addEventListener("click", function () {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("active");
    document.body.classList.add("no-scroll");
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.classList.remove("no-scroll");
  lightboxImage.src = "";
}