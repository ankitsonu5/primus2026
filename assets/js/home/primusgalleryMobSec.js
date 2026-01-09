// primusgalleryMobSec script code

// JavaScript logic bound to #primusgalleryMobSec
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#primusgalleryMobSec');
    const wrapper = container.querySelector('.slider-wrapper');
    const dots = container.querySelectorAll('.dot');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    // Slide change function
    const updateSlider = (index) => {
        currentIndex = index;
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Active Dot update
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    // 1. Dots Clicking Logic
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateSlider(index));
    });

    // 2. Swipe/Drag Logic
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        // Threshold 50px rakha hai swipe detect karne ke liye
        if (diff > 50 && currentIndex < dots.length - 1) {
            updateSlider(currentIndex + 1); // Swipe Left
        } else if (diff < -50 && currentIndex > 0) {
            updateSlider(currentIndex - 1); // Swipe Right
        }

        isDragging = false;
    }, { passive: true });
});