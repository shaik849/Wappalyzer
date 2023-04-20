const Wappalyzer = require('wappalyzer')
const getTechnologies = (req, res) => {
    const options = {
      debug: false,
      delay: 0,
      headers: {},
      maxDepth: 3,
      maxUrls: 10,
      maxWait: 10000,
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
  
    const finalArray = [];
       for(var i=0;i<uniqueArray.length;i++){
         finalArray.push({
          "category": uniqueArray[i],
          "technologies": []
         })
        for(j=0;j<categories.length;j++){
    
        if(uniqueArray[i]==categories[j]){
             finalArray[i].technologies.push({
                 name: results.technologies[j].name,
                 logo: `https://www.wappalyzer.com/images/icons/${results.technologies[j].icon}`
          })
        }
        }
       }
       return res.status(200).json({status: "success", result: finalArray})
    }
    return res.status(400).json({ status: "failed",error: "url is not given"})
      } catch (error) {
          return res.status(400).json({ status: "failed",error: "cant find the the webpage "})
      }
    })()
}

module.exports = { getTechnologies }