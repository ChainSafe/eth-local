#!/usr/bin/env node
const express = require('express');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
const app = express();
const bodyParser = require('body-parser');
const BN = require('ethereumjs-util').BN;
const {log, debug} = require('./utils/logger');

// Relative imports
const Setup = require('./utils/setup');
const Wallet = require('./utils/wallet');
const Sign = require('./utils/sign');
const spawn = require('./utils/spawn');


let signedTransactionObject;

// Constants
let PORT = 3210;
app.use(bodyParser.json());

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
if (program.start) {
	let portArg = process.argv[3];
	if (portArg && portArg.length > 3) {
		PORT = process.argv[3];
	} else {
		console.log("Supplied port must be at least 4 numbers long!");
		process.exit(1);
	}
	console.log(`\nListening on port ${PORT}`);
	app.listen(PORT);
}
if (program.wallet) Wallet.Choose();

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

app.get('/req', (req, res) => {
	const to = req.query.to
	const value = req.query.value
	console.log('received ' + to + " " + value );
});

app.get('/wallets', (req, res) => {
	res.send(Wallet.getWallets());
})

// used for Web3 tx signing
var node_endpoint = "http://127.0.0.1:8545"
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider(node_endpoint));
var addr1 = "0x781eD7a40BE08584fCd086e3e8337154B20B4e3B";  // test from account

app.post('/transactionDetails', async(req, res) => {
    //const from = req.body.from
    //TODO: determine why req.body.from is undefined for me (ed)
    debug('req.body.from:', req.body.from)
    const from = req.body.from//'0xd9Ccb5FFd474b7830e41a03E1675084b3e27DBd4';
    const to = req.body.to
    const value = new BN(req.body.value);
    //TODO: Find better way of getting user password
    const password = 'password';

    let realPW = await spawn.start()

    var rawTx = {};
    rawTx.nonce = web3.utils.toHex(web3.eth.getTransactionCount(from));
    rawTx.to = to;
    rawTx.gasPrice = web3.utils.toHex(31000000000);
    rawTx.gasLimit = web3.utils.toHex(21000);
    rawTx.value = web3.utils.toHex(web3.utils.toWei(value, 'ether'));
    rawTx.data = "";


    Sign.SignTX(rawTx, from, password).then((val) => {
        console.log('signed digest: ', val);
        signedTransactionObject = val;
    }).catch(function(error) {
      console.log(error);
    });

    console.log("to: " + to);
    console.log("from: " + from);
    console.log("value: " + value);
    console.log("rawTX: ", rawTx);
})

app.get("/getSignedTransaction", (req, res) => {
  console.log(signedTransactionObject);
  res.send(signedTransactionObject);
})
