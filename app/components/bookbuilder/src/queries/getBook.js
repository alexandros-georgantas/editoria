import React from 'react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const featureBookStructureEnabled =
  (process.env.FEATURE_BOOK_STRUCTURE &&
    JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
  false

const GET_BOOK = featureBookStructureEnabled
  ? gql`
      query GetBook($id: ID!) {
        getBook(id: $id) {
          id
          title
          productionEditors
          publicationDate
          edition
          copyrightStatement
          copyrightYear
          copyrightHolder
          isbn
          issn
          issnL
          bookStructure {
            id
            finalized
            levels {
              id
              type
              displayName
            }
          }
          license
          divisions {
            id
            label
            bookComponents {
              id
              divisionId
              title
              bookId
              includeInToc
              runningHeadersLeft
              runningHeadersRight
              # hasContent
              componentTypeOrder
              pagination {
                left
                right
              }
              workflowStages {
                label
                type
                value
              }
              lock {
                id
                userId
                username
                created
                givenNames
                isAdmin
                surname
              }
              componentType
              uploading
              archived
            }
          }
        }
      }
    `
  : gql`
      query GetBook($id: ID!) {
        getBook(id: $id) {
          id
          title
          productionEditors
          publicationDate
          edition
          copyrightStatement
          copyrightYear
          copyrightHolder
          isbn
          issn
          issnL
          license
          divisions {
            id
            label
            bookComponents {
              id
              divisionId
              title
              bookId
              includeInToc
              runningHeadersLeft
              runningHeadersRight
              # hasContent
              componentTypeOrder
              pagination {
                left
                right
              }
              workflowStages {
                label
                type
                value
              }
              lock {
                id
                userId
                username
                created
                givenNames
                isAdmin
                surname
              }
              componentType
              uploading
              archived
            }
          }
        }
      }
    `

const getBookQuery = props => {
  const { bookId: id, render } = props

  return (
    <Query
      fetchPolicy="network-only"
      pollInterval={2000}
      query={GET_BOOK}
      variables={{ id }}
    >
      {render}
    </Query>
  )
}

export { GET_BOOK }
export default getBookQuery
