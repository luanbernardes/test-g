Cypress.on('uncaught:exception', () => {
  return false;
});

function signIn() {
  const email = 'eve.holt@reqres.in';
  const password = 'cityslicka';

  cy.get('body').should('exist');

  // Redirect to Signin without token logged
  cy.location('pathname', { timeout: 2000 }).should('eq', '/sign-in');
  cy.url().then((url) => console.log('Current URL:', url));

  // sign in with wrong email
  cy.get('input[name="email"]').type('error@error.com');
  cy.get('input[name="password"]').type(password);
  cy.contains('button', 'log in').click();
  cy.get('h5').contains('Failed to login').should('exist');

  cy.get('input[name="email"]').clear();
  cy.get('input[name="email"]').type(email);

  cy.contains('button', 'log in').click();
}

describe('Main spec', () => {
  beforeEach(() => {
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

  it('Sign up', () => {
    const newUser = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    };

    cy.visit('/sign-up');
    cy.get('input[name="email"]').type('error@error.com');
    cy.get('input[name="password"]').type(newUser.password);
    cy.get('input[name="confirmPassword"]').type('another password');
    cy.get('button[aria-label="sign-up"]').click();
    cy.get('h5').contains('Password and Confirm Password not match').should('exist');
    cy.get('input[name="confirmPassword"]').clear();

    // add confirmPassword correctly
    cy.get('input[name="confirmPassword"]').type(newUser.password);
    cy.get('button[aria-label="sign-up"]').click();

    // add name correctly
    cy.get('h5').contains('Failed to sign up').should('exist');
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('button[aria-label="sign-up"]').click();

    // go to home (Dashboard page)
    cy.location('pathname', { timeout: 2000 }).should('eq', '/');
  });
});
