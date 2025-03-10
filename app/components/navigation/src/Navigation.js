/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'
import { grid } from '@pubsweet/ui-toolkit'
import { Trans, useTranslation } from 'react-i18next'
import { NavBar, NavBarLink, Dropdown } from '../../../ui'

const StyledLogo = styled.img`
  display: block;
  height: ${grid(4)};
  width: ${grid(4)};
`

const featureBookStructureEnabled =
  (process.env.FEATURE_BOOK_STRUCTURE &&
    JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
  false

const navLinksBuilder = (location, isAdminOrGlobal) => {
  const { i18n } = useTranslation()
  const navLinksLeft = []

  const inDashboard =
    (location.pathname.match(/books/g) &&
      location.pathname.match(/books/g).length === 1 &&
      !location.pathname.match(/bookComponents/g) &&
      !location.pathname.match(/book-builder/g)) ||
    false

  navLinksLeft.push(
    <NavBarLink active={inDashboard.toString()} key="nav-books" to="/books">
      {/* <Trans i18nKey="books">Books</Trans> */}
      {i18n.t('books')}
    </NavBarLink>,
  )

  if (featureBookStructureEnabled) {
    if (isAdminOrGlobal) {
      const inTemplates =
        (location.pathname.match(/templates/g) &&
          location.pathname.match(/templates/g).length === 1) ||
        false

      navLinksLeft.push(
        <NavBarLink
          active={inTemplates.toString()}
          key="nav-templates"
          to="/templates"
        >
          {/* Templates
          <Trans i18nKey="templates">Templates</Trans>
          */}
          {i18n.t('templates')}
        </NavBarLink>,
      )
    }

    return navLinksLeft
  }

  const inTemplates =
    (location.pathname.match(/templates/g) &&
      location.pathname.match(/templates/g).length === 1) ||
    false

  navLinksLeft.push(
    <NavBarLink
      active={inTemplates.toString()}
      key="nav-templates"
      to="/templates"
    >
      {/* Templates */}
      <Trans i18nKey="templates">Templates</Trans>
    </NavBarLink>,
  )

  return navLinksLeft
}

const Navigation = props => {
  const { currentUser, location, client, logoutUser } = props
  const dropdownItems = [{ link: '/profile', label: 'Profile' }]
  if (!currentUser) return null

  if (currentUser && currentUser.admin) {
    dropdownItems.push(
      { link: '/globalTeams', label: 'Team Manager' },
      { link: '/systemInfo', label: 'System Info' },
    )
  }

  const itemsLeft = navLinksBuilder(
    location,
    currentUser.admin || currentUser.isGlobal,
  )

  return (
    <NavBar
      brand={<StyledLogo alt="Ketida" src="/ketida.png" />}
      itemsLeft={itemsLeft}
      itemsRight={
        <Dropdown
          client={client}
          currentUser={currentUser}
          dropdownItems={dropdownItems}
          logoutUser={logoutUser}
          title="User Menu dropdown"
        />
      }
    />
  )
}

export default compose(
  withRouter,
  withProps(props => ({
    logoutUser: client => {
      client.cache.reset()
      localStorage.removeItem('token')
      props.history.push('/login')
    },
  })),
)(Navigation)
