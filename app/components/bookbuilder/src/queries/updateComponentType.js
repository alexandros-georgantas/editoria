import React from 'react'
import { Mutation } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const UPDATE_BOOK_COMPONENT_TYPE = gql`
  mutation UpdateBookComponentType($input: UpdateBookComponentInput!) {
    updateComponentType(input: $input) {
      id
    }
  }
`

const updateBookComponentTypeMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={UPDATE_BOOK_COMPONENT_TYPE}>
      {(updateComponentType, updateComponentTypeResult) =>
        render({ updateComponentType, updateComponentTypeResult })
      }
    </Mutation>
  )
}

export default updateBookComponentTypeMutation
