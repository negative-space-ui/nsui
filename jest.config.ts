import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['@testing-library/jest-dom'],

  roots: ['<rootDir>/packages'],

  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts', '**/?(*.)+(spec|test).tsx'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/packages/$1'
  },

  collectCoverageFrom: ['packages/**/*.ts', 'packages/**/*.tsx', '!packages/**/*.d.ts'],

  coverageDirectory: '<rootDir>/coverage',

  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
}

export default config
