import React from 'react'

import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../../config/i18n'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  return (
    <div className="select">
      <select
        onChange={e => i18n.changeLanguage(e.target.value)}
        value={i18n.language}
      >
        {supportedLanguages.map(option => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSwitcher
