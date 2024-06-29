/** OrthographicCamera Chunk - setup the camera to ignore the z axis */

const frustumSize = 10;
const aspect = window.innerWidth / window.innerHeight;
this.camera = new T.OrthographicCamera(
	(frustumSize * aspect) / -2,
	(frustumSize * aspect) / 2,
	frustumSize / 2,
	frustumSize / -2,
	-1000,
	1000,
);
