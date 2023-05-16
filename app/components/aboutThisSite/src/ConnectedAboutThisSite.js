/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import get from 'lodash/get'
import { adopt } from 'react-adopt'
import { Loading } from '../../../ui'

import AboutThisSite from './AboutThisSite'
import {
  getSystemInfoQuery
} from './queries'

const mapper = {
  getSystemInfoQuery
}

const mapProps = args => ({
  systemInfo: get(args.getSystemInfoQuery,'data.systemInfo'),
  loading: get(args.getSystemInfoQuery.loading),
  refetching:
    args.getSystemInfoQuery .networkStatus === 4 ||
    args.getSystemInfoQuery.networkStatus === 2,
  onWarning: () => {
    const { withModal: withModalFromArgs } = args
    const { showModal, hideModal } = withModalFromArgs
    showModal('warningModal', {
      onConfirm: hideModal,
      warning: `You don't have permissions to view this page`,
    })
  },
})

const Composed = adopt(mapper, mapProps)

const Connected = props => {
  const { currentUser } = props
  return (
    <Composed>
      {({ systemInfo, loading}) => {
        if (!currentUser || loading) return <Loading />
        return (
          <AboutThisSite
            systemInfo={systemInfo}
          />
        )
      }}
    </Composed>
  )
}

export default withRouter(Connected)
