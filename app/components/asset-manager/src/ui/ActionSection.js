import React from 'react'
import styled from 'styled-components'
import { th, darken, grid } from '@pubsweet/ui-toolkit'

import { withTranslation } from 'react-i18next'
import UploadFilesButton from './UploadFilesButton'
import { Button } from '../../../../ui'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 10%;
  justify-content: flex-start;
  width: 100%;

  button:not(:last-child) {
    margin-right: ${grid(1)};
  }
`

const WarningAlert = styled.div`
  background: ${darken('colorError', 30)};
  color: ${th('colorTextReverse')};
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  width: 100%;
`

const SecondaryAction = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

/* eslint-disable react/prop-types */
class ActionSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldWarn: false,
    }

    this.handleShouldWarn = this.handleShouldWarn.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleShouldWarn() {
    const { shouldWarn } = this.state
    this.setState({ shouldWarn: !shouldWarn })
  }

  handleDelete() {
    const { deleteHandler } = this.props
    deleteHandler()
    this.handleShouldWarn()
  }

  render() {
    const { shouldWarn } = this.state

    const {
      shouldShowDelete,
      shouldShowImport,
      uploadHandler,
      importHandler,
      deleteDisabled,
      importDisabled,
      t,
    } = this.props

    return (
      <Wrapper>
        {shouldWarn ? (
          <WarningAlert>
            {t('are_you_sure_you_want_to_proceed_with_this_action?')}
            {'   '}
            <SecondaryAction onClick={this.handleDelete}>
              {t('yes')}
            </SecondaryAction>{' '}
            |{'   '}
            <SecondaryAction onClick={this.handleShouldWarn}>
              {t('no')}
            </SecondaryAction>
          </WarningAlert>
        ) : (
          <>
            <UploadFilesButton handler={uploadHandler} />
            {shouldShowImport && (
              <Button
                disabled={importDisabled}
                label="Insert Image/s"
                onClick={importHandler}
                title="Insert Image/s"
              />
            )}
            {shouldShowDelete && (
              <Button
                danger
                disabled={deleteDisabled}
                label="Delete Selected"
                onClick={this.handleShouldWarn}
                title="Delete Selected"
              />
            )}
          </>
        )}
      </Wrapper>
    )
  }
}

export default withTranslation()(ActionSection)
