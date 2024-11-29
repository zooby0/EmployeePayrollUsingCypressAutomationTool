import 'cypress-mochawesome-reporter/register';
require('cypress-xpath');

describe('Spektrumais Payroll Test', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  beforeEach(() => {
    cy.fixture('punchData').as('data');
  });

  it('should log in and create a new punch', function() {
    const punchTime = yesterday.toLocaleDateString('en-GB') + ' ' + yesterday.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    this.data.punchData.punchTime = punchTime;

    // Access the web-app
    cy.visit('https://spektrumais-payroll-improve.azurewebsites.net/');

    // Verify login page is accessed
    cy.title().should('include', 'Log On');

    // Log in
    cy.login(this.data.loginCredentials);

    // Wait for the Punch page to load and verify it is accessed
    cy.url().should('include', '/Punch_ListView');
    cy.title().should('include', 'Punch');

    // Create a new punch
    cy.createPunch(this.data.punchData);

    // Verify punch has been added
    cy.url().should('include', '/Punch_DetailView');
    cy.get('span.Label').should('contain.text', 'ADDITIONAL');

    // Log a message at the end of the test
    cy.log('Testing Pass successfully');
  });
});
