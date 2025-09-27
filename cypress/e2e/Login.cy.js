import '../support/commands'

describe('Login Page Automation', () => {
  before("Login", () => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
})
  it('Should log in successfully', () => {
    cy.get('.homepage-welcome-title',{timeout:10000}).should('be.visible');
    cy.url().should('include', '/home');
  });
});
