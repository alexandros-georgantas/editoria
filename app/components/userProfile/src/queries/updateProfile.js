/* eslint-disable react/prop-types */
import React from 'react'
import { Mutation } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      admin
    }
  }
`

const GET_CURRENT_USER_PROFILE = gql`
  query CurrentUser {
    currentUser {
      id
      givenNames
      surname
      username
    }
  }
`

const UPDATE_PERSONAL_INFORMATION = gql`
  mutation UpdatePersonalInformation($id: ID!, $input: UpdateInput!) {
    updateUser(id: $id, input: $input) {
      surname
      givenNames
    }
  }
`

// const UPDATE_USERNAME = gql`
//   mutation UpdateUsername($input: UpdateUsernameInput!) {
//     updateUsername(input: $input) {
//       id
//     }
//   }
// `

const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input)
  }
`

const UpdatePersonalInformationMutation = props => {
  const { render } = props

  const refetchQueries = [
    { query: CURRENT_USER },
    { query: GET_CURRENT_USER_PROFILE },
  ]

  return (
    <Mutation
      mutation={UPDATE_PERSONAL_INFORMATION}
      refetchQueries={refetchQueries}
    >
      {(updateUser, updateUserResponse) =>
        render({ updateUser, updateUserResponse })
      }
    </Mutation>
  )
}

const UpdatePasswordMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={UPDATE_PASSWORD}>
      {(updatePassword, updatePasswordResponse) =>
        render({ updatePassword, updatePasswordResponse })
      }
    </Mutation>
  )
}

export { UpdatePasswordMutation, UpdatePersonalInformationMutation }
