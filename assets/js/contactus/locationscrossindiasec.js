// JavaScript for handling location dropdowns and content display
// locationscrossindiasec script for Contact Us page

let currentDropdown = null;

function toggleDropdown(index) {
    const dropdown = document.getElementById(`dropdown-${index}`);
    const tabs = document.querySelectorAll('.tab');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Close all other dropdowns
    dropdowns.forEach((dd, i) => {
        if (i !== index) {
            dd.classList.remove('show');
        }
    });

    // Remove active class from all tabs
    tabs.forEach((tab, i) => {
        if (i !== index) {
            tab.classList.remove('active');
        }
    });

    // Toggle current dropdown and tab
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        tabs[index].classList.remove('active');
        currentDropdown = null;
    } else {
        dropdown.classList.add('show');
        tabs[index].classList.add('active');
        currentDropdown = index;
    }
}

function selectLocation(city, location) {
    // Hide all content sections
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected content section
    const locationKey = location.toLowerCase().replace(/\s+/g, '-').replace('primus-', '');
    const contentId = `content-${city}-${locationKey}`;
    const selectedSection = document.getElementById(contentId);

    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Close all dropdowns
    document.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('show'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    currentDropdown = null;
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const tabWrappers = document.querySelectorAll('.tab-wrapper');
    let clickedInside = false;

    tabWrappers.forEach(wrapper => {
        if (wrapper.contains(event.target)) {
            clickedInside = true;
        }
    });

    if (!clickedInside && currentDropdown !== null) {
        document.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('show'));
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        currentDropdown = null;
    }
});