import LoginPage from '../pageObjects/loginPage'


Cypress.Commands.add('login', (username, password) => {
    const loginPage = new LoginPage();
    cy.visit("/")
    loginPage.login(username, password);
  });

  Cypress.Commands.add('getIframeBody', (iframeSelector) => {
    return cy
      .get(iframeSelector)
      .its('0.contentDocument.body').should('not.be.empty')
      .then(cy.wrap);
  });
  