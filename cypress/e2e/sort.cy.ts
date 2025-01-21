describe('Turniere Filter und Sortieren', () => {
    const formatDate = (dateText) => {
        const [day, month, year] = dateText.split('.');

        // Überprüfe und füge führende Nullen hinzu
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    it('sollte nach Name aufsteigend sortieren', () => {
        cy.visit('https://kavolley.uber.space/');

        // Login sicherstellen
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Login-Daten eingeben
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space/');

        // Wähle die Option 'nameAsc' aus
        cy.get('select#sort').select('nameAsc');


        let previousName = null;
        cy.get('.tournament-list-item')
            .each(($turnier) => {
                const currentName = $turnier.find('h2').text(); //holt sich den Namen von einem Turnier

                if (previousName) {
                    // Verwende localeCompare für den Stringvergleich
                    expect(currentName.localeCompare(previousName)).to.be.gte(0); // Der Vergleich gibt 0 oder eine positive Zahl zurück, wenn der Name aufsteigend ist
                }
                previousName = currentName;
            });
    });

});
