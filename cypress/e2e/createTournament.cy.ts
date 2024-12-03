import * as cypress from "cypress";


describe('Tournament Form', () => {
    // Besuche die Seite bevor jeder Test ausgeführt wird
    beforeEach(() => {
        cy.visit('http://localhost:3000/Form'); // Ersetze dies durch den tatsächlichen Pfad deiner App
    });

    it('should fill out the form and submit successfully', () => {
        // Beispiel-Eingabewerte für das Formular
        const tournamentData = {
            name: 'Test Turnier',
            date: '2024-10-05',
            venue: 'Sporthalle 1',
            duration: '2 Stunden',
            description: 'Ein spannendes Test-Turnier'
        };

        // Felder ausfüllen
        cy.get('input[id="name"]').type(tournamentData.name);
        cy.get('input[id="date"]').type(tournamentData.date);
        cy.get('input[id="venue"]').type(tournamentData.venue);
        cy.get('input[id="duration"]').type(tournamentData.duration);
        cy.get('textarea[id="description"]').type(tournamentData.description);

        // Formular absenden
        cy.get('button').click();

        // Überprüfe, ob die Daten in der Konsole ausgegeben werden
        cy.window().then((win) => {
            cy.spy(win.console, 'log').as('consoleLog');
        });



        // Stelle sicher, dass der Benutzer zur Hauptseite weitergeleitet wird
        cy.url().should('eq', `http://localhost:3000/overview`);
    });
});







