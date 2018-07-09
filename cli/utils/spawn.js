const fs = require('fs')

const { spawn } = require('child_process', {
  stdio: [
    'pipe', // Use parent's stdin for child
    'pipe', // Pipe child's stdout to parent
    fs.openSync('err.out', 'w') // Direct child's stderr to a file
  ]
});

// Open app and pass params
const start = (params) => {
  new Promise((resolve, reject) => {
    const child = spawn('../client/app/node_modules/electron/dist/electron', ['../client/app', 'david']);

    child.stdout.on('data', (data) => {
      console.log(data.toString());
      resolve(data.toString())
    });
  })
}

module.exports = {start}
