const {sitemapModel} = require('../Model/sitemapModel')

const getVisulasData = async (req, res) =>{
  try{
    const id = req.params.id;
    if(id){
      const resultData = await sitemapModel.findOne({_id : id});
       const dataArray = []
       for(let i=0;i<resultData.sitemap.length;i++){
        if(resultData.sitemap[i] == null){
          continue;
        }
        else{
          dataArray.push({url : resultData.sitemap[i].url});
        }
       }
      //  resultData.sitemap.map(data =>{
      //   dataArray.push({url :data.url})
      //  })
       const levelArray = []
       dataArray.map(url =>{
        var name = url.url.split('/')
          levelArray.push({
            level0 : name[2].split('www.')[1],
             level1 : name[3],
             level2 : name[4],
             level3 : name[5],
             level4 : name[6],
             level5 : name[7]
          })
       })

       const children = []
        const finalArray = {
        url : dataArray[0].url,
        lastTerm : levelArray[0].level0,
        parent : "",
        children : children
       }
      
  
     
       for (let i = 1; i < dataArray.length; i++) {
          if(dataArray[i].url.split("/")[3]===levelArray[i].level1 && !levelArray[i].level2){
            children.push({
              url: dataArray[i].url,
              lastTerm: levelArray[i].level1,
              parent: levelArray[i].level0,
              children: []
            })
          }
          else if(dataArray[i].url.split("/")[3]===levelArray[i].level1 && levelArray[i].level2 ){
            let childObj = children.find(child => child.lastTerm === levelArray[i].level1 && child.parent === levelArray[i].level0);
          if (childObj) {
            childObj.children.push({
              url: dataArray[i].url,
              parent : levelArray[i].level1,
              lastTerm: levelArray[i].level2,
              children: []
            });
          } else {
            children.push({
              url: dataArray[i].url,
              lastTerm: levelArray[i].level1,
              children: [{
                url: dataArray[i].url,
                parent : levelArray[i].level1,
                lastTerm: levelArray[i].level2,
                children: []
              }]
            });
          }
            }
       }
       return res.status(200).json({data : finalArray})
    }
    return res.status(400).json({status: 'error', message: 'Id required'})
  }
  catch(err){
    console.error(err)
    return res.status(400).json({status: 'error', message: err.message})
  }
}




module.exports = {getVisulasData :getVisulasData}