# eth-local

#### NOTE: This project is still in development, not all components are functional.

The purpose of eth-local is to offer a standardized way to store your keystore files on your local machine. 

The core functionality of this application is the ability of the cli to safely transmit pre-signed tx to a website without the need of having Metamask installed on the browser. The cli runs a simple HTTP server which allows the npm module to connect to it.



![Alt Text](https://imgur.com/yPDD97F.png)


`./cli` is the CLI as well as an express server that can be run optionally.

`./web` is a create-react-app and will serve as testing ground for the npm module that will interact with the express server in the CLI.

`./client` is intended to be a daemon (currently just a node app) that initiates an electron app to prompt the user for their password. 

## Running

1. Start the cli by running `cd cli && npm i && node app.js`. You will prompted with all availible options. In necessary initiate keystore and create a key pair.

2. Start the dev web app server by running `cd web && npm i && npm start`.

3. Following the instructions in the dev web app will initiate the elctron prompt.


## Features

- [x] Generate a wallet
- [x] Encrypt a wallet
- [x] Mnemonic support
- [x] Proof of HTTP connection from client <-> cli made
- [ ] Get balance
- [ ] Transfer eth
- [ ] Electron prompt
- [ ] Transaction signing

## Details

### Cli
- Uses the spawn() library to launch electron prompt (see `cli/utils/spawn.js`)
- stdin/out are supposed to provide data to and from the electron prompt (WIP)

### Client

- `/ui` is the UI for the electron app, standard create-react-app
- `/app` is the deployable part, which includes a production build of `ui/` (TODO: Setup linkage or change structure so we don't have to copy build from `ui/`.
- `app/main.js` is the electron app. This is where you can configure it.
- Launching the electron app on its own may be troublesome, you must run it with electron (eg. `electron main.js`)


### Web
- This is just a front end for testing purposes



Interested in lending a hand? Reach out to `david at chainsafe dot io`:)
