import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { override } from '@pubsweet/ui-toolkit'
import { CenteredColumn, ErrorText, Button } from '@pubsweet/ui'
import { useTranslation } from 'react-i18next'

/* stylelint-disable order/properties-alphabetical-order */
const Logo = styled.div`
  ${override('Login.Logo')};
  margin: 0;
  width: 100%;
  height: auto;
`
/* stylelint-enable order/properties-alphabetical-order */

Logo.displayName = 'Ketida'

const StyledCenterColumn = styled(CenteredColumn)`
  height: 100%;
`

/* stylelint-disable order/properties-alphabetical-order */

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const VerifyEmail = props => {
  const {
    className,
    verifying,
    hasError,
    successfullyVerified,
    alreadyVerified,
    expired,
    resend,
    resending,
    resent,
    redirectToLogin,
    redirectDelay,
  } = props

  const redirect = () =>
    setTimeout(() => {
      redirectToLogin()
    }, redirectDelay)

  if (successfullyVerified || alreadyVerified) {
    redirect()
  }

  const { i18n } = useTranslation()

  return (
    <StyledCenterColumn>
      <Logo>
        <img alt="ketida-logo" src="/ketida.svg" />
      </Logo>

      {verifying && (
        <Wrapper className={className}>
          {/* <div>Verifying your email address...</div> */}
          <div>
            {i18n.t(
              'Verifying your email address...'
                .toLowerCase()
                .replace(/ /g, '_'),
            )}
          </div>
        </Wrapper>
      )}
      {successfullyVerified && (
        <Wrapper className={className}>
          {/* <div>Email successfully verified!</div> */}
          <div>
            {i18n.t(
              'Email successfully verified!'.toLowerCase().replace(/ /g, '_'),
            )}
          </div>
        </Wrapper>
      )}
      {alreadyVerified && (
        <Wrapper className={className}>
          {/* <div>This email has already been verified!</div> */}
          <div>
            {i18n.t(
              'This email has already been verified!'
                .toLowerCase()
                .replace(/ /g, '_'),
            )}
          </div>
        </Wrapper>
      )}
      {expired && !(resending || resent) && (
        <Wrapper className={className}>
          <div>
            {' '}
            {/* <Button onClick={resend} type="primary">
              Resend verification email
            </Button> */}
            <Button onClick={resend} type="primary">
              {i18n.t(
                'Resend verification email'.toLowerCase().replace(/ /g, '_'),
              )}
            </Button>
            {/* <div>Your verification token has expired!</div> */}
            <div>
              {i18n.t(
                'Your verification token has expired!'
                  .toLowerCase()
                  .replace(/ /g, '_'),
              )}
            </div>
          </div>
        </Wrapper>
      )}
      {resending && (
        <Wrapper className={className}>
          {/* <div>Sending verification email...</div> */}
          <div>
            {i18n.t(
              'Sending verification email...'.toLowerCase().replace(/ /g, '_'),
            )}
          </div>
        </Wrapper>
      )}
      {resent && (
        <Wrapper className={className}>
          {/* <div>New verification email has been sent!</div> */}
          <div>
            {i18n.t(
              'New verification email has been sent!'
                .toLowerCase()
                .replace(/ /g, '_'),
            )}
          </div>
        </Wrapper>
      )}
      {hasError && (
        <Wrapper className={className}>
          {/* <ErrorText>Something went wrong!</ErrorText> */}
          <ErrorText>
            {i18n.t('Something went wrong!'.toLowerCase().replace(/ /g, '_'))}
          </ErrorText>
        </Wrapper>
      )}
    </StyledCenterColumn>
  )
}

VerifyEmail.propTypes = {
  verifying: PropTypes.bool,
  hasError: PropTypes.bool,
  successfullyVerified: PropTypes.bool,
  alreadyVerified: PropTypes.bool,
  expired: PropTypes.bool,
  resend: PropTypes.func.isRequired,
  resending: PropTypes.bool,
  resent: PropTypes.bool,
  redirectToLogin: PropTypes.func.isRequired,
  redirectDelay: PropTypes.number,
}

VerifyEmail.defaultProps = {
  verifying: false,
  hasError: false,
  successfullyVerified: false,
  alreadyVerified: false,
  expired: false,
  resending: false,
  resent: false,
  redirectDelay: 3000,
}

export default VerifyEmail
