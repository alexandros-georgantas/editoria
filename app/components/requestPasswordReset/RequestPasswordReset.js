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

  const { t } = useTranslation()

  return (
    <StyledCenterColumn>
      <Logo>
        <img alt="ketida-logo" src="/ketida.svg" />
      </Logo>

      <FormContainer>
        {loading && <Loading />}
        {/* <H1>Password Reset</H1> */}
        <H1>{t('password_reset')}</H1>

        <div>
          <TextField
            label="Email"
            name="email"
            onChange={event => handleInputChange(event.target.value)}
            placeholder={t("enter_your_email")}
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
            Send email
          </Button>
          {hasError && <ErrorText>{t("something_went_wrong")}</ErrorText>}
          {/* {hasSuccess && <div>{`An email has been sent to ${userEmail}`}</div>} */}
          {hasSuccess && <div>{t("An email has been sent to ",{userEmail})}</div>}
        </div>
        <div>
          <span>{t("are_you_here_by_mistake?_go_back_to")} </span>
          <Link to="/login">{t("login")}</Link>
        </div>
      </FormContainer>
    </StyledCenterColumn>
  )
}

export default RequestPasswordReset
