import React from 'react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'
const GET_SYSTEM_INFO = gql`
  query systeminfo {
    systemInfo{
      name
      version
      description
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

// export { GET_SYSTEM_INFO }
export default getSystemInfoQuery
