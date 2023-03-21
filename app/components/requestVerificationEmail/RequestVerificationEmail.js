/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { override } from '@pubsweet/ui-toolkit'
import {
  CenteredColumn,
  ErrorText,
  H1,
  Button,
  TextField,
  Link,
} from '@pubsweet/ui'

import { Loading } from '../../ui'

/* stylelint-disable order/properties-alphabetical-order */
const Logo = styled.div`
  ${override('Login.Logo')};
  margin: 10px auto 20px;
  width: 100%;
`
/* stylelint-enable order/properties-alphabetical-order */

Logo.displayName = 'Ketida'

const FormContainer = styled.div`
  ${override('Login.FormContainer')};
`

const RequestVerificationEmail = props => {
  const {
    hasError,
    hasSuccess,
    loading,
    onSubmit,
    userEmail,
    handleInputChange,
    formError,
    email,
  } = props

  return (
    <CenteredColumn>
      <Logo>
        <img alt="ketida-logo" src="/ketida.svg" />
      </Logo>

      <FormContainer>
        {loading && <Loading />}
        <H1>Request Verification email</H1>

        <div>
          <TextField
            label="Email"
            name="email"
            onChange={event => handleInputChange(event.target.value)}
            placeholder="Enter your email"
            type="text"
            value={email}
          />
          {formError && <ErrorText>{formError}</ErrorText>}
          <Button
            disabled={
              loading ||
              formError ||
              hasError ||
              hasSuccess ||
              !email ||
              email.length === 0
            }
            onClick={onSubmit}
            primary
          >
            Send email
          </Button>
          {hasError && <ErrorText>Something went wrong</ErrorText>}
          {hasSuccess && (
            <div>{`A verification email has been sent to ${userEmail}`}</div>
          )}
        </div>
        <div>
          <span>Are you here by mistake? Go back to </span>
          <Link to="/login">Login</Link>
        </div>
      </FormContainer>
    </CenteredColumn>
  )
}

export default RequestVerificationEmail
