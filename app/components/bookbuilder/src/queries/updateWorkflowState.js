import React from 'react'
import { Mutation } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const UPDATE_BOOK_COMPONENT_WORKFLOW_STATE = gql`
  mutation UpdateBookComponentWorkflowState($input: UpdateBookComponentInput!) {
    updateWorkflowState(input: $input) {
      id
    }
  }
`

const updateBookComponentWorkflowStateMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={UPDATE_BOOK_COMPONENT_WORKFLOW_STATE}>
      {(
        updateBookComponentWorkflowState,
        updateBookComponentWorkflowStateResult,
      ) =>
        render({
          updateBookComponentWorkflowState,
          updateBookComponentWorkflowStateResult,
        })
      }
    </Mutation>
  )
}

export default updateBookComponentWorkflowStateMutation
