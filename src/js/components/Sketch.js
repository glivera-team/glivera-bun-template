/* eslint-disable import/extensions */
/* eslint-disable no-unreachable */
import * as T from 'three';
import dat from 'dat.gui';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';s
// import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// for the glsl syntax highlighting
const glsl = (strings, ...values) => {
	return strings.reduce((acc, str, i) => {
		return acc + str + (values[i] !== undefined ? values[i] : '');
	}, '');
}; // for the glsl syntax highlighting#

export default class Sketch {
	constructor(options) {
		this.container = options.dom;
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.time = 0;
		this.isPlaying = true;

		this.initScene();
		this.initCamera();
		this.initRenderer();
		this.initControls();

		this.setup();
	}

	async setup() {
		await this.loadShaders();
		this.addObjects();
		this.resize();
		this.render();
		this.setupResize();
	}

	initScene() {
		this.scene = new T.Scene();
	}

	initCamera() {
		this.camera = new T.PerspectiveCamera(70, this.width / this.height, 0.001, 1000);
		this.camera.position.set(0, 0, 2);
	}

	initRenderer() {
		this.renderer = new T.WebGLRenderer({
			alpha: true,
			antialias: true,
			precision: 'highp',
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0x010101, 0);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = T.PCFSoftShadowMap;
		this.renderer.toneMapping = T.ACESFilmicToneMapping;
		this.renderer.outputEncoding = T.sRGBEncoding;

		this.container.appendChild(this.renderer.domElement);
	}

	initControls() {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	}

	async loadResources(resources) {
		const fileLoader = new T.FileLoader();

		const loaders = {
			shader: fileLoader,
		};

		const resourcesEntries = resources.map(({ type, url, key }) => {
			const promise = new Promise((resolve, reject) => {
				loaders[type].load(url, resolve, () => {}, reject);
			});
			return [key, promise];
		});

		return Object.fromEntries(resourcesEntries);
	}

	async loadShaders() {
		const resources = await this.loadResources([
			{
				key: 'fragment',
				type: 'shader',
				url: './static/shader/fragment.glsl',
			},
			{
				key: 'vertex',
				type: 'shader',
				url: './static/shader/vertex.glsl',
			},
		]);

		if (!resources) return;

		this.vertex = await resources.vertex;
		this.fragment = await resources.fragment;
	}

	addObjects() {
		this.material = new T.ShaderMaterial({
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enable',
			},
			side: T.DoubleSide,
			uniforms: {
				time: { type: 'f', value: 0 },
				resolution: { type: 'v4', value: new T.Vector4() },
				uvRate1: { value: new T.Vector2(1, 1) },
			},
			vertexShader: this.vertex,
			fragmentShader: this.fragment,
		});

		this.geometry = new T.PlaneGeometry(1, 1, 1, 1);
		this.plane = new T.Mesh(this.geometry, this.material);
		this.scene.add(this.plane);
	}

	setupResize() {
		window.addEventListener('resize', this.resize.bind(this));
	}

	resize() {
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.renderer.setSize(this.width, this.height);
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
	}

	stop() {
		this.isPlaying = false;
	}

	play() {
		if (!this.isPlaying) {
			this.render();
			this.isPlaying = true;
		}
	}

	render() {
		if (!this.isPlaying) return;
		this.time += 0.05;
		this.material.uniforms.time.value = this.time;
		window.requestAnimationFrame(this.render.bind(this));
		this.renderer.render(this.scene, this.camera);
	}

	uiConfigurator() {
		this.gui = new dat.GUI();
		this.gui.domElement.style.position = 'absolute';
		this.gui.domElement.style.top = '0';
		this.gui.domElement.style.left = '0';
		this.animationSettings = {
			speed: 0.6,
		};
		this.gui.add(this.animationSettings, 'speed', 0.1, 1).onChange(() => {
			// this.timeline.timeScale(this.animationSettings.speed);
		});
	}
}
