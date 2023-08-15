/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

import {useTranslation} from "react-i18next";
import { Button, Icons } from '../../../ui'

const StyledButton = styled(Button)`
  margin-right: ${th('gridUnit')};
`

const { archiveIcon, unArchiveIcon } = Icons

const ToggleArchivedButton = ({ setSortingParams, sortingParams }) => {
  const { archived, ...rest } = sortingParams
  const {t} = useTranslation()

  const toggleArchived = () => {
    setSortingParams({ archived: !archived, ...rest })
  }

  // const label = archived ? 'HIDE ARCHIVED' : 'SHOW ARCHIVED'
  const label = archived ? t('hide_archived') : t('show_archived')

  return (
    <StyledButton
      icon={archived ? unArchiveIcon : archiveIcon}
      label={label}
      onClick={toggleArchived}
      title={label}
    />
  )
}

export default ToggleArchivedButton
