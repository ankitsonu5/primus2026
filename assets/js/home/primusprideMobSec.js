// primusprideMobSec script code

// Yaha humne poore logic ko Section ID ke sath bind kar diya hai
(function initPrimusSlider(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const slider = section.querySelector('.slider-container');
    const track = section.querySelector('.slider-track');
    const slides = section.querySelectorAll('.slide');

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 0;

    // Events directly slider element par bind hain
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);
    slider.addEventListener('mousemove', dragAction);

    slider.addEventListener('touchstart', dragStart, { passive: true });
    slider.addEventListener('touchend', dragEnd);
    slider.addEventListener('touchmove', dragAction, { passive: true });

    function dragStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        track.style.transition = 'none';
    }

    function dragAction(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function dragEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

        setPositionByIndex();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        track.style.transition = 'transform 0.4s ease-out';
        currentTranslate = currentIndex * -slider.offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    window.addEventListener('resize', setPositionByIndex);

})('primusprideMobSec'); // Yaha ID pass kari hai