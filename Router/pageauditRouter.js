const pageauditRouter = require('express').Router();
const { getLighthouseMobileDetail, getLighthouseDesktopDetail} = require('../Controller/pageAudit')
// pageauditRouter.get('/page/pageAudit', pageAudit);
pageauditRouter.post('/page/pageAudit/mobile', getLighthouseMobileDetail);
pageauditRouter.post('/page/pageAudit/desktop', getLighthouseDesktopDetail);

module.exports = pageauditRouter
