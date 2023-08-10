import React from 'react'
import { Subscription } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const BOOK_COMPONENT_ORDER_UPDATED_SUBSCRIPTION = gql`
  subscription BookComponentOrderUpdated {
    bookComponentOrderUpdated
  }
`

const BOOK_COMPONENT_UPLOADING_UPDATED_SUBSCRIPTION = gql`
  subscription BookComponentUploadingUpdated {
    bookComponentUploadingUpdated
  }
`

const RUNNING_HEADERS_UPDATED_SUBSCRIPTION = gql`
  subscription RunningHeadersUpdated {
    bookRunningHeadersUpdated
  }
`

const BOOK_COMPONENT_ADDED_SUBSCRIPTION = gql`
  subscription BookComponentAdded {
    bookComponentAdded
  }
`

const BOOK_COMPONENT_DELETED_SUBSCRIPTION = gql`
  subscription BookComponentDeleted {
    bookComponentDeleted
  }
`

const BOOK_COMPONENT_PAGINATION_UPDATED_SUBSCRIPTION = gql`
  subscription BookComponentPaginationUpdated {
    bookComponentPaginationUpdated
  }
`

const BOOK_COMPONENT_WORKFLOW_UPDATED_SUBSCRIPTION = gql`
  subscription BookComponentWorkflowUpdated {
    bookComponentWorkflowUpdated
  }
`

const BOOK_COMPONENT_LOCK_UPDATED_SUBSCRIPTION = gql`
  subscription BookComponentLockUpdated {
    bookComponentLockUpdated
  }
`

const BOOK_COMPONENTS_LOCK_UPDATED_SUBSCRIPTION = gql`
  subscription BookComponentsLockUpdated {
    bookComponentsLockUpdated
  }
`

const BOOK_COMPONENT_TITLE_UPDATED_SUBSCRIPTION = gql`
  subscription BookComponentTitleUpdated {
    bookComponentTitleUpdated
  }
`

const TEAM_MEMBERS_UPDATED_SUBSCRIPTION = gql`
  subscription TeamMembersUpdated {
    teamMembersUpdated
  }
`

const METADATA_UPDATED_SUBSCRIPTION = gql`
  subscription BookMetadataUpdated {
    bookMetadataUpdated
  }
`

const bookMetadataSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull

  const triggerRefetch = () => {
    if (pauseUpdates) return
    getBookQuery.refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={METADATA_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const addTeamMemberSubscription = props => {
  const { render, getBookBuilderRulesQuery, statefull } = props
  const { pauseUpdates } = statefull

  const triggerRefetch = () => {
    if (pauseUpdates) return
    getBookBuilderRulesQuery.refetch()
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

const PRODUCTION_EDITORS_UPDATED_SUBSCRIPTION = gql`
  subscription ProductionEditorsUpdated {
    productionEditorsUpdated
  }
`

const orderChangeSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { refetch } = getBookQuery
  const { pauseUpdates } = statefull

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_COMPONENT_ORDER_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const COMPONENT_TYPE_UPDATED_SUBSCRIPTION = gql`
  subscription ComponentTypeUpdated {
    bookComponentTypeUpdated
  }
`

const BOOK_UPDATED_SUBSCRIPTION = gql`
  subscription BookUpdated {
    bookUpdated
  }
`

const bookUpdatedSubscription = props => {
  const { bookId, render, statefull, getBookQuery } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_UPDATED_SUBSCRIPTION}
      variables={{ id: bookId }}
    >
      {render}
    </Subscription>
  )
}

const INCLUDE_IN_TOC_UPDATED_SUBSCRIPTION = gql`
  subscription IncludeInTOCUpdated {
    bookComponentTOCToggled
  }
`

const componentTypeChangeSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={COMPONENT_TYPE_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const bookComponentIncludeInTOCSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={INCLUDE_IN_TOC_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const bookComponentAddedSubscription = props => {
  const { render, getBookQuery, getBookBuilderRulesQuery, statefull } = props
  const { pauseUpdates } = statefull

  const triggerRefetch = () => {
    if (pauseUpdates) return
    getBookQuery.refetch()
    getBookBuilderRulesQuery.refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_COMPONENT_ADDED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const bookComponentDeletedSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_COMPONENT_DELETED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const paginationChangeSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_COMPONENT_PAGINATION_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const workflowChangeSubscription = props => {
  const { render, getBookQuery, getBookBuilderRulesQuery, statefull } = props
  const { pauseUpdates } = statefull

  const triggerRefetch = () => {
    if (pauseUpdates) return
    getBookBuilderRulesQuery.refetch()
    getBookQuery.refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_COMPONENT_WORKFLOW_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const lockChangeSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  // if (!getBookQuery.data) {
  //   return null
  // }
  // const { divisions } = getBookQuery.data.getBook
  // const subscribeToBookComponents = []
  // divisions.forEach(division => {
  //   division.bookComponents.forEach(item => {
  //     subscribeToBookComponents.push(item.id)
  //   })
  // })

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_COMPONENT_LOCK_UPDATED_SUBSCRIPTION}
      // variables={{ bookComponentIds: subscribeToBookComponents }}
    >
      {render}
    </Subscription>
  )
}

const locksChangeSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  // if (!getBookQuery.data) {
  //   return null
  // }
  // const { divisions } = getBookQuery.data.getBook
  // const subscribeToBookComponents = []
  // divisions.forEach(division => {
  //   division.bookComponents.forEach(item => {
  //     subscribeToBookComponents.push(item.id)
  //   })
  // })

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_COMPONENTS_LOCK_UPDATED_SUBSCRIPTION}
      // variables={{ bookComponentIds: subscribeToBookComponents }}
    >
      {render}
    </Subscription>
  )
}

const titleChangeSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_COMPONENT_TITLE_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const teamMembersChangeSubscription = props => {
  const { render, getBookTeamsQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookTeamsQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
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

const productionEditorChangeSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={PRODUCTION_EDITORS_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const BOOK_RENAMED_SUBSCRIPTION = gql`
  subscription BookRenamed {
    bookRenamed
  }
`

const bookRenamedSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
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

const runningHeadersUpdatedSubscription = props => {
  const { render, getBookQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={RUNNING_HEADERS_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

const uploadingUpdatedSubscription = props => {
  const { render, getBookQuery, getBookBuilderRulesQuery, statefull } = props
  const { pauseUpdates } = statefull
  const { refetch } = getBookQuery

  const triggerRefetch = () => {
    if (pauseUpdates) return
    getBookBuilderRulesQuery.refetch()
    refetch()
  }

  return (
    <Subscription
      onSubscriptionData={triggerRefetch}
      subscription={BOOK_COMPONENT_UPLOADING_UPDATED_SUBSCRIPTION}
    >
      {render}
    </Subscription>
  )
}

export {
  orderChangeSubscription,
  bookComponentAddedSubscription,
  bookComponentDeletedSubscription,
  paginationChangeSubscription,
  workflowChangeSubscription,
  lockChangeSubscription,
  locksChangeSubscription,
  titleChangeSubscription,
  teamMembersChangeSubscription,
  productionEditorChangeSubscription,
  bookRenamedSubscription,
  componentTypeChangeSubscription,
  addTeamMemberSubscription,
  bookMetadataSubscription,
  bookComponentIncludeInTOCSubscription,
  runningHeadersUpdatedSubscription,
  uploadingUpdatedSubscription,
  bookUpdatedSubscription,
}
