$(document).ready(function () {
  if (window.innerWidth <= 998) {
    const swiper2 = new Swiper(".if .swiper-container", {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        el: ".if .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });
  }
});