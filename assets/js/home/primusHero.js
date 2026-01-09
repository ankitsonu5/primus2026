(() => {
    const hero = document.getElementById("primusHero");
    if (!hero) return;

    const textEl = hero.querySelector(".ph-dynamic-text");
    let textChanged = false;

    window.addEventListener("scroll", () => {
        const rect = hero.getBoundingClientRect();
        const progress = Math.abs(rect.top);

        if (progress > 60 && progress < 350) {
            if (!textChanged) {
                fadeText("Welcome to Primus");
                textChanged = true;
            }
            textEl.style.transform = "translateY(0)";
        }

        else if (progress >= 350) {
            textEl.style.opacity = "0";
            textEl.style.transform = "translateY(-250px)";
        }

        else if (progress <= 60) {
            if (textChanged) {
                fadeText("What good is living long, if you don’t live well?");
                textChanged = false;
            }
            textEl.style.transform = "translateY(0)";
        }
    });

    function fadeText(text) {
        textEl.style.opacity = "0";
        setTimeout(() => {
            textEl.textContent = text;
            textEl.style.opacity = "1";
        }, 200);
    }
})();