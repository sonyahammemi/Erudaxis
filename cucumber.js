module.exports = {
  default: {
    require: [
      'tests/configEnv/env-loader.ts',  
      'tests/fixtures/world.ts',
      'tests/hooks/**/*.ts',
      'tests/step-definitions/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'allure-cucumberjs/reporter',
      'html:cucumber-report.html'
    ],
    formatOptions: {
      resultsDir: 'allure-results'    
    },
    paths: ['tests/features/**/*.feature'],
    defaultTimeout: 120000
  }
};