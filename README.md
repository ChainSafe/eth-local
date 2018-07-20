# eth-local

#### NOTE: This project is still in development, not all components are functional.

The purpose of eth-local is to offer a standardized way to store your keystore files on your local machine. 

The core functionality of this application is the ability of the cli to safely transmit pre-signed tx to a website without the need of having Metamask installed on the browser. The cli runs a simple HTTP server which allows the npm module to connect to it.


`./cli` is the CLI as well as an express server that can be run optionally.

`./web` is a create-react-app and will serve as testing ground for the npm module that will interact with the express server in the CLI.

`./client` is intended to be a daemon (currently just a node app) that initiates an electron app to prompt the user for their password. 

Features:

- [x] Generate a wallet
- [x] Encrypt a wallet
- [x] Mnemonic support
- [x] Proof of HTTP connection from client <-> cli made
- [ ] Get balance
- [ ] Transfer eth
- [ ] Electron prompt
- [ ] Transaction signing

Interested in lending a hand? Reach out to `david at chainsafe dot io`:)
