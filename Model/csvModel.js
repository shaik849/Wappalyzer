const mongoose = require('mongoose');
const { Schema } = mongoose

const csvSchema = new Schema({
    csvData : [{
        url: {
         type : String
        },
        lastModifiedDate: {
            type : String
           },
        priority: {
            type : Number
           },
        changeFrequency: {
            type : String
           }
    }]
}, {timestamps : true})

const csvModel = mongoose.model('CSV', csvSchema);

module.exports = {csvModel}