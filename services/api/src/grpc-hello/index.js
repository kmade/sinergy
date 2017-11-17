const express = require('express')
const hello = require('./HelloClient')
const router = express.Router()

/**
* @swagger
* /:
*   get:
*     description: Returns the homepage
*     responses:
*       200:
*         description: hello world
*/

router.get('/', hello.index)

module.exports = router
