import * as cypress from "cypress";

describe('Login Test for kavolley.uber.space', () => {
    it('should navigate to the site and log in', () => {
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

    });
});
