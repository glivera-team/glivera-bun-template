/**
 * Development script for bundling and serving a web application.
 * This script sets up a development environment using bun-bundler,
 * watches for file changes, processes images, builds sprites,
 * and starts a local development server.
 */

import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, Server, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const server = new Server();
const imgProcessor = new ImageProcessor();

const dist = path.resolve('./dev-dist');
const src = path.resolve('./src');
const debugMode = false;

const dev = () => {
	bundler.watch({
		production: process.env.NODE_ENV === 'production',
		debug: debugMode,
		html: () => Bundler.utils.getDirFiles(`${src}/pug/pages/`),
		sass: [`${src}/scss/app.scss`],
		js: [`${src}/js/app.js`],
		staticFolders: [`${src}/images/`, `${src}/fonts/`, `${src}/static/`],
		dist,
		htmlDist: dist,
		cssDist: `${dist}/css/`,
		assembleStyles: `${dist}/css/app.css`,
		jsDist: `${dist}/js/`,
		onStart: () => {
			server.startServer({
				open: true,
				debug: debugMode,
				port: 8080,
				root: dist,
			});
		},
		onBuildComplete: () => {
			imgProcessor.process({
				debug: debugMode,
				root: `${dist}/images/`,
			});
			spriteBuilder.build({
				debug: debugMode,
				htmlDir: dist,
				dist: `${dist}/images/sprite/sprite.svg`,
			});
		},
		onCriticalError: () => {
			server.stopServer();
		},
	});
};

dev();
