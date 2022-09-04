export class HomeActions {
    public elements

    constructor() {
        this.elements = {
            postList: () => cy.getBySelector('post-list'),
            agreeButton: () => cy.getBySelector('agree-button-1'),
            disagreeButton: () => cy.getBySelector('disagree-button-1'),
            previousButton: () => cy.getBySelector('previous-button'),
            nextButton: () => cy.getBySelector('next-button'),
            postHint: () => cy.getBySelector('post-hint'),
        }
    }

    public checkPostListHasCorrectLength() {
        return this
            .elements
            .postList()
            .children()
            .should('have.length', 51)
    }

    public checkPreviousButtonIsDisabled() {
        return this
            .elements
            .previousButton()
            .should("be.disabled")
    }

    public clickNextButton() {
        return this
            .elements
            .nextButton()
            .click()
    }

    public clickPreviousButton() {
        return this
            .elements
            .previousButton()
            .click()
    }

    public checkNextButtonIsDisabled() {
        return this
            .elements
            .nextButton()
            .should("be.disabled")
    }

    public checkSkipURLParamIsSetCorrectly(amount: number) {
        return cy
            .url()
            .should('include', `skip=${amount}`)
    }

    public clickAgreeButton() {
        return this
            .elements
            .agreeButton()
            .click()
    }

    public checkAgreeButtonVoteCountIncreased() {
        return this
            .elements
            .agreeButton()
            .should("be.a.")
    }

    public checkPreviousButtonIsNotDisabled() {
        return this
            .elements
            .previousButton()
            .should('not.be.disabled')
    }

    public checkPostHintDoesNotExist() {
        return this
            .elements
            .postHint()
            .should('not.exist')
    }

    public checkPostHintExists() {
        return this
            .elements
            .postHint()
            .should("exist")
    }
}
