import React from 'react'
import styled from 'styled-components'
import { th, darken, lighten } from '@pubsweet/ui-toolkit'
import { useTranslation } from 'react-i18next'

const Button = styled.button`
  align-items: center;
  background: ${({ type }) => {
    if (type === 'primary') {
      return th('colorPrimary')
    }

    if (type === 'delete') {
      return darken('colorError', 30)
    }

    return 'none'
  }};
  border: none;
  cursor: pointer;
  display: flex;
  flex-basis: fit-content;
  justify-content: center;
  margin-right: calc(2 * ${th('gridUnit')});
  padding: calc(${th('gridUnit')} / 2) ${th('gridUnit')};

  &:focus {
    outline: 0;
  }

  &:disabled {
    background: ${th('colorFurniture')};
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${({ type }) => {
      if (type === 'primary') {
        return lighten('colorPrimary', 30)
      }

      if (type === 'delete') {
        return th('colorError')
      }

      return 'none'
    }};
  }
`

const Label = styled.span`
  color: ${th('colorTextReverse')};
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
`

/* eslint-disable react/prop-types */
const ActionButton = ({ onClick, label, disabled, className, type }) => {
  const { t } = useTranslation()
  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <Label>{t(label.toUpperCase())}</Label>
    </Button>
  )
}

export default ActionButton
