
/*--- Footer ---*/
const initFooter = () => {
    const footer = document.getElementById("erFooter");
    if (!footer) return;
    /*--- Dynamic Copyright Year ---*/
    const footerYear = document.getElementById("erFooterYear");
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
    /*--- Back To Top ---*/
    const backToTop = document.getElementById("erFooterTop");
    backToTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    /*--- Copy Contact Information ---
    const copyButtons = footer.querySelectorAll(".er-com-footer-copy");
    const toast = document.getElementById("erFooterToast");
    let toastTimeout;
    const showToast = (message) => {
        if (!toast) return;
        const toastText = toast.querySelector("span");
        if (toastText) {
            toastText.textContent = message;
        }
        toast.classList.add("er-toast-show");
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("er-toast-show");
        }, 2500);
    };
    copyButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const copyText = button.dataset.copy;
            if (!copyText) return;
            try {
                await navigator.clipboard.writeText(copyText);
                showToast("Copied successfully!");
                const icon = button.querySelector("i");
                if (icon) {
                    icon.className = "fa-solid fa-check";
                    setTimeout(() => {
                        icon.className = "fa-regular fa-copy";
                    }, 1500);
                }
            } catch (error) {
                showToast("Unable to copy. Please copy manually.");
            }
        });
    });*/
};
document.addEventListener("DOMContentLoaded", initFooter);
document.addEventListener("erComponentsLoaded", initFooter);
