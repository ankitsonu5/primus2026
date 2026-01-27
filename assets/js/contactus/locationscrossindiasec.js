// JavaScript for handling location dropdowns and content display
// locationscrossindiasec script for Contact Us page

let currentDropdown = null;

function toggleDropdown(index) {
    const wrappers = document.querySelectorAll('#locationscrossindiasec .tab-wrapper');

    wrappers.forEach((wrapper, i) => {
        const tab = wrapper.querySelector('.tab');
        const dropdown = wrapper.querySelector('.dropdown');

        if (i === index) {
            const isOpen = dropdown.classList.contains('show');
            dropdown.classList.toggle('show', !isOpen);
            tab.classList.toggle('active', !isOpen);
            currentDropdown = !isOpen ? index : null;
        } else {
            dropdown.classList.remove('show');
            tab.classList.remove('active');
        }
    });
}

function selectLocation(id) {
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
    closeAllDropdowns();
}

/* OUTSIDE CLICK CLOSE */
document.addEventListener('click', function (e) {
    const section = document.getElementById('locationscrossindiasec');
    if (!section.contains(e.target)) {
        closeAllDropdowns();
        return;
    }

    if (currentDropdown !== null) {
        const wrappers = document.querySelectorAll('#locationscrossindiasec .tab-wrapper');
        if (!wrappers[currentDropdown].contains(e.target)) {
            closeAllDropdowns();
        }
    }
});

function closeAllDropdowns() {
    document.querySelectorAll('#locationscrossindiasec .dropdown').forEach(d => d.classList.remove('show'));
    document.querySelectorAll('#locationscrossindiasec .tab').forEach(t => t.classList.remove('active'));
    currentDropdown = null;
}