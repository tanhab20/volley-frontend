import * as cypress from "cypress";
describe('Turnierdetail - Fehler bei ungültiger Turnier-ID', () => {
    it('zeigt eine Fehlermeldung, wenn das Turnier nicht gefunden wird', () => {

        cy.visit('https://kavolley.uber.space/tournaments/99');


        cy.contains('Turnier nicht gefunden').should('be.visible');
    });
});
