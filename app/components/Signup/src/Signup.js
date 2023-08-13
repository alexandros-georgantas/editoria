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
import {useTranslation} from "react-i18next";

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
  const { t } = useTranslation()
  let error

  if (!value) {
    error = t('required')
  } else if (
    !emailRegex.test(value) // https://www.w3resource.com/javascript/form/email-validation.php
  ) {
    error = t('invalid_email_address'); // 'Invalid email address'
  }

  return error
}

const validateUsername = value => {
  const { t } = useTranslation()
  let error

  if (value === 'admin') {
    // error = 'Nice try!'
    error = 'nice_try'
  } else if (value === 'null') {
    // error = 'This is not a valid username'
    error = t('this_is_not_a_valid_username');
  } else if (!value) {
    error = t('required')
  }

  return error
}

const validateNames = value => {
  const { t } = useTranslation()
  let error

  if (value === 'null') {
    // error = 'This is not a valid name'
    error = t('this_is_not_a_valid_name')
  } else if (!value) {
    error = t('required')
  }

  return error
}

const validatePassword = value => {
  let error
  const { t } = useTranslation()

  if (!value) {
    error = t('required')
  } else if (value.length < 8) {
    error = t('password_should_be_more_than_7_characters')
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
  return <TextField
    data-test-id="givenName"
    label={t("given_name")}
    {...props}
    placeholder={t("given_name")}
  />
        }

const SurnameInput = props => {
  const { t } = useTranslation()
 return <TextField
    data-test-id="surname"
    label={t("surname")}
    {...props}
    placeholder={t("surname")}
  />
}

const UsernameInput = props => {
  const { t } = useTranslation()
  return <TextField
      data-test-id="username"
      label={t("username")}
      {...props}
      placeholder={t("username")}
  />
}

const EmailInput = props => {
  const { t } = useTranslation()
  return <TextField
      data-test-id="email"
      label={t("email")}
      {...props}
      placeholder={t("email")}
      type="email"
  />
}

const PasswordInput = props => {
  const { t } = useTranslation()
 return <TextField
    data-test-id="password"
    label={t("password")}
    {...props}
    placeholder={t("password")}
    type="password"
  />
}

const Signup = ({ error, errors, status, handleSubmit, logo = null }) =>
    {
      const { t } = useTranslation()
      return <StyledCenterColumn>
        <StyledDiv>
          {logo && (
              <Logo>
                <img alt="ketida-logo" src={`${logo}`}/>
              </Logo>
          )}
          <HeadingWrapper>
            { /* <H1>Sign up</H1> */ }
            {t('sign_up')}
          </HeadingWrapper>
          <FormContainer>
            {!isEmpty(errors) && <ErrorText>{errors.api}</ErrorText>}
            {status && <SuccessText>{t('user_created')}</SuccessText>}

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
                {t('sign_up')}
              </Button>
            </Form>

            <div>
              <span>{t('already_have_an_account?')} </span>
              <Link to="/login">{t('login')} </Link>
            </div>
          </FormContainer>
        </StyledDiv>
      </StyledCenterColumn>
    }


export default Signup
