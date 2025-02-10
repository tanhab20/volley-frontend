import * as cypress from "cypress";

/*describe('Turniere nach Dauer filtern', () => {
    it('sollte nach Dauer filtern', () => {
        cy.visit('https://kavolley.uber.space/');

        // Login
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space');

        // Öffne Filteroptionen
        cy.get('.filter-toggle').click().click();
        cy.get('.filter-options').should('be.visible');

        // Speichere alle Turnierdauern vor dem Filtern
        let tournamentsBeforeFiltering = [];
        cy.get('.tournament-list-item').each(($turnier) => {
            const duration = $turnier.find('#dauer').text().split(':')[1].trim();
            tournamentsBeforeFiltering.push(duration);
        });

        // Wähle die erste Dauer aus der Liste aus
        cy.get('.tournament-list-item').first().find('#dauer').then(($dauer) => {
            const firstDuration = $dauer.text().split(':')[1].trim();

            // Aktiviere den Filter für die ausgewählte Dauer
            cy.get(`input[type="checkbox"][value="${firstDuration}"]`).check();

            // Überprüfe, dass nur Turniere mit der ausgewählten Dauer angezeigt werden
            cy.get('.tournament-list-item').each(($item) => {
                cy.wrap($item).find('#dauer').should('contain', firstDuration);
            });

            // Überprüfe, dass die Anzahl der angezeigten Turniere korrekt ist
            const expectedCount = tournamentsBeforeFiltering.filter(duration => duration === firstDuration).length;
            cy.get('.tournament-list-item').should('have.length', expectedCount);

            // Überprüfe, dass Turniere mit einer anderen Dauer nicht angezeigt werden
            cy.get('.tournament-list-item').each(($item) => {
                cy.wrap($item).find('#dauer').invoke('text').then((durationText) => {
                    const duration = durationText.split(':')[1].trim();
                    // Wenn die Dauer nicht mit der ausgewählten übereinstimmt, stelle sicher, dass das Turnier nicht angezeigt wird
                    if (duration !== firstDuration) {
                        cy.wrap($item).should('not.be.visible');
                    }
                });
            });
        });
    });
});*/
