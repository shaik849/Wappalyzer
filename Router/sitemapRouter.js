const sitemapRouter = require('express').Router()
const {getSitemaps} = require('../Controller/sitemap')


sitemapRouter.get("/sitemap/value", getSitemaps)

module.exports = sitemapRouter