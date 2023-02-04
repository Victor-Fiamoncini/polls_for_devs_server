import { Config } from 'jest'

export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['lcov', 'json'],
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  moduleNameMapper: {
    '@/data/(.*)': '<rootDir>/src/data/$1',
    '@/domain/(.*)': '<rootDir>/src/domain/$1',
    '@/infra/(.*)': '<rootDir>/src/infra/$1',
    '@/main/(.*)': '<rootDir>/src/main/$1',
    '@/presentation/(.*)': '<rootDir>/src/presentation/$1',
    '@/validation/(.*)': '<rootDir>/src/validation/$1',
  },
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.(spec|test).ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
} as Config
