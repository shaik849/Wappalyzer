const pageauditRouter = require('express').Router();
const { getLighthouseDetail} = require('../Controller/pageAudit')
// pageauditRouter.get('/page/pageAudit', pageAudit);
pageauditRouter.post('/page/pageAudit', getLighthouseDetail);


module.exports = pageauditRouter
