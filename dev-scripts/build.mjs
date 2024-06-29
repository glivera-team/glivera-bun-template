import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const dist = path.resolve('./build');
const src = path.resolve('./src');
const debugMode = false;

bundler.build({
	production: process.env.NODE_ENV === 'production',
	debug: debugMode,
	html: () => Bundler.utils.getDirFiles(`${src}/pug/pages/`),
	sass: [`${src}/scss/app.scss`],
	js: [`${src}/js/app.js`],
	staticFolders: [`${src}/images/`, `${src}/fonts/`, `${src}/static/`],
	dist,
	htmlDist: dist,
	cssDist: `${dist}/css/`,
	jsDist: `${dist}/js/`,
	onBuildComplete: () => {
		imgProcessor.process({
			debug: debugMode,
			root: `${dist}/images/`,
		});
		spriteBuilder.build({
			debug: debugMode,
			htmlDir: dist,
			dist: `${dist}/images/sprite/`,
		});
	},
	onCriticalError: () => {},
});

// setup
// remove style include from js
// js resolving paths
// relative path to js in html

// // export const ENV_STATUS = {
// 	projectDevStatus: process.env.NODE_ENV === `development`,
// 	projectStagingStatus: process.env.STAGING === `true`,
// };

/// ../../node_modules path
// 		if environment === 'development'
// - need for parcel rebuild in dev mode
// object(data=`${assetsImage}icons/sprite-icons/${name}.svg` type="image/svg+xml" style="display: none")
// - need for parcel rebuild in dev mode#
