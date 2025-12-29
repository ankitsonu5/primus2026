// navbarsec script code

// ===== NAVBAR STICKY =====
const navbar = document.querySelector(".navbar");
const space = document.getElementById("navbar-space");

const navbarHeight = navbar.offsetHeight;
const navbarOffset = navbar.offsetTop;

space.style.height = "0px";

window.addEventListener("scroll", () => {
    if (window.scrollY > navbarOffset) {
        navbar.classList.add("sticky");
        space.style.height = navbarHeight + "px";
    } else {
        navbar.classList.remove("sticky");
        space.style.height = "0px";
    }
});

// ===== DROPDOWN =====
const enquiryBtn = document.getElementById("enquiryBtn");
const dropdown = document.getElementById("dropdown");

enquiryBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    enquiryBtn.classList.toggle("active");
    dropdown.classList.toggle("active");
});

document.addEventListener("click", () => {
    enquiryBtn.classList.remove("active");
    dropdown.classList.remove("active");
});
