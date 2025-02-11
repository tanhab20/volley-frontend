import * as cypress from "cypress";

describe('Delete Tournament', () => {
    it('should delete the first tournament and ensure it is no longer in the list', () => {
        cy.visit('https://kavolley.uber.space/');

        // Sicherstellen, dass Login sichtbar ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Login-Daten ausfüllen
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space/');

        // Anzahl der Turniere vor dem Löschen speichern
        cy.get('.tournament-list-item').then(($tournaments) => {
            const initialCount = $tournaments.length;
            cy.wrap(initialCount).as('initialTournamentCount');
        });

        // Speichern des Namens des ersten Turniers
        cy.get('.tournament-list-item').first().find('h2').invoke('text').as('tournamentName');

        // Löschen des obersten Turniers
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('button.del').click();
        });

        // Sicherstellen, dass das Turnier entfernt wird (z. B. durch Neuladen oder UI-Update)
        cy.wait(2000); // Falls ein Server-Request nötig ist, kann hier `cy.intercept()` genutzt werden

        // Überprüfen, ob die Anzahl der Turniere um 1 gesunken ist
        cy.get('@initialTournamentCount').then((initialCount) => {
            cy.get('.tournament-list-item').should('have.length.lessThan', initialCount);
        });

    });
});
