module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {},
  modulePathIgnorePatterns: [ './out' ],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts']
};
