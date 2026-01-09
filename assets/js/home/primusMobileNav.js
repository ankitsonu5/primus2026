// primusMobileNav script code

(() => {
    const nav = document.getElementById('primusMobileNav');
    if (!nav) return;

    const hamburger = nav.querySelector('.pm-hamburger');
    const enquiryBtn = nav.querySelector('.pm-enquiry-btn');
    const enquiryDrop = nav.querySelector('.pm-enquiry-dropdown');
    const links = nav.querySelectorAll('.pm-nav-links a');

    hamburger.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        document.body.classList.toggle('pm-nav-open', open);
        hamburger.textContent = open ? '✕' : '☰';
    });

    enquiryBtn.addEventListener('click', e => {
        e.stopPropagation();
        enquiryDrop.classList.toggle('is-visible');
    });

    document.addEventListener('click', e => {
        if (!nav.contains(e.target)) {
            enquiryDrop.classList.remove('is-visible');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');

            nav.classList.remove('is-open');
            document.body.classList.remove('pm-nav-open');
            hamburger.textContent = '☰';
        });
    });
})();