import { deploy } from '@samkirkland/ftp-deploy';
import path from 'path';

import dotenv from 'dotenv';

if (!process.env.FTP_ENV) throw new Error('FTP_ENV is not provided in .env');

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), process.env.FTP_ENV) });

const { FTP_PASSWORD, FTP_USER, FTP_HOST, DEPLOY_FOLDER } = process.env;

if (!FTP_PASSWORD) throw new Error('FTP_PASSOWORD is not provided in FTP_ENV file.');
if (!FTP_USER) throw new Error('FTP_USER is not provided in FTP_ENV file.');
if (!FTP_HOST) throw new Error('FTP_HOST is not provided in FTP_ENV file.');

async function devDeploy() {
	console.log('🚚 Deploy started');

	const currentYear = new Date().getFullYear();
	const serverFolder = DEPLOY_FOLDER || path.basename(process.cwd()) || '/unnamed_project/';

	try {
		await deploy({
			server: FTP_HOST,
			username: FTP_USER,
			password: FTP_PASSWORD, // note: I'm using backticks here ` so I don't have to escape quotes
			'local-dir': './build/',
			'server-dir': path.join(currentYear.toString(), serverFolder).replace(/\\/g, '/'),
		});
		console.log(`[❇️--- Deployed successfully - Folder: ${serverFolder} ]`);
	} catch (e) {
		console.error(e);
	}
	process.exit(0);
}

devDeploy();
