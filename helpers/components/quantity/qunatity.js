/**
 * Standart quantity input functionality
 * usage:
 * put js-selectors to your field
 * init function on your page
 */

const quantity = () => {
	const CLASSNAMES = {
		qty: '.js-quantity',
		value: '.js-quantity-value',
		input: '.js-quantity-input',
		increase: '.js-quantity-increase',
		decrease: '.js-quantity-decrease',
	};

	const $qtyAll = document.querySelectorAll(CLASSNAMES.qty);
	$qtyAll.forEach(($qty) => {
		const $input = $qty.querySelector(CLASSNAMES.input);
		const $value = $qty.querySelector(CLASSNAMES.value);
		const $decrease = $qty.querySelector(CLASSNAMES.decrease);
		const $increase = $qty.querySelector(CLASSNAMES.increase);

		if (!$input || !$value || !$decrease || !$increase) return;

		const maxVal = Number($input.getAttribute('max')) || 99999;
		const minVal = Number($input.getAttribute('min')) || 1;
		let currentVal = Number($input.value);
		$value.textContent = currentVal;

		const updateContent = () => {
			$value.textContent = currentVal;
			$input.value = currentVal;
		};

		const handleDecrease = () => {
			if (currentVal === minVal) return;
			currentVal -= 1;
			updateContent();
		};
		const handleIncrease = () => {
			if (currentVal === maxVal) return;
			currentVal += 1;
			updateContent();
		};

		$increase.addEventListener('click', handleIncrease);
		$decrease.addEventListener('click', handleDecrease);
	});
};

export default quantity;
