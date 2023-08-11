import React from 'react'
import { Subscription } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const TEMPLATE_CREATED_SUBSCRIPTION = gql`
  subscription TemplateCreated {
    templateCreated
  }
`

const TEMPLATE_UPDATED_SUBSCRIPTION = gql`
  subscription TemplateUpdated {
    templateUpdated
  }
`

const TEMPLATE_DELETED_SUBSCRIPTION = gql`
  subscription TemplateDeleted {
    templateDeleted
  }
`

const templateCreatedSubscription = props => {
  const { render, getTemplatesQuery } = props
  const { refetch } = getTemplatesQuery

  const triggerRefetch = () => {
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={TEMPLATE_CREATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const templateUpdatedSubscription = props => {
  const { render, getTemplatesQuery } = props
  const { refetch } = getTemplatesQuery

  const triggerRefetch = () => {
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={TEMPLATE_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const templateDeletedSubscription = props => {
  const { render, getTemplatesQuery } = props
  const { refetch } = getTemplatesQuery

  const triggerRefetch = () => {
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={TEMPLATE_DELETED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

export {
  templateCreatedSubscription,
  templateUpdatedSubscription,
  templateDeletedSubscription,
}
