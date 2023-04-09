$(document).ready(function () {
  document.querySelector(".qa__list").addEventListener("click", function (e) {
    if (e.target.closest(".qa-item")) {
      e.target.closest(".qa-item").classList.toggle("active");
    }
  });
});
