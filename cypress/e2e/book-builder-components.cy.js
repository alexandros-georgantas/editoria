/* eslint-disable jest/expect-expect */

import { admin, book } from '../support/credentials'

describe('Book builder tests', () => {
  let docs

  before(() => {
    cy.fixture('files').then(paths => {
      docs = paths.docs
    })
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.contains(book.name).should('exist')
    cy.planBookOen()
    cy.logout()
  })

  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.contains('Edit', { timeout: 10000 }).click()
  })

  it('Front-matter', () => {
    cy.get("[title='Add Component']").first().click()
    cy.contains("[data-test-id='Frontmatter-division']", 'Untitled', {
      timeout: 8000,
    })
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('span', 'Yes', { timeout: 8000 }).click()
    cy.contains('Untitled').should('not.exist', { timeout: 8000 })
  })

  it('Body', () => {
    if (Cypress.env('oenBoolean') === true) {
      // Checking Part component
      cy.contains("[data-test-id='Body-division']", 'Untitled', {
        timeout: 8000,
      })
      cy.get('[data-test-id="component-types"]').first().click({ force: true })
      cy.get(`[role="option"]:nth(0)`)
        .should('have.attr', 'aria-selected', 'true')
        .should('have.text', 'Part')
      cy.contains('button', 'Delete').click()
      cy.contains('span', 'Yes', { timeout: 8000 }).click()
      cy.reload()

      // Checking Chapter component
      cy.contains("[data-test-id='Body-division']", 'Untitled', {
        timeout: 8000,
      })
      cy.checkComponentType(1, 'Chapter')
      cy.contains('button', 'Delete').click()
      cy.contains('span', 'Yes', { timeout: 8000 }).click()
      cy.contains("[data-test-id='Body-division']", 'Untitled').should(
        'not.exist',
        { timeout: 5000 },
      )
    } else {
      // Adding a Chapter body
      cy.get("[title='Add Chapter']").click()
      cy.contains("[data-test-id='Body-division']", 'Untitled', {
        timeout: 8000,
      })
      cy.checkComponentType(1, 'Chapter')
      cy.contains('button', 'Delete').click()
      cy.contains('span', 'Yes', { timeout: 8000 }).click()
      cy.contains("[data-test-id='Body-division']", 'Untitled').should(
        'not.exist',
        { timeout: 5000 },
      )

      // Adding a Part
      cy.get("[title='Add Part']", { timeout: 5000 }).click()
      cy.contains("[data-test-id='Body-division']", 'Untitled', {
        timeout: 8000,
      })
      cy.checkComponentType(0, 'Part')
      cy.contains('button', 'Delete').click()
      cy.contains('span', 'Yes', { timeout: 8000 }).click()
      cy.contains("[data-test-id='Body-division']", 'Untitled').should(
        'not.exist',
        { timeout: 5000 },
      )
    }

    // Adding Unnumbered
    cy.get("[title='Add Unnumbered']", { timeout: 5000 })
      .should('exist', { timeout: 5000 })
      .click()
    cy.checkComponentType(2, 'unnumbered')
    cy.contains('button', 'Delete').click()
    cy.contains('span', 'Yes', { timeout: 8000 }).click()
    cy.contains("[data-test-id='Body-division']", 'Untitled').should(
      'not.exist',
      { timeout: 5000 },
    )
  })

  it('Back-Matter', () => {
    cy.get("[title='Add Component']").last().click()
    cy.contains("[data-test-id='Backmatter-division']", 'Untitled', {
      timeout: 8000,
    })
    cy.checkComponentType(0, 'Component')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('span', 'Yes', { timeout: 8000 }).click({ force: true })
    cy.get('button[title="Add notes placeholder"]').click()
    cy.contains(
      'By creating a notes placeholder you will only be able to see templates with notes option set to endnotes',
    )
    cy.get('[title="OK"]').click()
    cy.contains("[data-test-id='Backmatter-division']", 'Notes', {
      timeout: 8000,
    })
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('span', 'Yes', { timeout: 8000 }).click({ force: true })
  })

  it('Add new component types in Frontmatter, Body and backmatter', () => {
    // Adding a new component in Frontmatter
    cy.get("[title='Add Component']").first().click()
    cy.addComponentType('Epigraph')

    if (Cypress.env('oenBoolean') === true) {
      // Checks that in OEN there is also Copyright Page as component type in FM
      cy.get('[role="option"]:nth(6)').should('have.text', 'Copyright Page')

      cy.get('[role="option"]:nth(7)').should('have.text', 'epigraph').click()
      cy.checkComponentType(7, 'epigraph')
    } else {
      cy.get('[role="option"]:nth(6)').should('have.text', 'epigraph').click()
      cy.checkComponentType(6, 'epigraph')
    }

    cy.contains('button', 'Delete').click()
    cy.contains('span', 'Yes', { timeout: 8000 }).click({ force: true })
    cy.contains('Untitled').should('not.exist')

    // Adding a new component in Body
    cy.get("[title='Add Chapter']").click()
    cy.contains('Untitled', { timeout: 8000 }).should('exist')
    cy.get('[data-test-id="component-types"]').as('component-types').click()
    cy.get('@component-types').click()
    cy.addComponentType('Epilogue')

    cy.get('[role="option"]:nth(3)').should('have.text', 'epilogue').click()
    cy.checkComponentType(3, 'epilogue')

    cy.get("[data-test-id='component-types']", { timeout: 8000 }).click({
      force: true,
    })
    cy.contains('button', 'Delete').click()
    cy.contains('span', 'Yes', { timeout: 8000 }).click()
    cy.contains('Untitled').should('not.exist')

    // Adding a new component in Backmatter
    cy.get("[title='Add Component']").last().click()
    cy.contains('Untitled').should('exist')
    cy.addComponentType('glossary')

    cy.get('[role="option"]:nth(2)').should('have.text', 'glossary').click()
    cy.checkComponentType(2, 'glossary')

    cy.get("[data-test-id='component-types']", { timeout: 8000 }).click({
      force: true,
    })
    cy.contains('button', 'Delete').click()
    cy.contains('span', 'Yes', { timeout: 8000 }).click()
  })

  it('Changing component types - Front-matter', () => {
    cy.get("[title='Add Component']").first().click()
    cy.contains('[data-test-id="Frontmatter-division"]', 'Untitled')

    if (Cypress.env('oenBoolean') === true) {
      let option = 0
      ;[
        'Component',
        'Introduction',
        'Preface',
        'Half Title',
        'Title Page',
        'Cover',
        'Copyright Page',
        'epigraph',
      ].forEach(type => {
        cy.log(`Changing to ${type}...`)
        cy.get('[data-test-id="component-types"]').click({ force: true })
        cy.get(`[role="option"]:nth(${option})`).click()
        cy.checkComponentType(`${option}`, `${type}`)
        cy.get('[data-test-id="component-types"]', { timeout: 8000 }).click()
        option += 1
      })
    } else {
      let option = 0
      ;[
        'Component',
        'Introduction',
        'Preface',
        'Half Title',
        'Title Page',
        'Cover',
        'epigraph',
      ].forEach(type => {
        cy.log(`Changing to ${type}...`)
        cy.get('[data-test-id="component-types"]').click({ force: true })
        cy.get(`[role="option"]:nth(${option})`).click()
        cy.checkComponentType(`${option}`, `${type}`)
        cy.get('[data-test-id="component-types"]', { timeout: 8000 }).click()
        option += 1
      })
    }

    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('span', 'Yes', { timeout: 8000 }).click()
  })

  it('Changing component types - Body', () => {
    cy.get("[title='Add Part']").click()
    cy.contains("[data-test-id='Body-division']", 'Untitled')

    let option = 0
    ;['Part', 'Chapter', 'unnumbered', 'epilogue'].forEach(type => {
      cy.log(`Changing to ${type}...`)
      cy.get('[data-test-id="component-types"]').click({ force: true })
      cy.get(`[role="option"]:nth(${option})`).click()
      cy.checkComponentType(`${option}`, `${type}`)
      cy.get('[data-test-id="component-types"]', { timeout: 8000 }).click()
      option += 1
    })

    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('span', 'Yes', { timeout: 8000 }).click()
  })

  it('Changing component types - Backmatter', () => {
    cy.get("[title='Add Component']").last().click()
    cy.contains("[data-test-id='Backmatter-division']", 'Untitled')

    let option = 0
    ;['Component', 'Appendix', 'glossary'].forEach(type => {
      cy.log(`Changing to ${type}...`)
      cy.get('[data-test-id="component-types"]').click({ force: true })
      cy.get(`[role="option"]:nth(${option})`).click()
      cy.checkComponentType(`${option}`, `${type}`)
      cy.get('[data-test-id="component-types"]', { timeout: 8000 }).click()
      option += 1
    })

    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('span', 'Yes', { timeout: 8000 }).click()
  })

  it('Uploading docs', () => {
    if (Cypress.env('oenBoolean') === true) {
      cy.log('You can not upload a doc in OEN')
    } else {
      cy.get("[id='file-uploader-generic']").selectFile(docs.frontmatter.path, {
        force: true,
      })
      cy.contains('span', docs.frontmatter.name, { timeout: 8000 })
      cy.get("[id='file-uploader-generic']").selectFile(docs.body.path, {
        force: true,
      })
      cy.contains('span', docs.body.name, { timeout: 8000 })
      cy.get("[id='file-uploader-generic']").selectFile(docs.backmatter.path, {
        force: true,
      })
      cy.contains('span', docs.backmatter.name, { timeout: 8000 })
    }
  })
})

Cypress.Commands.add(
  'checkComponentType',
  (nthComponent, nameComponentType) => {
    cy.get('[data-test-id="component-types"]').click({ force: true })
    cy.get(`[role="option"]:nth(${nthComponent})`)
      .should('have.attr', 'aria-selected', 'true')
      .should('have.text', `${nameComponentType}`)
  },
)

Cypress.Commands.add('addComponentType', nameComponentType => {
  cy.get("[data-test-id='component-types']", { timeout: 8000 }).click({
    force: true,
  })
  cy.contains('ADD A NEW TYPE').click()
  cy.get('#addComponentType').type(`${nameComponentType}`)
  cy.contains('Save').click()
})
