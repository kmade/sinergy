#!/usr/bin/env node

require('dotenv').config()
const { app, server } = require('..')

const HOST = `${process.env.API_VHOST}:${process.env.API_VPORT}`
server.listen(process.env.API_VPORT, () =>
    console.log(`Server running at ${HOST}`))
