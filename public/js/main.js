// this file use for share component

const inputElement = document.getElementById("searchBox");
const showInputElemt = document.getElementById("showInput");

const hambergerElemnt = document.getElementById("hamberger-button");

showInput.addEventListener("click", function () {
  inputElement.classList.toggle("active");
});

hambergerElemnt.addEventListener("click", function () {
  hambergerElemnt.classList.toggle("change");
  $(".all-categories").animate({
    height: "toggle",
  });
});
