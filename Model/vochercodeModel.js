const mongoose = require('mongoose')

const {Schema} = mongoose

const vocherSchema = new Schema({
    userId : {
        type : mongoose.Types.ObjectId
    },
    coupan : {
        type : String,
        required : true
    },
    useStatus : {
        type : Boolean,
        default : false,
        required : true
    }
}, {timestamps : true})

const userCountSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    count :{
        type : Number,
        default : 0,
        required : true
    }
}, {timestamps : true})

const vocherModel = mongoose.model('coupans', vocherSchema)
const countModel = mongoose.model('count', userCountSchema)

module.exports = {vocherModel, countModel}
