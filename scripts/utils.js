import { exec } from 'child_process';

export const getCurrentGitBranchName = () => {
	return new Promise((resolve, reject) => {
		exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
			if (typeof stdout === 'string') return resolve(stdout.trim());
			return reject(err);
		});
	});
};
