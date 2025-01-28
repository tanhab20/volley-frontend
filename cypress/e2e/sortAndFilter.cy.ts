import * as cypress from "cypress";

describe('Turniere Filter und Sortieren', () => {
    const formatDate = (dateText) => {
        const [day, month, year] = dateText.split('.');

        // Überprüfe und füge führende Nullen hinzu
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


    it('sollte nach Veranstaltungsort filtern', () => {
        cy.visit('https://kavolley.uber.space/');

        // Sicherstellen, dass die Login-Elemente sichtbar sind
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Login-Daten eingeben
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();


        cy.visit('https://kavolley.uber.space/');
        cy.url().should('include', '/tournaments');


        cy.get('.filter-toggle').click().click();

        cy.get('.filter-options').should('be.visible');


        cy.get('.tournament-list-item').first()
            .find('#ort')
            .then(($ort) => {
                const firstLocation = $ort.text().split(":")[1].trim();

                cy.get(`input[type="checkbox"][value="${firstLocation}"]`)
                    .should('exist')
                    .check();

                // Verify that only tournaments with the selected location are displayed
                cy.get('.tournament-list-item').each(($item) => {
                    cy.wrap($item).find('#ort').should('contain', firstLocation);   //cy.wrap wandelt ein item in ein cypress objekt um damit mehr cy befehle drauf angewendet werden könne
                });

            });

    });

        it('sollte nach Dauer filtern', () => {
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

            cy.get('.filter-toggle').click().click();


            cy.get('.tournament-list-item').first()
                .find('#dauer')
                .then(($dauer) => {
                    const firstDuration = $dauer.text().split(":")[1].trim();

                    cy.get(`input[type="checkbox"][value="${firstDuration}"]`)
                        .should('exist')
                        .check();


                    cy.get('.tournament-list-item').each(($item) => {
                        cy.wrap($item).find('#dauer').should('contain', firstDuration);
                    });

                    //die was nicht die dauer ist überprüfen dass sie nicht angehakelt sidn

                });
        });
    });

