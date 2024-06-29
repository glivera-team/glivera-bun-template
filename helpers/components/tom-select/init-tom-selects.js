import TomSelect from 'tom-select';
import { exist } from '../utils';
import 'tom-select/dist/css/tom-select.css';
import 'ScssComponents/universal/tom-select.scss';

/**
 * Initialize TomSelect plugin for custom selects, compatible with WordPress
 */
const initTomSelects = () => {
	const SELECTORS = {
		select: '.js-tom-select',
	};

	const $selects = document.querySelectorAll(SELECTORS.select);
	if (!exist($selects)) return;

	$selects.forEach(($item) => {
		const select = new TomSelect($item, {
			items: [],
		});
	});
};

export default initTomSelects;
