const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: '/Users/braziltest/sources/repos/cypress/e2e/**/*.spec.js',
    supportFile: false
  }
})

