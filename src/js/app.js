import layout from './layout/layout';
import { indexPage } from './pages';
import { articlePage } from './pages/article';
import { uiPage } from './pages/ui';
import { documentReady, pageLoad } from './utils';

const styles = ['color: #fff', 'background: #cf8e1f'].join(';');
const message = 'Developed by Glivera-team https://glivera-team.com/';

// eslint-disable-next-line no-console
console.info('%c%s', styles, message);

window.NodeList.prototype.map = Array.prototype.map;
window.NodeList.prototype.filter = Array.prototype.filter;

const app = () => {
	layout();
	pageLoad(() => {
		indexPage();
		articlePage();
		uiPage();
		document.body.classList.add('body--loaded');
	});
};

// -------------------  init App
documentReady(() => {
	app();
});
// -------------------  init App##
