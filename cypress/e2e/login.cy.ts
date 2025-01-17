import * as cypress from "cypress";

describe('Login Test for kavolley.uber.space', () => {
    it('should navigate to the site and log in', () => {
        cy.visit('https://kavolley.uber.space/'); // Besuche die Seite

        // Stelle sicher, dass die Login-Seite geladen ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Fülle die Login-Felder aus und sende das Formular ab
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password', { log: false });
        cy.get('button[type="submit"]').click();

        // Überprüfe, ob die Navigation zur Turnier-Seite erfolgt ist
        cy.url().should('include', '/tournaments');


        // Klicke auf den Button "Mehr Details" für das Turnier "Sommerfußball-Cup 2024"
        cy.contains('Schulmeisterschaften im Basketball')  // Sucht nach dem Turniernamen
            .parents('.tournament-list-item')   // Geht zum übergeordneten Element (Turnier-Item)
            .within(() => {
                cy.contains('Mehr Details').click();  // Klick auf den "Mehr Details" Button
            });

        // Bestätige, dass die Detailseite geladen wird (prüfe, ob der Titel des Turniers vorhanden ist)
        cy.contains('Schulmeisterschaften im Basketball'); // Überprüft, ob der Name des Turniers auf der Detailseite erscheint

        // Klicke auf den "Für Turnier einschreiben" Button
        cy.contains('Für Turnier einschreiben').click();

        // Überprüfe, dass die Bestätigungs-Alert erscheint
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Team für das Turnier Schulmeisterschaften im Basketball eingeschrieben!');
        });
    });
});
