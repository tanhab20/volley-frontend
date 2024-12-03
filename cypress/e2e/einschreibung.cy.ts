import * as cypress from "cypress";
describe('Turnierdetail - Einschreiben und Bestätigung', () => {
    it('zeigt eine Bestätigung nach dem Einschreiben für ein Turnier', () => {

        cy.visit('http://web:3000/tournament/1');


        cy.contains('Für Turnier einschreiben').click();


        cy.on('window:alert', (str) => {
            expect(str).to.equal('Team für das Turnier Sommerfußball-Cup 2024 eingeschrieben!');
        });
    });
});
