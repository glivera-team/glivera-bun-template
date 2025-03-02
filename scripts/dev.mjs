/**
 * Development script for bundling and serving a web application.
 */

import Bundler from 'bun-bundler';
import { ImageProcessor, Server, SpriteBuilder } from 'bun-bundler/modules';

const bundler = new Bundler();
const server = new Server();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

bundler.watch({
	dist: './dist',
	// sass/css bundling
	sass: './src/scss/app.scss',
	cssDist: './dist/css/',
	// js bundling
	js: './src/js/app.js',
	jsDist: './dist/js/',
	// html/pug bundling
	html: './src/pug/pages',
	htmlDist: './dist',
	staticFolders: [
		// static assets bundling
		'./src/images/',
		'./src/fonts/',
		'./src/static/',
	],
	assembleStyles: './dist/css/app.css', // imported styles form JS goes here
	production: process.env.NODE_ENV === 'production',
	debug: false,
	onStart: () => {
		server.startServer({
			root: './dist',
			open: true,
			debug: false,
			port: 8080,
			overrides: {},
		});
	},
	onUpdate: ({ changes }) => {
		if (changes.staticFolders) {
			imgProcessor.start({
				debug: false,
				entry: './dist/images',
			});

			spriteBuilder.start({
				debug: false,
				dist: './dist/images/sprite/sprite.svg',
				entry: './dist/',
				spriteIconSelector: 'svg[data-sprite-icon]',
			});
		}
	},
	onError: () => server.stopServer(),
});
