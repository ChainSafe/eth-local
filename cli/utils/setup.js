const inquirer   = require('inquirer');
const fs = require('fs');
const { HOME_DIR, ETH_HOME, FULL_PATH } = require('./constants');

Verify = () => {
	console.log(`\nChecking if ${ETH_HOME} exists in ${HOME_DIR}...`);
	if (!fs.existsSync(FULL_PATH)) {
		console.log('\nDirectory structure not found! Please run setup');
		return false;
	} else {
		console.log(`${ETH_HOME} found in ${HOME_DIR}!`);
		return true;
	}
};

const question = [{
	name: 'input',
	type: 'confirm',
	message: `Create directory ${ETH_HOME} in ${HOME_DIR}?`
}];

Setup = async () => {
	const res = await inquirer.prompt(question);
	if (res.input) {
		console.log(`Creating directory...`);
		fs.mkdir(FULL_PATH, (err, res) => {
			if (err) {
				console.log('Error creating directory, exiting...');
				console.log(err);
				process.exit(1);
			} else {
				console.log('Succesfully created directory');
			}
		});
	} else {
		console.log(`\nUser declined setup.`);
		console.log('\nExiting...');
		process.exit(1);
	}
};

module.exports = {Setup, Verify};
