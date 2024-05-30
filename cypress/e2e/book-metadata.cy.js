/* eslint-disable jest/expect-expect */
/// <reference types="cypress"/>

const { admin, book } = require('../support/credentials')

describe('Book Metadata', () => {
  let metadata
  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.contains(book.name).should('exist')
    cy.contains('Edit', { timeout: 8000 }).click()
    cy.contains('Metadata', { timeout: 8000 }).click()
  })

  before(() => {
    cy.fixture('book-metadata').then(content => {
      metadata = content
    })

    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.contains(book.name, { timeout: 10000 })
    cy.planBookOen()
  })

  it('Adding metadata', () => {
    cy.typeIntoField('edition', metadata.edition)
    cy.typeIntoField('copyrightStatement', metadata.copyright_statement)
    cy.typeIntoField('copyrightYear', metadata.copyright_year)
    cy.typeIntoField('copyrightHolder', metadata.copyright_holder)
    cy.typeIntoField('license', metadata.license)
    cy.typeIntoField('isbn', metadata.isbn)
    cy.typeIntoField('issn', metadata.issn)
    cy.typeIntoField('issnL', metadata.issn_l)
    cy.typeIntoField('publicationDate', metadata.publication_date)

    cy.contains('span', 'Save Metadata').click()
  })

  it('Checking metadata', () => {
    cy.assertFieldValue('edition', metadata.edition)
    cy.assertFieldValue('copyrightStatement', metadata.copyright_statement)
    cy.assertFieldValue('copyrightYear', metadata.copyright_year)
    cy.assertFieldValue('copyrightHolder', metadata.copyright_holder)
    cy.assertFieldValue('license', metadata.license)
    cy.assertFieldValue('isbn', metadata.isbn)
    cy.assertFieldValue('issn', metadata.issn)
    cy.assertFieldValue('issnL', metadata.issn_l)
    cy.assertFieldValue('publicationDate', metadata.publication_date)

    cy.contains('span', 'Cancel').click()
  })
})

Cypress.Commands.add('typeIntoField', (fieldId, value) => {
  cy.get(`[id='${fieldId}']`).type(value)
})

Cypress.Commands.add('assertFieldValue', (fieldId, value) => {
  cy.get(`[id='${fieldId}']`).should('have.value', value)
})
