import * as cypress from "cypress";

describe('Turnierdetail - Einschreiben und Bestätigung', () => {
    it('sollte das Team für ein Turnier einschreiben und eine Bestätigung anzeigen', () => {
        // Gehe zur Turnierübersicht (ersetze ggf. die URL mit der richtigen)
        cy.visit('http://localhost:3000/tournaments');

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
