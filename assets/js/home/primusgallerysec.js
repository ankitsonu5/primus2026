const panels = document.querySelectorAll('.accordion-panel');

panels.forEach(panel => {
    panel.addEventListener('mouseenter', function () {
        // सभी panels से active class हटाएं
        panels.forEach(p => p.classList.remove('active'));

        // current panel में active class जोड़ें
        this.classList.add('active');
    });
});