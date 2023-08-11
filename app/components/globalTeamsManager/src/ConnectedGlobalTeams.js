/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import get from 'lodash/get'
import { adopt } from 'react-adopt'
import { Loading } from '../../../ui'
import withModal from '../../common/src/withModal'

import GlobalTeamsManager from './GlobalTeamsManager'
import {
  getUsersTeamsQuery,
  globalTeamMutation,
  addTeamMemberSubscription,
} from './queries'

const mapper = {
  getUsersTeamsQuery,
  globalTeamMutation,
  addTeamMemberSubscription,
  withModal,
}

const mapProps = args => ({
  users: get(args.getUsersTeamsQuery, 'data.users.result'),
  teams: get(args.getUsersTeamsQuery, 'data.getGlobalTeams.result'),
  loading: args.getUsersTeamsQuery.loading,
  refetching:
    args.getUsersTeamsQuery.networkStatus === 4 ||
    args.getUsersTeamsQuery.networkStatus === 2, // possible apollo bug
  updateGlobalTeam: args.globalTeamMutation.updateKetidaTeamMembers,
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
  const { currentUser, history } = props

  return (
    <Composed>
      {({ users, teams, updateGlobalTeam, loading, onWarning }) => {
        if (!currentUser || loading) return <Loading />

        if (!currentUser.admin) {
          history.push('/')
          onWarning()
        }

        return (
          <GlobalTeamsManager
            loading={loading}
            teams={teams}
            updateGlobalTeam={updateGlobalTeam}
            users={users}
          />
        )
      }}
    </Composed>
  )
}

export default withRouter(Connected)
