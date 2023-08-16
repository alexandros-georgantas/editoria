/* eslint-disable react/prop-types */
import React from 'react'
import {useTranslation} from "react-i18next";
import styled from 'styled-components'
import { override } from '@pubsweet/ui-toolkit'
import { CenteredColumn, ErrorText, H1, Button, TextField } from '@pubsweet/ui'

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
  border: 0;
  height: 50%;
  overflow-y: auto;
`

const LanguageSwitcherWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
`

const ResetPassword = props => {
  const {
    hasError,
    hasSuccess,
    loading,
    onSubmit,
    handleInputChange,
    formError,
    mainPasswordError,
    newPassword,
    confirmNewPassword,
    redirectToLogin,
  } = props

  const { t } = useTranslation()

  if (hasSuccess) {
    redirectToLogin()
  }


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

        {/* <H1>Password Reset</H1> */}

        <H1>{t('password_reset')} </H1>

        <div>
          <TextField
            label={t("new_password")}
            name="new_password"
            onChange={event => handleInputChange(event.target.value, true)}
            placeholder={t("enter_your_new_password")}
            type="password"
            value={newPassword}
          />
          {mainPasswordError && <ErrorText>{mainPasswordError}</ErrorText>}
          {/* <TextField
            label="Confirm New Password"
            name="confirm_new_password"
            onChange={event => handleInputChange(event.target.value)}
            placeholder="Confirm your new password"
            type="password"
            value={confirmNewPassword}
          />  */}
          <TextField
              label={t("confirm_new_password")}
              name="confirm_new_password"
              onChange={event => handleInputChange(event.target.value)}
              placeholder={t("confirm_new_password")}
              type="password"
              value={confirmNewPassword}
          />
          {formError && <ErrorText>{formError}</ErrorText>}
          <Button
            disabled={
              loading ||
              formError ||
              hasError ||
              hasSuccess ||
              !newPassword ||
              newPassword.length < 8 ||
              !confirmNewPassword ||
              confirmNewPassword.length < 8
            }
            onClick={onSubmit}
            primary
          >
            {t("submit")}
          </Button>
          {/* {hasError && <ErrorText>Something went wrong</ErrorText>} */}
          {t('something_went_wrong')}
        </div>
      </FormContainer>
    </StyledCenterColumn>
  )
}

export default ResetPassword
