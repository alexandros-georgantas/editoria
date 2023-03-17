import { gql } from '@apollo/client'

const GET_SPECIFIC_FILES = gql`
  query GetSpecificFilesQuery($ids: [ID!]!) {
    getSpecificFiles(ids: $ids) {
      id
      alt
      url(size: medium)
      # storedObjects {
      #   mimetype
      # }
    }
  }
`

export default GET_SPECIFIC_FILES
