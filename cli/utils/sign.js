const ethers = require('ethers')
const inquirer = require('inquirer')
const fs = require('fs')
const {log, debug} = require('./logger')
const { HOME_DIR, ETH_HOME, FULL_PATH } = require('./constants');

const questions = [
  {
    name: 'walletList',
    type: 'list',
    message: 'Select wallet:'
  },{
    name: 'password',
    type: 'password',
    message: 'Enter password'
}]

// Parses list of wallet names from their filenames
const getWallets = () => {
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

SignTX = async (tx) => {
  // Update wallet list
  let wallets = getWallets()
  questions[0].choices = Object.keys(wallets)
  // Choose wallet
  let walletRes = (await inquirer.prompt(questions[0]))[questions[0].name]
  // Get pw and load account
  let passwordRes = await inquirer.prompt(questions[1])
  // Load signing key
  debug('Loading key from: ', wallets[walletRes])
  // TODO: This doesnt seem to work
  let keyStore = JSON.parse(fs.readFileSync(wallets[walletRes]))
  debug(keyStore)
  let privateKey = new ethers.Wallet.fromEncryptedWallet(keyStore, passwordRes)
  let signingKey = new ethers.SigningKey(privateKey)
  // Encode tx
  let txBytes = ethers.utils.toUtf8Bytes(message);
  let txDigest = ethers.utils.keccak256(messageBytes);
  // Sign tx and return it
  return signingKey.signDigest(txDigest)
}

// DEBUG
SignTX('abc').then((res) => console.log(res))