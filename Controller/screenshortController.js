const puppeteer = require('puppeteer');


const screenshot = async (req, res) => {
  try {
    const url = req.body.url;
    const name = `./public/screenshot-${Date.now()}.png`;
    const browser = await puppeteer.launch({headless : 'new'});
    const page = await browser.newPage();
   
    await page.goto(url, {waitUntil: 'networkidle2'},  {defaultViewport: null}); // Replace with your target URL
   
    
    await page.emulateMediaType(null);
    const bodyHandle = await page.$('body');
    await bodyHandle.dispose();

  
    await page.setViewport({
      width: 1440, 
      height: await page.evaluate(() => document.body.clientHeight),
      isMobile : false
    });

   //scroller
     async function scrollPageToBottom(page) {
      await page.evaluate(async () => {
        console.log('Start scrolling');
        await new Promise((resolve, reject) => {
          let totalHeight = 0;
          const distance = 100;
          const delay = 200; // Delay between each scroll in milliseconds
    
          const timer = setInterval(() => {
            const scrollHeight = document.documentElement.scrollHeight;
            console.log('Scroll height:', scrollHeight);
            window.scrollBy(0, distance);
            totalHeight += distance;
    
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              console.log('Scrolling complete');
              resolve();
            }
          }, delay);
        });
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }


    
    await scrollPageToBottom(page);
await page.screenshot({
  path : name,
  clip: {
    x: 0,
    y: 0,
    width: 1440,
    height: await page.evaluate(() => {
      return Promise.resolve(document.documentElement.scrollHeight);
    })
  }
});

await bodyHandle.dispose();
    await browser.close();
    return res.status(200).json({ statusbar: 'success', message: 'Success' });
  
}

catch (e) {
    console.log(e)
    return res.status(404).json({ error: e.message });
  }
};






module.exports = { screenshot : screenshot};


// module.exports = { createScreenshort: createScreenshot };
