const express = require('express');
const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const app = express();
const PORT = 3210;

// Relative imports
const Setup = require('./utils/setup');
const Wallet = require('./utils/wallet');

// Always run to ensure the environment is correctly setup.
Setup();

switch (process.argv[2]) {
  case 'new':

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
