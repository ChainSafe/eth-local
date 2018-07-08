const ethers = require('ethers');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const clear = require('clear');
const { FULL_PATH } = require('./constants');
const {log, debug} = require('./logger')

const createQuestions = [{
		name: 'walletName',
		type: 'input',
		message: `Desired wallet name? (default public address)`
	},
	{
		name: 'createConfirm',
		type: 'confirm',
		message: 'Please write down your mnemonic, confirm once written down.'
	},
	{
		name: 'choose',
		type: 'list',
		message: 'Please choose a wallet action:',
		choices: ['Create Wallet', 'Get Balance']
	},
	{
		name: 'password',
		type: 'password',
		message: 'Please choose a password to encrypt your wallet:'
	},
	{
		name: 'confirmPassword',
		type: 'password',
		message: 'Re-type password:'
	},
];

Choose = async () => {
	const res = await inquirer.prompt(createQuestions[2]);
	switch (res.choose) {
		case 'Create Wallet':
			CreateWallet();
			break;
		case 'Get Balance':
			console.log('Not supported yet!');
			process.exit(1);
			break;
	}

};

CreateWallet = async () => {
	const resName = await inquirer.prompt(createQuestions[0]);
	const wallet = ethers.Wallet.createRandom();
	const walletName = resName.walletName === "" ? wallet.address : `${resName.walletName} - ${wallet.address}`;
	const filePath = path.join(FULL_PATH, walletName);
	// Exit if wallet name already exists.
	if (fs.existsSync(filePath)) {
		console.log('\nWallet with that name already exists...');
		console.log('\nExiting...');
		process.exit(1);
	}
	console.log(`mnemonic: ${wallet.mnemonic}`);
	await inquirer.prompt(createQuestions[1]);
	// Get rid of mnemonic
	clear();
	const passRes = await inquirer.prompt(createQuestions.slice(3,5));
	if (passRes.password !== passRes.confirmPassword) {
		console.log("Passwords do not match!");
		process.exit(1);
	}
	const encryptedWallet = await wallet.encrypt(passRes.password, percentLoader);
	// write to a new file
	fs.writeFile(filePath, JSON.stringify(encryptedWallet), (err) => {
		// throws an error, you could also catch it here
		if (err) {
			console.log(err);
			process.exit(1);
		}
		// success case, the file was saved
		console.log(`\nSuccessfully created ${walletName} \n at ${filePath}`);
		process.exit(1);
	});
};

percentLoader = (percent) => {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(`Encrypting... ${parseInt(percent * 100)}%`);
};

getWallets = () => {
	let files = fs.readdirSync(FULL_PATH);
	let wallets = {}
	files.map((file, i) => {
	  debug(`Found file: ${file}`)
	  // Get name from 'name - address'
	  wallets[file.split('-')[0].trim()] = FULL_PATH + '/' + file
	})
	debug('Wallets found:', wallets)
	return wallets
  }

module.exports = { Choose, getWallets } ;