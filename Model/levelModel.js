const mongoose = require('mongoose');

const {Schema} = mongoose;

const levelSchema = new Schema({
    url : {
     type :String
    },
    levels : [{
        Level1 : {
            type : String,
        },
        Level2 : {
            type : String,
        },
        Level3 : {
            type : String,
        },
        Level4 : {
            type : String,
        },
        Level5 : {
            type : String,
        },
    }]
}, {timestamps : true})

const levelModel = mongoose.model('Levels', levelSchema);

module.exports = {levelModel}