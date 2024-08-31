/**
 * This script handles the deployment process using FTP.
 * Make sure you have added the ftp.env file with all the necessary FTP credentials.
 */

import { deploy } from '@samkirkland/ftp-deploy';
import path from 'path';
import dotenv from 'dotenv';
import { getCurrentGitBranchName } from './utils';
import { DEPLOY_BRANCH } from './constants';

async function startDeploy({ server, username, password, folder }) {
	console.log('[💹--- Deploy started ]');

	const currentYear = new Date().getFullYear();
	const localDir = './build/';
	const serverDir = path.join(currentYear.toString(), folder).replace(/\\/g, '/');
	const deployUrl = `https://test.glivera.com/team/tasks/${serverDir}`;

	try {
		await deploy({
			server,
			username,
			password,
			'local-dir': localDir,
			'server-dir': serverDir,
			'log-level': 'minimal',
		});
		console.log(`[❇️--- Deployed successfully - Folder: [${deployUrl}] ]`);
	} catch (e) {
		console.error(e);
	}

	process.exit(0);
}

async function loadEnvironment() {
	if (!process.env.FTP_ENV) {
		throw new Error('FTP_ENV is not provided in .env');
	}

	dotenv.config();
	dotenv.config({ path: path.resolve(process.cwd(), process.env.FTP_ENV) });

	const { FTP_PASSWORD, FTP_USER, FTP_HOST, DEPLOY_FOLDER = path.basename(process.cwd()) } = process.env;

	if (!FTP_PASSWORD) throw new Error('FTP_PASSWORD is not provided in FTP_ENV file.');
	if (!FTP_USER) throw new Error('FTP_USER is not provided in FTP_ENV file.');
	if (!FTP_HOST) throw new Error('FTP_HOST is not provided in FTP_ENV file.');

	return { FTP_PASSWORD, FTP_USER, FTP_HOST, DEPLOY_FOLDER };
}

async function checkDeployBranch() {
	const currentBranch = await getCurrentGitBranchName();
	if (currentBranch !== DEPLOY_BRANCH) {
		throw new Error(`You are not on the "${DEPLOY_BRANCH}" branch.`);
	}
}

async function init() {
	try {
		const { FTP_PASSWORD, FTP_USER, FTP_HOST, DEPLOY_FOLDER } = await loadEnvironment();
		await checkDeployBranch();

		await startDeploy({
			server: FTP_HOST,
			username: FTP_USER,
			password: FTP_PASSWORD,
			folder: DEPLOY_FOLDER,
		});
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
}

init();
