import React from 'react'
import { mimetypeHelpers } from '../../../common'

import UploadButton from './UploadButton'
import {withTranslation} from "react-i18next";

const { assetManagerFileExtensions } = mimetypeHelpers
/* eslint-disable react/prop-types */
class UploadFilesButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      uploading: false,
    }
  }

  handleFilesUpload = e => {
    e.preventDefault()
    const { handler } = this.props
    const { target } = e
    const { files } = target
    const self = this

    this.setState({ uploading: true })
    handler(files).then(() => {
      self.setState({ uploading: false })
      // target.value = ''
    })
  }

  render() {
    const { uploading } = this.state

    const {t} = this.props

    const labelText = uploading ? t('Uploading...') : t('upload_images')

    return (
      <UploadButton
        accept={assetManagerFileExtensions}
        disabled={uploading}
        id="assets"
        label={labelText}
        multiple
        onChange={this.handleFilesUpload}
      />
    )
  }
}

export default withTranslation()(UploadFilesButton)
