const path = require('path')
const caller = require('grpc-caller')

const { asyncMiddleware } = require('../lib/middlewares/async')
const root = path.join(__dirname, '../../protos')
const file = 'hello.proto'
// @todo replace with micro-hello service ENV
const client = caller('172.28.1.100:40000', { root, file }, 'Greeter')


/**
 *
 * @public
 * @todo Write @jsdoc annotations here
 */
exports.index = asyncMiddleware(async (req, res) => {

  const data = await client.sayHello({ id: '123' })
  res.io.emit('hello', data)
  res.json({
    message: data.name,
  })
})
