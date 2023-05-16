const pageauditRouter = require('express').Router();
const {pageAudit, getLighthouseDetails} = require('../Controller/pageAudit')
// pageauditRouter.get('/page/pageAudit', pageAudit);
pageauditRouter.get('/page/pageAudit/one', getLighthouseDetails);

module.exports = pageauditRouter
