import gsap from 'gsap';
import { createSplitTextMarkup, setSplitTextInitialStyles } from './split-text-utils';
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

				const animItems = wrappers.map(($item) => $item.firstChild);

				setSplitTextInitialStyles(wrappers, animItems);

				const revertTrigger = useAnimationTrigger({
					target: $target,
					options: {
						ease: 'none',
						duration: 0.6,
					},
					animation: (animConfig) => {
						const itemTl = gsap.timeline().to(animItems, {
							yPercent: 0,
							ease: 'power2.out',
							stagger: {
								each: 0.2,
							},
							duration: animConfig.duration,
							delay: animConfig.delay,
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

	const kiilResizeListener = onWindowWidthResize(() => {
		ctx?.revert();
		ctx = createAnimation();
	});

	return () => {
		kiilResizeListener();

		ctx?.revert();
	};
}

export default splitTextAnimation;
