document.addEventListener('DOMContentLoaded', () => {
    // Reveal scroll animation
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 80;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    // Trigger immediately on load for above-fold items
    revealOnScroll();

    window.addEventListener('scroll', revealOnScroll);
});
