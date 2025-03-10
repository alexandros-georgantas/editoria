/* eslint-disable react/prop-types */
/* stylelint-disable font-family-no-missing-generic-family-keyword, string-quotes, declaration-no-important */
import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { useTranslation } from 'react-i18next'

const Button = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: #828282;
  display: flex;
  font-family: 'Fira Sans Condensed' !important;
  justify-content: center;
  padding: 0;
  /* padding: calc(${th('gridUnit')} / 2); */
  svg {
    svg {
      path {
        fill: #828282;
      }
    }
    height: 16px;
    width: 16px;
  }

  &:disabled {
    color: ${th('colorFurniture')};
    cursor: not-allowed !important;

    svg {
      path {
        fill: ${th('colorFurniture')};
      }
    }

    font-size: ${th('fontSizeBase')} !important;
    font-style: normal !important;
    font-weight: 200 !important;
    line-height: ${th('lineHeightBase')} !important;
  }

  &:not(:disabled):hover {
    /* background-color: ${th('colorBackgroundHue')}; */
    color: ${th('colorPrimary')};

    svg {
      path {
        fill: ${th('colorPrimary')};
      }
    }
  }

  &:not(:disabled):active {
    /* background-color: ${th('colorFurniture')}; */
    border: none;
    color: ${th('colorPrimary')};
    outline: none;

    &:focus {
      outline: 0;
    }

    svg {
      path {
        fill: ${th('colorPrimary')};
      }
    }
  }
`

const Icon = styled.span`
  height: calc(2 * ${th('gridUnit')});
  margin: 0 ${th('gridUnit')} 0 0;
  padding: 0;
  width: calc(2 * ${th('gridUnit')});
`

const OnlyIcon = styled.span`
  height: calc(3.5 * ${th('gridUnit')});
  padding: 0;
  width: calc(3.5 * ${th('gridUnit')});
`

const Label = styled.div`
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  padding-right: 4px;
`

const ButtonWithIcon = ({
  onClick,
  icon,
  label,
  disabled,
  title,
  className,
}) => {
  const { t } = useTranslation()

  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      <Icon>{icon}</Icon>
      <Label>{t(label.toLowerCase().replace(/ /g, '_')).toUpperCase()}</Label>
    </Button>
  )
}

const DefaultButton = ({ onClick, label, disabled, className, title }) => {
  const { t } = useTranslation()

  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      <Label>{t(label.toLowerCase().replace(/ /g, '_')).toUpperCase()}</Label>
    </Button>
  )
}

const ButtonWithoutLabel = ({ onClick, icon, disabled, className, title }) => {
  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      <OnlyIcon>{icon}</OnlyIcon>
    </Button>
  )
}

export { ButtonWithIcon, DefaultButton, ButtonWithoutLabel }
