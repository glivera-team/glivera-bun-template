/** Lights Chunk - sample lights */

addLights() {
	const l1 = new T.AmbientLight(0xfffffff, 0.2);
	const l2 = new T.HemisphereLight(0xfffffff, 1);

	l2.position.set(-4, 4, 2);

	this.scene.add(l2, l1);
}