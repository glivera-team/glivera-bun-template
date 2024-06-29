import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import floating from './floating';

/** Initialize floating animations:
 * Find all animation targets
 * Define configuration
 * Apply animation
 * Usage:
 * Add .js-floating-el class to element that you want to float.
 */
const floatingInit = () => {
	const $items = document.querySelectorAll('.js-floating-el');
	$items.forEach((el) => {
		const [playFloating, pauseFloating] = floating(el);

		const trigger = ScrollTrigger.create({
			trigger: el,
			start: 'top bottom',
			end: 'bottom top',
			onEnter: () => {
				playFloating();
			},
			onEnterBack: () => {
				playFloating();
			},
			onLeave: () => {
				pauseFloating();
			},
			onLeaveBack: () => {
				pauseFloating();
			},
		});
	});
};

export default floatingInit;
