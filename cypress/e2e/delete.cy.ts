import * as cypress from "cypress";

describe('Delete Tournament', () => {
    it('should delete the tournament with the name "Internationales Schachturnier"', () => {

        cy.visit('https://kavolley.uber.space/');

        // damit stellt man sicher, dass alles geladen ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // ausfüllen der felder
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();


        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');


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
