const playbookRouter = require('express').Router()
const {createPlaybook, viewPlaybook, updatePlaybook, deletePlaybook} = require('../Controller/playbookController')
const {createItems, updateItems,  deleteItems, importPlaybookItems} = require('../Controller/playbookItemController')

playbookRouter.get('/playbook/view', viewPlaybook)
playbookRouter.post('/playbook', createPlaybook)
playbookRouter.put('/playbook', updatePlaybook)
playbookRouter.delete('/playbook', deletePlaybook)


//items

playbookRouter.put('/items/add', createItems)
playbookRouter.put('/items/update', updateItems)
playbookRouter.put('/items/delete', deleteItems)


//import

playbookRouter.post('/items/import', importPlaybookItems)
module.exports = playbookRouter