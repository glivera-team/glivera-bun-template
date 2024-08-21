import Sketch from '../components/Sketch';
import { page } from '../utils';

export const indexPage = page(() => {
	const sketch = new Sketch({
		dom: document.querySelector('#container'),
	});
});
