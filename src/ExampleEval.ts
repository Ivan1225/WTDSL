const puppeteer = require('puppeteer');

let passedTests = 0;
let failedTests = 0;

function CheckSelector(nodes) {
	if(nodes.length === 1) {
		return nodes[0];
	} else if(nodes.length === 0) {
		throw 'Your selector did not match anything';
	} else {
		throw 'Your selector is too general and matches ' + nodes.length + ' items';
	}
}
async function shouldBe(a, b) {
	if(a === b) {
		passedTests++;
	} else {
		failedTests++;
	}
}
(async () => {
  const browser = await puppeteer.launch({
	headless: false,
	args: [
		'--proxy-server="direct://"',
		'--proxy-bypass-list=*'
	]
  });
  const page = await browser.newPage();
  await page.goto('https://www.ubc.ca');
  await page.waitFor(5000);
  let selector =  ''
  selector = '#menu-about'
  await page.$$eval(selector, CheckSelector);
  let attribute = await page.$eval(selector, e => e.text);
  shouldBe(attribute, "About UBC");
  await page.click(selector);
  await page.waitFor(2000);
  selector = 'button[data-target="#ubc7-global-menu"]'
  await page.$$eval(selector, CheckSelector);
  await page.click(selector);
  await page.waitFor(2000);
  let within = '.expand.in.collapse';
  selector = 'input.input-xlarge.search-query';
  await page.$$eval(within + ' ' + selector, CheckSelector);
  await page.type(within + ' ' + selector, "cpsc");
  selector = `button`;
  await page.$$eval(within + ' ' + selector, CheckSelector);
  await page.click(within + ' ' + selector);
  await page.waitFor(5000);
  console.log(passedTests);
/*
Select `#menu-about`
Expect [text] should be “About UBC”
Click
Wait 5
Select `button[data-target=”#ubc7-global-menu”]`
Click
Expect page should contain “.expand.in.collapse”
Within `.expand.in.collapse`
Select `input`
Fill “cpsc”
Select `button`
Click
End within
Wait 5
Select `.gsc-webResult.gsc-result`
Expect [length] should be 10
*/
  await browser.close();
})();