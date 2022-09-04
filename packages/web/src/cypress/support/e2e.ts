import './commands'

export namespace JQuery { }

declare global {
    interface Window {
        gtag: any // TODO: fix any
    }
    namespace Cypress {
        interface Chainable {
            getBySelector(selector: string): Chainable<JQuery>
        }
    }
}
