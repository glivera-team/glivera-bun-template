import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollSmoother from '../vendors/ScrollSmoother';

/**
 * Default ScrollSmoother initialization
 * !Important: ScrollSmoother version should match ScrollTrigger plugin version!
 */
const initScrollSmoother = () => {
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	window.scrollTo(0, 0);

	/** save scroll smoother globally for able to disable/enable scroll dynamicly */
	window.scrollSmoother = ScrollSmoother.create({
		wrapper: document.querySelector('.js-scroll-wrapper'),
		content: document.querySelector('.js-scroll-inner'),
		smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
		smoothTouch: false, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
		normalizeScroll: { allowNestedScroll: true },
	});
};

export default initScrollSmoother;
