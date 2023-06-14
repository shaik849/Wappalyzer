const playbookModel = require('../Model/playbookModel')

const createPlaybook = async (req, res) =>{
    try{
        const name = req.body.name
        const type = req.body.type
        if(!name) return res.status(400).json({status : 'error', message : 'name is required'})
        if(!type) return res.status(400).json({status : 'error', message : 'type is required'})
        if(name == ' ' || name == ''|| type == '' || type == '') return res.status(400).json({status : 'error', message : 'Blank or empty not allowed'})

        const result = new playbookModel({
         Name : name,
         type : type,
        })
        await result.save();
        return res.status(200).json({status : 'success', message : 'playbook created successfully'})
    }
    catch(err){
        return res.status(400).json({status : 'error', message : err.message})
    }
}

const updatePlaybook = async (req, res) => {
    try {
      const id = req.body.id
      if(!id) return res.status(400).json({status : 'error', message : 'id is required'})
      const name = req.body.name
        const type = req.body.type
        if(!name) return res.status(400).json({status : 'error', message : 'name is required'})
        if(!type) return res.status(400).json({status : 'error', message : 'type is required'})
        if(name == ' ' || name == ''|| type == '' || type == '') return res.status(400).json({status : 'error', message : 'Blank or empty not allowed'})
      
        const result = await playbookModel.findByIdAndUpdate({_id : id},{
            $set : {
                Name : name,
                type : type
            }
        })
        if(result){
        return res.status(200).json({status : 'success', message : 'playbook updated successfully'})
        }
        return res.status(400).json({status : 'error', message : 'error during update'})

    }
    catch(err) {
        return res.status(400).json({status : 'error', message : err.message})
    }
}

const deletePlaybook = async (req, res) => {
    try{
        const id = req.body.id
        if(!id) return res.status(400).json({status : 'error', message : 'id is required'})

       const result = await playbookModel.findByIdAndDelete({_id : id})
       if(result){
        return res.status(200).json({status : 'success', message : 'playbook deleted successfully'})
       }
       return res.status(404).json({status : 'error', message : 'error during delete'})
    }
    catch(err) {
        return res.status(400).json({status : 'error', message : err.message})
    }
}

const viewPlaybook = async (req, res) => {
    try {
        const data = await playbookModel.find({})
        if(data){
            return res.status(200).json({status : 'success', data : data})
        }
        return res.status(400).json({status : 'error', message : 'Not Found'})
    }
    catch(err) {
        return res.status(400).json({status : 'error', message : err.message})
    }
}

module.exports = {
    viewPlaybook: viewPlaybook,
    createPlaybook: createPlaybook,
    updatePlaybook: updatePlaybook,
    deletePlaybook: deletePlaybook
}