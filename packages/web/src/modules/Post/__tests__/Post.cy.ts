import { PostActions } from './Post.cy.actions'
import {
    TOO_LONG_COMMENT,
    TOO_SHORT_COMMENT,
    VALID_COMMENT,
} from './Post.utils'

enum REQUESTS {
    CreateComment = 'CreateComment',
    CreateVote = 'CreateVote',
    GetPost = 'GetPost'
}

const ID = '8206bc5d-3556-4faa-9a65-e608612092b7'

describe('Post module', () => {
    const actions = new PostActions()

    it('should go back on a back button click', () => {
        cy.visit('/posts/8206bc5d-3556-4faa-9a65-e608612092b7')

        actions.clickBackButton()

        cy.checkRedirectUrl('/')
    })

    it('should create a positive vote on a post', () => {
        cy.interceptGraphQLRequest(REQUESTS.CreateVote)
        cy.interceptGraphQLRequest(REQUESTS.GetPost)

        cy.clearCookies()

        cy.visit(`/posts/${ID}`)

        cy
            .awaitQuery(REQUESTS.GetPost)
            .then(() => {
                cy.wait(1000)

                actions
                    .clickLikeButtonAndCheckCount()
                    .then(() => {
                        cy
                            .awaitQuery(REQUESTS.CreateVote)
                            .then((payload) => {
                                actions.checkPositiveVoteMutationHasBeenCalled(payload.response.body.data.createVote.vote.type)
                            })
                    })
            })
    })

    it('should create a negative vote on a post', () => {
        cy.interceptGraphQLRequest(REQUESTS.CreateVote)
        cy.interceptGraphQLRequest(REQUESTS.GetPost)

        cy.clearCookies()

        cy.visit(`/posts/${ID}`)

        cy
            .awaitQuery(REQUESTS.GetPost)
            .then(() => {
                cy.wait(1000)

                actions
                    .clickDislikeButtonAndCheckCount()
                    .then(() => {
                        cy
                            .awaitQuery(REQUESTS.CreateVote)
                            .then((payload) => {
                                actions.checkNegativeVoteMutationHasBeenCalled(payload.response.body.data.createVote.vote.type)
                            })
                    })
            })
    })

    it('should create a comment', () => {
        cy.interceptGraphQLRequest(REQUESTS.GetPost)
        cy.interceptGraphQLRequest(REQUESTS.CreateComment)

        cy.visit(`/posts/${ID}`)

        actions.typeComment(TOO_LONG_COMMENT)
        actions.clickPostButton()
        actions.checkMaxCharactersCommentInputFieldErrorExists()
        actions.typeComment(TOO_SHORT_COMMENT)
        actions.checkMinCharactersCommentInputFieldErrorExists()
        actions.typeComment(VALID_COMMENT)
        actions.checkCommentInputFieldErrorDoesNotExist()
        actions.clickPostButton()

        cy.wait(1000)

        cy
            .awaitQuery(REQUESTS.CreateComment)
            .then((payload) => {
                actions.checkCommentIsPosted(payload.response.body.data.createComment.comment.content)
            })
    })
})
