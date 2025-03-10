import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

// Users and Teams
import GlobalTeamsManager from './components/globalTeamsManager/src/ConnectedGlobalTeams'

// System Info Page
import ConnectedSystemInfo from './components/systemInfo/src/ConnectedSystemInfo'

// Authentication
import Login from './components/Login/src/LoginContainer'
import Signup from './components/Signup/src/SignupContainer'
import UserProfile from './components/userProfile/src/ConnectedUserProfile'

// Editor
import EditorPageWithData from './components/wax/src/EditorPageWithData'

// Ketida
import BookBuilder from './components/bookbuilder/src/ConnectedBookBuilder'
import VerifyEmailPage from './components/verifyEmail/VerifyEmail.page'
import RequestVerificationEmailPage from './components/requestVerificationEmail/RequestVerificationEmail.page'
import RequestPasswordResetPage from './components/requestPasswordReset/RequestPasswordReset.page'
import ResetPasswordPage from './components/resetPassword/ResetPassword.page'

import BookStructurePage from './components/wizard/src/BookStructure.page'
import Dashboard from './components/dashboard/src/ConnectedDashboard'
import Templates from './components/templates/src/ConnectedTemplates'

import PagedStyler from './components/bookbuilder/src/PagedStyler/ConnectedPagedStyler'
import Navigation from './components/navigation/src/Navigation'
import PrivateRoute from './components/navigation/src/PrivateRoute'

import Connected from './components/navigation/src/ConnectedNavigation'
import PageLayout from './elements/PageLayout'
import Page from './elements/Page'

const ConnectedNavigation = Connected(Navigation)

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    overflow: hidden;

    #root,
    #root > div {
      height: 100%;
    }

    #root > div > div {
      height: 100%;
    }
  }
`

// const featureBookStructureEnabled = process.env.FEATURE_BOOK_STRUCTURE || false
const featureBookStructureEnabled =
  (process.env.FEATURE_BOOK_STRUCTURE &&
    JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
  false

export default (
  <>
    <GlobalStyle />
    <Switch>
      <Redirect exact path="/" to="/books" />
      <Route
        path="/login"
        render={props => <Login {...props} logo="/ketida.svg" />}
      />
      <Route
        path="/signup"
        render={props => <Signup {...props} logo="/ketida.svg" />}
      />
      <Route
        component={VerifyEmailPage}
        exact
        path="/email-verification/:token"
      />
      <Route
        component={RequestVerificationEmailPage}
        exact
        path="/resend-verification"
      />
      <Route
        component={RequestPasswordResetPage}
        exact
        path="/request-password-reset"
      />
      <Route
        component={ResetPasswordPage}
        exact
        path="/password-reset/:token"
      />

      <PageLayout>
        <ConnectedNavigation />
        <Page>
          <Switch>
            <PrivateRoute component={Dashboard} exact path="/books" />
            {featureBookStructureEnabled && (
              <PrivateRoute
                component={BookStructurePage}
                exact
                path="/books/:id/book-structure"
              />
            )}
            <PrivateRoute component={Templates} exact path="/templates" />
            <PrivateRoute component={UserProfile} exact path="/profile" />
            <PrivateRoute
              component={PagedStyler}
              path="/books/:id/pagedPreviewer/paged/:hashed/template/:templateId"
            />

            <PrivateRoute
              component={BookBuilder}
              path="/books/:id/book-builder"
            />
            <PrivateRoute
              component={EditorPageWithData}
              exact
              path="/books/:bookId/bookComponents/:bookComponentId"
            />
            <PrivateRoute
              component={EditorPageWithData}
              path="/books/:bookId/bookComponents/:bookComponentId/:mode"
            />
            <PrivateRoute component={GlobalTeamsManager} path="/globalTeams" />
            <PrivateRoute component={ConnectedSystemInfo} path="/systemInfo" />
          </Switch>
        </Page>
      </PageLayout>
    </Switch>
  </>
)
