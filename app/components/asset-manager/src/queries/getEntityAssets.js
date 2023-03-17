import React from 'react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const GET_ENTITY_FILES = gql`
  query GetEntityFilesQuery($input: EntityFilesInput) {
    getEntityFiles(input: $input) {
      id
      name
      url(size: small)
      storedObjects {
        mimetype
        size
        imageMetadata {
          width
          height
          space
          density
        }
      }
      updated
    }
  }
`

const getEntityFilesQuery = props => {
  const { entityId, render } = props

  return (
    <Query
      fetchPolicy="cache-and-network"
      notifyOnNetworkStatusChange
      query={GET_ENTITY_FILES}
      variables={{
        input: {
          entityId,
          sortingParams: [
            { key: 'name', order: 'asc' },
            { key: 'updated', order: 'asc' },
          ],
          includeInUse: true,
        },
      }}
    >
      {render}
    </Query>
  )
}

export { GET_ENTITY_FILES }
export default getEntityFilesQuery
