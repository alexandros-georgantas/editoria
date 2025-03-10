import React from 'react'
import { Mutation } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const UPDATE_BOOK_COMPONENT_PAGINATION = gql`
  mutation UpdateBookComponentPagination($input: UpdateBookComponentInput!) {
    updatePagination(input: $input) {
      id
    }
  }
`

const updateBookComponentPaginationMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={UPDATE_BOOK_COMPONENT_PAGINATION}>
      {(updateBookComponentPagination, updateBookComponentPaginationResult) =>
        render({
          updateBookComponentPagination,
          updateBookComponentPaginationResult,
        })
      }
    </Mutation>
  )
}

export default updateBookComponentPaginationMutation
