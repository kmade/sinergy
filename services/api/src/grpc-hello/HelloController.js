const { asyncMiddleware } = require('../lib/middlewares/async')
const model = require('./HelloModel')
const fs = require('fs')
const path = require('path')
const grpc = require('grpc')
const PROTO_PATH = path.resolve(__dirname, '../../protos/hello.proto')
const proto = grpc.load(PROTO_PATH).hello

// const credentials = grpc.credentials.createSsl(
//   fs.readFileSync(path.resolve(__dirname, '../../ssl/ca.crt')),
//   fs.readFileSync(path.resolve(__dirname, '../../ssl/client.key')),
//   fs.readFileSync(path.resolve(__dirname, '../../ssl/client.crt'))
// )

const credentials = grpc.credentials.createInsecure()
/**
 *
 * @public
 * @todo Write @jsdoc annotations here
 */
exports.index = asyncMiddleware(async (req, res) => {

  const client = new proto.Greeter('172.28.1.100:40000', credentials);

  let user;
  if (process.argv.length >= 3) {
    user = process.argv[2]
  } else {
    user = 'Dragosh'
  }
  client.sayHello({ name: user }, function(err, response) {

    res.json({ message: response.message });
  })
})
