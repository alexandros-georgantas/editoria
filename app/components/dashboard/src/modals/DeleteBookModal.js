/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import {useTranslation} from "react-i18next";
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

const DeleteBookModal = props => {
  const { isOpen, hideModal, data } = props
  const { bookTitle, onConfirm } = data
  const {t} = useTranslation()

  return (
    <DialogModal
      buttonLabel={t("yes")}
      headerText={t('delete_book')}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onRequestClose={hideModal}
    >
      <Text>
        {/* {`Are you sure you want to delete the book with title ${bookTitle}?`} */}
        {t("are_you_sure_you_want_to_delete_the_book_with_title_{bookTitle}?",bookTitle)}
      </Text>
    </DialogModal>
  )
}

export default DeleteBookModal
