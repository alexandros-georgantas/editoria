/* eslint-disable react/prop-types */
import React from 'react'

import {useTranslation} from "react-i18next";
import { Button } from '../../../ui'

import ModalFooter from './ModalFooter'

const ModalFooterInfo = props => {
    const {t} = useTranslation()
  const { onConfirm, textSuccess = t('ok'), buttonLabel } = props

  return (
    <ModalFooter>
      <Button
        label={buttonLabel || textSuccess}
        onClick={onConfirm}
        title={buttonLabel || textSuccess}
      />
    </ModalFooter>
  )
}

export default ModalFooterInfo
