const screenshortRouter = require('express').Router()

const {createScreenshot, createScreenshost, screenshot} = require('../Controller/screenshortController')

screenshortRouter.post('/screenshort/data', createScreenshot )
screenshortRouter.post('/screenshort/data/play', createScreenshost )
screenshortRouter.post('/screenshort/shot', screenshot )

module.exports = screenshortRouter