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


        cy.get('.tournament-list-item').should('exist').first().within(() => {
            cy.get('h2').invoke('text').then((text) => {
                expect(text).to.not.be.empty;
            }).as('tournamentName');
            cy.get('#datum').invoke('text').then((text) => {
                expect(text).to.not.be.empty;
            }).as('tournamentDate');
            cy.get('#ort').invoke('text').then((text) => {
                expect(text).to.not.be.empty;
            }).as('tournamentLocation');
            cy.get('#dauer').invoke('text').then((text) => {
                expect(text).to.not.be.empty;
            }).as('tournamentDuration');
        });

        cy.get('.tournament-list-item').first().within(() => {
            cy.contains('Mehr Details').click();
        });

        

        // Überprüfe, ob die Turnierdetails korrekt angezeigt werden
        cy.get('@tournamentName').then((name) => {
            cy.get('#name').should('have.text', name);  // Überprüfe den Namen des Turniers
        });
        cy.get('@tournamentDate').then((date) => {
            cy.log('Überprüfe das Turnierdatum:', date);  // Logge das Datum vor der Prüfung
            cy.get('#date').should('have.text',  date);  // Überprüfe das Datum
        });
        cy.get('@tournamentLocation').then((location) => {
            cy.log('Überprüfe den Turnierort:', location);  // Logge den Veranstaltungsort vor der Prüfung
            cy.get('#ort').should('have.text',  location);  // Überprüfe den Veranstaltungsort
        });
        cy.get('@tournamentDuration').then((duration) => {
            cy.log('Überprüfe die Turnierdauern:', duration);  // Logge die Dauer vor der Prüfung
            cy.get('#duration').should('have.text', duration);  // Überprüfe die Dauer
        });
    });
});
