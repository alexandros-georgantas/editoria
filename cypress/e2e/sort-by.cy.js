/// <reference types="cypress" />
const { admin } = require('../support/credentials')

describe('Sort by Title', () => {
  before(() => {
    //  cy.exec('docker exec server_server_1 node ./scripts/seeds/createVerifiedUser.js email1234@gmail.com user1234')
    //  NOTE: delete the sign up command after adding script
    cy.login(admin.username, admin.password)
    cy.addBook('B')
    cy.addBook('C')
    cy.addBook('A')
    cy.logout()
  })

  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.location('pathname').should('eq', '/books')
  })

  it('Sort by Title - Ascending', () => {
    cy.contains('Title').click()
    cy.contains('Title').click({ force: true })
    cy.checkOrder('A', 'B', 'C')
  })

  it('Sort by Title - Descending', () => {
    cy.get("[title='Ascending']", { timeout: 6500 }).click()
    cy.checkOrder('C', 'B', 'A')
  })
})

describe('Sort by Status', () => {
  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.location('pathname').should('eq', '/books')
  })

  it('Publishing the first two books', () => {
    // Publishing the first book
    cy.get('[data-cy=book]:first', { timeout: 6500 }).planBookOen()
    cy.publishBook('0', '2001-01-01')

    cy.get("a[href='/books']:nth(1)", { timeout: 8000 }).click()
    // Publishing the second book
    cy.get('[data-cy=book]:nth(1)', { timeout: 6500 }).planBookOen()
    cy.publishBook('1', '1999-01-01')
  })

  it('Sort by Status - Ascending', () => {
    cy.contains('Title', { timeout: 6000 }).click()
    cy.contains('Pub. date').click()
    cy.checkOrder('B', 'A', 'C')
  })

  it('Sort by Status - Descending', () => {
    cy.contains('Title', { timeout: 6000 }).click()
    cy.contains('Pub. date').click()
    cy.get("[title='Ascending']").click()
    cy.checkOrder('C', 'A', 'B')
  })
})

Cypress.Commands.add('checkOrder', (firstBook, secondBook, thirdBook) => {
  cy.get('[data-cy="book"]').first().contains(`${firstBook}`)
  cy.get('[data-cy="book"]:nth(1)').contains(`${secondBook}`)
  cy.get('[data-cy="book"]').last().contains(`${thirdBook}`)
})

Cypress.Commands.add('publishBook', (bookIndex, pubDate) => {
  cy.get(`[data-cy=book]:nth(${bookIndex})`).contains('Edit').click()
  cy.contains('Metadata', { timeout: 8000 }).click()
  cy.get('#publicationDate').type(`${pubDate}`)
  cy.contains('Save Metadata').click()
  cy.contains('Save Metadata').should('not.exist', { timeout: 5000 })
})
