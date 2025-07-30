// jest.config.js à la racine de backend
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  testTimeout: 20000,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: { branches: 60, functions: 60, lines: 60, statements: 60 }
  },
};
