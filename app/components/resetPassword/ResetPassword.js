/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { override } from '@pubsweet/ui-toolkit'
import { CenteredColumn, ErrorText, H1, Button, TextField } from '@pubsweet/ui'

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

const ResetPassword = props => {
  const {
    hasError,
    hasSuccess,
    loading,
    onSubmit,
    handleInputChange,
    formError,
    mainPasswordError,
    newPassword,
    confirmNewPassword,
    redirectToLogin,
  } = props

  if (hasSuccess) {
    redirectToLogin()
  }

  return (
    <CenteredColumn>
      <Logo>
        <img alt="ketida-logo" src="/ketida.svg" />
      </Logo>

      <FormContainer>
        {loading && <Loading />}
        <H1>Password Reset</H1>

        <div>
          <TextField
            label="New Password"
            name="new_password"
            onChange={event => handleInputChange(event.target.value, true)}
            placeholder="Enter your new password"
            type="password"
            value={newPassword}
          />
          {mainPasswordError && <ErrorText>{mainPasswordError}</ErrorText>}
          <TextField
            label="Confirm New Password"
            name="confirm_new_password"
            onChange={event => handleInputChange(event.target.value)}
            placeholder="Confirm your new password"
            type="password"
            value={confirmNewPassword}
          />
          {formError && <ErrorText>{formError}</ErrorText>}
          <Button
            disabled={
              loading ||
              formError ||
              hasError ||
              hasSuccess ||
              !newPassword ||
              newPassword.length < 8 ||
              !confirmNewPassword ||
              confirmNewPassword.length < 8
            }
            onClick={onSubmit}
            primary
          >
            Submit
          </Button>
          {hasError && <ErrorText>Something went wrong</ErrorText>}
        </div>
      </FormContainer>
    </CenteredColumn>
  )
}

export default ResetPassword
