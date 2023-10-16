/* eslint-disable react/prop-types, react/destructuring-assignment */
import React, { useEffect } from 'react'
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
import i18next from 'i18next'
// import i18n from "../../../../services/i18n";
// import {useTranslation} from "react-i18next";
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../LanguageSwitcher'

const languageSwitch =
  (process.env.LANG_SWITCH && JSON.parse(process.env.LANG_SWITCH)) || false

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

const LanguageSwitcherWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
`
/* stylelint-enable order/properties-alphabetical-order */

const validateEmail = value => {
  let error

  if (!value) {
    error = i18next.t('Required'.toLowerCase())
  } else if (
    !emailRegex.test(value) // https://www.w3resource.com/javascript/form/email-validation.php
  ) {
    error = i18next.t('Invalid email address'.toLowerCase().replace(/ /g, '_'))
  }

  return error
}

const validateUsername = value => {
  let error

  if (value === 'admin') {
    error = i18next.t('Nice try!'.toLowerCase().replace(/ /g, '_'))
  } else if (value === 'null') {
    error = i18next.t(
      'This is not a valid username'.toLowerCase().replace(/ /g, '_'),
    )
  } else if (!value) {
    error = i18next.t('Required'.toLowerCase())
  }

  return error
}

const validateNames = value => {
  let error

  if (value === 'null') {
    error = i18next.t(
      'This is not a valid name'.toLowerCase().replace(/ /g, '_'),
    )
  } else if (!value) {
    error = i18next.t('Required'.toLowerCase())
  }

  return error
}

const validatePassword = value => {
  let error

  if (!value) {
    error = i18next.t('Required'.toLowerCase())
  } else if (value.length < 8) {
    error = i18next.t(
      'Password should be more than 7 characters'
        .toLowerCase()
        .replace(/ /g, '_'),
    )
  }

  return error
}

const GivenNameInput = props => {
  const { i18n } = useTranslation()
  return (
    <TextField
      data-test-id="givenName"
      label={i18n.t('Given Name'.toLowerCase().replace(/ /g, '_'))}
      {...props}
      placeholder={i18n.t('Given Name'.toLowerCase().replace(/ /g, '_'))}
    />
  )
}

const SurnameInput = props => {
  const { i18n } = useTranslation()
  return (
    <TextField
      data-test-id="surname"
      label={i18n.t('Surname'.toLowerCase())}
      {...props}
      placeholder={i18n.t('Surname'.toLowerCase())}
    />
  )
}

const UsernameInput = props => {
  const { i18n } = useTranslation()
  return (
    <TextField
      data-test-id="username"
      label={i18n.t('Username'.toLowerCase())}
      {...props}
      placeholder={i18n.t('Username'.toLowerCase())}
    />
  )
}

const EmailInput = props => {
  const { i18n } = useTranslation()
  return (
    <TextField
      data-test-id="email"
      label={i18n.t('Email'.toLowerCase())}
      {...props}
      placeholder={i18n.t('Email'.toLowerCase())}
      type="email"
    />
  )
}

const PasswordInput = props => {
  const { i18n } = useTranslation()
  return (
    <TextField
      data-test-id="password"
      label={i18n.t('Password'.toLowerCase())}
      {...props}
      placeholder={i18n.t('Password'.toLowerCase())}
      type="password"
    />
  )
}

const useTranslateFormErrors = (errors, touched, setFieldTouched) => {
  const { i18n } = useTranslation()
  useEffect(() => {
    i18n.on('languageChanged', lng => {
      Object.keys(errors).forEach(fieldName => {
        if (Object.keys(touched).includes(fieldName)) {
          setFieldTouched(fieldName)
        }
      })
    })

    return () => {
      i18n.off('languageChanged', lng => {})
    }
  }, [errors])
}

const Signup = ({
  error,
  errors,
  status,
  handleSubmit,
  logo = null,
  touched,
  setFieldTouched,
}) => {
  useTranslateFormErrors(errors, touched, setFieldTouched)

  return (
    <StyledCenterColumn>
      {languageSwitch && (
        <LanguageSwitcherWrapper>
          <LanguageSwitcher />
        </LanguageSwitcherWrapper>
      )}

      <StyledDiv>
        {logo && (
          <Logo>
            <img alt="ketida-logo" src={`${logo}`} />
          </Logo>
        )}
        <HeadingWrapper>
          <H1>{i18next.t('Sign up'.toLowerCase().replace(/ /g, '_'))}</H1>
        </HeadingWrapper>
        <FormContainer>
          {!isEmpty(errors) && <ErrorText>{errors.api}</ErrorText>}
          {status && (
            <SuccessText>
              {i18next.t('User created'.toLowerCase().replace(/ /g, '_'))}
            </SuccessText>
          )}

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
              {i18next.t('Sign up'.toLowerCase().replace(/ /g, '_'))}
            </Button>
          </Form>

          <div>
            <span>
              {i18next.t(
                'Already have an account?'.toLowerCase().replace(/ /g, '_'),
              )}{' '}
            </span>
            <Link to="/login">
              {i18next.t('Login'.toLowerCase().replace(/ /g, '_'))}
            </Link>
          </div>
        </FormContainer>
      </StyledDiv>
    </StyledCenterColumn>
  )
}

export default Signup
