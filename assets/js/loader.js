
/*--- Page Loader ---*/
const erLoader = document.getElementById("erLoader");
const erLoaderMessage = document.getElementById("erLoaderMessage");
const erLoaderParticles = document.getElementById("erLoaderParticles");
let erLoaderMessageInterval = null;
let erLoaderHideTimeout = null;
let erLoaderExitTimeout = null;
/*--- Loader Messages ---*/
const erLoaderMessages = [
    "Preparing something extraordinary...",
    "Setting the perfect atmosphere...",
    "Bringing flavours to life...",
    "Curating your dining experience...",
    "Almost ready to welcome you..."
];
let erLoaderMessageIndex = 0;
/*--- Show Loader ---*/
function erShowLoader() {
    if (!erLoader) return;
    clearTimeout(erLoaderHideTimeout);
    clearTimeout(erLoaderExitTimeout);
    clearInterval(erLoaderMessageInterval);
    erLoader.style.display = "flex";
    erLoader.classList.remove("er-loader-hidden", "er-loader-exit");
    erLoaderMessageIndex = 0;
    if (erLoaderMessage) {
        erLoaderMessage.textContent = erLoaderMessages[0];
        erLoaderMessage.style.opacity = "1";
        erLoaderMessage.style.transform = "translateY(0)";
    }
    erLoaderMessageInterval = setInterval(() => {
        erLoaderMessageIndex = (erLoaderMessageIndex + 1) % erLoaderMessages.length;
        if (!erLoaderMessage) return;
        erLoaderMessage.style.opacity = "0";
        erLoaderMessage.style.transform = "translateY(5px)";
        setTimeout(() => {
            if (!erLoaderMessage) return;
            erLoaderMessage.textContent = erLoaderMessages[erLoaderMessageIndex];
            erLoaderMessage.style.opacity = "1";
            erLoaderMessage.style.transform = "translateY(0)";
        }, 250);
    }, 1600);
}
/*--- Hide Loader ---*/
function erHideLoader() {
    if (!erLoader) return;
    clearTimeout(erLoaderHideTimeout);
    erLoaderHideTimeout = setTimeout(() => {
        clearInterval(erLoaderMessageInterval);
        erLoader.classList.add("er-loader-exit");
        erLoaderExitTimeout = setTimeout(() => {
            erLoader.style.display = "none";
        }, 850);
    }, 400);
}
/*--- Create Loader Particles ---*/
function erCreateLoaderParticles() {
    if (!erLoaderParticles || erLoaderParticles.querySelector(".er-ldr-particle")) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("span");
        const size = 2 + Math.random() * 3;
        particle.className = "er-ldr-particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.animationDelay = Math.random() * 5 + "s";
        particle.style.animationDuration = 4 + Math.random() * 5 + "s";
        erLoaderParticles.appendChild(particle);
    }
}
/*--- Initial Page Load ---*/
document.addEventListener("DOMContentLoaded", () => {
    erCreateLoaderParticles();
    erShowLoader();
});
/*--- Window Loaded ---*/
window.addEventListener("load", erHideLoader);
/*--- Browser Back / Forward ---*/
window.addEventListener("pageshow", event => {
    if (event.persisted) {
        erShowLoader();
        erHideLoader();
    }
});
