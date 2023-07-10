/* eslint-disable jest/expect-expect */
const { admin, book } = require('../support/credentials')

describe('Managing workflow', () => {
  before(() => {
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.contains(book.name, { timeout: 10000 })
    cy.planBookOen()
  })

  it('Changing workflow status', () => {
    cy.login(admin.username, admin.password)
    cy.contains(book.name).click()

    if (Cypress.env('oenBoolean') === true) {
      cy.log('You cannot upload a file in OEN')
      cy.contains('Delete').click()
      cy.contains(
        'Are you sure you want to delete this part with title Untitled?',
      )
      cy.get('button[title="Yes"]').click()
      cy.wait(5000)
    } else {
      cy.get('[id="file-uploader-generic"]').selectFile(
        'cypress/fixtures/docs/body.docx',
        { force: true },
      )
      cy.wait(10000)
      cy.get('svg[id="upload"]').trigger('mouseover')
      cy.get(':nth-child(1) > :nth-child(1) > #workLabel') // Upload
        .siblings()
        .should('be.disabled')
    }

    // File Prep
    cy.contains('File Prep').siblings(':nth(0)').should('be.disabled')
    cy.contains('File Prep').siblings(':nth(1)').click({ force: true })
    // Checking modal text
    cy.contains('CHANGE OF WORKFLOW STATUS')
    cy.contains(
      'Copy Editors will be able to edit this chapter after updating this workflow status.',
    )
    cy.contains('Are you sure you wish to continue?')
    cy.get("button[title='Cancel']").should('be.enabled')
    cy.get("button[title='Yes']").click()
    cy.wait(5000)

    // Edit
    if (Cypress.env('oenBoolean') === true) {
      cy.get(':nth-child(2) > :nth-child(1) > #workLabel') // Edit
        .siblings(':nth(1)')
        .click({ force: true })
      cy.wait(5000)
    } else {
      cy.get(':nth-child(3) > :nth-child(1) > #workLabel') // Edit
        .siblings(':nth(1)')
        .click({ force: true })
    }

    // cy.contains('Edit').siblings(':nth(1)').click({ force: true })
    // Checking modal text
    cy.contains('CHANGE OF WORKFLOW STATUS')
    cy.contains(
      'Copy Editors won’t be able to edit but Authors will be able to edit this chapter after updating this workflow status.',
    )
    cy.contains('Are you sure you wish to continue?')
    cy.get("button[title='Cancel']").should('be.enabled')
    cy.get("button[title='Yes']").click()
    cy.wait(5000)

    // Review
    cy.contains('Review').siblings(':nth(0)').should('be.disabled')
    cy.contains('Review').siblings(':nth(1)').click({ force: true })
    // Checking modal text
    cy.contains('CHANGE OF WORKFLOW STATUS')
    cy.contains(
      'Copy Editors will be able to edit but Authors won’t be able to edit this chapter after updating this workflow status.',
    )
    cy.contains('Are you sure you wish to continue?')
    cy.get("button[title='Cancel']").should('be.enabled')
    cy.get("button[title='Yes']").click()
    cy.wait(5000)

    // Clean Up
    cy.contains('Clean Up').siblings(':nth(0)').should('be.disabled')
    cy.contains('Clean Up').siblings(':nth(1)').click({ force: true })
    // Checking modal text
    cy.contains('CHANGE OF WORKFLOW STATUS')
    cy.contains(
      'Copy Editors won’t be able to edit this chapter after updating this workflow status.',
    )
    cy.contains('Are you sure you wish to continue?')
    cy.get("button[title='Cancel']").should('be.enabled')
    cy.get("button[title='Yes']").click()
    cy.wait(5000)

    // Page Check
    cy.contains('Page Check').siblings(':nth(0)').should('be.disabled')
    cy.contains('Page Check').siblings(':nth(1)').click({ force: true })
    cy.wait(5000)

    // Final
    cy.contains('Final').siblings(':nth(0)').should('be.disabled')
    cy.contains('Final').siblings(':nth(1)').click({ force: true })
    cy.wait(5000)
  })
})
