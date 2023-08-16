/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { override } from '@pubsweet/ui-toolkit'
import {
  CenteredColumn,
  ErrorText,
  H1,
  Button,
  TextField,
  Link,
} from '@pubsweet/ui'

import {useTranslation} from "react-i18next";
import { Loading } from '../../ui'
import LanguageSwitcher from "../LanguageSwitcher";

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

const RequestVerificationEmail = props => {
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

  const {t}= useTranslation()

  return (
    <StyledCenterColumn>
      <Logo>
        <img alt="ketida-logo" src="/ketida.svg" />
      </Logo>
      <LanguageSwitcherWrapper>
        <LanguageSwitcher />
      </LanguageSwitcherWrapper>
      <FormContainer>
        {loading && <Loading />}
        {/* <H1>Request Verification email</H1> */}
        <H1>{t('request_verification_email')}</H1>
        <div>
          <TextField
            label={t("email")}
            name="email"
            onChange={event => handleInputChange(event.target.value)}
            placeholder={t('enter_your_email')}
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
            {t("send_email")}
          </Button>
          {hasError && <ErrorText>Something went wrong</ErrorText>}
          {hasSuccess && (
            /* <div>{`A verification email has been sent to ${userEmail}`}</div> */
            <div>{t('a_verification_email_has_been_sent_to_user_email',userEmail)}</div>
          )}
        </div>
        <div>
          {/* <span>Are you here by mistake? Go back to </span> */}
          <span>{t('are_you_here_by_mistake?_go_back_to')} </span>
          <Link to="/login">Login</Link>
        </div>
      </FormContainer>
    </StyledCenterColumn>
  )
}

export default RequestVerificationEmail
