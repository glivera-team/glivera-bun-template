import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/scss/scrollbar';
import { buildSwiper, removeSwiper } from './build-swiper';

const CLASS_NAMES = {
	slider: '.js-some-slider',
	wrapper: '.js-some-slider-wrapper',
	arrowNext: '.js-some-slider-next',
	arrowPrev: '.js-some-slider-prev',
	pagination: '.js-some-slider-dots',
};

Swiper.use([Navigation, Pagination]);

/**
 * Swiper default sample
 */
const someSlider = () => {
	const $sliderWrappers = document.querySelectorAll(CLASS_NAMES.wrapper);

	if (!$sliderWrappers.length) return;

	$sliderWrappers.forEach(($wrapper) => {
		const $slider = $wrapper.querySelector(CLASS_NAMES.slider);
		const $prevArrow = $wrapper.querySelector(CLASS_NAMES.arrowPrev);
		const $nextArrow = $wrapper.querySelector(CLASS_NAMES.arrowNext);
		const $pagination = $wrapper.querySelector(CLASS_NAMES.pagination);

		buildSwiper($slider);

		const sliderInstance = new Swiper($slider, {
			observer: true,
			observeParents: true,
			speed: 800,
			// loop: true,
			navigation: {
				prevEl: $prevArrow,
				nextEl: $nextArrow,
			},
			pagination: {
				el: $pagination,
				type: 'bullets',
				clickable: true,
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				1023: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
		});
	});
};

export default someSlider;

//	How to use

// 	Optionally rename classes wich variable 'classNames' contains and add to your html elements wich should be a slider elements.
//  Import some-slider.js to page or block with slider.
//  Init slider by someSlider();
