import * as cypress from "cypress";

describe('Delete Tournament', () => {
    it('should delete the first tournament and ensure it is no longer in the list', () => {
        cy.visit('https://kavolley.uber.space/');

        // Sicherstellen, dass Login sichtbar ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Ausfüllen der Login-Daten
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space/');

        // Speichern der Daten des obersten Turniers
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('h2').invoke('text').as('tournamentName');  // Turniername speichern
            cy.get('#datum').invoke('text').as('tournamentDate');  // Datum speichern
            cy.get('#ort').invoke('text').as('tournamentLocation');  // Veranstaltungsort speichern
            cy.get('#dauer').invoke('text').as('tournamentDuration');  // Dauer speichern
        });

        // Löschen des obersten Turniers
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('button.del').click();
        });


        cy.get('.tournament-list-item').contains('@tournamentName').should('not.exist');


    });
});
