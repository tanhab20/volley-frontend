import * as cypress from "cypress";
describe('Turniere Seite - Performance Test', () => {

    it('should load the tournament list within 2 seconds', () => {
        cy.visit('https://kavolley.uber.space/');

        // damit stellt man sicher, dass alles geladen ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // ausfüllen der felder
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();


        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');
        const startTime = performance.now();

        cy.visit('https://kavolley.uber.space');

        const endTime = performance.now();
        const loadTime = endTime - startTime;


        expect(loadTime).to.be.lessThan(2000);
    });

});
