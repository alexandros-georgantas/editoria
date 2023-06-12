/* eslint-disable jest/expect-expect */
/// <reference types="cypress"/>

const { admin, book } = require('../support/credentials')

describe('Book Metadata', () => {
  let metadata
  beforeEach(() => {
    cy.login(admin.username, admin.password)
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
    cy.contains(book.name).should('exist')
    cy.contains('Edit', { timeout: 8000 }).click()
    cy.contains('Metadata', { timeout: 8000 }).click()
    cy.get("[id='edition']", { timeout: 8000 }).type(metadata.edition)
    cy.get("[id='copyrightStatement']").type(metadata.copyright_statement)
    cy.get("[id='copyrightYear']").type(metadata.copyright_year)
    cy.get("[id='copyrightHolder']").type(metadata.copyright_holder)
    cy.get("[id='license']").type(metadata.license)
    cy.get("[id='isbn']").type(metadata.isbn)
    cy.get("[id='issn']").type(metadata.issn)
    cy.get("[id='issnL']").type(metadata.issn_l)
    cy.get("[id='publicationDate']").type(metadata.publication_date)
    cy.contains('span', 'Save Metadata').click()
  })

  it('Checking metadata', () => {
    cy.contains(book.name).should('exist')
    cy.contains('Edit', { timeout: 8000 }).click()
    cy.contains('Metadata', { timeout: 8000 }).click()
    cy.get("[id='edition']", { timeout: 8000 }).should(
      'have.value',
      metadata.edition,
    )
    cy.get("[id='copyrightStatement']").should(
      'have.value',
      metadata.copyright_statement,
    )
    cy.get("[id='copyrightYear']").should('have.value', metadata.copyright_year)
    cy.get("[id='copyrightHolder']").should(
      'have.value',
      metadata.copyright_holder,
    )
    cy.get("[id='license']").should('have.value', metadata.license)
    cy.get("[id='isbn']").should('have.value', metadata.isbn)
    cy.get("[id='issn']").should('have.value', metadata.issn)
    cy.get("[id='issnL']").should('have.value', metadata.issn_l)
    cy.get("[id='publicationDate']").should(
      'have.value',
      metadata.publication_date,
    )
    cy.contains('span', 'Save Metadata').click()
  })
})
