import React from 'react'
import { Mutation } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const CREATE_BOOK = gql`
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      id
      title
    }
  }
`

const createBookMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={CREATE_BOOK}>
      {(createBook, createBookResult) =>
        render({ createBook, createBookResult })
      }
    </Mutation>
  )
}

export default createBookMutation
