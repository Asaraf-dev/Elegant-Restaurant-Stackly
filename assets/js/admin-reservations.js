
/*--- Admin Reservations ---*/
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("erAdminResTableBody");
    if (!tableBody) return;

    const rows = Array.from(tableBody.querySelectorAll("tr"));
    const searchInput = document.getElementById("erAdminResSearch");
    const statusFilter = document.getElementById("erAdminResStatus");
    const dateFilter = document.getElementById("erAdminResDate");
    const resetButton = document.getElementById("erAdminResReset");
    const emptyMessage = document.getElementById("erAdminResEmpty");
    const resultCount = document.getElementById("erAdminResResultCount");
    const paginationInfo = document.getElementById("erAdminResPaginationInfo");
    const pageNumber = document.getElementById("erAdminResPageNumber");
    const prevButton = document.getElementById("erAdminResPrev");
    const nextButton = document.getElementById("erAdminResNext");

    const pageSize = 5;
    let currentPage = 1;
    let filteredRows = [...rows];

    function updateReservations() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;
        const selectedDate = dateFilter.value;

        filteredRows = rows.filter(function (row) {
            const matchesSearch = row.textContent.toLowerCase().includes(searchValue);
            const matchesStatus = selectedStatus === "all" || row.dataset.status === selectedStatus;
            const matchesDate = !selectedDate || row.dataset.date === selectedDate;

            return matchesSearch && matchesStatus && matchesDate;
        });

        currentPage = 1;
        renderReservations();
    }

    function renderReservations() {
        const total = filteredRows.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, total);

        rows.forEach(function (row) {
            row.style.display = "none";
        });

        filteredRows.slice(startIndex, endIndex).forEach(function (row) {
            row.style.display = "";
        });

        resultCount.textContent = total;
        paginationInfo.textContent = total
            ? `Showing ${startIndex + 1}–${endIndex} of ${total} reservations`
            : "Showing 0 reservations";

        pageNumber.textContent = totalPages ? `${currentPage} / ${totalPages}` : "0 / 0";

        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= totalPages;

        emptyMessage.classList.toggle("show", total === 0);
        tableBody.style.display = total === 0 ? "none" : "";
    }

    searchInput.addEventListener("input", updateReservations);
    statusFilter.addEventListener("change", updateReservations);
    dateFilter.addEventListener("change", updateReservations);

    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        statusFilter.value = "all";
        dateFilter.value = "";
        updateReservations();
    });

    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderReservations();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < Math.ceil(filteredRows.length / pageSize)) {
            currentPage++;
            renderReservations();
        }
    });

    updateReservations();
});
