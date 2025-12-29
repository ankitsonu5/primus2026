// primusprideranksec carousel functionality code

const trackSlider2025 = document.getElementById('awardCarouselTrackSlider2025');
const prevArrowBtn2025 = document.getElementById('prevArrowButton2025');
const nextArrowBtn2025 = document.getElementById('nextArrowButton2025');

let currentSlideIndex2025 = 0;
const totalCardsInSlider = 6;
let visibleCardsCount2025 = 3;

function updateVisibleCardsCount() {
    if (window.innerWidth <= 640) {
        visibleCardsCount2025 = 1;
    } else if (window.innerWidth <= 968) {
        visibleCardsCount2025 = 2;
    } else {
        visibleCardsCount2025 = 3;
    }
}

function updateCarouselPosition() {
    const cardWidthCalc = trackSlider2025.offsetWidth / visibleCardsCount2025;
    const gapSize = 20;
    const moveDistance = (cardWidthCalc + gapSize) * currentSlideIndex2025;
    trackSlider2025.style.transform = `translateX(-${moveDistance}px)`;

    prevArrowBtn2025.disabled = currentSlideIndex2025 === 0;
    nextArrowBtn2025.disabled = currentSlideIndex2025 >= totalCardsInSlider - visibleCardsCount2025;
}

prevArrowBtn2025.addEventListener('click', () => {
    if (currentSlideIndex2025 > 0) {
        currentSlideIndex2025--;
        updateCarouselPosition();
    }
});

nextArrowBtn2025.addEventListener('click', () => {
    if (currentSlideIndex2025 < totalCardsInSlider - visibleCardsCount2025) {
        currentSlideIndex2025++;
        updateCarouselPosition();
    }
});

window.addEventListener('resize', () => {
    updateVisibleCardsCount();
    if (currentSlideIndex2025 > totalCardsInSlider - visibleCardsCount2025) {
        currentSlideIndex2025 = Math.max(0, totalCardsInSlider - visibleCardsCount2025);
    }
    updateCarouselPosition();
});

updateVisibleCardsCount();
updateCarouselPosition();