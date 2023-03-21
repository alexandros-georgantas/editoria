import { gql } from '@apollo/client'

const LOGIN = gql`
  mutation KetidaLogin($input: LoginInput!) {
    ketidaLogin(input: $input) {
      user {
        id
        defaultIdentity {
          id
          isVerified
        }
      }
      token
      code
    }
  }
`

export default LOGIN
