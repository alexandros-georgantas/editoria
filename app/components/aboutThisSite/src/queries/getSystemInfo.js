import React from 'react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const GET_SYSTEM_INFO = gql`
  query systeminfo {
    systemInfo {
      version
      healthcheck {
        displayName
        healthcheckURL
        isWorking
      }
    }
  }
`

const getSystemInfoQuery = props => {
  const { render } = props
  return (
    <Query
      fetchPolicy="cache-and-network"
      pollInterval={5000}
      query={GET_SYSTEM_INFO}
    >
      {render}
    </Query>
  )
}

export default getSystemInfoQuery
