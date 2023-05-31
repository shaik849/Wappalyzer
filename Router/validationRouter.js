const validationRouter = require('express').Router()
const {createUser, loginUser} = require('../Controller/validationController')

validationRouter.post('/user/create', createUser)
validationRouter.post('/user/login', loginUser)

module.exports = validationRouter
