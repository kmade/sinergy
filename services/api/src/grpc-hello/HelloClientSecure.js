/**
 * Doesn't work using IP address ATM,
 * need to use DNS names in order to make it work
 */

// const caller = require('grpc-caller')
// const fs = require('fs')
// const PROTO_PATH = path.resolve(__dirname, '../../protos/hello.proto')
// const proto = grpc.load(PROTO_PATH).hello

// const credentials = grpc.credentials.createSsl(
//   fs.readFileSync(path.resolve(__dirname, '../../ssl/ca.crt')),
//   fs.readFileSync(path.resolve(__dirname, '../../ssl/client.key')),
//   fs.readFileSync(path.resolve(__dirname, '../../ssl/client.crt'))
// )
// const client = new proto.Greeter('172.28.1.100:40000', credentials)