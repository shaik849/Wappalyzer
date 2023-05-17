const mongoose = require('mongoose');

const {Schema} = mongoose;

const pageauditSchma = new Schema({
    url : {
        type : String,
    },
    mobile : {
        performence: {
            type : Number,
        },
        accessibility: {
            type : Number,
        },
        Bestpractices: {
            type : Number,
        },
        seo: {
            type : Number,
        },
        pwa: {
            type : Number,
        }
    },
    desktop : {
        performence: {
            type : Number,
        },
        accessibility: {
            type : Number,
        },
        Bestpractices: {
            type : Number,
        },
        seo: {
            type : Number,
        },
        pwa: {
            type : Number,
        }
    }
}, {timestamp: true})

const pageAuditModel = mongoose.model('PageAuditModel', pageauditSchma)

module.exports = pageAuditModel