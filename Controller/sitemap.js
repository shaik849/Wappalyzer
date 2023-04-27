const GetSitemapLinks = require("get-sitemap-links").default;

const getSitemaps = (req, res) => {
    try{
    const url = req.query.url
    if(url){
(async () => {
  const result = await GetSitemapLinks(
    url
  );
 return res.status(200).json({status : "success", result : result})
  })();
    }
    else{
        return res.status(400).json({status : "failure", result : "url not found"}) 
    } 
}
    catch(err) {
        console.log(err)
        return res.status(404).json({status : "failed", message : err.message});
    }
}
module.exports = {getSitemaps : getSitemaps}