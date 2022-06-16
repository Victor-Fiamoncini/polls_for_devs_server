import { Config } from 'jest'

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1'
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '(/<rootDir>/.*|(\\.|/)(test|spec))\\.(js|ts)?$',
  tranform: {
    '.+\\.ts$': 'ts-jest'
  }
} as Config
