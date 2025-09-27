class LearningInstanceAPI {
    constructor() {
      this.basePath = '/cognitive/v3/learninginstances';
    }
  
    authHeader() {
        const token = Cypress.env('AA_TOKEN');
        if (!token) throw new Error('Authorization token not found!');
        return { 'x-authorization': token };
      }      
  
      checkNameAvailability(name) {
        const encodedName = encodeURIComponent(name);
        return cy.request({
          method: 'GET',
          url: `${this.basePath}/checkavailability/${encodedName}`,
          headers: this.authHeader(),
          failOnStatusCode: false,
        });
      }
      
    create(payload) {
      return cy.request({
        method: 'POST',
        url: this.basePath,
        headers: {
          ...this.authHeader(),
          'Content-Type': 'application/json'
        },
        body: payload,
        failOnStatusCode: false
      });
    }

    extractId(responseBody) {
      return responseBody?.id || null;
    }
  }
  
  export default new LearningInstanceAPI();
  