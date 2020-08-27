// document.querySelector(".page-header__toggle").onclick = function(){
//   document.querySelector(".page-header__toggle").classList.toggle("page-header__toggle--active");
// }

var burgerButton = document.querySelector(".page-header__toggle")
var mainNav = document.querySelector(".main-nav")

  burgerButton.addEventListener("click", function () {
  mainNav.classList.toggle("main-nav--open");
  burgerButton.classList.toggle("page-header__toggle--active")
})
