/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { override } from '@pubsweet/ui-toolkit'
import { CenteredColumn, ErrorText, H1, Button, TextField } from '@pubsweet/ui'

import { Loading } from '../../ui'

const Logo = styled.div`
  ${override('Login.Logo')};
`

Logo.displayName = 'Logo'

const FormContainer = styled.div`
  ${override('Login.FormContainer')};
`

const RequestPasswordReset = props => {
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
        <img alt="ketida-logo" src="/ketida.png" />
      </Logo>

      <FormContainer>
        {loading && <Loading />}
        <H1>Password Reset</H1>

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
          {hasSuccess && <div>{`An email to ${userEmail} has been sent`}</div>}
        </div>
      </FormContainer>
    </CenteredColumn>
  )
}

export default RequestPasswordReset
