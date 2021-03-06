import { Config } from 'jest'

export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['lcov', 'json'],
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1'
  },
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.(spec|test).ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
} as Config
