const {Builder, By, Key, WebElement, until} = require('selenium-webdriver');

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

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    let selector = '';
    await driver.get('https://www.ubc.ca');
    await driver.sleep(5000);
    selector = '#menu-about';
    let selector1 = CheckSelector(await driver.findElements(By.css(selector)));
    let attribute = selector1.getAttribute('text')
    shouldBe(attribute, "About UBC");
    selector1.click();
    await driver.sleep(2000);
    selector = 'button[data-target="#ubc7-global-menu"]'
    let selector2 = CheckSelector(await driver.findElements(By.css(selector)));
    selector2.click();
    await driver.sleep(2000);
    let within = '.expand.in.collapse';
    selector = 'input.input-xlarge.search-query';
    let selector3 = CheckSelector(await driver.findElements(By.css(`${within} ${selector}`)));
    selector3.sendKeys('cpsc');
    selector = `button`;
    let selector4 = CheckSelector(await driver.findElements(By.css(`${within} ${selector}`)));
    selector4.click();
    await driver.sleep(5000);
  } finally {
    await driver.quit();
    console.log(`You have ran ${passedTests + failedTests} tests, among them ${passedTests} tests are passed ${failedTests} tests are failed`);
  }
})();

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
*/