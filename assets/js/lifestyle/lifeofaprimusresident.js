// lifeofaprimusresident slider functionality

(function () {
    // 🔒 SECTION SCOPE
    const section = document.getElementById('lifeofaprimusresidentsec');
    if (!section) return;

    const sliderWrapper = section.querySelector('#sliderWrapper');
    const dotsContainer = section.querySelector('#dotsContainer');
    const slides = section.querySelectorAll('.slide');

    let currentSlide = 0;

    // Safety check
    if (!sliderWrapper || !dotsContainer || slides.length === 0) return;

    // 🟢 Clear old dots (important if tabs / dynamic reload)
    dotsContainer.innerHTML = '';

    // 🔵 Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            goToSlide(index);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    // 🔁 Slide change function
    function goToSlide(index) {
        if (index === currentSlide) return;

        // Remove active from old dot
        dots[currentSlide].classList.remove('active');

        currentSlide = index;

        // Move slider
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Add active to new dot
        dots[currentSlide].classList.add('active');
    }

    // 🔄 Optional Auto Play
    // const autoPlay = setInterval(() => {
    //     const nextSlide = (currentSlide + 1) % slides.length;
    //     goToSlide(nextSlide);
    // }, 5000);

})();
