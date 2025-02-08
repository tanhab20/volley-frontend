import * as cypress from "cypress";

describe('Turniere nach Datum aufsteigend sortieren', () => {
    const formatDate = (dateText) => {
        const [day, month, year] = dateText.split('.');
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    it('sollte nach Datum aufsteigend sortieren', () => {
        cy.visit('https://kavolley.uber.space/');

        // Login
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space/tournaments');
        cy.url().should('include', '/tournaments');

        // Speichere alle Turnierdaten vor dem Sortieren
        let tournamentsBeforeSorting = [];
        cy.get('.tournament-list-item').each(($turnier) => {
            const dateText = $turnier.find('#datum').text().split(':')[1].trim();
            tournamentsBeforeSorting.push(formatDate(dateText));
        });

        // Sortiere nach Datum aufsteigend
        cy.get('select#sort').select('dateAsc');

        // Überprüfe die Sortierung
        let previousDate = null;
        cy.get('.tournament-list-item').each(($turnier) => {
            const dateText = $turnier.find('#datum').text().split(':')[1].trim();
            const formattedDate = formatDate(dateText);
            const currentDate = new Date(formattedDate);

            if (previousDate) {
                expect(currentDate).to.be.gte(previousDate);
            }
            previousDate = currentDate;
        });

        // Überprüfe, dass alle Turniere noch vorhanden sind
        cy.get('.tournament-list-item').should('have.length', tournamentsBeforeSorting.length);
    });
});
