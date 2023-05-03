const axios = require('axios');
const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;
const getSitemap = (req, res) => {
    try{
        const finalArray = []
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

const findSitemapUsingUrls = async (req, res) => {
  try {
    const websiteUrl = req.query.url;
    const sitemapUrl = `${websiteUrl}/sitemap.xml`;

    // Check if the sitemap exists by sending a request with validateStatus: false option
    const response = await axios.get(sitemapUrl, { validateStatus: false });
    if (response.status === 404) {
      return res
        .status(404)
        .json({ status: "failed", message: "Sitemap not found" });
    }

    // Parse the sitemap XML data and retrieve the URLs
    const result = await parseXml(response.data);
    if(result.sitemapindex){
    const urls = result.sitemapindex
      ? result.sitemapindex.sitemap.map((entry) => entry.loc[0])
      : result.urlset.url.map((entry) => entry.loc[0]);

    // Send requests to all URLs in the sitemap and filter out invalid responses
    const responses = await Promise.all(
      urls.map((url) => axios.get(url, { validateStatus: false }))
    );
    const validResponses = responses.filter((response) => response.status === 200);

    // Parse the XML data in the valid responses and retrieve the relevant details
    const entries = await Promise.all(
      validResponses.map((response) => parseXml(response.data))
    );

    
     const finalArray = entries
      .map((entry) => {
        if (entry.urlset) {
          return entry.urlset.url.map((url) => ({
            url: url.loc[0] || "",
            lastModified: url.lastmod || "",
            priority: url.priority || "",
            changefreq: url.changefreq || "",
          }));
        } else {
          return [];
        }
      })
      .flat();

    return res
      .status(200)
      .json({ status: "success", url: req.query.url, result: finalArray });
    }
    else{
        const dataArray = [];

        for (let i = 0; i < result.urlset.url.length; i++) {
          dataArray.push({
            url: result.urlset.url[i].loc[0] || "",
            lastModified: result.urlset.url[i].lastmod || "",
            priority: result.urlset.url[i].priority || "",
            changefreq: result.urlset.url[i].changefreq || "",
          });
        }
        return res.status(200).json({ status: "success", url: req.query.url, result: dataArray });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }

};

const parseXml = (data) => {
    const xmlString = data
      const unescapedStr = data.trim()

    return new Promise((resolve, reject) => {
    xml2js.parseString(unescapedStr, (err, result) => {
      if (err) {
        reject(err)
      } else {
       resolve(result)
      }
    })
})

};

  
  

  module.exports = { findSitemapUsingUrls : findSitemapUsingUrls, getSitemap: getSitemap}
  