/**
 * Build Script
 *
 * This script is responsible for building the project using bun-bundler.
 * It handles bundling HTML, SASS, and JavaScript files, processes images,
 * and creates sprite sheets. The script also supports staging builds and
 * includes debug mode options.
 */

import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';
import { getCurrentGitBranchName } from './utils';
import { DEPLOY_BRANCH } from './constants';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const dist = path.resolve('./build');
const src = path.resolve('./src');
const debugMode = false;
const stagingBuild = process.env.STAGING === 'true';

const build = async () => {
	try {
		if (stagingBuild && (await getCurrentGitBranchName()) !== DEPLOY_BRANCH)
			console.warn(`👀 Warning: You are not on the "${DEPLOY_BRANCH}" branch.`);

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
			assembleStyles: `${dist}/css/app.css`,
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
			// onCriticalError: () => {},
		});
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

build();
