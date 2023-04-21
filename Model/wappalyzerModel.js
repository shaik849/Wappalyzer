const mongoose = require('mongoose');
const { Schema } = mongoose;

const allDetails = new Schema({
 categorieName : {
    type: String
 },
 technologies : [{
    name : {
        type: String
    },
    logo : {
        type: String
    }
 }]
})

const wappalyzerSchema = new Schema({
    url : {
        type : String,
    },
    categorie : [allDetails]
    
}, {timestamps : true})

const wappalyzerModel = mongoose.model('technologies', wappalyzerSchema);

module.exports = {wappalyzerModel}