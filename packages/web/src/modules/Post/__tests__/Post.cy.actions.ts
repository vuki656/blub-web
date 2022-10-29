import { VoteTypeEnum } from '../../../graphql/types.generated'

export class PostActions {
    public elements

    constructor() {
        this.elements = {
            backButton: () => cy.getBySelector('back-button'),
            commentInput: () => cy.getBySelector('comment-input'),
            comments: () => cy.getBySelector('comments'),
            dislikeButton: () => cy.getBySelector('dislike-button'),
            likeButton: () => cy.getBySelector('like-button'),
            negativeVoteCount: () => cy.getBySelector('negative-vote-count'),
            positiveVoteCount: () => cy.getBySelector('positive-vote-count'),
            postButton: () => cy.getBySelector('post-comment-button'),
        }
    }

    public checkCommentInputFieldErrorDoesNotExist() {
        return this
            .commentInputFieldErrorText()
            .should('not.exist')
    }

    public checkCommentIsPosted(comment: string) {
        this
            .elements
            .comments()
            .children()
            .eq(1)
            .should('contain', comment)
    }

    public checkMaxCharactersCommentInputFieldErrorExists() {
        return this
            .commentInputFieldErrorText()
            .should('contain.text', 'Can\'t be longer than 10 000 characters')
    }

    public checkMinCharactersCommentInputFieldErrorExists() {
        return this
            .commentInputFieldErrorText()
            .should('contain.text', 'Has to be more than 4 characters')
    }

    public checkNegativeVoteMutationHasBeenCalled(type: string) {
        expect(type).to.equal(VoteTypeEnum.Negative)
    }

    public checkPositiveVoteMutationHasBeenCalled(type: string) {
        expect(type).to.equal(VoteTypeEnum.Positive)
    }

    public clickBackButton() {
        this
            .elements
            .backButton()
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

    public clickPostButton() {
        this
            .elements
            .postButton()
            .click()
    }

    public typeComment(text: string) {
        cy.typeText(this.elements.commentInput, text)
    }

    private commentInputFieldErrorText() {
        return this
            .elements
            .commentInput()
            .parent()
            .parent()
            .children()
            .eq(2)
    }
}
