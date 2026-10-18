const { join } = require('path');
const fs = require('fs');
const os = require('os');

const projectCache = join(__dirname, '.cache', 'puppeteer');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // On Render, store in project directory so it is included in the deploy container.
  // Locally, use project cache if present, otherwise use the global user cache.
  cacheDirectory: (process.env.RENDER || fs.existsSync(projectCache))
    ? projectCache
    : join(os.homedir(), '.cache', 'puppeteer'),
};
