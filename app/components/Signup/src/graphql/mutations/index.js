import { gql } from '@apollo/client'

const SIGNUP_USER = gql`
  mutation ($input: SignUpInput!) {
    signUp(input: $input)
  }
`

export default SIGNUP_USER
