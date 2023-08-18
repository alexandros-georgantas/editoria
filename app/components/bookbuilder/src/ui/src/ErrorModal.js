/* eslint-disable react/prop-types */
import React from 'react'

import {useTranslation} from "react-i18next";
import AbModal from '../../../../common/src/AbstractModal'

const ErrorModal = ({ container, show, toggle }) => {
  const {t} = useTranslation()

  const body = (
    <div>
      {/* An error occurred during the conversion to epub. Please try again later. */}
      {t('an_error_occurred_during_the_conversion_to_epub. please_try_again_later.')}
    </div>
  )

  const title = t('an_error_occurred')
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

export default ErrorModal
