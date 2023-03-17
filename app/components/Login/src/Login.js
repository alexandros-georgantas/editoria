/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Field } from 'formik'
import isEmpty from 'lodash/isEmpty'
import { override } from '@pubsweet/ui-toolkit'
import {
  CenteredColumn,
  ErrorText,
  H1,
  Link,
  Button,
  TextField,
} from '@pubsweet/ui'

import styled from 'styled-components'

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

const UsernameInput = props => (
  <TextField label="Username" placeholder="Username" {...props.field} />
)

const PasswordInput = props => (
  <TextField
    label="Password"
    placeholder="Password"
    {...props.field}
    type="password"
  />
)

const Login = ({
  errors,
  handleSubmit,
  logo = null,
  signup = true,
  passwordReset = true,
  redirectLink,
}) =>
  redirectLink ? (
    <Redirect to={redirectLink} />
  ) : (
    <CenteredColumn small>
      {logo && (
        <Logo>
          <img alt="ketida-logo" src={`${logo}`} />
        </Logo>
      )}
      <FormContainer>
        <H1>Login</H1>

        {!isEmpty(errors) && <ErrorText>{errors.api}</ErrorText>}
        <form onSubmit={handleSubmit}>
          <Field component={UsernameInput} name="username" />
          <Field component={PasswordInput} name="password" />
          <Button primary type="submit">
            Login
          </Button>
        </form>

        {signup && (
          <div>
            <span>Don&apos;t have an account? </span>
            <Link to="/signup">Sign up</Link>
          </div>
        )}

        {passwordReset && (
          <div>
            <span>Forgot your password? </span>
            <Link to="/request-password-reset">Reset password</Link>
          </div>
        )}
      </FormContainer>
    </CenteredColumn>
  )

export default Login
