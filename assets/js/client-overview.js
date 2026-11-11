
/*--- Client Overview ---*/
document.addEventListener("DOMContentLoaded", function () {
    const welcomeName = document.getElementById("erClientWelcomeName");

    /*--- Load Client Information ---*/
    const name = localStorage.getItem("erUserName") ||
        localStorage.getItem("erRegisteredName") || "Guest";

    const email = localStorage.getItem("erUserEmail") ||
        localStorage.getItem("erRegisteredEmail") || "";

    /*--- Update Welcome Name ---*/
    if (welcomeName) {
        welcomeName.textContent = name.trim().split(/\s+/)[0] || "Guest";
    }

    /*--- Update Dashboard User Details ---*/
    const userElements = {
        erDashTopbarName: name,
        erDashMobileName: name,
        erDashTopbarEmail: email || "Email not provided",
        erDashMobileEmail: email || "Email not provided"
    };

    Object.entries(userElements).forEach(function ([id, value]) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
});
