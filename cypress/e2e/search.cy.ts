describe('Turniere nach Name suchen', () => {
    it('sollte nach Turniername suchen und die Ergebnisse korrekt anzeigen', () => {
        cy.visit('https://kavolley.uber.space/');

        // Login
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space');

        // Speichere alle Turniernamen vor der Suche
        let allTournamentNames = [];
        cy.get('.tournament-list-item').each(($item) => {
            cy.wrap($item).find('h2').invoke('text').then((turnierName) => {
                allTournamentNames.push(turnierName);
            });
        });


        cy.get('.tournament-list-item').first().find('h2').invoke('text').then((turnierName) => {
            cy.get('input[type="text"]').clear().type(turnierName); // Gebe den ersten Turniernamen in die Suchleiste ein

            // Überprüfe, dass nur Turniere mit dem gesuchten Namen angezeigt werden
            cy.get('.tournament-list-item').each(($item) => {
                cy.wrap($item).find('h2').should('include.text', turnierName); // Überprüfe, dass der Name im Turnier übereinstimmt
            });

            // Überprüfe, dass alle anderen Turniere, die nicht übereinstimmen, nicht angezeigt werden
            allTournamentNames.forEach((name) => {
                if (name !== turnierName) {
                    cy.get('.tournament-list-item').each(($item) => {
                        cy.wrap($item).find('h2').should('not.include.text', name); // Überprüfe, dass die anderen Turniere nicht angezeigt werden
                    });
                }
            });
        });


        const nonExistentName = "NichtExistierendesTurnier123";
        cy.get('input[type="text"]').clear().type(nonExistentName); // Suche nach einem nicht existierenden Turnier

        // Überprüfe, dass kein Turnier angezeigt wird
        cy.get('.tournament-list-item').should('not.exist'); // Es sollte kein Turnier mit diesem Namen existieren
        cy.get('input[type="text"]').clear()

        allTournamentNames.forEach((name) => {
            cy.get('.tournament-list-item').each(($item) => {
                cy.wrap($item).find('h2').should('include.text', name); // Überprüfe, dass jeder gespeicherte Name angezeigt wird
            });
        });


    });
});
