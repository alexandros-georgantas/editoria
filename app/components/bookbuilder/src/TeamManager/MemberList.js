/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import Member from './Member'

const MemberListContainer = styled.ul`
  list-style-type: none;
  margin: calc(2 * ${th('gridUnit')}) 0 calc(2 * ${th('gridUnit')}) 0;
  padding: 0 calc(2 * ${th('gridUnit')}) 0 calc(2 * ${th('gridUnit')});
`

export class MemberList extends React.Component {
  render() {
    const { members, color, team, update, rules } = this.props
    const list = members.map(member => (
      <Member
        color={color}
        key={member.id}
        rules={rules}
        team={team}
        update={update}
        user={member.user}
        users={[]}
      />
    ))

    return <MemberListContainer>{list}</MemberListContainer>
  }
}

MemberList.propTypes = {}

export default MemberList
