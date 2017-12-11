(function () {
  var currenciesLink = document.querySelector(".rating-filter__currencies-link");
  var currencies = document.querySelector(".rating-filter__currencies");

  currenciesLink.addEventListener("click", function(event) {
    event.preventDefault();
    currenciesLink.classList.toggle("rating-filter__currencies-link_closed");
    currenciesLink.classList.toggle("rating-filter__currencies-link_opened");
    currencies.classList.toggle("rating-filter__currencies_closed");
    currencies.classList.toggle("rating-filter__currencies_opened");
  });
})();
