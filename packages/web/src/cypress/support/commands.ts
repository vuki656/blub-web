function getBySelector(selector: string): Cypress.Chainable {
    return cy.get(`[data-cy=${selector}]`)
}

function awaitQuery(graphqlOperation: string): Cypress.Chainable {
    return cy.wait(`@${graphqlOperation}`, { timeout: 10_000 })
}

function interceptGraphQLRequest(operationName: string): void {
    cy.intercept(Cypress.env('API_URL'), (request) => {
        const hasOperationName = Object.prototype.hasOwnProperty.call(request.body, 'operationName')
        const operationNameMatches = request.body.operationName === operationName

        if (hasOperationName && operationNameMatches) {
            request.alias = `${operationName}`
        }
    })
}

Cypress.Commands.add('interceptGraphQLRequest', interceptGraphQLRequest)
Cypress.Commands.add('getBySelector', getBySelector)
Cypress.Commands.add('awaitQuery', awaitQuery)

export { }
