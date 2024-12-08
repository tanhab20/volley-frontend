import * as cypress from "cypress";

describe('Delete Tournament', () => {
    beforeEach(() => {

        cy.visit('http://web:3000/tournaments');
    });

    it('should delete the tournament with the name "Sommerfußball-Cup 2024"', () => {

        cy.get('.tournament-list-item').should('have.length.greaterThan', 0);


        cy.get('.tournament-list-item').contains('Sommerfußball-Cup 2024').parents('.tournament-list-item').within(() => {

            cy.get('button.del').should('be.visible').click();
        });


        cy.get('.tournament-list-item').should('have.length', 7 - 1);
    });
});
