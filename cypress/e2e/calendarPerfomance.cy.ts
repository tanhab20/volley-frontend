import * as cypress from "cypress";

describe('Kalender Performance Test', () => {
    it('sollte den Kalender in akzeptabler Zeit laden', () => {
        cy.visit('https://kavolley.uber.space/');

        // Sicherstellen, dass die Login-Felder sichtbar sind
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Felder ausfüllen und einloggen
        cy.get('input#username').type('tanhab20');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        cy.visit('https://kavolley.uber.space/');

        // Ladezeitmessung starten
        const startTime = performance.now();

        // Auf den Turnierkalender-Link in der Navbar klicken
        cy.get('.navbar-link').contains('Turnierkalender').click();

        // Sicherstellen, dass der Kalender sichtbar ist
        cy.get('.custom-calendar').should('be.visible');

        // Ladezeitmessung beenden
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        // Maximale Ladezeit definieren und prüfen
        const maxLoadTime = 2000; // 2000 ms
        expect(loadTime).to.be.lessThan(maxLoadTime);


        cy.log(`Ladezeit des Kalenders: ${loadTime} ms`);
    });
});
