#!/usr/bin/env node
const express = require('express');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
const app = express();

// Relative imports
const Setup = require('./utils/setup');
const Wallet = require('./utils/wallet');

// Constants
const PORT = 3210;

// Clear terminal & show message.
clear();
console.log(
	chalk.yellow(
		figlet.textSync('ETH-LOCAL', { horizontalLayout: 'full' })
	)
);

// Flags
program
	.version('0.1.0')
	.option('-s, --setup', 'Setup the wallet in your local drive.')
	.option('-S, --start', 'Start app.')
	.option('-w, --wallet', 'Wallet functionality.')
	.parse(process.argv);

// Show helper if no arguments are passed
if (!process.argv.slice(2).length) program.help();
// Verify the setup
else Setup.Verify();

// Execute functions based on arguments
if (program.setup) Setup.Init();
if (program.start) app.listen(PORT);
if (program.wallet) Wallet();

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

app.get('/req', (req, res) => {console.log('received')});
