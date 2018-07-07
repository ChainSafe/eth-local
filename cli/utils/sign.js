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
  let passwordRes = (await inquirer.prompt(questions[1])).password
  debug('PW:', passwordRes)
  // Load signing key
  debug('Loading key from: ', wallets[walletRes])
  let keyStore = JSON.parse(fs.readFileSync(wallets[walletRes]))
  debug('KeyStore: ', keyStore)
  let privateKey = await ethers.Wallet.fromEncryptedWallet(keyStore, passwordRes)
  debug('Private Key:', privateKey)
  let signingKey = new ethers.SigningKey(privateKey.privateKey)
  // Encode tx
  let txBytes = ethers.utils.toUtf8Bytes(tx);
  let txDigest = ethers.utils.keccak256(txBytes);
  debug('txDigest:', txDigest)
  // Sign tx and return it
  return signingKey.signDigest(txDigest)
}

module.exports = {SignTX}