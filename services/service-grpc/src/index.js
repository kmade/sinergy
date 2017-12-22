require('dotenv').config()

const path = require('path')
const Mali = require('mali')
const grpc = require('grpc')
const fs = require('fs')
const servicebus = require('servicebus')

const HOST = `0.0.0.0`;
const PROTO_PATH = path.resolve(__dirname, '../protos/hello.proto')
const app = new Mali(PROTO_PATH, 'Greeter')

const cacert = fs.readFileSync(path.resolve(__dirname, '../ssl/ca.crt'))
const cert = fs.readFileSync(path.resolve(__dirname, '../ssl/server.crt'))
const key = fs.readFileSync(path.resolve(__dirname, '../ssl/server.key'))
const kvpair = {
  'private_key': key,
  'cert_chain': cert,
}
const credentials = grpc.ServerCredentials.createSsl(cacert, [kvpair])

const bus = servicebus.bus({
  url: process.env.BUS_URL,
})

/**
 * Implements the SayHello RPC method.
 */
function sayHello (ctx) {

  // const id = ctx.req.id //get the id from request
  const name = 'Sinergy';
  bus.publish('hello', {
    message: `Publish from Service-gRPC ${name}`
  })

  ctx.res = { name }
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main () {

  const app = new Mali(PROTO_PATH, 'Greeter')
  app.use({ sayHello })
  app.start(HOST)
  console.log(`Greeter service running: ${HOST}`)
}

main()

