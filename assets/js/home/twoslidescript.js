// primusdifftoldresisec ka code for two slide script

const primusSliderTrack = document.getElementById('primusSliderTrack');
const primusPrevBtn = document.getElementById('primusPrevBtn');
const primusNextBtn = document.getElementById('primusNextBtn');
const primusSlides = document.querySelectorAll('.primus-slide');
const primusVideos = document.querySelectorAll('.primus-video');
const primusVideoOverlays = document.querySelectorAll('.primus-video-overlay');

let primusCurrentSlide = 0;
const primusTotalSlides = primusSlides.length;

function primusUpdateSlidePosition() {
    primusSliderTrack.style.transform = `translateX(-${primusCurrentSlide * 100}%)`;
    // Pause all videos when sliding
    primusVideos.forEach(video => {
        video.pause();
        video.closest('.primus-video-overlay').classList.remove('playing');
    });
}

// Video play/pause functionality
primusVideos.forEach((video, index) => {
    const overlay = video.closest('.primus-video-overlay');

    video.addEventListener('click', function (e) {
        e.stopPropagation();

        if (this.paused) {
            // Pause all other videos
            primusVideos.forEach((v, i) => {
                if (i !== index) {
                    v.pause();
                    v.closest('.primus-video-overlay').classList.remove('playing');
                }
            });

            // Play this video
            this.play();
            overlay.classList.add('playing');
        } else {
            // Pause this video
            this.pause();
            overlay.classList.remove('playing');
        }
    });

    // Handle video ended event
    video.addEventListener('ended', function () {
        overlay.classList.remove('playing');
    });
});

primusNextBtn.addEventListener('click', () => {
    if (primusCurrentSlide < primusTotalSlides - 1) {
        primusCurrentSlide++;
    } else {
        primusCurrentSlide = 0;
    }
    primusUpdateSlidePosition();
});

primusPrevBtn.addEventListener('click', () => {
    if (primusCurrentSlide > 0) {
        primusCurrentSlide--;
    } else {
        primusCurrentSlide = primusTotalSlides - 1;
    }
    primusUpdateSlidePosition();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        primusPrevBtn.click();
    } else if (e.key === 'ArrowRight') {
        primusNextBtn.click();
    }
});

// Touch swipe support for mobile
let primusTouchStartX = 0;
let primusTouchEndX = 0;

primusSliderTrack.addEventListener('touchstart', (e) => {
    primusTouchStartX = e.changedTouches[0].screenX;
});

primusSliderTrack.addEventListener('touchend', (e) => {
    primusTouchEndX = e.changedTouches[0].screenX;
    primusHandleSwipe();
});

function primusHandleSwipe() {
    if (primusTouchEndX < primusTouchStartX - 50) {
        primusNextBtn.click();
    }
    if (primusTouchEndX > primusTouchStartX + 50) {
        primusPrevBtn.click();
    }
}