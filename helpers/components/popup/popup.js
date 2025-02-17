import { exist } from '../utils/index';
import 'ScssComponents/universal/popup.scss';

/**
 * Standart popup constructor
 * contains default methods for popup functionality
 * usage:
 * init - initPopup('.js-popup-btn-name', '.js-popup-name', false);
 * data-popup-id - put attribute in popup and trigger if you need id check
 *
 * @param {string} btnSelector 		- trigger selector
 * @param {string} popupSelector 	- popup selector
 * @param {boolean} byId 					- id`s module. finds popups <-> triggers by id
 */
const initPopup = (btnSelector, popupSelector, byId = false) => {
	const SELECTORS = {
		close: '.js-popup-close',
	};

	const CLASSNAMES = {
		popupActiveState: 'popup--open_state',
		bodyPopupOpenState: 'body--popup_open',
	};

	const closePopup = ($popup) => {
		$popup.classList.remove(CLASSNAMES.popupActiveState);
		document.body.classList.remove(CLASSNAMES.bodyPopupOpenState);
	};

	const openPopup = (e, $popup) => {
		e.preventDefault();
		$popup.classList.add(CLASSNAMES.popupActiveState);
		document.body.classList.add(CLASSNAMES.bodyPopupOpenState);
	};

	const initEventListeners = ($btn, $popup) => {
		$btn.addEventListener('click', (e) => openPopup(e, $popup));

		$popup.addEventListener('click', ({ target }) => {
			if (target === $popup) {
				closePopup($popup);
			}
		});

		document.addEventListener('keydown', ({ key }) => {
			if (key === 'Escape') {
				closePopup($popup);
			}
		});

		const $closeBtns = $popup.querySelectorAll(SELECTORS.close);
		if (!exist($closeBtns)) return;

		$closeBtns.forEach(($item) => {
			$item.addEventListener('click', () => closePopup($popup));
		});
	};

	const $btns = document.querySelectorAll(btnSelector);
	if (!exist($btns)) return null;

	const $popup = document.querySelector(popupSelector);

	$btns.forEach(($btn) => {
		if (byId) {
			const { popupId } = $btn.dataset;
			if (!popupId) return;

			const $popupWithId = document.querySelector(`${popupSelector}[data-popup-id="${popupId}"]`);
			if (!exist($popup)) return;

			initEventListeners($btn, $popupWithId);
		} else {
			if (!exist($popup)) return;

			initEventListeners($btn, $popup);
		}
	});

	return null;
};

export default initPopup;
