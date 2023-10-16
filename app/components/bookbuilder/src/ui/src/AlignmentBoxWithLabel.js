/* stylelint-disable string-quotes,font-family-no-missing-generic-family-keyword */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

import { useTranslation } from 'react-i18next'
import AlignmentBox from './AlignmentBox'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Label = styled.span`
  color: #828282;
  font-family: 'Fira Sans Condensed';
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  line-height: ${th('lineHeightBaseSmall')};
  margin: ${({ labelPositionRight }) =>
    labelPositionRight ? '0 0 0 10px' : '0 10px 0 0'};
  order: ${({ labelPositionRight }) => (labelPositionRight ? 2 : 0)};
`

const AlignmentBoxWithLabel = ({
  active,
  id,
  labelPositionRight,
  labelText,
  noBorder,
  onClick,
}) => {
  const { t } = useTranslation()
  return (
    <Container>
      <Label labelPositionRight={labelPositionRight}>
        {t(labelText.toLowerCase().replace(/ /g, '_'))}
      </Label>
      <AlignmentBox
        active={active}
        id={id}
        noBorder={noBorder}
        onClick={onClick}
      />
    </Container>
  )
}

export default AlignmentBoxWithLabel
