const managedRouter = require('express').Router()
const {createManageData, getManageData} = require('../Controller/manageController')

managedRouter.post('/', createManageData)
managedRouter.get('/:id', getManageData)

module.exports = managedRouter