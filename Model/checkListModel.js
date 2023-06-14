const mongoose = require('mongoose');
const {Schema} = mongoose;

const checklistSchema = new Schema({
    Name : {
        type : String,
        required : true
    },
    StartDate : {
        type : String,
        required : true
    },
    EndDate : {
        type : String,
        required : true
    },
    Status : {
        type : String,
        enum : ['Inprogress', 'Completed', 'Closed'],
        required : true
    },
    Priority :{
     type : String,
     enum : ['Low','Medium', 'High'],
     required : true

    },
    type : {
        type : String,
        enum : ['Weekly','Monthly', 'Migration', 'Release'],
        required : true
    }
}, {timestamps : true})

const listSchema = new Schema({
    checkId : {
      type : String,
      required : true
    },
    list : [{
       task : {
        type : String,
        required : true
       }
    }]
}, {timestamps : true})

const checklistModel = mongoose.model('checklist', checklistSchema)
const listSchemaModel = mongoose.model('list', listSchema)


module.exports = {checklistModel, listSchemaModel};