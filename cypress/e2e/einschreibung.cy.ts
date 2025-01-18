import * as cypress from "cypress";


describe('Turnierdetail - Einschreiben und Bestätigung', () => {
    it('sollte das Team für das oberste Turnier einschreiben und eine Bestätigung anzeigen', () => {
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

        // Wählen des obersten Turniers und Klicken auf "Mehr Details"
        cy.get('.tournament-list-item').first().within(() => {
            // Holen des Turniernamen, um ihn später im Alert zu verwenden
            cy.get('h2').invoke('text').as('tournamentName');
            cy.contains('Mehr Details').click();  // Klick auf "Mehr Details"
        });


        cy.get('h2').should('exist');


        cy.contains('Für Turnier einschreiben').click();


        cy.on('window:alert', (str) => {

            cy.get('@tournamentName').then((tournamentName) => {
                expect(str).to.equal(`Team für das Turnier ${tournamentName} eingeschrieben!`);
            });
        });
    });
});
