const mongoose = require('mongoose')
const {Schema} = mongoose

const playbookItems = new Schema({
        task : {
            type : String,
            required : true
        }
})

const playbookSchema = new Schema({
    Name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        enum : ['Weekly','Monthly', 'Migration', 'Release'],
        required : true
    },
    Items : [playbookItems]
}, {timestamps : true})

const playbookModel = mongoose.model('playbook', playbookSchema)

module.exports = playbookModel