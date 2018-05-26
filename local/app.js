const express = require('express')
const app = express()
const PORT = 3210;

// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/req', (req, res) => console.log('Received request'));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
