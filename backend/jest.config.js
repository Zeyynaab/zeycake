// jest.config.js à la racine de backend
module.exports = {
  testEnvironment: 'node',
  //Exclut la config 
  coveragePathIgnorePatterns: [
    "/src/app.js",
    "/src/server.js",
    "/src/config/",
    "/src/routes/"
  ],
  // Pour couvrir que controllers & services :
  collectCoverageFrom: [
    "src/controllers/**/*.js",
    "src/services/**/*.js"
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  testTimeout: 20000,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: { branches: 60, functions: 60, lines: 60, statements: 60 }
  },
};
