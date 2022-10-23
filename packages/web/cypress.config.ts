import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        env: {
            API_URL: 'http://localhost:8080/graphql',
        },
        port: 8089,
        screenshotOnRunFailure: false,
        specPattern: '**/*.cy.ts',
        supportFile: './src/cypress/support/signatures.ts',
        video: false,
    },
})
