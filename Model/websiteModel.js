const mongoose = require('mongoose')
const {Schema} = mongoose;

const websiteSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    }
}, {timestamps : true});

const websiteModel = mongoose.model('website', websiteSchema);


module.exports = websiteModel;