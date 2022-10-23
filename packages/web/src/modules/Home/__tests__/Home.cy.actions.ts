import { VoteTypeEnum } from '../../../graphql/types.generated'

export class HomeActions {
    public elements

    constructor() {
        this.elements = {
            agreeButton: () => cy.getBySelector('agree-button-1'),
            alreadyPostedNotification: () => cy.getBySelector('already-posted-notification'),
            cancelSubmitPostButton: () => cy.getBySelector('cancel-submit-post-button'),
            disagreeButton: () => cy.getBySelector('disagree-button-1'),
            emailInputField: () => cy.getBySelector('email-input-field'),
            negativeVoteCount: () => cy.getBySelector('negative-vote-count-1'),
            nextButton: () => cy.getBySelector('next-button'),
            positiveVoteCount: () => cy.getBySelector('positive-vote-count-1'),
            postButton: () => cy.getBySelector('post-button'),
            postHint: () => cy.getBySelector('post-hint'),
            postList: () => cy.getBySelector('post-list'),
            previousButton: () => cy.getBySelector('previous-button'),
            submitPostButton: () => cy.getBySelector('submit-post-button'),
            textInputField: () => cy.getBySelector('text-input-field'),
        }
    }

    public checkAlreadyPostedNotificationExists() {
        return this
            .elements
            .alreadyPostedNotification()
            .should('exist')
    }

    public checkEmailInputFieldErrorDoesNotExist() {
        return this
            .emailInputFieldErrorText()
            .should('not.exist')
    }

    public checkEmailInputFieldIsEmpty() {
        return this
            .elements
            .emailInputField()
            .should('not.contain.value')
    }

    public checkMaxCharactersEmailInputFieldErrorExists() {
        return this
            .emailInputFieldErrorText()
            .should('contain.text', 'Can\'t be longer than 100 characters')
    }

    public checkMaxCharactersTextInputFieldErrorExists() {
        return this
            .textInputFieldErrorText()
            .should('contain.text', 'Can\'t be longer than 15000 characters')
    }

    public checkMinCharactersTextInputFieldErrorExists() {
        return this
            .textInputFieldErrorText()
            .should('contain.text', 'Has to be more than 4 characters')
    }

    public checkNegativeVoteMutationHasBeenCalled(type: string) {
        expect(type).to.equal(VoteTypeEnum.Negative)
    }

    public checkNextButtonIsDisabled() {
        return this
            .elements
            .nextButton()
            .should('be.disabled')
    }

    public checkPositiveVoteMutationHasBeenCalled(type: string) {
        expect(type).to.equal(VoteTypeEnum.Positive)
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

    public checkPostListHasCorrectLength() {
        return this
            .elements
            .postList()
            .children()
            .should('have.length', 51)
    }

    public checkPostWasCreatedWithPostText(text: string) {
        return this
            .elements
            .postList()
            .first()
            .should('contain.text', text)
    }

    public checkPreviousButtonIsDisabled() {
        return this
            .elements
            .previousButton()
            .should('be.disabled')
    }

    public checkPreviousButtonIsNotDisabled() {
        return this
            .elements
            .previousButton()
            .should('not.be.disabled')
    }

    public checkSkipURLParamIsSetCorrectly(amount: number) {
        return cy
            .url()
            .should('include', `skip=${amount}`)
    }

    public checkSubmitPostButtonIsDisabled() {
        return this
            .elements
            .submitPostButton()
            .should('be.disabled')
    }

    public checkTextInputFieldErrorDoesNotExist() {
        return this
            .textInputFieldErrorText()
            .should('not.exist')
    }

    public checkTextInputFieldIsEmpty() {
        return this
            .elements
            .textInputField()
            .should('not.contain.value')
    }

    public checkWrongEmailInputFieldErrorExists() {
        return this
            .emailInputFieldErrorText()
            .should('contain.text', 'Must be a valid email.')
    }

    public clickAgreeButton() {
        return this
            .elements
            .agreeButton()
            .click()
    }

    public clickAgreeButtonAndCheckCount() {
        return this
            .elements
            .positiveVoteCount()
            .then(($currentCount) => {
                let currentCount = Number.parseFloat($currentCount.text())

                if (Number.isNaN(currentCount)) {
                    currentCount = 0
                }

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

    public clickCancelSubmitButton() {
        return this
            .elements
            .cancelSubmitPostButton()
            .click()
    }

    public clickDisagreeButtonAndCheckCount() {
        return this
            .elements
            .negativeVoteCount()
            .then(($currentCount) => {
                let currentCount = Number.parseFloat($currentCount.text())

                if (Number.isNaN(currentCount)) {
                    currentCount = 0
                }

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

    public clickNextButton() {
        return this
            .elements
            .nextButton()
            .click()
    }

    public clickPostButton() {
        return this
            .elements
            .postButton()
            .click()
    }

    public clickPreviousButton() {
        return this
            .elements
            .previousButton()
            .click()
    }

    public clickSubmitPostButton() {
        return this
            .elements
            .submitPostButton()
            .click()
    }

    public typeCorrectEmail() {
        return this.typeEmail('john@gmail.com')
    }

    public typeCorrectText() {
        return this.typeText('Hello this is a post.')
    }

    public typeEmail(text: string) {
        return this
            .elements
            .emailInputField()
            .clear({ force: true })
            .type(text)
    }

    public typeEmailOverMaxLimit() { // cspell:disable-next-line
        return this.typeEmail('something@emaillllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll.com')
    }

    public typeText(text: string) {
        return this
            .elements
            .textInputField()
            .clear({ force: true })
            .type(text)
    }

    public typeTextOverMaxLimit() {
        return this
            .elements
            .textInputField()
            .invoke('val', 'sd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfoisdjfsd9ofjsdjfois')
    }

    public typeTextUnderMinLimit() {
        return this.typeText('Hi')
    }

    public typeWrongEmailFormat() {
        return this.typeEmail('hi')
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

    private textInputFieldErrorText() {
        return this
            .elements
            .textInputField()
            .parent()
            .parent()
            .children()
            .eq(2)
    }
}
