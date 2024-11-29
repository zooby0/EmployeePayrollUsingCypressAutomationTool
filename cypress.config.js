const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');
const { install } = require('cypress-log-to-output');

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    specPattern: "cypress/e2e/payroll/createPunch.spec.js",
    setupNodeEvents(on, config) {
      // Setup cypress-log-to-output
      install(on);

      // Setup cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // Cleanup .jsons folder before each run
      on('after:run', (results) => {
        // Ensure the reports are generated after the tests are completed
        require('cypress-mochawesome-reporter').generate({
          reportDir: 'cypress/reports',
          overwrite: false,
          html: true,
          json: true,
        });
      });
      

      return config;
    },
  },
  video: true,
  videoCompression: 32,
  videosFolder: 'cypress/videos',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
});
