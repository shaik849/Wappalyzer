const {manageModel} = require('../Model/manageModel')
const path = require('path');
const decode = require('node-base64-image').decode

const createManageData = async (req, res) => {
    try{
        const logo = req.files.Logo
      if(logo.mimetype == 'image/png' || logo.mimetype == 'image/jpeg'|| logo.mimetype == 'image/jpg'){
        // const objJsonStr = JSON.stringify(logo.data)
        // const objJsonB64 = new Buffer(objJsonStr).toString("base64");
        // console.log(objJsonB64)
        const result = new manageModel({
                Title : req.body.Title,
                Logo: req.files.Logo.name,
                ProviderName : req.body.ProviderName,
                ProviderUrl : req.body.ProviderUrl,
                ExpiryDate : req.body.ExpiryDate,
                ManagedBy : req.body.ManagedBy
               })
               await result.save();
               return res.status(200).json({status : 'success', result : result});
    }
    return res.status(404).json({status : 'failed', error : 'Allows only jpeg or png or jpg'})
}
    catch(err){
        console.log(err)
        return res.status(400).json({status : 'failed', error : err.message})
    }
}
        // let type = req.files.Logo.mimetype
        // if(type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg'){
        //     const filename =Date.now()+"-"+req.files.Logo.name
        //     let newPath = path.join(process.cwd(),'public' ,filename)
        //     let postFiles = req.files.Logo.mv(newPath)
        //     function getBase64(data) {
        //         console.log("hi")
        //         fs.readFile(filename, (err, data) => {
        //             if (err) {
        //               console.error(err);
        //               return;
        //             }
        //             console.log(data);
        //           })
        //         }
        //      getBase64('D:/scubeNode/Wappalyzer/public/1682502243834-DSC_3269 copy.jpg')
        //      return res.status(200).json({status:'success'})
        
       //    const result = new manageModel({
    //     Title : req.body.Title,
    //     Logo: response,
    //     ProviderName : req.body.ProviderName,
    //     ProviderUrl : req.body.ProviderUrl,
    //     ExpiryDate : req.body.ExpiryDate,
    //     ManagedBy : req.body.ManagedBy
    //    })
    //    await result.save();
                
// return res.status(400).json({status:"failed",message: 'Only jpeg and png images are supported'})
//     }
// catch(err) {
//     console.log(err)
//     return res.status(400).json({status:"failed",message: err.message})
// }
// }

const getManageData = async (req, res) => {
    try{
        const id = req.params.id;
        if(id) {
            const result = await manageModel.findOne({_id : id})
            return res.status(200).json({status : "success", result: result})
        }
     return res.status(400).json({status : "failed",message: "check the id"})

    }
    catch(err) {
        return res.status(400).json({status:"failed", error: err.message})
    }
}

module.exports = {
    createManageData: createManageData,
    getManageData : getManageData
}