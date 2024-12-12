const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // implement node event listeners here
      supportFile: './cypress/support/e2e.ts'
    },
    specPattern:"./cypress/handleWait/**.*",
  },
});
