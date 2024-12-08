import * as cypress from "cypress";
describe('Edit Tournament', () => {
    beforeEach(() => {
        cy.visit('http://web:3000/tournaments');
    });

    it('should save the changes correctly when editing a tournament', () => {
        // Editieren eines Turniers
        cy.get('.tournament-list-item')
            .contains('Sommerfußball-Cup 2024')
            .parents('.tournament-list-item')
            .within(() => {
                cy.get('button.edi').click();
            });

        // Sicherstellen, dass die Bearbeitungsseite geladen wird
        cy.url().should('include', '/edit-tournament/1');

        // Neue Werte eingeben
        cy.get('input[name="name"]').clear().type('Sommerfußball-Cup 2024 - Updated');
        cy.get('input[name="date"]').clear().type('2024-07-20');
        cy.get('input[name="location"]').clear().type('Berlin, Neues Stadion');
        cy.get('input[name="duration"]').clear().type('4 days');

        // Änderungen speichern
        cy.get('button[type="submit"]').click();

        // Sicherstellen, dass die Turnierliste die Änderungen reflektiert
        cy.get('.tournament-list-item').contains('Sommerfußball-Cup 2024 - Updated').should('exist');
        cy.get('.tournament-list-item').contains('2024-07-20').should('exist');
        cy.get('.tournament-list-item').contains('Berlin, Neues Stadion').should('exist');
    });
});
