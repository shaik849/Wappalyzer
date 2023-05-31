const mongoose = require('mongoose');
const {Schema} = mongoose

const row = new Schema({
    headerId : {
         type : String
    },
    websiteId : {
        type : String
    },
    value : {
        type: mongoose.Schema.Types.Mixed,
             default: {}
    },

},{ minimize: false, timestamps: true})

const rowmodel = mongoose.model('dynamicRow', row )

module.exports = rowmodel
