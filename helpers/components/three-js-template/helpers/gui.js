/** addGui Chunk - adds ui for dynamically changing environment parameters */

import dat from 'dat.gui';

addGui() {
	let that = this;
	this.guiSettings = {
		xRotation: 0,
	};

	this.gui = new dat.GUI();
	const controller = this.gui.add(this.settings, 'xRotation', -1, 1, 0.01);
	controller.onChange((val) => {
		console.log(val);
	});
}