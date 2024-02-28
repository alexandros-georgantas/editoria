/* eslint-disable jest/expect-expect */

/// <reference types="cypress" />
const { newUser } = require('../support/credentials')
// const { aliasMutation } = require("../utils/graphql.utils");

const baseRoute = Cypress.config().baseUrl

// Suit describing tests for login screen
describe('Login screen tests', () => {
  /*    before(() => {
        cy.exec('docker exec server_server_1 node ./scripts/seeds/createVerifiedUser.js email1234@gmail.com user1234')
    }) */

  beforeEach(() => {
    cy.visit(baseRoute)
    if (localStorage.getItem('token')) localStorage.removeItem('token')
  })

  it.skip('Signup', () => {
    cy.contains('Sign up').click()
    cy.location('pathname').should('eq', '/signup')
    cy.get("input[data-test-id='givenName'").type(newUser.username)
    cy.get("input[data-test-id='surname']").type(newUser.surname)
    cy.get("input[data-test-id='username'").type(newUser.username)
    cy.get("input[data-test-id='email'").type(newUser.email)
    cy.get("input[data-test-id='password'").type(newUser.password)
    cy.get("button[type='submit']").click()
    cy.url().should('be.equal', `${baseRoute}/login`)
  })

  it('Login & Logout', () => {
    cy.login(newUser.username, newUser.password)
    cy.url().should('be.equal', `${baseRoute}/books`)

    if (!localStorage.getItem('token') === null) {
      throw new Error('Access token not set')
    }

    cy.logout()
    cy.location('pathname', { timeout: 8000 }).should('eq', '/login')

    if (localStorage.getItem('token')) {
      throw new Error('Access token not cleared on logout')
    }
  })

  it('Password Reset', () => {
    cy.contains('Reset password', { timeout: 8000 }).click()
    cy.location('pathname').should('eq', '/request-password-reset')
    cy.get("[type='text']").type(newUser.username)
    cy.contains('This is not a valid email format')
    cy.get("[type='text']").clear().type(newUser.email)
    cy.intercept('POST', 'http://server:3000/graphql').as('mailReq')
    cy.get('button').last().should('have.text', 'Send email').click()
    cy.contains('div', 'An email has been sent to ' + `${newUser.email}`)
    cy.contains('div', 'Are you here by mistake? Go back to Login')
  })
})

// Suit describing tests for the profile screen
describe('Profile Screen Tests', () => {
  let currentPassword = newUser.password
  beforeEach(() => {
    /*        cy.intercept("POST","http://server:3000/graphql",req=>{
            aliasMutation(req,"UpdatePersonalInformation");
            aliasMutation(req,"UpdatePassword");
    }) */
    cy.login(newUser.username, currentPassword)
    cy.url().should('be.equal', `${baseRoute}/books`)
    cy.get('[title="User Menu dropdown"]', { timeout: 8000 }).click()
    cy.get("[href='/profile']").click()
    cy.url().should('be.equal', `${baseRoute}/profile`)
  })

  it('Editing Personal info', () => {
    cy.get("input[name='givenNames']").clear()
    cy.get("input[name='givenNames']").type(newUser.newUserName)
    cy.get("input[name='surname']").clear()
    cy.get("input[name='surname']").type(newUser.surname)
    cy.contains('span', 'Update').click()
    // cy.wait("@gqlUpdatePersonalInformationMutation");
    cy.contains('div', 'Personal Information successfully updated')
  })

  it('Change Password', () => {
    cy.url().should('be.equal', `${baseRoute}/profile`)
    cy.get("input[name='currentPassword']").type(newUser.password)
    cy.get("input[name='newPassword1']").type(newUser.newPassword)
    cy.get("input[name='newPassword2']").type(newUser.newPassword)
    cy.contains('span', 'Change password').click()
    // cy.wait("@gqlUpdatePasswordMutation");
    cy.contains('div', 'Password successfully updated')
    currentPassword = newUser.newPassword
  })

  it('Logging in with new Password and checking the Edited Personal info', () => {
    cy.get("input[name='givenNames']").should('have.value', newUser.newUserName)
    cy.get("input[name='surname']").should('have.value', newUser.surname)
  })
})
