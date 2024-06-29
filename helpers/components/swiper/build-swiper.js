/**
 * Auto-Form swiper structure instead of manually adding swiper classes
 * such as swiper-wrapper, swiper-slide etc
 */
export const buildSwiper = (sliderNode) => {
	if (!sliderNode) return;

	const $slider = sliderNode;
	const $slides = $slider.children;

	if (!$slides.length) return;
	$slider.classList.add('swiper');
	Array.from($slides).forEach(($slide) => $slide.classList.add('swiper-slide'));

	const htmlStructure = `<div class="swiper-wrapper">${$slider.innerHTML}</div>`;
	$slider.innerHTML = htmlStructure;
};

/**
 * Remove previously added swiper structure
 * Swiper instance should be destroyed first
 */
export const removeSwiper = (sliderNode) => {
	if (!sliderNode) return;

	const $slider = sliderNode;

	const $wrapper = $slider.querySelector('.swiper-wrapper');
	const $slides = $wrapper.children;

	if (!$slides.length) return;

	$slider.classList.remove('swiper');
	Array.from($slides).forEach(($slide) => $slide.classList.remove('swiper-slide'));
	$slider.innerHTML = $wrapper.innerHTML;
};
