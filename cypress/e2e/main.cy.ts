const appUrl = 'http://localhost:5173';

describe('template spec', () => {
  it('passes', () => {
    cy.visit(appUrl);
  });
});
