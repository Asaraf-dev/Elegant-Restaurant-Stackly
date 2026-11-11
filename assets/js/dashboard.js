
/*--- Dashboard Layout ---*/
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("erDashSidebar");
    const overlay = document.getElementById("erDashOverlay");
    const menuToggle = document.getElementById("erDashMenuToggle");
    const closeButton = document.getElementById("erDashClose");
    const logoutButton = document.getElementById("erDashLogout");

    // User Information
    const userName = localStorage.getItem("erUserName") || localStorage.getItem("erRegisteredName") || "Guest";
    const userEmail = localStorage.getItem("erUserEmail") || localStorage.getItem("erRegisteredEmail") || "Not available";
    const userPhone = localStorage.getItem("erUserPhone") || localStorage.getItem("erRegisteredPhone") || "Not available";

    const userElements = {
        name: ["erDashTopbarName", "erDashMobileName", "erDashWelcomeName", "erDashboardUserName"],
        email: ["erDashTopbarEmail", "erDashMobileEmail", "erDashboardUserEmail"],
        phone: ["erDashboardUserPhone"]
    };

    function updateText(ids, value) {
        ids.forEach(function (id) {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    updateText(userElements.name, userName);
    updateText(userElements.email, userEmail);
    updateText(userElements.phone, userPhone);

    // Dashboard Title
    const pageTitle = document.getElementById("erDashPageTitle");
    const dashboardTitle = document.body.dataset.dashboardTitle;

    if (pageTitle && dashboardTitle) {
        pageTitle.textContent = dashboardTitle;
    }

    // Current Date
    const dateElement = document.getElementById("erDashCurrentDate");

    if (dateElement) {
        dateElement.textContent = new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).format(new Date());
    }

    // Open Sidebar
    function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("show");
        menuToggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("er-dash-menu-open");
    }

    // Close Sidebar
    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("er-dash-menu-open");
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            if (sidebar.classList.contains("open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (closeButton) closeButton.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeSidebar();
    });

    // Close drawer after selecting a navigation link
    document.querySelectorAll(".er-dash-nav-link[data-section]").forEach(function (link) {
        link.addEventListener("click", function () {
            document.querySelectorAll(".er-dash-nav-link[data-section]").forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");
            closeSidebar();
        });
    });

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault();

            localStorage.removeItem("erUserEmail");
            localStorage.removeItem("erUserRole");
            localStorage.removeItem("erUserName");
            localStorage.removeItem("erUserPhone");

            window.location.href = "login.html";
        });
    }
});
