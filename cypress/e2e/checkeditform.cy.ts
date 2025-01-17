import * as cypress from "cypress";

describe('Edit Tournament', () => {
    beforeEach(() => {

        cy.visit('https://kavolley.uber.space/tournaments');
    });

    it('should fill the edit form with the correct tournament data', () => {

        cy.get('.tournament-list-item').contains('Sommerfußball-Cup 2024').parents('.tournament-list-item').within(() => {
            cy.get('button.edi').click();
        });


        cy.url().should('include', '/edit-tournament/');

        cy.get('input[name="name"]').should('have.value', 'Sommerfußball-Cup 2024');
        cy.get('input[name="date"]').should('have.value', '2024-07-15');
        cy.get('input[name="location"]').should('have.value', 'Berlin, Olympiastadion');
        cy.get('input[name="duration"]').should('have.value', '3 days');
    });
});
