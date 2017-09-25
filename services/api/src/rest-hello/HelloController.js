const { asyncMiddleware } = require('../lib/middlewares/async')
const model = require('./HelloModel').create()

/**
 *
 * @public
 * @todo Write @jsdoc annotations here
 */
exports.index = asyncMiddleware(async (req, res) => {
  const data = await model.getByID('f5bc03fcbb99bba517c7f82f6f0015a6')
  res.json({
    message : data.name
  })
})
