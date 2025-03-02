/**
 * Build script for production bundling a web application.
 */

import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';
import { getCurrentGitBranchName } from './utils';
import { DEPLOY_BRANCH } from './constants';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();
const stagingBuild = process.env.STAGING === 'true';

const build = async () => {
	try {
		if (stagingBuild && (await getCurrentGitBranchName()) !== DEPLOY_BRANCH)
			console.warn(`👀 Warning: You are not on the "${DEPLOY_BRANCH}" branch.`);
		console.warn('\n -> Building to the ./build directory...');

		bundler.build({
			production: process.env.NODE_ENV === 'production',
			dist: './build',
			// sass/css bundling
			sass: './src/scss/app.scss',
			cssDist: './build/css/',
			// js bundling
			js: './src/js/app.js',
			jsDist: './build/js/',
			// html/pug bundling
			html: './src/pug/pages/',
			htmlDist: './build',
			staticFolders: [
				// static assets bundling
				'./src/images/',
				'./src/fonts/',
				'./src/static/',
			],
			assembleStyles: './build/css/app.css', // imported styles form JS goes here
			debug: false,
			onStart: () => {},
			onBuildComplete: () => {
				imgProcessor.start({
					debug: false,
					entry: './build/images',
				});
				spriteBuilder.start({
					debug: false,
					dist: './build/images/sprite/sprite.svg',
					entry: './build/', // detect SVG in html files here
					spriteIconSelector: 'svg[data-sprite-icon]',
				});
			},
		});
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

build();
