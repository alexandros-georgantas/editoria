/* eslint-disable react/prop-types */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import {useTranslation} from "react-i18next";
import DialogModal from '../../../../../common/src/DialogModal'

const Text = styled.div`
  color: #404040;
  font-family: 'Fira Sans Condensed';
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  text-align: center;
  width: 100%;
`

const WorkflowModal = props => {
  const { isOpen, hideModal, data } = props
  const { onConfirm, textKey } = data
  const {t}= useTranslation()

  /*
  const bodyMsg = {
    'cp-no':
      'Copy Editors won’t be able to edit this chapter after updating this workflow status.',
    'cp-yes':
      ' Copy Editors will be able to edit this chapter after updating this workflow status.',
    'author-no':
      'Authors won’t be able to edit this chapter after updating this workflow status.',
    'author-yes':
      'Authors will be able to edit this chapter after updating this workflow status.',
    'cp-no-author-no':
      'Copy Editors and Authors won’t be able to edit this chapter after updating this workflow status.',
    'cp-no-author-yes':
      'Copy Editors won’t be able to edit but Authors will be able to edit this chapter after updating this workflow status.',
    'cp-yes-author-no':
      'Copy Editors will be able to edit but Authors won’t be able to edit this chapter after updating this workflow status.',
  }
  */
  const bodyMsg = {
    'cp-no':
        t('copy_editors_won’t_be_able_to_edit_this_chapter_after_updating_this_workflow_status.'),
    'cp-yes':
        t('copy_editors_will_be_able_to_edit_this_chapter_after_updating_this_workflow_status.'),
    'author-no':
        t('authors_won’t_be_able_to_edit_this_chapter_after_updating_this_workflow_status.'),
    'author-yes':
        t('authors_will_be_able_to_edit_this_chapter_after_updating_this_workflow_status.'),
    'cp-no-author-no':
        t('copy_editors_and_authors_won’t_be_able_to_edit_this_chapter_after_updating_this_workflow_status.'),
    'cp-no-author-yes':
        t('copy_editors_won’t_be_able_to_edit_but_authors_will_be_able_to_edit_this_chapter_after_updating_this_workflow_status.'),
    'cp-yes-author-no':
        t('copy_editors_will_be_able_to_edit_but_authors_won’t_be_able_to_edit_this_chapter_after_updating_this_workflow_status.'),
  }

  return (
    <DialogModal
      buttonLabel={t("yes")}
      headerText={t("change_of_workflow_status")}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onRequestClose={hideModal}
    >
      <Text>
        {bodyMsg[textKey]}
        <br />
        {t("are_you_sure_you_wish_to_continue?")}
      </Text>
    </DialogModal>
  )
}

export default WorkflowModal
