const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    specPattern: "/Users/braziltest/sources/repos/cypress/e2e/**/*.spec.js", 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
