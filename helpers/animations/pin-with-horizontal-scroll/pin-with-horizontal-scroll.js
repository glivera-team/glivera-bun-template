import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const horizontalScroll = () => {
	gsap.registerPlugin(ScrollTrigger);

	const $scroller = document.querySelector('.js-horizontal-scroll');
	const $wrapper = document.querySelector('.js-horizontal-scroll-wrap');

	if (!$scroller) return;

	const tl = gsap
		.timeline({
			paused: true,
			defaults: {
				ease: 'none',
			},
		})
		.to($scroller, {
			xPercent: -100,
			x: () => window.innerWidth,
		});

	ScrollTrigger.create({
		trigger: $wrapper,
		start: 'top top',
		end: () => {
			return `+=${$scroller.offsetWidth / 2}`;
		},
		pin: true,
		scrub: true,
		animation: tl,
		invalidateOnRefresh: true,
		// markers: true,
	});
};

export default horizontalScroll;
