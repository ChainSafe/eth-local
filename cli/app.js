#!/usr/bin/env node
const express = require('express');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
const app = express();
var bodyParser = require('body-parser')


// Relative imports
const Setup = require('./utils/setup');
const Wallet = require('./utils/wallet');

// Constants
const PORT = 3210;
app.use(bodyParser.json())

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
var EthTx = require("ethereumjs-tx");
var web3 = new Web3(new Web3.providers.HttpProvider(node_endpoint));
var addr1 = "0x781eD7a40BE08584fCd086e3e8337154B20B4e3B";  // test from account
var pKey1 = "358be44145ad16a1add8622786bef07e0b00391e072855a5667eb3c78b9d3803"; // test pkey
var pKey1x = new Buffer(pKey1, 'hex')

app.post('/transactionDetails', (req, res) => {
    const from = req.body.from
    const to = req.body.to
    const value = req.body.value;
    var rawTx = {};
    //todo: get from address from Wallet
    rawTx.nonce = web3.utils.toHex(web3.eth.getTransactionCount(addr1));
    rawTx.to = to;
    rawTx.gasPrice = web3.utils.toHex(31000000000);
    rawTx.gasLimit = web3.utils.toHex(21000);
    rawTx.value = web3.utils.toHex(web3.utils.toWei(value, 'ether'));
    rawTx.data = "";

    var tx = new EthTx(rawTx);
    tx.sign(pKey1x);
    var serializedTx = `0x${tx.serialize().toString('hex')}`

    web3.eth.sendSignedTransaction(serializedTx, (error, data) => {
        if(!error) {
            console.log("data: ", data);
        } else {
            console.log("error: ", error);
        }
    })
	console.log("to: " + to);
	console.log("from: " + from);
	console.log("value: " + value);
	console.log("rawTX: ", rawTx);
	console.log("serializedTx ", serializedTx);
})