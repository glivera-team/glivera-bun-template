import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { exist } from '../utils/index';

gsap.registerPlugin(ScrollTrigger);

/**
 * Get configuration object for parallax animation
 * @param {HTMLElement} $parallaxElement 	- parallax target element
 * @return {object} 											- configuration
 */
const createAnimConfig = ($parallaxElement) => {
	const animConfigDefault = {
		speed: '80',
		start: 'top bottom',
		end: 'top top',
	};

	return {
		trigger: $parallaxElement.dataset.parallaxTrigger || $parallaxElement,
		speed: $parallaxElement.dataset.parallaxSpeed || animConfigDefault.speed,
		start: $parallaxElement.dataset.parallaxTrigger || animConfigDefault.start,
		end: $parallaxElement.dataset.parallaxTrigger || animConfigDefault.end,
	};
};

/** Initialize complex parallax animations:
 * Find all animation targets
 * Define configuration
 * Apply animation
 * Usage:
 * add .js-parallax-item class to element that you want to parallax
 * You can change animation parameters by adding the data-attribute to animatable element. Check 'parallax.pug' file in this folder
 */
const parallaxAnim = () => {
	const $parallaxItems = document.querySelectorAll('.js-parallax-item');

	if (!exist($parallaxItems)) return;

	$parallaxItems.forEach(($item) => {
		const ANIM_CONFIG = createAnimConfig($item);
		const setAnimConfig = (speed) => {
			return {
				y: speed,
				ease: 'none',
				scrollTrigger: {
					id: 'parallax',
					trigger: ANIM_CONFIG.trigger,
					start: ANIM_CONFIG.start,
					end: ANIM_CONFIG.end,
					ease: 'none',
					scrub: true,
					//	markers: true,
				},
			};
		};

		gsap.fromTo($item, setAnimConfig(80), setAnimConfig(-80));
	});
};

export default parallaxAnim;
