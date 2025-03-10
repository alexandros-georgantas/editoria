/* eslint-disable react/prop-types */
/* stylelint-disable string-quotes,font-family-no-missing-generic-family-keyword,declaration-no-important */
import { get } from 'lodash'
import React from 'react'
import styled, { css } from 'styled-components'
import { Action as UIAction, ActionGroup as UIActionGroup } from '@pubsweet/ui'

import { useTranslation } from 'react-i18next'
import EditingNotification from './EditingNotification'

const underlineFade = css`
  &::before {
    opacity: 0;
    transition: 0.2s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`

const underlineAnimation = css`
  ${underlineFade};
  position: relative;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }

  &::before {
    background-color: #0d78f2;
    bottom: 0;
    content: '';
    display: block;
    height: 2px;
    left: 0;
    margin: 0 8px;
    position: absolute;
    right: 0;
    visibility: hidden;
  }

  &:hover::before {
    visibility: visible;
  }
`

const Action = styled(UIAction)`
  background: none !important;
  color: #0d78f2 !important;
  font-family: 'Fira Sans Condensed' !important;
  font-size: 16px;
  font-weight: normal;
  min-width: 51px;
  text-decoration: none !important;
  text-transform: none;
  transition: 0.2s ease !important;

  &:hover,
  &:focus,
  &:active {
    background: none;
    color: #0d78f2;
    font-weight: normal;
    outline: 0;
    text-decoration: underline;
  }
`

const ActionGroup = styled(UIActionGroup)`
  align-items: center;
  display: flex;
  flex-basis: ${({ isToplevel, lock }) => {
    if (isToplevel) {
      if (!lock) {
        return '9.5%'
      }

      return '9.4%'
    }

    return '10%'
  }};
  flex-shrink: 0;
  justify-content: center;

  div {
    border-right: 2px solid #aaa;
    display: inline-block;
    ${underlineAnimation};
    padding: 0 8px;
  }

  > * {
    &:last-child {
      border-right: 0;
      padding-right: 0;

      &::before {
        margin-right: 0;
      }
    }
  }
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 10%;
  justify-content: center;
`

const BookComponentActions = ({
  componentType,
  currentUser,
  uploading,
  bookComponentId,
  onDeleteBookComponent,
  bookId,
  lock,
  history,
  isToplevel,
  title,
  onAdminUnlock,
  rules,
}) => {
  const { t } = useTranslation()
  const { bookComponentStateRules, canViewDeleteAction } = rules

  const { canViewFragmentEdit } =
    bookComponentStateRules.find(
      bookComponentState =>
        bookComponentState.bookComponentId === bookComponentId,
    ) || {}

  const isLocked = get(lock, 'username')

  const handleClick = () => {
    onDeleteBookComponent(bookComponentId, componentType, title)
  }

  const goToEditor = (preview = undefined) => {
    if (uploading) return

    if (preview) {
      // history.push(`/books/${bookId}/bookComponents/${bookComponentId}/preview`)
      history.push(`/books/${bookId}/bookComponents/${bookComponentId}`)
    } else {
      history.push(`/books/${bookId}/bookComponents/${bookComponentId}`)
    }
  }

  if (componentType === 'toc') return null

  if (!isLocked) {
    return (
      <ActionGroup
        componentType={componentType}
        isToplevel={isToplevel}
        lock={lock}
      >
        {componentType !== 'endnotes' && (
          <Action disabled={uploading} onClick={() => goToEditor()}>
            {canViewFragmentEdit ? t('edit') : t('view')}
          </Action>
        )}
        <Action
          disabled={uploading || !canViewDeleteAction}
          onClick={handleClick}
        >
          {t('delete')}
        </Action>
      </ActionGroup>
    )
  }

  return (
    <Container>
      <EditingNotification
        bookComponentId={bookComponentId}
        componentType={componentType}
        currentUser={currentUser}
        goToEditor={goToEditor}
        isToplevel={isToplevel}
        lock={lock}
        onAdminUnlock={onAdminUnlock}
        title={title}
      />
    </Container>
  )
}

export default BookComponentActions
