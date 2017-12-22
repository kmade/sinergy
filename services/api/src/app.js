const express = require('express')
const servicebus = require('servicebus')
const info  = require('../package.json')
const HelloREST = require('./rest-hello')
const HelloGRPC = require('./grpc-hello')
const httpProxy = require('express-http-proxy')
const app = express()


const server = require('http').Server(app)
const io = require('socket.io')(server, {
  path: '/io',
  transports: ['websocket'],
})

const bus = servicebus.bus({
  url: process.env.BUS_URL,
})

bus.subscribe('hello', event => console.log('Service Bus', event))
io.on('connection', socket => console.log('Client connected'))


app.use((req, res, next) => {
  res.io = io;
  return next() //here will ensure that app.use will return whatever the next callback returns.
})

// modules
app.use('/hello-rest', HelloREST)
app.use('/hello-grpc', HelloGRPC)

// Proxy request
app.use('/service-http', httpProxy('http://service-http'))


app.use('/status', (req, res) => {
  res.json(Object.assign({
    status: 'OK'
  }, info, {
    node: process.versions
  }))
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    message: error.message || 'An unknown error occurred',
    error,
  })
  return next()
})

app.get('*', (req, res) => {
  res.status(404)
  res.json({
    message: 'Not found',
    error: new Error('E_NOT_FOUND').toString(),
  })
})

module.exports = { app, server }
