// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import "cypress-file-upload";
// Signup
Cypress.Commands.add('Signup', user => {
  cy.contains('Sign up').click()
  // cy.location('pathname').should("eq", 'http://localhost:4000/signup');
  cy.location('pathname').should('eq', '/signup')
  cy.get("[name='givenNames']").type(user.username)
  cy.get("[name='surname']").type(user.surname)
  cy.get("[name='username']").type(user.username)
  cy.get("[name='email']").type(user.email)
  cy.get("[name='password']").type(user.password)
  cy.get("[type='submit']").click()
})

// Login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:4000/login')
  cy.get("[name='username']").type(username)
  cy.get("[name='password']").type(password)
  cy.get("[type='submit']").click()
  cy.location('pathname', { timeout: 8000 }).should('eq', '/books')
})

// Logout
Cypress.Commands.add('logout', () => {
  cy.get("[title='User Menu dropdown']").click()
  cy.get("[title='Log Out']").click()
})

// Entering into team manager settings
Cypress.Commands.add('teamManagerSettings', () => {
  cy.get("[title='User Menu dropdown']", { timeout: 8000 }).click()
  cy.get("[href='/globalTeams']").click()
})

// Adding a book
Cypress.Commands.add('addBook', bookName => {
  cy.get("[title='ADD BOOK']", { timeout: 8000 }).click()
  cy.get("[name='title'").type(bookName)
  cy.contains('span', 'Save').click()
  cy.contains('a', bookName, { timeout: 8000 })
})

Cypress.Commands.add('dragAndDrop', (subject, target) => {
  Cypress.log({
    name: 'DRAGNDROP',
    message: `Dragging element ${subject} to ${target}`,
    consoleProps: () => {
      return {
        subject,
        target,
      }
    },
  })
  const BUTTON_INDEX = 0
  const SLOPPY_CLICK_THRESHOLD = 10
  cy.get(target)
    .first()
    .then($target => {
      const coordsDrop = $target[0].getBoundingClientRect()
      cy.get(subject)
        .first()
        // eslint-disable-next-line no-shadow
        .then(subject => {
          const coordsDrag = subject[0].getBoundingClientRect()
          cy.wrap(subject)
            .trigger('mousedown', {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x,
              clientY: coordsDrag.y,
              force: true,
            })
            .trigger('mousemove', {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
              clientY: coordsDrag.y,
              force: true,
            })
          cy.get('body')
            .trigger('mousemove', {
              button: BUTTON_INDEX,
              clientX: coordsDrop.x,
              clientY: coordsDrop.y,
              force: true,
            })
            .trigger('mouseup')
        })
    })
})

Cypress.Commands.add('planBookOen', () => {
  cy.get('[data-cy="book"]').then($book => {
    if ($book.text().includes('Plan Book')) {
      Cypress.env('oenBoolean', true)
      cy.contains('Plan Book').click()
      cy.get('button:nth(2)').should('have.text', 'Start').click()
      cy.get('button:nth(2)')
        .should('have.text', 'Parts, Chapters and Sections')
        .click()
      cy.get('button:nth(7)').should('have.text', '④ Review Textbook').click()
      cy.get('button:nth(12)').should('have.text', 'Build Book').click()
      cy.get('button[title="Yes"]').click()
      cy.contains('Edit').should('exist')
    } else {
      Cypress.env('oenBoolean', false)
      cy.contains('Edit').should('exist')
    }
  })
})

Cypress.Commands.add('uploadDoc', (path, name) => {
  cy.get("[id='file-uploader-generic']").selectFile(`${path}`, {
    force: true,
  })
  cy.contains('span', `${name}`, { timeout: 10000 })
})
