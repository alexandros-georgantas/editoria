/* eslint-disable react/prop-types */
/* stylelint-disable string-quotes,font-family-no-missing-generic-family-keyword */
// import { includes, some } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { State } from 'react-powerplug'
import { map } from 'lodash'

import { useTranslation } from 'react-i18next'
import BookTitle from './BookTitle'
import BookActions from './BookActions'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  width: 100%;
  /* padding: 0 8px 0 8px; */
`

const TopRow = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Fira Sans Condensed';
  font-size: 14px;
  justify-content: flex-start;
  line-height: 16px;
  margin-left: ${({ archived }) => (archived ? '-26px' : 0)};
`

const Status = styled.span`
  align-items: center;
  color: ${props => (props.isPublished ? '#0964CC' : '#828282')};
  display: inline-flex;
  justify-content: center;
  text-transform: uppercase;
`

const TopRowKey = styled.span`
  color: #aaa;
  padding-right: 4px;
  text-transform: capitalize;
`

const TopRowValue = styled.span`
  color: #666;
  text-transform: capitalize;
`

/*
const TopRowKeyValue = ({ value }) => (
  <>
    <TopRowKey>author</TopRowKey>
    <TopRowValue>{value}</TopRowValue>
  </>
)
*/
const TopRowKeyValue = ({ value }) => {
  const { t } = useTranslation()
  return (
    <>
      <TopRowKey>{t('author')}</TopRowKey>
      <TopRowValue>
        {value.toLowerCase() === 'unassigned' ? t('unassigned') : value}
      </TopRowValue>
    </>
  )
}

const TopRowValuesWrapper = styled.div`
  display: inline-flex;
  padding-left: 8px;

  &::before {
    color: #aaa;
    content: '-';
    padding-right: 8px;
  }
`

const MainRow = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 100%;
`

const ArchivedIndicator = styled.i`
  svg {
    align-self: center;
    height: 24px;
    margin-right: 4px;
    width: 24px;

    #folder {
      fill: #828282;
    }
  }
`

const icon = (
  <svg
    fill="none"
    height="28"
    viewBox="0 0 28 28"
    width="28"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="white" height="28" id="background" width="28" />
    <path d="M9 10H9.94478L12.5539 13.1288H19V17H9V10Z" id="folderFill" />
    <path
      clipRule="evenodd"
      d="M7.6 18.1402C7.6 18.3222 7.7792 18.4706 8 18.4706H20C20.2208 18.4706 20.4 18.3222 20.4 18.1402V11.5714C20.4 11.3886 20.2208 11.2411 20 11.2411H14C13.76 11.2411 13.5328 11.1378 13.3808 10.9596L11.3008 8.52941H8C7.7792 8.52941 7.6 8.677 7.6 8.859V18.1402ZM20 20H8C6.8976 20 6 19.1657 6 18.1402V8.859C6 7.83353 6.8976 7 8 7H11.6808C11.92 7 12.148 7.10247 12.3 7.28065L14.3792 9.71165H20C21.1024 9.71165 22 10.5452 22 11.5714V18.1402C22 19.1657 21.1024 20 20 20Z"
      fillRule="evenodd"
      id="folder"
    />
  </svg>
)

const Author = ({ author }) => <TopRowKeyValue key="author" value={author} />

const TopRowValues = ({ authors }) => {
  if (authors.length === 0)
    return (
      <TopRowValuesWrapper>
        <Author author="Unassigned" />
      </TopRowValuesWrapper>

      /*
            <TopRowValuesWrapper>
                <Author author={t("unassigned")}/>
            </TopRowValuesWrapper>
            */
    )

  return (
    <TopRowValuesWrapper>
      {map(authors, author => {
        if (!author.surname || !author.givenNames) {
          return <Author author={author.username} key={author.username} />
        }

        return (
          <Author
            author={`${author.givenNames} ${author.surname}`}
            key={`${author.givenNames} ${author.surname}`}
          />
        )
      })}
    </TopRowValuesWrapper>
  )
}

const Book = props => {
  const {
    book,
    bookRule,
    renameBook,
    archiveBook,
    onDeleteBook,
    onArchiveBook,
    canAssignMembers,
    onAssignMembers,
  } = props

  const { authors, isPublished, archived } = book

  const { canRenameBooks, canDeleteBooks, canArchiveBooks } = bookRule
  // const featureBookStructureEnabled =
  //   process.env.FEATURE_BOOK_STRUCTURE || false

  const featureBookStructureEnabled =
    (process.env.FEATURE_BOOK_STRUCTURE &&
      JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
    false

  const { t } = useTranslation()

  return (
    <State initial={{ isRenaming: false, showModal: false }}>
      {({ state, setState }) => {
        const { isRenaming } = state

        const onClickRename = () => {
          setState({ isRenaming: true })
        }

        const onClickSave = id => {
          // SUPER HACK -- Needs to be redesigned, but it works for now
          const el = document.getElementById(`renameTitle-${id}`)
          rename(el.value)
        }

        const rename = value => {
          renameBook({
            variables: {
              id: book.id,
              title: value,
            },
          })

          setState({ isRenaming: false })
        }

        let statusLabel

        if (isPublished) {
          if (archived) {
            statusLabel = 'published (archived)'
            // statusLabel = t('published_(archived)')
          } else {
            // statusLabel = t('published')
            statusLabel = 'published'
          }
        } else if (archived) {
          // statusLabel = t('in_progress_(archived)')
          statusLabel = 'in progress (archived)'
        } else {
          // statusLabel = t('in_progress')
          statusLabel = 'in progress'
        }

        let canAct

        if (featureBookStructureEnabled) {
          if (!canDeleteBooks) {
            if (!book.bookStructure.finalized) {
              canAct = false
            } else {
              canAct = true
            }
          }
        }

        return (
          <Wrapper data-cy="book">
            <TopRow archived={archived}>
              <Status isPublished={isPublished}>
                {archived && <ArchivedIndicator>{icon}</ArchivedIndicator>}
                {t(statusLabel.toLowerCase().replace(/ /g, '_'))}
              </Status>

              <TopRowValues authors={authors} />
            </TopRow>

            <MainRow>
              <BookTitle
                archived={archived}
                bookId={book.id}
                canAct={canAct}
                finalized={book.bookStructure?.finalized}
                // onDoubleClick={goToBookBuilder}
                isRenaming={isRenaming}
                rename={rename}
                title={book.title}
              />

              <BookActions
                archiveBook={archiveBook}
                book={book}
                canArchiveBooks={canArchiveBooks}
                canAssignMembers={canAssignMembers}
                canDeleteBooks={canDeleteBooks}
                canRenameBooks={canRenameBooks}
                isRenaming={isRenaming}
                onArchiveBook={onArchiveBook}
                onAssignMembers={onAssignMembers}
                onClickRename={onClickRename}
                onClickSave={() => onClickSave(book.id)}
                onDeleteBook={onDeleteBook}
              />
            </MainRow>
          </Wrapper>
        )
      }}
    </State>
  )
}

/* eslint-disable react/forbid-prop-types */
Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    rev: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  renameBook: PropTypes.func.isRequired,
}

export default withRouter(Book)
