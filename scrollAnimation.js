
window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(function (element) {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});