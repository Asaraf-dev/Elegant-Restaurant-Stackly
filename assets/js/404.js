
/*--- 404 Page ---*/
document.addEventListener("DOMContentLoaded", () => {
    /*--- Go Back Button ---*/
    const backButton = document.getElementById("er404Back");
    if (backButton) {
        backButton.addEventListener("click", () => {
            if (window.history.length > 1 && document.referrer && new URL(document.referrer).origin === window.location.origin) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    }
    /*--- Create Background Particles ---*/
    const particlesContainer = document.getElementById("er404Particles");
    if (particlesContainer && !particlesContainer.querySelector(".er-404-particle")) {
        for (let i = 0; i < 28; i++) {
            const particle = document.createElement("span");
            particle.className = "er-404-particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 5 + "s";
            particle.style.animationDuration = 4 + Math.random() * 5 + "s";
            particlesContainer.appendChild(particle);
        }
    }
});
