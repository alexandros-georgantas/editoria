/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import find from 'lodash/find'
import { th } from '@pubsweet/ui-toolkit'
import map from 'lodash/map'
import { Trans, withTranslation } from 'react-i18next'
import DialogModal from '../../../../../common/src/DialogModal'

import WrappedSelect from '../WrappedSelect'
import { DefaultButton } from '../Button'

const BookTitle = styled.div`
  color: #404040;
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeHeading5')};
  line-height: ${th('lineHeightHeading5')};
  margin-bottom: calc(${th('gridUnit')} * 4);
  text-align: center;
  width: 80%;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`

const ModeRow = styled.div`
  align-items: center;
  border: 1px solid #828282;
  display: flex;
  justify-content: center;
  margin-bottom: calc(${th('gridUnit')} * 4);
`

const FormatRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: calc(${th('gridUnit')} * 3);
`

const TemplateRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: calc(${th('gridUnit')} * 1);
`

const TemplateLabel = styled.span`
  color: #3f3f3f;
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeBase')};
  font-style: normal;
  font-weight: normal;
  line-height: ${th('lineHeightBase')};
  margin-right: calc(${th('gridUnit')} * 2);
  text-align: center;
`

const StyledButton = styled(DefaultButton)`
  background: ${({ active }) => (active ? th('colorPrimary') : 'none')};
  color: ${({ active }) => (active ? 'white' : '#828282')};
  justify-content: center;
  width: 100px;

  &:hover {
    background: ${th('colorPrimary')};

    div {
      color: white;
    }
  }
`

const StyledSelect = styled(WrappedSelect)`
  .react-select__control {
    border: 0;
    border-bottom: 1px solid #3f3f3f;
    border-radius: 0;
    box-shadow: none;
    outline: 0;
    width: ${({ size }) => (size === 'small' ? '60px' : '200px')};

    &:hover {
      border-bottom: 1px solid ${th('colorPrimary')};
    }
  }

  .react-select__value-container {
    color: #3f3f3f;
    font-family: ${th('fontHeading')};
    font-size: ${th('fontSizeBase')};
    font-style: normal;
    font-weight: normal;
    line-height: ${th('lineHeightBase')};
    padding: 0;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__menu-list {
    color: #3f3f3f;
    font-family: ${th('fontHeading')};
    font-size: ${th('fontSizeBase')};
    font-style: normal;
    font-weight: normal;
  }
`

const FormatLabel = styled.div`
  color: #828282;
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeHeading5')};
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.11em;
  line-height: ${th('lineHeightHeading5')};
  margin-bottom: calc(${th('gridUnit')} * 1);
  text-transform: uppercase;
`

const InfoContainer = styled.div`
  color: #3f3f3f;
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeBase')};
  font-style: italic;
  font-weight: normal;
  height: 50px;
  line-height: ${th('lineHeightBase')};
  margin-bottom: calc(${th('gridUnit')} * 2);
  text-align: center;
  width: 60%;
`

const RadioButton = styled.label`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-right: ${({ last }) => (last ? 0 : `calc(8px * 8)`)};

  span {
    color: #3f3f3f;
    font-family: ${th('fontHeading')};
    font-size: ${th('fontSizeBase')};
    line-height: ${th('lineHeightBase')};
    margin-left: calc(${th('gridUnit')});
  }
`

const optionsFormatter = options => {
  const { data } = options
  const { getTemplates } = data
  return map(getTemplates, template => ({
    value: template.id,
    label: template.name,
  }))
}

const extractTemplates = res => {
  const { data } = res
  const { getTemplates } = data
  return getTemplates
}

const targetMapper = {
  epub: 'epub',
  pdf: 'pagedjs',
  pagedjs: 'pagedjs',
}

class ExportBookModal extends React.Component {
  constructor(props) {
    super(props)
    this.renderFormatOptions = this.renderFormatOptions.bind(this)
    this.renderTemplateSection = this.renderTemplateSection.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.changeRadioOption = this.changeRadioOption.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      mode: 'preview',
      selectOptions: [],
      selectedValue: null,
      viewer: 'pagedjs',
      templateId: undefined,
      templates: [],
      hasEndnotes: false,
      validating: false,
      generating: false,
      format: 'epub',
    }
  }

  componentDidMount() {
    const { viewer } = this.state
    const { data } = this.props
    const { getTemplates } = data

    getTemplates(targetMapper[viewer]).then(res =>
      this.setState({
        selectOptions: optionsFormatter(res),
        selectedValue: null,
        templates: extractTemplates(res),
      }),
    )
  }

  componentDidUpdate(_, prevState) {
    const { mode: prevMode } = prevState
    const { mode, viewer, format } = this.state
    const { data } = this.props
    const { getTemplates } = data
    const modeChanged = prevMode !== mode

    if (modeChanged) {
      if (mode === 'preview') {
        return getTemplates(targetMapper[viewer]).then(res =>
          this.setState({
            selectOptions: optionsFormatter(res),
            selectedValue: null,
            templates: extractTemplates(res),
          }),
        )
      }

      return getTemplates(targetMapper[format]).then(res =>
        this.setState({
          selectOptions: optionsFormatter(res),
          selectedValue: null,
          templates: extractTemplates(res),
        }),
      )
    }

    return false
  }

  handleSubmit() {
    const { mode, viewer, format, templateId } = this.state
    const { data } = this.props
    const { onConfirm } = data

    if (!templateId && format !== 'icml') return false

    if (format === 'epub') {
      this.setState({ validating: true })
    }

    if (format === 'pdf' || format === 'icml') {
      this.setState({ generating: true })
    }

    return onConfirm(mode, viewer, templateId, format)
  }

  onChange(selection) {
    const { value } = selection
    const { templates } = this.state

    const selectedTemplate = find(templates, { id: value })

    const hasEndnotes = selectedTemplate.notes === 'endnotes'
    this.setState({ templateId: value, selectedValue: selection, hasEndnotes })
  }

  changeMode(mode) {
    this.setState({
      mode,
      viewer: 'pagedjs',
      templateId: undefined,
      selectedValue: null,
      hasEndnotes: false,
      format: 'epub',
    })
  }

  changeRadioOption(e) {
    const { mode } = this.state
    const { data } = this.props
    const { getTemplates } = data
    const { target } = e
    const { value } = target

    if (mode === 'preview') {
      this.setState({
        viewer: value,
        templateId: undefined,
        selectedValue: null,
        hasEndnotes: false,
      })
    } else {
      this.setState({
        format: value,
        templateId: undefined,
        selectedValue: null,
        hasEndnotes: false,
      })
    }

    return getTemplates(targetMapper[value]).then(res =>
      this.setState({
        selectOptions: optionsFormatter(res),
        selectedValue: null,
        templates: extractTemplates(res),
      }),
    )
  }

  renderTemplateSection() {
    const { mode, format, selectOptions, selectedValue, hasEndnotes } =
      this.state

    const { t } = this.props

    if (mode === 'download' && format === 'icml') {
      return null
    }

    return (
      <>
        <TemplateRow>
          <TemplateLabel>{t('template')}</TemplateLabel>
          <StyledSelect
            isClearable={false}
            isDisabled={false}
            isLoading={false}
            isSearchable={false}
            noOptionsMessage={() => t('no_options')}
            onChange={this.onChange}
            options={selectOptions}
            value={selectedValue}
          />
        </TemplateRow>
        {hasEndnotes && (
          <InfoContainer>
            <Trans i18nKey="you_have_selected_a_template_where_the_notes_of_each_book_component_will_be_gathered_and_placed_at_the_backmatter_of_the_book">
              You have selected a template where the notes of each book
              component will be gathered and placed at the Backmatter of the
              book
            </Trans>
          </InfoContainer>
        )}
      </>
    )
  }

  renderFormatOptions() {
    const { mode, viewer, format } = this.state
    const { t } = this.props

    /*
    const textMapper = {
      epub: 'You are about to export a valid EPUB v3 file.',
      icml: 'You will get a compressed zip file containing all images used in the book and the ICML file ready to be imported in Adobe inDesign.',
      pdf: 'Using PagedJS, we’ll generate a PDF version of your book',
      pagedjs: 'View your book in PagedJS for more granular styles tunning',
    }
    */
    const textMapper = {
      epub: t('you_are_about_to_export_a_valid_epub_v_3_file.'),
      icml: t('you_will_get_a_compressed_zip_file_containing_all_images'),
      pdf: t('using_paged_js, we’ll_generate_a_pdf_version_of_your_book'),
      pagedjs: t('view_your_book_in_paged_js_for_more_granular_styles_tunning'),
    }

    if (mode === 'download') {
      return (
        <>
          {/* <FormatLabel>Format</FormatLabel> */}
          <FormatLabel>{t('format')}</FormatLabel>
          <FormatRow>
            <RadioButton>
              <input
                checked={format === 'epub'}
                name="epub"
                onChange={this.changeRadioOption}
                type="radio"
                value="epub"
              />
              <span>{t('epub')}</span>
            </RadioButton>
            <RadioButton>
              <input
                checked={format === 'pdf'}
                name="pdf"
                onChange={this.changeRadioOption}
                type="radio"
                value="pdf"
              />
              <span>{t('pdf')}</span>
            </RadioButton>
            <RadioButton last>
              <input
                checked={format === 'icml'}
                name="icml"
                onChange={this.changeRadioOption}
                type="radio"
                value="icml"
              />
              <span>{t('icml')}</span>
            </RadioButton>
          </FormatRow>
          <InfoContainer>{textMapper[format]}</InfoContainer>
        </>
      )
    }

    return (
      <>
        <FormatLabel>
          <Trans i18nKey="viewer">Viewer</Trans>
        </FormatLabel>
        <FormatRow>
          <RadioButton last>
            <input
              checked={viewer === 'pagedjs'}
              name="pagedjs"
              onChange={this.changeRadioOption}
              type="radio"
              value="pagedjs"
            />
            <span>PagedJS</span>
          </RadioButton>
        </FormatRow>
        <InfoContainer>{textMapper[viewer]}</InfoContainer>
      </>
    )
  }

  render() {
    const { isOpen, hideModal, data, t } = this.props
    const { bookTitle } = data
    const { mode, templateId, format, generating, validating } = this.state
    const mainSection = this.renderFormatOptions()
    const templateSection = this.renderTemplateSection()
    let confirmLabel

    if (generating) {
      confirmLabel = 'Generating'
      // confirmLabel = t('Generating')
    }

    if (validating) {
      confirmLabel = 'Validating'
      // confirmLabel = t('Validating')
    }

    return (
      <DialogModal
        buttonLabel={confirmLabel}
        disableConfirm={
          (!templateId && format !== 'icml') || generating || validating
        }
        headerText={t('EXPORT BOOK')}
        isOpen={isOpen}
        notCentered
        onConfirm={this.handleSubmit}
        onRequestClose={hideModal}
        size="medium_narrow"
      >
        <Container>
          <BookTitle>{bookTitle}</BookTitle>
          <ModeRow>
            <StyledButton
              active={mode === 'preview'}
              label="Preview"
              onClick={() => this.changeMode('preview')}
            />
            <StyledButton
              active={mode === 'download'}
              label="Download"
              last
              onClick={() => this.changeMode('download')}
            />
          </ModeRow>
          {mainSection}
          {templateSection}
        </Container>
      </DialogModal>
    )
  }
}

// export default ExportBookModal
export default withTranslation()(ExportBookModal)
