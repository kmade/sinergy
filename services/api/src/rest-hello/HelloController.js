const { asyncMiddleware } = require('../lib/middlewares/async')
const model = require('./HelloModel').create()

const bus = require('servicebus').bus({
  url: process.env.RABBITMQ_URL,
  vhost: process.env.RABBITMQ_VHOST,
})

bus.subscribe('hello', event => console.log('EventBus', event))
/**
 *
 * @public
 * @todo Write @jsdoc annotations here
 */
exports.index = asyncMiddleware(async (req, res) => {
  const data = await model.getByID('f5bc03fcbb99bba517c7f82f6f0015a6')

  res.json({
    message: data.name
  })
})
