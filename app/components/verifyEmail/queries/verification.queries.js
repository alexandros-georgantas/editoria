import { gql } from '@apollo/client'

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`

export const RESEND_VERIFICATION_EMAIL = gql`
  mutation ResendVerificationEmail($token: String!) {
    resendVerificationEmail(token: $token)
  }
`
export const RESEND_VERIFICATION_EMAIL_AFTER_LOGIN = gql`
  mutation ResendVerificationEmailAfterLogin {
    resendVerificationEmailAfterLogin
  }
`
