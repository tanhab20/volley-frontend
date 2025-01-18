import * as cypress from "cypress";

describe('Turnierübersicht - Navigation und Anzeige von Details', () => {
    it('zeigt alle Turniere und ermöglicht die Navigation zur Detailseite für das erste Turnier', () => {

        cy.visit('https://kavolley.uber.space/');

        // Damit stellt man sicher, dass alles geladen ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Ausfüllen der Felder
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');

        // Speichern der Daten des ersten Turniers in Variablen
        let tournamentName, tournamentDate, tournamentLocation, tournamentDuration;

        cy.get('.tournament-list-item').first().within(() => {
            cy.get('h2').invoke('text').then((text) => {
                tournamentName = text;  // Speichern des Turniernamen
                cy.log('Turniername gespeichert:', tournamentName);  // Logge den Turniernamen
            });
            cy.get('#datum').invoke('text').then((text) => {
                tournamentDate = text;  // Speichern des Datums
                cy.log('Turnierdatum gespeichert:', tournamentDate);  // Logge das Datum
            });
            cy.get('#ort').invoke('text').then((text) => {
                tournamentLocation = text;  // Speichern des Veranstaltungsortes
                cy.log('Turnierort gespeichert:', tournamentLocation);  // Logge den Ort
            });
            cy.get('#dauer').invoke('text').then((text) => {
                tournamentDuration = text;  // Speichern der Dauer
                cy.log('Turnierdauern gespeichert:', tournamentDuration);  // Logge die Dauer
            });

            cy.contains('Mehr Details').click();  // Klick auf den "Mehr Details" Button
        });

        // Warte auf die URL, die das Turnierdetail enthält
        cy.url().should('include', '/tournament/');

        // Überprüfe, ob die Turnierdetails korrekt angezeigt werden
        cy.get('#name').should('have.text', tournamentName);  // Überprüfe den Namen des Turniers
        cy.get('#date').should('have.text', 'Datum: ' + tournamentDate);  // Überprüfe das Datum
        cy.get('#ort').should('have.text', 'Veranstaltungsort: ' + tournamentLocation);  // Überprüfe den Veranstaltungsort
        cy.get('#duration').should('have.text', 'Dauer: ' + tournamentDuration);  // Überprüfe die Dauer
    });
});
