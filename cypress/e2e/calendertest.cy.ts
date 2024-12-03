import * as cypress from "cypress";

describe('Kalender Turnier Tests', () => {
    beforeEach(() => {
        // Gehe zur Kalenderseite vor jedem Test.
        cy.visit('http://web:3000/calendartournament?date=3.12.2024');
    });

    it('sollte die Kalenderseite korrekt laden', () => {
        cy.url().should('include', '/calendartournament');
        cy.contains('Turniere am 3.12.2024').should('be.visible');
    });

    it('sollte die Details eines Turniers anzeigen, wenn auf das Datum geklickt wird', () => {
        // Annahme: Ein Turnier mit dem Namen 'Indoor-Fußballturnier' ist am 3. Dezember 2024 verfügbar.
        cy.get('.calendar-event')
            .contains('Indoor-Fußballturnier')
            .click();

        // Überprüfen Sie, ob die Turnierdetails sichtbar sind.
        cy.contains('Name: Indoor-Fußballturnier').should('be.visible');
        cy.contains('Datum: 3.12.2024').should('be.visible');
        cy.contains('Ort: München, Sporthalle Süd').should('be.visible');
    });

    it('sollte Turniere korrekt anzeigen, wenn die Seite direkt über die URL aufgerufen wird', () => {
        cy.visit('http://web:3000/calendartournament?date=3.12.2024');

        // Überprüfen Sie, ob die Turniere für den 3. Dezember 2024 angezeigt werden.
        cy.contains('Turniere am 3.12.2024').should('be.visible');
        cy.get('.tournament-details').should('have.length.greaterThan', 0);
    });

    it('sollte eine Meldung anzeigen, wenn keine Turniere für das angegebene Datum vorhanden sind', () => {
        // Besuchen Sie die Seite mit einem Datum, für das keine Turniere vorhanden sind (z. B. ein leerer Tag).
        cy.visit('http://web:3000/calendartournament?date=1.1.2025');

        // Überprüfen Sie, ob die Nachricht 'Keine Turniere verfügbar' angezeigt wird.
        cy.contains('Keine Turniere verfügbar').should('be.visible');
    });

    it('sollte sicherstellen, dass die URL korrekt aktualisiert wird, wenn ein Datum angeklickt wird', () => {
        // Klicken Sie auf ein Datum und überprüfen Sie, ob die URL aktualisiert wird.
        cy.get('.calendar-event')
            .contains('Indoor-Fußballturnier')
            .click();

        cy.url().should('include', '/calendartournament');
        cy.url().should('include', 'date=3.12.2024');
    });

    it('sollte alle Turniere anzeigen, wenn auf die Seite direkt zugegriffen wird', () => {
        cy.visit('http://web:3000/calendartournament?date=3.12.2024');

        // Überprüfen, ob mehrere Turniere am angegebenen Datum vorhanden sind.
        cy.get('.tournament-details').should('have.length', 2); // Beispiel: An diesem Tag gibt es 2 Turniere
    });
});
