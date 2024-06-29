import Accordion from './components/accordion';

/** Accordion init sample */
const accordion = Accordion({
	triggers: document.querySelectorAll('.accordion__item_head'),
	activeStateName: 'accordion__item--active-mod',
});
