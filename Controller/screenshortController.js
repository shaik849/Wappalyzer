const puppeteer = require('puppeteer');
 
const createScreenshort = async (req, res) =>{
    try{
          const url = req.body.url;
          const name = './public/'+Date.now()+req.body.name;
          if(url){
            async function takeScreenshot(url, outputPath) {
                const browser = await puppeteer.launch({headless: 'new'});
                const page = await browser.newPage();
                await page.goto(url);
                await page.setViewport({width: 1200, height: 1500})
                
               
                await page.waitForTimeout(3000);
                
                // await page.keyboard.press(String.fromCharCode(13));
                await page.evaluate(async() => {
            //         const continueButton = document.document.getElementByClassName('.btn-confirm');
            //       if (continueButton) {
            //        continueButton.click();
            // }

  // Wait for any additional actions or page navigation if required
                // await page.waitForNavigation();
                    // Replace the selectors and actions below with the appropriate ones for the specific website's cookie consent banner
                    const cookieConsentElement = document.querySelector('YOUR_COOKIE_CONSENT_SELECTOR');
                    if (cookieConsentElement) {
                      // If the cookie consent banner exists, simulate a click on the "Accept" button
                      const acceptButton = cookieConsentElement.querySelector('YOUR_ACCEPT_BUTTON_SELECTOR');
                      if (acceptButton) {
                        acceptButton.click();
                      }
                    }
                  });
               
                await page.screenshot({ path: outputPath, fullPage: true });
                await browser.close();
              }
              
              // Usage:
              try {
                await takeScreenshot(url, `${name}.png`);
                return res.status(200).json({ status: 'success', message: 'Screenshot successfully saved' });
              } catch (error) {
                console.error(error);
                return res.status(400).json({ status: 'error', message: 'An internal server error occurred' });
              }
          }
          return res.status(400).json({statusbar: 'error', message: 'url not found'})
    }
    catch(e){
        return res.status(400).json({status: 'error', message: e})
    }
}

module.exports = {createScreenshort : createScreenshort}