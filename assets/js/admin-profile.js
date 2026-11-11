
/*--- Admin Profile Management ---*/
document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("erAdminProfileForm");
    const passwordForm = document.getElementById("erAdminPasswordForm");

    const nameInput = document.getElementById("erAdminProfileName");
    const emailInput = document.getElementById("erAdminProfileEmail");
    const phoneInput = document.getElementById("erAdminProfilePhone");

    const displayName = document.getElementById("erAdminProfileDisplayName");
    const displayEmail = document.getElementById("erAdminProfileDisplayEmail");
    const accountEmail = document.getElementById("erAdminProfileAccountEmail");

    const profileMessage = document.getElementById("erAdminProfileMessage");
    const passwordMessage = document.getElementById("erAdminPasswordMessage");

    if (!profileForm || !passwordForm) return;

    /*--- Load Saved Profile ---*/
    function loadProfile() {
        const name = localStorage.getItem("erUserName") || localStorage.getItem("erRegisteredName") || "";
        const email = localStorage.getItem("erUserEmail") || localStorage.getItem("erRegisteredEmail") || "";
        const phone = localStorage.getItem("erUserPhone") || localStorage.getItem("erRegisteredPhone") || "";

        nameInput.value = name;
        emailInput.value = email;
        phoneInput.value = phone;

        updateProfileDisplay(name, email);
    }

    /*--- Update Profile Display ---*/
    function updateProfileDisplay(name, email) {
        displayName.textContent = name || "Welcome";
        displayEmail.textContent = email || "Email not provided";
        accountEmail.textContent = email || "Not provided";

        const topbarName = document.getElementById("erDashTopbarName");
        const mobileName = document.getElementById("erDashMobileName");
        const topbarEmail = document.getElementById("erDashTopbarEmail");
        const mobileEmail = document.getElementById("erDashMobileEmail");

        if (topbarName) topbarName.textContent = name || "Welcome";
        if (mobileName) mobileName.textContent = name || "Welcome";
        if (topbarEmail) topbarEmail.textContent = email || "Email not provided";
        if (mobileEmail) mobileEmail.textContent = email || "Email not provided";
    }

    /*--- Profile Name Validation ---*/
    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    });

    /*--- Phone Number Validation ---*/
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });

    /*--- Save Profile ---*/
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim().replace(/\s+/g, " ");
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name.length < 2) {
            showMessage(profileMessage, "Please enter a valid full name.", "error");
            nameInput.focus();
            return;
        }

        if (phone && !/^\d{10}$/.test(phone)) {
            showMessage(profileMessage, "Please enter a valid 10-digit phone number.", "error");
            phoneInput.focus();
            return;
        }

        localStorage.setItem("erUserName", name);
        localStorage.setItem("erRegisteredName", name);
        localStorage.setItem("erUserEmail", email);
        localStorage.setItem("erRegisteredEmail", email);
        localStorage.setItem("erUserPhone", phone);
        localStorage.setItem("erRegisteredPhone", phone);

        updateProfileDisplay(name, email);
        showMessage(profileMessage, "Profile information saved successfully.", "success");
    });

    /*--- Reset Profile Form ---*/
    profileForm.addEventListener("reset", function () {
        setTimeout(function () {
            loadProfile();
            showMessage(profileMessage, "", "");
        }, 0);
    });

    /*--- Password Visibility ---*/
    document.querySelectorAll("[data-password-target]").forEach(function (button) {
        button.addEventListener("click", function () {
            const target = document.getElementById(this.dataset.passwordTarget);
            const icon = this.querySelector("i");

            if (!target || !icon) return;

            const isPassword = target.type === "password";
            target.type = isPassword ? "text" : "password";
            icon.classList.toggle("fa-eye", !isPassword);
            icon.classList.toggle("fa-eye-slash", isPassword);
            this.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
        });
    });

    /*--- Password Form Validation ---*/
    passwordForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const currentPassword = document.getElementById("erAdminCurrentPassword").value;
        const newPassword = document.getElementById("erAdminNewPassword").value;
        const confirmPassword = document.getElementById("erAdminConfirmPassword").value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            showMessage(passwordMessage, "Please complete all password fields.", "error");
            return;
        }

        if (newPassword.length < 8 ||
            !/[A-Z]/.test(newPassword) ||
            !/[a-z]/.test(newPassword) ||
            !/[0-9]/.test(newPassword) ||
            !/[^A-Za-z0-9]/.test(newPassword)) {
            showMessage(passwordMessage, "Use at least 8 characters with uppercase, lowercase, number and special character.", "error");
            return;
        }

        if (newPassword === currentPassword) {
            showMessage(passwordMessage, "Your new password must be different from your current password.", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage(passwordMessage, "New password and confirmation do not match.", "error");
            return;
        }

        showMessage(passwordMessage, " Password has been changed.", "success");
    });

    /*--- Reset Password Form ---*/
    passwordForm.addEventListener("reset", function () {
        setTimeout(function () {
            showMessage(passwordMessage, "", "");
            passwordForm.querySelectorAll('input[type="text"]').forEach(function (input) {
                if (input.closest(".er-admin-profile-password-input")) {
                    input.type = "password";
                }
            });
            passwordForm.querySelectorAll(".er-admin-profile-password-input button i").forEach(function (icon) {
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            });
        }, 0);
    });

    /*--- Display Form Messages ---*/
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = "er-admin-profile-message";

        if (type) {
            element.classList.add(type);
        }
    }

    /*--- Initial Profile Setup ---*/
    loadProfile();
});
