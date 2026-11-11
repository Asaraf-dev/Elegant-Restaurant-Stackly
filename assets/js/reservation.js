/*--- Table Reservation Form Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("erReservationForm");
    const popup = document.getElementById("erResPopup");

    if (!form || !popup || form.dataset.initialized === "true") return;
    form.dataset.initialized = "true";

    const nameInput = document.getElementById("erResName");
    const emailInput = document.getElementById("erResEmail");
    const phoneInput = document.getElementById("erResPhone");
    const guestsInput = document.getElementById("erResGuests");
    const dateInput = document.getElementById("erResDate");
    const timeInput = document.getElementById("erResTime");

    const popupReference = document.getElementById("erResBookingReference");
    const popupSummary = document.getElementById("erResPopupSummary");
    const closeButton = document.getElementById("erResPopupClose");
    const doneButton = document.getElementById("erResPopupDone");

    /*--- Set Minimum Reservation Date ---*/
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    dateInput.min = localToday;

    /*--- Name: Alphabet Characters Only ---*/
    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^\p{L}\s]/gu, "");
        clearError(this);
    });

    /*--- Phone: Numbers Only, Maximum 10 Digits ---*/
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
        clearError(this);
    });

    /*--- Guests: Numbers Only ---*/
    guestsInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 2);
        clearError(this);
    });

    /*--- Clear Errors While Editing ---*/
    [emailInput, dateInput, timeInput].forEach(input => {
        input.addEventListener("input", () => clearError(input));
        input.addEventListener("change", () => clearError(input));
    });

    function showError(input, message) {
        const errorElement = document.getElementById(input.id + "Error");
        const wrapper = input.closest(".er-res-form-input-wrap");

        input.classList.add("invalid");
        if (wrapper) wrapper.classList.add("invalid");
        if (errorElement) errorElement.textContent = message;
    }

    function clearError(input) {
        const errorElement = document.getElementById(input.id + "Error");
        const wrapper = input.closest(".er-res-form-input-wrap");

        input.classList.remove("invalid");
        if (wrapper) wrapper.classList.remove("invalid");
        if (errorElement) errorElement.textContent = "";
    }

    function validateForm() {
        let isValid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const guests = guestsInput.value.trim();
        const date = dateInput.value;
        const time = timeInput.value;

        [nameInput, emailInput, phoneInput, guestsInput, dateInput, timeInput].forEach(clearError);

        if (!name) {
            showError(nameInput, "Please enter your name.");
            isValid = false;
        } else if (!/^[\p{L}]+(?:[\s'-][\p{L}]+)*$/u.test(name)) {
            showError(nameInput, "Please enter a valid name using letters only.");
            isValid = false;
        }

        if (!email) {
            showError(emailInput, "Please enter your email address.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        if (!/^\d{10}$/.test(phone)) {
            showError(phoneInput, "Phone number must contain exactly 10 digits.");
            isValid = false;
        }

        if (!guests) {
            showError(guestsInput, "Please enter the number of guests.");
            isValid = false;
        } else if (Number(guests) < 1 || Number(guests) > 20) {
            showError(guestsInput, "Please enter between 1 and 20 guests.");
            isValid = false;
        }

        if (!date) {
            showError(dateInput, "Please select a reservation date.");
            isValid = false;
        } else if (date < localToday) {
            showError(dateInput, "Please select today or a future date.");
            isValid = false;
        }

        if (!time) {
            showError(timeInput, "Please select your preferred time.");
            isValid = false;
        }

        if (!isValid) {
            const firstInvalid = form.querySelector(".invalid");
            if (firstInvalid) firstInvalid.focus();
        }

        return isValid;
    }

    /*--- Open Success Popup ---*/
    function openPopup() {
        const reference = "ER-" + Date.now().toString().slice(-8);

        const bookingDate = new Date(dateInput.value + "T00:00:00").toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        popupReference.textContent = reference;

        popupSummary.innerHTML = `
            <div><span>Guest Name</span><strong>${escapeHTML(nameInput.value.trim())}</strong></div>
            <div><span>Guests</span><strong>${escapeHTML(guestsInput.value)}</strong></div>
            <div><span>Reservation Date</span><strong>${escapeHTML(bookingDate)}</strong></div>
            <div><span>Preferred Time</span><strong>${escapeHTML(timeInput.value)}</strong></div>
        `;

        popup.classList.add("active");
        popup.setAttribute("aria-hidden", "false");
        document.body.classList.add("er-res-popup-open");
        doneButton.focus();
    }

    /*--- Safe Text Output ---*/
    function escapeHTML(value) {
        return value.replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[character];
        });
    }

    /*--- Close Popup ---*/
    function closePopup() {
        popup.classList.remove("active");
        popup.setAttribute("aria-hidden", "true");
        document.body.classList.remove("er-res-popup-open");
    }

    closeButton.addEventListener("click", closePopup);
    doneButton.addEventListener("click", closePopup);

    popup.querySelector("[data-close-popup]").addEventListener("click", closePopup);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && popup.classList.contains("active")) {
            closePopup();
        }
    });

    /*--- Submit Reservation ---*/
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) return;

        openPopup();
    });
});
/*--- Table Reservation Form Section End ---*/

/*--- Choose Your Dining Experience Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const experienceSection = document.getElementById("erResExperience");
    const seatingSelect = document.getElementById("erResSeating");
    const reservationSection = document.getElementById("erResForm");

    if (!experienceSection || !seatingSelect || experienceSection.dataset.initialized === "true") return;
    experienceSection.dataset.initialized = "true";

    const experienceButtons = experienceSection.querySelectorAll(".er-res-experience-btn");

    experienceButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedSeating = this.dataset.seating;

            // Update reservation form seating preference
            seatingSelect.value = selectedSeating;
            seatingSelect.dispatchEvent(new Event("change", { bubbles: true }));

            // Update selected card appearance
            experienceButtons.forEach(item => {
                const card = item.closest(".er-res-experience-card");
                const buttonText = item.querySelector("span");

                card.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");
                buttonText.textContent = "Choose This Experience";
            });

            const selectedCard = this.closest(".er-res-experience-card");
            selectedCard.classList.add("selected");
            this.setAttribute("aria-pressed", "true");
            this.querySelector("span").textContent = "Experience Selected";

            // Scroll to reservation form
            reservationSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

        button.setAttribute("aria-pressed", "false");
    });
});
/*--- Choose Your Dining Experience Section End ---*/

/*--- Reservation Guidelines Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const faqSection = document.querySelector("#erResGuidelines .er-res-guidelines-faq");

    if (!faqSection || faqSection.dataset.initialized === "true") return;
    faqSection.dataset.initialized = "true";

    const faqItems = faqSection.querySelectorAll(".er-res-guidelines-faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".er-res-guidelines-faq-question");

        question.addEventListener("click", function () {
            const isActive = item.classList.contains("active");

            faqItems.forEach(faqItem => {
                faqItem.classList.remove("active");
                faqItem.querySelector(".er-res-guidelines-faq-question").setAttribute("aria-expanded", "false");
            });

            if (!isActive) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }
        });
    });
});
/*--- Reservation Guidelines Section End ---*/