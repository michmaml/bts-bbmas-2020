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

    const buttons = ['li[title="TOP SOCIAL ARTIST"]', '.btn-vote', '.btn-default'];

    // choose the right category
    await page.click(buttons[0]);
    await page.waitForSelector(buttons[0], { hidden: true });

    // choose the right band - beloved BTS
    await page.click(buttons[1]);
    await page.waitForSelector(buttons[1], { hidden: true });

    // yes, of course I confirm I want them to win
    await page.click(buttons[2]);
    await page.waitForSelector(buttons[2], { hidden: true });

    // authenticate my choice with facebook account
    await page.type("#email", config.email, { delay: 30 });
    await page.type("#pass", config.password, { delay: 30 });
    await page.click("#loginbutton");

    await page.waitForSelector('.choice-confirmation', { visible: true });
    // at this point it is safe to close the browser bc puppeteer voted for us

    browser.close();
  } catch (err) {
    console.log(err);
  }

})().catch(err => { throw err });


