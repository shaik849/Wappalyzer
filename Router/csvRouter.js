const csvRouter = require('express').Router()
const {getCsv} = require('../Controller/csvController')

csvRouter.post('/getcns/get', getCsv)

module.exports = csvRouter
