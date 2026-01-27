// lifeofaprimusresident slider functionality

(function () {
    const section = document.getElementById('lifeofaprimusresidentsec');
    if (!section) return;

    const sliderWrapper = section.querySelector('#sliderWrapper');
    const dotsContainer = section.querySelector('#dotsContainer');
    const slides = section.querySelectorAll('.slide');

    let currentSlide = 0;

    function initSlider() {
        dotsContainer.innerHTML = '';

        if (window.innerWidth > 768) {
            // Desktop logic: Create 2 dots for 2 slides
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');

                dot.addEventListener('click', () => {
                    moveSlider(index);
                });
                dotsContainer.appendChild(dot);
            });
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        } else {
            // Mobile: Clear transform so native scroll works perfectly
            sliderWrapper.style.transform = 'none';
        }
    }

    function moveSlider(index) {
        if (window.innerWidth <= 768) return; // Mobile par click disabled

        const dots = dotsContainer.querySelectorAll('.dot');
        if (dots.length > 0) {
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots[currentSlide].classList.add('active');
        }
    }

    initSlider();

    window.addEventListener('resize', () => {
        initSlider();
    });
})();