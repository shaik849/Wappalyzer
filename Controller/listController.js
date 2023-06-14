const {listSchemaModel, checklistModel} = require('../Model/checkListModel')
const mongoose = require('mongoose')
const createList = async (req, res) => {
   try{
    const list = req.body.list
    const id = req.body.id
    let listArray = []
    // return res.status(200).json(list)
    if(!id){
        return res.status(400).json({status :"error", message :"id required"})
    }

    if(list.includes("") || list.includes(" ")){
        return res.status(400).json({status :"error", message : 'empty or blank list not accepted'})
    }

    const data = await listSchemaModel.findOne({checkId : id})
    if(!data){
     const result = new listSchemaModel({
        checkId: id,
        list : []
     })
     await result.save()
     for(let i = 0; i < list.length; i++){
          listArray.push({task : list[i]})
     }
    
     await listSchemaModel.updateOne(
        { _id: result._id },
        { $push: {
          list : listArray
        }
    }
      );

return res.status(200).json({status :"success", message : "list added successfully"})
}
for(let i = 0; i < list.length; i++){
    listArray.push({task : list[i]})
}

await listSchemaModel.updateOne(
  { _id: data._id },
  { $push: {
    list : listArray
  }
}
);

return res.status(200).json({status :"success", message : "list added successfully"})
}
   catch(err){
    console.log(err)
    return res.status(400).json({status: 'error', message: err.message})
   }
}

const updateList = async (req, res) => {
    try{
       const listId = req.body.listId
       const list = req.body.list
       if(!listId){
           return res.status(404).json({status :"error", message : "id is required"})
       }
       await listSchemaModel.updateOne(
        { 'list._id': listId },
        { $set: { 'list.$.task': list } }
      );
       return res.status(200).json({status : 'success', message : "list updated successfully"})
    }
    catch(err) {
        return res.status(400).json({status: 'error', message: err.message})
    }
}

const deleteList = async (req, res) => {
    try{
     const listId = req.body.id
      if(!listId) return res.status(400).json({status : "error", message : "id is required" })
      
      await listSchemaModel.updateOne(
        {},
        { $pull: { list: { _id: listId } } }
      );
  
      return res.status(200).json({status: 'success', message: "list deleted successfully"})
    }
    catch(err) {
        return res.status(400).json({status: 'error', message: err.message})
    }
}

const displayList = async (req, res) => {
    try{
     const id = req.body.id
     if(!id) return res.status(404).json({status : "error", message : "id is required"})

     const result = await listSchemaModel.findOne({_id : id})
     if(result){
        res.status(200).json({status: 'success', data : result})
     }
     return res.status(400).json({status : 'error', message : "data not found"})
    }
    catch(err) {
        return res.status(400).json({status: 'error', message: err.message})
    }
}














module.exports = {
    createList: createList,
    updateList: updateList,
    deleteList : deleteList,
    displayList : displayList
}