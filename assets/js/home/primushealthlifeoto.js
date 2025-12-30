// primushealthlifeoto slider functionality

(function () {

    const section = document.querySelector('#primushealthlifeotosec');
    if (!section) return;

    const slides = section.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // dots update (sirf current slide ke)
        slides.forEach((slide, slideIndex) => {
            const dots = slide.querySelectorAll('.dot');
            dots.forEach(dot => dot.classList.remove('active'));

            if (dots[slideIndex]) {
                dots[slideIndex].classList.add('active');
            }
        });
    }

    // expose ONLY required functions to window (unique names)
    window.primusChangeSlide = function (direction) {
        currentSlide += direction;
        showSlide(currentSlide);
    };

    window.primusGoToSlide = function (index) {
        currentSlide = index;
        showSlide(currentSlide);
    };

    // init
    showSlide(currentSlide);

})();
