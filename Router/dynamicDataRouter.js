const dynamicRouter = require('express').Router()
const {dynamicData, getDynamicHeaders, getHeaders} = require('../Controller/dynamicDataController')
const {getRowData, updateHeader, deleteHeader} = require('../Controller/dynamicController')
const {middleware} = require('../MiddleWare/authMiddleWare')

dynamicRouter.post('/dynamic/data',middleware, dynamicData) //save dyamic header

dynamicRouter.post('/dynamic/get',middleware ,getDynamicHeaders)
dynamicRouter.post('/row/hearders',middleware ,getHeaders)

//crud

dynamicRouter.get('/dynamicdata/row/get',middleware, getRowData)
dynamicRouter.put('/dynamicdata/row/update', middleware,updateHeader);
dynamicRouter.delete('/dynamicdata/row/delete',middleware ,deleteHeader);


module.exports = dynamicRouter