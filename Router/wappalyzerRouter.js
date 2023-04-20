const router = require('express').Router();
const {getTechnologies} = require('../Controller/wappalyzerController')


router.get('/data', getTechnologies)

module.exports = router