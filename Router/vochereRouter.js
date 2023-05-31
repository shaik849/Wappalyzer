const vocherRouter = require('express').Router();

const {createCoupan, redeemCoupan} = require('../Controller/vochureCode')
const {middleware} = require('../MiddleWare/authMiddleWare')

vocherRouter.post("/vocher/coupan", createCoupan)
vocherRouter.post("/vocher/coupan/redeem",middleware, redeemCoupan)

module.exports = vocherRouter