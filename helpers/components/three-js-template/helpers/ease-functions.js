const material = {
	uniforms: {
		time: { type: 'f', value: 0 },
		uAnimActive: { value: 0, type: 'f' },

		uFrom: { value: 0, type: 'f' },
		uTo: { value: 1, type: 'f' },

		uStartAt: { value: 0, type: 'f' },
		uDuration: { value: 1, type: 'f' },

		uEase: { value: 0.5, type: 'f' },
	},
	fragmentShader: `
		uniform float uEase;
		// 0   - easeIn
		// 0.5 - inOut
		// 1   - easeOut

		float PI = 3.141592653589793238;
		uniform float uAnimActive;

		uniform float time;
		uniform float uStartAt;
		uniform float uDuration;

		uniform float uFrom;
		uniform float uTo;

		float getEaseVal(float val) {
			float res = 0.;

			// sine easing
			if (uEase == 0.) res = 1. - cos((val * PI) / 2.);
			if (uEase == .5) res = -(cos(PI * val) - 1.) / 2.;
			if (uEase == 1.) res = sin((val * PI) / 2.);

			// power easing
			// if (uEase == 0.) res = pow(val, 3.);
			// if (uEase == 0.5) {
			// 	if (val < 0.5) {
			// 		return res =  4. * val * val * val;
			// 	} else {
			// 		return 1. - pow(-2. * val + 2., 3.) / 2.;
			// 	}
			// };
			// if (uEase == 1.) res = 1. - pow(1. - val, 3.);

			return clamp(res, 0., 1.);
		}

		void main()	{
			vec4 color = vec4(1.0, 1.0, 1.0, 1.);

			float playTime = time - uStartAt;
			float progress = 0.;

			if (playTime <= 0.) {
				progress = 0.;
			} else if (playTime >= uDuration) {
				progress = 1.;
			} else {
				progress = getEaseVal(playTime / uDuration);
			}

			if (uAnimActive > 0.) {
				color.a = mix(uFrom, uTo, progress);
			}

			gl_FragColor = color;
		}
	`,
};

// --------------------------------------------- USAGE
init() {
	const startAnim = () => {
		this.material.uniforms.uAnimActive.value = 1;
		this.material.uniforms.uStartAt.value = this.time;

		this.material.uniforms.uFrom.value = 0;
		this.material.uniforms.uTo.value = 1;

		this.material.uniforms.uEase.value = 0.5;
		this.material.uniforms.uDuration.value = 5;
	};

	startAnim();
}

render() {
	this.time += 0.01;
	this.material.uniforms.time.value = this.time;
}