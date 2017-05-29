'use  strict'
function filterStart() {
  const author = document.getElementById('user-filter').value;
  const dateFrom = document.getElementById('date-from-filter').value;
  const dateTo = document.getElementById('date-to-filter').value;
  const filterConfig = {};
  if (author) {
      filterConfig.author = author;

  }
  if (dateFrom) {
    filterConfig.createdAtFrom = new Date(dateFrom);
  }
  if (dateTo) {
    filterConfig.createdAtTo = new Date(dateTo);
  }
  mainPage(filterConfig);
  event.preventDefault();
}

