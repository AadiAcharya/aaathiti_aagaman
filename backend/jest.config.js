module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/env.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/db.setup.js'],
  testTimeout: 15000,
  // uuid ships ESM-only; stub it since payment routes are out of test scope
  moduleNameMapper: {
    '^uuid$': '<rootDir>/tests/mocks/uuid.js',
  },
};
