import * as cypress from "cypress";

describe('Delete Tournament', () => {
    beforeEach(() => {
        cy.visit('https://kavolley.uber.space/tournaments');
    });

    it('should delete the tournament with the name "Internationales Schachturnier"', () => {

        // Zähle die Anzahl der Turniere vor dem Löschen
        cy.get('.tournament-list-item').then((itemsBeforeDelete) => {
            const initialCount = itemsBeforeDelete.length;

            // Klicke auf den Löschen-Button des entsprechenden Turniers
            cy.get('.tournament-list-item').contains('Internationales Schachturnier')
                .parents('.tournament-list-item')
                .within(() => {
                    cy.get('button.del').should('be.visible').click();
                });

            // Überprüfe, ob die Anzahl der Turniere um 1 reduziert wurde
            cy.get('.tournament-list-item').should('have.length', initialCount - 1);
        });
    });
});
