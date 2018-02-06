const express = require('express')
const helloController = require('./HelloController')
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

router.get('/', helloController.index)

module.exports = router
