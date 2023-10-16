/* eslint-disable react/prop-types */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { useTranslation } from 'react-i18next'
import InfoModal from '../../../../../common/src/InfoModal'

const Text = styled.div`
  color: #404040;
  font-family: 'Fira Sans Condensed';
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  text-align: center;
  width: 100%;
`

const WarningModal = props => {
  const { isOpen, hideModal, data } = props
  const { onConfirm, warning } = data

  const { t } = useTranslation()
  return (
    <InfoModal
      headerText={t('Warning')}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onRequestClose={hideModal}
    >
      <Text>{`${t(warning)}`}</Text>
    </InfoModal>
  )
}

export default WarningModal
