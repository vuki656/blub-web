import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        specPattern: '**/*.cy.ts',
        supportFile: './src/cypress/support/e2e.ts',
        baseUrl: "http://localhost:3000",
        port: 8089,
        env: {
            API_URL: 'http://localhost:8080/graphql'
        },
    },
})
