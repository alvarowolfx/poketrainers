process.env.NODE_ENV = 'test';

const createJestConfig = require('./utils/createJestConfig');
const jest = require('jest');
const path = require('path');
const paths = require('../config/paths');

const argv = process.argv.slice(2);

// Watch unless on CI
if (!process.env.CI) {
  argv.push('--watch');
}

argv.push('--config', JSON.stringify(createJestConfig(
  relativePath => path.resolve(__dirname, '..', relativePath),
  path.resolve(paths.appSrc, '..')
)));

jest.run(argv);
