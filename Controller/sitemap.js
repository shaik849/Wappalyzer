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
      const finalArray = []
      const data = result.sitemapindex.sitemap
    
      for(let i=0; i<data.length; i++) {
        let link = data[i].loc[0]
        
      //   function fetchData(link){
      //     const data = new Promise((resolve, reject) => {
      //       axios.get(link)
      //         .then(response => {
      //                   xml2js.parseString(response.data, (error, result) => {
      //                    if(error){
      //                     console.log(error)
      //                    }
      //                    for(var i = 0; i < (result.urlset.url).length; i++){
      //                   //  console.log(result.urlset.url[i].loc[0])
      //                    finalArray.push(
      //                       result.urlset.url[i].loc[0]
      //                    )
      //                   }
      //                   resolve();
      //                   return finalArray;
      //            // resolve the Promise with the data
      //         })
      //       })
      //         .catch(error => {
      //           reject(error); // reject the Promise with the error
      //         });
      //     });
      //   }
      // console.log(fetchData(link))
        // fetchData.then(function(value) {
        //   console.log(value)
        // });

        
       const fundata = axios.get(link)
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
          finalArray.push(finalArray)
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
    const newdata = fundata.then(res => console.log(res))
    return res.json({final : finalArray})
    }
    console.log(finalArray)
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


// const final = (req, res) => {
//   const link = req.
//   const finalArray = [];
// const data = result.sitemapindex.sitemap;

// const fetchData = (link) => {
//   return axios.get(link)
//     .then(response => {
//       return new Promise((resolve, reject) => {
//         xml2js.parseString(response.data, (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             const urls = result.urlset.url.map(url => url.loc[0]);
//             finalArray.push(...urls);
//             const metadata = result.urlset.url.map(url => {
//               return {
//                 url: url.loc[0],
//                 lastModified: url.lastmod,
//                 priority: url.priority,
//                 changefreq: url.changefreq
//               };
//             });
//             resolve(metadata);
//           }
//         });
//       });
//     })
//     .catch(error => {
//       throw error;
//     });
// };

// const promises = data.map(item => fetchData(item.loc[0]));

// Promise.all(promises)
//   .then(metadata => {
//     const flattenedMetadata = metadata.flat();
//     // do something with finalArray and flattenedMetadata
//     res.json({ final: finalArray, metadata: flattenedMetadata });
//   })
//   .catch(error => {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while fetching data.' });
//   });

// }

const getSitemapUsingUr = async (req, res) => {
  try {
    const websiteUrl = req.query.url
    const sitemapUrl = `${websiteUrl}/sitemap.xml`;

    axios.get(sitemapUrl).then(response => {
      parseString(response.data, (err, result) => {
        if (err) {
          console.log("hi")
          console.error(err);
          return res.status(500).json({ status: "failed", message: 'Internal Server Error' });
        }
        const finalArray = [];
        if (result.sitemapindex) {
          const urlArray = []
          const data = result.sitemapindex.sitemap
          console.log(data.length)
          for (let i = 0; i < data.length; i++) {
            const getLink = data[i].loc[0];
            urlArray.push({
              "url" : getLink
            })
          }
          const dataArray = []
          Promise.all(urlArray.map((url) => axios.get(url.url)))
          .then(responses => {
            responses.forEach((response, index) => {
              parseString(response.data, (error, result) => {
                if (error) {
                  console.log(error);
                }
                else if (result.urlset) {
                  dataArray.push({
                          url: result.urlset.url[index].loc[0],
                          lastModified: result.urlset.url[index].lastmod,
                          priority: result.urlset.url[index].priority,
                          changefreq: result.urlset.url[index].changefr
                          });
                          finalArray.push({ array: dataArray });
    
                          //             //     // If this is the last callback to be called, send the response with the finalArray
                            // if (finalArray.length === data.length) {
                            //       return res.status(200).json({ status: "success", url: req.query.url, result: finalArray });
                            //   }
                }
              })
            })
            return res.status(200).json({ status: "success", url: req.query.url, result: finalArray });
          }).catch(err => console.log(err.message))
        }

    //    urlArray.map(async (link, index)=>{
    //     // console.log(link.url)
    //     let results
    //     try{
    //       results = await axios.get(link.url)
    //      const res = parseString(response.data, (error, result)=>{
    //       if (error ){
    //         // handle 404 error
    //         console.log(error)
    //       }
    //       else{
    //         console.log(result.urlset)
    //         if(results){
    //           console.log(dataArray)
    //                   dataArray.push({
    //                     url: result.urlset.url[index].loc[0],
    //                     lastModified: result.urlset.url[index].lastmod,
    //                     priority: result.urlset.url[index].priority,
    //                     changefreq: result.urlset.url[index].changefreq,
    //                   });
    //                   console.log(dataArray)
    //                 // }
    
    //             //     finalArray.push({ array: dataArray });
    
    //             //     // If this is the last callback to be called, send the response with the finalArray
    //             //     if (finalArray.length === data.length) {
    //             //       return res.status(200).json({ status: "success", url: req.query.url, result: finalArray });
    //             //     }
    //         }
    //         else{
    //           console.log("failed")
    //         } 
    //         finalArray.push({ array: dataArray });
    //         // if (finalArray.length === data.length) {
                      
    //       }
    //      })
    //    }
    //   catch(err){
    //     if (err && err.message==("Request failed with status code 404")) {
    //       console.log("Not found")
    //     }
         
    //   }
    // })
        //   axios.get(urlArray[i].url).then(response => {
        //       xml2js.parseString(response.data, (error, result) => {
        //         if (error) {
        //           console.error(error);
        //           console.log("hi")
        //           return res.status(500).json({ status: "failed", message: 'Internal Server Error' });
        //         }
        //      console.log("success")
        //   })
        // }).catch(err =>{
        //   console.log(err)
        // })
      
            //   xml2js.parseString(response.data, (error, result) => {
            //     if (error) {
            //       console.error(error);
            //       console.log("hi")
            //       return res.status(500).json({ status: "failed", message: 'Internal Server Error' });
            //     }
          // Promise.all(urlArray.map(url => axios.get(url)))
          // .then(responses => {
          //   responses.forEach(response => {
          //     parseString(response.data, (error, result) => {
          //       if (error) {
          //         console.error(error);
          //       } else if (result.urlset) {
          //         console.log("success")
          //       }})
          //     })
          //   }).catch(err => console.log(err.message))
          // }
          // .then(responses => {
          //   responses.forEach(response => {
          //     parseString(response.data, (error, result) => {
          //       if (error) {
          //         console.error(error);
          //       } else if (result.urlset) {
          //         const dataArray = [];
          //         for (let i = 0; i < result.urlset.url.length; i++) {
          //           dataArray.push({
          //             url: result.urlset.url[i].loc[0],
          //             lastModified: result.urlset.url[i].lastmod,
          //             priority: result.urlset.url[i].priority,
          //             changefreq: result.urlset.url[i].changefreq,
          //           });
          //         }
          //         finalArray.push({ array: dataArray });
          //       }
          //     });
          //   });
          //   return res.status(200).json({ status: "success", url: req.query.url, result: finalArray });
          // })
          // .catch(error => {
          //   console.error(error);
          //   return res.status(500).json({ status: "failed", message: 'Internal Server Error' });
          // });
            // axios.get(getLink).then(response => {
            //   xml2js.parseString(response.data, (error, result) => {
            //     if (error) {
            //       console.error(error);
            //       console.log("hi")
            //       return res.status(500).json({ status: "failed", message: 'Internal Server Error' });
            //     }
            //     for (let i = 0; i < (result.urlset.url).length; i++) {
            //       dataArray.push({
            //         url: result.urlset.url[i].loc[0],
            //         lastModified: result.urlset.url[i].lastmod,
            //         priority: result.urlset.url[i].priority,
            //         changefreq: result.urlset.url[i].changefreq,
            //       });
            //     }

            //     finalArray.push({ array: dataArray });

            //     // If this is the last callback to be called, send the response with the finalArray
            //     if (finalArray.length === data.length) {
            //       return res.status(200).json({ status: "success", url: req.query.url, result: finalArray });
            //     }
            //   });
            // }).catch(error => {
            //   if (error && error.message === "Request failed with status code 404") {
            //     console.log("Not found")
            //     // handle 404 error
            //   } else {
            //     console.error(error);
            //     return res.status(500).json({ status: "failed", message: 'Internal Server Error' });
            //   }
            // });
      

        else {
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
      });
    }).catch(error => {
      console.error(error);
      return res.status(500).json({ status: "failed", message: 'Internal Server Error' });
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};




module.exports = { getSitemap : getSitemap, getSitemapUsingUrl : getSitemapUsingUrl, getSitemapUsingUr : getSitemapUsingUr}


