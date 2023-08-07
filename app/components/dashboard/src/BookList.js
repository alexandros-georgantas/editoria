/* eslint-disable react/prop-types */
import { isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Loading from '../../../ui/Loading'

import Book from './Book'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const BookList = props => {
  const {
    books,
    loading,
    renameBook,
    remove,
    archiveBook,
    onDeleteBook,
    onArchiveBook,
    canAssignMembers,
    onAssignMembers,
    bookRules,
  } = props

  const { t } = useTranslation()

  if (loading) return <Loading />

  if (isEmpty(books)) {
    return (
      <div>
        {t('there_are_no_books_to_display')}
        {/* There are no books to display. */}
      </div>
    )
  }

  return (
    <Wrapper>
      {books.map(book => (
        <Book
          archiveBook={archiveBook}
          book={book}
          bookRule={bookRules.find(bookRule => bookRule.id === book.id)}
          canAssignMembers={canAssignMembers}
          key={book.id}
          onArchiveBook={onArchiveBook}
          onAssignMembers={onAssignMembers}
          onDeleteBook={onDeleteBook}
          remove={remove}
          renameBook={renameBook}
        />
      ))}
    </Wrapper>
  )
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  remove: PropTypes.func.isRequired,
  renameBook: PropTypes.func.isRequired,
}

export default BookList
