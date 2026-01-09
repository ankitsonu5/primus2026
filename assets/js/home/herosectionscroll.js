const videoBox = document.getElementById('videoBox');
const mainContainer = document.getElementById('mainContainer');
const oldText = document.getElementById('oldText');
const newText = document.getElementById('newText');
const leftPanel = document.getElementById('leftPanel');
const rightPanel = document.getElementById('rightPanel');
const track = document.querySelector('.scroll-track');

window.addEventListener('scroll', () => {
    const rect = document.getElementById('hero-section-scroll').getBoundingClientRect();
    const scrollPos = -rect.top;
    const windowHeight = window.innerHeight;
    const totalScroll = track.offsetHeight - windowHeight;
    const scrollFraction = Math.max(0, Math.min(scrollPos / totalScroll, 1));

    const isDesktop = window.innerWidth > 768;

    if (isDesktop) {
        // Desktop: Video shrinks, panels slide up from bottom
        let videoProgress = Math.min(scrollFraction / 0.4, 1);
        videoBox.style.width = (100 - (videoProgress * 50)) + '%';
        mainContainer.style.gap = (videoProgress * 20) + 'px';

        if (videoProgress >= 1) {
            let sideProgress = Math.min((scrollFraction - 0.4) / 0.5, 1);
            leftPanel.style.width = '25%';
            rightPanel.style.width = '25%';
            leftPanel.style.opacity = '1';
            rightPanel.style.opacity = '1';

            let ty = 100 - (sideProgress * 100);
            leftPanel.style.transform = `translateY(${ty}vh)`;
            rightPanel.style.transform = `translateY(${ty}vh)`;
        } else {
            leftPanel.style.width = '0%';
            rightPanel.style.width = '0%';
            leftPanel.style.opacity = '0';
            leftPanel.style.transform = `translateY(100vh)`;
            rightPanel.style.transform = `translateY(100vh)`;
        }
    } else {
        // Mobile: Sequential Card Animation
        videoBox.style.width = '100%';

        // Left Panel Slide (25% to 60%)
        let leftProgress = Math.max(0, Math.min((scrollFraction - 0.25) / 0.35, 1));
        if (leftProgress > 0) {
            leftPanel.style.opacity = '1';
            let transY = 100 - (leftProgress * 100);
            leftPanel.style.transform = `translate(-50%, calc(-50% + ${transY}vh))`;
        } else {
            leftPanel.style.opacity = '0';
            leftPanel.style.transform = `translate(-50%, 100vh)`;
        }

        // Right Panel Slide (60% to 95%)
        let rightProgress = Math.max(0, Math.min((scrollFraction - 0.6) / 0.35, 1));
        if (rightProgress > 0) {
            rightPanel.style.opacity = '1';
            let transY = 100 - (rightProgress * 100);
            rightPanel.style.transform = `translate(-50%, calc(-50% + ${transY}vh))`;
        } else {
            rightPanel.style.opacity = '0';
            rightPanel.style.transform = `translate(-50%, 100vh)`;
        }
    }

    // Common Text Fade
    if (scrollFraction > 0.18) {
        oldText.style.opacity = '0';
        newText.style.opacity = '1';
    } else {
        oldText.style.opacity = '1';
        newText.style.opacity = '0';
    }
});