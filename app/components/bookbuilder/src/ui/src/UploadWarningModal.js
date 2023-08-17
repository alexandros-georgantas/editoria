/* eslint-disable react/prop-types */
import React from 'react'

import {useTranslation} from "react-i18next";
import AbModal from '../../../../common/src/AbstractModal'

const UploadWarningModal = ({ type, container, show, toggle }) => {
  const {t} = useTranslation()

  const body = (
    <div>
      {t("you_are_not_allowed_to_import_contents_while_a {type} is_being_edited.",type)}
    </div>
  )

  const title = t('import_not_allowed')

  return (
    <AbModal
      body={body}
      container={container}
      show={show}
      title={title}
      toggle={toggle}
    />
  )
}

export default UploadWarningModal
