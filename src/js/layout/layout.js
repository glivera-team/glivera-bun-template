import { calcViewportHeight, onWindowResize } from '../utils';

const layout = () => {
	onWindowResize(() => {
		calcViewportHeight();
	});
	calcViewportHeight();
};

export default layout;
