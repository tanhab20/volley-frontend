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

        // Damit stellt man sicher, dass alles geladen ist
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Ausfüllen der Felder
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');
        cy.get('select#sort').select('dateAsc'); //wählt nach Datum aufsteigend sortieren aus


        let previousDate = null;
        cy.get('.tournament-list-item') //geht durch alle Turniere durch
            .each(($turnier) => {
                // Extrahiert das Datum aus dem Text
                const dateText = $turnier.find('#datum').text().split(':')[1].trim();

                // Datum umformatieren damit man es leichter vergleichen kann
                const formattedDate = formatDate(dateText);

                // Man muss ein Date erstellen damit man es dann vergleichen kann
                const currentDate = new Date(formattedDate);

                if (previousDate) {

                    expect(currentDate).to.be.gte(previousDate);
                }

                previousDate = currentDate;
            });
    });
});
