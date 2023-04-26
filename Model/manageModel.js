const mongoose = require('mongoose')

const {Schema} = mongoose

const manageSchema = new Schema({
    Title : {
        type : String,
        required : true
    },
    Logo : {
        type: String,
    },
    ProviderName : {
        type : String,
        required : true
    },
    ProviderUrl : {
        type : String,
        required : true
    },
    ExpiryDate : {
        type: String,
        required : true
    },
    ManagedBy : {
        type: String,
        enum : ['Internal Team','External Team'],
        default : 'Internal Team',
        required : true
    }
}, {timeseries: true})

const manageModel = mongoose.model('ManagedBy', manageSchema)

module.exports = {manageModel}