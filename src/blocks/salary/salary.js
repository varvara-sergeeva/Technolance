$(document).ready(function () {
  if (window.innerWidth <= 998) {
    const swiper3 = new Swiper(".salary .swiper-container", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".salary .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      autoplay: {
        delay: 5000,
      },
    });
  };

  document.addEventListener("mousemove", parallaxBg);
  //- для паралакса
  function parallaxBg(e) {
    document.querySelectorAll(".object").forEach(function(move){
      var movingValue = move.getAttribute("data-value");
      var x = (e.clientX * movingValue) / 250;
      var y = (e.clientY * movingValue) / 250;

      move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    });
  }
});
