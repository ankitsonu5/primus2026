const container = document.getElementById('mainContainer');
let isFullWidth = true;

container.addEventListener('click', function () {
    if (isFullWidth) {
        container.classList.remove('full-width');
        container.classList.add('three-panel');
    } else {
        container.classList.remove('three-panel');
        container.classList.add('full-width');
    }
    isFullWidth = !isFullWidth;
});