import layout from './layout/layout';
import { documentReady, pageLoad } from './utils';

const styles = ['color: #fff', 'background: #cf8e1f'].join(';');
const message = 'Developed by Glivera-team https://glivera-team.com/';
console.info('%c%s', styles, message);

const app = () => {
	layout();
	pageLoad(() => {
		document.body.classList.add('body--loaded');
	});
};

documentReady(() => {
	app();
});
