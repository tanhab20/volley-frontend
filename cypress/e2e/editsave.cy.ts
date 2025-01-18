import * as cypress from "cypress";

describe('Edit Tournament', () => {
    it('should save the changes correctly when editing the first tournament in the list', () => {
        cy.visit('https://kavolley.uber.space/');

        // Sicherstellen, dass Login sichtbar ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Ausfüllen der Login-Daten
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        // Zurück zur Turnierliste
        cy.visit('https://kavolley.uber.space/');

        // Speichern der Daten des obersten Turniers
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('h2').invoke('text').as('tournamentName');  // Turniername speichern
            cy.get('#datum').invoke('text').as('tournamentDate');  // Datum speichern
            cy.get('#ort').invoke('text').as('tournamentLocation');  // Veranstaltungsort speichern
            cy.get('#dauer').invoke('text').as('tournamentDuration');  // Dauer speichern
        });

        // Bearbeiten des obersten Turniers
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('button.edi').click();  // Klick auf den Bearbeiten-Button
        });

        // Überprüfen, ob wir auf der Edit-Seite sind
        cy.url().should('include', '/edit-tournament');

        // Neue Daten für das Turnier
        const updatedDate = '2024-07-20';
        const updatedLocation = 'Berlin, Neues Stadion';
        const updatedDuration = '4 days';

        // Formular mit den neuen Daten ausfüllen
        cy.get('input[name="name"]').clear().type('Schulmeisterschaften im Basketball');
        cy.get('input[name="date"]').clear().type(updatedDate);
        cy.get('input[name="location"]').clear().type(updatedLocation);
        cy.get('input[name="duration"]').clear().type(updatedDuration);

        // Formular abschicken
        cy.get('button[type="submit"]').click();

        // Zurück zur Turnierliste gehen und nach den geänderten Daten suchen
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('#datum')
                .contains(new Date(updatedDate).toLocaleDateString("de-DE"))
                .should('exist');  // Überprüfen, ob das Datum korrekt ist

            cy.get('#ort').contains(updatedLocation).should('exist');  // Überprüfen, ob der Veranstaltungsort korrekt ist

            cy.get('#dauer').contains(updatedDuration).should('exist');  // Überprüfen, ob die Dauer korrekt ist
        });
    });
});
