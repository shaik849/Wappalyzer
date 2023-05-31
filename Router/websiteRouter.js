const websiteRouter = require('express').Router();
const {postWebsite, getWebsite} = require('../Controller/websiteController')
const {middleware} = require('../MiddleWare/authMiddleWare')

websiteRouter.post("/user/url", middleware, postWebsite)
websiteRouter.get("/user/url", middleware, getWebsite)

module.exports = websiteRouter
