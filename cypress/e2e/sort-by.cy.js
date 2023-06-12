/* eslint-disable jest/expect-expect */
/* eslint-disable no-undef */
/// <reference types="cypress" />
const { admin, newUser } = require('../support/credentials')

const currentUser = newUser

Cypress.Commands.add('addMember', role => {
  cy.contains(role).click()

  cy.get('.css-g1d714-ValueContainer')
    .click()
    .type(`${currentUser.username}{enter}`)

  cy.get("[id='react-select-2-option-0']").click({ force: true })
})

describe('Sort by Title', () => {
  // before(() => {
  //  cy.exec('docker exec server_server_1 node ./scripts/seeds/createVerifiedUser.js email1234@gmail.com user1234')
  //  NOTE: delete the sign up command after adding script
  // }) 

  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.location('pathname').should('eq', '/books')
  })

  it('Adding books', () => {
    cy.addBook('B')
    cy.reload()
    cy.addBook('C')
    cy.reload()
    cy.addBook('A')
    cy.reload()
  })

  it('Sort by Title - Ascending', () => {
    cy.contains('title').click()
    cy.contains('title').click({ force: true })
    cy.get('[data-cy="book"]').first().contains('A')
    cy.get('[data-cy="book"]:nth(1)').contains('B')
    cy.get('[data-cy="book"]').last().contains('C')
  })

  it('Sort by Title - Descending', () => {
    cy.get("[title='Ascending']").click()
    cy.get('[data-cy="book"]').first().contains('C')
    cy.get('[data-cy="book"]:nth(1)').contains('B')
    cy.get('[data-cy="book"]').last().contains('A')
  })
})

describe('Sort by Status', () => {
  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.location('pathname').should('eq', '/books')
  })

  it('Publishing the 1st book', () => {
    cy.get('[data-cy=book]:first')
      .contains('Edit')
      .click()
    cy.contains('Metadata', { timeout: 8000 }).click()
    cy.get('#publicationDate').type('2001-01-01')
    cy.contains("Save Metadata").click()
  })

  it('Sort by Status - Ascending', () => {
    cy.contains('title').click()
    cy.contains('status').click()
    cy.get('[data-cy="book"]').first().contains('B')
    cy.get('[data-cy="book"]:nth(1)').contains('C')
    cy.get('[data-cy="book"]').last().contains('A')
  })

  it('Sort by Status - Descending', () => {
    cy.contains('title').click()
    cy.contains('status').click()
    cy.get("[title='Ascending']").click()
    cy.get('[data-cy="book"]').first().contains('A')
    cy.get('[data-cy="book"]:nth(1)').contains('B')
    cy.get('[data-cy="book"]').last().contains('C')
  })
})

describe('Sort by Author', () => {
  beforeEach(() => {
    cy.login(admin.username, admin.password)
  })

  it('Adding an Author to the last book', () => {
    cy.visit('/signup')
    cy.Signup(currentUser)
    cy.login(admin.username, admin.password)
    cy.teamManagerSettings()
    cy.login(admin.username, admin.password)

    cy.get('[data-cy=book]:last')
      .contains('Edit')
      .click()

    cy.contains('Team Manager').click()
    cy.addMember('Add Authors')
  })

  it('Sort by Author - Ascending', () => {
    cy.contains('title').click()
    cy.contains('author').click()
    cy.get('[data-cy="book"]').first().contains('C')
    cy.get('[data-cy="book"]:nth(1)').contains('A')
    cy.get('[data-cy="book"]').last().contains('B')
  })

  it('Sort by Author - Descending', () => {
    cy.contains('title').click()
    cy.contains('author').click()
    cy.get("[title='Ascending']").click()
    cy.get('[data-cy="book"]').first().contains('A')
    cy.get('[data-cy="book"]:nth(1)').contains('B')
    cy.get('[data-cy="book"]').last().contains('C')
  })
})

