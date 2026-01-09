// exploreourcommunitiessec slider functionality

(function () {
    // 🔒 SECTION SCOPE
    const section = document.getElementById('exploreourcommunitiessec');
    if (!section) return;

    // ✅ ELEMENTS
    const tabs = section.querySelectorAll('.tab');
    const propertyCards = section.querySelectorAll('.property-card');
    const dots = section.querySelectorAll('.dot');
    const regionsTab = section.querySelector('.tab.regions');
    const dropdown = section.querySelector('.regions-dropdown');
    const dropdownIcon = section.querySelector('.dropdown-icon');
    const regionItems = section.querySelectorAll('.region-item');

    let currentSlide = 0;

    // =====================
    // TAB CLICK HANDLING
    // =====================
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {

            // 🌍 REGIONS TAB
            if (tab.dataset.tab === 'regions') {
                e.stopPropagation(); // 🔥 IMPORTANT

                dropdown.classList.toggle('show');
                dropdownIcon.classList.toggle('open');
                return;
            }

            // 🟣 OTHER TABS
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            dropdown.classList.remove('show');
            dropdownIcon.classList.remove('open');

            showSlide(parseInt(tab.dataset.slide, 10));
        });
    });

    // =====================
    // REGION DROPDOWN ITEMS
    // =====================
    regionItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // 🔥 IMPORTANT

            tabs.forEach(t => t.classList.remove('active'));
            regionsTab.classList.add('active');

            dropdown.classList.remove('show');
            dropdownIcon.classList.remove('open');

            showSlide(parseInt(item.dataset.slide, 10));
        });
    });

    // =====================
    // PREVENT DROPDOWN SELF CLOSE
    // =====================
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // =====================
    // DOT NAVIGATION
    // =====================
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.dot, 10);
            showSlide(slideIndex);

            tabs.forEach(t => t.classList.remove('active'));

            if (slideIndex === 0) {
                tabs[0].classList.add('active');
            } else if (slideIndex === 1) {
                tabs[1].classList.add('active');
            }
            // ❌ REGIONS TAB intentionally NOT auto-active
        });
    });

    // =====================
    // CORE SLIDE FUNCTION
    // =====================
    function showSlide(index) {
        currentSlide = index;

        propertyCards.forEach(card => card.classList.remove('active'));
        if (propertyCards[index]) {
            propertyCards[index].classList.add('active');
        }

        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    // =====================
    // OUTSIDE CLICK CLOSE
    // =====================
    document.addEventListener('click', (e) => {
        if (!section.contains(e.target)) {
            dropdown.classList.remove('show');
            dropdownIcon.classList.remove('open');
        }
    });

})();
