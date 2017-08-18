const express = require('express')
const info = require('../package.json')
const app = express()

// modules
app.use('/hello', require('./rest-hello'))

app.use('/info', (req, res, next) => {
  res.json({ info });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    error,
  });
})

app.get('*', (req, res, next) => {
  res.status(404);
  res.json({
    message: 'Not found',
    error: new Error('E_NOT_FOUND').toString(),
   })
});

module.exports = app
