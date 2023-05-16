const mongoose = require('mongoose');
const {Schema} = mongoose;

const sitemapSchema = new Schema({
    url : {
        type : String,
    },
    size : {
        type: Number
    },
    sitemap: [{
        url: {
            type :String,
            required : true,
        },
        lastModified: {
            type : []
        },
        priority: {
            type : []
        },
        status: {
            type : String
        },
        type:{
         type : String
        },
        changefreq: {
            type : []
        },
    }]
}, {timestamps : true})

const sitemapModel = mongoose.model('sittemap', sitemapSchema);

module.exports = {sitemapModel}