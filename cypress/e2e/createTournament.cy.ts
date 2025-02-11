import * as cypress from "cypress";


describe('Tournament Form', () => {
    it('should fill out the form and submit successfully', () => {
        cy.visit('https://kavolley.uber.space/');

        // Login
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        // Stelle sicher, dass die richtige Seite geladen wurde
        cy.visit('https://kavolley.uber.space/');


        // Navigiere zur Formularseite
        cy.get('.navbar-link').contains('Form').click();
        cy.url().should('include', '/form');

        const tournamentData = {
            name: 'Test Turnier',
            date: '2024-10-05',
            venue: 'Sporthalle 1',
            duration: '2 Stunden',
            description: 'Ein spannendes Test-Turnier'
        };

        // Fülle das Formular aus
        cy.get('input[id="name"]').type(tournamentData.name);
        cy.get('input[id="date"]').type(tournamentData.date);
        cy.get('input[id="venue"]').type(tournamentData.venue);
        cy.get('input[id="duration"]').type(tournamentData.duration);
        cy.get('textarea[id="description"]').type(tournamentData.description);

        // Stelle sicher, dass der Button sichtbar ist, und klicke
        cy.get('button[id="submitButton"]').should('be.visible').click();

        // Stelle sicher, dass die Übersicht geladen wurde
        cy.url().should('include', '/overview');

        // Stelle sicher, dass der Button sichtbar ist, und klicke
        cy.get('button[id="submitButton"]').should('be.visible').click();

    });
});
