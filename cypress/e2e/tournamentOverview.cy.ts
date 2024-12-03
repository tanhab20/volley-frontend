import * as cypress from "cypress";
describe('Turnierübersicht - Navigation und Anzeige von Details', () => {
    it('zeigt alle Turniere und ermöglicht die Navigation zur Detailseite', () => {

        cy.visit('http://web:3000/tournaments');


        cy.contains('Sommerfußball-Cup 2024').should('be.visible');
        cy.contains('Internationales Schachturnier').should('be.visible');
        cy.contains('Tennis Masters 2024').should('be.visible');


        cy.contains('Mehr Details').first().click();


        cy.url().should('include', '/tournament/');


        cy.contains('Sommerfußball-Cup 2024').should('be.visible');
        cy.contains('Datum:').should('be.visible');
        cy.contains('Veranstaltungsort:').should('be.visible');
    });
});
