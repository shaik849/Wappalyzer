const checklistRouter = require('express').Router();
const {createCheacklist, updateChecklist, viewChecklist, deleteChecklist} = require('../Controller/checkListController')
const {createList, deleteList, updateList, displayList} = require('../Controller/listController')

checklistRouter.post('/checkList', createCheacklist)
checklistRouter.put('/checkList', updateChecklist)
checklistRouter.get('/checkList/view', viewChecklist)
checklistRouter.delete('/checkList', deleteChecklist)


//list

checklistRouter.post('/list', createList)
checklistRouter.get('/list/display', displayList)
checklistRouter.put('/list', updateList)
checklistRouter.delete('/list', deleteList)

//notes


module.exports = checklistRouter