let currentIndex = 1;
const track = document.getElementById('carouselTrack');
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    // Update active states
    items.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    // Update content from data attributes
    const activeItem = items[currentIndex];
    document.getElementById('contentHeading').textContent = activeItem.dataset.heading;
    document.getElementById('contentText').textContent = activeItem.dataset.text;

    // Calculate offset to center the active item
    const itemWidth = items[0].offsetWidth;
    const gap = 30;
    const offset = -(currentIndex * (itemWidth + gap)) + (track.parentElement.offsetWidth / 2) - (itemWidth / 2);
    track.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Update on window resize
window.addEventListener('resize', updateCarousel);

// Initial update
updateCarousel();