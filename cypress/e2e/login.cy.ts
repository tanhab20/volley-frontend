import * as cypress from "cypress";

describe('Login Test for kavolley.uber.space', () => {
    it('should navigate to the site and log in', () => {
        cy.visit('https://kavolley.uber.space/'); // Besuche die Seite

        // Stelle sicher, dass die Login-Seite geladen ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Fülle die Login-Felder aus und sende das Formular ab
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password', { log: false });
        cy.get('button[type="submit"]').click();

        // Überprüfe, ob die Navigation zur Turnier-Seite erfolgt ist
        cy.url().should('include', '/tournaments');
    });
});
