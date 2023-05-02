const axios = require('axios');
const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;
const finalArray = [];
const getSitemap = (req, res) => {
    try{
    let url = req.query.url
    const sitemapUrl = url;
    axios.get(sitemapUrl)
      .then(response => {
        xml2js.parseString(response.data, (error, result) => {
          if (error) {
            return res.status(500).json({status: "failed", messege:'Internal Server Error'});
          }
          const dataArray = [];
          if(result.sitemapindex){
            for(var i = 0; i < (result.sitemapindex.sitemap).length; i++){
                dataArray.push({
                    "url" :result.sitemapindex.sitemap[i].loc
                })
            }
            return res.status(200).json({
                status: "success",
                result : dataArray
              });
          }
          else{
          for(var i = 0; i < (result.urlset.url).length; i++){
            dataArray.push({
                url : result.urlset.url[i].loc[0],
                lastModified:result.urlset.url[i].lastmod,
	            "priority": result.urlset.url[i].priority,
	            "changefreq": result.urlset.url[i].changefreq,
                // "image:image" : result.urlset.url[i].image:image
            })
          }
        }
          finalArray.push({array:dataArray})
         return res.status(200).json({
            status: "success",
            url : req.query.url,
            result : finalArray
          });
        });
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({status: "failed", messege:'Internal Server Error'});

      });
    }
    catch(error) {
        return res.status(500).json({status : "failed", messege: error.message})
    }
}

const getSitemapUsingUrl = (req, res) => {
try{
const websiteUrl = req.query.url
const sitemapUrl = `${websiteUrl}/sitemap.xml`;
const finalArray = []
console.log(sitemapUrl)

axios.get(sitemapUrl)
  .then(response => {
    parseString(response.data, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      else{
      const htmlIncude = result
      // console.log(result.includes("sitemap"))
     
    if(result.sitemapindex) {
    
      const array = []
      const data = result.sitemapindex.sitemap
    
      for(let i=0; i<data.length; i++) {
        let link = data[i].loc[0]
        axios.get(link)
        .then(response => {
          xml2js.parseString(response.data, (error, result) => {
           if(error){
            console.log(error)
           }
           for(var i = 0; i < (result.urlset.url).length; i++){
          //  console.log(result.urlset.url[i].loc[0])
           finalArray.push(
              result.urlset.url[i].loc[0]
           )
          }
           for(var i = 0; i < (result.urlset.url).length; i++){
            array.push({
                url : result.urlset.url[i].loc[0],
                lastModified:result.urlset.url[i].lastmod,
	            "priority": result.urlset.url[i].priority,
	            "changefreq": result.urlset.url[i].changefreq,
                // "image:image" : result.urlset.url[i].image:image
            })
          }
      })
    }).catch(err => {
      if(err.message == "Request failed with status code 404"){
        i++;
        i--;
      }
    })
    }
    console.log(finalArray)
    return res.json({final : finalArray})
     }
    else{
      const response = result.urlset.url
      return res.json({status:"success", result : response})
    }
    

      
    //   console.log(data.length)
    //   const array = []
    //   for(let i=0; i<data.length; i++) {
    //     array.push({
    //       url : data[i].loc[0]
    //     })
    //   }
    //   return res.json({result : array})
    // });
  
      }
})
  })
}
catch(err){
  return res.json({err : err})
}
}



module.exports = { getSitemap : getSitemap, getSitemapUsingUrl : getSitemapUsingUrl}


