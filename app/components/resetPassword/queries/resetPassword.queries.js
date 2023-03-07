import { gql } from '@apollo/client'

const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`

export default RESET_PASSWORD
