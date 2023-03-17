import React from 'react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const GET_TEMPLATE = gql`
  query GetTemplate($id: ID!) {
    getTemplate(id: $id) {
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
      notes
      target
      files {
        id
        name
        url(size: original)
        storedObjects {
          mimetype
          extension
          key
        }
      }
      exportScripts {
        label
        value
      }
    }
  }
`

const getTemplateQuery = props => {
  const { templateId: id, render } = props

  return (
    <Query
      fetchPolicy="network-only"
      notifyOnNetworkStatusChange
      query={GET_TEMPLATE}
      variables={{ id }}
    >
      {render}
    </Query>
  )
}

export { GET_TEMPLATE }
export default getTemplateQuery
