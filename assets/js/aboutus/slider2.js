let currentSlide = 0;
const totalSlides = 13;
const slidesContainer = document.getElementById("slidesContainer");
const dotsContainer = document.getElementById("dotsContainer");

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dotes = document.createElement("div");
  dotes.classList.add("dotes");
  if (i === 0) dotes.classList.add("active");
  dotes.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dotes);
}

function updateSlide() {
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  const dots = document.querySelectorAll(".dotes");
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
