
/*--- Navbar ---*/
/*--- Navbar Initialization ---*/
const initNavbar = () => {
    const navbar = document.getElementById("erNavbar");
    const menu = document.getElementById("erNavbarMenu");
    const toggle = document.getElementById("erNavbarToggle");
    const closeButton = document.getElementById("erNavbarClose");
    const backdrop = document.getElementById("erNavbarBackdrop");
    const progress = document.getElementById("erNavbarProgress");
    const navLinks = document.querySelectorAll(".er-com-navbar-link");
    if (!navbar || !menu || !toggle) return;
    /*--- Mobile Menu ---*/
    const openMenu = () => {
        menu.classList.add("er-menu-active");
        navbar.classList.add("er-navbar-open");
        toggle.classList.add("er-toggle-active");
        backdrop?.classList.add("er-backdrop-active");
        document.body.classList.add("er-navbar-menu-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close navigation");
    };
    const closeMenu = () => {
        menu.classList.remove("er-menu-active");
        navbar.classList.remove("er-navbar-open");
        toggle.classList.remove("er-toggle-active");
        backdrop?.classList.remove("er-backdrop-active");
        document.body.classList.remove("er-navbar-menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
    };
    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.contains("er-menu-active");
        isOpen ? closeMenu() : openMenu();
    });
    closeButton?.addEventListener("click", closeMenu);
    backdrop?.addEventListener("click", closeMenu);
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });
    /*--- Active Navigation Link ---*/
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach(link => {
        const linkPage = link.getAttribute("data-page");
        const isActive = linkPage === currentPage;
        link.classList.toggle("er-active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
    /*--- Navbar Scroll Animation ---*/
    const updateNavbar = () => {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        navbar.classList.toggle("er-navbar-scrolled", scrollPosition > 40);
        if (progress) {
            const scrollPercentage = documentHeight > 0 ? (scrollPosition / documentHeight) * 100 : 0;
            progress.style.width = "100%";
            progress.style.transform = `scaleX(${scrollPercentage / 100})`;
            progress.style.transformOrigin = "left";
        }
    };
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    /*--- Responsive Menu Reset ---*/
    window.addEventListener("resize", () => {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
};
document.addEventListener("DOMContentLoaded", initNavbar);
document.addEventListener("erComponentsLoaded", initNavbar);
