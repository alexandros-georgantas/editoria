import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'

import { hot } from 'react-hot-loader'

// import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from 'history'

import { Root } from '@pubsweet/client'

// Modals
import AssetManager from './components/asset-manager/src/ConnectedAssetManager'
import ModalProvider from './components/common/src/ModalProvider'
import AddBookModal from './components/dashboard/src/modals/AddBookModal'
import AddEndNoteModal from './components/bookbuilder/src/ui/src/modals/AddEndNoteModal'
import DeleteBookModal from './components/dashboard/src/modals/DeleteBookModal'
import ArchiveBookModal from './components/dashboard/src/modals/ArchiveBookModal'
import DeleteBookComponentModal from './components/bookbuilder/src/ui/src/modals/DeleteBookComponentModal'
import FinalizeBookStructureModal from './components/wizard/src/ui/FinalizeBookStructureModal'
import ChangeNumberOfLevelsModal from './components/wizard/src/ui/ChangeNumberOfLevelsModal'
import BookTeamManagerModal from './components/bookbuilder/src/TeamManager/ConnectedTeamManager'
import WarningModal from './components/bookbuilder/src/ui/src/modals/WarningModal'
import WarningPagedJs from './components/bookbuilder/src/PagedStyler/WarningModal'
import ErrorModal from './components/bookbuilder/src/ui/src/modals/ErrorModal'
import UnlockModal from './components/bookbuilder/src/ui/src/modals/UnlockModal'
import ExportBookModal from './components/bookbuilder/src/ui/src/modals/ExportBookModal'
import MetadataModal from './components/bookbuilder/src/ui/src/modals/MetadataModal'
import WorkflowModal from './components/bookbuilder/src/ui/src/modals/WorkflowModal'
import BookSettingsModal from './components/bookbuilder/src/ui/src/modals/BookSettingsModal'
import EditorModal from './components/wax/src/modals/EditorModal'
import CreateTemplateModal from './components/templates/src/ui/src/modals/TemplateModal'
import UpdateTemplateModal from './components/templates/src/ui/src/modals/ConnectedUpdateTemplateModal'
import DeleteTemplateModal from './components/templates/src/ui/src/modals/DeleteTemplateModal'
import { Loading } from './ui'

import theme from './theme'

import routes from './routes'

// language translation service
import '../services/i18n'

const featureBookStructureEnabled =
  (process.env.FEATURE_BOOK_STRUCTURE &&
    JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
  false

const rootEl = document.getElementById('root')

const history = createBrowserHistory()
let modals = {
  addBook: AddBookModal,
  assetManagerModal: AssetManager,
  assetManagerEditor: AssetManager,
  addEndNote: AddEndNoteModal,
  deleteBook: DeleteBookModal,
  archiveBook: ArchiveBookModal,
  deleteBookComponent: DeleteBookComponentModal,
  bookTeamManager: BookTeamManagerModal,
  warningModal: WarningModal,
  warningPagedJs: WarningPagedJs,
  unlockModal: UnlockModal,
  metadataModal: MetadataModal,
  workflowModal: WorkflowModal,
  errorModal: ErrorModal,
  editorModal: EditorModal,
  createTemplateModal: CreateTemplateModal,
  updateTemplateModal: UpdateTemplateModal,
  deleteTemplateModal: DeleteTemplateModal,
  bookSettingsModal: BookSettingsModal,
  exportBookModal: ExportBookModal,
}

if (featureBookStructureEnabled) {
  modals = {
    addBook: AddBookModal,
    assetManagerModal: AssetManager,
    assetManagerEditor: AssetManager,
    addEndNote: AddEndNoteModal,
    deleteBook: DeleteBookModal,
    archiveBook: ArchiveBookModal,
    deleteBookComponent: DeleteBookComponentModal,
    bookTeamManager: BookTeamManagerModal,
    dashboardTeamManager: BookTeamManagerModal,
    warningModal: WarningModal,
    warningPagedJs: WarningPagedJs,
    unlockModal: UnlockModal,
    metadataModal: MetadataModal,
    workflowModal: WorkflowModal,
    errorModal: ErrorModal,
    editorModal: EditorModal,
    createTemplateModal: CreateTemplateModal,
    updateTemplateModal: UpdateTemplateModal,
    deleteTemplateModal: DeleteTemplateModal,
    bookSettingsModal: BookSettingsModal,
    exportBookModal: ExportBookModal,
    finalizeBookStructureModal: FinalizeBookStructureModal,
    changeNumberOfLevelsModal: ChangeNumberOfLevelsModal,
  }
}

const loading = <Loading />
ReactDOM.render(
  <React.Suspense fallback={loading}>
    <ModalProvider modals={modals}>
      <Root history={history} routes={routes} theme={theme} />
    </ModalProvider>
    ,
  </React.Suspense>,
  rootEl,
)

export default hot(module)(Root)
