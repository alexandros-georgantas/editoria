/* eslint-disable react/prop-types */
import React from 'react'

import { withTranslation } from 'react-i18next'
import CustomModal from '../../../common/src/CustomModal'
import ModalFooterDialog from '../../../common/src/ModalFooterDialog'
import TM from './TeamManager'
import { Loading } from '../../../../ui'

const Footer = (
  <ModalFooterDialog showConfirmButton={false} textCancel="Close" />
)

class TeamManagerModal extends React.Component {
  renderBody() {
    const { teams, searchForUsers, updateTeam, rules, canViewAddTeamMember } =
      this.props

    return (
      <TM
        canViewAddTeamMember={canViewAddTeamMember}
        rules={rules}
        searchForUsers={searchForUsers}
        teams={teams}
        updateTeam={updateTeam}
      />
    )
  }

  render() {
    const { isOpen, hideModal, loading, loadingRules, teams, t } = this.props
    if (loading || loadingRules || !teams) return <Loading />
    const body = this.renderBody()

    return (
      <CustomModal
        footerComponent={Footer}
        headerText={t("Book's Team Manager")}
        isOpen={isOpen}
        onRequestClose={hideModal}
        shouldCloseOnOverlayClick={false}
        size="medium"
      >
        {body}
      </CustomModal>
    )
  }
}

// export default TeamManagerModal

export default withTranslation()(TeamManagerModal)
