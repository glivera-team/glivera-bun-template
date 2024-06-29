import { onWindowScroll, exist } from '../utils';
import HeaderDropDown from './header-accordion';

const header = () => {
	const acc = new HeaderDropDown({
		wrapper: '.header__nav_item', // eslint-disable-line
		triggers: document.querySelectorAll('.js-dropdown-menu'), // eslint-disable-line
		activeStateName: 'header__nav_sub_item--active-mod', // eslint-disable-line
	});

	acc.init();

	const SELECTORS = {
		header: '.js-header',
		menuTrigger: '.js-menu-trigger',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
		headerScrollState: 'header--scroll_state',
		headerScrollPos: 'header--pos_state',
	};

	const $body = document.body;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTriggers = document.querySelectorAll(SELECTORS.menuTrigger);
	let prevScrollPos = window.pageYOffset;

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

	const headerScroll = (windowScrollTop) => {
		if (windowScrollTop > 10 && !$header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.add(CLASSNAMES.headerScrollState);
		} else if (windowScrollTop <= 10 && $header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.remove(CLASSNAMES.headerScrollState);
		}

		if (window.scrollY === 0) {
			$header.classList.remove(CLASSNAMES.headerScrollPos);
		} else if (prevScrollPos < window.scrollY) {
			$header.classList.add(CLASSNAMES.headerScrollPos);
			acc.closeAllAccordion();
		} else {
			$header.classList.remove(CLASSNAMES.headerScrollPos);
		}

		prevScrollPos = window.scrollY;
	};

	if (!exist($header)) return;

	onWindowScroll(headerScroll);

	if (!exist($menuTriggers)) return;

	$menuTriggers.forEach(($trigger) => {
		$trigger.addEventListener('click', () => {
			handleTriggerClick();
		});
	});
};

export default header;
