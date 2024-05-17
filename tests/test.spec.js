const {test, expect} = require('@playwright/test');

test('first test', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const title = await page.title();
    expect(title).toBe('React App');
});