require('dotenv').config()

const micro = require('micro')
const sleep = require('then-sleep')
const servicebus = require('servicebus')

const info  = require('../package.json')
const bus = servicebus.bus({
  url: process.env.BUS_URL,
})

micro(async (req, res) => {
  bus.publish('hello', {
    message: `Publish from Service-HTTP ${info.name}`
  })
  await sleep(100)
  micro.send(res, 200, info)
}).listen(80)