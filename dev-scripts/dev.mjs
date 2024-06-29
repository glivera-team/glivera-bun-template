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
			dist: `${dist}/images/sprite/`,
		});
	},
	onCriticalError: () => {
		server.stopServer();
	},
});

/*

setup

----------------

remove style include from js
----------------

js relative paths
----------------

relative path to js in html

----------------

// export const ENV_STATUS = {
	projectDevStatus: process.env.NODE_ENV === `development`,
	projectStagingStatus: process.env.STAGING === `true`,
};
----------------

/ ../../node_modules path
----------------
//- works
mixin icon(name, mod)
	- mod = mod || 'icon--size_mod';
	span.icon(class=mod data-sprite-icon=name)
		- const svgInline = readFileSync(`./src/images/icons/sprite-icons/${name}.svg`, "utf-8");
		!= svgInline
----------------
mixin dev_widget
	if sitemap && (environment === 'development' || process.env.STAGING === 'true')
		style.
			body {position:relative}
			.widget_wrap{position:absolute;top:100px;left:0;z-index:9999;padding:10px 20px;background:#222;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}
			.widget_wrap:after{content:"Navigation menu";color:white;position:absolute;top:0;left:100%;width:auto;height:auto;padding:10px;text-transform:uppercase;background:#222;cursor:pointer}
			.widget_wrap:hover,
			.widget_wrap:active,
			.widget_wrap:focus {-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}
			.widget_item{padding:0 0 10px}
			.widget_link{color:#fff;text-decoration:none;font-size:15px;}
			.widget_link:hover{text-decoration:underline}

		.widget_wrap
			ul.widget_list
				each item in sitemap
					li.widget_item
						a.widget_link(href=item)= item.replace(/\.html$/, '')
-------------------

						mixin no_use(array)
	.no_use
//--------------------------------------------------------------global vars
- environment = environment || 'development'
- array = '';
- assetsImage = './images/';

//--------------------------------------------------------------forms

-----

	link(rel="stylesheet" href="./css/main-global.css")

*/
