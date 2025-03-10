/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'
import get from 'lodash/get'

import { TextField as UiTextField } from '@pubsweet/ui'
import { fadeIn, th } from '@pubsweet/ui-toolkit'
import { useTranslation } from 'react-i18next'

const readOnly = css`
  background: ${th('colorBackgroundHue')};
  cursor: not-allowed;
`

const StyledTextField = styled(UiTextField)`
  line-height: ${th('lineHeightBase')};
  margin-bottom: calc(${th('gridUnit')} * 2);
  width: calc(${th('gridUnit')} * 50);

  input {
    height: calc(${th('gridUnit')} * 4);
    ${props => props.readOnly && readOnly};
  }
`

const Error = styled.div.attrs(props => ({
  role: 'alert',
}))`
  align-self: flex-end;
  animation: ${fadeIn} 0.2s;
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  margin: 0 0 calc(${th('gridUnit')} * 3) calc(${th('gridUnit')} * 2);
`

// TO DO -- extract Labels from TextField
const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding: 10px 10px 0 0;
`

const Wrapper = styled.div`
  display: flex;

  ${props =>
    props.inline &&
    css`
      /* width: 600px; */
      justify-content: space-between;
    `};
`

const Field = ({
  error,
  handleBlur,
  handleChange,
  hideErrorMessage,
  inline,
  // isSubmitting,
  label,
  name,
  required,
  touched,
  value,
  ...props
}) => {
  const { i18n } = useTranslation()
  const touchedThis = get(touched, name)

  const showError = () => {
    if (!error) return false
    if (touchedThis) return true

    return false
  }

  const validationStatus = () => {
    if (showError()) return 'error'
    return 'default'
  }

  const fieldLabel = label && `${label}${required ? ' *' : ''}`

  return (
    <FieldWithError>
      <StyledTextField
        label={
          inline ? null : i18n.t(fieldLabel.toLowerCase().replace(/ /g, '_'))
        }
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        validationStatus={validationStatus()}
        value={value}
        {...props}
      />
      {showError() && !hideErrorMessage && (
        <Error>{i18n.t(error.toLowerCase().replace(/ /g, '_'))}</Error>
      )}
    </FieldWithError>
  )
}

const FieldWithError = styled.div`
  display: inline-flex;
`

const TextField = props => {
  const { className, inline, label } = props
  const { t } = useTranslation()

  return (
    <Wrapper className={className} inline={inline}>
      {inline && <Label>{t(label.toLowerCase().replace(/ /g, '_'))}</Label>}
      <Field {...props} />
    </Wrapper>
  )
}

export default TextField
