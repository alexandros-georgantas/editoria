/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useLazyQuery,
  useSubscription,
} from '@apollo/client'
import { find } from 'lodash'
import uuid from 'uuid/v4'

import {
  GET_BOOK,
  GET_BOOK_COMPONENT,
  GET_CUSTOM_TAGS,
  GET_SPECIFIC_FILES,
  GET_WAX_RULES,
  UPDATE_BOOK_COMPONENT_CONTENT,
  ADD_CUSTOM_TAG,
  UPDATE_BOOK_COMPONENT_TRACK_CHANGES,
  RENAME_BOOK_COMPONENT_TITLE,
  LOCK_BOOK_COMPONENT,
  BOOK_UPDATED_SUBSCRIPTION,
  BOOK_COMPONENT_UPDATED_SUBSCRIPTION,
  CUSTOM_TAGS_UPDATED_SUBSCRIPTION,
} from './queries'

import getUserTrackChangeColor from './helpers/getUserTrackChangeColor'
import ModalContext from '../../common/src/ModalContext'
import { Loading } from '../../../ui'
import EditorPage from './EditorPage'

const EditorPageWithData = ({
  currentUser,
  showModal,
  hideModal,
  applicationParameter,
}) => {
  const history = useHistory()
  const params = useParams()

  const { bookId, bookComponentId, mode } = params

  const [tabId, setTabId] = useState(uuid())
  const [isOnline, setIsOnline] = useState(true)

  /**
   * QUERIES SECTION START
   */
  const {
    // subscribeToMore: subscribeToMoreForBook,
    loading: bookLoading,
    error: bookError,
    data: bookData,
    refetch: refetchBook,
  } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  })

  const {
    // subscribeToMore: subscribeToMoreForBookComponent,
    loading: bookComponentLoading,
    error: bookComponentError,
    data: bookComponentData,
    refetch: refetchBookComponent,
  } = useQuery(GET_BOOK_COMPONENT, {
    variables: { id: bookComponentId },
    fetchPolicy: 'network-only', // this is due to quick header navigation in Wax. When going back there are potential cached data about lock and an unlock subscription message will not have the chance to arrive in time
  })

  // TODO: get this info from current user
  const {
    loading: waxRulesLoading,
    error: waxRulesError,
    data: waxRulesData,
    networkStatus,
  } = useQuery(GET_WAX_RULES, {
    variables: { id: bookComponentId },
    pollInterval: 5000,
    fetchPolicy: 'network-only',
  })

  const {
    // subscribeToMore: subscribeToMoreForCustomTags,
    loading: customTagsLoading,
    error: customTagsError,
    data: customTagsData,
    refetch: refetchCustomTags,
  } = useQuery(GET_CUSTOM_TAGS)

  const [getSpecificFiles] = useLazyQuery(GET_SPECIFIC_FILES)
  /**
   * QUERIES SECTION END
   */

  /**
   * SUBSCRIPTIONS SECTION START
   */
  useSubscription(BOOK_COMPONENT_UPDATED_SUBSCRIPTION, {
    variables: { id: bookComponentId },
    onSubscriptionData: () => refetchBookComponent({ id: bookComponentId }),
  })
  useSubscription(BOOK_UPDATED_SUBSCRIPTION, {
    variables: { id: bookId },
    onSubscriptionData: () => {
      refetchBook({ id: bookId })
    },
  })

  useSubscription(CUSTOM_TAGS_UPDATED_SUBSCRIPTION, {
    onSubscriptionData: () => {
      refetchCustomTags()
    },
  })
  /**
   * SUBSCRIPTIONS SECTION END
   */

  /**
   * MUTATIONS SECTION START
   */
  const [updateContent, { error: updateContentError }] = useMutation(
    UPDATE_BOOK_COMPONENT_CONTENT,
  )

  const [lockBookComponent, { error: lockBookComponentError }] =
    useMutation(LOCK_BOOK_COMPONENT)

  const [renameBookComponent, { error: renameBookComponentError }] =
    useMutation(RENAME_BOOK_COMPONENT_TITLE)

  const [updateTrackChanges, { error: updateTrackChangesError }] = useMutation(
    UPDATE_BOOK_COMPONENT_TRACK_CHANGES,
  )

  const [addCustomTag, { error: addCustomTagError }] = useMutation(
    ADD_CUSTOM_TAG,
    {
      refetchQueries: [{ query: GET_CUSTOM_TAGS }, 'GetCustomTags'],
    },
  )
  /**
   * MUTATIONS SECTION END
   */

  /**
   * HANDLERS SECTION START
   */
  const onAssetManager = () =>
    new Promise((resolve, reject) => {
      const handleImport = async selectedFileIds => {
        const { data, error, loading } = await getSpecificFiles({
          variables: { ids: selectedFileIds },
        })

        if (error) {
          reject(error)
        }

        if (!loading) {
          const { getSpecificFiles: files } = data

          const transformedFiles = files.map(file => ({
            id: file.id,
            source: file.url,
            alt: file.alt,
          }))

          hideModal()
          resolve(transformedFiles)
        }
      }

      showModal('assetManagerEditor', {
        bookId,
        withImport: true,
        handleImport,
      })
    })

  const onCustomTagAdd = customTag => {
    addCustomTag({
      variables: {
        input: customTag,
      },
    })
  }

  const onBookComponentContentChange = content => {
    updateContent({
      variables: {
        input: {
          id: bookComponentId,
          content,
        },
      },
    })
  }

  const onBookComponentTrackChangesChange = trackChangesState => {
    updateTrackChanges({
      variables: {
        input: {
          id: bookComponentId,
          trackChangesEnabled: trackChangesState,
        },
      },
    })
  }

  const onBookComponentTitleChange = title => {
    renameBookComponent({
      variables: {
        input: {
          id: bookComponentId,
          title,
        },
      },
    })
  }

  const onBookComponentLock = () => {
    const userAgent = window.navigator.userAgent || null
    lockBookComponent({
      variables: {
        id: bookComponentId,
        tabId,
        userAgent,
      },
    })
  }

  const heartbeatInterval = find(applicationParameter, {
    area: 'heartbeatInterval',
  })

  // const onBookUpdated = () => {
  //   return subscribeToMoreForBook({
  //     document: BOOK_UPDATED_SUBSCRIPTION,
  //     variables: { id: bookId },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev
  //       const { data } = subscriptionData
  //       const { bookUpdated } = data

  //       return {
  //         getBook: bookUpdated,
  //       }
  //     },
  //   })
  // }

  // const onBookComponentUpdated = () => {

  //   return subscribeToMoreForBookComponent({
  //     document: BOOK_COMPONENT_UPDATED_SUBSCRIPTION,
  //     variables: { id: bookComponentId },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev
  //       const { data } = subscriptionData
  //       const { bookComponentUpdated } = data

  //       return {
  //         getBookComponent: bookComponentUpdated,
  //       }
  //     },
  //   })
  // }

  // const onCustomTagsUpdated = () => {
  //   return subscribeToMoreForCustomTags({
  //     document: CUSTOM_TAGS_UPDATED_SUBSCRIPTION,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev
  //       const { data } = subscriptionData
  //       const { customTagsUpdated } = data

  //       return {
  //         getCustomTags: customTagsUpdated,
  //       }
  //     },
  //   })
  // }

  const onTriggerModal = (withConfirm, msg, url = undefined) => {
    if (withConfirm) {
      const onConfirm = () => {
        hideModal()
        history.push(url)
      }

      showModal('editorModal', {
        onConfirm,
        warning: msg,
      })
    } else {
      showModal('editorModal', {
        noActions: true,
        warning: msg,
      })
    }
  }

  const onInfoModal = msg => {
    const onConfirm = () => {
      hideModal()
    }

    showModal('editorModal', {
      onConfirm,
      warning: msg,
    })
  }

  const onHideModal = () => {
    hideModal()
  }
  /**
   * HANDLERS SECTION END
   */

  /**
   * ERRORS HANDLING SECTION START
   */
  if (
    bookComponentError ||
    bookError ||
    waxRulesError ||
    customTagsError ||
    updateContentError ||
    lockBookComponentError ||
    renameBookComponentError ||
    updateTrackChangesError ||
    addCustomTagError
  ) {
    console.error(
      `Something went wrong! Please inform your system's administrator`,
    )
  }

  /**
   * ERRORS HANDLING SECTION END
   */

  useEffect(() => {
    if (networkStatus === 8 && isOnline) {
      setIsOnline(false)
    }

    if (networkStatus === 7 && !isOnline) {
      setIsOnline(true)
    }
  }, [networkStatus])

  if (
    !currentUser ||
    bookLoading ||
    bookComponentLoading ||
    waxRulesLoading ||
    customTagsLoading
  )
    return <Loading />

  const { getBook: book } = bookData
  const { getBookComponent: bookComponent } = bookComponentData
  const { getCustomTags: tags } = customTagsData
  const { getWaxRules: rules } = waxRulesData

  const user = {
    ...currentUser,
    userColor: getUserTrackChangeColor(currentUser.teams),
    userId: currentUser.id,
  }

  return (
    <EditorPage
      book={book}
      bookComponent={bookComponent}
      heartbeatInterval={heartbeatInterval}
      hideModal={hideModal}
      history={history}
      isOnline={isOnline}
      mode={mode}
      onAssetManager={onAssetManager}
      onBookComponentContentChange={onBookComponentContentChange}
      onBookComponentLock={onBookComponentLock}
      onBookComponentTitleChange={onBookComponentTitleChange}
      onBookComponentTrackChangesChange={onBookComponentTrackChangesChange}
      onCustomTagAdd={onCustomTagAdd}
      onHideModal={onHideModal}
      onInfoModal={onInfoModal}
      onTriggerModal={onTriggerModal}
      rules={rules}
      setTabId={setTabId}
      showModal={showModal}
      // subscribeToBookComponentUpdates={onBookComponentUpdated}
      // subscribeToBookUpdates={onBookUpdated}
      // subscribeToCustomTagsUpdates={onCustomTagsUpdated}
      tabId={tabId}
      tags={tags}
      user={user}
    />
  )
}

const WithModal = props => {
  return (
    <ModalContext.Consumer>
      {({ hideModal, showModal, data = {}, modals, modalKey }) => {
        const ModalComponent = modals[modalKey]

        return (
          <>
            {modalKey && (
              <ModalComponent
                data={data}
                hideModal={hideModal}
                isOpen={modalKey !== undefined}
              />
            )}
            <EditorPageWithData
              hideModal={hideModal}
              showModal={showModal}
              {...props}
            />
          </>
        )
      }}
    </ModalContext.Consumer>
  )
}

export default WithModal
