/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import debounce from 'lodash/debounce'
import findIndex from 'lodash/findIndex'
import uuid from 'uuid/v4'
import { useTranslation } from 'react-i18next'
import Editor from './Editor'
import usePrevious from './helpers/usePrevious'

const UNLOCK_REASONS = (t, status) => {
  // const { t } = useTranslation()
  switch (status) {
    case 100:
      return t('Unlocked by the admin of the system')
    case 101:
      return t('Unlocked by the owner of the lock')
    case 102:
      return t('Unlocked due to inactivity')
    case 103:
      return t('Unlocked but found multiple locks')
    case 104:
      return t('Unlocked by the system due to server error')
    case 105:
      return t('Unlocked due to permission changes')
    case 200:
      return t('Idle mode')
    default:
      return null
  }

  // return {
  //   100: t('Unlocked by the admin of the system'),
  //   101: t('Unlocked by the owner of the lock'),
  //   102: t('Unlocked due to inactivity'),
  //   103: t('Unlocked but found multiple locks'),
  //   104: t('Unlocked by the system due to server error'),
  //   105: t('Unlocked due to permission changes'),
  //   200: t('Idle mode'),
  // }
}

const EditorPage = props => {
  const {
    book,
    onCustomTagAdd,
    history,
    onTriggerModal,
    mode,
    isOnline,
    bookComponent,
    heartbeatInterval,
    onBookComponentLock,
    onBookComponentTitleChange,
    // subscribeToBookComponentUpdates,
    // subscribeToBookUpdates,
    onInfoModal,
    // subscribeToCustomTagsUpdates,
    rules,
    setTabId,
    tabId,
    tags,
    onBookComponentContentChange,
    onBookComponentTrackChangesChange,
    onHideModal,
    onAssetManager,
    user,
  } = props

  const {
    componentType,
    divisionType,
    id,
    content,
    trackChangesEnabled,
    componentTypeOrder,
    status,
    title,
    lock,
    uploading,
    bookStructureElements,
  } = bookComponent

  const { divisions, id: bookId, title: bookTitle } = book
  const { t } = useTranslation()

  const flatBookComponents = []

  divisions.forEach(division => {
    const { bookComponents } = division
    bookComponents.forEach(bC => {
      const { componentType: compType } = bC

      if (compType !== 'toc' && compType !== 'endnotes') {
        flatBookComponents.push(bC)
      }
    })
  })

  const currentBookComponentIndex = findIndex(flatBookComponents, { id })

  const nextBookComponent =
    flatBookComponents[currentBookComponentIndex + 1] || null

  const prevBookComponent =
    flatBookComponents[currentBookComponentIndex - 1] || null

  let editorMode = 'preview'

  const {
    canAccessBook,
    canEditPreview,
    canEditFull,
    canEditSelection,
    canEditReview,
  } = rules

  if (mode && mode === 'preview') {
    editorMode = 'preview'
  } else if (lock && lock.userId !== user.id) {
    editorMode = 'preview'
  } else if (lock && lock.userId === user.id && tabId !== lock.tabId) {
    editorMode = 'preview'
  } else if (canEditPreview) {
    editorMode = 'preview'
  } else if (canEditFull) {
    editorMode = 'full'
  } else if (canEditReview) {
    editorMode = 'review'
  } else if (canEditSelection) {
    editorMode = 'preview'
  }

  const previousIsOnline = usePrevious(isOnline)
  const previousLock = usePrevious(lock)
  const previousEditorMode = usePrevious(editorMode)
  const token = localStorage.getItem('token')
  const socketUrl = process.env.LOCKS_WS_URL

  const onPeriodicBookComponentTitleChange = debounce(changedTitle => {
    if (editorMode === 'full' || editorMode === 'review') {
      onBookComponentTitleChange(changedTitle)
    }
  }, 50)

  const onPeriodicBookComponentContentChange = debounce(changedContent => {
    if (editorMode === 'full' || editorMode === 'review') {
      onBookComponentContentChange(changedContent)
    }
  }, 50)

  const { getWebSocket, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        if (editorMode !== 'preview') {
          onBookComponentLock()
        }
      },
      onError: err => {
        console.error(err)
      },
      shouldReconnect: () => {
        return editorMode !== 'preview'
      },
      queryParams: { token, bookComponentId: bookComponent.id, tabId },
      share: true,
      reconnectAttempts: 5000,
      reconnectInterval: (heartbeatInterval?.config || 5000) + 500,
    },
    editorMode !== 'preview', // ########## ######### ######## 1 check if that works as expected
  )

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  const previousConnectionStatus = usePrevious(connectionStatus)

  useEffect(() => {
    // const unsubscribeFromBookComponentUpdates =
    //   subscribeToBookComponentUpdates()

    // const unsubscribeFromBookUpdates = subscribeToBookUpdates()
    // const unsubscribeFromCustomTagsUpdates = subscribeToCustomTagsUpdates()

    return () => {
      // unsubscribeFromBookUpdates()
      // unsubscribeFromBookComponentUpdates()
      // unsubscribeFromCustomTagsUpdates()

      onPeriodicBookComponentContentChange.cancel()
      onPeriodicBookComponentTitleChange.cancel()

      onHideModal()
    }
  }, [])

  useEffect(() => {
    if (
      previousConnectionStatus === 'Connecting' &&
      connectionStatus === 'Open'
    ) {
      if (!previousIsOnline && isOnline) {
        onHideModal()
      }
    }
  }, [connectionStatus])

  useEffect(() => {
    if (
      previousLock &&
      !lock &&
      status &&
      (status === 100 ||
        status === 102 ||
        status === 101 ||
        status === 104 ||
        status === 105)
    ) {
      onTriggerModal(
        true,
        UNLOCK_REASONS(t, status),
        `/books/${bookId}/book-builder`,
      )
    }
  }, [status])

  useEffect(() => {
    if (uploading) {
      onTriggerModal(
        true,
        t('Uploading in progress, you will be redirected back to Book Builder'),
        `/books/${bookId}/book-builder`,
      )
    }
  }, [uploading])

  useEffect(() => {
    if (!canAccessBook) {
      onTriggerModal(
        true,
        t(
          'You have no permissions to access this book. You will be redirected back to the dashboard',
        ),
        `/books`,
      )
    }
  }, [canAccessBook])

  useEffect(() => {
    if (!isOnline) {
      const msg =
        editorMode !== 'preview'
          ? `Unfortunately, something happened and our server is unreachable at this moment. Don't worry your work up until this point is safe. However, as the application does not support offline mode your lock will be released. Please try again later`
          : `Unfortunately, something happened and our server is unreachable at this moment. Don't worry your work up until this point is safe. Please try again later`

      onTriggerModal(false, t(msg))
    }

    if (!previousIsOnline && isOnline) {
      onHideModal()
    }
  }, [isOnline])

  useEffect(() => {
    if (
      previousEditorMode === 'preview' &&
      (editorMode === 'full' || editorMode === 'review')
    ) {
      const openWS = getWebSocket()

      if (openWS && connectionStatus === 'Closed') {
        setTabId(uuid())
      }

      onTriggerModal(
        true,
        t('You have gained WRITE access for this book component!'),
      )
    }

    if (
      (previousEditorMode === 'full' || previousEditorMode === 'review') &&
      editorMode === 'preview' &&
      status === 200
    ) {
      onTriggerModal(
        true,
        t('You are in READ ONLY mode for this book component!'),
      )
    }
  }, [editorMode])

  return (
    <Editor
      bookComponentId={id}
      bookId={bookId}
      bookStructureElements={bookStructureElements}
      bookTitle={bookTitle}
      componentType={componentType}
      componentTypeOrder={componentTypeOrder}
      content={content}
      divisionType={divisionType}
      editorMode={editorMode}
      history={history}
      key={`${id}-${editorMode}`}
      nextBookComponent={nextBookComponent}
      onAssetManager={onAssetManager}
      onBookComponentTrackChangesChange={onBookComponentTrackChangesChange}
      onCustomTagAdd={onCustomTagAdd}
      onInfoModal={onInfoModal}
      onPeriodicBookComponentContentChange={
        onPeriodicBookComponentContentChange
      }
      onPeriodicBookComponentTitleChange={onPeriodicBookComponentTitleChange}
      prevBookComponent={prevBookComponent}
      rules={rules}
      setTabId={setTabId}
      tags={tags}
      title={title}
      trackChangesEnabled={trackChangesEnabled}
      user={user}
    />
  )
}

export default EditorPage
