import React from 'react'
import styled from 'styled-components'
import { indexOf, forEach, find } from 'lodash'
import { withTranslation } from 'react-i18next'

import DialogModal from '../../../common/src/DialogModal'

import ActionSection from './ActionSection'
import FilesTable from './FilesTable'
import FileDetails from './FileDetails'

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const InnerWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  height: 90%;
  width: 100%;
`

/* eslint-disable react/prop-types */
class AssetManager extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      selectedItem: undefined,
      shouldWarn: false,
      nameASC: true,
      updatedASC: true,
      checkboxSelected: [],
      shouldLoader: false,
    }

    this.selectItem = this.selectItem.bind(this)
    this.checkboxSelection = this.checkboxSelection.bind(this)
    this.toggleOrder = this.toggleOrder.bind(this)
    this.renderBody = this.renderBody.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
    this.updateFileHandler = this.updateFileHandler.bind(this)
    this.findSelected = this.findSelected.bind(this)
    this.importHandler = this.importHandler.bind(this)
  }

  selectItem(id) {
    const { selectedItem } = this.state

    if (id) {
      this.setState({
        selectedItem: selectedItem === id ? undefined : id,
      })
    } else {
      this.setState({
        selectedItem: undefined,
      })
    }
  }

  findSelected(id) {
    const { files } = this.props

    if (files && id) {
      return find(files, { id })
    }

    return undefined
  }

  checkboxSelection(id, all = undefined) {
    const { checkboxSelected } = this.state

    if (all) {
      const { files } = this.props

      if (checkboxSelected.length === files.length) {
        return this.setState({ checkboxSelected: [] })
      }

      const temp = []
      forEach(files, file => temp.push(file.id))
      return this.setState({ checkboxSelected: temp })
    }

    if (checkboxSelected.length === 0) {
      checkboxSelected.push(id)
    } else {
      const found = indexOf(checkboxSelected, id)

      if (found !== -1) {
        checkboxSelected.splice(found, 1)
      } else {
        checkboxSelected.push(id)
      }
    }

    return this.setState({ checkboxSelected })
  }

  toggleOrder(key) {
    const { refetch, bookId } = this.props
    const { name, updated } = this.state

    this.setState(prevState => ({ [key]: !prevState[key] }))
    // this.setState({ [key]: !this.state[key] })

    refetch(bookId, [
      { key: 'name', order: name ? 'asc' : 'desc' },
      { key: 'updated', order: updated ? 'asc' : 'desc' },
    ])
  }

  uploadHandler(files) {
    const { uploadFiles, bookId } = this.props
    this.setState({ shouldLoader: true })
    return uploadFiles(bookId, files).then(() => {
      this.setState({ shouldLoader: false })
    })
  }

  deleteHandler() {
    const { deleteFiles } = this.props
    const { checkboxSelected, selectedItem } = this.state
    const self = this
    deleteFiles(checkboxSelected).then(() => {
      if (selectedItem && indexOf(checkboxSelected, selectedItem) === -1) {
        self.setState({ checkboxSelected: [] })
      } else {
        self.setState({ checkboxSelected: [], selectedItem: undefined })
      }
    })
  }

  importHandler() {
    const { handleImport } = this.props
    const { checkboxSelected } = this.state

    if (checkboxSelected.length > 0) {
      return handleImport(checkboxSelected)
    }

    return false
  }

  updateFileHandler(data) {
    const { updateFile } = this.props
    const { selectedItem: id } = this.state
    return updateFile(id, data)
  }

  renderBody() {
    const { files, withImport, loading, refetching } = this.props

    const { selectedItem, name, updated, checkboxSelected, shouldLoader } =
      this.state

    const sortingState = {
      name,
      updated,
    }

    const columns = [
      { label: 'name', width: 37, sortable: true },
      { label: 'updated', width: 28, sortable: true },
      { label: 'size', width: 15, sortable: false },
      { label: 'mimetype', width: 17, sortable: false },
      // { label: 'inUse', width: 1, sortable: false },
    ]

    return (
      <OuterWrapper>
        <InnerWrapper>
          <FilesTable
            checkboxColumn
            checkboxHandler={this.checkboxSelection}
            checkboxSelected={checkboxSelected}
            columns={columns}
            files={files}
            loading={loading || refetching || shouldLoader}
            selected={selectedItem}
            selectHandler={this.selectItem}
            sortingHandler={this.toggleOrder}
            sortingState={sortingState}
          />
          {selectedItem && (
            <FileDetails
              closeHandler={this.selectItem}
              file={this.findSelected(selectedItem)}
              updateFile={this.updateFileHandler}
            />
          )}
        </InnerWrapper>

        <ActionSection
          deleteDisabled={checkboxSelected.length === 0}
          deleteHandler={this.deleteHandler}
          importDisabled={checkboxSelected.length === 0}
          importHandler={this.importHandler}
          shouldShowDelete
          shouldShowImport={withImport}
          uploadHandler={this.uploadHandler}
        />
      </OuterWrapper>
    )
  }

  render() {
    const { isOpen, hideModal, t } = this.props

    return (
      <DialogModal
        headerText={t('Asset Manager')}
        isOpen={isOpen}
        notCentered
        onRequestClose={hideModal}
        showConfirmButton={false}
        size="medium"
        textCancel="Close"
      >
        {this.renderBody()}
      </DialogModal>
    )
  }
}

// export default AssetManager
export default withTranslation()(AssetManager)
