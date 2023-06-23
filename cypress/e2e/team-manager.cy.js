/* eslint-disable jest/expect-expect */
const { admin, newUser, book } = require('../support/credentials')

const currentUser = newUser

const addMember = role => {
  cy.contains(role).click()
  cy.get('.css-g1d714-ValueContainer')
    .click()
    .type(`${currentUser.username}{enter}`)
  cy.get("[id='react-select-2-option-0']", { timeout: 10000 }).click({
    force: true,
  })
}

/*
const removingMember=()=>{
    cy.log(`Removing ${currentUser.username}...`);
    cy.contains(currentUser.username,{timeout:8000}).should("exist")
    cy.get(`[data-cy='Remove_${currentUser.username}']`,{timeout:8000}).click()
    cy.contains(currentUser.username,{timeout:8000}).should("not.exist")
} */

describe('Global Team manager settings', () => {
  before(() => {
    cy.visit('/')
    cy.Signup(currentUser)
    cy.visit('/')
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    // cy.reload()
    cy.contains(book.name).should('exist')
    cy.planBookOen()
    // cy.addBook('Z-testbook')
  })

  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.teamManagerSettings()
  })

  it('Adding a Global Production Editor', () => {
    cy.get('.css-g1d714-ValueContainer')
      .last()
      .click()
      .type(`${currentUser.username}{enter}`)
    // Random click to close the memberlist dropdown
    cy.contains('Production Editor').click()
    cy.get("[title='Save']").click()
    cy.contains(currentUser.username).should('exist')
  })

  it('Logging in as a global production editor', () => {
    cy.login(currentUser.username, currentUser.password)
    cy.get("[title='User Menu dropdown']", { timeout: 8000 }).click()
    cy.get("[href='/globalTeams']").should('not.exist')
    cy.get("[href='/templates']").should('exist').click()
  })

  it('Removing a Production Editor', () => {
    cy.get('.css-g1d714-ValueContainer').last().click().type('{backspace}')
    cy.contains('Production Editor').click()
    cy.get("[title='Save']").click()
    cy.contains(currentUser.username).should('not.exist')
    cy.visit('/books')
    cy.contains('Archive').click()
    cy.get('button[title="Yes"]').click()
    cy.contains(book.name).should('not.exist')
  })
})

describe('Book specific Team manager settings', () => {
  before(() => {
    cy.visit('/')
    // cy.Signup(currentUser);
    cy.visit('/')
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    // cy.reload()
    cy.contains(book.name).should('exist')
    cy.planBookOen()
    cy.addBook('Z-testbook')
  })

  /*  it('Creating a book', () => {
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.reload()
    cy.contains(book.name).should('exist')
    cy.addBook('Z-testbook')
  }) */

  it('Adding Production Editor', () => {
    cy.login(admin.username, admin.password)
    cy.contains('Edit', { timeout: 8000 }).click()
    cy.contains('Team Manager').click()
    addMember('Add Production Editor')
  })

  it('Logging in with production editor privileges', () => {
    cy.login(currentUser.username, currentUser.password)
    cy.get("[title='User Menu dropdown']", { timeout: 8000 }).click()

    // Only for OEN
    // cy.get("[href='/templates']").should("not.exist")

    cy.get("[href='/globalTeams']").should('not.exist')
    cy.contains('a', 'Z-testBook', { timeout: 5000 }).should('not.exist')
    cy.contains('button', 'Rename', { timeout: 5000 }).should('exist')
    cy.contains('button', 'Archive').should('exist')
    cy.contains('a', 'Edit').click({ force: true })

    if (Cypress.env('oenBoolean') === true) {
      cy.log('You cannot upload a file in OEN.')
      cy.log('There are no Book Settings in OEn.')
    } else {
      cy.get('[title="Upload word files"]', { timeout: 5000 }).should('exist')
      cy.get('[title="Book Settings"]').should('exist')
    }

    cy.get('[title="Team Manager"]').should('exist')
    cy.get('[title="Metadata"]').should('exist')
    cy.get('[title="Asset Manager"]').should('exist')
    cy.get('[ title="Export Book"]').should('exist')
    cy.get("[title='Add Component']").first().should('exist') // Add Component Frontmatter
    cy.get("[title='Add Chapter']").should('exist')
    cy.get("[title='Add Part']").should('exist')
    cy.get("[title='Add Unnumbered']").should('exist')
  })

  it('Adding Copy Editor', () => {
    cy.login(admin.username, admin.password)
    cy.contains('Edit', { timeout: 8000 }).click()
    cy.contains('Team Manager').click()
    cy.get('button[title="Remove"]').click()
    // removingMember();
    addMember('Add Copy Editors')
  })

  it('Loggin in with copy editor privileges', () => {
    cy.login(currentUser.username, currentUser.password)
    cy.get("[title='User Menu dropdown']", { timeout: 8000 }).click()

    // Only for OEN
    // cy.get("[href='/templates']").should("not.exist")
    cy.get("[href='/globalTeams']").should('not.exist')
    cy.contains('a', 'Z-testBook', { timeout: 5000 }).should('not.exist')
    cy.contains('button', 'Rename', { timeout: 5000 }).should('not.exist')
    cy.contains('button', 'Archive').should('not.exist')
    cy.contains('a', 'Edit').click({ force: true })

    if (Cypress.env('oenBoolean') === true) {
      cy.log('You cannot upload a file in OEN.')
      cy.log('There are no Book Settings in OEn.')
    } else {
      cy.get('[title="Upload word files"]', { timeout: 5000 }).should('exist')
      cy.get('[title="Book Settings"]').should('exist')
    }

    cy.get('[title="Team Manager"]').should('not.exist')
    cy.get('[title="Metadata"]').should('exist')
    cy.get('[title="Asset Manager"]').should('exist')
    cy.get('[ title="Export Book"]').should('exist')
    cy.get("[title='Add Component']").first().should('exist') // Add Component Frontmatter
    cy.get("[title='Add Chapter']").should('exist')
    cy.get("[title='Add Part']").should('exist')
    cy.get("[title='Add Unnumbered']").should('exist')
  })

  it('Adding Author', () => {
    cy.login(admin.username, admin.password)
    cy.contains('Edit', { timeout: 8000 }).click()
    cy.contains('Team Manager').click()

    // removingMember();
    cy.get('button[title="Remove"]').click()
    addMember('Add Authors')
  })

  it('Logging in with an account with author privilege', () => {
    cy.login(currentUser.username, currentUser.password)
    cy.get("[title='User Menu dropdown']", { timeout: 8000 }).click()

    // Only for OEN
    // cy.get("[href='/templates']").should("not.exist")

    cy.get("[href='/globalTeams']").should('not.exist')
    cy.contains('a', 'Z-testBook', { timeout: 5000 }).should('not.exist')
    cy.contains('button', 'Rename', { timeout: 5000 }).should('not.exist')
    cy.contains('button', 'Archive').should('not.exist')
    cy.contains('a', 'Edit').click({ force: true })

    if (Cypress.env('oenBoolean') === true) {
      cy.log('You cannot upload a file in OEN.')
      cy.log('There are no Book Settings in OEn.')
    } else {
      cy.get('[title="Upload word files"]', { timeout: 5000 }).should(
        'not.exist',
      )
      cy.get('[title="Book Settings"]').should('exist')
    }

    cy.get('[title="Team Manager"]').should('not.exist')
    cy.get('[title="Metadata"]').should('exist')
    cy.get('[title="Asset Manager"]').should('exist')
    cy.get("[title='Add Component']").should('not.exist')
    cy.get("[title='Add Chapter']").should('not.exist')
    cy.get("[title='Add Part']").should('not.exist')
    cy.get("[title='Add Unnumbered']").should('not.exist')
  })
})
