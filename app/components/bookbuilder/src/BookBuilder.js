import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Button, Icons } from '../../../ui'
import {
  ProductionEditorsArea,
  Header,
  UploadFilesButton,
  DivisionsArea,
} from './ui'

const {
  metadataIcon,
  assetManagerIcon,
  bookExportIcon,
  teamManagerIcon,
  bookSettingIcon,
} = Icons

const Container = styled.div`
  clear: both;
  display: block;
  float: none;
  height: 100%;
  margin: 0 auto;
  max-width: 100%;
  overflow-y: auto;
`

const InnerWrapper = styled.div`
  clear: both;
  display: block;
  float: none;
  height: calc(100% - 80px);
  margin: 0 auto;
  max-width: 76%;
`

/* eslint-disable react/prop-types */
const BookBuilder = ({
  book,
  applicationParameter,
  history,
  addBookComponent,
  onMetadataAdd,
  currentUser,
  deleteBookComponent,
  toggleIncludeInTOC,
  updateApplicationParameters,
  updateBookComponentPagination,
  updateBookComponentOrder,
  updateBookComponentWorkflowState,
  updateBookComponentUploading,
  updateComponentType,
  uploadBookComponent,
  onDeleteBookComponent,
  onAssetManager,
  onAdminUnlock,
  refetching,
  refetchingBookBuilderRules,
  onTeamManager,
  onExportBook,
  onWarning,
  rules,
  loading,
  loadingRules,
  setState,
  onEndNoteModal,
  onWorkflowUpdate,
  onBookSettings,
}) => {
  const { canViewTeamManager, canViewMultipleFilesUpload, canAccessBook } =
    rules

  const { divisions, productionEditors } = book

  const featureUploadDOCXFiles =
    (process.env.FEATURE_UPLOAD_DOCX_FILES &&
      JSON.parse(process.env.FEATURE_UPLOAD_DOCX_FILES)) ||
    false

  const featureBookStructureEnabled =
    (process.env.FEATURE_BOOK_STRUCTURE &&
      JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
    false

  useMemo(() => {
    if (!canAccessBook) {
      const onConfirm = () => {
        history.push(`/books`)
      }

      onWarning(
        `You don't have permissions to access this book. You will be redirected back to the dashboard`,
        //  <Trans i18nKey="you_don't_have_permissions_to_access_this_book._you_will_be_redirected_back_to_the_dashboard" t={t}>You don&#39;t have permissions to access this book. You will be redirected back to the dashboard</Trans>,
        onConfirm,
      )
    }
  }, [canAccessBook])

  const productionEditorActions = []

  const headerActions = [
    <Button
      icon={metadataIcon}
      key="metadata_button"
      label="Metadata"
      onClick={() => onMetadataAdd(book)}
      title="Metadata"
    />,
    <Button
      icon={assetManagerIcon}
      key="assetManager_button"
      label="Asset Manager"
      onClick={() => onAssetManager(book.id)}
      title="Asset Manager"
    />,
    <Button
      icon={bookExportIcon}
      key="exportBook_button"
      label="Export Book"
      onClick={() => onExportBook(book, book.title, history)}
      title="Export Book"
    />,
  ]

  if (!featureBookStructureEnabled) {
    headerActions.push(
      <Button
        icon={bookSettingIcon}
        key="bookSettings_button"
        label="Book Settings"
        onClick={() => onBookSettings(book)}
        title="Book Settings"
      />,
    )
  }

  if (canViewTeamManager) {
    headerActions.unshift(
      <Button
        icon={teamManagerIcon}
        key="teamManager_button"
        label="Team Manager"
        onClick={() => onTeamManager(book.id)}
        title="Team Manager"
      />,
    )
  }

  if (canViewMultipleFilesUpload && featureUploadDOCXFiles) {
    headerActions.unshift(
      <UploadFilesButton
        book={book}
        key="ingestWord_button"
        onWarning={onWarning}
        uploadBookComponent={uploadBookComponent}
      />,
    )
  }

  return (
    <Container>
      <InnerWrapper>
        <ProductionEditorsArea
          actions={productionEditorActions}
          productionEditors={productionEditors}
        />
        <Header actions={headerActions} bookTitle={book.title} />
        <DivisionsArea
          addBookComponent={addBookComponent}
          applicationParameter={applicationParameter}
          bookId={book.id}
          bookStructure={book.bookStructure}
          currentUser={currentUser}
          deleteBookComponent={deleteBookComponent}
          divisions={divisions}
          history={history}
          onAdminUnlock={onAdminUnlock}
          onDeleteBookComponent={onDeleteBookComponent}
          onEndNoteModal={onEndNoteModal}
          onWarning={onWarning}
          onWorkflowUpdate={onWorkflowUpdate}
          refetching={refetching}
          refetchingBookBuilderRules={refetchingBookBuilderRules}
          rules={rules}
          setState={setState}
          toggleIncludeInTOC={toggleIncludeInTOC}
          updateApplicationParameters={updateApplicationParameters}
          updateBookComponentOrder={updateBookComponentOrder}
          updateBookComponentPagination={updateBookComponentPagination}
          updateBookComponentUploading={updateBookComponentUploading}
          updateBookComponentWorkflowState={updateBookComponentWorkflowState}
          updateComponentType={updateComponentType}
          uploadBookComponent={uploadBookComponent}
        />
      </InnerWrapper>
    </Container>
  )
}

export default BookBuilder
