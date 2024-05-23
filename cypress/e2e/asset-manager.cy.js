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

    if (Cypress.env('oenBoolean') === true) {
      // Deleting pre-built components in oen
      cy.contains('Delete').first().click({ force: true })
      cy.contains(
        'Are you sure you want to delete this Part with title Untitled?',
      ).should('exist')
      cy.get('[title="Yes"]').trigger('mouseover').click({ force: true })
      cy.wait(5000)
      cy.contains('Untitled').should('exist')
      cy.contains('Delete').click({ timeout: 8000 })
      cy.contains(
        'Are you sure you want to delete this Chapter with title Untitled?',
      ).should('exist')
      cy.get('[title="Yes"]').trigger('mouseover').click({ force: true })
      // cy.get('.loading-spinner', { timeout: 15000 }).should('not.exist')
      // cy.reload({ timeout: 8000 })
      cy.wait(5000)
      cy.contains('Untitled').should('not.exist')
    } else {
      cy.log('Not oen')
    }

    cy.contains('Asset Manager').click()
    cy.uploadFileAssetManager(filePaths.file1.path, filePaths.file1.name)
    cy.uploadFileAssetManager(filePaths.file2.path, filePaths.file2.name)
    cy.get("[title='Close']").click()
  })

  it('Insert images into content', () => {
    cy.contains(book.name, { timeout: 10000 })
    cy.contains('Edit').click()
    cy.addUntitledChapter()

    cy.get("button[title='Upload Image']", { timeout: 6000 })
      .should('be.visible')
      .click({
        force: true,
      })
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
    cy.deleteFirstImage()
    cy.contains('div', filePaths.file1.name).should('not.exist')
    cy.deleteFirstImage()
    cy.contains('div', filePaths.file2.name).should('not.exist')
  })

  it('Check supported files - JPG, PNG, SVG, TIFF', () => {
    // Add test for GIF and WEBP when it is resolved
    cy.contains(book.name, { timeout: 10000 })
    cy.contains('Edit').click()
    cy.contains('Asset Manager', { timeout: 6000 }).click()
    cy.uploadFileAssetManager(filePaths.file2.path, filePaths.file2.name)
    cy.uploadFileAssetManager('cypress/fixtures/assets/png/cat.png', 'cat.png')
    cy.uploadFileAssetManager('cypress/fixtures/assets/svg/cat.svg', 'cat.svg')
    cy.uploadFileAssetManager(
      'cypress/fixtures/assets/tiff/cat.tiff',
      'cat.tiff',
    )
    cy.get("[title='Close']").click()
    cy.contains('Delete').click()
    cy.contains('Yes').click()
    cy.addUntitledChapter()
    ;['1', '2', '3', '4'].forEach(box => {
      cy.get("button[title='Upload Image']", { timeout: 10000 }).click()
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
      cy.log('You can not upload a doc in OEN.')
    } else {
      cy.contains(book.name, { timeout: 10000 })
      cy.contains('Edit').click()
      cy.get("[id='file-uploader-generic']").selectFile(
        'cypress/fixtures/docs/chapter_w-image.docx',
        { force: true },
      )
      cy.contains('span', 'chapter_w-image', { timeout: 10000 })
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
      cy.uploadFileAssetManager(filePaths.file1.path, filePaths.file1.name)
      cy.uploadFileAssetManager(filePaths.file2.path, filePaths.file2.name)

      // Descending Order
      cy.orderingImages('Name', 'cat', 'anime')

      // Ascending Order
      cy.orderingImages('Name', 'anime', 'cat')
      cy.get("[title='Close']").click()
    })

    it('Ordering images by updated date', () => {
      // Descending Order
      cy.orderingImages('Updated', 'cat', 'anime')

      // Ascending Order
      cy.orderingImages('Updated', 'cat', 'anime')
      cy.log(
        "Both images were uploaded on the same date so the order doesn't change.",
      )
      cy.get("[title='Close']").click()
    })
  })
})

Cypress.Commands.add('uploadFileAssetManager', (path, name) => {
  cy.get("[id='file-uploader-assets']").selectFile(`${path}`, {
    force: true,
  })
  cy.contains('div', `${name}`, { timeout: 8000 }).should('exist')
})

Cypress.Commands.add('deleteFirstImage', () => {
  cy.get("[type='checkbox']:nth(1)").check()
  cy.contains('span', 'Delete Selected').click()
  cy.contains('span', 'Yes').click()
})

Cypress.Commands.add('addUntitledChapter', () => {
  cy.get("button[title='Add Chapter']").click()
  cy.contains('Untitled').click({ timeout: 5000 })
})

Cypress.Commands.add('orderingImages', (attribute, firstImg, secondImg) => {
  cy.log(`Ordering by ${attribute}`)
  cy.contains(`${attribute}`).parent().find('button', { timeout: 5000 }).click()

  cy.get("input[type='checkbox']:nth(1)")
    .parent()
    .parent()
    .contains(`${firstImg}`)

  cy.get("[type='checkbox']:nth(2)").parent().parent().contains(`${secondImg}`)
})
