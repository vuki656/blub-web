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

function checkRedirectUrl(url: string): Cypress.Chainable {
    return cy
        .location()
        .should((location) => {
            expect(location.pathname)
                .to
                .eq(url)
        })
}

/*
 * `Invoke` instantly types but doesn't trigger validation, so we instantly
 * type all but last character and normally type the last character
 * to trigger the validation
 */
function typeText(selector: () => Cypress.Chainable<JQuery>, text: string): Cypress.Chainable {
    return selector()
        .scrollIntoView()
        .clear({ force: true })
        .invoke('val', text.slice(0, - 1))
        .type(text.at(-1) ?? '')
}

Cypress.Commands.add('checkRedirectUrl', checkRedirectUrl)
Cypress.Commands.add('typeText', typeText)
Cypress.Commands.add('interceptGraphQLRequest', interceptGraphQLRequest)
Cypress.Commands.add('getBySelector', getBySelector)
Cypress.Commands.add('awaitQuery', awaitQuery)

Cypress.Keyboard.defaults({
    keystrokeDelay: 0,
})

export { }
