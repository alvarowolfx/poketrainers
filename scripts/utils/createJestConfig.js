const pathExists = require('path-exists');
const paths = require('../../config/paths');

module.exports = (resolve, rootDir) => {
  const setupFiles = [resolve('config/polyfills.js')];
  if (pathExists.sync(paths.testsSetup)) {
    setupFiles.push(paths.testsSetup);
  }

  const config = {
    moduleFileExtensions: ['jsx', 'js', 'json'],
    moduleNameMapper: {
      '^[./a-zA-Z0-9$_-]+\\.(jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm)$': resolve('config/jest/FileStub.js'),
      '^[./a-zA-Z0-9$_-]+\\.css$': resolve('config/jest/CSSStub.js')
    },
    scriptPreprocessor: resolve('config/jest/transform.js'),
    setupFiles: setupFiles,
    testPathIgnorePatterns: ['<rootDir>/(build|docs|node_modules)/'],
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$',
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }
  return config;
};
