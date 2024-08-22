import { deploy } from '@samkirkland/ftp-deploy';
import path from 'path';
import { exec } from 'child_process';

import dotenv from 'dotenv';

const getCurrentGitBranchName = () => {
	return new Promise((resolve, reject) => {
		exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
			if (typeof stdout === 'string') return resolve(stdout.trim());
			return reject(err);
		});
	});
};

async function startDeploy({ server, username, password, folder }) {
	console.log('[💹--- Deploy started ]');

	const currentYear = new Date().getFullYear();
	const localDir = './build/';
	const serverDir = path.join(currentYear.toString(), folder).replace(/\\/g, '/');
	const protocol = 'https://';
	const host = 'test.glivera.com/team/tasks/';
	const deployUrl = [protocol, path.join(host, serverDir).replace(/\\/g, '/')].join('');

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

	return process.exit(0);
}

const init = async () => {
	if (!process.env.FTP_ENV) return console.error('FTP_ENV is not provided in .env');

	dotenv.config();
	dotenv.config({ path: path.resolve(process.cwd(), process.env.FTP_ENV) });
	const DEPLOY_BRANCH = 'staging';

	const { FTP_PASSWORD, FTP_USER, FTP_HOST, DEPLOY_FOLDER = path.basename(process.cwd()) } = process.env;

	if (!FTP_PASSWORD) return console.error('FTP_PASSOWORD is not provided in FTP_ENV file.');
	if (!FTP_USER) return console.error('FTP_USER is not provided in FTP_ENV file.');
	if (!FTP_HOST) return console.error('FTP_HOST is not provided in FTP_ENV file.');
	if ((await getCurrentGitBranchName()) !== DEPLOY_BRANCH)
		return console.error('You are not on the staging branch');

	return startDeploy({
		server: FTP_HOST,
		username: FTP_USER,
		password: FTP_PASSWORD,
		folder: DEPLOY_FOLDER,
	});
};

init();
