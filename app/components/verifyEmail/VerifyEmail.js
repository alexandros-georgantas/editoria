import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button, Loading } from '../../ui'

const Wrapper = styled.div``

const VerifyEmail = props => {
  const {
    className,
    verifying,
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

  if (verifying)
    return (
      <Wrapper className={className}>
        <div>Verifying your email address...</div>
      </Wrapper>
    )

  if (successfullyVerified) {
    redirect()

    return (
      <Wrapper className={className}>
        <div>Email successfully verified!</div>
      </Wrapper>
    )
  }

  if (alreadyVerified) {
    redirect()

    return (
      <Wrapper className={className}>
        <div>This email has already been verified!</div>
      </Wrapper>
    )
  }

  if (expired && !(resending || resent))
    return (
      <Wrapper className={className}>
        <div>
          {' '}
          <Button onClick={resend} type="primary">
            Resend verification email
          </Button>
          <div>Your verification token has expired!</div>
        </div>
      </Wrapper>
    )

  if (resending)
    return (
      <Wrapper className={className}>
        <div>Sending verification email...</div>
      </Wrapper>
    )

  if (resent)
    return (
      <Wrapper className={className}>
        <div>New verification email has been sent!</div>
      </Wrapper>
    )

  // if (hasError)
  return (
    <Wrapper className={className}>
      <div>Something went wrong!</div>
    </Wrapper>
  )

  // return null
}

VerifyEmail.propTypes = {
  verifying: PropTypes.bool,
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
  successfullyVerified: false,
  alreadyVerified: false,
  expired: false,
  resending: false,
  resent: false,
  redirectDelay: 3000,
}

export default VerifyEmail
