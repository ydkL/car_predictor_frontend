// playwright.config.js
module.exports = {
    webServer: {
      command: 'npm start',
      port: 3000,
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
    testDir: './tests',
  };