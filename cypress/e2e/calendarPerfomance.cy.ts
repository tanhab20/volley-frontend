import * as cypress from "cypress";

describe('Kalender Performance Test', () => {
    it('sollte den Kalender in akzeptabler Zeit laden', () => {
        // Startzeit vor dem Laden der Seite
        const startTime = performance.now();

        // Besuche die Kalenderseite
        cy.visit('http://web:3000/calendar');

        // Warte darauf, dass der Kalender geladen ist (wird hier mit der Visualisierung überprüft)
        cy.get('.custom-calendar').should('be.visible');

        // Endzeit nach dem Laden der Seite
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        // Die maximale akzeptable Ladezeit (z. B. 2000 ms)
        const maxLoadTime = 2000;

        // Überprüfe, ob die Ladezeit innerhalb der akzeptablen Zeit liegt
        expect(loadTime).to.be.lessThan(maxLoadTime);

        // Optional: Ausgabe der Ladezeit für die Berichterstattung
        cy.log(`Ladezeit des Kalenders: ${loadTime} ms`);
    });
});
