const puppeteer = require('puppeteer');

const createScreenshot = async (req, res) => {
  try {
    const url = req.body.url;
    const name = './public/' + Date.now() + req.body.name;

    if (url) {
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();

      // Enable request interception
      await page.setRequestInterception(true);

      // Intercept requests
      page.on('request', (request) => {
        const resourceType = request.resourceType();
        if (resourceType === 'image' || resourceType === 'media' || resourceType === 'font') {
          request.abort();
        } else {
          request.continue();
        }
      });

      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.setViewport({ width: 1200, height: 1500 });

      // Handle the cache button
      await page.evaluate(() => {
        const cacheButton = document.querySelector('.btn-cache');
        if (cacheButton) {
          cacheButton.click();
        }
      });

      await page.waitForTimeout(3000);

      // Remove the commented out code for the cookie consent banner if not needed
      // Replace YOUR_COOKIE_CONSENT_SELECTOR and YOUR_ACCEPT_BUTTON_SELECTOR with the appropriate selectors for the website's cookie consent banner
      await page.evaluate(() => {
        const cookieConsentElement = document.querySelector('YOUR_COOKIE_CONSENT_SELECTOR');
        if (cookieConsentElement) {
          const acceptButton = cookieConsentElement.querySelector('YOUR_ACCEPT_BUTTON_SELECTOR');
          if (acceptButton) {
            acceptButton.click();
          }
        }
      });

      await page.screenshot({ path: `${name}.png`, fullPage: true });

      await browser.close();

      return res.status(200).json({ status: 'success', message: 'Screenshot successfully saved' });
    }

    return res.status(400).json({ status: 'error', message: 'URL not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'An internal server error occurred' });
  }
};




// const puppeteer = require('puppeteer');



const createScreenshost = async (req, res) => {
  try {
    const url = req.body.url; // Replace with the desired URL
    const name = `./public/screenshot-${Date.now()}.png`;

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // await page.goto(url,{ waitUntil: 'networkidle0' });
    // await page.waitForTimeout(3000);
    await page.setViewport({ width: 1300, height: 1000 });
    await page.goto(url, { waitUntil: 'load' });

// Scroll to the very top of the page
await page.evaluate(_ => {
      window.scrollTo(0, 0);
});

// Scroll to the bottom of the page with puppeteer-autoscroll-down
await scrollPageToBottom(page);
async function scrollPageToBottom(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
    window.scrollTo(0, 0);
  });
}
await page.waitForSelector('data-src');
// await page.waitForTimeout(3000)
// Get your image links
let imageLinks = await page.$$eval('img', imgLinks => {
    return imgLinks.map((i) => i.src);
});
    // Scroll the page to trigger lazy loading of images
    // await page.evaluate(() => {
    //   window.scrollTo(0, document.body.scrollHeight);
    // });
    // await page.evaluate(async () => {
    //   await new Promise((resolve) => {
    //     const images = document.querySelectorAll('img');
    //     let loadedCount = 0;

    //     const onLoad = () => {
    //       loadedCount++;
    //       if (loadedCount === images.length) {
    //         resolve();
    //       }
    //     };

    //     for (let i = 0; i < images.length; i++) {
    //       if (!images[i].complete) {
    //         images[i].addEventListener('load', onLoad);
    //         images[i].addEventListener('error', onLoad);
    //       } else {
    //         onLoad();
    //       }
    //     }
    //   });
    //   window.scrollTo(0, 0);
    // });


    // // Wait until all images are loaded
    // // await page.waitForFunction(() => {
    // //   const images = document.querySelectorAll('img[data-src]');
    // //   return Array.from(images).every(img => img.complete);
    // // });

    // // Take a screenshot of the entire page
   
    await page.screenshot({ path: name, fullPage: true });

    await browser.close();
    return res.status(200).send(`Screenshot saved as ${name}`);
  } catch (error) {
    return res.status(400).send('Error occurred while taking a screenshot:'+error);
  }
};






// Run the screenshot function
// takeScreenshot();


// Run the screenshot function

const screenshot = async (req, res) => {
  try {
    const url = req.body.url;
    const name = `./public/screenshot-${Date.now()}.png`;
    const browser = await puppeteer.launch({headless : 'new',   defaultViewport: {width: 1920, height: 1080}});
    const page = await browser.newPage();
    await page.setViewport({
      width: 1440, // Adjust the width as needed
      height: 1200
    });

  
    await page.goto(url); // Replace with your target URL
  
    // Get the height of the rendered page
    await page.waitForSelector('html');
    // aw
    const bodyHandle = await page.$('body');
    const { height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();
    await page.setViewport({
      width: 1440, // Adjust the width as needed
      height: Math.ceil(height),
    });
    // Get the height of the fixed header

    // Get the height of the rendered page
    // Scroll in viewport-sized steps, excluding the header height
    await scrollPageToBottom(page);
    async function scrollPageToBottom(page) {
      await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
          let totalHeight = 0;
          const distance = 100;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
    
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
        window.scrollTo(0, 0);
      });
    }
await page.screenshot({
  path : name,
  fullPage : true
})
     
    await browser.close();
    return res.status(200).json({ statusbar: 'success', message: 'Success' });
  
}

catch (e) {
    console.log(e)
    return res.status(404).json({ error: e.message });
  }
};






module.exports = { createScreenshot: createScreenshot, createScreenshost : createScreenshost, screenshot : screenshot};


// module.exports = { createScreenshort: createScreenshot };
