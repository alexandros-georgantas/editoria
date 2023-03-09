import React from 'react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const GET_USERS_TEAMS = gql`
  query GetUsersTeams {
    users {
      result {
        id
        username
        defaultIdentity {
          email
        }
        admin
      }
    }

    getGlobalTeams {
      result {
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
  }
`

const getUsersTeamsQuery = props => {
  const { render } = props
  return (
    <Query fetchPolicy="cache-and-network" query={GET_USERS_TEAMS}>
      {render}
    </Query>
  )
}

export { GET_USERS_TEAMS }
export default getUsersTeamsQuery
