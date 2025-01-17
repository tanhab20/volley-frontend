import * as cypress from "cypress";

describe('Turnierübersicht - Navigation und Anzeige von Details', () => {
    it('zeigt alle Turniere und ermöglicht die Navigation zur Detailseite für "Schulmeisterschaften im Basketball"', () => {

        // Besuche die Turnierübersicht
        cy.visit('https://kavolley.uber.space/tournaments');

        // Überprüfe, ob das Turnier "Schulmeisterschaften im Basketball" aufgelistet ist
        cy.contains('Schulmeisterschaften im Basketball').should('be.visible');

        // Klicke auf den "Mehr Details"-Button des ersten Turniers (z. B. "Schulmeisterschaften im Basketball")
        cy.contains('Schulmeisterschaften im Basketball')  // Sucht nach dem Turniernamen
            .parents('.tournament-list-item')   // Geht zum übergeordneten Element (Turnier-Item)
            .within(() => {
                cy.contains('Mehr Details').click();  // Klick auf den "Mehr Details" Button
            });

        // Überprüfe, dass die URL jetzt das Detail des Turniers enthält
        cy.url().should('include', '/tournament/');

        // Überprüfe, ob die Turnierdetails wie Datum, Veranstaltungsort und Beschreibung korrekt angezeigt werden
        cy.contains('Schulmeisterschaften im Basketball').should('be.visible');
        cy.contains('Datum: 20.7.2024').should('be.visible');
        cy.contains('Veranstaltungsort: Berlin, Neues Stadion').should('be.visible');
        cy.contains('Dauer: 4 day').should('be.visible');
        cy.contains('Beschreibung: School basketball championships held at the Rhein sports hall in Cologne.').should('be.visible');
    });
});
