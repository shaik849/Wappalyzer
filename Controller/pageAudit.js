
var lighthouse = require('lighthouse');
var chromeLauncher = require('chrome-launcher');


const opts = {
  chromeFlags: ['--headless', '--no-sandbox', '--disable-storage-reset'],
  logLevel: 'verbose',
  output: 'json',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
};

function launchChromeAndRunLightHouse(url, opts, config = null) {
  return chromeLauncher
    .launch({
      chromeFlags: opts.chromeFlags,
    })
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then((result) => {
        return chrome.kill().then(() => result);
      });
    });
}

const getLighthouseDetails = async (req, res, next) => {
  const url = req.query.url;

  launchChromeAndRunLightHouse(url, opts)
    .then((results) =>
     console.log(results)
    )
    .catch((e) => {
      res
        .status(500)
        .send({ message: 'An interanal server error occured', log: e });
    });
}

module.exports = {getLighthouseDetails : getLighthouseDetails}