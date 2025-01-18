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

        // Speichern der Daten des ersten Turniers
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('h2').invoke('text').as('tournamentName');  // Turniername speichern
            cy.get('#datum').invoke('text').as('tournamentDate');  // Datum speichern
            cy.get('#ort').invoke('text').as('tournamentLocation');  // Veranstaltungsort speichern
            cy.get('#dauer').invoke('text').as('tournamentDuration'); // Dauer speichern
            cy.contains('Mehr Details').click();  // Klick auf den "Mehr Details" Button
        });


        // Warte auf die URL, die das Turnierdetail enthält
        cy.url().should('include', '/tournament/');

        // Überprüfe, ob die Turnierdetails korrekt angezeigt werden
        cy.get('@tournamentName').then((name) => {
            cy.get('#name').should('have.text', name);  // Überprüfe den Namen des Turniers
        });
        cy.get('@tournamentDate').then((date) => {
            cy.log('Überprüfe das Turnierdatum:', date);  // Logge das Datum vor der Prüfung
            cy.get('#date').should('have.text', 'Datum: ' + date);  // Überprüfe das Datum
        });
        cy.get('@tournamentLocation').then((location) => {
            cy.log('Überprüfe den Turnierort:', location);  // Logge den Veranstaltungsort vor der Prüfung
            cy.get('#ort').should('have.text', 'Veranstaltungsort: ' + location);  // Überprüfe den Veranstaltungsort
        });
        cy.get('@tournamentDuration').then((duration) => {
            cy.log('Überprüfe die Turnierdauern:', duration);  // Logge die Dauer vor der Prüfung
            cy.get('#duration').should('have.text', 'Dauer: ' + duration);  // Überprüfe die Dauer
        });
    });
});
