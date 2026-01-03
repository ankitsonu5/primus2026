// bathroomsthatthinkheadsec carousel functionality

(function () {

    // 🔒 SECTION SCOPE
    const section = document.getElementById("bathroomsthatthinkheadsec");
    if (!section) return;

    // ELEMENTS (ONLY INSIDE THIS SECTION)
    const track = section.querySelector("#carouselTrack");
    const items = section.querySelectorAll(".carousel-item");
    const dots = section.querySelectorAll(".pagination .dot");
    const headingEl = section.querySelector("#contentHeading");
    const textEl = section.querySelector("#contentText");

    const prevBtn = section.querySelector(".arrow-left");
    const nextBtn = section.querySelector(".arrow-right");

    let currentIndex = 1;

    // CORE UPDATE FUNCTION
    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.toggle("active", index === currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });

        const activeItem = items[currentIndex];
        headingEl.textContent = activeItem.dataset.heading;
        textEl.textContent = activeItem.dataset.text;

        const itemWidth = items[0].offsetWidth;
        const gap = 30;
        const containerWidth = track.parentElement.offsetWidth;

        const offset =
            -(currentIndex * (itemWidth + gap)) +
            (containerWidth / 2) -
            (itemWidth / 2);

        track.style.transform = `translateX(${offset}px)`;
    }

    // NAVIGATION FUNCTIONS (PRIVATE)
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

    // BUTTON EVENTS
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // DOT EVENTS
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
    });

    // RESIZE HANDLER (SCOPED)
    window.addEventListener("resize", updateCarousel);

    // INITIAL LOAD
    updateCarousel();

})();
