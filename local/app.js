const express = require('express')
const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const app = express();
const PORT = 3210;

// Require the users home directory
const HOME_DIR = require('os').homedir();
const ETH_HOME = '.eth-ssh';
const FULL_PATH = path.join(HOME_DIR, ETH_HOME);

const promptSchema = {
  properties: {
    input: {
      message: `Create directory ${ETH_HOME} in ${HOME_DIR}? (Y/n)`
    }
  }
}

console.log(`\nChecking if ${ETH_HOME} exists in ${HOME_DIR}...`) 
if (!fs.existsSync(FULL_PATH)) {
  prompt.start();
  prompt.get(promptSchema, (err, res) => {
    if (res.input == 'y') {
      console.log(`Creating directory...`);
      try {
        fs.mkdir(FULL_PATH);
        console.log('Succesfully created directory');
      } catch (e) {
        console.log('Error creating directory, exiting...');
        console.log(e);
        process.exit(1);  
      }  
    } else if (res.input == 'n') {

    } else {
      console.log(`${res.input} is an invalid input.`);
      console.log('Exiting...');
      process.exit(1);
    }
  });
} else {
  console.log(`${ETH_HOME} found in ${HOME_DIR}!`)
}

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

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
