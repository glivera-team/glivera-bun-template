import { onWindowScroll, exist } from '../utils';

const header = () => {
	const SELECTORS = {
		header: '.js-header',
		menuTrigger: '.js-header-menu-trigger',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
		headerScrollState: 'header--scroll_state',
	};

	const $body = document.body;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTriggers = document.querySelectorAll(SELECTORS.menuTrigger);

	let isMenuOpen = false;

	const handleTriggerClick = () => {
		if (!isMenuOpen) {
			$body.classList.add(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = true;
		} else {
			$body.classList.remove(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = false;
		}
	};

	const headerScroll = (scrollY) => {
		if (scrollY > 10 && !$header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.add(CLASSNAMES.headerScrollState);
		} else if (scrollY <= 10 && $header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.remove(CLASSNAMES.headerScrollState);
		}

		/**
		 * if you need header dissapear
		 * 1. Add this to CLASSNAMES: bodyScrollPos: 'body--pos_state',
		 * 2. Add this variable: let prevScrollPos = window.scrollY;
		 * 3. Get Header height: const headerHeight = $header.clientHeight;
		 * 4. Paste:
		 * if (prevScrollPos < window.scrollY && scrollY > headerHeight) {
		 * 	$header.classList.add(CLASSNAMES.bodyScrollPos);
		 * } else {
		 * 	$header.classList.remove(CLASSNAMES.bodyScrollPos);
		 * }
		 * prevScrollPos = window.scrollY;
		 */
	};

	const initializeEventListeners = () => {
		if (!exist($menuTriggers)) return;

		$menuTriggers.forEach(($trigger) => {
			$trigger.addEventListener('click', () => {
				handleTriggerClick();
			});
		});
	};

	if (!exist($header)) return;

	onWindowScroll(headerScroll);
	initializeEventListeners();
};

export default header;
