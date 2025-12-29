let currentSlide = 0;
const totalSlides = 3;
const slidesContainer = document.getElementById("slidesContainer");
const dotsContainer = document.getElementById("dotsContainer");

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
}

function updateSlide() {
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlide();
}
