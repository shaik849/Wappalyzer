const router = require('express').Router();
const {getTechnologies, sendTechnologies} = require('../Controller/wappalyzerController')


router.get('/data', getTechnologies)
router.post('/model', sendTechnologies)

module.exports = router