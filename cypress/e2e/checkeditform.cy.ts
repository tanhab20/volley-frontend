import * as cypress from "cypress";

describe('Edit Tournament', () => {


    it('should fill the edit form with the correct tournament data', () => {
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
