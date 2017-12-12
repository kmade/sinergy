#!/usr/bin/env node

require('dotenv').config()
const http = require('http')
const { app, server } = require('..')

app.set('port', process.env.PORT)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(process.env.PORT, () => console.log(`Api running at ${process.env.VIRTUAL_HOST}:${process.env.PORT}`))
