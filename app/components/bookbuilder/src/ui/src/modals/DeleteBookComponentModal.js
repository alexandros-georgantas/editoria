/* eslint-disable react/prop-types */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import DialogModal from '../../../../../common/src/DialogModal'

const Text = styled.div`
  color: #404040;
  font-family: 'Fira Sans Condensed';
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  text-align: center;
  width: 100%;
`

const DeleteBookComponentModal = props => {
  const { isOpen, hideModal, data } = props
  const { componentType, title, onConfirm } = data

  return (
    <DialogModal
      buttonLabel="Yes"
      headerText={`Delete ${componentType}`}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onRequestClose={hideModal}
    >
      <Text>
        {`Are you sure you want to delete this ${componentType} with title ${
          title || 'Untitled'
        }?`}
        <br />
        {componentType === 'endnotes' &&
          `By doing so you will not be able to see templates with notes option endnotes`}
      </Text>
    </DialogModal>
  )
}

export default DeleteBookComponentModal
