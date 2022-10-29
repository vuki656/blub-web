import { VoteTypeEnum } from '../../../graphql/types.generated'

export class HomeActions {
    public elements

    constructor() {
        this.elements = {
            alreadyPostedNotification: () => cy.getBySelector('already-posted-notification'),
            cancelSubmitPostButton: () => cy.getBySelector('cancel-submit-post-button'),
            dislikeButton: () => cy.getBySelector('dislike-button-1'),
            emailInputField: () => cy.getBySelector('email-input-field'),
            likeButton: () => cy.getBySelector('like-button-1'),
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

    public clickCancelSubmitButton() {
        return this
            .elements
            .cancelSubmitPostButton()
            .click()
    }

    public clickDislikeButtonAndCheckCount() {
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
                    .dislikeButton()
                    .click()
                    .then(() => {
                        this
                            .elements
                            .negativeVoteCount()
                            .should('contain.text', currentCount + 1)
                    })
            })
    }

    public clickLikeButton() {
        return this
            .elements
            .likeButton()
            .click()
    }

    public clickLikeButtonAndCheckCount() {
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
                    .likeButton()
                    .click()
                    .then(() => {
                        this
                            .elements
                            .positiveVoteCount()
                            .should('contain.text', currentCount + 1)
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
        return cy.typeText(this.elements.emailInputField, text)
    }

    public typeEmailOverMaxLimit() { // cspell:disable-next-line
        return this.typeEmail('something@emaillllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll.com')
    }

    public typeText(text: string) {
        return cy.typeText(this.elements.textInputField, text)
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
