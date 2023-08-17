/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import { useTranslation} from "react-i18next";
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
  const {t} = useTranslation()
  const archiveStatus = archived ? t('unarchive') : t('archive')
  const bookObject = {bookTitle,archiveStatus}
  return (
    <DialogModal
      buttonLabel="Yes"
      headerText={archived ? t('unarchive_book') : t('archive_book')}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onRequestClose={hideModal}
    >
      <Text>
        {/* <Trans i18nKey="">
        {`Are you sure you want to ${
          archived ? 'unarchive' : 'archive'
        } the book with title ${bookTitle}?`}
        </Trans> */}
        {t('confirm_archive_unrchive',bookObject)}
      </Text>
    </DialogModal>
  )
}

export default ArchiveBookModal
