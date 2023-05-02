const sitemapRouter = require('express').Router()
const {getSitemap, getSitemapUsingUrl} = require('../Controller/sitemap')


sitemapRouter.get("/sitemap/value", getSitemap)
sitemapRouter.get("/sitemap/get", getSitemapUsingUrl)



module.exports = sitemapRouter