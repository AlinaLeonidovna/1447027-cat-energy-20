var burgerButton = document.querySelector(".page-header__toggle");
var mainNav = document.querySelector(".main-nav");

  burgerButton.classList.add("page-header__toggle--close");
  mainNav.classList.remove("main-nav--open");
  mainNav.classList.add("main-nav--close");

burgerButton.addEventListener("click", function() {
  burgerButton.classList.toggle("page-header__toggle--close");
  burgerButton.classList.toggle("page-header__toggle--open");
  mainNav.classList.toggle("main-nav--close");
  mainNav.classList.toggle("main-nav--open");
});
