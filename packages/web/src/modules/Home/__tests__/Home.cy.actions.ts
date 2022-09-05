import { VoteTypeEnum } from '../../../graphql/types.generated'

export class HomeActions {
    public elements

    constructor() {
        this.elements = {
            agreeButton: () => cy.getBySelector('agree-button-1'),
            cancelSubmitPostButton: () => cy.getBySelector('cancel-submit-post-button'),
            disagreeButton: () => cy.getBySelector('disagree-button-1'),
            emailInputField: () => cy.getBySelector('email-input-field'),
            negativeVoteCount: () => cy.getBySelector('negative-vote-count-1'),
            alreadyPostedNotification: () => cy.getBySelector('already-posted-notification'),
            nextButton: () => cy.getBySelector('next-button'),
            positiveVoteCount: () => cy.getBySelector('positive-vote-count-1'),
            postButton: () => cy.getBySelector('post-button'),
            postHint: () => cy.getBySelector('post-hint'),
            textInputField: () => cy.getBySelector('text-input-field'),
            postList: () => cy.getBySelector('post-list'),
            submitPostButton: () => cy.getBySelector('submit-post-button'),
            previousButton: () => cy.getBySelector('previous-button'),
        }
    }

    public clickPostButton() {
        return this
            .elements
            .postButton()
            .click()
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
            .should('be.disabled')
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
            .should('be.disabled')
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

    public checkPositiveVoteMutationHasBeenCalled(type: string) {
        expect(type).to.equal(VoteTypeEnum.Positive)
    }

    public checkNegativeVoteMutationHasBeenCalled(type: string) {
        expect(type).to.equal(VoteTypeEnum.Negative)
    }

    public clickSubmitPostButton() {
        return this
            .elements
            .submitPostButton()
            .click()
    }

    public clickDisagreeButtonAndCheckCount() {
        return this
            .elements
            .negativeVoteCount()
            .then(($currentCount) => {
                const currentCount = Number.parseFloat($currentCount.text())

                this
                    .elements
                    .disagreeButton()
                    .click()
                    .then(($newCount) => {
                        const newCount = Number.parseFloat($newCount.text())

                        expect(newCount).to.eq(currentCount + 1)
                    })
            })
    }

    public clickAgreeButtonAndCheckCount() {
        return this
            .elements
            .positiveVoteCount()
            .then(($currentCount) => {
                const currentCount = Number.parseFloat($currentCount.text())

                this
                    .elements
                    .agreeButton()
                    .click()
                    .then(($newCount) => {
                        const newCount = Number.parseFloat($newCount.text())

                        expect(newCount).to.eq(currentCount + 1)
                    })
            })
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
            .should('exist')
    }

    public checkMinCharactersTextInputFieldErrorExists() {
        return this
            .textInputFieldErrorText()
            .should("contain.text", "Has to be more than 4 characters")
    }

    public typeTextUnderMinLimit() {
        return this.typeText("Hi")
    }

    public typeTextOverMaxLimit() {
        return this
            .elements
            .textInputField()
            .invoke('val', 'sd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfois')
    }

    public checkMaxCharactersTextInputFieldErrorExists() {
        return this
            .textInputFieldErrorText()
            .should("contain.text", "Can\'t be longer than 15000 characters")
    }

    public typeCorrectText() {
        return this.typeText("Hello this is a post.")
    }

    public checkTextInputFieldErrorDoesNotExist() {
        return this
            .textInputFieldErrorText()
            .should('not.exist')
    }

    public typeWrongEmailFormat() {
        return this.typeEmail("hi")
    }

    public checkMaxCharactersEmailInputFieldErrorExists() {
        return this
            .emailInputFieldErrorText()
            .should("contain.text", "Can\'t be longer than 100 characters")
    }

    public typeEmailOverMaxLimit() { // cspell:disable-next-line
        return this.typeEmail("something@emaillllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll.com")
    }

    public typeCorrectEmail() {
        return this.typeEmail("john@gmail.com")
    }

    public checkEmailInputFieldErrorDoesNotExist() {
        return this
            .emailInputFieldErrorText()
            .should("not.exist")
    }

    public checkPostWasCreatedWithPostText(text: string) {
        return this
            .elements
            .postList()
            .first()
            .should("contain.text", text)
    }

    public checkSubmitPostButtonIsDisabled() {
        return this
            .elements
            .submitPostButton()
            .should("be.disabled")
    }

    public checkAlreadyPostedNotificationExists() {
        return this
            .elements
            .alreadyPostedNotification()
            .should("exist")
    }

    private textInputFieldErrorText() {
        return this
            .elements
            .textInputField()
            .parent()
            .parent()
            .children()
            .eq(2)
    }

    public checkWrongEmailInputFieldErrorExists() {
        return this
            .emailInputFieldErrorText()
            .should("contain.text", "Must be a valid email.")
    }

    public typeEmail(text: string) {
        return this
            .elements
            .emailInputField()
            .clear({ force: true })
            .type(text)
    } 

    public typeText(text: string) {
        return this
            .elements
            .textInputField()
            .clear({ force: true })
            .type(text)
    }

    public clickCancelSubmitButton() {
        return this
            .elements
            .cancelSubmitPostButton()
            .click()
    }

    public checkTextInputFieldIsEmpty() {
        return this
            .elements
            .textInputField()
            .should("not.contain.value")
    }

    public checkEmailInputFieldIsEmpty() {
        return this
            .elements
            .emailInputField()
            .should("not.contain.value")
    }

    private emailInputFieldErrorText() {
        return this
            .elements
            .emailInputField()
            .parent()
            .parent()
            .children()
            .eq(3)
    }
}
