// exploreourcommunitiessec slider functionality

(function () {
    // 🔒 SECTION SCOPE
    const section = document.getElementById('exploreourcommunitiessec');
    if (!section) return;

    // ✅ ELEMENTS (ONLY INSIDE THIS SECTION)
    const tabs = section.querySelectorAll('.tab');
    const propertyCards = section.querySelectorAll('.property-card');
    const dots = section.querySelectorAll('.dot');
    const regionsTab = section.querySelector('.tab.regions');
    const dropdown = section.querySelector('.regions-dropdown');
    const dropdownIcon = section.querySelector('.dropdown-icon');
    const regionItems = section.querySelectorAll('.region-item');

    let currentSlide = 0;

    // =====================
    // TAB SWITCHING
    // =====================
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {

            if (tab.dataset.tab === 'regions') {
                e.stopPropagation();
                dropdown.classList.toggle('show');
                dropdownIcon.classList.toggle('open');
                return;
            }

            // Remove active from non-region tabs
            tabs.forEach(t => {
                if (t.dataset.tab !== 'regions') {
                    t.classList.remove('active');
                }
            });

            tab.classList.add('active');

            // Close dropdown
            dropdown.classList.remove('show');
            dropdownIcon.classList.remove('open');

            // Show slide
            const slideIndex = parseInt(tab.dataset.slide, 10);
            showSlide(slideIndex);
        });
    });

    // =====================
    // REGION DROPDOWN ITEMS
    // =====================
    regionItems.forEach(item => {
        item.addEventListener('click', () => {

            // Remove active from first two tabs
            tabs.forEach(t => {
                if (t.dataset.tab !== 'regions') {
                    t.classList.remove('active');
                }
            });

            // Activate regions tab
            regionsTab.classList.add('active');

            // Close dropdown
            dropdown.classList.remove('show');
            dropdownIcon.classList.remove('open');

            // Show slide
            const slideIndex = parseInt(item.dataset.slide, 10);
            showSlide(slideIndex);
        });
    });

    // =====================
    // DOT NAVIGATION
    // =====================
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.dot, 10);
            showSlide(slideIndex);

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));

            if (slideIndex === 0) {
                tabs[0].classList.add('active');
            } else if (slideIndex === 1) {
                tabs[1].classList.add('active');
            } else {
                regionsTab.classList.add('active');
            }
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