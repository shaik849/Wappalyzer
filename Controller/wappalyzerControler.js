const Wappalyzer = require('wappalyzer')
const {wappalyzerModel} = require('../Model/wappalyzerModel');


const getTechnologie = async (req, res) => {
  try{
    const options = {
      debug: false,
      delay: 500,
      headers: {},
      maxDepth: 3,
      maxUrls: 10,
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
        const url = req.query.url
        if(url){
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
        //difening categories
       const categories = results.technologies.map(technologies => technologies.categories[0].name)
         //filtering categories
       const uniqueArray = categories.filter(function(item, pos) {
        return categories.indexOf(item) == pos;
    })
    const result = await wappalyzerModel.findOne({url : url})
    if(result == null) {
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
      const model = new wappalyzerModel({
       url : req.query.url,
       categorie : []
      })
       await model.save()
      
      for(var i=0;i<uniqueArray.length;i++){
        const addAll = await wappalyzerModel.findOneAndUpdate({url : req.query.url},{
           $push : {
           categorie : {
               categorieName : finalArray[i].category,
               technologies : finalArray[i].technologies
           }
       }
         })
      }
      const findData = await wappalyzerModel.findOne({url : req.query.url})
      return res.status(200).json({status: "success", result : findData})
    }
    else if(result.url == url){
      return res.status(200).json({status : "success",result :result})
    }
  }
  return res.status(400).json({ status: "failed",error: "url is not given"})
      } catch (error) {
        console.error(error)
          return res.status(400).json({ status: "failed",error: error.message })
      }
    })()
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
    getTechnologie: getTechnologie,
    getTechnologiesById : getTechnologiesById
}