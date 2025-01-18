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

        // Wählen des obersten Turniers und Speichern der Daten
        cy.get('.tournament-list-item').first().within(() => {
            // Speichern der Turnierdaten
            cy.get('h2').invoke('text').as('tournamentName');
            cy.get('#datum').invoke('text').as('tournamentDate');
            cy.get('#ort').invoke('text').as('tournamentLocation');
            cy.get('#dauer').invoke('text').as('tournamentDuration');
        });

        // Weiter zum Bearbeitungsformular
        cy.get('@tournamentName').then((tournamentName) => {
            cy.get('@tournamentDate').then((tournamentDate) => {
                cy.get('@tournamentLocation').then((tournamentLocation) => {
                    cy.get('@tournamentDuration').then((tournamentDuration) => {
                        // Klick auf den "Bearbeiten" Button
                        cy.get('.tournament-list-item').first().within(() => {
                            cy.get('button.edi').click();
                        });

                        cy.url().should('include', '/edit-tournament/');

                        // Überprüfen, ob die Felder im Bearbeitungsformular mit den richtigen Daten gefüllt sind
                        cy.get('input[name="name"]').should('have.value', tournamentName.trim());
                        cy.get('input[name="date"]').should('have.value', tournamentDate.trim());
                        cy.get('input[name="location"]').should('have.value', tournamentLocation.trim());
                        cy.get('input[name="duration"]').should('have.value', tournamentDuration.trim());
                    });
                });
            });
        });
    });
});
