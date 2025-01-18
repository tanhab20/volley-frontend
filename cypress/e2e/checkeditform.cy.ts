describe('Edit Tournament', () => {
    it('should prefill the form with the correct tournament data', () => {
        cy.visit('https://kavolley.uber.space/');

        // Login
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        // Navigate to tournaments list
        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');

        // Get tournament data from the first list item
        cy.get('.tournament-list-item').should('exist').first().within(() => {
            cy.get('h2').invoke('text').then((text) => {
                expect(text).to.not.be.empty;
            }).as('tournamentName');
            cy.get('#datum').invoke('text').then((text) => {
                expect(text).to.not.be.empty;
            }).as('tournamentDate');
            cy.get('#ort').invoke('text').then((text) => {
                expect(text).to.not.be.empty;
            }).as('tournamentLocation');
            cy.get('#dauer').invoke('text').then((text) => {
                expect(text).to.not.be.empty;
            }).as('tournamentDuration');
        });

        // Click edit button for the first tournament
        cy.get('.tournament-list-item').first().within(() => {
            cy.get('button.edi').click();
        });

        // Assert the URL contains the edit route
        cy.url().should('include', '/edit-tournament/');

        // Check if form fields are correctly prefilled
        cy.get('@tournamentName').then((name) => {
            cy.get('input#name').should('have.value', name.trim());
        });

        cy.get('@tournamentDate').then((date) => {
            // Sicherstellen, dass der Wert für 'date' existiert
            if (date && date.includes(":")) {
                const germanDate = date.split(":")[1]?.trim();  // Extrahiere nur den Wert nach dem ":"

                if (germanDate) {
                    // Datum in Tag, Monat und Jahr aufteilen
                    const [day, month, year] = germanDate.split(".");

                    if (day && month && year) {
                        // Füge führende Null zu Monat und Tag hinzu, wenn kleiner als 10
                        const formattedDay = (parseInt(day) < 10) ? `0${day}` : day;
                        const formattedMonth = (parseInt(month) < 10) ? `0${month}` : month;

                        // Formatieren des Datums im ISO-Format (yyyy-mm-dd)
                        const isoDate = `${year}-${formattedMonth}-${formattedDay}`;

                        // Vergleiche mit dem Wert im Input-Feld
                        cy.get('input#date').should('have.value', isoDate);
                    } else {
                        cy.log('Datum konnte nicht richtig aufgeteilt werden');
                    }
                } else {
                    cy.log('Kein gültiges Datum gefunden');
                }
            } else {
                cy.log('Ungültiges Datumsformat gefunden');
            }
        });

        cy.get('@tournamentLocation').then((location) => {
            cy.get('input#location').should('have.value', location.split(":")[1].trim());
        });

        cy.get('@tournamentDuration').then((duration) => {
            cy.get('input#duration').should('have.value', duration.split(":")[1].trim());
        });
    });
});
