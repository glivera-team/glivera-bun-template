import isMobile from 'ismobilejs';

export function exist(propTarget) {
	let target = propTarget;

	if (target instanceof window.NodeList) {
		target = [...target];
	}

	return Array.isArray(target)
		? target?.length > 0 &&
				target.every((item) => {
					return exist(item);
				})
		: !!target;
}

export function debounce(delay, fn) {
	let timerId;
	return (...args) => {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			fn(...args);
			timerId = null;
		}, delay);
	};
}

export function debounceImmediate(delay, fn) {
	let fired = false;
	return (...args) => {
		if (!fired) {
			fn(...args);
			fired = true;
			setTimeout(() => {
				fired = false;
			}, delay);
		}
	};
}

export const isTouchDevice = () => {
	return (
		'ontouchstart' in window || window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0
	);
};

export const calcViewportHeight = () => {
	const isMobileData = isMobile();
	const isApple = isMobileData.apple.phone;
	const isAndroid = isMobileData.android.phone;
	const isSeven = isMobileData.seven_inch;

	if (isApple || isAndroid || isSeven || isTouchDevice()) {
		const vh = window.innerHeight * 0.01;
		// console.log(vh);
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
};

export const calcRemValue = ({ windowWidth, windowHeight }) => {
	const remValue =
		windowWidth * 0.5625 > windowHeight ? (windowHeight / 800) * 10 : (windowWidth / 1440) * 10;

	document.documentElement.style.setProperty('--rem', `${remValue}px`);
};

export const calcMobileRemValue = ({ windowHeight }) => {
	const mobileRemValue = (windowHeight / 800) * 10;

	document.documentElement.style.setProperty('--mobile-rem', `${mobileRemValue}px`);
};

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandom = (min, max) => {
	return Math.random() * (max - min) + min;
};

export function isFunction(func) {
	return func instanceof Function;
}

export function getWindowSize() {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	return {
		windowWidth,
		windowHeight,
	};
}

export const onWindowResize = (cb) => {
	if (!cb && !isFunction(cb)) return;

	const handleResize = () => {
		cb();
	};

	window.addEventListener('resize', debounce(15, handleResize));

	handleResize();
};

export const onWindowWidthResize = (cb) => {
	let { windowWidth } = getWindowSize();
	let debounce = null;

	const handleResize = () => {
		clearTimeout(debounce);
		debounce = setTimeout(() => {
			const { windowWidth: newWindowWidth } = getWindowSize();
			if (windowWidth === newWindowWidth) return;
			windowWidth = newWindowWidth;
			cb();
		}, 15);
	};

	window.addEventListener('resize', handleResize);

	return () => window.removeEventListener('resize', handleResize);
};

export const detectUsersOS = () => {
	if (window.navigator.userAgent.indexOf('Win') !== -1) return 'Windows OS';
	if (window.navigator.userAgent.indexOf('Mac') !== -1) return 'Macintosh';
	if (window.navigator.userAgent.indexOf('Linux') !== -1) return 'Linux OS';
	if (window.navigator.userAgent.indexOf('Android') !== -1) return 'Android OS';
	if (window.navigator.userAgent.indexOf('like Mac') !== -1) return 'iOS';

	return null;
};

export const onWindowChangeOrientation = (cb) => {
	if ((!cb && !isFunction(cb)) || !isTouchDevice()) return;

	let { windowWidth } = getWindowSize();

	const handleResize = () => {
		const { windowWidth: newWindowWidth } = getWindowSize();

		if (windowWidth !== newWindowWidth) cb();

		windowWidth = newWindowWidth;
	};

	window.addEventListener('resize', debounce(100, handleResize));
};

export const onWindowScroll = (cb) => {
	if (!cb && !isFunction(cb)) return;

	const handleScroll = () => {
		cb(window.pageYOffset);
	};

	window.addEventListener('scroll', debounce(15, handleScroll));

	handleScroll();
};

export const documentReady = (cb) => {
	if (!cb && !isFunction(cb)) return;
	document.addEventListener('DOMContentLoaded', cb);
};

export const pageLoad = (cb) => {
	if (!cb && !isFunction(cb)) return;
	window.addEventListener('load', () => {
		window.loaded = true;
		cb();

		window.onWindowLoadCallbacks?.forEach((cbLocal) => {
			if (!cbLocal && !isFunction(cbLocal)) return;
			cbLocal();
		});
		window.onWindowLoadCallbacks = [];
	});
};

export const page = (cb) => {
	return cb;
	// if (!cb && !isFunction(cb)) return;

	// if (window.loaded) {
	// 	cb();
	// } else {
	// 	if (!window.onWindowLoadCallbacks) window.onWindowLoadCallbacks = [];
	// 	window.onWindowLoadCallbacks.push(cb);
	// }
};

export const setScrollBarWidth = () => {
	const scrollDiv = document.createElement('div');
	scrollDiv.style.width = '100px';
	scrollDiv.style.height = '100px';
	scrollDiv.style.overflow = 'scroll';
	scrollDiv.style.visibility = 'hidden';

	document.body.appendChild(scrollDiv);
	const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};
