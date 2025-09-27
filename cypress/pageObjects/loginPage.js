class LoginPage {

  usernameField = 'input[name="username"]';
  passwordField = 'input[name="password"]';
  loginBtn = 'button[name="submitLogin"]';

  
    login(username, password) {
        cy.get(this.usernameField).should('be.visible').clear().type(username,{ log: false });
        cy.get(this.passwordField).should('be.visible').clear().type(password,{ log: false });
        cy.get(this.loginBtn).should('be.enabled').click();
    }
  }
  
  export default LoginPage;
  