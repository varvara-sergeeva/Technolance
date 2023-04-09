document.addEventListener("DOMContentLoaded", function () {
  //- настройки слайдера переходящего с вертикального на горизонтальный скролл
  const swiper5 = new Swiper(".reviews .swiper-container", {
    direction: getDirection(),
    slidesPerView: 1,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination-vertical',
      clickable: true,
    },
    on: {
      resize: function () {
        swiper5.changeDirection(getDirection());
      }
    }
  });
  function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 998 ? 'horizontal' : 'vertical';
    return direction;
  }

  let paginationReview = document.querySelector('.reviews__pagination');
  const onMediaMobile = window.matchMedia('(max-width: 998px)');
  onMediaMobile.addEventListener('change', changePaginationOnMobile);

  function changePaginationOnMobile(e) {
  if (e.matches) {
    paginationReview.classList.remove('swiper-pagination-vertical');
  }
};
});