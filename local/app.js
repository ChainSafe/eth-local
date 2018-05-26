const express = require('express');
const fs = require('fs');
const path = require('path');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const app = express();
const PORT = 3210;

// Clear terminal & show message.
clear();
console.log(
	chalk.yellow(
		figlet.textSync('ETH-SSH', { horizontalLayout: 'full' })
	)
);

// Relative imports
const Setup = require('./utils/setup');
const Wallet = require('./utils/wallet');

// Always run to ensure the environment is correctly setup.
Setup();

// Check CLI Arguments
switch (process.argv[2].toLowerCase()) {
  case 'new-wallet':
	  break;
	case 'start':
		app.listen(PORT);
		break;
	default:
		console.log('Incorrect command...');
		console.log('TODO: Use npm yargs');
		process.exit(1);
		break;
}

// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});

app.get('/', (req, res) => res.send({connected: true}));

app.get('/getAccounts', (req, res) => {
  console.log('Received request');
});
