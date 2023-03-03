import React from 'react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const GET_BOOK_TEAMS = gql`
  query GetBookTeams($objectId: ID!, $objectType: String! = "book") {
    getObjectTeams(objectId: $objectId, objectType: $objectType) {
      result {
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
            surname
            givenNames
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

const getBookTeamsQuery = props => {
  const { bookId, render } = props

  return (
    <Query
      fetchPolicy="network-only"
      notifyOnNetworkStatusChange
      query={GET_BOOK_TEAMS}
      variables={{ objectId: bookId }}
    >
      {render}
    </Query>
  )
}

export { GET_BOOK_TEAMS }
export default getBookTeamsQuery
