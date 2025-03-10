/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { get } from 'lodash'
import { adopt } from 'react-adopt'

import { Loading } from '../../../ui'
import withModal from '../../common/src/withModal'
import Templates from './Templates'
import {
  getTemplatesQuery,
  getExportScriptsQuery,
  createTemplateMutation,
  updateTemplateMutation,
  deleteTemplateMutation,
  templateCreatedSubscription,
  templateUpdatedSubscription,
  templateDeletedSubscription,
} from './queries'

const mapper = {
  withModal,
  getTemplatesQuery,
  getExportScriptsQuery,
  templateCreatedSubscription,
  templateUpdatedSubscription,
  templateDeletedSubscription,
  createTemplateMutation,
  updateTemplateMutation,
  deleteTemplateMutation,
}

const mapProps = args => ({
  templates: get(args.getTemplatesQuery, 'data.getTemplates'),
  createTemplate: args.createTemplateMutation.createTemplate,
  updateTemplate: args.updateTemplateMutation.updateTemplate,
  deleteTemplateMutation: args.deleteTemplateMutation.deleteTemplate,
  showModal: args.withModal.showModal,
  hideModal: args.withModal.hideModal,
  loading: args.getTemplatesQuery.networkStatus === 1,
  onChangeSort: sortingParams => {
    const { getTemplatesQuery: getTemplatesQueryFromArgs } = args
    const { ascending, sortKey } = sortingParams
    const { refetch } = getTemplatesQueryFromArgs
    refetch({
      ascending,
      sortKey,
    })
  },
  onCreateTemplate: t => {
    const {
      createTemplateMutation: createTemplateMutationFromArgs,
      withModal: withModalFromArgs,
      getExportScriptsQuery: getExportScriptsQueryFromArgs,
    } = args

    const { data, loading } = getExportScriptsQueryFromArgs
    const { getExportScripts } = data
    const { createTemplate } = createTemplateMutationFromArgs
    const { showModal, hideModal } = withModalFromArgs

    const onConfirm = ({
      files,
      thumbnail,
      name,
      author,
      target,
      notes,
      trimSize,
      exportScripts,
    }) => {
      createTemplate({
        variables: {
          input: {
            files,
            name,
            author,
            notes,
            target,
            trimSize,
            thumbnail,
            exportScripts,
          },
        },
      })
      hideModal()
    }

    if (!loading) {
      const options = getExportScripts.map(script => ({
        label: script.label,
        value: script.value,
      }))

      showModal('createTemplateModal', {
        onConfirm,
        hideModal,
        headerText: t('Create New Template'),
        mode: 'create',
        scriptOptions: options,
      })
    }
  },
  onUpdateTemplate: (templateId, t) => {
    const {
      updateTemplateMutation: updateTemplateMutationFromArgs,
      withModal: withModalFromArgs,
      getExportScriptsQuery: getExportScriptsQueryFromArgs,
    } = args

    const { data, loading } = getExportScriptsQueryFromArgs
    const { getExportScripts } = data
    const { updateTemplate } = updateTemplateMutationFromArgs
    const { showModal, hideModal } = withModalFromArgs

    const onConfirm = ({
      files,
      deleteFiles,
      thumbnail,
      deleteThumbnail,
      name,
      author,
      notes,
      target,
      trimSize,
      exportScripts,
    }) => {
      updateTemplate({
        variables: {
          input: {
            id: templateId,
            files,
            deleteThumbnail,
            deleteFiles,
            name,
            notes,
            author,
            target,
            trimSize,
            thumbnail,
            exportScripts,
          },
        },
      }).then(() => {
        hideModal()
      })
    }

    if (!loading) {
      const options = getExportScripts.map(script => ({
        label: script.label,
        value: script.value,
      }))

      showModal('updateTemplateModal', {
        onConfirm,
        hideModal,
        mode: 'update',
        templateId,
        headerText: t('Update Template'),
        scriptOptions: options,
      })
    }
  },
  onDeleteTemplate: (templateId, templateName) => {
    const {
      deleteTemplateMutation: deleteTemplateMutationFromArgs,
      withModal: withModalFromArgs,
    } = args

    const { deleteTemplate } = deleteTemplateMutationFromArgs
    const { showModal, hideModal } = withModalFromArgs

    const onConfirm = () => {
      deleteTemplate({
        variables: {
          id: templateId,
        },
      })
      hideModal()
    }

    showModal('deleteTemplateModal', {
      onConfirm,
      templateName,
    })
  },
  onAccessWarningModal: () => {
    const { withModal: withModalFromArgs } = args

    const { showModal, hideModal } = withModalFromArgs

    const onConfirm = () => {
      hideModal()
    }

    showModal('warningModal', {
      onConfirm,
      warning: `You don't have access to visit this page, you will be redirected back`,
    })
  },
  refetching:
    args.getTemplatesQuery.networkStatus === 4 ||
    args.getTemplatesQuery.networkStatus === 2, // possible apollo bug
})

const Composed = adopt(mapper, mapProps)

const featureBookStructureEnabled =
  (process.env.FEATURE_BOOK_STRUCTURE &&
    JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
  false

const Connected = ({ currentUser, t }) => (
  <Composed>
    {({
      templates,
      onCreateTemplate,
      onUpdateTemplate,
      onAccessWarningModal,
      onDeleteTemplate,
      onChangeSort,
      refetching,
      loading,
      createTemplate,
    }) => {
      const history = useHistory()

      const [sortingParams, setSortingParams] = useState({
        ascending: true,
        sortKey: 'name',
      })

      if (loading || !templates || !currentUser) return <Loading />

      if (featureBookStructureEnabled) {
        if (!currentUser.admin && !currentUser.isGlobal) {
          history.push('/')
          onAccessWarningModal()
        }
      }

      return (
        <Templates
          createTemplate={createTemplate}
          currentUser={currentUser}
          history={history}
          loading={loading}
          onAccessWarningModal={onAccessWarningModal}
          onChangeSort={onChangeSort}
          onCreateTemplate={onCreateTemplate}
          onDeleteTemplate={onDeleteTemplate}
          onUpdateTemplate={onUpdateTemplate}
          refetching={refetching}
          setSortingParams={setSortingParams}
          sortingParams={sortingParams}
          templates={templates}
        />
      )
    }}
  </Composed>
)

export default Connected
