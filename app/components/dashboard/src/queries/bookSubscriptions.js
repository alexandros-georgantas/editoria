import React from 'react'
import { Subscription } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const BOOK_CREATED_SUBSCRIPTION = gql`
  subscription BookCreated {
    bookCreated
  }
`

const BOOK_ARCHIVED_SUBSCRIPTION = gql`
  subscription BookArchived {
    bookArchived
  }
`

const BOOK_RENAMED_SUBSCRIPTION = gql`
  subscription BookRenamed {
    bookRenamed
  }
`

const BOOK_DELETED_SUBSCRIPTION = gql`
  subscription BookDeleted {
    bookDeleted
  }
`

const bookCreatedSubscription = props => {
  const { render, getBookCollectionsQuery, getDashboardRulesQuery } = props

  const triggerRefetch = () => {
    getBookCollectionsQuery.refetch()
    getDashboardRulesQuery.refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_CREATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const bookArchivedSubscription = props => {
  const { render, getBookCollectionsQuery } = props
  const { refetch } = getBookCollectionsQuery

  const triggerRefetch = () => {
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_ARCHIVED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const bookRenamedSubscription = props => {
  const { render, getBookCollectionsQuery } = props
  const { refetch } = getBookCollectionsQuery

  const triggerRefetch = () => {
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_RENAMED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const bookDeletedSubscription = props => {
  const { render, getBookCollectionsQuery } = props
  const { refetch } = getBookCollectionsQuery

  const triggerRefetch = () => {
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_DELETED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const TEAM_MEMBERS_UPDATED_SUBSCRIPTION = gql`
  subscription TeamMembersUpdated {
    teamMembersUpdated
  }
`

const addTeamMemberSubscription = props => {
  const { render, getDashboardRulesQuery, getBookCollectionsQuery } = props

  const triggerRefetch = () => {
    getBookCollectionsQuery.refetch()
    getDashboardRulesQuery.refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={TEAM_MEMBERS_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

export {
  bookCreatedSubscription,
  bookArchivedSubscription,
  bookRenamedSubscription,
  bookDeletedSubscription,
  addTeamMemberSubscription,
}
