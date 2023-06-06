const screenshortRouter = require('express').Router()

const {screenshot} = require('../Controller/screenshortController')

screenshortRouter.post('/screenshort/shot', screenshot )

module.exports = screenshortRouter