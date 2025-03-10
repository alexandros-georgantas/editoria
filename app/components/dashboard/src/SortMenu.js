/* eslint-disable react/prop-types,jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
/* stylelint-disable string-quotes,font-family-no-missing-generic-family-keyword */
import React from 'react'
import styled, { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

import { Menu as UIMenu } from '@pubsweet/ui'

import { Trans, useTranslation } from 'react-i18next'
import SortIcon from './IconArrows'

const triangle = css`
  background: #3f3f3f;
  content: ' ';
  display: block;
  height: 15px;
  position: absolute;
  transition: 0.2s ease-in-out;
  width: 15px;
  z-index: 200;
`

const triangleLeft = css`
  clip-path: polygon(49% 49%, 0 0, 0 100%);
  ${triangle};
`

const triangleUp = css`
  clip-path: polygon(0% 100%, 50% 50%, 100% 100%);
  ${triangle};
`

const triangleOption = css`
  left: 0;
  ${triangleLeft};
  top: 8px;
`

const Menu = styled(UIMenu)`
  display: inline-flex;

  div[role='listbox'] {
    background: white;

    > div:nth-child(2) {
      left: 95%;
      min-width: max-content;
      transform: translate(-95%, 0);
      z-index: 100;
    }

    div[open] {
      background: white;
      border: 1px solid #666;
      box-shadow: 0 2px 10px #666;
      margin-top: 16px;
      min-width: max-content;
      overflow-y: unset;
      position: relative;
      text-transform: uppercase;

      &::before {
        left: calc(50% - 15px / 2);
        ${triangleUp}
        top: -19px;
      }
    }

    div[role='option'] {
      color: ${th('colorText')};
      cursor: pointer;
      font-family: 'Fira Sans Condensed';
      font-size: ${th('fontSizeBase')};
      line-height: ${th('lineHeightBase')};
      padding: 4px 4px 4px 12px;
      position: relative;

      &::selection {
        background: none;
      }

      &::before {
        ${triangleOption}
        opacity: 0;
      }

      &[aria-selected='true'] {
        color: ${th('colorPrimary')};
        font-weight: normal;

        &::before {
          background: #0d78f2;
          opacity: 1;
        }
      }

      &:hover {
        background: #fafafa;
        color: #0d78f2;
        transition: 0.2s ease-in-out;

        &::before {
          background: #0d78f2;
          opacity: 1;
        }
      }
    }
  }
`

const OpenerWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};

  > span {
    color: ${th('colorText')};
    font-family: 'Fira Sans Condensed';
    text-transform: uppercase;

    span {
      color: ${th('colorText')};
      cursor: pointer;
      font-weight: bold;
    }
  }
`

const Opener = props => {
  const { ascending, onChangeSortOrder, selected, toggleMenu } = props

  const { t } = useTranslation()

  return (
    <OpenerWrapper>
      <span>
        <Trans i18nKey="sort_by"> Sort By </Trans>
        <span onClick={toggleMenu}>
          {' '}
          {t(selected.toLowerCase().replace(/ /g, '_'))}
        </span>
      </span>{' '}
      <SortIcon ascending={ascending} onClick={onChangeSortOrder} />
    </OpenerWrapper>
  )
}

/*
const options = [
  {
    label: transTitle,
    value: 'title',
  },
  {
    label: pubDate,
    value: 'publicationDate',
  },
]
*/
const options = () => {
  const { t } = useTranslation()
  const transTitle = t('title')
  const pubDate = t('pub._date')
  return [
    {
      label: transTitle,
      value: 'title',
    },
    {
      label: pubDate,
      value: 'publicationDate',
    },
  ]
}

const SortMenu = ({ setSortingParams, sortingParams }) => {
  const { ascending, sortKey, archived } = sortingParams

  const handleChangeSortKey = value => {
    setSortingParams({ sortKey: value, ascending, archived })
  }

  const handleChangeSortOrder = () => {
    setSortingParams({ ascending: !ascending, sortKey, archived })
  }

  return (
    <Menu
      ascending={ascending}
      onChange={handleChangeSortKey}
      onChangeSortOrder={handleChangeSortOrder}
      options={options()}
      renderOpener={Opener}
      value={sortKey}
    />
  )
}

export default SortMenu
