// primusinthenewsMobSec script code

// Yaha humne poore logic ko Section ID ke sath bind kar diya hai
(function initPrimusSlider(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const slider = section.querySelector(".slider-container");
  const tracks = section.querySelectorAll(".slider-track");
  const slides = tracks[0].querySelectorAll(".slide"); // ✅ ONLY FIRST TRACK

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let currentIndex = 0;

  function slideWidth() {
    return slider.offsetWidth;
  }

  function maxTranslate() {
    return -slideWidth() * (slides.length - 1);
  }

  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("mouseup", dragEnd);
  slider.addEventListener("mouseleave", dragEnd);
  slider.addEventListener("mousemove", dragMove);

  slider.addEventListener("touchstart", dragStart, { passive: true });
  slider.addEventListener("touchend", dragEnd);
  slider.addEventListener("touchmove", dragMove, { passive: true });

  function dragStart(e) {
    isDragging = true;
    startPos = getX(e);
    animationID = requestAnimationFrame(animation);
    tracks.forEach((t) => (t.style.transition = "none"));
  }

  function dragMove(e) {
    if (!isDragging) return;

    const currentX = getX(e);
    currentTranslate = prevTranslate + currentX - startPos;

    // 🔒 HARD STOP LIMIT
    if (currentTranslate > 0) currentTranslate = 0;
    if (currentTranslate < maxTranslate()) currentTranslate = maxTranslate();
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -slideWidth() / 4 && currentIndex < slides.length - 1) {
      currentIndex++;
    }
    if (movedBy > slideWidth() / 4 && currentIndex > 0) {
      currentIndex--;
    }

    snapToSlide();
  }

  function snapToSlide() {
    currentTranslate = -currentIndex * slideWidth();
    prevTranslate = currentTranslate;

    tracks.forEach((track) => {
      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translateX(${currentTranslate}px)`;
    });
  }

  function animation() {
    tracks.forEach((track) => {
      track.style.transform = `translateX(${currentTranslate}px)`;
    });
    if (isDragging) requestAnimationFrame(animation);
  }

  function getX(e) {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  }

  window.addEventListener("resize", snapToSlide);
})("primusinthenewsMobSec"); // Yaha ID pass kari hai
