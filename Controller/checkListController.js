const {checklistModel, listSchemaModel} = require('../Model/checkListModel')
const joi = require("joi");

function validateDate(dateString) {
    // Regular expression pattern for MM-DD-YYYY format
    var pattern = /^\d{2}-\d{2}-\d{4}$/;
    
    // Check if the date string matches the pattern
    if (pattern.test(dateString)) {
      // Extract month, day, and year from the date string
      var parts = dateString.split('-');
      var month = parseInt(parts[0], 10);
      var day = parseInt(parts[1], 10);
      var year = parseInt(parts[2], 10);
      
      // Check if the parsed values form a valid date
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1000 && year <= 9999) {
        return true; // Valid date
      }
    }
    
    return false; // Invalid date
  }
  const authSchema = joi.object({
    Name: joi.string().required(),
    StartDate: joi.string().required(),
    EndDate : joi.string().required(),
    Status : joi.string().required(),
    Priority : joi.string().required(),
    type : joi.string()
  });

const createCheacklist = async (req, res) =>{
    try{
      const data = req.body;
      if(!data ){
        return res.status(400).json({status : 'error', message : 'Data Required'});
      }
      else{
      const validData = await authSchema.validateAsync(req.body)
     
      
 
      var startDate = validateDate(validData.StartDate)
      var endDate = validateDate(validData.EndDate)
      if(validData.Name === " "){
        return res.status(400).json({status : 'error', message : "Blanck space not allowed"})
      }
       if(validData.StartDate > validData.EndDate){
        return res.status(400).json({status : 'error', message : "End date can't be before start date"})
       }
       const result = new checklistModel({
        Name : validData.Name,
        StartDate : startDate ? validData.StartDate : null,
        EndDate : endDate ? validData.EndDate : null,
        Priority : validData.Priority,
        Status : validData.Status,
        type : validData.type
       })
      await result.save();
     return res.status(200).json({status : 'success', message : 'Checklist created successfully'});
    }
}
catch(err){
    console.log(err)
 return res.status(400).json({status : 'error', message : err.message})
}
}

const updateChecklist = async (req, res) => {
try{
  const id = req.body.id;
  const name = req.body.Name;
  const StartDate = req.body.StartDate
  const EndDate = req.body.EndDate
  const Priority = req.body.Priority
  const Status = req.body.Status
  var startDate = validateDate(StartDate)
  var endDate = validateDate(EndDate)
  if(!id) return res.status(404).json({status : 'error', message : 'id not found'});

  if(StartDate > EndDate){
    return res.status(400).json({status : 'error', message : "End date can't be before start date"})
   }
   if(name == " " || name == ""){
    return res.status(400).json({status : 'error', message : 'Blank space not allowed'});
  }

   if(!startDate  && !endDate) return res.status(400).json({status : 'success', message : 'check the date format'})
   await checklistModel.findByIdAndUpdate({_id : id}, {
    $set : {
        Name : name,
        StartDate : StartDate, 
        EndDate : EndDate, 
        Priority : Priority,
        Status : Status,
    }
})
return res.status(200).json({status : 'success', message : "checklist updated successfully"})
}
catch(err){
    return res.status(400).json({status : 'error', message : err.message});
}
}

const viewChecklist = async (req, res) => {
    try {
      const id = req.body.id;
      if (!id) return res.status(400).json({ status: 'error', message: 'Id required' });
      
      const result = await checklistModel.findById({_id : id});
      
      if (result) return res.status(200).json({ status: 'success', data: result });
      
        return res.status(400).json({ status: 'error', message: 'Data not found' });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };

  const deleteChecklist = async (req, res) => {
    try {
      const id = req.body.id;
      const listId = req.body.listId;
      if (!id || listId) return res.status(400).json({ status: 'error', message: 'Id required' });
      
       await checklistModel.findByIdAndDelete({_id : id});
       await listSchemaModel.findOneAndDelete({id : id})

      return res.status(200).json({ status: 'success', message : "checklist deleted successfully" });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };
  

module.exports = {
    createCheacklist : createCheacklist,
    updateChecklist : updateChecklist,
    viewChecklist : viewChecklist,
    deleteChecklist : deleteChecklist
}