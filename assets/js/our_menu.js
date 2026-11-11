/*--- Complete Food Menu Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const menuGrid = document.getElementById("erMenuGrid");
    if (!menuGrid || menuGrid.dataset.initialized === "true") return;
    menuGrid.dataset.initialized = "true";

    const cards = [...menuGrid.querySelectorAll(".er-menu-complete-card")];
    const categoryButtons = document.querySelectorAll(".er-menu-complete-filter");
    const dietButtons = document.querySelectorAll(".er-menu-complete-diet-btn");
    const searchInput = document.getElementById("erMenuSearch");
    const resultCount = document.getElementById("erMenuResultCount");
    const emptyState = document.getElementById("erMenuEmpty");
    const resetButton = document.getElementById("erMenuReset");

    let activeCategory = "all";
    let activeDiet = "all";

    function filterMenu() {
        const searchValue = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach(card => {
            const category = card.dataset.category;
            const diet = card.dataset.diet;
            const searchText = card.dataset.search.toLowerCase() + " " + card.textContent.toLowerCase();

            const categoryMatch = activeCategory === "all" || category === activeCategory;
            const dietMatch = activeDiet === "all" || diet === activeDiet;
            const searchMatch = searchText.includes(searchValue);
            const isVisible = categoryMatch && dietMatch && searchMatch;

            card.classList.toggle("is-hidden", !isVisible);

            if (isVisible) {
                visibleCount++;
            }
        });

        resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "dish" : "dishes"} available`;
        emptyState.classList.toggle("show", visibleCount === 0);
        menuGrid.style.display = visibleCount === 0 ? "none" : "grid";
    }

    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            categoryButtons.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
            activeCategory = this.dataset.category;
            filterMenu();
        });
    });

    dietButtons.forEach(button => {
        button.addEventListener("click", function () {
            dietButtons.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
            activeDiet = this.dataset.diet;
            filterMenu();
        });
    });

    searchInput.addEventListener("input", filterMenu);

    resetButton.addEventListener("click", function () {
        activeCategory = "all";
        activeDiet = "all";
        searchInput.value = "";

        categoryButtons.forEach(button => {
            button.classList.toggle("active", button.dataset.category === "all");
        });

        dietButtons.forEach(button => {
            button.classList.toggle("active", button.dataset.diet === "all");
        });

        filterMenu();
    });

    filterMenu();
});
/*--- Complete Food Menu Section End ---*/

/*--- Section Start ---*/
/*--- Section End ---*/

/*--- Section Start ---*/
/*--- Section End ---*/

/*--- Section Start ---*/
/*--- Section End ---*/

/*--- Section Start ---*/
/*--- Section End ---*/

/*--- Section Start ---*/
/*--- Section End ---*/