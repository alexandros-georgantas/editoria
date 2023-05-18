/* eslint-disable react/prop-types */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

const GET_SYSTEM_INFO = gql`
  query systeminfo {
    systemInfo{
      name
      version
      description
      healthcheck {
        name
        message
        url
        uptime
        timestamp
        status
      }
    }
  }
`

const getSystemInfoQuery = props => {
  const { render } = props
  return (
      <Query fetchPolicy="cache-and-network" query={GET_SYSTEM_INFO}>
        {render}
      </Query>
  )
}

export default getSystemInfoQuery
