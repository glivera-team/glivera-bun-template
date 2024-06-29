import gsap from 'gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import { exist } from '../utils';

/** Anchor scrolling to the section */
const achor = () => {
	const SELECTORS = {
		anchor: 'a[href^="#"]',
	};

	const $links = document.querySelectorAll(SELECTORS.anchor);

	if (!exist($links)) return;

	gsap.registerPlugin(ScrollToPlugin);

	$links.forEach(($link) => {
		$link.addEventListener('click', (e) => {
			e.preventDefault();

			const sectionId = $link.getAttribute('href').replace(/#/g, '');
			const $section = document.querySelector(`[data-id="${sectionId}"]`);

			if (!exist($section)) return;

			gsap.to(window, {
				scrollTo: {
					y: $section,
				},
				duration: 1,
				ease: 'ease',
			});
		});
	});
};

export default achor;
