import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { indexOf } from 'lodash'

import { useTranslation } from 'react-i18next'
import { dateTimeFormatter, fileSizeFormatter } from './helpers'
import IconButton from './IconButton'
import { Loading } from '../../../../ui'

const TableWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  overflow-y: auto;
  width: ${({ selected }) => (selected ? `${65}%` : '100%')};
`

const TableHead = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
`

const TableHeadCell = styled.div`
  align-items: center;
  background: ${th('colorFurniture')};
  display: flex;
  flex-basis: ${({ width }) => (width ? `${width}%` : '33.33%')};
  justify-content: space-between;
  padding: 8px;
`

const HeaderLabel = styled.div`
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
`

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TableBodyEmpty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeBase')};
  justify-content: center;
  line-height: ${th('lineHeightBase')};
  margin-top: calc(2 * ${th('gridUnit')});
  width: 100%;
`

const TableRow = styled.div`
  align-items: center;
  background: ${({ selected }) => (selected ? th('colorPrimary') : 'inherit')};
  color: ${({ selected }) => (selected ? 'white' : 'inherit')};
  display: flex;
  user-select: none;
  width: 100%;

  &:nth-child(even) {
    background: ${({ selected }) =>
      selected ? th('colorPrimary') : th('colorBackgroundHue')};
  }

  &:hover {
    background: ${th('colorPrimary')};
    color: white;
  }
`

const RowRest = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-basis: ${({ width }) => (width ? `${width}%` : '33.33%')};
`

const TableCell = styled.div`
  flex-basis: ${({ width }) => (width ? `${width}%` : '33.33%')};
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding: 8px;
  text-align: left;
`

const ascIcon = (
  <svg fill="#111" viewBox="0 0 24 24">
    <path d="M19 17H22L18 21L14 17H17V3H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z" />
  </svg>
)

const descIcon = (
  <svg fill="#111" viewBox="0 0 24 24">
    <path d="M19 7H22L18 3L14 7H17V21H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z" />
  </svg>
)

/* eslint-disable react/prop-types */
const FilesTable = ({
  checkboxColumn,
  columns,
  sortingHandler,
  sortingState,
  loading,
  files,
  selected,
  checkboxSelected,
  selectHandler,
  checkboxHandler,
}) => {
  const renderTableBody = () => {
    const { t } = useTranslation()
    if (loading || !files) return <Loading />

    return files.length > 0 ? (
      <TableBody>
        {files.map(item => {
          const { id } = item
          const foundInList = indexOf(checkboxSelected, id)
          return (
            <TableRow key={id} selected={selected && selected === id}>
              {checkboxColumn && (
                <TableCell width={2}>
                  <input
                    checked={foundInList !== -1}
                    onChange={e => {
                      checkboxHandler(id)
                    }}
                    type="checkbox"
                  />
                </TableCell>
              )}
              <RowRest
                onClick={e => {
                  selectHandler(id)
                }}
                width={checkboxColumn ? 98 : 100}
              >
                {columns.map(column => {
                  const { label, width } = column

                  if (label === 'created' || label === 'updated') {
                    return (
                      <TableCell key={label} width={width}>
                        {dateTimeFormatter(item[label])}
                      </TableCell>
                    )
                  }

                  if (label === 'size') {
                    return (
                      <TableCell key={label} width={width}>
                        {fileSizeFormatter(item.storedObjects[0][label])}
                      </TableCell>
                    )
                  }

                  if (label === 'inUse') {
                    return (
                      <TableCell key={label} width={width}>
                        {item[label] ? t('yes') : t('no')}
                      </TableCell>
                    )
                  }

                  if (label === 'mimetype') {
                    return (
                      <TableCell key={label} width={width}>
                        {item.storedObjects[0][label]}
                      </TableCell>
                    )
                  }

                  return (
                    <TableCell key={label} width={width}>
                      {t(item[label])}
                    </TableCell>
                  )
                })}
              </RowRest>
            </TableRow>
          )
        })}
      </TableBody>
    ) : (
      <TableBodyEmpty>
        {/* You don&apos;t have any uploaded files for this book yet */}
        {t('you_don&apos;t_have_any_uploaded_files_for_this_book_yet')}
      </TableBodyEmpty>
    )
  }

  return (
    <TableWrapper selected={selected}>
      <TableHead>
        {checkboxColumn && (
          <TableHeadCell width={2}>
            <input
              checked={
                !loading &&
                files &&
                files.length > 0 &&
                files.length === checkboxSelected.length
              }
              onChange={e => {
                checkboxHandler(undefined, true)
              }}
              type="checkbox"
            />
          </TableHeadCell>
        )}
        {columns &&
          columns.map(column => {
            const { label, width, sortable } = column
            const { t } = useTranslation()

            return (
              <TableHeadCell key={label} width={width}>
                {/*
                <HeaderLabel>{`${label[0].toUpperCase()}${label.slice(
                  1,
                )}`}</HeaderLabel>
                */}
                <HeaderLabel>
                  {`${t(label.toLowerCase().replace(/ /g, '_'))}`}
                </HeaderLabel>
                {sortable && (
                  <IconButton
                    icon={sortingState[label] ? ascIcon : descIcon}
                    onClick={e => {
                      sortingHandler(label)
                    }}
                  />
                )}
              </TableHeadCell>
            )
          })}
      </TableHead>
      {renderTableBody()}
    </TableWrapper>
  )
}

export default FilesTable
