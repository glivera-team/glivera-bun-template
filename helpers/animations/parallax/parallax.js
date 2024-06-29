import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

/** Initialize simple parallax animations:
 * Find all animation targets
 * Define configuration
 * Apply animation
 * Usage:
 * Add .js-parallax-el class to element that you want to parallax.
 */
const parallax = () => {
	const SELECTORS = {
		el: '.js-parallax-el',
	};

	const $items = document.querySelectorAll(SELECTORS.el);

	$items.forEach((item) => {
		const offset = item.dataset.offset || 200;
		const direction = item.dataset.reverse ? -1 : 1;

		gsap.fromTo(
			item,
			{
				y: offset * direction,
			},
			{
				y: offset * direction * -1,
				scrollTrigger: {
					trigger: item,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			},
		);
	});
};

export default parallax;
