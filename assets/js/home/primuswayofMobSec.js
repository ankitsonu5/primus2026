// primuswayofMobSec script code

// Scoping selectors to the specific section ID
const primusSection = document.getElementById('primuswayofMobSec');

// Check if section exists to avoid errors
if (primusSection) {
    const track = primusSection.querySelector('#track');
    const viewport = primusSection.querySelector('#viewport');
    const dots = primusSection.querySelectorAll('.dot');

    let startX = 0;
    let isDragging = false;
    let currentIndex = 0;
    const totalSlides = primusSection.querySelectorAll('.slide').length;

    const startAction = (e) => {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        track.style.transition = 'none';
    };

    const moveAction = (e) => {
        if (!isDragging) return;
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = currentX - startX;

        // Calculating based on percentage for better responsiveness
        const slideWidth = viewport.offsetWidth;
        const move = (currentIndex * -slideWidth) + diff;
        track.style.transform = `translateX(${move}px)`;
    };

    const endAction = (e) => {
        if (!isDragging) return;
        isDragging = false;

        const endX = e.type.includes('mouse') ? e.pageX : (e.changedTouches ? e.changedTouches[0].clientX : e.touches[0].clientX);
        const diff = endX - startX;

        // Threshold of 50px to change slide
        if (diff < -50 && currentIndex < totalSlides - 1) {
            currentIndex++;
        } else if (diff > 50 && currentIndex > 0) {
            currentIndex--;
        }

        updateSlider();
    };

    // Event Listeners bound to the specific section
    viewport.addEventListener('mousedown', startAction);
    window.addEventListener('mousemove', moveAction);
    window.addEventListener('mouseup', endAction);

    viewport.addEventListener('touchstart', startAction, { passive: true });
    viewport.addEventListener('touchmove', moveAction, { passive: true });
    viewport.addEventListener('touchend', endAction);

    // Global function updated to work with this scope
    window.goToSlide = function (index) {
        currentIndex = index;
        updateSlider();
    };

    function updateSlider() {
        track.style.transition = 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)';
        // Since you have 5 slides, each is 20% (100/5)
        const percentage = currentIndex * (100 / totalSlides);
        track.style.transform = `translateX(-${percentage}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
}