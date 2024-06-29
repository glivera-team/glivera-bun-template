import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { exist } from '../utils/index';

gsap.registerPlugin(ScrollTrigger);

/**
 * Get configuration object for fading animation
 * @param {HTMLElement} $fadeElement 	- fade target element
 * @return {object} 									- Configuration
 */

const createAnimConfig = ($fadeElement) => {
	const animConfigDefault = {
		start: 'top 80%',
		duration: 1,
		ease: 'none',
		elementStartPosition: 100,
		elementEndPosition: 0,
	};

	return {
		trigger: $fadeElement.dataset.fadeTrigger || $fadeElement,
		start: $fadeElement.dataset.fadeStart || animConfigDefault.start,
		duration: $fadeElement.dataset.fadeDuration || animConfigDefault.duration,
		ease: $fadeElement.dataset.fadeEase || animConfigDefault.ease,
		direction: $fadeElement.dataset.fadeDirection,
		elementStartPosition: $fadeElement.dataset.elementStartPosition || animConfigDefault.elementStartPosition,
		elementEndPosition: $fadeElement.dataset.elementStartPosition || animConfigDefault.elementEndPosition,
	};
};

/** Initialize complex fade animations:
 * Find all animation targets
 * Define configuration
 * Apply animation
 * Usage:
 * Add .js-fade-item class to element wich you want to fade.
 * If you need that the element moves to some direction use 'data-fade-direction' attribute with values 'up', 'down', 'right', 'left'
 * You can change animation parameters by adding the data-attribute to animatable element. Check 'fade-animation.pug' file in this folder
 */

const fadeAnim = () => {
	const $fadeItems = document.querySelectorAll('.js-fade-item');

	if (!exist($fadeItems)) {
		console.error('Fade elements not found!');
		return;
	}

	$fadeItems.forEach(($item) => {
		const ANIM_CONFIG = createAnimConfig($item);

		/**
		 * Check translate direction
		 * @param {string} value - direction
		 * @return {boolean}		 - is direction match
		 */
		const checkDirection = (value) => {
			return ANIM_CONFIG.direction === value;
		};
		/**
		 * Get initial state of the animation
		 * @param {object} settings - settings
		 * @return {object} 				- initial state
		 */
		const getInitialState = (settings) => {
			return {
				opacity: 0,
				...settings,
			};
		};
		/**
		 * Get initial finish state of the animation
		 * @param {object} settings - settings
		 * @return {object} 				- finish state
		 */
		const getTargetState = (settings) => {
			return {
				opacity: 1,
				...settings,
				duration: ANIM_CONFIG.duration,
				ease: ANIM_CONFIG.ease,
			};
		};

		if (checkDirection('up')) {
			gsap.set($item, getInitialState({ y: ANIM_CONFIG.elementStartPosition }));
		} else if (checkDirection('down')) {
			gsap.set($item, getInitialState({ y: -ANIM_CONFIG.elementStartPosition }));
		} else if (checkDirection('right')) {
			gsap.set($item, getInitialState({ x: -ANIM_CONFIG.elementStartPosition }));
		} else if (checkDirection('left')) {
			gsap.set($item, getInitialState({ x: ANIM_CONFIG.elementStartPosition }));
		} else {
			gsap.set($item, getInitialState());
		}

		ScrollTrigger.create({
			id: 'fade',
			trigger: ANIM_CONFIG.trigger,
			start: ANIM_CONFIG.start,
			once: true,
			//	markers: true,
			onEnter: () => {
				if (checkDirection('up') || checkDirection('down')) {
					gsap.to($item, getTargetState({ y: ANIM_CONFIG.elementEndPosition }));
				} else if (checkDirection('right') || checkDirection('left')) {
					gsap.to($item, getTargetState({ x: ANIM_CONFIG.elementEndPosition }));
				} else {
					gsap.to($item, getTargetState());
				}
			},
		});
	});
};

export default fadeAnim;
