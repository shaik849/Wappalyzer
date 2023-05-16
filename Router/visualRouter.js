const visualRouter = require('express').Router();
const {getVisulasData}= require('../Controller/visualController')

visualRouter.get('/getvisulas/get/:id', getVisulasData) 

module.exports = visualRouter