
/*--- Admin Overview ---*/
document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.getElementById("erAdminOverviewDate");

    if (dateElement) {
        dateElement.textContent = new Intl.DateTimeFormat("en-IN", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        }).format(new Date());
    }
});
