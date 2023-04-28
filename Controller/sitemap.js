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
          res.status(200).json({
            status: "success",
            result : result
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


