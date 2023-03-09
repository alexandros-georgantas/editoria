import { gql } from '@apollo/client'

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        defaultIdentity {
          id
          isVerified
        }
      }
      token
    }
  }
`


export default LOGIN
