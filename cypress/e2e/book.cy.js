/* eslint-disable jest/expect-expect */

const { admin, book } = require('../support/credentials')

describe('Book list', () => {
  beforeEach(() => {
    cy.login(admin.username, admin.password)
  })

  it('Adding a book', () => {
    cy.addBook(book.name)
  })

  it('Renaming a book', () => {
    cy.contains('button', 'Rename').click({ timeout: 8000 })
    cy.get("[name='renameTitle']").clear().type(book.newName)
    cy.contains('button', 'Save').click()
    cy.contains('a', book.newName)
  })

  it('Archiving a book', () => {
    cy.contains('a', book.newName)
    cy.contains('button', 'Archive').click({ timeout: 6000 })
    cy.contains('span', 'Yes').click()
    cy.contains('000test1').should('not.be.exist')
  })

  it('Checking if the book is archived', () => {
    cy.get("[title='SHOW ARCHIVED']").click()
    cy.get("[title='HIDE ARCHIVED']").should('be.visible')
    cy.contains(book.newName, { timeout: 6000 }).should('exist')
  })

  it('Deleting an archived book', () => {
    cy.get("[title='SHOW ARCHIVED']").click()
    cy.contains(book.newName).should('exist')
    cy.contains('button', 'Delete').click()
    cy.contains(
      `Are you sure you want to delete the book with title ${book.newName}?`,
    )
    cy.contains('span', 'Yes').click()
    cy.contains(book.newName).should('not.exist')
  })
})
