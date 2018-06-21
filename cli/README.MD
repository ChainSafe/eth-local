# CLI

#### Setup
- `npm install`

#### How To Use
- `./app.js <arg>`

Note: executing `./app.js` will output a helper of all available commands.

#### Available Arguments:

1. `setup` - Creates a directory in the users home directory where private keys will be stored.

2. `wallet` - Prompts user for a list of wallet related options.

3. `start` - Starts an express server to allow communication with a browser.


TODO:
- [x] Use a cli package
- [] Add wallet decryption
- [] Add ability to check balance
- [] Add ability to send pre-signed tx
