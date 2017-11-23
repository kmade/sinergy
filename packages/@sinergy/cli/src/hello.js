const shell = require('shelljs')
const log = require('./lib/logger')
module.exports = (name = 'Guest') => {
  let cmd = `say 'Hey ${name}!'`
  log(`Execute command: "${cmd}"`)
  shell.exec(cmd).code
  return 'Done!'
}
