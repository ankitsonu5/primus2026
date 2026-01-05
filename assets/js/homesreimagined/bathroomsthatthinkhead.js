// bathroomsthatthinkheadsec script code

(function () {

    const section = document.getElementById("bathroomsthatthinkheadsec");
    if (!section) return;

    const track = section.querySelector(".carousel-track");
    const items = section.querySelectorAll(".carousel-item");
    const dots = section.querySelectorAll(".dot");
    const heading = section.querySelector("#contentHeading");
    const text = section.querySelector("#contentText");
    const prevBtn = section.querySelector(".arrow-left");
    const nextBtn = section.querySelector(".arrow-right");

    let currentIndex = 1;

    function updateCarousel() {
        items.forEach((item, i) => {
            item.classList.toggle("active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        heading.textContent = items[currentIndex].dataset.heading;
        text.textContent = items[currentIndex].dataset.text;

        const itemWidth = items[0].offsetWidth;
        const gap = 30;
        const containerWidth = track.parentElement.offsetWidth;

        const offset =
            -(currentIndex * (itemWidth + gap)) +
            (containerWidth / 2) -
            (itemWidth / 2);

        track.style.transform = `translateX(${offset}px)`;
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            currentIndex = Number(dot.dataset.index);
            updateCarousel();
        });
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();

})();
