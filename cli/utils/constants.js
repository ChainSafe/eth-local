// Require the users home directory
const HOME_DIR = require('os').homedir();
const ETH_HOME = '.eth-local';
const FULL_PATH = require('path').join(HOME_DIR, ETH_HOME);

module.exports = { HOME_DIR, ETH_HOME, FULL_PATH };