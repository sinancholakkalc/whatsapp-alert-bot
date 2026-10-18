const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Store browser binary inside the project directory so Render packages it with the runtime build
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
