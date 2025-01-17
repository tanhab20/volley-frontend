import * as cypress from "cypress";
describe('Turniere Seite - Performance Test', () => {

    it('should load the tournament list within 2 seconds', () => {
        const startTime = performance.now();

        cy.visit('https://kavolley.uber.space/tournaments');

        const endTime = performance.now();
        const loadTime = endTime - startTime;


        expect(loadTime).to.be.lessThan(2000);
    });

});
