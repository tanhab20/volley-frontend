describe('Turniere Seite - Performance Test', () => {

    it('should load the tournament list within 2 seconds', () => {
        const startTime = performance.now();

        cy.visit('http://localhost:3000/tournaments');

        const endTime = performance.now();
        const loadTime = endTime - startTime;

        // Überprüfen, ob die Seite in weniger als 2 Sekunden lädt
        expect(loadTime).to.be.lessThan(2000); // 2000 Millisekunden = 2 Sekunden
    });

});
