import React from 'react'
import PropTypes from 'prop-types'

import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      admin
      isGlobal
      givenNames
      surname
      isActive
      defaultIdentity {
        isVerified
      }
      teams {
        id
        role
        objectId
        global
      }
    }
  }
`

const CurrentUserQuery = props => {
  const { render } = props
  return (
    <Query fetchPolicy="network-only" pollInterval={5000} query={CURRENT_USER}>
      {render}
    </Query>
  )
}

CurrentUserQuery.propTypes = {
  render: PropTypes.any, // eslint-disable-line
}

export default CurrentUserQuery
