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
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../LanguageSwitcher'

/* stylelint-disable order/properties-alphabetical-order */

const Logo = styled.div`
  ${override('Login.Logo')};
  margin: auto;
  width: 320px;
  height: auto;
`
/* stylelint-enable order/properties-alphabetical-order */

Logo.displayName = 'Ketida'

const StyledCenterColumn = styled(CenteredColumn)`
  height: 100%;
`

/* stylelint-disable order/properties-alphabetical-order */
const FormContainer = styled.div`
  ${override('Login.FormContainer')};
  border: 0;
  height: 70%;
  overflow-y: auto;
`
/* stylelint-enable order/properties-alphabetical-order */

const UsernameInput = props => {
  // return (<TextField label="Username" placeholder="Username" {...props.field} />)
  const { t } = useTranslation()
  return (
    <TextField
      label={t('username')}
      placeholder={t('username')}
      {...props.field}
    />
  )
}

const PasswordInput = props => {
  const { t } = useTranslation()
  /* <TextField
    label="Password"
    placeholder="Password"
    {...props.field}
    type="password"
  /> */
  return (
    <TextField
      label={t('password')}
      placeholder={t('password')}
      {...props.field}
      type="password"
    />
  )
}

const renderError = msg => {
  const { t } = useTranslation()

  if (msg === 100 || msg === 120) {
    return (
      <span>
        <ErrorText>
          {t('follow_verification_link')}
          {/* Please follow the verification link sent to your email after
          registration process, or request a new verification email */}
          ,
        </ErrorText>
        <Link to="/resend-verification">
          {t('resend_verification')}
          {/* resend verification */}
        </Link>
      </span>
    )
  }

  if (msg === 110) {
    return (
      <ErrorText>
        {/* Your user is deactivated by the admins of the system */}
        {t('your_user_is_deactivated')}
      </ErrorText>
    )
  }

  return <ErrorText>{msg}</ErrorText>
}

const Login = ({
  errors,
  handleSubmit,
  logo = null,
  signup = true,
  passwordReset = true,
  redirectLink,
}) => {
  const { t } = useTranslation()
  return redirectLink ? (
    <Redirect to={redirectLink} />
  ) : (
    <StyledCenterColumn>
      {logo && (
        <Logo>
          <img alt="ketida-logo" src={`${logo}`} />
        </Logo>
      )}
      <LanguageSwitcher />
      <FormContainer>
        <H1>
          {/* Login */} {t('login')}
        </H1>

        {!isEmpty(errors) && renderError(errors.api)}
        <form onSubmit={handleSubmit}>
          <Field component={UsernameInput} name="username" />
          <Field component={PasswordInput} name="password" />
          <Button primary type="submit">
            {t('login')} {/* Login */}
          </Button>
        </form>

        {signup && (
          <div>
            <span>
              {t('dont_have_an_account')}
              {/* Don&apos;t have an account? */}
            </span>
            <Link to="/signup">
              {t('sign_up')}
              {/* Sign up */}
            </Link>
          </div>
        )}

        {passwordReset && (
          <div>
            <span>
              {t('forgot_your_password')}
              {/* Forgot your password? */}
            </span>
            <Link to="/request-password-reset">
              {t('reset_password')}
              {/* Reset password */}
            </Link>
          </div>
        )}
      </FormContainer>
    </StyledCenterColumn>
  )
}

export default Login
