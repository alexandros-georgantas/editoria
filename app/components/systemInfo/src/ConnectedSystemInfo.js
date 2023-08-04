import React from 'react'
import { withRouter } from 'react-router-dom'
import get from 'lodash/get'
import { adopt } from 'react-adopt'
import { Loading } from '../../../ui'
import SystemInfo from './SystemInfo'
import getSystemInfoQuery from './queries/getSystemInfo'

const mapper = {
  getSystemInfoQuery,
}

const mapProps = args => ({
  systemInfo: get(args.getSystemInfoQuery, 'data.systemInfo'),
  loading: get(args.getSystemInfoQuery.loading),
  refetching:
    args.getSystemInfoQuery.networkStatus === 4 ||
    args.getSystemInfoQuery.networkStatus === 2,
})

const Composed = adopt(mapper, mapProps)

const Connected = () => {
  return (
    <Composed>
      {({ systemInfo, loading }) => {
        if (loading) return <Loading />
        return <SystemInfo systemInfo={systemInfo} />
      }}
    </Composed>
  )
}

export default withRouter(Connected)
