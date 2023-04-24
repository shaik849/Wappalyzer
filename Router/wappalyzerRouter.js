const router = require('express').Router();
const {getTechnologie, getTechnologiesById} = require('../Controller/wappalyzerControler')

router.get('/', getTechnologie)
router.get('/id/:id', getTechnologiesById)

module.exports = router