const ethers = require('ethers')
//const inquirer = require('inquirer')
const fs = require('fs')
const {log, debug} = require('./logger')
const { HOME_DIR, ETH_HOME, FULL_PATH } = require('./constants');


SignTX = async (tx, walletAddress, password) => {
  // Update wallet list
  let wallets = getWallets()
  debug('Loading key from: ', wallets[walletAddress])
  let keyStore = JSON.parse(fs.readFileSync(wallets[walletAddress]))
  debug('KeyStore: ', keyStore)
  let privateKey = await ethers.Wallet.fromEncryptedWallet(keyStore, password)
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