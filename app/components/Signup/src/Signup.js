/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from 'react'
import { Form } from 'formik'
import isEmpty from 'lodash/isEmpty'
import { override } from '@pubsweet/ui-toolkit'
import {
  ValidatedFieldFormik,
  CenteredColumn,
  Link,
  ErrorText,
  Button,
  TextField,
} from '@pubsweet/ui'
import styled from 'styled-components'
import {Trans, useTranslation} from "react-i18next";

/* eslint-disable no-useless-escape, no-control-regex */
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
/* eslint-enable no-useless-escape, no-control-regex */

/* stylelint-disable order/properties-alphabetical-order */
const FormContainer = styled.div`
  ${override('Login.FormContainer')};
  height: 60%;
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
  height: 100vh;
  overflow-y: auto;
`

/* stylelint-disable order/properties-alphabetical-order */
const Logo = styled.div`
  ${override('Login.Logo')};
  margin: auto;
  width: 320px;
  height: auto;
`
/* stylelint-enable order/properties-alphabetical-order */

const validateEmail = value => {
  // const { t } = useTranslation()
  let error

  if (!value) {
    error = (<Trans i18nKey="required">
      Required
    </Trans>) // t('required')
  } else if (
    !emailRegex.test(value) // https://www.w3resource.com/javascript/form/email-validation.php
  ) {
    error = (<Trans i18nKey="invalid_email_address">Invalid email address</Trans> )  // t('invalid_email_address'); // 'Invalid email address'
  }

  return error
}

const validateUsername = value => {
  // const { t } = useTranslation()
  let error

  if (value === 'admin') {
    // error = 'Nice try!'
    error = <Trans i18nKey="nice_try">Nice try!</Trans> // 'nice_try'
  } else if (value === 'null') {
    // error = 'This is not a valid username'
    error = <Trans i18nKey="this_is_not_a_valid_username">This is not a valid username</Trans> // t('this_is_not_a_valid_username');
  } else if (!value) {
    error = <Trans i18nKey='required'>Required</Trans> // t('required')
  }

  return error
}

const validateNames = value => {
  // const { t } = useTranslation()
  let error

  if (value === 'null') {
    // error = 'This is not a valid name'
    error = <Trans i18nKey='this_is_not_a_valid_name'>This is not a valid name</Trans> // t('this_is_not_a_valid_name')
  } else if (!value) {
    error = <Trans i18nKey='required'>Required</Trans> // t('required')

  }

  return error
}

const validatePassword = value => {
  let error
  // const { t } = useTranslation()

  if (!value) {
    error = <Trans i18nKey='required'>Required</Trans> // t('required')
  } else if (value.length < 8) {
    // error = t('password_should_be_more_than_7_characters')
    error = <Trans i18nKey='password_should_be_more_than_7_characters'>Password should be more than 7 characters</Trans> // t('required')
  }

  return error
}

const GivenNameInput = props => {
const { t } = useTranslation()
  // return <TextField
  //   data-test-id="givenName"
  //   label={t("given_name")}
  //   {...props}
  //   placeholder="Given Name"
  // />
  const givenName = t("given_name")
  return <TextField
    data-test-id="givenName"
    label={givenName}
    {...props}
    placeholder={givenName}
  />
        }

const SurnameInput = props => {
  const { t } = useTranslation()
 const surname = t("surname")
  return <TextField
    data-test-id="surname"
    label={surname}
    {...props}
    placeholder={surname}
  />
}

const UsernameInput = props => {
  const { t } = useTranslation()
  const username = t("username");
  return <TextField
      data-test-id="username"
      label={username}
      {...props}
      placeholder={username}
  />
}

const EmailInput = props => {
  const { t } = useTranslation()
  const email = t("email")
  return <TextField
      data-test-id="email"
      label={email}
      {...props}
      placeholder={email}
      type="email"
  />
}

const PasswordInput = props => {
  const { t } = useTranslation()
 const password = t("password")
  return <TextField
    data-test-id="password"
    label={password}
    {...props}
    placeholder={password}
    type="password"
  />
}

const Signup = ({ error, errors, status, handleSubmit, logo = null }) =>
    {
      // const { t } = useTranslation()
      return <StyledCenterColumn>
        <StyledDiv>
          {logo && (
              <Logo>
                <img alt="ketida-logo" src={`${logo}`}/>
              </Logo>
          )}
          <HeadingWrapper>
            { /* <H1>Sign up</H1> */ }
             {/* t('sign_up') */}
            <Trans i18nKey="sign_up">Siugn Up</Trans>
          </HeadingWrapper>
          <FormContainer>
            {!isEmpty(errors) && <ErrorText>{errors.api}</ErrorText>}
            {status && <SuccessText><Trans i18nKey='user_created'>User Created</Trans></SuccessText>}

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
                <Trans i18nKey='sign_up'>Sign Up</Trans>
              </Button>
            </Form>

            <div>
              {/* <span>{t('already_have_an_account?')} </span> */}
              <span><Trans i18nKey="already_have_an_account?">Already have an account?</Trans> </span>
              <Link to="/login"><Trans i18nKey='login'>Login</Trans></Link>
            </div>
          </FormContainer>
        </StyledDiv>
      </StyledCenterColumn>
    }


export default Signup
