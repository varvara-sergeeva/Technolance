document.addEventListener("DOMContentLoaded", function () {
  var slider4 = document.querySelector('.adva .swiper-container');
  var advaSlides = document.querySelectorAll('.adva__item');
  var advaSlider = document.querySelector('.adva__slider');
  var advaWrap = document.querySelector('.adva__list');

  function mobileSlider() {
    if (window.innerWidth <= 1020) {
      advaSlider.classList.add('swiper-container');
      advaWrap.classList.add('swiper-wrapper');
      for (let slide of advaSlides) {
        slide.classList.add('swiper-slide');
      }
      var swiper4 = new Swiper(".adva .swiper-container", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          el: ".adva .swiper-pagination",
          type: "bullets",
          clickable: true
        },
        autoplay: {
          delay: 6000,
        },
      });
    }
    if (window.innerWidth > 1020) {
      if (slider4.classList.contains('swiper-container-initialized')) {
        swiper4.destroy(true, true);
        console.log("destroy");
      }
    }
  }
  mobileSlider();
  window.addEventListener('resize', () => {
    mobileSlider();
  });
});