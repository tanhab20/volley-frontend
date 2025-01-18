import * as cypress from "cypress";

describe('Edit Tournament', () => {

    it('should fill the edit form with the correct tournament data', () => {
        cy.visit('https://kavolley.uber.space/');

        // Sicherstellen, dass alles geladen ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Ausfüllen der Login-Daten
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('h2').invoke('text').as('tournamentName');  // Turniername speichern
            cy.get('#datum').invoke('text').as('tournamentDate');  // Datum speichern
            cy.get('#ort').invoke('text').as('tournamentLocation');  // Veranstaltungsort speichern
            cy.get('#dauer').invoke('text').as('tournamentDuration');
            cy.get('button.edi').click();
        });

        cy.url().should('include', '/edit-tournament/');

        cy.get('@tournamentName').then((name) => {
            cy.get('input[name="name"]').should('have.value', name);
        });

        cy.get('@tournamentDate').then((date) => {
            cy.get('input[name="date"]').should('have.value', date);
        });

        cy.get('@tournamentLocation').then((location) => {
            cy.get('input[name="location"]').should('have.value', location);
        });

        cy.get('@tournamentDuration').then((duration) => {
            cy.get('input[name="duration"]').should('have.value', duration);
        });
    });
});
