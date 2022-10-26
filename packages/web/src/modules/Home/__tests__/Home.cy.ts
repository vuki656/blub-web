import { HomeActions } from './Home.cy.actions'

enum REQUESTS {
    CreatePost = 'CreatePost',
    CreateVote = 'CreateVote',
    GetPosts = 'GetPosts'
}

describe('Home module', () => {
    const actions = new HomeActions()

    it('should display posts', () => {
        cy.interceptGraphQLRequest(REQUESTS.GetPosts)
        cy.visit('/?skip=0')

        cy
            .awaitQuery(REQUESTS.GetPosts)
            .then(() => {
                actions.checkSkipURLParamIsSetCorrectly(0)
                actions.checkPostHintDoesNotExist()
                actions.checkPostListHasCorrectLength()
                actions.checkPreviousButtonIsDisabled()
                actions.clickNextButton()
                actions.checkSkipURLParamIsSetCorrectly(50)
                actions.checkPreviousButtonIsNotDisabled()
                actions.clickPreviousButton()
                actions.checkSkipURLParamIsSetCorrectly(0)
                actions.clickNextButton()
                actions.checkNextButtonIsDisabled()
                actions.checkPostHintExists()
            })
    })

    it('should create a positive vote on a post', () => {
        cy.interceptGraphQLRequest(REQUESTS.CreateVote)
        cy.visit('/?skip=0')

        actions.clickAgreeButtonAndCheckCount()

        cy
            .awaitQuery(REQUESTS.CreateVote)
            .then((payload) => {
                actions.checkPositiveVoteMutationHasBeenCalled(payload.response.body.data.createVote.vote.type)
            })
    })

    it('should create a negative vote on a post', () => {
        cy.interceptGraphQLRequest(REQUESTS.CreateVote)
        cy.visit('/?skip=0')

        actions.clickDisagreeButtonAndCheckCount()

        cy
            .awaitQuery(REQUESTS.CreateVote)
            .then((payload) => {
                actions.checkNegativeVoteMutationHasBeenCalled(payload.response.body.data.createVote.vote.type)
            })
    })

    it('should create post', () => {
        cy.interceptGraphQLRequest(REQUESTS.CreatePost)
        cy.visit('/?skip=0')

        actions.clickPostButton()
        actions.typeText('This is a post')
        actions.typeEmail('john@gmail.com')
        actions.clickCancelSubmitButton()
        actions.clickPostButton()
        actions.checkTextInputFieldIsEmpty()
        actions.checkEmailInputFieldIsEmpty()
        actions.typeTextUnderMinLimit()
        actions.clickSubmitPostButton()
        actions.checkMinCharactersTextInputFieldErrorExists()
        actions.typeTextOverMaxLimit()
        actions.clickSubmitPostButton()
        actions.checkMaxCharactersTextInputFieldErrorExists()
        actions.typeCorrectText()
        actions.checkTextInputFieldErrorDoesNotExist()
        actions.typeWrongEmailFormat()
        actions.checkWrongEmailInputFieldErrorExists()
        actions.typeEmailOverMaxLimit()
        actions.checkMaxCharactersEmailInputFieldErrorExists()
        actions.typeCorrectEmail()
        actions.checkEmailInputFieldErrorDoesNotExist()
        actions.clickSubmitPostButton()

        cy
            .awaitQuery(REQUESTS.CreatePost)
            .then((payload) => {
                actions.checkPostWasCreatedWithPostText(payload.response.body.data.createPost.post.text)
            })

        actions.clickPostButton()
        actions.checkSubmitPostButtonIsDisabled()
        actions.checkAlreadyPostedNotificationExists()
    })
})
