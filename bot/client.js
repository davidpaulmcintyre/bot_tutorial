const chai = require('chai');
const expect = require('chai').expect;
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
.forBrowser('chrome')
.build(); 

driver.get('http://localhost:3000');  
// driver.findElement(By.id('btnFirst')).click(); 
// driver.sleep(3000).then(function() {
//     driver.findElement(By.id("classification"))
//     .then(elem => elem.getText())
//     .then(result => { 
//         expect(result).to.equal('Human');
//     }) 
// }); 

driver.findElement(By.id('btnSecond')).click(); 
driver.sleep(3000).then(function() {
    // driver.findElement(By.id("classification"))
    // .then(elem => elem.getText())
    // .then(result => { 
    //     expect(result).to.equal('Human');
    // }) 
}); 