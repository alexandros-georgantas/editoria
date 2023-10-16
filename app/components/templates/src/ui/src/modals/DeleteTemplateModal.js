/* eslint-disable react/prop-types */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react'
import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import { useTranslation } from 'react-i18next'
import DialogModal from '../../../../../common/src/DialogModal'

const Text = styled.div`
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  margin-bottom: ${grid(3)};
  text-align: center;
  width: 100%;
`

const DeleteBookModal = props => {
  const { t } = useTranslation()
  const { isOpen, hideModal, data } = props
  const { templateName, onConfirm } = data

  return (
    <DialogModal
      buttonLabel="Yes"
      headerText={t('Delete Template')}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onRequestClose={hideModal}
    >
      <Text>
        {`${t(
          'are_you_sure_you_want_to_delete_the_template_with_name {templateName}?',
          { templateName },
        )}`}
      </Text>
    </DialogModal>
  )
}

export default DeleteBookModal
