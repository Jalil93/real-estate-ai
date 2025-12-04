console.info("Launching browser...");

/* To make things easier, we've setup Playwright using the window variables.
 You can access it and your API key using window.playwright or window.connectionString. */
console.info('Connected!');

// For demo purposes, we'll wait a second so we can watch.
await new Promise((resolve) => setTimeout(resolve, 1000));

// Write your playwright script here:
await page.goto('https://brightmls.com/');
await page.locator('xpath=//div[@class="MuiGrid-root MuiGrid-item btnLoginDiv css-1wxaqej"]/button').click()
await page.getByPlaceholder("Enter your login name").fill('12345')