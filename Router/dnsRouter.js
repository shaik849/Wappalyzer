const dnsRouter = require('express').Router()
const {getDnsDetails, getDnsById} = require('../Controller/dnsController')
dnsRouter.get('/dns', getDnsDetails )
dnsRouter.get('/data/:id', getDnsById )

module.exports = dnsRouter