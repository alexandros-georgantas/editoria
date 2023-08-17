/* eslint-disable react/prop-types */
import React from 'react'
import { sortBy, forEach } from 'lodash'
import {withTranslation} from "react-i18next";
import UploadButton from './UploadButton'

class UploadFilesButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0,
      uploading: false,
    }
  }

  onChange = event => {
    event.preventDefault()

    const { book, onWarning, uploadBookComponent,t } = this.props
    const originalFiles = event.target.files

    forEach(originalFiles, element => {
      const extension = element.name.split('.')[1]
      const warningText = t('one_or_more_of_the_selected_files_have_unsupported_extensions. try_to_use_only_files_with_extension .docx')

      if (extension !== 'docx') {
        return onWarning(
          warningText,
        )
      }

      return true
    })

    const files = sortBy(originalFiles, 'name') // ensure order
    this.setState({ uploading: true, counter: files.length })

    const bookComponentFiles = files.map(file => ({
      file,
      bookId: book.id,
    }))

    uploadBookComponent({
      variables: {
        bookComponentFiles,
      },
    })
      .then(() => {
        this.setState({
          counter: 0,
          uploading: false,
        })
      })
      .catch(res => {
        this.setState({
          counter: 0,
          uploading: false,
        })
        return onWarning(
          t('one_or_more_of_the_selected_files_faced_issues_in_conversion'),
        )
      })

    return true
  }

  render() {
    const { uploading, counter } = this.state
    const {t} = this.props

    let labelText = t('upload_word_files')

    if (counter > 1) {
      // labelText = `Converting ${counter} files`
      labelText = `${t("converting_{counter}_files",counter)}`
    } else if (counter === 1) {
      // labelText = `Converting ${counter} file`
      labelText = `${t("converting_{counter}_file")}`
    }

    return (
      <UploadButton
        accept=".docx"
        disabled={uploading}
        id="generic"
        label={labelText}
        multiple
        onChange={this.onChange}
      />
    )
  }
}

// export default UploadFilesButton
export default withTranslation()(UploadFilesButton);
