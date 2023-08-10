import { gql } from '@apollo/client'

const featureBookStructureEnabled =
  (process.env.FEATURE_BOOK_STRUCTURE &&
    JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
  false

const BOOK_UPDATED_SUBSCRIPTION = gql`
  subscription BookUpdated($id: ID!) {
    bookUpdated(id: $id)
  }
`

const BOOK_COMPONENT_UPDATED_SUBSCRIPTION = !featureBookStructureEnabled
  ? gql`
      subscription BookComponentUpdated($id: ID!) {
        bookComponentUpdated(id: $id)
      }
    `
  : gql`
      subscription BookComponentUpdated($id: ID!) {
        bookComponentUpdated(id: $id)
      }
    `

const CUSTOM_TAGS_UPDATED_SUBSCRIPTION = gql`
  subscription CustomTagsUpdated {
    customTagsUpdated {
      id
    }
  }
`

// const TEAM_MEMBERS_UPDATED_SUBSCRIPTION = gql`
//   subscription TeamMembersUpdated {
//     teamMembersUpdated {
//       objectId
//     }
//   }
// `

// const teamMembersChangeSubscription = props => {
//   const { render, getWaxRulesQuery, bookId } = props
//   const { refetch } = getWaxRulesQuery

//   const triggerRefetch = res => {
//     const { subscriptionData } = res
//     const { data } = subscriptionData
//     const { teamMembersUpdated } = data
//     const { objectId: bId } = teamMembersUpdated

//     if (bookId === bId || bId === null) {
//       refetch()
//     }
//   }

//   return (
//     <Subscription
//       onSubscriptionData={triggerRefetch}
//       subscription={TEAM_MEMBERS_UPDATED_SUBSCRIPTION}
//     >
//       {render}
//     </Subscription>
//   )
// }

export {
  BOOK_UPDATED_SUBSCRIPTION,
  BOOK_COMPONENT_UPDATED_SUBSCRIPTION,
  CUSTOM_TAGS_UPDATED_SUBSCRIPTION,
  // TEAM_MEMBERS_UPDATED_SUBSCRIPTION,
}
