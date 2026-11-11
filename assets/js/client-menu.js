
/*--- Client Menu Management ---*/
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("erClientMenuSearch");
    const categoryContainer = document.getElementById("erClientMenuCategories");
    const vegFilter = document.getElementById("erClientMenuVeg");
    const resetButton = document.getElementById("erClientMenuReset");
    const menuGrid = document.getElementById("erClientMenuGrid");
    const emptyState = document.getElementById("erClientMenuEmpty");
    const countLabel = document.getElementById("erClientMenuCount");

    if (!searchInput || !categoryContainer || !menuGrid) return;

    const items = Array.from(menuGrid.querySelectorAll(".er-client-menu-item"));
    const categoryButtons = Array.from(categoryContainer.querySelectorAll("[data-category]"));

    let activeCategory = "all";

    /*--- Filter Menu Items ---*/
    function filterMenu() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const vegetarianOnly = vegFilter.checked;
        let visibleCount = 0;

        items.forEach(function (item) {
            const category = item.dataset.category;
            const isVegetarian = item.dataset.vegetarian === "true";
            const itemText = item.textContent.toLowerCase();

            const matchesSearch = itemText.includes(searchValue);
            const matchesCategory = activeCategory === "all" || category === activeCategory;
            const matchesVegetarian = !vegetarianOnly || isVegetarian;

            const isVisible = matchesSearch && matchesCategory && matchesVegetarian;

            item.hidden = !isVisible;

            if (isVisible) visibleCount++;
        });

        countLabel.textContent = `Showing ${visibleCount} of ${items.length} dishes`;
        emptyState.hidden = visibleCount !== 0;
    }

    /*--- Category Selection ---*/
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeCategory = this.dataset.category;

            categoryButtons.forEach(function (categoryButton) {
                categoryButton.classList.toggle("active", categoryButton === button);
            });

            filterMenu();
        });
    });

    /*--- Search Menu ---*/
    searchInput.addEventListener("input", filterMenu);

    /*--- Vegetarian Filter ---*/
    if (vegFilter) {
        vegFilter.addEventListener("change", filterMenu);
    }

    /*--- Reset Menu Filters ---*/
    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        activeCategory = "all";

        categoryButtons.forEach(function (button) {
            button.classList.toggle("active", button.dataset.category === "all");
        });

        if (vegFilter) vegFilter.checked = false;

        filterMenu();
    });

    /*--- Initial Menu Display ---*/
    filterMenu();
});
