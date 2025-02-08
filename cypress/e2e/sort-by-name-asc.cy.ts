import * as cypress from "cypress";

describe('Turniere nach Name aufsteigend sortieren', () => {
    it('sollte nach Name aufsteigend sortieren', () => {
        cy.visit('https://kavolley.uber.space/');

        // Login
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space');


        // Speichere alle Turniernamen vor dem Sortieren
        let tournamentsBeforeSorting = [];
        cy.get('.tournament-list-item').each(($turnier) => {
            const name = $turnier.find('h2').text();
            tournamentsBeforeSorting.push(name);
        });

        // Sortiere nach Name aufsteigend
        cy.get('select#sort').select('nameAsc');

        // Überprüfe die Sortierung
        let previousName = null;
        cy.get('.tournament-list-item').each(($turnier) => {
            const currentName = $turnier.find('h2').text();

            if (previousName) {
                expect(currentName.localeCompare(previousName)).to.be.gte(0);
            }
            previousName = currentName;
        });
        
    });
});
