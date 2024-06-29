/**
 * Default Tabs contructor
 * Functionallity:
 * toggle active state between multiple tabs/list items
 * @param {string} trigger - trigger js-selector
 * @param {string} content - content js-selector
 * @param {string} triggerClass - trigger markup selector
 * @param {string} contentClass - content markup selector
 */
function tabs({ trigger, content, triggerClass, contentClass }) {
	let triggerSelector = document.querySelectorAll(trigger);
	let blockSelector = document.querySelectorAll(content);

	const activeTriggerClass = `${triggerClass}--active_state`;
	const activeContentClass = `${contentClass}--active_state`;

	const handActiveTab = (id) => {
		document.querySelector(`.${activeTriggerClass}`)?.classList.remove(activeTriggerClass);
		document.querySelector(`.${activeContentClass}`)?.classList.remove(activeContentClass);

		document.querySelector(`.${triggerClass}[data-tab="${id}"]`).classList.add(activeTriggerClass);
		document.querySelector(`.${contentClass}[data-tab="${id}"]`).classList.add(activeContentClass);
		// uncomment for refresh gsap triggers under tabs
		// ScrollTrigger.refresh();
	};

	// set active tab from hash
	// const hash = window.location.hash.substring(1);
	// if (hash) {
	// 	handActiveTab(hash);
	// }

	if (triggerSelector.length && blockSelector.length) {
		triggerSelector.forEach((item) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				let id = item.getAttribute('data-tab');
				handActiveTab(id);
			});
		});
	}
}

export default tabs;
