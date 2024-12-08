import * as cypress from "cypress";

describe('Kalender Performance Test', () => {
    it('sollte den Kalender in akzeptabler Zeit laden', () => {

        const startTime = performance.now();


        cy.visit('http://web:3000/calendar');


        cy.get('.custom-calendar').should('be.visible');


        const endTime = performance.now();
        const loadTime = endTime - startTime;


        const maxLoadTime = 2000;


        expect(loadTime).to.be.lessThan(maxLoadTime);


        cy.log(`Ladezeit des Kalenders: ${loadTime} ms`);
    });
});
