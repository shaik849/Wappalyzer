const mongoose = require('mongoose');
const {Schema} = mongoose;

const column = new Schema({
  name : {
    type : String,
    required : true,
  },
  fieldType : {
   type : String,
   enum : ['Textbox','URL','Email', 'Singleselect', 'Multiselect', 'Textarea', 'Checkbox', 'Datepicker' ],
   required : true,
  },
  websiteId : {
    type : String,
    required : true,
  },
  options : [{
    label : {
      type : String,
    },
    value : {
      type : String,
    }
  }]
}, {timestamps: true})




const dynamicModel = mongoose.model('dynamicData', column);

module.exports = dynamicModel;