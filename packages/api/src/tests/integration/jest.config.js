/** @type { import('ts-jest/dist/types').InitialOptionsTsJest } */
module.exports = {
    globalSetup: './setup.ts',
    globalTeardown: './teardown.ts',
    setupFilesAfterEnv: ['./fileSetup.ts'],
    slowTestThreshold: 15,
    testEnvironment: 'node',
    preset: 'ts-jest',
    testMatch: ['**/?*.test.ts'],
    verbose: false,
}
