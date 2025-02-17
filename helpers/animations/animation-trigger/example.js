import gsap from 'gsap';
import { createSplitTextMarkup, onWindowWidthResize, setSplitTextInitialStyles } from '../utils';
import { useAnimationTrigger } from './animation-trigger';

export function splitTextAnimation() {
	const $animTartgets = document.querySelectorAll('.js-split-item');
	if (!$animTartgets.length) return null;

	const createAnimation = () => {
		return gsap.context(() => {
			const animations = $animTartgets.map(($target, index) => {
				const splitText = createSplitTextMarkup([$target]);
				if (!splitText) return null;

				const { wrappers, items, revert } = splitText;

				setSplitTextInitialStyles(wrappers, items);

				const revertTrigger = useAnimationTrigger({
					target: $target,
					options: {
						ease: 'power2.inOut',
						duration: 0.6,
						// markers: true,
					},
					animation: (animConfig) => {
						const itemTl = gsap.timeline().to(items, {
							yPercent: 0,
							stagger: 0.15,
							duration: animConfig.duration,
							delay: animConfig.delay,
							ease: animConfig.ease,
						});

						return itemTl;
					},
				});

				return {
					revert: () => {
						revert();
						if (revertTrigger) revertTrigger();
					},
				};
			});

			return () => animations.forEach(({ revert }) => revert && revert());
		});
	};

	let ctx = createAnimation();

	onWindowWidthResize(() => {
		ctx?.revert();
		ctx = createAnimation();
	});
}

export default splitTextAnimation;
