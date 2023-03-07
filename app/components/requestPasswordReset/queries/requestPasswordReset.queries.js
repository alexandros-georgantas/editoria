import { gql } from '@apollo/client'

const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    sendPasswordResetEmail(email: $email)
  }
`

export default REQUEST_PASSWORD_RESET
