// activelivingofMobSec script code

// Pure script ko ek function ya block me wrap karna safety ke liye achha hai
(function () {
  const section = document.querySelector(".bathroomsthatthinkheadfMobSec");

  // Agar section page par nahi hai toh script run nahi hogi
  if (!section) return;

  const sliderData = [
    {
      title: "Thoughtful design ",
      description:
        "Details such as anti-skid tiles quietly support everyday ease and safety.",
    },
    {
      title: "Motion Sensors",
      description:
        "Lights that respond automatically, so nothing is ever missed in the dark.",
    },
    {
      title: "Smart Switches",
      description:
        "Easy-to-use controls that make daily living simpler and safer.",
    },
    {
      title: "Fall Detection",
      description:
        "Immediate alerts that ensure help reaches you when it matters most.",
    },
    {
      title: "Home Security System",
      description:
        "Round-the-clock protection that keeps your home secure without feeling intrusive.",
    },
    {
      title: "Gas Leak Sensors",
      description:
        "Early detection that prevents risks before they become concerns.",
    },
    {
      title: "Entrance Video Door Phone",
      description: "See and speak to visitors before opening the door.",
    },
    {
      title: "Smoke Detector",
      description: "Early alerts that protect your home from unseen risks.",
    },
    {
      title: "Two Eye Viewers",
      description: "A wider, clearer view of who’s outside your door.",
    },
    {
      title: "Community Dining",
      description:
        "Nutritious, thoughtfully prepared meals enjoyed together, because good food tastes better in good company.",
    },
  ];

  let currentIndex = 1;

  // Saare selectors ko 'section' variable se bind kar diya gaya hai
  const slides = section.querySelectorAll(".slide");
  const dots = section.querySelectorAll(".dot");
  const description = section.querySelector("#description");
  const title = section.querySelector("#title");
  const sliderContainer = section.querySelector("#sliderContainer");

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function updateSlider(index) {
    currentIndex = index;

    slides.forEach((slide, i) => {
      slide.classList.remove("left", "center", "right", "hidden");

      if (i === index) {
        slide.classList.add("center");
      } else if (i === index - 1) {
        slide.classList.add("left");
      } else if (i === index + 1) {
        slide.classList.add("right");
      } else {
        slide.classList.add("hidden");
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.remove("active");
      if (i === index) {
        dot.classList.add("active");
      }
    });

    description.textContent = sliderData[index].description;
    title.textContent = sliderData[index].title;
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      updateSlider(index);
    });
  });

  // Touch and Mouse events restricted to this section's container
  sliderContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  sliderContainer.addEventListener("touchmove", (e) => {
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

  sliderContainer.addEventListener("touchend", handleEnd);
  sliderContainer.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  sliderContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  sliderContainer.addEventListener("mouseup", handleEnd);
  sliderContainer.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  // Initial call
  updateSlider(currentIndex);
})();
