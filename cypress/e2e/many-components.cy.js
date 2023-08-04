/*
// This test is commented because it takes a long time to load
//So, it will be run only locally for specific tasks

import { admin, book } from '../support/credentials'

describe('Adding lots of components to a book', () => {
  before(() => {
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.contains(book.name).should('exist')
    cy.planBookOen()
  })

  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.contains('Edit', { timeout: 10000 }).click()
  })

  it('Front-matter', () => {
    for (let i = 0; i < 25; i++) {
      cy.get("[title='Add Component']").first().click()
      cy.log(`Component in front-matter ${i}`)
    }
  })

  it('Body', () => {
    for (let i = 0; i < 50; i++) {
      cy.get("[title='Add Chapter']").click()
      cy.log(`Chapter ${i}`)
    }

    for (let i = 0; i < 50; i++) {
      cy.get("[title='Add Part']").click()
      cy.log(`Part ${i}`)
    }

    for (let i = 0; i < 50; i++) {
      cy.get("[title='Add Unnumbered']").click()
      cy.log(`Unnumbered ${i}`)
    }
  })

  it('Back-Matter', () => {
    for (let i = 0; i < 50; i++) {
      cy.get("[title='Add Component']").last().click()
      cy.log(`Component in Back-matter ${i}`)
    }

    cy.get('button[title="Add notes placeholder"]').click()
    cy.get('[title="Ok"]').click()
  })
})

*/
