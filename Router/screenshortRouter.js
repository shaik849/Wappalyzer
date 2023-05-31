const screenshortRouter = require('express').Router()

const {createScreenshort} = require('../Controller/screenshortController')

screenshortRouter.post('/screenshort/data', createScreenshort )

module.exports = screenshortRouter