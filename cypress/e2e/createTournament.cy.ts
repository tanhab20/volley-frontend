import * as cypress from "cypress";


describe('Tournament Form', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/Form');
    });

    it('should fill out the form and submit successfully', () => {

        const tournamentData = {
            name: 'Test Turnier',
            date: '2024-10-05',
            venue: 'Sporthalle 1',
            duration: '2 Stunden',
            description: 'Ein spannendes Test-Turnier'
        };


        cy.get('input[id="name"]').type(tournamentData.name);
        cy.get('input[id="date"]').type(tournamentData.date);
        cy.get('input[id="venue"]').type(tournamentData.venue);
        cy.get('input[id="duration"]').type(tournamentData.duration);
        cy.get('textarea[id="description"]').type(tournamentData.description);

        cy.get('button').click();


        cy.window().then((win) => {
            cy.spy(win.console, 'log').as('consoleLog');
        });


        cy.url().should('eq', `http://localhost:3000/overview`);
    });
});







