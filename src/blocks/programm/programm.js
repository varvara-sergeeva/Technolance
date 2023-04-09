document.addEventListener("DOMContentLoaded", function () {

	var slider1 = document.querySelector('.programm .swiper-container');
	var progSlides = document.querySelectorAll('.programm__item');
	var progSlider = document.querySelector('.programm__slider');
	var progWrap = document.querySelector('.programm__list');

	function mobileProgSlider() {
		if (window.innerWidth <= 1020) {
			progSlider.classList.add('swiper-container');
			progWrap.classList.add('swiper-wrapper');
			for (let slide of progSlides) {
				slide.classList.add('swiper-slide');
			}
			var swiper1 = new Swiper(".programm .swiper-container", {
				slidesPerView: 1,
				spaceBetween: 10,
				pagination: {
					el: ".programm .swiper-pagination",
					type: "bullets",
					clickable: true
				},
				autoplay: {
					delay: 4000,
				},
				breakpoints: {
					772: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
				},
			});
		}
		if (window.innerWidth > 1020) {
			if (slider1.classList.contains('swiper-container-initialized')) {
				swiper1.destroy(true, true);
			}
		}
	}
	mobileProgSlider();
	window.addEventListener('resize', () => {
		mobileProgSlider();
	});
});


$(document).ready(function () {
	const animItems = document.querySelectorAll(".animated-items");
	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);

		function animOnScroll(params) {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 2;
				let animItemPoint = window.innerHeight - animItemHeight / animStart;

				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}
				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
					animItem.classList.add('animate');
				} else {
					animItem.classList.remove('animate');
				}
			}

			function offset(el) {
				const rect = el.getBoundingClientRect(),
					scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				return {
					top: rect.top + scrollTop,
					left: rect.left + scrollLeft
				}
			}
		}
	}
});

//- бордер градиентный для сафари
if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	var safariItems = document.querySelectorAll('.gradient');
	safariItems.forEach(element => {
		element.classList.add('safari');
	});
}