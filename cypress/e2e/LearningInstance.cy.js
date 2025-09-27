import '../support/commands';
import learningAPI from '../pageObjects/learningInstanceAPI';

describe('Learning Instance API Tests', () => {
  before('Login via UI and fetch token', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'));

    cy.get('.homepage-welcome-title', { timeout: 10000 }).should('be.visible');
    cy.url().should('include', '/home');

    cy.window().then((win) => {
      const token = win.localStorage.getItem('authToken');
      expect(token).to.be.a('string');
      Cypress.env('AA_TOKEN', token);
      cy.log('Fetched auth token:', token);
    });
  });

  it('Check name availability and create learning instance via API', () => {
    cy.visit('/#/modules/cognitive/iqbot/pages/learning-instances');

    cy.fixture('learninginstance.json').then((payload) => {
      const uniqueName =  payload.name;
    
      learningAPI.checkNameAvailability(uniqueName).then((res) => {
        if (res.body.isAvailable) {
          cy.log(`Name "${uniqueName}" is available, creating instance`);

          learningAPI.create(payload).then((resp) => {
            expect(resp.status).to.be.oneOf([200, 201]);

            const instanceId = learningAPI.extractId(resp.body);
            cy.log('Created Learning Instance ID:', instanceId);
            cy.log('Unique Name:', resp.body.uniqueName);

            Cypress.env('LEARNING_INSTANCE_ID', instanceId);
          });
        } else {
          cy.log(`Name "${uniqueName}" not available. Choosing another name...`);
        }
      });
    });
  });
});
