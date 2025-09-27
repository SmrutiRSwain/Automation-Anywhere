const { defineConfig } = require("cypress");
const fs = require('fs');

const envData = JSON.parse(fs.readFileSync('cypress/fixtures/env.json'));

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout:15000,
    experimentalSessionAndOrigin: true,
    baseUrl: envData.baseUrl,
    env: {
      username: envData.username,
      password: envData.password
    },
    setupNodeEvents(on, config) {
    },
  },
});
