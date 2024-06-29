import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/scss/scrollbar';
import { buildSwiper, removeSwiper } from './build-swiper';

import 'ScssComponents/mobile-slider.scss';

gsap.registerPlugin(ScrollTrigger);

const CLASS_NAMES = {
	slider: '.js-mobile-slider',
	wrapper: '.js-mobile-slider-wrapper',
	arrowNext: '.js-mobile-slider-next',
	arrowPrev: '.js-mobile-slider-prev',
};

Swiper.use([Navigation]);

/**
 * Swiper sample including mobile destroy behaviour
 */
const mobileSlider = (breakpoint) => {
	const $sliderWrappers = document.querySelectorAll(CLASS_NAMES.wrapper);

	$sliderWrappers.forEach(($wrapper) => {
		let sliderEl;
		let isInit = false;

		const $slider = $wrapper.querySelector(CLASS_NAMES.slider);
		const $prevArrow = $wrapper.querySelector(CLASS_NAMES.arrowPrev);
		const $nextArrow = $wrapper.querySelector(CLASS_NAMES.arrowNext);

		const init = () => {
			if (!isInit) {
				buildSwiper($slider);

				sliderEl = new Swiper($slider, {
					observer: true,
					observeParents: true,
					speed: 800,
					slidesPerView: 'auto',
					loop: false,
					navigation: {
						prevEl: $prevArrow,
						nextEl: $nextArrow,
					},
					on: {
						init: () => {
							isInit = true;
						},
					},
				});
			}
		};

		const destroySlider = () => {
			if (isInit) {
				removeSwiper($slider);
				sliderEl.destroy();
				isInit = false;
			}
		};

		const matchMedia = gsap.matchMedia();

		matchMedia.add([`(min-width: ${breakpoint}px)`], () => {
			destroySlider();
		});
		matchMedia.add([`(max-width: ${breakpoint - 1}px)`], () => {
			init();
		});
	});
};

export default mobileSlider;

//	How to use

// 	Optionally rename classes wich variable 'classNames' contains and add to your html elements wich should be a slider elements.
//  Import some-slider.js to page or block with slider.
//  Init slider by mobileSlider();
