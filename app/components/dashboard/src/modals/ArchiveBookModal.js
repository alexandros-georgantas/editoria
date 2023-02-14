/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import DialogModal from '../../../common/src/DialogModal'

const Text = styled.div`
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  margin-bottom: ${grid(3)};
  text-align: center;
  width: 100%;
`

const ArchiveBookModal = props => {
  const { isOpen, hideModal, data } = props
  const { bookTitle, onConfirm, archived } = data
  return (
    <DialogModal
      buttonLabel="Yes"
      headerText={archived ? 'Unarchive Book' : 'Archive Book'}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onRequestClose={hideModal}
    >
      <Text>
        {`Are you sure you want to ${
          archived ? 'unarchive' : 'archive'
        } the book with title ${bookTitle}?`}
      </Text>
    </DialogModal>
  )
}

export default ArchiveBookModal
