var navOpen = document.querySelector(".nav-open");
var mobNav = document.querySelector(".header__nav-wrap");
var mainNav = document.querySelector(".main-nav");
var searcher = document.querySelector(".search");

navOpen.addEventListener("click", function(event) {
  event.preventDefault();
  mobNav.classList.toggle("header__nav-wrap_closed");
  mobNav.classList.toggle("header__nav-wrap_opened");
  mainNav.classList.toggle("main-nav_mob-closed");
  mainNav.classList.toggle("main-nav_mob-opened");
  searcher.classList.toggle("search_mob-closed");
  searcher.classList.toggle("search_mob-opened");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode == 27 && mobNav.classList.contains("header__nav-wrap_opened")) {
    mobNav.classList.remove("header__nav-wrap_opened");
    mobNav.classList.add("header__nav-wrap_closed");
    mainNav.classList.remove("main-nav_mob-opened");
    mainNav.classList.add("main-nav_mob-closed");
    searcher.classList.remove("search_mob-opened");
    searcher.classList.add("search_mob-closed");
  }
});



//переключение отзывов/обзоров
$(".reviews__header-tab").click(function(e){
  e.preventDefault();
  var infId = $(this).attr("id");
  $(".reviews__header-tab").removeClass("reviews__header-tab--active");
  $(this).addClass("reviews__header-tab--active");
  $(".reviews__tab").removeClass("reviews__tab--active");
  $("."+infId).addClass("reviews__tab--active");
});
// аккордеон
$(".reviews__tango-title").click(function(e){
  e.preventDefault();
  var seeId = $(this).children("a").attr("id");
  $(this).children("a").toggleClass("reviews__tango-btn--active");
  $("."+seeId).toggleClass("reviews__tango-see--active");
});