import React from 'react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const GET_TEMPLATES = gql`
  query GetTemplates($ascending: Boolean = true, $sortKey: String = "name") {
    getTemplates(ascending: $ascending, sortKey: $sortKey) {
      id
      name
      thumbnail {
        id
        name
        url(size: small)
        storedObjects {
          mimetype
        }
      }
      author
      trimSize
      target
      notes
    }
  }
`

const getTemplatesQuery = props => {
  const { render } = props

  return (
    <Query
      fetchPolicy="cache-and-network"
      notifyOnNetworkStatusChange
      query={GET_TEMPLATES}
    >
      {render}
    </Query>
  )
}

export { GET_TEMPLATES }
export default getTemplatesQuery
