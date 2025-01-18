describe('Edit Tournament', () => {
    it('should save the changes correctly when editing a tournament', () => {
        cy.visit('https://kavolley.uber.space/');

        // Sicherstellen, dass die Login-Felder sichtbar sind
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Ausfüllen der Login-Daten
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');

        // Editieren eines Turniers
        cy.get('.tournament-list-item')
            .contains('Schulmeisterschaften im Basketball')
            .parents('.tournament-list-item')
            .within(() => {
                cy.get('button.edi').click();
            });

        cy.url().should('include', '/edit-tournament');

        // Ändern der Turnierdetails
        const updatedDate = '2024-07-20';
        const updatedLocation = 'Berlin, Neues Stadion';
        const updatedDuration = '4 days';

        cy.get('input[name="name"]').clear().type('Schulmeisterschaften im Basketball');
        cy.get('input[name="date"]').clear().type(updatedDate);
        cy.get('input[name="location"]').clear().type(updatedLocation);
        cy.get('input[name="duration"]').clear().type(updatedDuration);

        cy.get('button[type="submit"]').click();

        // Zurück zur Turnierliste und nach den geänderten Daten suchen
        cy.get('.tournament-list-item').contains('Schulmeisterschaften im Basketball').should('exist');

        // Überprüfen, ob das Datum korrekt angezeigt wird, indem die ID abgefragt wird
        cy.get('#datum').contains(new Date(updatedDate).toLocaleDateString("de-DE")).should('exist');

        // Überprüfen, ob der Veranstaltungsort korrekt angezeigt wird, indem die ID abgefragt wird
        cy.get('#ort').contains(updatedLocation).should('exist');

        // Überprüfen, ob die Dauer korrekt angezeigt wird
        cy.get('#dauer').contains(updatedDuration).should('exist');
    });
});
