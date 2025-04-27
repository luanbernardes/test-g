Cypress.on('uncaught:exception', () => {
  return false;
});

const email = 'eve.holt@reqres.in';
const password = 'cityslicka';

function signIn() {
  cy.get('body').should('exist');

  // Redirect to Signin without token logged
  cy.location('pathname', { timeout: 2000 }).should('eq', '/sign-in');
  cy.url().then((url) => console.log('Current URL:', url));

  // sign in
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains('button', 'log in').click();
}

describe('Main spec', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('access root without logged', () => {
    const newUser = {
      name: 'Carolina',
      job: 'QA'
    };

    cy.visit('/');

    signIn();

    // Dashboard page
    cy.location('pathname', { timeout: 2000 }).should('eq', '/');
    cy.contains('h1', 'Dashboard');

    // first item of list
    cy.get('h3').contains('George Bluth').should('exist');
    cy.get('button[aria-label="edit"]:first').click();
    // change name
    cy.get('input[name="first_name"]').clear();
    cy.get('input[name="first_name"]').type('New First Name');
    cy.get('button[aria-label="save"]:first').click();
    cy.get('h3').contains('New First Name Bluth').should('exist');

    // delete
    cy.get('button[aria-label="edit"]:first').click();
    cy.get('button[aria-label="delete"]').click();
    cy.get('h3').contains('New First Name Bluth').should('not.exist');

    // add new user
    cy.get('button[aria-label="add-new-user"]:first').click();
    cy.get('input[name="name"]').type(newUser.name);
    cy.get('input[name="job"]').type(newUser.job);
    cy.get('button[aria-label="submit-new-user"]').click();
    cy.get('h5').contains('User added successfully!').should('exist');
    cy.get('body').click(0, 0);

    // logout
    cy.get('button').contains('logout').click();
  });
});
