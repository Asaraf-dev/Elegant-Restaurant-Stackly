/*--- Our Story Section Start ---*/
function initAboutStory() {
    const story = document.getElementById("erAbtStory");
    if (!story || story.dataset.initialized === "true") return;

    story.dataset.initialized = "true";

    const counters = story.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.count);
        const duration = 3800;

        if (prefersReducedMotion) {
            counter.textContent = target.toLocaleString("en-IN");
            return;
        }

        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(target * easedProgress);

            counter.textContent = currentValue.toLocaleString("en-IN");

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString("en-IN");
            }
        };

        requestAnimationFrame(updateCounter);
    };

    if (!("IntersectionObserver" in window)) {
        counters.forEach(animateCounter);
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animateCounter);
                currentObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(story);
}

/*--- About Page Initialization ---*/
document.addEventListener("DOMContentLoaded", initAboutStory);
document.addEventListener("erComponentsLoaded", initAboutStory);
/*--- Our Story Section End ---*/
