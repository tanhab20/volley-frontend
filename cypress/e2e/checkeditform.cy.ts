import * as cypress from "cypress";

describe('Edit Tournament', () => {

    const extractTournamentData = () => {
        let tournamentName = '';
        let tournamentDate = '';
        let tournamentLocation = '';
        let tournamentDuration = '';

        // Wählen des obersten Turniers und Speichern der Daten
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('h2').should('be.visible').invoke('text').then((text) => {
                tournamentName = text.trim();  // Turniername speichern
            });
            cy.get('#datum').should('be.visible').invoke('text').then((text) => {
                tournamentDate = text.trim();  // Datum speichern
            });
            cy.get('#ort').should('be.visible').invoke('text').then((text) => {
                tournamentLocation = text.trim();  // Veranstaltungsort speichern
            });
            cy.get('#dauer').should('be.visible').invoke('text').then((text) => {
                tournamentDuration = text.trim(); // Dauer speichern
            });
        });

        return { tournamentName, tournamentDate, tournamentLocation, tournamentDuration };
    };

    const checkFormValues = (tournamentName, tournamentDate, tournamentLocation, tournamentDuration) => {
        // Überprüfen, ob die Felder im Bearbeitungsformular mit den richtigen Daten gefüllt sind
        cy.get('input[name="name"]').should('have.value', tournamentName);
        cy.get('input[name="date"]').should('have.value', tournamentDate); // Use the correct date format
        cy.get('input[name="location"]').should('have.value', `Veranstaltungsort: ${tournamentLocation}`);  // Add prefix to location
        cy.get('input[name="duration"]').should('have.value', tournamentDuration);
    };

    it('should fill the edit form with the correct tournament data', () => {
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

        // Dynamisch extrahieren der Turnierdaten
        const { tournamentName, tournamentDate, tournamentLocation, tournamentDuration } = extractTournamentData();

        // Klick auf den Edit-Button des ersten Turniers
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('button.edi').click();
        });

        // Überprüfen, ob die URL das korrekte Format hat
        cy.url().should('include', '/edit-tournament/');

        // Warten auf das Formular, falls notwendig (z.B. dynamisch geladen)
        cy.get('input[name="name"]').should('be.visible'); // Warten bis das Namensfeld sichtbar ist

        // Überprüfen, ob die Felder im Bearbeitungsformular mit den richtigen Daten gefüllt sind
        checkFormValues(tournamentName, tournamentDate, tournamentLocation, tournamentDuration);
    });
});
