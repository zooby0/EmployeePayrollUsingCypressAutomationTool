const { install } = require('cypress-log-to-output');
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = (on, config) => {
  install(on);
  mochawesome(on);
  return config;
};