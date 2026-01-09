// activelivingofMobSec script code

// Pure script ko ek function ya block me wrap karna safety ke liye achha hai
(function () {
    const section = document.querySelector('#activelivingofMobSec');

    // Agar section page par nahi hai toh script run nahi hogi
    if (!section) return;

    const sliderData = [
        { description: "Advanced technology seamlessly integrated into every aspect of your daily routine for effortless living." },
        { description: "Premium finishes and thoughtful layouts that blend contemporary style with lasting elegance." },
        { description: "Wide corridors, ramps, and wheelchair-ready spaces at every turn. Freedom of movement built into your home." },
        { description: "Flexible floor plans that adapt to your lifestyle, creating room for every moment that matters." },
        { description: "Floor-to-ceiling windows and open layouts that bring the outdoors in, filling your home with warmth." },
        { description: "Sophisticated architecture and premium materials that elevate every corner of your space." },
        { description: "Dedicated fitness areas, meditation spaces, and green zones that support your healthy lifestyle." },
        { description: "Shared amenities and vibrant gathering spaces that bring neighbors together as friends." }
    ];

    let currentIndex = 1;

    // Saare selectors ko 'section' variable se bind kar diya gaya hai
    const slides = section.querySelectorAll('.slide');
    const dots = section.querySelectorAll('.dot');
    const description = section.querySelector('#description');
    const sliderContainer = section.querySelector('#sliderContainer');

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function updateSlider(index) {
        currentIndex = index;

        slides.forEach((slide, i) => {
            slide.classList.remove('left', 'center', 'right', 'hidden');

            if (i === index) {
                slide.classList.add('center');
            } else if (i === index - 1) {
                slide.classList.add('left');
            } else if (i === index + 1) {
                slide.classList.add('right');
            } else {
                slide.classList.add('hidden');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });

        description.textContent = sliderData[index].description;
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            updateSlider(index);
        });
    });

    // Touch and Mouse events restricted to this section's container
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    const handleEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < slides.length - 1) {
                updateSlider(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                updateSlider(currentIndex - 1);
            }
        }
    };

    sliderContainer.addEventListener('touchend', handleEnd);
    sliderContainer.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
    });

    sliderContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });

    sliderContainer.addEventListener('mouseup', handleEnd);
    sliderContainer.addEventListener('mouseleave', () => { isDragging = false; });

    // Initial call
    updateSlider(currentIndex);
})();