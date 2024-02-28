/* eslint-disable jest/expect-expect */
const { admin } = require('../support/credentials')

describe('Tests describing for imports', () => {
  const dropdownValues = ['PagedJS', null, 'Chapter end notes']
  let docs
  before(() => {
    cy.fixture('files').then(paths => {
      docs = paths.docs
    })
    cy.login(admin.username, admin.password)
    cy.addBook('Test_book')
    cy.contains('Test_book').should('exist')
    cy.planBookOen()
  })

  beforeEach(() => {
    cy.login(admin.username, admin.password)
  })

  it('Creating a template, book and adding components for export', () => {
    cy.get("[href='/templates']", { timeout: 8000 }).click()
    cy.get("[title='ADD TEMPLATE']", { timeout: 8000 }).click()
    cy.get("[name='name']").type('export_template')
    cy.get("[name='author']").type('author')
    cy.get('.css-g1d714-ValueContainer').then(els => {
      ;[...els].forEach((el, i) => {
        cy.log(el)
        if (dropdownValues[i]) cy.wrap(el).type(`${dropdownValues[i]}{enter}`)
      })
    })

    cy.get(`[id="files-upload-btn"]`).selectFile(
      'cypress/fixtures/css/book.css',
      { force: true },
    )

    cy.get("[title='Save']").click({ force: true })
    cy.contains('a', 'Books', { timeout: 8000 }).click()
    cy.contains('a', 'Edit').click()

    if (Cypress.env('oenBoolean') === true) {
      cy.log('You can not upload a doc in OEN')
    } else {
      cy.get("[id='file-uploader-generic']").selectFile(docs.frontmatter.path, {
        force: true,
      })
      cy.contains('span', docs.frontmatter.name, { timeout: 10000 })

      cy.get("[id='file-uploader-generic']").selectFile(docs.body.path, {
        force: true,
      })
      cy.contains('span', docs.body.name, { timeout: 10000 })

      cy.get("[id='file-uploader-generic']").selectFile(docs.backmatter.path, {
        force: true,
      })
      cy.contains('span', docs.backmatter.name, { timeout: 10000 })

      cy.get("[id='file-uploader-generic']").selectFile(
        docs.second_chapter.path,
        { force: true },
      )
      cy.contains('span', docs.backmatter.name, { timeout: 10000 })
    }
  })

  it('Customising the components of the book', () => {
    cy.log('Removing body from table of content...')
    cy.contains('a', 'Edit', { timeout: 10000 }).click()
    cy.get('[id="TOC-icon"]:nth(1)').parent().click()

    if (Cypress.env('oenBoolean') === true) {
      cy.log('You can not align the components left or right in OEN')
    } else {
      cy.get('[id="left"]:nth(1)').click({ force: true })
    }
  })

  it('Exporting the book - Preview modal', () => {
    cy.contains('a', 'Edit', { timeout: 8000 }).click()
    cy.get('[title="Export Book"]').click()

    // Checking Export modal
    cy.contains('EXPORT BOOK').should('exist')
    cy.contains('Test_book').should('exist')
    cy.contains('PREVIEW').should('be.enabled')
    cy.contains('DOWNLOAD').not('[enabled]')
    cy.contains('Viewer').should('exist')
    cy.get('button[title="Cancel"]').click()
    cy.get('[title="Export Book"]').click()
    cy.get('input[name="pagedjs"]').should('be.checked')
    cy.contains(
      'View your book in PagedJS for more granular styles tunning',
    ).should('exist')

    cy.checkPagedjsTemplates()

    let selectedTemplate

    cy.get('.react-select__control')
      .invoke('text')
      .then(text => {
        selectedTemplate = text.trim() // Remove leading/trailing whitespace from the text
        cy.log('Text:', selectedTemplate)

        cy.get('[title="Cancel"]').should('be.enabled')
        cy.get('[title="Ok"]').should('be.enabled').click({ force: true })

        // Checking Preview page
        cy.get('section:nth(1)').should('have.text', 'BooksTemplates')

        cy.get('button[title="Save"]').should('be.enabled')
        cy.get('button[title="Download HTML"]').should('be.enabled')
        cy.get('button[title="Print"]').should('be.enabled')
        cy.contains('a', 'Back to book').should('exist')

        // Save modal
        cy.get('button[title="Save"]').click()
        cy.contains('MODIFY CSS').should('exist')

        // Check if the desired sentence contains the variable
        cy.contains(
          `Do you want to modify the css of template "${selectedTemplate}" or create a new Template for the specific book.`,
        ).should('exist')
      })

    cy.contains('Cancel').should('be.enabled').click()
    cy.get('button[title="Save"]').click()
    cy.contains('Create New').should('be.enabled')
    cy.contains('Modify').should('be.enabled').click()

    /*    cy.get('button[title="Download HTML"]', { timeout: 8000 })
      .should('be.enabled')
      .click() */
    cy.get('button[title="Print"]', { timeout: 8000 }).should('be.enabled')

    cy.get('#printBook', { timeout: 70000 }).then(el => {
      cy.get(el).should('have.attr', 'src').should('not.be.empty')
    })

    cy.contains('a', 'Back to book').click()
  })

  it('Exporting the book - Download modal', () => {
    cy.contains('a', 'Edit', { timeout: 8000 }).click()
    cy.get('[title="Export Book"]').click()

    // Checking Download modal
    cy.contains('EXPORT BOOK').should('exist')
    cy.contains('Test_book').should('exist')
    cy.contains('DOWNLOAD').click()
    cy.contains('PREVIEW').not('[enabled]')
    cy.contains('DOWNLOAD').should('be.enabled')
    cy.contains('FORMAT').should('exist')
    cy.contains('Ok').should('be.disabled')
    cy.contains('Cancel').should('be.enabled').click()
    cy.get('button[title="Export Book"]').should('exist').click()
    cy.contains('DOWNLOAD').click()

    // EPUB option
    cy.log('Checking the modal when EPUB option is selected')
    cy.get('input[name="epub"]').should('be.checked')
    cy.get('input[name="pdf"]').should('not.be.checked')
    cy.get('input[name="icml"]').should('not.be.checked')
    // cy.get('button[title="Cancel"]').click()
    // cy.contains('DOWNLOAD').click()
    cy.contains('You are about to export a valid EPUB v3 file.').should('exist')
    cy.get('.react-select__value-container').should('have.text', 'Select...')
    cy.contains('Ok').should('be.disabled')
    ;[0, 1].forEach(option => {
      cy.get('.react-select__control').click({ force: true })
      cy.get(`#react-select-3-option-${option}`)
        .trigger('mouseover')
        .should('be.visible')
        .click({ force: true })

      cy.get('.react-select__control')
        .invoke('text')
        .then(text => {
          cy.log('Template:', text)
          cy.wrap(text).should('be.oneOf', [
            'Atla (chapterEnd)',
            'Atla (footnotes)',
          ])
        })
    })

    cy.contains('Ok').should('be.enabled')

    // PDF option
    cy.log('Checking the modal when PDF option is selected')
    cy.get('input[name="pdf"]').click()
    cy.get('input[name="epub"]').should('not.be.checked')
    cy.get('input[name="pdf"]').should('be.checked')
    cy.get('input[name="icml"]').should('not.be.checked')
    cy.contains(
      'Using PagedJS, we’ll generate a PDF version of your book',
    ).should('exist')

    cy.checkPagedjsTemplates()

    cy.contains('Ok').should('be.enabled')

    // ICML option
    cy.log('Checking the modal when ICML option is selected')
    cy.get('input[name="icml"]').click()
    cy.get('input[name="epub"]').should('not.be.checked')
    cy.get('input[name="pdf"]').should('not.be.checked')
    cy.get('input[name="icml"]').should('be.checked')
    cy.contains(
      'You will get a compressed zip file containing all images used in the book and the ICML file ready to be imported in Adobe inDesign.',
    ).should('exist')
    cy.contains('Ok').should('be.enabled')
    cy.contains('Cancel').click()
  })

  it('Checking Book Settings', () => {
    if (Cypress.env('oenBoolean') === true) {
      cy.log('There is no Book Settings modal in OEN.')
    } else {
      cy.contains('a', 'Edit', { timeout: 8000 }).click()
      cy.get('[title="Book Settings"]').click()
      cy.contains('RUNNING HEADERS').should('exist')
      cy.contains('Component Title').should('exist')
      cy.contains('Page Left').should('exist')
      cy.contains('Page Right').should('exist')

      // The expected texts for each cell
      const expectedTexts = [
        ['Table of Contents', '', ''],
        ['a-Font_matter', 'a-Font_matter', 'a-Font_matter'],
        ['body', 'body', 'body'],
        ['second_chapter', 'second_chapter', 'second_chapter'],
        ['w-back_matter', 'w-back_matter', 'w-back_matter'],
      ]

      // Iterating over each row
      cy.get('table')
        .find('tbody tr')
        .each(($row, rowIndex) => {
          const expectedRowTexts = expectedTexts[rowIndex]

          // Iterating over each column within the current row
          Cypress.$.each(expectedRowTexts, (columnIndex, expectedText) => {
            // Interpolating to dynamically construct the selector for each cell
            const cellSelector = `:nth-child(1) > :nth-child(${
              rowIndex + 1
            }) > :nth-child(${columnIndex + 1})`

            // Gets the text of the current cell
            cy.get('table')
              .find(cellSelector)
              .invoke('text')
              .then(text => {
                cy.log(
                  `Cell Text [Row ${rowIndex + 1}, Column ${columnIndex + 1}]:`,
                  text,
                )
                cy.wrap(text).should('contain', expectedText)
              })
          })
        })

      cy.get('button[title="Switch"]').should('be.enabled').click()
      cy.get('button[title="Cancel"]').should('be.enabled')
      cy.get('button[title="Save"]').should('be.enabled').click()
    }
  })
})

Cypress.Commands.add('checkPagedjsTemplates', () => {
  ;[0, 1, 2].forEach(pagedjsOption => {
    cy.get('.react-select__control').click({ force: true })
    cy.get(`[id='react-select-3-option-${pagedjsOption}']`)
      .trigger('mouseover')
      .should('be.visible')
      .click({
        force: true,
      })
    cy.get('.react-select__control')
      .invoke('text')
      .then(text => {
        cy.log('Template:', text)
        cy.wrap(text).should('be.oneOf', [
          'export_template',
          'Atla (chapterEnd)',
          'Atla (footnotes)',
        ])
      })
  })
})
