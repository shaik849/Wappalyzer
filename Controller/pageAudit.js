
const pageAuditModel =  require('../Model/pageauditModel')
var lighthouse = require('lighthouse');
var chromeLauncher = require('chrome-launcher');




const getLighthouseDetail = async (req, res, next) => {
  try{
    const mobileConfig = {
      extends: 'lighthouse:default',
      settings: {
        emulatedFormFactor: 'mobile',
        throttling: {
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 150,
          downloadThroughputKbps: 1638.4,
          uploadThroughputKbps: 1478.4,
          rttMs: 150,
        },
      },
    };
    
    const desktopConfig = {
      extends: 'lighthouse:default',
      settings: {
        emulatedFormFactor: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
          rttMs: 0,
        },
      },
    };
    const opts = {
      chromeFlags: ['--headless', '--no-sandbox', '--disable-storage-reset'],
      logLevel: 'verbose',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    };
    
    const launchChromeAndRunLighthouse = (url ,config) => {
      return chromeLauncher
        .launch(
          {
            chromeFlags: opts.chromeFlags
          }
        )
        .then((chrome) => {
          opts.port = chrome.port;
          return lighthouse(url, { ...config, port: chrome.port });
        })
        .then((results) => {
          return results.lhr;
        })
        .catch((error) => {
          console.error('Lighthouse audit failed:', error);
        });
    };
    const url = req.body.url;
    const type = req.body.type;
  
   if(!url){
    return res.status(404).json({statusbar : "failed", message : "url required" })
   }

   if(type === 'mobile'){
  const mobileResults = await launchChromeAndRunLighthouse(url, mobileConfig);
  

  const mobile = {
    performence :mobileResults.categories.performance.score * 100,
    accessibility : mobileResults.categories.accessibility.score * 100,
    Bestpractices : mobileResults.categories['best-practices'].score * 100,
    seo : mobileResults.categories.seo.score * 100,
    pwa : mobileResults.categories.pwa.score * 100
  }

  const findData = await pageAuditModel.findOne({url : url})
  if(!findData){
    const data = new pageAuditModel({
      url : url,
      mobile : mobile
    })
    await data.save();
  }
  else{
    const update = await pageAuditModel.updateOne({url :url},{
      $set : {
        mobile : mobile
    }
    }
  )
  }
  

  res.status(200).json({
    status :"success",
    data: mobile
  });
}
else if(type === 'desktop'){
  const desktopResults = await launchChromeAndRunLighthouse(url, desktopConfig);
  const desktop = {
    performence :desktopResults.categories.performance.score * 100,
    accessibility : desktopResults.categories.accessibility.score * 100,
    Bestpractices : desktopResults.categories['best-practices'].score * 100,
    seo : desktopResults.categories.seo.score * 100,
    pwa : desktopResults.categories.pwa.score * 100
  }
  const findData = await pageAuditModel.findOne({url : url})
  if(!findData){
    const data = new pageAuditModel({
      url : url,
      desktop : desktop
    })
    await data.save();
  }
  else{
    const update = await pageAuditModel.updateOne({url :url},{
      $set : {
        desktop : desktop
    }
    }
  )
  }
  res.status(200).json({
    status :"success",
    data: desktop
  });
}
  }
catch(err){
  return res.status(400).json({status : "error", message : err});
}
};





module.exports = { getLighthouseDetail : getLighthouseDetail}