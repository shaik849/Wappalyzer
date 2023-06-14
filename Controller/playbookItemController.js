const playbookModel = require('../Model/playbookModel')
const {checklistModel, listSchemaModel} = require('../Model/checkListModel')

const createItems = async (req, res) => {
    try{
       const id = req.body.id
      const items = req.body.items
      if(!items || !id) return res.status(400).json({status : 'error', message : 'data required'})
      if(items.includes("") || items.includes(" ")){
        return res.status(400).json({status :"error", message : 'empty or blank list not accepted'})
    }
      const itemsArray = []

      for(let i = 0; i < items.length; i++){
        itemsArray.push({task : items[i]})
      }

      const data = await playbookModel.findByIdAndUpdate({_id : id}, {
        $push : {
            Items : itemsArray
        }
      })
      if(data){
        return res.status(200).json({status : 'success', message : 'Items added successfully'})
    }
    return res.status(400).json({status : 'error', message :'error when adding items'})
    }
    catch(err){
        return res.status(400).json({status : 'error', message : err.message});
    }
}

const updateItems = async (req, res) => {
    try{
       const id = req.body.id
      const item = req.body.item
      if(!item || !id) return res.status(400).json({status : 'error', message : 'data required'})
      if(item == ''|| item ==" "){
        return res.status(400).json({status :"error", message : 'empty or blank list not accepted'})
    }

      const data = await playbookModel.updateOne({'Items._id' : id}, {
        $set : {
        'Items.$.task' : item
        }
      })
      if(data){
        return res.status(200).json({status : 'success', message : 'Items added successfully'})
    }
    return res.status(400).json({status : 'error', message :'error when adding items'})
    }
    catch(err){
        return res.status(400).json({status : 'error', message : err.message});
    }
}

const deleteItems = async (req, res) => {
    try{
     const id = req.body.id
     if(!id) return res.status(404).json({status :'error', message : 'Id required'})

     const result = await playbookModel.updateOne(
        {},
        { $pull: { Items: { _id: id } } }
      );
      if(result){
        return res.status(200).json({status : 'success', message : 'Items deleted successfully'})
      }
      return res.status(400).json({status : 'error', message : 'error occred during delete'})
    }
    catch(err){
        return res.status(400).json({status : 'error', message : err.message});
    }
}

const importPlaybookItems = async (req, res) => {
    try{
        const playbookId = req.body.playbookId
        const checklistId = req.body.checklistId
        if(!playbookId) return res.status(400).json({status : 'error', message : 'Id required'})
        const playbookData = await playbookModel.findOne({_id : playbookId})
        const listData = await listSchemaModel.findOne({checkId : checklistId})
        const checklistData = await checklistModel.findOne({_id : checklistId})
        if(!playbookData || !listData || !checklistData ){
            return res.status(400).json({status : 'error', message: 'data not found'})
        }
        if(playbookData.type === checklistData.type){
        const listItem = playbookData.Items
        const listArray = []
        for(let i=0;i<listItem.length;i++){
           listArray.push({task :listItem[i].task})
        }
        const result = await listSchemaModel.updateOne({checkId : checklistId},{
             $push: {
                list : listArray
              }
        })
        if(result){
            return res.status(200).json({status : 'success', message : 'impoted successfully'})
        }
        return res.status(400).json({status : 'error', message : 'error occurred during import'})
    }
    return res.status(400).json({status : 'error', message:"type error"})
}
    catch(err){
        return res.status(400).json({status : 'error', message : err.message});
    }
}


module.exports = {
    createItems : createItems,
    updateItems : updateItems,
    deleteItems : deleteItems,
    importPlaybookItems : importPlaybookItems
}