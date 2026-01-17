let currentSlider = 0;
const slides = document.getElementById("slides");
const profilesMobSecdots = document.querySelectorAll(".profilesmobSecdot");
const totalSlider = profilesMobSecdots.length;
const sliderWrapper = document.querySelector(".slider-wrapper");

// Touch/Swipe variables
let startX = 0;
let endX = 0;
let isDragging = false;

function goToSlider(n) {
  currentSlider = n;
  updateSlider();
}

function updateSlider() {
  slides.style.transform = `translateX(-${currentSlider * 100}%)`;

  profilesMobSecdots.forEach((profilesDot, index) => {
    if (index === currentSlider) {
      profilesDot.classList.add("active");
    } else {
      profilesDot.classList.remove("active");
    }
  });
}

// Touch Events for Mobile
sliderWrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

sliderWrapper.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  endX = e.touches[0].clientX;
});

sliderWrapper.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;
  handleSwipe();
});

// Mouse Events for Desktop
sliderWrapper.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  isDragging = true;
  sliderWrapper.style.cursor = "grabbing";
});

sliderWrapper.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  endX = e.clientX;
});

sliderWrapper.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  sliderWrapper.style.cursor = "grab";
  handleSwipe();
});

sliderWrapper.addEventListener("mouseleave", () => {
  if (!isDragging) return;
  isDragging = false;
  sliderWrapper.style.cursor = "grab";
});

function handleSwipe() {
  const diff = startX - endX;
  const threshold = 50; // Minimum swipe distance

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // Swiped left - next slide
      currentSlider = (currentSlider + 1) % totalSlider;
    } else {
      // Swiped right - previous slide
      currentSlider = (currentSlider - 1 + totalSlider) % totalSlider;
    }
    updateSlider();
  }

  startX = 0;
  endX = 0;
}

// Add cursor style
sliderWrapper.style.cursor = "grab";
