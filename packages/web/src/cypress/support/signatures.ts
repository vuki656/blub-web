import './commands'

export namespace JQuery { }

declare global {
    interface Window {
        gtag: any // TODO: fix any
    }
    namespace Cypress {
        interface Chainable {
            awaitQuery(graphqlOperation: string): Cypress.Chainable
            checkRedirectUrl(url: string): Chainable
            getBySelector(selector: string): Chainable<JQuery>
            interceptGraphQLRequest(operationName: string): Chainable<Element>
            typeText(selector: () => Cypress.Chainable<JQuery>, text: string): Cypress.Chainable
        }
    }
}
