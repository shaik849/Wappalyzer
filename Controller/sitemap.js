const axios = require('axios');
const xml2js = require('xml2js');
const getSitemap = (req, res) => {
    try{
    let url = req.query.url
    const sitemapUrl = url;
    axios.get(sitemapUrl)
      .then(response => {
        xml2js.parseString(response.data, (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({status: "failed", messege:'Internal Server Error'});
          }
          const dataArray = [];
          const len = result.urlset.url
          console.log(len.length)
          for(var i = 0; i < (result.urlset.url).length; i++){
            dataArray.push({
                "url" : result.urlset.url[i].loc[0],
                "lastModified":result.urlset.url[i].lastmod[0],
	            "priority": result.urlset.url[i].priority[0],
	            "changefreq": result.urlset.url[i].changefreq[0]
            })
          }
          console.log(dataArray)
        return res.status(200).json({
            status: "success",
            result : dataArray
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

module.exports = { getSitemap : getSitemap}


