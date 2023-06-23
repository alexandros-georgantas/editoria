// const { nth } = require("lodash");

/* eslint-disable jest/expect-expect */
describe('Testing OEN book builder', () => {
  beforeEach(() => {
    cy.visit('localhost:4000/login')
    cy.get("[name='username']").type('admin')
    cy.get("[name='password']").type('password')
    cy.get("[type='submit']").click()
  })

  it('Add a new book', () => {
    cy.get("[title='Add Book']", { timeout: 8000 }).click()
    cy.get("[name='title'").type('OEN book')
    cy.contains('span', 'Save').click()

    cy.get('[data-cy="book"]').then($book => {
      if ($book.text().includes('Plan Book')) {
        Cypress.env('oenBoolean', true)
        cy.contains('OEN book', { timeout: 8000 }).click()

        // Checking Welcome message
        cy.get('h3')
          .should('have.text', 'Welcome to the Open Textbook Planner')
          .siblings()
          .should(
            'have.text',
            'Before you start writing, prepare your book’s structure in four steps to create a consistent reading experience.① Determine Structure② Outline Content③ Add Pedagogical Elements④ Review TextbookCancelStart',
          )

        // Checking Cancel/Start
        cy.contains('Cancel').click()
        cy.location('pathname', { timeout: 8000 }).should('eq', '/books/')
        cy.contains('OEN book').click()
        cy.contains('Start').click()
      } else {
        cy.log('This test checks only OEN features.')
      }
    })
  })

  it('Step 1-Determine Hierarchy: Chapters & Sections', () => {
    cy.get('[data-cy="book"]').then($book => {
      if ($book.text().includes('Plan Book')) {
        cy.contains('OEN book').click()

        // Checking message
        cy.get('h3')
          .should('have.text', '① Determine Hierarchy')
          .next()
          .should(
            'have.text',
            'Textbooks are structured in hierarchical levels. Select the levels that will work best for your content. You can add more levels later when writing the book, if needed.',
          )

        // Choosing "Chapters and Sections"
        cy.get('button:nth(3)')
          .should('have.text', 'Back')
          .should('have.prop', 'disabled')

        cy.get('button:nth(1)')
          .should('have.text', 'Chapters and Sections')
          .click({ force: true })

        cy.get('button:nth(5)')
          .should('have.text', '② Outline Content')
          .should('be.enabled')

        // Switching to "Parts, Chapters and Sections"
        cy.get('button:nth(2)')
          .should('have.text', 'Parts, Chapters and Sections')
          .click({ timeout: 5000 })

        // Checking confirmation message
        cy.contains('CHANGE NUMBER OF LEVELS FOR OEN BOOK')
        cy.contains(
          'Are you sure you want to change the number of levels for the book with title OEN book?',
        )
        cy.contains(
          'If you change the number of levels then all the work which you might have done in following steps will be lost!',
        )
        cy.contains('Cancel').click()

        cy.get('button:nth(2)')
          .should('have.text', 'Parts, Chapters and Sections')
          .click()

        cy.get('button[title="Yes"]').click()
      } else {
        Cypress.env('oenBoolean', false)
        cy.log('This test checks only OEN features.')
      }
    })
  })

  it('Step 2-Outline Content', () => {
    cy.get('[data-cy="book"]').then($book => {
      if ($book.text().includes('Plan Book')) {
        cy.contains('OEN book').click()
        cy.contains('Outline Content').click()

        // Checking the information message on top
        cy.get('h3')
          .should('have.text', '② Outline Content')
          .next()
          .should(
            'have.text',
            'Using the levels you defined in Step 1, write the outline for your textbook. You can add and name as many levels as you need to build the textbook’s content outline. Drag and drop the levels on the right to your textbook outline on the left.',
          )

        cy.contains('Your Textbook Outline')

        // Adding title for each element
        cy.get("input[placeholder='Type the title of this part']").type(
          'PART X',
        )
        cy.get("input[placeholder='Type the title of this chapter']").type(
          'CHAPTER X',
        )
        cy.get("input[placeholder='Type the title of this section']").type(
          'SECTION X',
        )
        cy.get("input[placeholder='Type the title of this part']").should(
          'have.value',
          'PART X',
        )
        cy.get("input[placeholder='Type the title of this chapter']").should(
          'have.value',
          'CHAPTER X',
        )
        cy.get("input[placeholder='Type the title of this section']").should(
          'have.value',
          'SECTION X',
        )

        // Checking that Remove is disabled when there is only one element of a kind
        cy.get("input[placeholder='Type the title of this part']")
          .parent()
          .find('[title="Remove"]')
          .should('be.disabled')
        cy.get("input[placeholder='Type the title of this chapter']")
          .parent()
          .find('[title="Remove"]')
          .should('be.disabled')
        cy.get("input[placeholder='Type the title of this section']")
          .parent()
          .find('[title="Remove"]')
          .should('be.disabled')

        // Adding structural parts

        // Cloning elements
        cy.get("input[placeholder='Type the title of this section']")
          .parent()
          .find('[title="Clone"]')
          .click()
        cy.get("input[placeholder='Type the title of this chapter']")
          .parent()
          .find('[title="Clone"]')
          .click()
        cy.get("input[placeholder='Type the title of this part']")
          .parent()
          .find('[title="Clone"]')
          .click()

        // Removing elements
        cy.get('[title="Remove"]:nth(7)').should('be.enabled').click()
        cy.get("input[placeholder='Type the title of this part']")
          .parent()
          .find('[title="Remove"]')
          .should('be.disabled')
        cy.get('[title="Remove"]:nth(4)').should('be.enabled').click()
        cy.get("input[placeholder='Type the title of this chapter']")
          .parent()
          .find('[title="Remove"]')
          .should('be.disabled')
        cy.get('[title="Remove"]:nth(2)').should('be.enabled').click()
        cy.get("input[placeholder='Type the title of this section']")
          .parent()
          .find('[title="Remove"]')
          .should('be.disabled')
      } else {
        cy.log('This test checks only OEN features.')
      }
    })
  })

  it('Step 3-Add Pedagogical Elements', () => {
    cy.get('[data-cy="book"]').then($book => {
      if ($book.text().includes('Plan Book')) {
        cy.contains('OEN book').click()
        cy.contains('Add Pedagogical Elements').click()

        // Checking the information message on top
        cy.get('h3')
          .should('have.text', '③ Add Pedagogical Elements')
          .next()
          .should(
            'have.text',
            'Now that you have determined the content hierarchy and outline, choose the pedagogical elements to apply consistently throughout your textbook. Openers are typically used to prepare the learner for the content, for example: an Introduction and Learning Objectives. Closers are typically used to reinforce the content learned, for example: a Review Activity and Summary. Drag and drop the pedagogical elements on the right to your textbook structure on the left. This will be applied to the outline you created in Step 2.',
          )

        cy.contains('Your Textbook Structure')

        // Add and remove elements
        /*
    cy.get('div:nth(19)')
    cy.get('div:nth(26)')
    cy.get('div:nth(39)')
*/

        // Adding elements
        cy.contains('Introduction').dragAndDrop('span:first', 'div:nth(19)')
        cy.wait(4000)

        cy.contains('Outline').dragAndDrop('span:nth(1)', 'div:nth(31)')
        cy.wait(4000)

        cy.contains('Learning Objectives').dragAndDrop(
          'span:nth(2)',
          'div:nth(38)',
        )
        cy.wait(4000)

        cy.contains('Key Terms List').dragAndDrop('span:nth(5)', 'div:nth(19)')
        cy.wait(4000)

        cy.contains('Summary').dragAndDrop('span:nth(8)', 'div:nth(31)')
        cy.wait(4000)

        // Removing elements
        cy.get('button[title="Remove"]:first').should('be.enabled').click()
      } else {
        cy.log('This test checks only OEN features.')
      }
    })
  })

  it('Step 4-Review textbook', () => {
    cy.get('[data-cy="book"]').then($book => {
      if ($book.text().includes('Plan Book')) {
        cy.contains('OEN book').click()
        cy.contains('Review Textbook').click()

        // Checking the information message on top
        cy.get('h3')
          .should('have.text', '④ Review Textbook')
          .next()
          .should(
            'have.text',
            'This is the complete outline and structure of your textbook. Review and edit as needed. If you’d like to change the pedagogical elements you’ve selected, return to Step 3.',
          )

        cy.get('h4').should('have.text', 'Your Textbook Structure')

        // Type or check titles
        cy.get("input[placeholder='Type the title of this part']").should(
          'have.value',
          'PART X',
        )
        cy.get("input[placeholder='Type the title of this chapter']").should(
          'have.value',
          'CHAPTER X',
        )
        cy.get("input[placeholder='Type the title of this section']").should(
          'have.value',
          'SECTION X',
        )

        // Clone/remove elements
        cy.get('button[title="Clone"]:first').click()
        cy.get("input[placeholder='Type the title of this part']:first")
          .click()
          .clear()
          .type('First Part')
        cy.get("input[placeholder='Type the title of this part']:nth(1)")
          .click()
          .clear()
          .type('Second Part')

        // Check that Remove is disabled when there is only one element of a kind
        cy.get('button[title="Remove"]:first').should('be.enabled')
        cy.get('button[title="Remove"]:nth(1)').should('be.disabled')
        cy.get('button[title="Remove"]:nth(2)').should('be.disabled')

        // Check navigation by clicking Back/Next buttons in the navigation bar at the bottom
        cy.contains('Back').click()
        cy.contains('Next').click()

        //  Click Build book
        cy.contains('Build Book').click({ force: true })

        //  Check confirmation message
        cy.contains('BUILD OEN BOOK')
        cy.contains('Are you sure you want to build OEN book?')
        cy.contains(
          'You will no longer be able to access the Open Textbook Planner, but you can make any changes you’d like in the book after it is built.',
        )

        // Click cancel/yes and confirm that the book was built when clicking Yes
        cy.contains('Cancel').click()
        cy.contains('Build Book').click()
        cy.get('button[title="Yes"]').click()
      } else {
        cy.log('This test checks only OEN features.')
      }
    })
  })

  it('Check Editor', () => {
    cy.contains('OEN book').click()

    if (Cypress.env('oenBoolean') === true) {
      // Openers, Openers and Closers, Closers, Short boxes, Long boxes
      cy.contains('First Part').click()

      // Checking Openers
      cy.get('button[title="Introduction"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'introduction',
      )
      cy.get('button[title="Outline"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'outline',
      )
      cy.get('button[title="Learning Objectives"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'learning-objectives',
      )
      cy.get('button[title="Focus Questions"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'focus-questions',
      )
      cy.get('button[title="Content Opener Image"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'content-opener-image',
      )

      // Checking Openers and Closers
      cy.get('button[title="Key Terms List"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'key-terms',
      )
      cy.get('button[title="Self-reflection Activities"]').click({
        force: true,
      })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'self-reflection-activities',
      )

      // Checking Closers
      cy.get('button[title="Review Activity"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'review-activity',
      )
      cy.get('button[title="Summary"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'summary',
      )
      cy.get('button[title="References"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'references',
      )
      cy.get('button[title="Bibliography"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'bibliography',
      )
      cy.get('button[title="Further Reading"]').click({ force: true })
      cy.get('div[data-type="content_structure_element"]').should(
        'have.class',
        'further-reading',
      )

      // Checking Short Boxes
      cy.get('button[title="Note"]').click({ force: true })
      cy.get('aside').should('have.class', 'short note')
      cy.get('button[title="Tip"]').click({ force: true })
      cy.get('aside').should('have.class', 'short tip')
      cy.get('button[title="Warning"]').click({ force: true })
      cy.get('aside').should('have.class', 'short warning')
      cy.get('button[title="Reminder"]').click({ force: true })
      cy.get('aside').should('have.class', 'short reminder')

      // Checking Long Boxes
      cy.get('button[title="long"]')
        .contains('Case Study')
        .click({ force: true })
      cy.get('aside').should('have.class', 'long case-study')
      cy.get('button[title="long"]')
        .contains('Biography')
        .click({ force: true })
      cy.get('aside').should('have.class', 'long biography')
      cy.get('button[title="long"]')
        .contains('Worked Example')
        .click({ force: true })
      cy.get('aside').should('have.class', 'long worked-example')
    } else {
      cy.log('This test checks only OEN features.')
    }
  })
})
