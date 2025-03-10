/* stylelint-disable declaration-no-important */
import React from 'react'
import styled from 'styled-components'

// import { ActionButton } from '../ui'
import { Button } from '../../../../ui'

const Input = styled.input`
  display: none !important;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`

/* eslint-disable react/prop-types */
const UploadButton = ({
  onChange,
  multiple,
  accept,
  label,
  disabled,
  id,
  className,
}) => {
  const onClick = event => {
    event.preventDefault()
    document.getElementById(`file-uploader-${id}`).click()
  }

  return (
    <Wrapper>
      <Button
        disabled={disabled}
        label={label}
        onClick={onClick}
        title={label}
      />
      <Input
        accept={accept}
        id={`file-uploader-${id}`}
        multiple={multiple}
        onChange={onChange}
        type="file"
      />
    </Wrapper>
  )
}

export default UploadButton
