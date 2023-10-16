import React from 'react'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'

const WrappedSelect = props => {
  const { t } = useTranslation()
  return (
    <Select
      classNamePrefix="react-select"
      {...props}
      noOptionsMessage={() => t('no_options')}
      placeholder={t('select')}
    />
  )
}

export default WrappedSelect
