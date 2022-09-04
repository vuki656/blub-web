function getBySelector(selector: string): Cypress.Chainable {
    return cy.get(`[data-cy=${selector}]`)
}

Cypress.Commands.add('getBySelector', getBySelector)

export {}
