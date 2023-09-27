const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ob7k32",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://testqa.purse.tech'
  },
});
