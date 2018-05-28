const ethers = require('ethers');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const clear = require('clear');
const { FULL_PATH } = require('./constants');

const createQuestions = [{
		name: 'walletName',
		type: 'input',
		message: `Desire wallet name? (default public address)`
	},
	{
		name: 'createConfirm',
		type: 'confirm',
		message: 'Please write down your mnemonic, confirm once written down.'
	}];

createWallet = async () => {
	const resName = await inquirer.prompt(createQuestions[0]);
	const wallet = ethers.Wallet.createRandom();
	console.log(`mnemonic: ${wallet.mnemonic}`);
	await inquirer.prompt(createQuestions[1]);
	// Get rid of mnemonic
	clear();
	const walletName = resName.walletName === "" ? wallet.address : resName.walletName;
	const filePath = path.join(FULL_PATH, walletName);
	// Exit if wallet name already exists.
	if (fs.existsSync(filePath)) {
		console.log('\nWallet with that name already exists...');
		console.log('\nExiting...');
		process.exit(1);
	}
	// TODO: Encrypt the private key using a password.
	const content = [wallet.address, wallet.privateKey]
	// write to a new file
	fs.writeFile(filePath, JSON.stringify(content), (err) => {
		// throws an error, you could also catch it here
		if (err) {
			console.log(err);
			process.exit(1);
		}
		// success case, the file was saved
		console.log(`Successfully created ${walletName} at ${filePath}`);
		process.exit(1);
	});
};

module.exports = { createWallet };