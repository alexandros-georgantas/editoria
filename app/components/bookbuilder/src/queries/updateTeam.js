import React from 'react'
import { Mutation } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const UPDATE_BOOK_TEAM = gql`
  mutation UpdateBookTeam($teamId: ID!, $members: [ID!]!) {
    updateKetidaTeamMembers(teamId: $teamId, members: $members) {
      id
      role
      displayName
      objectId
      objectType
      members {
        id
        user {
          id
          username
          admin
          defaultIdentity {
            email
          }
        }
      }
      global
    }
  }
`

const updateBookTeamMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={UPDATE_BOOK_TEAM}>
      {(updateKetidaTeamMembers, updateKetidaTeamMembersResult) =>
        render({
          updateKetidaTeamMembers,
          updateKetidaTeamMembersResult,
        })
      }
    </Mutation>
  )
}

export default updateBookTeamMutation
