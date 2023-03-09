import React from 'react'
import { Mutation } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const UPDATE_GLOBAL_TEAM = gql`
  mutation updateGlobalTeam($teamId: ID!, $members: [ID!]!) {
    updateKetidaTeamMembers(teamId: $teamId, members: $members) {
      id
      role
      displayName
      members {
        id
        user {
          id
          username
          defaultIdentity {
            email
          }
          admin
        }
      }
      global
    }
  }
`

const globalTeamMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={UPDATE_GLOBAL_TEAM}>
      {(updateKetidaTeamMembers, updateKetidaTeamMembersResult) =>
        render({ updateKetidaTeamMembers, updateKetidaTeamMembersResult })
      }
    </Mutation>
  )
}

export default globalTeamMutation
