import * as cypress from "cypress";
describe('Navbar Tests', () => {
    it('zeigt den "Form"-Link nicht an, wenn der Benutzer kein Administrator ist', () => {
        // Besuch der Website
        cy.visit('https://kavolley.uber.space/');

        // Sicherstellen, dass die Login-Elemente sichtbar sind
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Anmelden mit einem normalen Benutzer (kutlub20)
        cy.get('input#username').type('kutlub20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        // Sicherstellen, dass der Benutzer zur Turnier-Seite weitergeleitet wird
        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');

        // Sicherstellen, dass der "Form"-Link nicht sichtbar ist
        cy.get('.navbar-link').contains('Form').should('not.exist');
    });

    it('zeigt den "Form"-Link an, wenn der Benutzer ein Administrator ist', () => {
        // Besuch der Website
        cy.visit('https://kavolley.uber.space/');

        // Sicherstellen, dass die Login-Elemente sichtbar sind
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Anmelden mit einem Administrator (tanhab20)
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        // Sicherstellen, dass der Benutzer zur Turnier-Seite weitergeleitet wird
        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');

        // Sicherstellen, dass der "Form"-Link sichtbar ist
        cy.get('.navbar-link').contains('Form').should('be.visible');
    });
});
