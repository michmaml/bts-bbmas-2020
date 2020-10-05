const puppeteer = require('puppeteer');
const fs = require('fs');

const bbams = 'https://www.billboard.com/bbmasvote#';

(async () => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(bbams, { waitUntil: 'networkidle2' });

    await page.click('#onetrust-accept-btn-handler');
    await page.waitForSelector('#onetrust-accept-btn-handler', { hidden: true });

    await page.click('.billboard-embed-close');
    await page.waitForSelector('.billboard-embed-close', { hidden: true });

    //await page.reload({ waitUntil: 'load', timeout: 0 });
    /* await page.evaluate(() => {
      location = location;
    }); */

    const buttons = ['li[title="TOP SOCIAL ARTIST"]', '.btn-vote', '.btn-default'];

    /* await page.evaluate(() => {
      document.querySelector('view-landing-category').click();
    }); */
    /* await page.waitForSelector('.two-col', { timeout: 60000 });
    await page.click(buttons[0]);
    await page.waitForSelector(buttons[0], { hidden: true }); */

    /* await page.click(buttons[1]);
    await page.waitForSelector(buttons[1], { hidden: true });

    await page.click(buttons[2]);
    await page.waitForSelector(buttons[2], { hidden: true }); */



    await page.screenshot({ path: `bbams.png` })

    const websiteContent = await page.content();

    //console.log(websiteContent);

    const file = fs.createWriteStream('url_list.log');
    const pathName = file.path;
    file.write(websiteContent);
    file.on('error', (err) => {
      console.error(`There is an error writing the file ${pathName} => ${err}`)
    });
    file.end();


    browser.close();
  } catch (err) {
    console.log(err);
  }

})().catch(err => { throw err });


