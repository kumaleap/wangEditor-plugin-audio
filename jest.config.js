module.exports = {
  roots: ['<rootDir>/test'],
  testEnvironment: 'jsdom',
  testMatch: ['**/(*.)+(spec|test).+(ts|js|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/test/setup/stylesMock.js',
    // 确保使用正确的DOM7版本
    'dom7': '<rootDir>/node_modules/dom7/dist/dom7.js',
  },
  transformIgnorePatterns: ['node_modules'],
  setupFilesAfterEnv: ['<rootDir>/test/setup/index.ts'],
}
