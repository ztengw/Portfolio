// Grab all carousels on the page
const carousels = document.querySelectorAll(".carousel");

// Each carousel gets its own logic
carousels.forEach((carousel) => {
  // DOM references
  const track = carousel.querySelector(".carousel-track");
  const slides = track.querySelectorAll(".project-card");
  const prev = carousel.querySelector(".arrow-prev");
  const next = carousel.querySelector(".arrow-next");
  const total = slides.length;

  let current = 0; // index of the currently visible slide
  let autoTimer; // holds the setInterval reference for auto-advance

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    resetAuto();
  }

  // Wire up the prev/next arrow buttons
  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));

  /* Keyboard navigation */
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  /* Touch / swipe  */
  let startX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  ); // passive: true = don't block scrolling

  track.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;

    if (Math.abs(dx) > 40) {
      goTo(current + (dx < 0 ? 1 : -1)); // swipe left → next, right → prev
    }
  });

  /* Moves to the next slide every 5 seconds automatically. */
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  // Kick off auto-advance when the page loads
  resetAuto();
});