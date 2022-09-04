import { HomeActions } from "./Home.cy.actions"

describe('Home module', () => {
    const actions = new HomeActions()

    beforeEach(() => {
        cy.visit('/')
    })

    it('test', () => {
        actions.elements.postList().should('exist')
    })
})
