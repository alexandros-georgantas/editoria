/* eslint-disable jest/expect-expect */

/// <reference types="cypress"/>

const { admin, book } = require('../support/credentials')

describe('Book builder asset manager', () => {
  let filePaths
  beforeEach(() => {
    cy.login(admin.username, admin.password)
  })

  before(() => {
    cy.fixture('files').then(paths => {
      filePaths = paths
    })

    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.contains(book.name, { timeout: 10000 })
    cy.planBookOen()
  })

  it("Adding images to the book's Asset Manager", () => {
    cy.contains('Edit').click()
    cy.contains('Asset Manager').click()
    cy.get("[id='file-uploader-assets']").selectFile(filePaths.file1.path, {
      force: true,
    })
    cy.contains('div', filePaths.file1.name, { timeout: 8000 }).should('exist')
    cy.get("[id='file-uploader-assets']").selectFile(filePaths.file2.path, {
      force: true,
    })
    cy.contains('div', filePaths.file2.name, { timeout: 8000 }).should('exist')
    cy.get("[title='Close']").click()
  })

  it('Insert images into content', () => {
    cy.contains(book.name, { timeout: 10000 })
    cy.contains('Edit').click()
    cy.get("button[title='Add Chapter']").click()
    cy.contains('Untitled').click()
    cy.get("button[title='Upload Image']").click()
    cy.get("button[title='Upload Images']").should('be.enabled')
    cy.get("button[title='Insert Image/s']").should('be.disabled')
    cy.get("button[title='Delete Selected']").should('be.disabled')
    cy.get("[type='checkbox']:nth(1)").check()
    cy.get("button[title='Insert Image/s']").click()
    cy.get('figure').click()
    cy.get('figcaption').type('This is the caption of the image')
    cy.get('figure').click()
    cy.get("input[placeholder='Alt Text']").type(filePaths.file1.alt_text)
  })

  it('Deleting images', () => {
    cy.contains(book.name, { timeout: 10000 })
    cy.contains('Edit').click()
    cy.contains('Asset Manager', { timeout: 6000 }).click()
    cy.get("[type='checkbox']:nth(1)").check()
    cy.contains('span', 'Delete Selected').click()
    cy.contains('span', 'Yes').click()
    cy.contains('div', filePaths.file1.name).should('not.exist')
    cy.get("[type='checkbox']:nth(1)").check()
    cy.contains('span', 'Delete Selected').click()
    cy.contains('span', 'Yes').click()
    cy.contains('div', filePaths.file1.name).should('not.exist')
  })

  it('Check supported files - JPG, PNG, SVG, TIFF', () => {
    // Add test for GIF and WEBP when it is resolved
    cy.contains(book.name, { timeout: 10000 })
    cy.contains('Edit').click()
    cy.contains('Asset Manager', { timeout: 6000 }).click()
    cy.get("[id='file-uploader-assets']").selectFile(filePaths.file2.path, {
      force: true,
    })
    cy.contains('div', filePaths.file2.name, { timeout: 8000 }).should('exist')
    cy.get("[id='file-uploader-assets']").selectFile(
      'cypress/fixtures/assets/png/cat.png',
      { force: true },
    )
    cy.contains('div', 'cat.png', { timeout: 8000 }).should('exist')
    cy.get("[id='file-uploader-assets']").selectFile(
      'cypress/fixtures/assets/svg/cat.svg',
      { force: true },
    )
    cy.contains('div', 'cat.svg', { timeout: 8000 }).should('exist')
    cy.get("[id='file-uploader-assets']").selectFile(
      'cypress/fixtures/assets/tiff/cat.tiff',
      { force: true },
    )
    cy.contains('div', 'cat.tiff', { timeout: 8000 }).should('exist')
    cy.get("[title='Close']").click()
    cy.contains('Delete').click()
    cy.contains('Yes').click()
    cy.get("button[title='Add Chapter']").click()
    cy.contains('Untitled').click({ timeout: 5000 })
    ;['1', '2', '3', '4'].forEach(box => {
      cy.get("button[title='Upload Image']").click()
      cy.get(`[type='checkbox']:nth(${box})`).check()
      cy.get("button[title='Insert Image/s']").click()
    })

    cy.get('figure:nth(3)') // checkin that there are 4 images in the editor
    cy.get("button[title='Upload Image']").click()
    cy.get(`[type='checkbox']:nth(0)`).check()
    cy.contains('span', 'Delete Selected').click()
    cy.contains('span', 'Yes').click()
  })

  it('Uploading a doc that has an image', () => {
    if (Cypress.env('oenBoolean') === true) {
      cy.log('You can not upload a doc in OEN')
    } else {
      cy.contains(book.name, { timeout: 10000 })
      cy.contains('Edit').click()
      cy.get("[id='file-uploader-generic']").selectFile(
        'cypress/fixtures/docs/chapter_w-image.docx',
        { force: true },
      )
      cy.contains('span', 'chapter_w-image')
      cy.get('button[title="Upload word"]:nth(1)', { timeout: 16000 }).should(
        'exist',
      )

      // Checking if new image exists in Asset Manager
      cy.contains('Asset Manager', { timeout: 6000 }).click()
      cy.get("[type='checkbox']:nth(1)")
        .parent()
        .parent()
        .contains('image/jpeg')
      cy.get("[title='Close']").click()

      // Checking if the image exists in Editor
      cy.contains('chapter_w-image').click()
      cy.get('figure').should('exist')
      cy.get("button[title='Upload Image']").click()
      cy.get(`[type='checkbox']:nth(0)`).check()
      cy.contains('span', 'Delete Selected').click()
      cy.contains('span', 'Yes').click()
    }
  })

  context('Ordering images', () => {
    beforeEach(() => {
      cy.contains(book.name, { timeout: 10000 })
      cy.contains('Edit').click()
      cy.contains('Asset Manager').click()
    })

    it('Ordering images by name', () => {
      cy.get("[id='file-uploader-assets']").selectFile(filePaths.file1.path, {
        force: true,
      })

      cy.get("[id='file-uploader-assets']").selectFile(filePaths.file2.path, {
        force: true,
      })

      // Descending Order
      cy.contains('Name').parent().find('button').click({ timeout: 5000 })

      cy.get("input[type='checkbox']:nth(1)")
        .parent()
        .parent()
        .contains('cat.jpg')

      cy.get("[type='checkbox']:nth(2)").parent().parent().contains('anime')

      // Ascending Order
      cy.contains('Name').parent().find('button').click()
      cy.get("[type='checkbox']:nth(1)").parent().parent().contains('anime')
      cy.get("[type='checkbox']:nth(2)").parent().parent().contains('cat')
      cy.get("[title='Close']").click()
    })

    it('Ordering images by updated date', () => {
      // Descending Order
      cy.contains('Name') // ???
        .parent()
        .find('button')
        .click()

      cy.get("[type='checkbox']:nth(1)").parent().parent().contains('cat')
      cy.get("[type='checkbox']:nth(2)").parent().parent().contains('anime')

      // Ascending Order
      cy.contains('Name').parent().find('button').click()
      cy.get("[type='checkbox']:nth(1)").parent().parent().contains('anime')
      cy.get("[type='checkbox']:nth(2)").parent().parent().contains('cat')
      cy.get("[title='Close']").click()
    })
  })
})
