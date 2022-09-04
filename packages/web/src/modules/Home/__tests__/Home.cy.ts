import { HomeActions } from './Home.cy.actions'

enum REQUESTS {
    GetPosts = 'GetPosts'
}

describe('Home module', () => {
    const actions = new HomeActions()

    beforeEach(() => {
        cy.interceptGraphQLRequest(REQUESTS.GetPosts)

        cy.visit('/?skip=0')
    })

    it('should display posts', () => {
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
})
