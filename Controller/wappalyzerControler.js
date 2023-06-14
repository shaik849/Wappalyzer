const Wappalyzer = require('wappalyzer')
const {wappalyzerModel} = require('../Model/wappalyzerModel');


const postTechnoligies = async (req, res) => {
  try{
     const url = req.body.url
     if(!url) return res.status(404).json({ status: "error", message: "Url required" })

     const result = await wappalyzerModel.findOne({url : url})
     if(result == null){
      const options = {
        debug: false,
        delay: 200,
        headers: {},
        maxDepth: 3,
        maxUrls: 1,
        maxWait: 30000,
        recursive: true,
        probe: false,
        proxy: false,
        userAgent: 'Wappalyzer', 
        htmlMaxCols: 2000,
        htmlMaxRows: 2000,
        noScripts: false,
        noRedirect: false,
      };
      
      const wappalyzer = new Wappalyzer(options)
      
      ;(async function() {
        try {
          await wappalyzer.init()
      
          // Optionally set additional request headers
          const headers = {}
      
          // Optionally set local and/or session storage
          const storage = {
            session: {}
          }
      
          const site = await wappalyzer.open(url, headers, storage)
      
          // Optionally capture and output errors
          site.on('error', console.error)
      
          const results = await site.analyze()
      
          const categories = results.technologies.map(technologies => technologies.categories[0].name)
          //filtering categories
        const uniqueArray = categories.filter(function(item, pos) {
         return categories.indexOf(item) == pos;
        })
         const finalArray = [];
         for(var i=0;i<uniqueArray.length;i++){
           finalArray.push({
            "category": uniqueArray[i],
            "technologies": []
           })
          for(var j=0;j<categories.length;j++){
      
          if(uniqueArray[i]==categories[j]){
               finalArray[i].technologies.push({
                   name: results.technologies[j].name,
                   logo: `https://www.wappalyzer.com/images/icons/${results.technologies[j].icon}`
            })
          }
          }
         }
         const techModel = new wappalyzerModel({
          url : url,
          categorie : []
         })
          await techModel.save()
         for(var i=0;i<uniqueArray.length;i++){
               await wappalyzerModel.findOneAndUpdate({url : url},{
              $push : {
              categorie : {
                  categorieName : finalArray[i].category,
                  technologies : finalArray[i].technologies
              }
          }
            })
         }
         const findData = await wappalyzerModel.findOne({url : url})
         return res.status(200).json({status: "success", dat : findData})
        } catch (error) {
          console.error(error)
        }
      
        await wappalyzer.destroy()
      })()
     }
     else if(result.url == url){
      return res.status(200).json({status: "success", data : result})
     }
  }
  catch (error) {
    return res.status(400).json({ status: "failed",error: error.message })
  }
}

const getTechnologiesById = async (req, res) => {
try{
const id = req.params.id;
 if(id) {
  const result = await wappalyzerModel.findOne({_id : id});

  if(result){
    return res.status(200).json({status: "success",data: result})
  }
  return res.status(400).json({status: 'failed', result : "can't find the data"})
 }
 return res.status(400).json({status: 'failed', result : 'Id is required'})
}
catch (error) {
  return res.status(400).json({status: "failed", error: error.message})
}
}



module.exports = {
    getTechnologiesById : getTechnologiesById,
    postTechnoligies : postTechnoligies,
}