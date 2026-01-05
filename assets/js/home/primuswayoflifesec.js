const sliderTrack = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slides = document.querySelectorAll('.slide-group');

let currentSlide = 0;
const totalSlides = slides.length;

function updateSlider() {
    const translateX = -currentSlide * 100;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
    updateButtons();
}

function updateButtons() {
    if (currentSlide === 0) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }

    if (currentSlide === totalSlides - 1) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    }
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlider();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// Initialize
updateButtons();

// Optional: Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextBtn.click();
    }
    if (touchEndX > touchStartX + 50) {
        prevBtn.click();
    }
}