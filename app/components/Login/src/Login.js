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
import { useTranslation, Trans } from 'react-i18next'

import styled from 'styled-components'
<<<<<<< HEAD
import LanguageSwitcher from '../../LanguageSwitcher'
=======
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../LanguageSwitcher'

>>>>>>> 314e049 (+ setting up localization)
/* stylelint-disable order/properties-alphabetical-order */

const Logo = styled.div`
  ${override('Login.Logo')};
  margin: auto;
  width: 320px;
  height: auto;
`
/* stylelint-enable order/properties-alphabetical-order */

Logo.displayName = 'Ketida'

const LanguageSwitcherWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
`

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
<<<<<<< HEAD
  // return <TextField label="Username" placeholder="Username" {...props.field} />
  const { t } = useTranslation()
  const username = t('username')
  return <TextField label={username} placeholder={username} {...props.field} />
=======
  // return (<TextField label="Username" placeholder="Username" {...props.field} />)
  const { t } = useTranslation()
  return (
    <TextField
      label={t('username')}
      placeholder={t('username')}
      {...props.field}
    />
  )
>>>>>>> 314e049 (+ setting up localization)
}

const PasswordInput = props => {
  const { t } = useTranslation()
<<<<<<< HEAD
  const password = t('password')
  /* <TextField
        label="Password"
        placeholder="Password"
        {...props.field}
        type="password"
      /> */
  return (
    <TextField
      label={password}
      placeholder={password}
=======
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
>>>>>>> 314e049 (+ setting up localization)
      {...props.field}
      type="password"
    />
  )
}

const renderError = msg => {
<<<<<<< HEAD
=======
  const { t } = useTranslation()
>>>>>>> 314e049 (+ setting up localization)

  if (msg === 100 || msg === 120) {
    return (
      <span>
        <ErrorText>
<<<<<<< HEAD
          {/* Please follow the verification link sent to your email after
          registration process, or request a new verification email */}
          <Trans i18nKey="follow_verification_link">
            Please follow the verification link sent to your email after
            registration process, or request a new verification email
          </Trans>
        </ErrorText>
        <Link to="/resend-verification"><Trans i18nKey="resend_verification">resend verification</Trans> </Link>
=======
          {t('follow_verification_link')}
          {/* Please follow the verification link sent to your email after
          registration process, or request a new verification email */}
          ,
        </ErrorText>
        <Link to="/resend-verification">
          {t('resend_verification')}
          {/* resend verification */}
        </Link>
>>>>>>> 314e049 (+ setting up localization)
      </span>
    )
  }

  if (msg === 110) {
    return (
      // <ErrorText>
      //   Your user is deactivated by the admins of the system
      // </ErrorText>

      <ErrorText>
<<<<<<< HEAD
        <Trans i18nKey="your_user_is_deactivated">
          Your user is deactivated by the admins of the system
        </Trans>
=======
        {/* Your user is deactivated by the admins of the system */}
        {t('your_user_is_deactivated')}
>>>>>>> 314e049 (+ setting up localization)
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
<<<<<<< HEAD
  const login = t('login')
  // const dontHaveAnAccount = t('dont_have_an_account')
  const forgotYourPassword = t('forgot_your_password')
  const resetPassword = t('reset_password')
  const signUpTrans = t('sign_up')


=======
>>>>>>> 314e049 (+ setting up localization)
  return redirectLink ? (
    <Redirect to={redirectLink} />
  ) : (
    <StyledCenterColumn>
      <LanguageSwitcherWrapper>
        <LanguageSwitcher />
      </LanguageSwitcherWrapper>
      {logo && (
        <Logo>
          <img alt="ketida-logo" src={`${logo}`} />
        </Logo>
      )}
<<<<<<< HEAD

      <FormContainer>
        <H1>
          {/* Login */} {login}
=======
      <LanguageSwitcher />
      <FormContainer>
        <H1>
          {/* Login */} {t('login')}
>>>>>>> 314e049 (+ setting up localization)
        </H1>

        {!isEmpty(errors) && renderError(errors.api)}

        <form onSubmit={handleSubmit}>
          <Field component={UsernameInput} name="username" />
          <Field component={PasswordInput} name="password" />
          <Button primary type="submit">
<<<<<<< HEAD
            {login} {/* Login */}
=======
            {t('login')} {/* Login */}
>>>>>>> 314e049 (+ setting up localization)
          </Button>
        </form>

        {signup && (
          <div>
            <span>
<<<<<<< HEAD
              {/* {dontHaveAnAccount} */}
              <Trans i18nKey="dont_have_an_account">Dont have an account?</Trans>
              {/* Don&apos;t have an account? */}
            </span>
            <Link to="/signup">
              {signUpTrans}
=======
              {t('dont_have_an_account')}
              {/* Don&apos;t have an account? */}
            </span>
            <Link to="/signup">
              {t('sign_up')}
>>>>>>> 314e049 (+ setting up localization)
              {/* Sign up */}
            </Link>
          </div>
        )}

        {passwordReset && (
          <div>
            <span>
<<<<<<< HEAD
              {forgotYourPassword}
              {/* Forgot your password? */}
            </span>
            <Link to="/request-password-reset">
              {/* Reset password */}
              {resetPassword}
=======
              {t('forgot_your_password')}
              {/* Forgot your password? */}
            </span>
            <Link to="/request-password-reset">
              {t('reset_password')}
              {/* Reset password */}
>>>>>>> 314e049 (+ setting up localization)
            </Link>
          </div>
        )}
      </FormContainer>
    </StyledCenterColumn>
  )
}

export default Login
