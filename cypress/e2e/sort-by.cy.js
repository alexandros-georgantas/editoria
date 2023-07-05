/// <reference types="cypress" />
const { admin } = require('../support/credentials')

describe('Sort by Title', () => {
  before(() => {
    //  cy.exec('docker exec server_server_1 node ./scripts/seeds/createVerifiedUser.js email1234@gmail.com user1234')
    //  NOTE: delete the sign up command after adding script
    cy.login(admin.username, admin.password)
    cy.addBook('B')
    cy.reload()
    cy.addBook('C')
    cy.reload()
    cy.addBook('A')
    cy.reload()
  })

  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.location('pathname').should('eq', '/books')
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

  it('Publishing the first two books', () => {
    // Publishing the first book
    cy.get('[data-cy=book]:first').planBookOen()
    cy.get('[data-cy=book]:first').contains('Edit').click()
    cy.contains('Metadata', { timeout: 8000 }).click()
    cy.get('#publicationDate').type('2001-01-01')
    cy.contains('Save Metadata').click()
    cy.contains('Save Metadata').should('not.exist', { timeout: 5000 })

    cy.get("a[href='/books']:nth(1)", { timeout: 8000 }).click()
    // Publishing the second book
    cy.get('[data-cy=book]:nth(1)').planBookOen()
    cy.get('[data-cy=book]:nth(1)').contains('Edit').click()
    cy.contains('Metadata', { timeout: 8000 }).click()
    cy.get('#publicationDate').type('1999-01-01')
    cy.contains('Save Metadata').click()
  })

  it('Sort by Status - Ascending', () => {
    cy.contains('title').click()
    cy.contains('pub. date').click()
    cy.get('[data-cy="book"]').first().contains('B')
    cy.get('[data-cy="book"]:nth(1)').contains('A')
    cy.get('[data-cy="book"]').last().contains('C')
  })

  it('Sort by Status - Descending', () => {
    cy.contains('title').click()
    cy.contains('pub. date').click()
    cy.get("[title='Ascending']").click()
    cy.get('[data-cy="book"]').first().contains('C')
    cy.get('[data-cy="book"]:nth(1)').contains('A')
    cy.get('[data-cy="book"]').last().contains('B')
  })
})
