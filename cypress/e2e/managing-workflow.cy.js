/* eslint-disable jest/expect-expect */
const { admin, book } = require('../support/credentials')

describe('Managing workflow', () => {
  before(() => {
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.contains(book.name, { timeout: 10000 })
    cy.planBookOen()
    cy.logout()
  })

  it('Changing workflow status', () => {
    cy.login(admin.username, admin.password)
    cy.contains(book.name).click()

    if (Cypress.env('oenBoolean') === true) {
      cy.log('You cannot upload a file in OEN')
      cy.contains('Delete').click()
      cy.contains(
        'Are you sure you want to delete this Part with title Untitled?',
      )
      cy.get('button[title="Yes"]').click()
      cy.wait(5000)
    } else {
      cy.uploadDoc('cypress/fixtures/docs/body.docx', 'body')
      cy.get('[label="Upload word"]', { timeout: 10000 }).should('exist')

      cy.get('svg[id="upload"]').trigger('mouseover')
      cy.get(':nth-child(1) > :nth-child(1) > #workLabel') // Upload
        .siblings()
        .should('be.disabled')
    }

    // File Prep
    cy.moveForward('File Prep')
    // Checking modal text
    cy.contains('CHANGE OF WORKFLOW STATUS', { timeout: 10000 })
    cy.contains(
      'Copy Editors will be able to edit this chapter after updating this workflow status.',
    )
    cy.confirmContinue()

    // Edit
    // cy.contains('Edit').should('be.visible', { timeout: 6000 })
    if (Cypress.env('oenBoolean') === true) {
      cy.get(':nth-child(2) > :nth-child(1) > #workLabel') // Edit
        .should('be.visible', { timeout: 10000 })
        .siblings(':nth(1)')
        .click({ force: true })
      cy.wait(5000)
    } else {
      cy.get(':nth-child(3) > :nth-child(1) > #workLabel') // Edit
        .should('be.visible', { timeout: 10000 })
        .siblings(':nth(1)')
        .click({ force: true })
    }

    // Checking modal text
    cy.contains('CHANGE OF WORKFLOW STATUS', { timeout: 10000 })
    cy.contains(
      'Copy Editors won’t be able to edit but Authors will be able to edit this chapter after updating this workflow status.',
    )
    cy.confirmContinue()

    // Review
    cy.contains('Review').should('be.visible', { timeout: 10000 })
    cy.moveForward('Review')
    // Checking modal text
    cy.contains('CHANGE OF WORKFLOW STATUS', { timeout: 10000 })
    cy.contains(
      'Copy Editors will be able to edit but Authors won’t be able to edit this chapter after updating this workflow status.',
    )
    cy.confirmContinue()

    // Clean Up
    cy.contains('Clean Up').should('be.visible')
    cy.moveForward('Clean Up')
    // Checking modal text
    cy.contains('CHANGE OF WORKFLOW STATUS', { timeout: 10000 })
    cy.contains(
      'Copy Editors won’t be able to edit this chapter after updating this workflow status.',
    )
    cy.confirmContinue()

    // Page Check
    cy.contains('Page Check').should('be.visible', { timeout: 10000 })
    cy.moveForward('Page Check')

    // Final
    cy.contains('Final').should('be.visible', { timeout: 10000 })
    cy.moveForward('Final')
  })
})

Cypress.Commands.add('moveForward', currentStatus => {
  cy.contains(`${currentStatus}`)
    .siblings(':nth(0)')
    .should('be.disabled', { timeout: 10000 })
  cy.contains(`${currentStatus}`).siblings(':nth(1)').click({ force: true })
})

Cypress.Commands.add('confirmContinue', () => {
  cy.contains('Are you sure you wish to continue?')
  cy.get("button[title='Cancel']").should('be.enabled')
  cy.get("button[title='Yes']").click()
})
