/* eslint-disable react/prop-types,react/no-unused-state,func-names */

import React from 'react'
import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import { filter, findIndex, find, cloneDeep, uniqueId, isEmpty } from 'lodash'
import { Formik } from 'formik'
import Select from 'react-select'
import { withTranslation } from 'react-i18next'
import i18next from 'i18next'
import FormModal from '../../../../../common/src/FormModal'
import { UploadFilesButton, UploadThumbnail } from '../..'

import { Button, Icons } from '../../../../../../ui'

const { deleteIcon } = Icons

const selectOptions = [
  { label: 'EPUB', value: 'epub' },
  { label: 'PagedJS', value: 'pagedjs' },
]

const noteSelectOptions = () => {
  // const {t} = this.props // useTranslation()
  return [
    {
      label: i18next.t('Footnotes'.toLowerCase().replace(/ /g, '_')),
      value: 'footnotes',
    },
    {
      label: i18next.t('Endnotes'.toLowerCase().replace(/ /g, '_')),
      value: 'endnotes',
    },
    {
      label: i18next.t('Chapter end notes'.toLowerCase().replace(/ /g, '_')),
      value: 'chapterEnd',
    },
  ]
}

const StyledFormik = styled(Formik)`
  width: 100%;
`

const Body = styled.div`
  align-items: center;
  display: flex;
  height: calc(100% - 26px);
  justify-content: center;
  width: 100%;
`

const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 100%;

  > button {
    margin-right: ${grid(1)};
  }
`

const Input = styled.input`
  border: 0;
  border-bottom: 1px dashed
    ${({ errors, errorId, touched }) =>
      errors[errorId] && touched[errorId] ? th('colorError') : th('colorText')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  outline: 0;
  padding: 0;
  width: 100%;

  &:focus {
    border-bottom: 1px dashed ${th('colorPrimary')};
    outline: 0;
  }

  &:placeholder-shown {
    font-size: ${th('fontSizeBase')};
    line-height: ${th('lineHeightBase')};
  }
`

const Text = styled.div`
  color: #404040;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  margin-right: calc(3 * ${th('gridUnit')});
  min-width: 55px;
`

const Error = styled.div`
  color: ${th('colorError')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  height: ${th('lineHeightBase')};
  line-height: ${th('lineHeightBase')};
  min-height: ${th('lineHeightBase')};
  width: 100%;
`

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  height: 90%;
  justify-content: space-between;
  width: 90%;
`

const Side1 = styled.div`
  display: flex;
  flex-basis: 8%;
  height: 100%;
`

const Side2 = styled.div`
  display: flex;
  flex-basis: 65%;
  flex-direction: column;
  height: 100%;
`

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const FormField = styled.div`
  align-items: flex-start;
  display: flex;
  font-family: ${th('fontInterface')};
  margin-bottom: calc(1 * ${th('gridUnit')});
  width: ${({ notFull }) => (notFull ? '98%' : '100%')};
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: calc(100% - 24px);
  width: 100%;
`

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Filename = styled(Text)`
  flex-grow: 1;
`

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
`

const Image = styled.img`
  height: 266px;
  margin-bottom: ${grid(1)};
  width: 188px;
`

class TemplateModal extends React.Component {
  constructor(props) {
    super(props)

    const { data, template } = props
    const { mode } = data

    this.updateFileList = this.updateFileList.bind(this)
    this.updateThumbnail = this.updateThumbnail.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.removeThumbnail = this.removeThumbnail.bind(this)
    this.handleSelectNotes = this.handleSelectNotes.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectScripts = this.handleSelectScripts.bind(this)

    if (mode === 'create') {
      this.state = {
        error: false,
        name: undefined,
        thumbnailPreview: undefined,
        files: [],
        mode,
        target: undefined,
        notes: undefined,
        exportScripts: [],
      }
    } else {
      const {
        name,
        files,
        thumbnail,
        target,
        author,
        trimSize,
        notes,
        exportScripts,
      } = template

      this.state = {
        error: false,
        deleteThumbnail: undefined,
        deleteFiles: [],
        name,
        author,
        trimSize,
        thumbnail,
        thumbnailPreview: thumbnail ? thumbnail.url : undefined,
        files: cloneDeep(files),
        mode,
        target: target ? find(selectOptions, { value: target }) : undefined,
        notes: notes ? find(noteSelectOptions(), { value: notes }) : undefined,
        exportScripts,
      }
    }
  }

  handleSelect(selected, setFieldValue, setFieldTouched) {
    this.setState({ target: selected })
    setFieldValue('target', selected)
    setFieldTouched('target', true)
  }

  handleSelectNotes(selected, setFieldValue, setFieldTouched) {
    this.setState({ notes: selected })
    setFieldValue('notes', selected)
    setFieldTouched('notes', true)
  }

  handleSelectScripts(selected, setFieldValue, setFieldTouched) {
    if (!selected) {
      this.setState({
        exportScripts: [],
      })
      setFieldValue('exportScripts', [])
      setFieldTouched('exportScripts', true)
    } else {
      setFieldValue('exportScripts', selected)
      setFieldTouched('exportScripts', true)
      this.setState({
        exportScripts: selected,
      })
    }
  }

  updateFileList(fileList, setFieldValue, setFieldTouched) {
    const { files } = this.state
    const tempFiles = cloneDeep(files)
    const selectedFiles = tempFiles

    for (let i = 0; i < fileList.length; i += 1) {
      selectedFiles.push(fileList.item(i))
    }

    this.setState({ files: selectedFiles })
    setFieldValue('files', selectedFiles)
    setFieldTouched('files', true)
  }

  updateThumbnail(file, setFieldValue, setFieldTouched) {
    const { thumbnail, mode } = this.state
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function (e) {
      let newState

      if (mode === 'update') {
        newState = {
          thumbnailPreview: reader.result,
          deleteThumbnail: thumbnail ? thumbnail.id : undefined,
          thumbnail: file,
        }
      } else {
        newState = { thumbnailPreview: reader.result, thumbnail: file }
      }

      this.setState(newState)
      setFieldValue('thumbnail', file)
      setFieldTouched('thumbnail', true)
    }.bind(this)
  }

  removeFile(filename, setFieldValue, setFieldTouched) {
    const { files, mode, deleteFiles } = this.state
    let newState
    const originalClonedFiles = cloneDeep(files)
    const tempFiles = cloneDeep(files)
    const tempDeleted = cloneDeep(deleteFiles)
    const fileIndex = findIndex(tempFiles, { name: filename })

    if (mode === 'update' && tempFiles[fileIndex].id) {
      const { id } = tempFiles[fileIndex]
      tempDeleted.push(id)
      originalClonedFiles.splice(fileIndex, 1)

      newState = {
        deleteFiles: tempDeleted,
        files: originalClonedFiles,
      }
    } else {
      originalClonedFiles.splice(fileIndex, 1)
      newState = {
        files: originalClonedFiles,
      }
    }

    setFieldValue('files', originalClonedFiles)
    this.setState(newState)
    setFieldTouched('files', true)
  }

  removeThumbnail(setFieldValue, setFieldTouched) {
    const { thumbnail, mode } = this.state
    let newState
    setFieldValue('thumbnail', null)

    if (mode === 'update') {
      newState = {
        deleteThumbnail: thumbnail.id,
        thumbnailPreview: undefined,
        thumbnail: undefined,
      }
    } else {
      newState = {
        thumbnailPreview: undefined,
        thumbnail: undefined,
      }
    }

    this.setState(newState)
    setFieldTouched('thumbnail', true)
  }

  renderFiles(setFieldValue, setFieldTouched) {
    const { t } = this.props
    const { files } = this.state

    if (!files || files.length === 0) {
      return (
        <FormField>
          <Filename>
            {t(
              'No files selected'
                .toLowerCase()
                .toLowerCase()
                .replace(/ /g, '_'),
            )}
          </Filename>
        </FormField>
      )
    }

    return (
      <FileList>
        {files.map(file => (
          <FormField key={`${file.name}-${uniqueId()}`} notFull>
            <Filename>
              {file.extension
                ? `${file.name}.${file.extension}`
                : `${file.name}`}
            </Filename>
            <Button
              danger
              icon={deleteIcon}
              onClick={e => {
                e.preventDefault()
                this.removeFile(file.name, setFieldValue, setFieldTouched)
              }}
              title="Delete File"
            />
          </FormField>
        ))}
      </FileList>
    )
  }

  renderBody() {
    const { data, t } = this.props
    const { onConfirm, hideModal, mode, scriptOptions } = data

    const {
      thumbnailPreview,
      thumbnail,
      trimSize,
      author,
      name,
      files,
      target,
      notes,
      exportScripts,
    } = this.state

    const confirmLabel = mode === 'create' ? 'Save' : 'Update'
    const cancelLabel = 'Cancel'
    let filteredScriptOptions = []

    if (target) {
      filteredScriptOptions = scriptOptions.filter(script => {
        const { value } = script
        const tokens = value.split('-')
        return tokens[1].toLowerCase() === target.value.toLowerCase()
      })
    }

    let initialValues

    if (mode === 'create') {
      initialValues = {
        name: undefined,
        files: [],
        thumbnail: undefined,
        target: undefined,
        notes: undefined,
        author: undefined,
        trimSize: undefined,
        exportScripts: [],
      }
    } else {
      initialValues = {
        name,
        files,
        thumbnail,
        target,
        notes,
        author,
        trimSize,
        exportScripts,
      }
    }

    return (
      <StyledFormik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          const {
            name: nameFromValues,
            author: authorFromValues,
            trimSize: trimSizeFromValues,
            files: filesFromValues,
            thumbnail: thumbnailFromValues,
            target: targetFromValues,
            notes: notesFromValues,
            exportScripts: exportScriptsFromValues,
          } = values

          const {
            deleteFiles,
            deleteThumbnail,
            mode: modeFromState,
          } = this.state

          let dataIn

          if (modeFromState === 'create') {
            dataIn = {
              name: nameFromValues,
              author: authorFromValues,
              trimSize: trimSizeFromValues,
              files: filesFromValues,
              thumbnail: thumbnailFromValues,
              target: targetFromValues ? targetFromValues.value : undefined,
              notes: notesFromValues ? notesFromValues.value : undefined,
              exportScripts: exportScriptsFromValues,
            }
          } else {
            dataIn = {
              name: nameFromValues,
              author: authorFromValues,
              trimSize: trimSizeFromValues,
              deleteFiles,
              deleteThumbnail,
              files: filter(filesFromValues, file => !file.id),
              thumbnail:
                thumbnailFromValues && thumbnailFromValues.id
                  ? null
                  : thumbnailFromValues,
              target: targetFromValues ? targetFromValues.value : undefined,
              notes: notesFromValues ? notesFromValues.value : undefined,
              exportScripts: exportScriptsFromValues,
            }
          }

          onConfirm(dataIn)
          setSubmitting(false)
        }}
        validate={values => {
          const errors = {}
          const { files: filesFromState } = this.state

          if (!values.name || values.name === '') {
            errors.name = t('* the_name_of_the_template_should_not_be_empty')
          }

          if (values.files.length > 0) {
            let stylesheetCounter = 0

            // const { files } = values
            for (let i = 0; i < filesFromState.length; i += 1) {
              if (
                filesFromState[i].type === 'text/css' ||
                filesFromState[i].mimetype === 'text/css'
              ) {
                stylesheetCounter += 1
              }
            }

            if (stylesheetCounter > 1) {
              errors.files = t(
                '* only_one_stylesheet_can_be_uploaded_per_template',
              )
            }
          }

          if (!values.target) {
            errors.target = t(
              '* the_target_of_the_template_should_not_be_empty',
            )
          }

          if (!values.notes) {
            errors.notes = t(
              '* the_notes_type_of_the_template_should_not_be_empty',
            )
          }

          if (values.exportScripts.length > 0) {
            if (!values.target.value) {
              errors.exportScripts = t('* you_have_to_select_a_target_first')
            } else {
              for (let i = 0; i < values.exportScripts.length; i += 1) {
                const { value } = values.exportScripts[i]
                const tokens = value.split('-')

                if (tokens[1].toLowerCase() !== target.value.toLowerCase()) {
                  errors.exportScripts = t(
                    '* the_scope_of_the_scripts_should_match_the_selected_target',
                  )
                }
              }
            }
          }

          return errors
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          validateForm,
          isValid,
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Body>
              <Container>
                <Side1>
                  {!thumbnailPreview && (
                    <UploadThumbnail
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      updateThumbnail={this.updateThumbnail}
                      withIcon
                    />
                  )}

                  {thumbnailPreview && (
                    <ThumbnailContainer>
                      <Image
                        alt={t("template's_thumbnail")}
                        src={thumbnailPreview}
                      />
                      <UploadThumbnail
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        updateThumbnail={this.updateThumbnail}
                      />
                      <Button
                        danger
                        label="Delete Thumbnail"
                        onClick={e => {
                          e.preventDefault()
                          this.removeThumbnail(setFieldValue, setFieldTouched)
                        }}
                        title="Delete Thumbnail"
                      />
                    </ThumbnailContainer>
                  )}
                </Side1>
                <Side2>
                  <FormField>
                    <Text>{t('name_*')}</Text>
                    <FormFieldContainer>
                      <Input
                        errorId="name"
                        errors={errors}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyPress={e => {
                          e.key === 'Enter' && e.preventDefault()
                        }}
                        placeholder={t('eg. booksprints')}
                        touched={touched}
                        type="text"
                        value={values.name || ''}
                      />
                      <Error>{touched.name ? errors.name : ''}</Error>
                    </FormFieldContainer>
                  </FormField>
                  <FormField>
                    <Text>{t('author')}</Text>
                    <FormFieldContainer>
                      <Input
                        errorId="author"
                        errors={errors}
                        name="author"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyPress={e => {
                          e.key === 'Enter' && e.preventDefault()
                        }}
                        placeholder={t('eg._john_smith')}
                        touched={touched}
                        type="text"
                        value={values.author || ''}
                      />
                      <Error>{touched.author ? errors.author : ''}</Error>
                    </FormFieldContainer>
                  </FormField>
                  {/* <FormField>
                    <Text>Trim Size</Text>
                    <FormFieldContainer>
                      <Input
                        errorId="trimSize"
                        errors={errors}
                        name="trimSize"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyPress={e => {
                          e.key === 'Enter' && e.preventDefault()
                        }}
                        placeholder="eg. 181 x 111 mm"
                        touched={touched}
                        type="text"
                        value={values.trimSize}
                      />
                      <Error>{errors.trimSize}</Error>
                    </FormFieldContainer>
                  </FormField> */}
                  <FormField>
                    <Text>{t('target *')}</Text>
                    <FormFieldContainer>
                      <Select
                        noOptionsMessage={() => t('no_options')}
                        onChange={selected => {
                          this.handleSelect(
                            selected,
                            setFieldValue,
                            setFieldTouched,
                          )
                        }}
                        options={selectOptions}
                        placeholder={t('select')}
                        value={values.target}
                      />
                      <Error>{touched.target ? errors.target : ''}</Error>
                    </FormFieldContainer>
                  </FormField>
                  <FormField>
                    <Text>{t('scripts')}</Text>
                    <FormFieldContainer>
                      <Select
                        isDisabled={!values.target}
                        isMulti
                        noOptionsMessage={() => t('no_options')}
                        onChange={selected => {
                          this.handleSelectScripts(
                            selected,
                            setFieldValue,
                            setFieldTouched,
                          )
                        }}
                        options={filteredScriptOptions}
                        placeholder={t('select')}
                        value={values.exportScripts}
                      />
                      <Error>
                        {touched.exportScripts ? errors.exportScripts : ''}
                      </Error>
                    </FormFieldContainer>
                  </FormField>
                  <FormField>
                    <Text>{t('notes_*')}</Text>
                    <FormFieldContainer>
                      <Select
                        noOptionsMessage={() => t('no_options')}
                        onChange={selected => {
                          this.handleSelectNotes(
                            selected,
                            setFieldValue,
                            setFieldTouched,
                          )
                        }}
                        options={noteSelectOptions()}
                        placeholder={t('select')}
                        value={values.notes}
                      />
                      <Error>{touched.notes ? errors.notes : ''}</Error>
                    </FormFieldContainer>
                  </FormField>
                  <FormField>
                    <Text>{t('files')}</Text>

                    <UploadFilesButton
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      updateFilesList={this.updateFileList}
                    />
                  </FormField>
                  <Error>{touched.files ? errors.files : ''}</Error>
                  {this.renderFiles(setFieldValue, setFieldTouched)}
                </Side2>
              </Container>
            </Body>
            <Footer>
              <Button
                disabled={isSubmitting || !isEmpty(errors) || isEmpty(touched)}
                label={confirmLabel}
                title={confirmLabel}
                type="submit"
              />
              <Button
                danger
                label={cancelLabel}
                onClick={hideModal}
                title={cancelLabel}
              />
            </Footer>
          </StyledForm>
        )}
      </StyledFormik>
    )
  }

  render() {
    const { isOpen, hideModal, data, t } = this.props
    const { headerText } = data

    const body = this.renderBody()

    return (
      <FormModal
        headerText={t(headerText)}
        isOpen={isOpen}
        onRequestClose={hideModal}
        size="largeNarrow"
      >
        {body}
      </FormModal>
    )
  }
}

export default withTranslation()(TemplateModal)
