import { HomeActions } from './Home.cy.actions'

enum REQUESTS {
    CreateVote = 'CreateVote',
    GetPosts = 'GetPosts',
    CreatePost = "CreatePost"
}

describe('Home module', () => {
    const actions = new HomeActions()

    beforeEach(() => {
        cy.visit('/?skip=0')
    })

    it('should display posts', () => {
        cy.interceptGraphQLRequest(REQUESTS.GetPosts)

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

        actions.clickAgreeButtonAndCheckCount()

        cy
            .awaitQuery(REQUESTS.CreateVote)
            .then((payload) => {
                actions.checkPositiveVoteMutationHasBeenCalled(payload.response.body.data.createVote.vote.type)
            })
    })

    it('should create a negative vote on a post', () => {
        cy.interceptGraphQLRequest(REQUESTS.CreateVote)

        actions.clickDisagreeButtonAndCheckCount()

        cy
            .awaitQuery(REQUESTS.CreateVote)
            .then((payload) => {
                console.log('payload: ', payload)

                actions.checkNegativeVoteMutationHasBeenCalled(payload.response.body.data.createVote.vote.type)
            })
    })

    it('should create post', () => {
        cy.clearCookies()
        cy.interceptGraphQLRequest(REQUESTS.CreatePost)

        actions.clickPostButton()
        actions.typeText("This is a post")
        actions.typeEmail("john@gmail.com")
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
