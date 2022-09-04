import './commands'

export namespace JQuery { }

declare global {
    interface Window {
        gtag: any // TODO: fix any
    }
    namespace Cypress {
        interface Chainable {
            awaitQuery(graphqlOperation: string): Cypress.Chainable
            getBySelector(selector: string): Chainable<JQuery>
            interceptGraphQLRequest(operationName: string): Chainable<Element>
        }
    }
}
