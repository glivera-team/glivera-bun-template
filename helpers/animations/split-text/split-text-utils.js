// .split-inner,
// .split-wrapper {
// 	display: block;
// }

import gsap from 'gsap';
import SplitText from '../vendors/SplitText';
// import { SPLIT_TEXT_ANIM_CLIP_PATH } from './constants';
export const SPLIT_TEXT_ANIM_CLIP_PATH = 'polygon(0% 0%, 100% 0%, 100% 107%, 0% 107%)';

gsap.registerPlugin(SplitText);

// workaround from docs
function nestedLinesSplit(targetInherit, vars) {
	let target = targetInherit;
	let split = new SplitText(target, vars);
	let words = vars.type.indexOf('words') !== -1;
	let chars = vars.type.indexOf('chars') !== -1;
	let insertAt = (a, b, i) => {
		let l = b.length;
		for (let j = 0; j < l; j += 1) {
			// eslint-disable-next-line no-param-reassign
			a.splice((i += 1), 0, b[j]);
		}
		return l;
	};
	let children;
	let child;
	let i;

	if (typeof target === 'string') {
		target = document.querySelectorAll(target);
	}
	if (target.length > 1) {
		for (i = 0; i < target.length; i += 1) {
			split.lines = split.lines.concat(nestedLinesSplit(target[i], vars).lines);
		}
		return split;
	}

	children = (words ? split.words : []).concat(chars ? split.chars : []);
	for (i = 0; i < children.length; i += 1) {
		// eslint-disable-next-line no-underscore-dangle
		children[i]._protect = true;
	}

	children = split.lines;
	for (i = 0; i < children.length; i += 1) {
		child = children[i].firstChild;
		// eslint-disable-next-line no-underscore-dangle
		if (!child._protect && child.nodeType !== 3) {
			children[i].parentNode.insertBefore(child, children[i]);
			children[i].parentNode.removeChild(children[i]);
			children.splice(i, 1);
			i += insertAt(children, nestedLinesSplit(child, vars).lines, i) - 1;
		}
	}
	return split;
}

export const createSplitTextMarkup = (nodeArray) => {
	if (!nodeArray?.length) return null;

	const splitTextItems = nodeArray?.map(($item) => {
		const splitWrapper = nestedLinesSplit($item, {
			type: 'lines',
			linesClass: 'split-wrapper',
			tag: 'span',
		});

		const splitInner = nestedLinesSplit(splitWrapper.lines, {
			type: 'lines',
			linesClass: 'split-inner',
			tag: 'span',
		});

		return {
			wrappers: splitWrapper.lines,
			lines: splitInner.lines,
			revert: () => {
				splitWrapper.revert();
				splitInner.revert();
			},
		};
	});

	if (!splitTextItems?.length) return null;

	return {
		wrappers: splitTextItems.map((item) => item.wrappers).flat(1),
		items: splitTextItems.map((item) => item.lines).flat(1),
		revert: () => splitTextItems.forEach((item) => item.revert()),
	};
};

export const setSplitTextInitialStyles = (wrappers, inners, offset = true) => {
	const tl = gsap.timeline();
	tl.set(wrappers, {
		clipPath: SPLIT_TEXT_ANIM_CLIP_PATH,
	}).set(inners, {
		willChange: 'transform',
		yPercent: offset ? 110 : undefined,
	});

	return tl;
};
