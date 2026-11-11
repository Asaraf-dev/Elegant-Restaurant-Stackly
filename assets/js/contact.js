/*--- Send Us A Message Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("erConMessageForm");
    const nameInput = document.getElementById("erConName");
    const phoneInput = document.getElementById("erConPhone");
    const popup = document.getElementById("erConFormPopup");
    const closeBtn = document.getElementById("erConPopupClose");
    const okBtn = document.getElementById("erConPopupOk");
    const overlay = popup?.querySelector(".er-con-form-popup-overlay");

    if (!form || !popup || form.dataset.initialized === "true") return;
    form.dataset.initialized = "true";

    // Name: Allow alphabets and spaces only
    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z ]/g, "").replace(/\s{2,}/g, " ");
    });

    // Phone: Allow numbers only, maximum 10 digits
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
    });

    // Open success popup
    function openPopup() {
        popup.classList.add("active");
        popup.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        okBtn.focus();
    }

    // Close success popup
    function closePopup() {
        popup.classList.remove("active");
        popup.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    // Form submission - Native browser validation runs before this event
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        openPopup();
        form.reset();
    });

    closeBtn.addEventListener("click", closePopup);
    okBtn.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && popup.classList.contains("active")) {
            closePopup();
        }
    });
});
/*--- Send Us A Message Section End ---*/

/*--- FAQ Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".er-con-faq-item");

    faqItems.forEach(function (item) {
        const question = item.querySelector(".er-con-faq-question");

        question.addEventListener("click", function () {
            const isActive = item.classList.contains("active");

            faqItems.forEach(function (faqItem) {
                faqItem.classList.remove("active");
                faqItem.querySelector(".er-con-faq-question").setAttribute("aria-expanded", "false");
            });

            if (!isActive) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }
        });
    });
});
/*--- FAQ Section End ---*/