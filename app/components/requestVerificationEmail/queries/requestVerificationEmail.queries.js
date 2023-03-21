import { gql } from '@apollo/client'

const REQUEST_VERIFICATION_EMAIL = gql`
  mutation KetidaRequestVerificationEmail($email: String!) {
    ketidaRequestVerificationEmail(email: $email)
  }
`

export default REQUEST_VERIFICATION_EMAIL
