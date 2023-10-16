/* eslint-disable react/prop-types */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

import { useTranslation } from 'react-i18next'
import DialogModal from '../../../../../common/src/DialogModal'

const Text = styled.div`
  color: #404040;
  font-family: 'Fira Sans Condensed';
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  text-align: center;
  width: 100%;
`

const UnlockModal = props => {
  const { isOpen, hideModal, data } = props
  const { componentType, title, onConfirm } = data
  const { t } = useTranslation()
  const component = { componentType, title }
  return (
    <DialogModal
      buttonLabel="Yes"
      headerText={`${t('Unlock')} ${t(componentType)}`}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onRequestClose={hideModal}
    >
      {/*
      <Text>
        {`Are you sure you want to unlock this ${componentType} with title ${
          title || 'Untitled'
        }?`}
      </Text>
      */}
      <Text>
        {t('are_you_sure_you_want_to_unlock_this{component}', component)}
      </Text>
    </DialogModal>
  )
}

export default UnlockModal
