
/*--- Admin Menu Management ---*/
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("erAdminMenuSearch");
    const categoryFilter = document.getElementById("erAdminMenuCategory");
    const availabilityFilter = document.getElementById("erAdminMenuAvailability");
    const resetButton = document.getElementById("erAdminMenuReset");
    const tableBody = document.getElementById("erAdminMenuTableBody");
    const emptyState = document.getElementById("erAdminMenuEmpty");
    const countLabel = document.getElementById("erAdminMenuCount");

    if (!searchInput || !categoryFilter || !availabilityFilter || !tableBody) return;

    const rows = Array.from(tableBody.querySelectorAll("tr"));

    /*--- Filter Menu Items ---*/
    function filterMenuItems() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedAvailability = availabilityFilter.value;
        let visibleCount = 0;

        rows.forEach(function (row) {
            const rowText = row.textContent.toLowerCase();
            const category = row.dataset.category;
            const availability = row.dataset.status;

            const matchesSearch = rowText.includes(searchValue);
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;
            const matchesAvailability = selectedAvailability === "all" || availability === selectedAvailability;

            const isVisible = matchesSearch && matchesCategory && matchesAvailability;
            row.hidden = !isVisible;

            if (isVisible) visibleCount++;
        });

        countLabel.textContent = `Showing ${visibleCount} of ${rows.length} items`;
        emptyState.hidden = visibleCount !== 0;
    }

    /*--- Search and Filter Events ---*/
    searchInput.addEventListener("input", filterMenuItems);
    categoryFilter.addEventListener("change", filterMenuItems);
    availabilityFilter.addEventListener("change", filterMenuItems);

    /*--- Reset Filters ---*/
    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        categoryFilter.value = "all";
        availabilityFilter.value = "all";
        filterMenuItems();
    });

    /*--- Initial Menu Display ---*/
    filterMenuItems();
});
