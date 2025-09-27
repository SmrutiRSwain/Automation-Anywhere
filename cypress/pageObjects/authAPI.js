class AuthAPI {
    constructor() {
      this.authUrl = '/v2/authentication'; // relative to baseUrl
    }
  
    login(username, password) {
      return cy.request({
        method: 'POST',
        url: this.authUrl,
        body: { username, password },
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).to.exist;
        Cypress.env('AA_TOKEN', response.body.token); // store token
        return response.body.token;
      });
    }
  
    getToken() {
      const token = Cypress.env('AA_TOKEN');
      if (!token) throw new Error('Token not found. Login first.');
      return token;
    }
  }
  
  module.exports = new AuthAPI();
  