const express = require('express')
const info = require('../package.json')
const app = express()

// modules
app.use('/hello', require('./rest-hello'))

app.use('/info', (req, res) => {
  res.json(Object.assign(info, {
    node: process.versions
  }))
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    message: error.message,
    error,
  })
  next()
})

app.get('*', (req, res) => {
  res.status(404)
  res.json({
    message: 'Not found',
    error: new Error('E_NOT_FOUND').toString(),
  })
})

module.exports = app
