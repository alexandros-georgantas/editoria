/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from 'react'
import { Form } from 'formik'
import isEmpty from 'lodash/isEmpty'
import { override } from '@pubsweet/ui-toolkit'
import {
  ValidatedFieldFormik,
  CenteredColumn,
  Link,
  H1,
  ErrorText,
  Button,
  TextField,
} from '@pubsweet/ui'
import styled from 'styled-components'

/* eslint-disable no-useless-escape, no-control-regex */
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
/* eslint-enable no-useless-escape, no-control-regex */

/* stylelint-disable order/properties-alphabetical-order */
const FormContainer = styled.div`
  ${override('Login.FormContainer')};
  height: 50%;
  overflow-y: auto;
  border: 0;
`

const HeadingWrapper = styled.div`
  padding-left: 40px;
`
/* stylelint-enable order/properties-alphabetical-order */

const SuccessText = styled.div`
  color: green;
`

const StyledCenterColumn = styled(CenteredColumn)`
  height: 100%;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
`

/* stylelint-disable order/properties-alphabetical-order */
const Logo = styled.div`
  ${override('Login.Logo')};
  margin: 0;
  width: 100%;
  height: auto;
`
/* stylelint-enable order/properties-alphabetical-order */

const validateEmail = value => {
  let error

  if (!value) {
    error = 'Required'
  } else if (
    !emailRegex.test(value) // https://www.w3resource.com/javascript/form/email-validation.php
  ) {
    error = 'Invalid email address'
  }

  return error
}

const validateUsername = value => {
  let error

  if (value === 'admin') {
    error = 'Nice try!'
  } else if (value === 'null') {
    error = 'This is not a valid username'
  } else if (!value) {
    error = 'Required'
  }

  return error
}

const validateNames = value => {
  let error

  if (value === 'null') {
    error = 'This is not a valid name'
  } else if (!value) {
    error = 'Required'
  }

  return error
}

const validatePassword = value => {
  let error

  if (!value) {
    error = 'Required'
  } else if (value.length < 8) {
    error = 'Password should be more than 7 characters'
  }

  return error
}

const GivenNameInput = props => (
  <TextField
    data-test-id="givenName"
    label="Given Name"
    {...props}
    placeholder="Given Name"
  />
)

const SurnameInput = props => (
  <TextField
    data-test-id="surname"
    label="Surname"
    {...props}
    placeholder="Surname"
  />
)

const UsernameInput = props => (
  <TextField
    data-test-id="username"
    label="Username"
    {...props}
    placeholder="Username"
  />
)

const EmailInput = props => (
  <TextField
    data-test-id="email"
    label="Email"
    {...props}
    placeholder="Email"
    type="email"
  />
)

const PasswordInput = props => (
  <TextField
    data-test-id="password"
    label="Password"
    {...props}
    placeholder="Password"
    type="password"
  />
)

const Signup = ({ error, errors, status, handleSubmit, logo = null }) => (
  <StyledCenterColumn>
    <StyledDiv>
      {logo && (
        <Logo>
          <img alt="ketida-logo" src={`${logo}`} />
        </Logo>
      )}
      <HeadingWrapper>
        <H1>Sign up</H1>
      </HeadingWrapper>
      <FormContainer>
        {!isEmpty(errors) && <ErrorText>{errors.api}</ErrorText>}
        {status && <SuccessText>User created</SuccessText>}

        <Form onSubmit={handleSubmit}>
          <ValidatedFieldFormik
            component={GivenNameInput}
            name="givenNames"
            validate={validateNames}
          />
          <ValidatedFieldFormik
            component={SurnameInput}
            name="surname"
            validate={validateNames}
          />
          <ValidatedFieldFormik
            component={UsernameInput}
            name="username"
            validate={validateUsername}
          />
          <ValidatedFieldFormik
            component={EmailInput}
            name="email"
            validate={validateEmail}
          />
          <ValidatedFieldFormik
            component={PasswordInput}
            name="password"
            validate={validatePassword}
          />
          <Button disabled={error || !isEmpty(errors)} primary type="submit">
            Sign up
          </Button>
        </Form>

        <div>
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </FormContainer>
    </StyledDiv>
  </StyledCenterColumn>
)

export default Signup
