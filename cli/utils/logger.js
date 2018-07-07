const debug = (...msgs) => {
  if(process.env.DEBUG === 'true'){
    msgs.forEach((msg) => console.log(msg))
  }
}

const log = (...msgs) => {
  msgs.forEach((msg) => console.log(msg))
}

module.exports = {log, debug}

