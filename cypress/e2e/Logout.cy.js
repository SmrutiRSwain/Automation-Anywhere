import '../support/commands';
import LogoutPage from '../pageObjects/logoutPage';


describe('Login Page Automation', () => {
  before("Login", () => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

  it('Should log out successfully', () => {
    const logout = new LogoutPage(); 
    logout.logout();           

    cy.url().should('include', '/login');
  });
});
