module.exports = {
    preset: 'jest-preset-angular',
    roots: ['src'],
    testMatch: ['**/*.spec.ts'],
    setupFilesAfterEnv: ['./setup-jest.ts'],
    coverageReporters: ['html', 'text', 'text-summary'],
    collectCoverageFrom: ['<rootDir>/src/app/**/*.ts', '!<rootDir>/src/app/**/*.module.ts', '!<rootDir>/src/app/**/*mock.service.ts'],
    collectCoverage: true,
    testPathIgnorePatterns: ['<rootDir>/node_modules']
  };