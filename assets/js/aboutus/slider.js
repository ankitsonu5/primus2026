const track = document.getElementById("track");
const slides = Array.from(track.children);
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dotsNav = document.getElementById("dotsNav");
const dots = Array.from(dotsNav.children);

let currentIndex = 0;

// Function to move track to specifically slide index
const moveToSlide = (targetIndex) => {
  // Looping logic: agar last par hain aur next dabaya to first par jao
  if (targetIndex < 0) {
    targetIndex = slides.length - 1;
  } else if (targetIndex >= slides.length) {
    targetIndex = 0;
  }

  // Calculate kitna move karna hai (e.g., 0%, -100%, -200%)
  const amountToMove = "-" + targetIndex * 100 + "%";
  track.style.transform = "translateX(" + amountToMove + ")";

  // Update current index
  currentIndex = targetIndex;

  // Update dots status
  dots.forEach((dot) => dot.classList.remove("active-dot"));
  dots[currentIndex].classList.add("active-dot");
};

// === Event Listeners ===

// Click Right Arrow
nextBtn.addEventListener("click", () => {
  moveToSlide(currentIndex + 1);
});

// Click Left Arrow
prevBtn.addEventListener("click", () => {
  moveToSlide(currentIndex - 1);
});

// Click Dots
dotsNav.addEventListener("click", (e) => {
  // Jis dot par click hua uska index dhundo
  const targetDot = e.target.closest("button");
  if (!targetDot) return;

  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  moveToSlide(targetIndex);
});
