
/*--- Client Reservation Management ---*/
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("erClientResSearch");
    const statusFilter = document.getElementById("erClientResStatus");
    const resetButton = document.getElementById("erClientResReset");
    const tableBody = document.getElementById("erClientResTableBody");
    const emptyState = document.getElementById("erClientResEmpty");
    const resultCount = document.getElementById("erClientResResultCount");

    if (!searchInput || !statusFilter || !tableBody) return;

    const rows = Array.from(tableBody.querySelectorAll("tr"));

    /*--- Filter Reservations ---*/
    function filterReservations() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;
        let visibleCount = 0;

        rows.forEach(function (row) {
            const rowText = row.textContent.toLowerCase();
            const rowStatus = row.dataset.status;

            const matchesSearch = rowText.includes(searchValue);
            const matchesStatus = selectedStatus === "all" || rowStatus === selectedStatus;
            const isVisible = matchesSearch && matchesStatus;

            row.hidden = !isVisible;

            if (isVisible) visibleCount++;
        });

        resultCount.textContent = `Showing ${visibleCount} of ${rows.length} reservations`;
        emptyState.hidden = visibleCount !== 0;
    }

    /*--- Search and Filter Events ---*/
    searchInput.addEventListener("input", filterReservations);
    statusFilter.addEventListener("change", filterReservations);

    /*--- Reset Filters ---*/
    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        statusFilter.value = "all";
        filterReservations();
    });

    /*--- Initial Reservation Display ---*/
    filterReservations();
});
