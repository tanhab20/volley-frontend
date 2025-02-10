/*describe('Turniere nach Veranstaltungsort filtern', () => {
    it('sollte nach Veranstaltungsort filtern', () => {
        cy.visit('https://kavolley.uber.space/');

        // Login
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space');


        // Öffne Filteroptionen
        cy.get('.filter-toggle').click().click();
        cy.get('.filter-options').should('be.visible');

        // Speichere alle Turnierorte vor dem Filtern
        let tournamentsBeforeFiltering = [];
        cy.get('.tournament-list-item').each(($turnier) => {
            cy.wrap($turnier).find('#ort').invoke('text').then((text) => {
                const location = text.replace('Veranstaltungsort:', '').trim();
                tournamentsBeforeFiltering.push(location);
            });
        });

        // Wähle den ersten Ort aus der Liste aus
        cy.get('.tournament-list-item').first().find('#ort').invoke('text').then((firstLocationText) => {
            const firstLocation = firstLocationText.replace('Veranstaltungsort:', '').trim();

            // Aktiviere den Filter für den ausgewählten Ort
            cy.get(`input[type="checkbox"][value="${firstLocation}"]`).check();

            // Überprüfe, dass nur Turniere mit dem ausgewählten Ort angezeigt werden
            cy.get('.tournament-list-item').each(($item) => {
                cy.wrap($item).find('#ort').should('contain', firstLocation);
            });

            // Überprüfe, dass die Anzahl der angezeigten Turniere korrekt ist
            cy.then(() => {
                const expectedCount = tournamentsBeforeFiltering.filter(location => location === firstLocation).length;
                cy.get('.tournament-list-item').should('have.length', expectedCount);
            });

            // Überprüfe, dass Turniere mit anderen Veranstaltungsorten nicht angezeigt werden
            cy.get('.tournament-list-item').each(($item) => {
                cy.wrap($item).find('#ort').invoke('text').then((locationText) => {
                    const location = locationText.replace('Veranstaltungsort:', '').trim();
                    // Wenn der Veranstaltungsort nicht mit dem gefilterten übereinstimmt, stelle sicher, dass das Turnier nicht angezeigt wird
                    if (location !== firstLocation) {
                        cy.wrap($item).should('not.be.visible');
                    }
                });
            });

        });
    });
});*/
