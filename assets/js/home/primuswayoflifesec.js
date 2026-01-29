document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("primuswayoflifesec");
    const sliderTrack = section.querySelector("#sliderTrack");
    const slides = section.querySelectorAll(".slide");
    const prevBtn = section.querySelector("#prevBtn");
    const nextBtn = section.querySelector("#nextBtn");

    let currentIndex = 0;

    function updateSlider(animate = true) {
        const slideWidth = slides[0].offsetWidth;

        sliderTrack.style.transition = animate
            ? "transform 0.5s ease-in-out"
            : "none";

        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
        const maxIndex = slides.length - 2;

        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        } else {
            currentIndex = 0;
            updateSlider();
        }
    });

    prevBtn.addEventListener("click", () => {
        const maxIndex = slides.length - 2;

        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        } else {
            currentIndex = maxIndex;
            updateSlider();
        }
    });

    window.addEventListener("resize", () => updateSlider(false));

    updateSlider();
});
