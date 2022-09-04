export class HomeActions {
    public elements

    constructor() {
        this.elements = {
            postList: () => cy.getBySelector('post-list'),
        }
    }
}
