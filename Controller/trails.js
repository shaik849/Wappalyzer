const axios = require('axios');
const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;
const getSitemapUsingUrls = async (req, res) => {
    try {
      const websiteUrl = req.query.url;
      const sitemapUrl = `${websiteUrl}/sitemap.xml`;
  
      const response = await axios.get(sitemapUrl);
      const result = await parseXml(response.data);
  
      if (result.sitemapindex) {
        const urls = result.sitemapindex.sitemap.map((entry) => entry.loc[0]);
        const responses = await Promise.all(urls.map((url) => axios.get(url)));
        const entries = await Promise.all(responses.map((response) => parseXml(response.data)));
  
        const finalArray = entries.map((entry) => {
          if (entry.urlset) {
            return entry.urlset.url.map((url) => ({
              url: url.loc[0],
              lastModified: url.lastmod,
              priority: url.priority,
              changefreq: url.changefreq,
            }));
          } else {
            return [];
          }
        }).flat();
  
        return res.status(200).json({ status: "success", url: req.query.url, result: finalArray });
      } else {
        const dataArray = [];

          for (let i = 0; i < result.urlset.url.length; i++) {
            dataArray.push({
              url: result.urlset.url[i].loc[0],
              lastModified: result.urlset.url[i].lastmod,
              priority: result.urlset.url[i].priority,
              changefreq: result.urlset.url[i].changefreq,
            });
          }

          // finalArray.push({ array: dataArray });

          return res.status(200).json({ status: "success", url: req.query.url, result: dataArray });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
  };
  
  const parseXml = (data) => {
    return new Promise((resolve, reject) => {
      parseString(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  module.exports = {getSitemapUsingUrls : getSitemapUsingUrls}
  