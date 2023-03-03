/* eslint-disable */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

import GroupList from './GroupList'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Fira Sans Condensed';
  height: 100%;
  justify-content: space-between;
`
export class TeamManager extends React.Component {
  render() {
    const { teams, searchForUsers, updateTeam, rules, canViewAddTeamMember } =
      this.props

    return (
      <Wrapper>
        <GroupList
          teams={teams}
          rules={rules}
          canViewAddTeamMember={canViewAddTeamMember}
          update={updateTeam}
          searchForUsers={searchForUsers}
        />
      </Wrapper>
    )
  }
}

TeamManager.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      displayName: PropTypes.string,
      type: PropTypes.string,
      role: PropTypes.string,
    }),
  ).isRequired,
  updateTeam: PropTypes.func.isRequired,
}

TeamManager.defaultProps = {
  users: null,
}

export default TeamManager
