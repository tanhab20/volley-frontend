import * as cypress from "cypress";

describe('Turniere Seite', () => {

  it('zeigt alle Turniere an', () => {
    cy.visit('http://web:3000/tournaments');
    cy.contains('Sommerfußball-Cup 2024').should('be.visible');
    cy.contains('Internationales Schachturnier').should('be.visible');
    cy.contains('Tennis Masters 2024').should('be.visible');
  });

  it('öffnet die Detailseite eines Turniers und zeigt den Einschreiben-Button', () => {
    cy.visit('http://web:3000/tournaments');
    cy.contains('Mehr Details').click();

    cy.wait
    cy.url().should('include', '/tournament/1');
    cy.contains('Sommerfußball-Cup 2024').should('be.visible');
    cy.contains('Für Turnier einschreiben').should('be.visible');
  });

  it('klickt auf den Einschreiben-Button', () => {
    cy.visit('http://web:3000/tournament/1');
    cy.contains('Für Turnier einschreiben').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Team für das Turnier Sommerfußball-Cup 2024 eingeschrieben!');
    });
  });

});
