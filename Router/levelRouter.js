const levelRouter = require('express').Router()
const {getLevels} = require('../Controller/levelController')

levelRouter.get('/get/getlevel/:id', getLevels);

module.exports = levelRouter