(function () {
  var currenciesLink = document.querySelector(".rating-filter__currencies-link");
  var currencies = document.querySelector(".rating-filter__currencies");

  var filterLink = document.querySelector(".rating-filter__title");
  var filterForm = document.querySelector(".rating-filter__form");
  
  var sortingLink = document.querySelector(".rating-sorting__title");
  var sortingForm = document.querySelector(".rating-sorting__form");
  
  currenciesLink.addEventListener("click", function(event) {
    event.preventDefault();
    currenciesLink.classList.toggle("rating-filter__currencies-link_closed");
    currenciesLink.classList.toggle("rating-filter__currencies-link_opened");
    currencies.classList.toggle("rating-filter__currencies_closed");
    currencies.classList.toggle("rating-filter__currencies_opened");
  });
  
  filterLink.addEventListener("click", function(event) {
    event.preventDefault();
    filterLink.classList.toggle("rating-filter__title_closed");
    filterLink.classList.toggle("rating-filter__title_opened");
    filterForm.classList.toggle("rating-filter__form_closed");
    filterForm.classList.toggle("rating-filter__form_opened");
  });

  sortingLink.addEventListener("click", function(event) {
    event.preventDefault();
    sortingLink.classList.toggle("rating-sorting__title_closed");
    sortingLink.classList.toggle("rating-sorting__title_opened");
    sortingForm.classList.toggle("rating-sorting__form_closed");
    sortingForm.classList.toggle("rating-sorting__form_opened");
  });
  
})();
