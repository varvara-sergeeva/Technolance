document.addEventListener("DOMContentLoaded", function () {
	const anchors = document.querySelectorAll('a[href*="#"]');
	for (let anchor of anchors) {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const blockID = anchor.getAttribute("href").substr(1);
			document.querySelector(".order__container").scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		});
	}
});