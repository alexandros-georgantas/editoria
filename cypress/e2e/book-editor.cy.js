/* eslint-disable jest/expect-expect */
const { admin, book } = require('../support/credentials')

describe('Book editor', () => {
  let display
  let listItems
  before(() => {
    cy.fixture('book-content').then(bookContent => {
      display = [
        {
          button: "[title='Change to Title']",
          element: 'h1',
          content: bookContent['title-h1'],
        },
        {
          button: "[title='Change to Author']",
          element: '.author',
          content: bookContent.author,
        },
        {
          button: "[title='Change to Subtitle']",
          element: '.cst',
          content: bookContent.subtitle,
        },
        {
          button: "[title='Change to Epigraph Prose']",
          element: '.epigraph-prose',
          content: bookContent['epigraph-prose'],
        },
        {
          button: "[title='Change to Epigraph Poetry']",
          element: '.epigraph-poetry',
          content: bookContent['epigraph-poetry'],
        },
        {
          button: "[title='Change to heading level 2']",
          element: 'h2',
          content: bookContent['heading-2'],
        },
        {
          button: "[title='Change to heading level 3']",
          element: 'h3',
          content: bookContent['heading-3'],
        },
        {
          button: "[title='Change to heading level 4']",
          element: 'h4',
          content: bookContent['heading-4'],
        },
        {
          button: "[title='Change to Paragraph']",
          element: '.paragraph',
          content: bookContent.paragraph,
        },
        {
          button: "[title='Change to Paragraph Continued']",
          element: '.paragraph-cont',
          content: bookContent['paragraph-continued'],
        },
        {
          button: "[title='Change to Extract Prose']",
          element: '.extract-prose',
          content: bookContent['extract-prose'],
        },
        {
          button: "[title='Change to Extract Poetry']",
          element: '.extract-poetry',
          content: bookContent['extract-poetry'],
        },
        {
          button: "[title='Change to Source Note']",
          element: '.source-note',
          content: bookContent['source-note'],
        },
        {
          button: "[title='Change to Block Quote']",
          element: 'blockquote',
          content: bookContent['block-quote'],
        },
        {
          button: "[title='Toggle strong']",
          element: 'strong',
          content: bookContent.bold,
        },
        {
          button: "[title='Toggle emphasis']",
          element: 'em',
          content: bookContent.emphasis,
        },
        {
          button: "[title='Toggle code']",
          element: 'code',
          content: bookContent.code,
        },
        {
          button: "[title='Toggle strikethrough']",
          element: '.strikethrough',
          content: bookContent.strikethrough,
        },
        {
          button: "[title='Toggle underline']",
          element: 'u',
          content: bookContent.underline,
        },
        {
          button: "[title='Toggle subscript']",
          element: 'sub',
          content: bookContent.subscript,
        },
        {
          button: "[title='Toggle superscript']",
          element: 'sup',
          content: bookContent.superscript,
        },
        {
          button: "[title='Toggle Small Caps']",
          element: '.small-caps',
          content: bookContent['small-caps'],
        },
      ]
      listItems = ['item1', 'item2', 'item3']
    })
    cy.login(admin.username, admin.password)
    cy.addBook(book.name)
    cy.contains(book.name).should('exist')
    cy.planBookOen()
  })
  beforeEach(() => {
    cy.login(admin.username, admin.password)
  })

  it('Adding content', () => {
    cy.contains('Edit', { timeout: 10000 }).click()

    if (Cypress.env('oenBoolean') === true) {
      cy.contains('Untitled').first().click()
      cy.get('h1').type('{del}{selectall}{backspace}')
    } else {
      cy.contains('Add Component', { timeout: 10000 }).click()
      cy.contains('button', 'Edit', { timeout: 8000 }).click()
    }

    cy.get("[title='Show more tools']").click()

    display.forEach(option => {
      cy.get(option.button, { timeout: 8000 }).click({
        timeout: 5000,
        force: true,
      })
      cy.get('.ProseMirror').type(`${option.content}{enter}`)
    })

    // Adding ordered list
    cy.get("[title='Wrap in ordered list']").click()
    listItems.forEach(li => {
      cy.get('.ProseMirror').type(`${li}{enter}`)
    })
    cy.get('.ProseMirror').type('{enter}')

    // Adding Bullet list
    cy.get("[title='Wrap in bullet list']").click()

    listItems.forEach(li => {
      cy.get('.ProseMirror').type(`${li}{enter}`)
    })
    cy.get('.ProseMirror').type('{enter}')

    cy.get("[title='Save changes']").click()
    // cy.wait("@gqlUpdateBookComponentContentMutation");
    cy.contains('000Test1').click()
  })

  it('Verifying content', () => {
    cy.contains('Edit', { timeout: 10000 }).click()
    // cy.wait("@gqlGetBookQuery")
    cy.contains('button', 'Edit', { timeout: 8000 }).click()
    // cy.wait("@gqlGetWaxRulesQuery")
    // cy.wait("@gqlGetBookComponentQuery")
    display.forEach(option => {
      cy.contains(option.element, option.content, { timeout: 8000 })
    })

    cy.get('ul>li').each(($el, index) => {
      cy.get($el)
      cy.contains(listItems[index], { timeout: 8000 })
    })

    cy.get('ol>li').each(($el, index) => {
      cy.get($el)
      cy.contains(listItems[index])
    })
  })
})
