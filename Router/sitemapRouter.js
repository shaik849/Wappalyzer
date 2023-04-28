const sitemapRouter = require('express').Router()
const {getSitemap} = require('../Controller/sitemap')


sitemapRouter.get("/sitemap/value", getSitemap)


module.exports = sitemapRouter