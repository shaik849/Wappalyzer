const sitemapRouter = require('express').Router()
const {getSitemap, getSitemapUsingUrl, getSitemapUsingUr} = require('../Controller/sitemap')
const {getSitemapUsingUrls} = require('../Controller/trails')


sitemapRouter.get("/sitemap/value", getSitemap)
sitemapRouter.get("/sitemap/get", getSitemapUsingUrl)
sitemapRouter.get("/sitemap/get/final", getSitemapUsingUr)
sitemapRouter.get("/sitemap/get/fina", getSitemapUsingUrls)



module.exports = sitemapRouter