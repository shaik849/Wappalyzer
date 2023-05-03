const sitemapRouter = require('express').Router()

const {getSitemap, findSitemapUsingUrls} = require('../Controller/sitemap')



sitemapRouter.get("/sitemap/value", getSitemap)

sitemapRouter.get("/sitemap/get/finals", findSitemapUsingUrls)



module.exports = sitemapRouter