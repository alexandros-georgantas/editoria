/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
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
import LanguageSwitcher from '../LanguageSwitcher'

const languageSwitch =
  (process.env.LANG_SWITCH && JSON.parse(process.env.LANG_SWITCH)) || false

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
  height: 50%;
  overflow-y: auto;
  border: 0;
`

const LanguageSwitcherWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
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

  const { i18n } = useTranslation()

  return (
    <StyledCenterColumn>
      <Logo>
        <img alt="ketida-logo" src="/ketida.svg" />
      </Logo>
      {languageSwitch && (
        <LanguageSwitcherWrapper>
          <LanguageSwitcher />
        </LanguageSwitcherWrapper>
      )}
      <FormContainer>
        {loading && <Loading />}
        {/* <H1>Password Reset</H1> */}
        <H1>{i18n.t('password_reset')}</H1>

        <div>
          <TextField
            label={i18n.t('email')} // "Email"
            name="email"
            onChange={event => handleInputChange(event.target.value)}
            placeholder={i18n.t('enter_your_email')}
            type="text"
            value={email}
          />
          {formError && (
            <ErrorText>
              {i18n.t(formError.toLowerCase().replace(/ /g, '_'))}
            </ErrorText>
          )}
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
            {i18n.t('send_email')}
          </Button>
          {hasError && <ErrorText>{i18n.t('something_went_wrong')}</ErrorText>}
          {/* {hasSuccess && <div>{`An email has been sent to ${userEmail}`}</div>} */}
          {hasSuccess && (
            <div>{i18n.t('an_email_has_been_sent_to', { userEmail })}</div>
          )}
        </div>
        <div>
          <span>{i18n.t('are_you_here_by_mistake?_go_back_to')} </span>
          <Link to="/login">{i18n.t('login')}</Link>
        </div>
      </FormContainer>
    </StyledCenterColumn>
  )
}

export default RequestPasswordReset
