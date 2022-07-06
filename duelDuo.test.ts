
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})
test("Make sure clicking draw shows choices", async () => {
    await driver.findElement(By.xpath(`//button[@id="draw"]`)).click();
    expect(await (driver.findElement(By.xpath(`//div[@id="choices"]`))).isDisplayed()).toBe(true);
    await driver.sleep(1000);
  });


test('Title shows up on load', async () => {expect(await driver.findElement(By.id("title")).isDisplayed()).toBe(true);})





