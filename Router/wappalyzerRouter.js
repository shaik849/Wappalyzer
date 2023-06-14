const router = require('express').Router();
const {postTechnoligies, getTechnologiesById} = require('../Controller/wappalyzerControler')

router.get('/id/:id', getTechnologiesById)
router.post('/tech',postTechnoligies )

module.exports = router