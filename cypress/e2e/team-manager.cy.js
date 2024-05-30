/* eslint-disable jest/expect-expect */
const {
  admin,
  newUser,
  book,
  globalProdEditor,
} = require('../support/credentials')

const currentUser = newUser

const addMember = role => {
  cy.contains(role).click()
  cy.get('.css-g1d714-ValueContainer')
    .click()
    .type(`${currentUser.username}{enter}`)
  cy.get("[id='react-select-2-option-0']", { timeout: 10000 }).click({
    force: true,
  })
  cy.contains('Remove', { timeout: 10000 }).should('exist') // remove will show only after a member is added
}

const removingMember = () => {
  cy.contains('Team Manager').click()
  cy.get('button[title="Remove"]').click()
}

describe('Global Team manager settings', () => {
  before(() => {
    cy.exec(
      `docker exec kdk-server-1 node /home/node/server/scripts/seeds/createVerifiedUser.js globalProdEditor@example.com global ProdEditor`,
    )
    cy.visit('/')
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.contains(book.name).should('exist')
    cy.planBookOen()
  })

  it('Adding a Global Production Editor', () => {
    cy.login(admin.username, admin.password)
    cy.teamManagerSettings()
    cy.get('.css-g1d714-ValueContainer')
      .last()
      .click()
      .type(`${globalProdEditor.username}{enter}`)
    // Random click to close the memberlist dropdown
    cy.contains('Production Editor').click()
    cy.get("[title='Save']").click()
    cy.contains(globalProdEditor.username).should('exist')
  })

  it('Logging in as a global production editor', () => {
    cy.login(globalProdEditor.username, globalProdEditor.password)
    cy.get("[href='/globalTeams']").should('not.exist')
    cy.get("[href='/templates']").should('exist')
    cy.contains('Edit').should('exist').click()

    cy.checkBookBuilder('globalProdEditor')

    cy.get(' [href="/books"]').first().click()
    cy.location('pathname').should('eq', '/books')

    cy.contains('Rename').should('exist')
    cy.contains('Archive').should('exist').click()
    cy.get('button[title="Yes"]').click()
    cy.contains('SHOW ARCHIVED').click()
    cy.contains('Delete').click({ timeout: 5000 })
    cy.location('pathname').should('eq', '/books')
  })

  it('Removing a Global Production Editor', () => {
    cy.login(admin.username, admin.password)
    cy.teamManagerSettings()
    cy.get('.css-g1d714-ValueContainer').last().click().type('{backspace}')
    cy.contains('Production Editor').click()
    cy.get("[title='Save']").click()
    cy.contains(currentUser.username).should('not.exist')
    cy.visit('/books')
    cy.contains(book.name).should('not.exist')
  })
})

describe('Book specific Team manager settings', () => {
  before(() => {
    cy.exec(
      'docker exec kdk-server-1 node /home/node/server/scripts/seeds/createVerifiedUser.js email12345@gmail.com verified User',
    )
    cy.visit('/')
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.contains(book.name).should('exist')
    cy.planBookOen()
    cy.addBook('Z-testbook')
  })

  it('Checking Production Editor permissions', () => {
    cy.login(admin.username, admin.password)
    cy.contains('Edit', { timeout: 8000 }).click()
    cy.contains('Team Manager').click()
    addMember('Add Production Editor')
    cy.contains('Close').click()
    cy.logout()

    cy.login(currentUser.username, currentUser.password)
    cy.get("[title='User Menu dropdown']", { timeout: 8000 }).click()
    cy.contains('verifiedUser')
    cy.get("[title='User Menu dropdown']").click() // Close the dropdown

    cy.checkDashboard('prodEditor')
    cy.contains('a', 'Edit').click({ force: true })

    cy.checkUploadAndSettings('prodEditor')
    cy.checkBookBuilder('prodEditor')
  })

  it('Checking Copy Editor permissions', () => {
    cy.login(admin.username, admin.password)
    cy.contains('Edit', { timeout: 8000 }).click()
    removingMember()
    addMember('Add Copy Editors')
    cy.contains('Close').click()
    cy.logout()

    cy.login(currentUser.username, currentUser.password)
    cy.get("[title='User Menu dropdown']", { timeout: 8000 }).click()

    cy.checkDashboard()
    cy.contains('a', 'Edit').click({ force: true })

    cy.checkUploadAndSettings('copyEditor')
    cy.checkBookBuilder('copyEditor')
  })

  it('Checking Author permissions', () => {
    cy.login(admin.username, admin.password)
    cy.contains('Edit', { timeout: 8000 }).click()
    removingMember()
    addMember('Add Authors')
    cy.contains('Close').click()
    cy.logout()

    cy.login(currentUser.username, currentUser.password)
    cy.get("[title='User Menu dropdown']", { timeout: 8000 }).click()
    cy.contains('verifiedUser')

    cy.checkDashboard()
    cy.contains('a', 'Edit').click({ force: true })

    cy.checkUploadAndSettings('author')
    cy.checkBookBuilder('author')
  })
})

Cypress.Commands.add('checkDashboard', user => {
  cy.get("[href='/globalTeams']").should('not.exist')
  cy.contains('a', 'Z-testBook', { timeout: 5000 }).should('not.exist')
  if (user === 'prodEditor') {
    cy.contains('button', 'Rename', { timeout: 5000 }).should('exist')
    cy.contains('button', 'Archive').should('exist')
  } else {
    cy.contains('button', 'Rename', { timeout: 5000 }).should('not.exist')
    cy.contains('button', 'Archive').should('not.exist')
  }
})

Cypress.Commands.add('checkUploadAndSettings', user => {
  if (Cypress.env('oenBoolean') === true) {
    cy.log('You cannot upload a file in OEN.')
    cy.log('There are no Book Settings in OEn.')
    cy.get("[href='/templates']").should('not.exist')
  } else {
    cy.get('[title="Book Settings"]').should('exist')
    if (user === 'author') {
      cy.get('[title="Upload word files"]', { timeout: 5000 }).should(
        'not.exist',
      )
    } else {
      cy.get('[title="Upload word files"]', { timeout: 5000 }).should('exist')
    }
  }
})

Cypress.Commands.add('checkBookBuilder', user => {
  if (user === 'globalProdEditor' || user === 'prodEditor') {
    cy.get('[title="Team Manager"]', { timeout: 5000 }).should('exist')
  } else {
    cy.get('[title="Team Manager"]', { timeout: 5000 }).should('not.exist')
  }
  const elementsToCheck = [
    'Metadata',
    'Asset Manager',
    'Export Book',
    'Add Part',
    'Add Component',
    'Add Chapter',
    'Add Unnumbered',
  ]
  elementsToCheck.forEach(element => {
    if (
      user === 'author' &&
      ['Add Part', 'Add Component', 'Add Chapter', 'Add Unnumbered'].includes(
        element,
      )
    ) {
      cy.get(`[title='${element}']`, { timeout: 5000 }).should('not.exist')
    } else {
      cy.get(`[title='${element}']`, { timeout: 5000 }).should('exist')
    }
  })
})
