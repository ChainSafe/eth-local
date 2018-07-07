# ETH-LOCAL

#### NOTE: Currently only `./cli` is being developed. The `./web` dirrectory does not work yet.

`./cli` is the CLI as well as an express server that can be run optionally.

`./web` is a create-react-app and will serve as testing ground for the npm module that will interact with the express server in the CLI.

The purpose of ETH-LOCAL is to offer a standardized way to store your keystore files on your local machine. 

The core functionality of this application is the ability of the cli to safely transmit pre-signed tx to a website without the need of having metamask installed on the browser. The cli runs a simple HTTP server which allows the npm module to connect to it.

Features:
[x] Generate a wallet
[x] Encrypt a wallet
[x] Mnemonic support
[x] Proof of HTTP connection from client <-> cli made
[ ] Get balance
[ ] Transfer eth
