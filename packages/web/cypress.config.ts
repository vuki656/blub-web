import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        env: {
            API_URL: 'http://localhost:8080/graphql',
        },
        port: 8089,
        specPattern: '**/*.cy.ts',
        supportFile: './src/cypress/support/e2e.ts',
        video: true,
    },
})
