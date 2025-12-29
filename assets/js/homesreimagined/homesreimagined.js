const leftImage = document.querySelector(".left-image");
const rightImage = document.querySelector(".right-image");
const thelivingHub = document.querySelector("#thelivinghub");

let lastScrollY = window.scrollY;
let ticking = false;

function updateImagePosition() {
  const heroRect = thelivingHub.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if hero section is in viewport
  if (heroRect.top < windowHeight && heroRect.bottom > 0) {
    // Calculate visibility percentage (0 to 1)
    const scrollPercent = Math.min(
      Math.max((windowHeight - heroRect.top) / (windowHeight * 0.7), 0),
      1
    );

    // Add visible class when scrolled enough (images fully inside)
    if (scrollPercent > 0.5) {
      leftImage.classList.add("visible");
      rightImage.classList.add("visible");
    } else {
      // Remove visible class when scrolling up (images half outside)
      leftImage.classList.remove("visible");
      rightImage.classList.remove("visible");
    }
  } else if (heroRect.bottom < 0) {
    // If scrolled past the section, keep them visible
    leftImage.classList.add("visible");
    rightImage.classList.add("visible");
  } else {
    // If section is below viewport, keep them half outside
    leftImage.classList.remove("visible");
    rightImage.classList.remove("visible");
  }

  ticking = false;
}

function onScroll() {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(updateImagePosition);
    ticking = true;
  }
}

// Listen to scroll events
window.addEventListener("scroll", onScroll, { passive: true });

// Check initial position on page load
window.addEventListener("load", () => {
  updateImagePosition();
});

// Also check on resize
window.addEventListener("resize", () => {
  updateImagePosition();
});
