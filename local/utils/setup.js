const prompt = require('prompt');
const fs = require('fs');
const { HOME_DIR, ETH_HOME, FULL_PATH } = require('./constants');

// Constants
// const HOME_DIR = require('os').homedir();
// const ETH_HOME = '.eth-ssh';
// const FULL_PATH = path.join(HOME_DIR, ETH_HOME);

Verify = () => {
	console.log(`\nChecking if ${ETH_HOME} exists in ${HOME_DIR}...`)
	if (!fs.existsSync(FULL_PATH)) {
		console.log('\nDirectory structure not found!');
		SetupDir();
	} else {
		console.log(`${ETH_HOME} found in ${HOME_DIR}!`)
	}
};

SetupDir = () => {
	const promptSchema = {
		properties: {
			input: {
				message: `Create directory ${ETH_HOME} in ${HOME_DIR}? (Y/n)`
			}
		}
	};
	prompt.start();
	prompt.get(promptSchema, (err, res) => {
		if (res.input.toLowerCase() === 'y') {
			console.log(`Creating directory...`);
			fs.mkdir(FULL_PATH, (err, res) => {
				if (err) {
					console.log('Error creating directory, exiting...');
					console.log(e);
					process.exit(1);
				} else {
					console.log('Succesfully created directory');
				}
			});
		} else if (res.input.toLowerCase() === 'n') {
			console.log('User declined setup.')
			process.exit(1);
		} else {
			console.log(`${res.input} is an invalid input.`);
			console.log('Exiting...');
			process.exit(1);
		}
	});
};

module.exports = Verify;
