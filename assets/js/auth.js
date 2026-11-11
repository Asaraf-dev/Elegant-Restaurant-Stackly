
/*--- Login Page ---*/
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("erAuthLoginForm");
    const emailInput = document.getElementById("erAuthLoginEmail");
    const passwordInput = document.getElementById("erAuthLoginPassword");
    const passwordToggle = document.getElementById("erAuthPasswordToggle");
    const rememberCheckbox = document.getElementById("erAuthRememberMe");

    if (!loginForm) return;

    // Restore remembered email
    const rememberedEmail = localStorage.getItem("erRememberedEmail");
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }

    // Show / Hide Password
    if (passwordToggle) {
        passwordToggle.addEventListener("click", function () {
            const isPassword = passwordInput.type === "password";

            passwordInput.type = isPassword ? "text" : "password";
            passwordToggle.innerHTML = isPassword
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

            passwordToggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
            passwordToggle.setAttribute("aria-pressed", String(isPassword));
        });
    }

    // Login Form Submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedRole = loginForm.querySelector('input[name="accountType"]:checked');

        if (!selectedRole) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const role = selectedRole.value;

        // Store account details for dashboard display
        localStorage.setItem("erUserEmail", email);
        localStorage.setItem("erUserRole", role);

        // Remember email only when checkbox is selected
        if (rememberCheckbox.checked) {
            localStorage.setItem("erRememberedEmail", email);
        } else {
            localStorage.removeItem("erRememberedEmail");
        }

        // Demo login routing only - no server authentication
        if (password.length > 0) {
            if (role === "admin") {
                window.location.href = "admin-dashboard.html";
            } else if (role === "client") {
                window.location.href = "client-dashboard.html";
            }
        }
    });
});



/*--- Register Page Validation & Account Storage ---*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("erAuthRegisterForm");
    if (!form) return;

    const nameInput = document.getElementById("erAuthRegisterName");
    const phoneInput = document.getElementById("erAuthRegisterPhone");
    const emailInput = document.getElementById("erAuthRegisterEmail");
    const passwordInput = document.getElementById("erAuthRegisterPassword");
    const confirmPasswordInput = document.getElementById("erAuthRegisterConfirmPassword");

    // Name: Allow alphabets and spaces only
    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z ]/g, "").replace(/\s{2,}/g, " ");
    });

    // Phone: Allow numbers only, maximum 10 digits
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
    });

    // Password: Check whether both password fields match
    function validateConfirmPassword() {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.setCustomValidity("Passwords do not match.");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    }

    passwordInput.addEventListener("input", validateConfirmPassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);

    // Show / Hide Password for both password fields
    document.querySelectorAll("[data-password-target]").forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const targetId = this.getAttribute("data-password-target");
            const targetInput = document.getElementById(targetId);
            const isPassword = targetInput.type === "password";

            targetInput.type = isPassword ? "text" : "password";

            this.innerHTML = isPassword
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

            this.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
            this.setAttribute("aria-pressed", String(isPassword));
        });
    });

    // Register Form Submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        validateConfirmPassword();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const selectedRole = form.querySelector('input[name="accountType"]:checked');

        if (!selectedRole) return;

        // Save profile information for dashboard use
        localStorage.setItem("erUserName", nameInput.value.trim());
        localStorage.setItem("erUserPhone", phoneInput.value);
        localStorage.setItem("erUserEmail", emailInput.value.trim());
        localStorage.setItem("erUserRole", selectedRole.value);

        // Store registered profile details separately
        localStorage.setItem("erRegisteredName", nameInput.value.trim());
        localStorage.setItem("erRegisteredPhone", phoneInput.value);
        localStorage.setItem("erRegisteredEmail", emailInput.value.trim());
        localStorage.setItem("erRegisteredRole", selectedRole.value);

        // Do not store the password in localStorage
        window.location.href = "login.html";
    });
});
