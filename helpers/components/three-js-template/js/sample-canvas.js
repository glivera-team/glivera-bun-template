/* eslint-disable no-unreachable */
import * as T from 'three';

/**
 * Template for creation a canvas with three.js
 * Describes the structure and sequence of functions for rendering
 * Contains useful developments often found in projects
 */
export default class SampleCanvas {
	constructor(options) {
		this.container = options.dom;
		this.init();
	}

	/** Initialization */
	async init() {
		if (this.container) return;

		this.setupEvironment();
		this.setupScene();

		try {
			await this.loadObjects();
		} catch (e) {
			console.log(e);
		}

		this.addObjects();
		// this.addLights();
		// this.addGui();
		this.resize();
		this.render();
		this.initEvents();
	}

	/** Environment & Variables */
	setupEvironment() {
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
	}

	/** Setup Canvas */
	setupScene() {
		/** Rendering: */
		this.scene = new T.Scene();
		this.renderer = new T.WebGLRenderer({
			alpha: true,
			antialias: true,
			precision: 'highp',
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xeeeeee, 1);
		this.renderer.outputEncoding = T.sRGBEncoding;
		this.container.appendChild(this.renderer.domElement);

		/** User View: */
		this.camera = new T.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
		this.camera.position.set(0, 0, 2);
	}

	/** Setup Events */
	initEvents() {
		window.addEventListener('resize', this.resize.bind(this));
	}

	/** Update environment on resize */
	resize() {
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.renderer.setSize(this.width, this.height);
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
	}

	/** Load external assets & modules */
	loadObjects() {
		const loader = new T.FileLoader();

		const fragment = new Promise((resolve, reject) => {
			loader.load(
				'./glsl/fragment.glsl',
				(data) => {
					this.fragment = data;
					resolve();
				},
				() => {},
				(err) => {
					console.log(err);
					reject();
				},
			);
		});

		const vertex = new Promise((resolve, reject) => {
			loader.load(
				'./glsl/vertex.glsl',
				(data) => {
					this.vertex = data;
					resolve();
				},
				() => {},
				(err) => {
					console.log(err);
					reject();
				},
			);
		});

		return Promise.all([fragment, vertex]);
	}

	/** Setup Mesh material */
	setMaterials() {
		this.material = new T.ShaderMaterial({
			//
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enable',
			},
			side: T.DoubleSide,
			uniforms: {
				time: { type: 'f', value: 0 },
				resolution: { type: 'v4', value: new T.Vector4() },
				uvRate1: {
					value: new T.Vector2(1, 1),
				},
			},
			// wireframe: true,
			// transparent: true, // если в текстурке используется альфа-канал
			vertexShader: this.vertex,
			fragmentShader: this.fragment,
		});
	}

	/** Setup Mesh geometry */
	setGeometries() {
		this.geometry = new T.PlaneGeometry(1, 1, 1, 1);
	}

	/** Create and add meshes to the scene */
	addObjects() {
		this.setGeometries();
		this.setMaterials();

		this.plane = new T.Mesh(this.geometry, this.material);
		this.scene.add(this.plane);
	}

	/** Сanvas drawing */
	render() {
		window.requestAnimationFrame(this.render.bind(this));
		this.renderer.render(this.scene, this.camera);
	}
}
