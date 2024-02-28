/* eslint-disable jest/expect-expect */

/* In order to run successfully, the scripts and related config should be added */
/// <reference types="cypress"/>

const { admin } = require('../support/credentials')

describe('Template tests', () => {
  let data
  /*    let initialDropdownValues;
    let updatedDropdownValues; */

  before(() => {
    cy.fixture('template-content').then(content => {
      data = content
      /*    initialDropdownValues=[content.target.epub,content.epub_scripts.script,content.notes.footnotes]
            updatedDropdownValues=[content.target.pagedJs,content.pagedjs_scripts.script,content.notes.endnotes]; */
    })
  })

  beforeEach(() => {
    cy.login(admin.username, admin.password)
    cy.get("[href='/templates']").click()
  })

  it('Adding a template', () => {
    cy.get("[title='ADD TEMPLATE']", { timeout: 8000 }).click()
    cy.get("[name='name']", { timeout: 8000 }).type(data.name1)
    cy.get("[name='author']").type(data.author1)

    cy.get('.css-g1d714-ValueContainer:nth(0)').type('epub{enter}')
    //    cy.get('.css-g1d714-ValueContainer:nth(1)').type("script2{enter}")
    cy.get('.css-g1d714-ValueContainer:nth(2)').type('footnotes{enter}')

    /*        cy.get(".css-g1d714-ValueContainer").then(els => {
            [...els].forEach((el,i) => {
                cy.log(el);
                cy.wrap(el).type(`${initialDropdownValues[i]}{enter}`)
            })
        }) */

    cy.get(`[id='thumbnail-upload-btn']`).selectFile(data.thumbnail, {
      force: true,
    })
    cy.get(`[id="files-upload-btn"]`).selectFile(data.file_path, {
      force: true,
    })
    cy.get("[title='Save']").click({ force: true })
  })

  it('Checking the template', () => {
    cy.contains(data.name1)
      .parent()
      .parent()
      .contains(data.author1)
      .parent()
      .parent()
      .contains(data.target.epub.toLowerCase())

    cy.get('button[title="Update"]').first().click({ force: true })
    cy.get('[name="author"]').should('have.value', data.author1)
    cy.get('[name="name"]').should('have.value', data.name1)
    cy.get('.css-g1d714-ValueContainer:nth(0)').should('have.text', 'EPUB')
    //    cy.get('.css-g1d714-ValueContainer:nth(1)').should("have.text", "Script2")
    cy.get('.css-g1d714-ValueContainer:nth(2)').should('have.text', 'Footnotes')
    cy.get('button[title="Delete file"]')
      .siblings()
      .should('have.text', data.file_name)
  })

  it('Editing template content, files and thumbnail', () => {
    cy.get('button[title="Update"]').first().click({ force: true })
    cy.get("button[title='Update']").should('be.disabled')

    // Changing content
    cy.get("[name='name']").clear().type(data.name2)
    cy.get("[name='author']").clear().type(data.author2)
    cy.get('.css-g1d714-ValueContainer:nth(0)').type('pagedJS{enter}')
    //    cy.get('.css-g1d714-ValueContainer:nth(1)').type("script1{enter}")
    cy.get('.css-g1d714-ValueContainer:nth(2)').type('endnotes{enter}')

    // Removing and adding thumbnail
    cy.log('Changing thumbnail')

    // NOTE: Should Delete Thumbnail exist?
    // cy.get("[title='Delete Thumbnail']").click();
    cy.get(`[id='thumbnail-upload-btn']`).selectFile(data.thumbnail2, {
      force: true,
    })

    // Adding and removing template file
    cy.log('Removing template files')
    cy.get(`[id="files-upload-btn"]`).selectFile(data.temp_file, {
      force: true,
    })
    cy.get("button[title='Delete file']:nth(0)").click({ force: true })
    cy.contains(data.temp_file_name + data.temp_file_name).should('not.exist')
    cy.get("button[title='Update']").last().click({ force: true })
  })

  it('Checking if the updated content is retained', () => {
    cy.contains(data.name2)
      .parent()
      .parent()
      .contains(data.author2)
      .parent()
      .parent()
      .contains(data.target.pagedJs.toLowerCase())

    cy.get('button[title="Update"]').first().click({ force: true })
    cy.get('[name="author"]').should('have.value', data.author2)
    cy.get('[name="name"]').should('have.value', data.name2)
    cy.get('.css-g1d714-ValueContainer:nth(0)').should('have.text', 'PagedJS')
    // cy.get('.css-g1d714-ValueContainer:nth(1)').should("have.text", "Script1")
    cy.get('.css-g1d714-ValueContainer:nth(2)').should('have.text', 'Endnotes')
    cy.get('button[title="Delete file"]')
      .siblings()
      .should('have.text', data.temp_file_name)
  })

  it('Deleting template', () => {
    cy.get('button[title="Delete"]').first().click({ force: true })
    cy.contains(
      `Are you sure you want to delete the template with name ${data.name2}?`,
    )
    cy.get("[title='Yes']").click()
    cy.contains(`${data.name2}`).should('not.exist')
    // cy.get(`[data-cy="${data.name2}_container"]`).should("not.exist");
  })
})

/*

In packages/server/config/development.js add,

  export: {
    scripts: [
      { label: 'Script1', filename: 'script1.js', scope: 'pagedjs' },
      { label: 'Script2', filename: 'script2.js', scope: 'epub' },
    ],
  },
*/
