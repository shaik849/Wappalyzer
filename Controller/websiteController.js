const websiteModel = require('../Model/websiteModel')

const postWebsite = async (req, res) => {
    try{
       const userId = req.user.id
       if(!userId){
        return res.status(400).send({status : "error", message : "userId not found"})
       }
       const result = new websiteModel({
        userId : userId,
        url : req.body.url
       })

       await result.save()
       return res.status(200).send({status : "success", data : "successfuly website added"})
    }
    catch(err){
        return res.status(400).json({status: "error", message: err.message})
    }
}

const getWebsite = async (req, res) => {
    try{
       const result = await websiteModel.find({})
       if(!result){
        return res.status(404).json({status: "error", message: "no website found"})
       }
       return res.status(200).json({status: "success", data: result})
    }
    catch(err){
        return res.status(400).json({status: "error", message: err.message})
    }
}
module.exports =  {
    postWebsite: postWebsite,
    getWebsite: getWebsite
}